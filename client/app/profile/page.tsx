"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserDetails from "@/components/Profile/UserDetails";
import OtherProfiles from "@/components/Profile/OtherProfiles";
import GameHistory from "@/components/Profile/GameHistory";
import { clearSession, getUsername } from "@/lib/session";
import { testUser, testOthers, getTestUser } from "@/lib/testUser";
import type { UserProfile } from "@/lib/types";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const username = getUsername();
    if (!username) return; // the navbar sends signed-out visitors to /login

    if (username === testUser.username) {
      setUser(getTestUser());
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(`${API}/api/users/${username}`);

        // The stored username no longer exists
        if (res.status === 404) {
          clearSession();
          router.replace("/login");
          return;
        }
        if (!res.ok) throw new Error(`Request failed (${res.status})`);

        const data: UserProfile = await res.json();
        if (!cancelled) setUser(data);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Something went wrong");
      }
    })();

    return () => { cancelled = true; };
  }, [router]);

  return (
    <div className="flex-1 min-h-0 overflow-y-auto bg-slate-900 text-slate-100 px-6 py-10 flex flex-col">
      {/* Error Handler */}
      {error && <p className="text-center text-red-400">{error}</p>}

      {/* Checks if user data is being loaded */}
      {!user && !error && <p className="text-center opacity-60">Loading...</p>}

      {/* If the user data is avialable, display it */}
      {user && (
        <div className="mx-auto w-full max-w-6xl flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-1 gap-6">
          <div className="lg:col-span-1 flex flex-col gap-6 min-h-0">
            <UserDetails user={user} />
            <OtherProfiles 
            excludeUsername={user.username} 
            localProfiles={user.username === testUser.username ? testOthers : undefined}
            // specificUsername={"Ada"}
            // Add specificUsername={<any username within the database>} when you want to test your getUserByName() function
            />
          </div>

          <div className="lg:col-span-2 min-h-0">
            <GameHistory games={user.past_games} />
          </div>
        </div>
      )}
    </div>
  );
}