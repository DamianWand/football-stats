"use client";

import { useRouter } from "next/navigation";

interface Props {
  code: string;
  season?: string;
  selected: "goals" | "assists";
}

export default function StatToggle({ code, season, selected }: Props) {
  const router = useRouter();

  function nav(stat: string) {
    const params = new URLSearchParams();
    if (season) params.set("season", season);
    if (stat !== "goals") params.set("stat", stat);
    const qs = params.toString();
    router.push(`/scorers/${code}${qs ? `?${qs}` : ""}`);
  }

  const tabs = [
    { key: "goals", label: "Top Scorers" },
    { key: "assists", label: "Top Assists" },
  ];

  return (
    <div className="flex items-end gap-0">
      {tabs.map((tab) => {
        const active = selected === tab.key;
        return (
          <button
            key={tab.key}
            onClick={() => nav(tab.key)}
            className="px-4 py-2 text-xs font-semibold border-t-2 cursor-pointer transition-all"
            style={{
              borderTopColor: active ? "#e05206" : "transparent",
              backgroundColor: active ? "#ffffff" : "transparent",
              color: active ? "#2c3e50" : "#6b7a8d",
              borderBottom: "none",
              marginBottom: active ? "-1px" : "0",
            }}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
