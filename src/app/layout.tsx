import "katex/dist/katex.min.css";
import "./globals.css";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import ResumeIcon from "@/components/ResumeIcon"; 

export const metadata: Metadata = {
  title: "Schon Huxley | Software Engineer",
  description:
    "Software Engineer focused on ML, Infrastructure, and Systems Reliability. SRE experience at Berkley Technology Services and Lenovo's Qira AI Platform.",
  metadataBase: new URL("https://schonhuxley.com"),
  openGraph: {
    title: "Schon Huxley | Software Engineer",
    description:
      "ML, Infrastructure, Systems. The Latent Space: projects, experience, and engineering notes.",
    url: "https://schonhuxley.com",
    siteName: "The Latent Space",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Schon Huxley | Software Engineer",
    description: "ML, Infrastructure, Systems. The Latent Space.",
  },
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