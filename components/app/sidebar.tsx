"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/logo";

const NAV_ITEMS = [
  {
    href: "/generate",
    label: "Générer",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M10 4v12M4 10h12" />
      </svg>
    ),
  },
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <rect x="2" y="2" width="7" height="7" rx="1.5" />
        <rect x="11" y="2" width="7" height="7" rx="1.5" />
        <rect x="2" y="11" width="7" height="7" rx="1.5" />
        <rect x="11" y="11" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    href: "/history",
    label: "Historique",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <circle cx="10" cy="10" r="8" />
        <path d="M10 6v4l2.5 2.5" />
      </svg>
    ),
  },
  {
    href: "/settings",
    label: "Paramètres",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <circle cx="10" cy="10" r="2.5" />
        <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.22 4.22l1.42 1.42M14.36 14.36l1.42 1.42M4.22 15.78l1.42-1.42M14.36 5.64l1.42-1.42" />
      </svg>
    ),
  },
];

export function Sidebar() {
  const pathname = usePathname();

  function isActive(href: string) {
    return href === "/dashboard"
      ? pathname === href
      : pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-56 shrink-0 border-r bg-background flex-col py-6 px-3">
        <Link href="/" className="flex items-center gap-2.5 font-bold text-base mb-8 px-3">
          <Logo className="w-8 h-[21px] shrink-0" />
          <span className="tracking-tight">Chaptry</span>
        </Link>

        <nav className="flex flex-col gap-0.5 flex-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive(item.href)
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto pt-4 border-t">
          <form action="/api/auth/signout" method="POST">
            <button
              type="submit"
              className="w-full text-left flex items-center gap-3 px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded-lg transition-colors"
            >
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M7 3H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h3M13 14l3-4-3-4M16 10H7" />
              </svg>
              Se déconnecter
            </button>
          </form>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 border-b bg-background flex items-center justify-between h-14 px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-sm">
          <Logo className="w-6 h-[16px] shrink-0" />
          <span className="tracking-tight">Chaptry</span>
        </Link>
        <Link
          href="/generate"
          className="rounded-lg bg-primary text-primary-foreground px-3 py-1.5 text-xs font-semibold hover:bg-primary/90 transition-colors"
        >
          Générer →
        </Link>
      </header>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg-background flex">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex-1 flex flex-col items-center gap-1 py-2.5 text-[10px] transition-colors ${
              isActive(item.href)
                ? "text-primary"
                : "text-muted-foreground"
            }`}
          >
            <span className="w-5 h-5 flex items-center justify-center">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}
