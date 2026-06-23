import { Scorer } from "@/types/football";
import Image from "next/image";

interface Props {
  scorers: Scorer[];
  highlight?: "goals" | "assists";
}

function perGame(val: number | null, apps: number): string {
  if (val === null || apps === 0) return "—";
  return (val / apps).toFixed(2);
}

export default function ScorersTable({ scorers, highlight = "goals" }: Props) {
  const sortCol = highlight;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-xs" style={{ minWidth: 520 }}>
        <thead>
          <tr style={{ backgroundColor: "#3a5169" }}>
            <th className="px-3 py-2 text-left text-white/70 font-semibold w-8">#</th>
            <th className="px-3 py-2 text-left text-white font-semibold">Player</th>
            <th className="px-3 py-2 text-left text-white/70 font-semibold hidden sm:table-cell">Club</th>
            <th className="px-3 py-2 text-center text-white/70 font-semibold w-12">Apps</th>
            <th
              className="px-3 py-2 text-center font-semibold w-14"
              style={{
                backgroundColor: sortCol === "goals" ? "#2d4059" : undefined,
                color: sortCol === "goals" ? "#fff" : "rgba(255,255,255,0.7)",
              }}
            >
              Goals {sortCol === "goals" && "▼"}
            </th>
            <th
              className="px-3 py-2 text-center font-semibold w-14"
              style={{
                backgroundColor: sortCol === "assists" ? "#2d4059" : undefined,
                color: sortCol === "assists" ? "#fff" : "rgba(255,255,255,0.7)",
              }}
            >
              Assists {sortCol === "assists" && "▼"}
            </th>
            <th className="px-3 py-2 text-center text-white/70 font-semibold w-16 hidden md:table-cell">
              {highlight === "goals" ? "G/App" : "A/App"}
            </th>
          </tr>
        </thead>
        <tbody>
          {scorers.map((scorer, index) => {
            const even = index % 2 === 0;
            const perApp =
              highlight === "goals"
                ? perGame(scorer.goals, scorer.playedMatches)
                : perGame(scorer.assists, scorer.playedMatches);
            const perAppNum = parseFloat(perApp);
            const ratingColor =
              perApp === "—"
                ? "#6b7a8d"
                : perAppNum >= 0.7
                ? "#27ae60"
                : perAppNum >= 0.4
                ? "#e67e22"
                : "#e74c3c";

            return (
              <tr
                key={scorer.player.id}
                style={{ backgroundColor: even ? "#fff" : "#f4f7fa" }}
                className="hover:bg-[#e8f0f8] transition-colors"
              >
                {/* Rank */}
                <td className="px-3 py-2 text-dim text-center">{index + 1}</td>

                {/* Player */}
                <td className="px-3 py-2">
                  <span className="text-data font-semibold">{scorer.player.name}</span>
                  <span className="text-dim block text-[11px]">{scorer.player.nationality}</span>
                </td>

                {/* Club */}
                <td className="px-3 py-2 hidden sm:table-cell">
                  <div className="flex items-center gap-1.5">
                    {scorer.team.crest && (
                      <Image
                        src={scorer.team.crest}
                        alt={scorer.team.name}
                        width={16}
                        height={16}
                        className="object-contain"
                      />
                    )}
                    <span className="text-dim">{scorer.team.shortName}</span>
                  </div>
                </td>

                {/* Apps */}
                <td className="px-3 py-2 text-center text-dim">{scorer.playedMatches}</td>

                {/* Goals */}
                <td
                  className="px-3 py-2 text-center font-bold"
                  style={{
                    backgroundColor: sortCol === "goals" ? (even ? "#f0f7f0" : "#e8f3e8") : undefined,
                    color: sortCol === "goals" ? "#27ae60" : "#6b7a8d",
                    fontSize: sortCol === "goals" ? "14px" : undefined,
                  }}
                >
                  {scorer.goals}
                </td>

                {/* Assists */}
                <td
                  className="px-3 py-2 text-center font-bold"
                  style={{
                    backgroundColor: sortCol === "assists" ? (even ? "#eef5fb" : "#e6f0f8") : undefined,
                    color: sortCol === "assists" ? "#2980b9" : "#6b7a8d",
                    fontSize: sortCol === "assists" ? "14px" : undefined,
                  }}
                >
                  {scorer.assists ?? "—"}
                </td>

                {/* Per app */}
                <td className="px-3 py-2 text-center hidden md:table-cell">
                  <span
                    className="inline-block px-1.5 py-0.5 rounded text-white text-[11px] font-bold tabular-nums"
                    style={{ backgroundColor: ratingColor, minWidth: 32 }}
                  >
                    {perApp}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
