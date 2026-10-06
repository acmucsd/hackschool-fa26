"use client";

import type { PastGame } from "@/lib/types";

export default function GameHistory({ games }: { games: PastGame[] }) {
  // Sort games by date, newest first based on the current sort order
  const sorted = [...games].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <section className="flex h-full min-h-0 flex-col rounded-lg bg-slate-800 p-6">
      <h2 className="mb-4 shrink-0 text-2xl font-bold">Game History</h2>

      {sorted.length === 0 ? (<p className="text-sm opacity-60">No games played yet.</p>) :
        (
          <ul className="scroll-dark flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain pr-2 max-h-96 lg:max-h-none">
            {sorted.map((game) => {
              // Checks if the last word guesses is the correct word
              const won =
                game.guessed_words.at(-1)?.toUpperCase() === game.word.toUpperCase();

              return (
                <li key={game._id} className="shrink-0 rounded bg-slate-700 p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold tracking-widest">{game.word.toUpperCase()}</span>
                    <span className={won ? "text-emerald-400" : "text-red-400"}>
                      {won ? `Found the word in ${game.guessed_words.length} guesses` : "NT"}
                    </span>
                  </div>
                  <p className="mt-1 text-xs opacity-60">
                    {new Date(game.date).toLocaleDateString()}
                  </p>
                  {/** Maps out the guessed words */}
                  <div className="mt-2 flex flex-wrap gap-2 font-mono text-xs opacity-80">
                    {game.guessed_words.map((currWord, id) => (
                      <span key={id} className="rounded bg-slate-600 px-2 py-1">
                        {currWord.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
    </section>
  );
}