"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteHeader() {
  const pathname = usePathname();
  const onHome = pathname === "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 transition
      ${onHome ? "bg-transparent" : "bg-white/90 backdrop-blur border-b border-zinc-200/60"}`}
    >
      <div className="mx-auto max-w-5xl px-5 h-14 flex items-center justify-between">
        <Link href="/" className={`${onHome ? "text-white" : "text-zinc-900"} font-semibold`}>
          The Latent Space
        </Link>
        <nav className={`flex gap-6 text-sm ${onHome ? "text-white/900" : "text-zinc-1000"} font-semibold`}>
          <div className="hover:underline">There Is A Solution To Every Problem</div>
        </nav>
      </div>
    </header>
  );
}
