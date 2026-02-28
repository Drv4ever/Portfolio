import { profile } from "@/data/content";

export default function Header() {
  const date = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date());

  return (
    <header className="border-b border-border-light pb-5 dark:border-border-dark">
      <div className="border-b border-border-light py-2 text-center text-xs uppercase tracking-editorial text-neutral-600 dark:border-border-dark dark:text-neutral-400">
        <span>{date}</span>
      </div>

      <div className="relative py-5 text-center md:py-6">
        <span className="absolute right-2 top-1 text-[10px] uppercase tracking-editorial text-neutral-500 dark:text-neutral-500 md:right-0">
          {profile.nickname}
        </span>
        <div className="mx-auto mb-3 h-28 w-28 overflow-hidden rounded-full border border-border-light bg-paper-light p-1 dark:border-border-dark dark:bg-paper-dark md:h-32 md:w-32">
          <img src={profile.image} alt={`${profile.name} profile`} className="h-full w-full rounded-full object-cover" />
        </div>
        <h1 className="font-serif text-5xl font-medium tracking-wide md:text-7xl">{profile.name}</h1>
        <p className="mt-2 text-sm uppercase tracking-editorial text-neutral-600 dark:text-neutral-400">{profile.role}</p>
      </div>
    </header>
  );
}
