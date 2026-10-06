"use client";

import { useEffect, useState } from "react";
import type { PublicProfile } from "@/lib/types";

// Fetch all user endpoints from the API
const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default function OtherProfiles({
  excludeUsername,
  localProfiles,
  specificUsername
}: {
  excludeUsername?: string;
  localProfiles?: PublicProfile[];
  specificUsername?: string;
}) {
  const [profiles, setProfiles] = useState<PublicProfile[]>([]); // every profile we fetched
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0); // bump this number to retry the fetch

  // Fetch all profiles once when the component loads
  useEffect(() => {
    if (localProfiles) {
      setProfiles(localProfiles.filter((u) => u.username !== excludeUsername));
      setError(null);
      setLoading(false);
      return;
    }

    let cancelled = false; // stops us from updating state if the component unmounts mid-fetch

    (async () => {
      setLoading(true);
      setError(null);
      try {

        //start of getUsers fetch
        const res = await fetch(`${API}/api/users`);

        if (res.status === 404) {
          if (!cancelled) setProfiles([]);
          return;
        }
        if (!res.ok) throw new Error(`Request failed (${res.status})`);

        const data: PublicProfile[] = await res.json();

        if (!cancelled) {
          setProfiles(data.filter((u) => u.username !== excludeUsername));
        }
        //end of getUsers fetch

        // Uncomment this block to test your getRecentUsers() function!
        // const recentRes = await fetch(`${API}/api/users/recent`);
        // if (recentRes.status === 404) {
        //   if (!cancelled) setProfiles([]);
        //   return;
        // }
        // if (!recentRes.ok) throw new Error(`Request failed (${recentRes.status})`);

        // const recentData: PublicProfile[] = await recentRes.json();

        // if (!cancelled) {
        //   setProfiles(recentData.filter((u) => u.username !== excludeUsername));
        // }

        // FYI: Make sure to comment out any other fetch blocks that you aren't using!

        // Uncomment this block to test your getUserByName() function!
        // const usernameRes = await fetch(`${API}/api/users/${specificUsername}`);
        // if (usernameRes.status === 404) {
        //   if (!cancelled) setProfiles([]);
        //   return;
        // }
        // if (!usernameRes.ok) throw new Error(`Request failed (${usernameRes.status})`);

        // const usernameData: PublicProfile = await usernameRes.json();

        // if (!cancelled) {
        //   setProfiles([usernameData]);
        // }

      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Something went wrong");
      } finally {
        if (!cancelled) setLoading(false);
      }


    })();

    return () => { cancelled = true; };
  }, [excludeUsername, attempt, localProfiles]);

  return (
    <section className="flex min-h-0 flex-1 flex-col rounded-lg bg-slate-800 p-6">
      <h2 className="mb-4 shrink-0 text-2xl font-bold">Other Players</h2>

      {/* If the players have not been fetched yet */}
      {loading && <p className="text-sm opacity-60">Loading...</p>}

      {/*failed to reload, so gives another chance to retry*/}
      {error && (
        <button onClick={() => setAttempt((a) => a + 1)} className="text-sm underline">
          Failed to load. Retry
        </button>
      )}

      {/* If there are no players to display */}
      {!loading && !error && profiles.length === 0 && (
        <p className="text-sm opacity-60">No other players yet.</p>
      )}

      {profiles.length > 0 && (
        <ul className="scroll-dark flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain pr-2 max-h-80 lg:max-h-none">
          {/* List of other players based on API endpoint use */}
          {profiles.map((p) => (
            <li key={p._id} className="flex shrink-0 items-center gap-3 rounded bg-slate-700 p-3">
              <img src="/Profile.png" width={36} alt="Profile" className="rounded-full" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{p.username}</p>
                {p.bio && <p className="truncate text-xs opacity-60">{p.bio}</p>}
              </div>
              <span className="text-sm opacity-80">🔥 {p.streak}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}