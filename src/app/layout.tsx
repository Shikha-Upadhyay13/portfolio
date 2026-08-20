import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import CursorRipple from "@/components/CursorRipple";
import ScrollProgress from "@/components/ScrollProgress";
import Spotlight from "@/components/Spotlight";
import CommandPalette from "@/components/CommandPalette";
import SmartAssistant from "@/components/SmartAssistant";

// Display face for headings/logo — geometric and techy, gives the brand real
// personality instead of leaning on the accent color alone. Inter carries
// body copy for maximum legibility. Both self-host via next/font (build-time,
// no runtime request, no layout shift).
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Monospace, used sparingly for code-styled treatments (e.g. About's profile block).
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  title: "Shikha Upadhyay | AI Engineer",
  description: "AI Engineer building RAG systems and agentic workflows.",
  // Favicon comes from the src/app/icon.png + apple-icon.png file convention
  // (auto-optimized, multi-size) instead of pointing metadata at the raw
  // 2.3MB profile-cutout.png, which browsers would fetch unoptimized.
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetBrainsMono.variable}`}
    >
      <body className="relative bg-[#0b0b0f] text-white overflow-x-hidden">
        {/* Soft static ambient glow (sits under the cursor spotlight) */}
        <div className="fixed top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#47F1FF]/8 blur-[150px] rounded-full -z-20" />
        <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-[#47F1FF]/8 blur-[150px] rounded-full -z-20" />

        {/* Cursor-following signature glow */}
        <Spotlight />

        <ScrollProgress />

        {children}

        <CustomCursor />
        <CursorRipple />
        <CommandPalette />
        <SmartAssistant />
      </body>
    </html>
  );
}
