import CompetitionGrid from "@/components/CompetitionCard";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-2xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">⚽</div>
          <h1 className="text-4xl font-bold mb-3">Football Stats</h1>
          <p className="text-white/50 text-lg">
            מלכי השערים בליגות הגדולות בעולם
          </p>
        </div>
        <CompetitionGrid />
      </div>
    </main>
  );
}
