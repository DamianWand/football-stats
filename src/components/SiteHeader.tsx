import Link from "next/link";

export default function SiteHeader() {
  return (
    <header style={{ backgroundColor: "#1b2d40" }}>
      <div className="max-w-6xl mx-auto px-4 h-10 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-1.5 no-underline"
          style={{ fontFamily: "var(--font-head)" }}
        >
          <span className="text-brand text-lg font-[700]">⚽</span>
          <span className="text-white font-[600] text-base tracking-tight" style={{ fontFamily: "var(--font-head)" }}>
            FootStats
          </span>
        </Link>
        <nav className="flex items-center gap-5">
          <Link
            href="/"
            className="text-white/60 hover:text-white text-xs font-medium transition-colors no-underline"
          >
            Statistics
          </Link>
        </nav>
      </div>
    </header>
  );
}
