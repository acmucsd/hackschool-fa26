import type { UserProfile } from "@/lib/types";

export default function UserDetails({ user }: { user: UserProfile }) {
  const memberSince = new Date(user.created_at).toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });

  return (
    <section className="shrink-0 rounded-lg bg-slate-800 p-6">
      <h2 className="text-2xl font-bold mb-4">Profile Information</h2>

      <div className="flex items-center gap-4">

        <img src="/Profile.png" width={64} alt="Profile" className="rounded-full invert" />
        
        <div>
          <p className="text-xl font-semibold">{user.username}</p>
          <p className="text-sm opacity-60">Wordler since {memberSince}</p>
        </div>
      </div>

      <p className="mt-4 text-sm opacity-80">{user.bio || "No bio yet."}</p>

      <div className="mt-4 inline-block rounded bg-emerald-600 px-3 py-1 text-sm font-semibold">
        🔥 {user.streak} game streak
      </div>
    </section>
  );
}