import { Scorer } from "@/types/football";
import Image from "next/image";

interface Props {
  scorers: Scorer[];
}

export default function ScorersTable({ scorers }: Props) {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10 bg-white/5">
            <th className="px-4 py-3 text-left text-white/50 font-medium w-10">#</th>
            <th className="px-4 py-3 text-left text-white/50 font-medium">שחקן</th>
            <th className="px-4 py-3 text-left text-white/50 font-medium">קבוצה</th>
            <th className="px-4 py-3 text-center text-white/50 font-medium">גולים</th>
            <th className="px-4 py-3 text-center text-white/50 font-medium">בישולים</th>
            <th className="px-4 py-3 text-center text-white/50 font-medium">משחקים</th>
          </tr>
        </thead>
        <tbody>
          {scorers.map((scorer, index) => (
            <tr
              key={scorer.player.id}
              className="border-b border-white/5 hover:bg-white/5 transition-colors"
            >
              <td className="px-4 py-3 text-white/40 font-mono">{index + 1}</td>
              <td className="px-4 py-3">
                <div className="flex flex-col">
                  <span className="font-medium text-white">{scorer.player.name}</span>
                  <span className="text-xs text-white/40">{scorer.player.nationality}</span>
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  {scorer.team.crest && (
                    <Image
                      src={scorer.team.crest}
                      alt={scorer.team.name}
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  )}
                  <span className="text-white/70">{scorer.team.shortName}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-center">
                <span className="text-green-400 font-bold text-base">{scorer.goals}</span>
              </td>
              <td className="px-4 py-3 text-center text-white/60">
                {scorer.assists ?? "—"}
              </td>
              <td className="px-4 py-3 text-center text-white/60">
                {scorer.playedMatches}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
