const ELEVENLABS_API_KEY = "sk_866a65c48f621390859f144b157ba8c7feb96cc7cd4d8b38";
const ARABIC_VOICE_ID = "xemcw1zMAwVsXRgzTd4Y";

const audioCache = new Map<string, string>();

export const speakArabic = async (text: string) => {
  if (typeof window === "undefined") return;

  if (audioCache.has(text)) {
    const audio = new Audio(audioCache.get(text)!);
    audio.playbackRate = 0.85;
    audio.play();
    return;
  }

  try {
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${ARABIC_VOICE_ID}`, {
      method: "POST",
      headers: {
        "xi-api-key": ELEVENLABS_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.4,
          similarity_boost: 0.85,
          style: 0.6,
          use_speaker_boost: true,
        },
      }),
    });

    if (!response.ok) throw new Error("TTS failed");

    const audioBlob = await response.blob();
    const url = URL.createObjectURL(audioBlob);
    audioCache.set(text, url);
    const audio = new Audio(url);
    audio.playbackRate = 0.85;
    audio.play();
  } catch (error) {
    console.error("ElevenLabs TTS error:", error);
  }
};

let dynamicSounds: Record<string, string> = {};

export const loadSoundsFromDB = async (): Promise<Record<string, string>> => {
  try {
    const response = await fetch("/api/sounds");
    if (response.ok) {
      const sounds = await response.json();
      const soundMap: Record<string, string> = {};
      sounds.forEach((s: { name: string; soundUrl: string }) => {
        soundMap[s.name] = s.soundUrl;
      });
      dynamicSounds = soundMap;
      return soundMap;
    }
  } catch (error) {
    console.error("Error loading sounds:", error);
  }
  return {};
};

let currentAudio: HTMLAudioElement | null = null;

export const playAnimalSound = async (name: string) => {
  let soundUrl = dynamicSounds[name];
  
  if (!soundUrl) {
    await loadSoundsFromDB();
    soundUrl = dynamicSounds[name];
  }
  
  if (!soundUrl) return;
  
  try {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    currentAudio = new Audio(soundUrl);
    currentAudio.volume = 0.5;
    await currentAudio.play();
  } catch (error) {
    console.error("Error playing animal sound:", error);
  }
};

export const stopAnimalSound = () => {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
};
