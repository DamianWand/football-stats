import { getTopScorers } from "@/lib/football-api";
import { COMPETITIONS } from "@/types/football";
import ScorersTable from "@/components/ScorersTable";
import SeasonSelector from "@/components/SeasonSelector";
import StatToggle from "@/components/StatToggle";
import SiteHeader from "@/components/SiteHeader";
import Link from "next/link";

interface Props {
  params: Promise<{ code: string }>;
  searchParams: Promise<{ season?: string; stat?: string }>;
}

export default async function ScorersPage({ params, searchParams }: Props) {
  const { code } = await params;
  const { season, stat } = await searchParams;
  const statKey = stat === "assists" ? "assists" : "goals";
  const competition = COMPETITIONS.find((c) => c.code === code);

  let data;
  let error: string | null = null;

  try {
    data = await getTopScorers(code, 20, season);
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load data";
  }

  const scorers = data
    ? [...data.scorers].sort((a, b) => (b[statKey] ?? 0) - (a[statKey] ?? 0))
    : [];

  const seasonLabel = data
    ? `${data.season.startDate.slice(0, 4)}/${data.season.endDate.slice(2, 4)}`
    : null;

  return (
    <div className="min-h-screen bg-body">
      <SiteHeader />

      {/* Competition strip */}
      <div className="bg-surface border-b border-line">
        <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Link href="/" className="text-dim hover:text-brand text-xs no-underline transition-colors">
              Statistics
            </Link>
            <span className="text-line text-xs">/</span>
            <div className="flex items-center gap-2">
              <span className="text-base">{competition?.flag ?? "🏆"}</span>
              <div>
                <h1 className="text-data font-bold text-sm leading-tight">
                  {data?.competition.name ?? competition?.name ?? code}
                </h1>
                {seasonLabel && (
                  <p className="text-dim text-[11px]">
                    Season {seasonLabel}
                    {data?.season.currentMatchday ? ` · Matchday ${data.season.currentMatchday}` : ""}
                  </p>
                )}
              </div>
            </div>
          </div>
          <SeasonSelector code={code} selected={season} stat={stat} />
        </div>
      </div>

      {/* Tab bar */}
      <div className="bg-body border-b border-line">
        <div className="max-w-6xl mx-auto px-4">
          <StatToggle code={code} season={season} selected={statKey} />
        </div>
      </div>

      {/* Table */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="bg-surface border border-line overflow-hidden">
          {error ? (
            <div className="p-6">
              <p className="text-red-600 font-medium text-sm mb-1">{error}</p>
              <p className="text-dim text-xs">
                Check that your API key is valid in{" "}
                <code className="text-data">.env.local</code>
              </p>
            </div>
          ) : data && scorers.length === 0 ? (
            <div className="px-4 py-8 text-center text-dim text-xs">
              No player data available for this season yet.
            </div>
          ) : data ? (
            <ScorersTable scorers={scorers} highlight={statKey} />
          ) : null}
        </div>

        {/* Footer note */}
        <p className="text-dim text-[11px] mt-3">
          * Per App column shows {statKey === "goals" ? "goals" : "assists"} per appearance — coloured green (≥0.70), amber (≥0.40), red (below).
          Assists view re-ranks the top-20 scorers by assists; the API does not provide a separate assists leaderboard.
        </p>
      </div>
    </div>
  );
}
