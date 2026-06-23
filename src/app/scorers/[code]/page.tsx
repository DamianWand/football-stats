import { getTopScorers } from "@/lib/football-api";
import { COMPETITIONS } from "@/types/football";
import ScorersTable from "@/components/ScorersTable";
import Link from "next/link";

interface Props {
  params: Promise<{ code: string }>;
}

export default async function ScorersPage({ params }: Props) {
  const { code } = await params;
  const competition = COMPETITIONS.find((c) => c.code === code);

  let data;
  let error: string | null = null;

  try {
    data = await getTopScorers(code);
  } catch (err) {
    error = err instanceof Error ? err.message : "שגיאה בטעינת הנתונים";
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors mb-8 text-sm"
        >
          ← חזרה לבית
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-4xl">{competition?.flag ?? "🏆"}</span>
            <h1 className="text-3xl font-bold">
              {data?.competition.name ?? competition?.name ?? code}
            </h1>
          </div>
          {data && (
            <p className="text-white/40 text-sm mt-1">
              עונה {data.season.startDate.slice(0, 4)}/{data.season.endDate.slice(2, 4)} · יום משחק {data.season.currentMatchday ?? "—"}
            </p>
          )}
        </div>

        {error ? (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-6 text-center">
            <p className="text-red-400 mb-2">{error}</p>
            <p className="text-white/40 text-sm">
              ודא שמפתח ה-API תקין ב-<code className="text-white/60">.env.local</code>
            </p>
          </div>
        ) : data ? (
          <ScorersTable scorers={data.scorers} />
        ) : null}
      </div>
    </main>
  );
}
