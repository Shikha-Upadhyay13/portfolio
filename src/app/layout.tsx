import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import CursorRipple from "@/components/CursorRipple";
import ScrollProgress from "@/components/ScrollProgress";
import SmartAssistant from "@/components/SmartAssistant";

export const metadata = {
  title: "Shikha Upadhyay | AI Engineer",
  description: "AI Engineer building RAG systems and agentic workflows.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative bg-[#0f0f0f] text-white overflow-x-hidden">
        {/* Glow Background */}
        <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-600/20 blur-[150px] rounded-full -z-10" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/20 blur-[150px] rounded-full -z-10" />

        <ScrollProgress />

        {children}

        <CustomCursor />
        <CursorRipple />
        <SmartAssistant />
      </body>
    </html>
  );
}
