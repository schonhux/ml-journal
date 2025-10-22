import "katex/dist/katex.min.css";
import "./globals.css";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import ResumeIcon from "@/components/ResumeIcon"; 

export const metadata: Metadata = {
  title: "Schon Huxley — ML Research Journal & Portfolio",
  description: "Publishing ML/AI research notes, experiments, and projects."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-zinc-100 antialiased">
        <SiteHeader />
        {/* Only reserve space for the fixed header; no width constraints here */}
        <main className="pt-14">{children}</main>
        <ResumeIcon />
      </body>
    </html>
  );
}