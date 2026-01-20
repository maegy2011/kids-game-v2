import type { Metadata, Viewport } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import { ClientErrorBoundary } from "@/components/ClientErrorBoundary";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";
import Script from "next/script";

export const viewport: Viewport = {
  themeColor: "#87CEEB",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "تعلّم والعب - ألعاب تعليمية للأطفال",
  description: "ألعاب تعليمية ممتعة للأطفال لتعلم الحروف والأرقام والألوان والأشكال",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "تعلّم والعب",
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Script
          id="orchids-browser-logs"
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
          strategy="afterInteractive"
          data-orchids-project-id="86bd2739-5914-459a-92d9-033452d7a618"
        />
<ErrorReporter />
          <ServiceWorkerRegister />
          <ClientErrorBoundary>
            {children}
          </ClientErrorBoundary>
          <VisualEditsMessenger />
      </body>
    </html>
  );
}
