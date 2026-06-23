"use client";

import { COMPETITIONS } from "@/types/football";
import Link from "next/link";

export default function CompetitionGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {COMPETITIONS.map((comp) => (
        <Link
          key={comp.code}
          href={`/scorers/${comp.code}`}
          className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-colors cursor-pointer"
        >
          <span className="text-4xl">{comp.flag}</span>
          <span className="text-sm font-medium text-white/80 text-center">{comp.name}</span>
        </Link>
      ))}
    </div>
  );
}
