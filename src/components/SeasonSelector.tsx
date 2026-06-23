"use client";

import { useRouter } from "next/navigation";

const SEASONS = [2024, 2023, 2022, 2021, 2020, 2019, 2018];

interface Props {
  code: string;
  selected?: string;
  stat?: string;
}

export default function SeasonSelector({ code, selected, stat }: Props) {
  const router = useRouter();

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const val = e.target.value;
    const params = new URLSearchParams();
    if (val) params.set("season", val);
    if (stat && stat !== "goals") params.set("stat", stat);
    const qs = params.toString();
    router.push(`/scorers/${code}${qs ? `?${qs}` : ""}`);
  }

  return (
    <div className="flex items-center gap-2">
      <label className="text-dim text-xs">Season:</label>
      <select
        value={selected ?? ""}
        onChange={onChange}
        className="border border-line bg-surface text-data text-xs px-2 py-1 focus:outline-none focus:border-brand cursor-pointer"
      >
        <option value="">Current</option>
        {SEASONS.map((y) => (
          <option key={y} value={y}>
            {y}/{String(y + 1).slice(2)}
          </option>
        ))}
      </select>
    </div>
  );
}
