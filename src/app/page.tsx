import SiteHeader from "@/components/SiteHeader";
import CompetitionGrid from "@/components/CompetitionCard";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-body">
      <SiteHeader />

      {/* Page title bar */}
      <div className="bg-surface border-b border-line">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <h1 className="text-data font-bold text-base">Player Statistics</h1>
          <p className="text-dim text-xs mt-0.5">
            Top scorers and assists leaders from Europe&apos;s major competitions
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-5">
        {/* Competition list card */}
        <div className="bg-surface border border-line">
          {/* Card header */}
          <div
            className="px-4 py-2.5 border-b border-line flex items-center gap-2"
            style={{ backgroundColor: "#3a5169" }}
          >
            <span className="text-white text-xs font-semibold uppercase tracking-wide">
              Select a Competition
            </span>
          </div>
          <div className="p-4">
            <CompetitionGrid />
          </div>
        </div>
      </div>
    </div>
  );
}
