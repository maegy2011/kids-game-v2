"use client";

export function ShapeDisplay({ shape, color, size = 80 }: { shape: string; color: string; size?: number }) {
  switch (shape) {
    case "circle":
      return <div style={{ width: size, height: size, backgroundColor: color, borderRadius: "50%" }} />;
    case "square":
      return <div style={{ width: size, height: size, backgroundColor: color, borderRadius: 8 }} />;
    case "triangle":
      return (
        <div style={{
          width: 0,
          height: 0,
          borderLeft: `${size / 2}px solid transparent`,
          borderRight: `${size / 2}px solid transparent`,
          borderBottom: `${size}px solid ${color}`,
        }} />
      );
    case "rectangle":
      return <div style={{ width: size * 1.5, height: size * 0.75, backgroundColor: color, borderRadius: 6 }} />;
    case "star":
      return <span style={{ fontSize: size, color, lineHeight: 1 }}>★</span>;
    case "heart":
      return <span style={{ fontSize: size, color, lineHeight: 1 }}>❤️</span>;
    case "diamond":
      return (
        <div style={{
          width: size * 0.7,
          height: size * 0.7,
          backgroundColor: color,
          transform: "rotate(45deg)",
          borderRadius: 4,
        }} />
      );
    case "oval":
      return <div style={{ width: size * 1.3, height: size * 0.8, backgroundColor: color, borderRadius: "50%" }} />;
    default:
      return null;
  }
}
