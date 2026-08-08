import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import CursorRipple from "@/components/CursorRipple";
import ScrollProgress from "@/components/ScrollProgress";
import Spotlight from "@/components/Spotlight";
import CommandPalette from "@/components/CommandPalette";
import SmartAssistant from "@/components/SmartAssistant";

export const metadata = {
  title: "Shikha Upadhyay | AI Engineer",
  description: "AI Engineer building RAG systems and agentic workflows.",
  icons: {
    icon: "/profile-cutout.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
