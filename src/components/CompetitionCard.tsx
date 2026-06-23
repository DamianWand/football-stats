"use client";

import { COMPETITIONS } from "@/types/football";
import Link from "next/link";

export default function CompetitionGrid() {
  return (
    <div className="divide-y divide-line">
      {COMPETITIONS.map((comp, i) => (
        <Link
          key={comp.code}
          href={`/scorers/${comp.code}`}
          className="flex items-center gap-3 px-2 py-2.5 hover:bg-row-alt transition-colors no-underline group"
          style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#f4f7fa" }}
        >
          <span className="text-xl w-7 text-center">{comp.flag}</span>
          <span className="text-data text-sm font-medium group-hover:text-brand transition-colors flex-1">
            {comp.name}
          </span>
          <span className="text-dim text-xs font-mono">{comp.code}</span>
          <span className="text-dim text-xs opacity-0 group-hover:opacity-100 transition-opacity">
            View stats →
          </span>
        </Link>
      ))}
    </div>
  );
}
