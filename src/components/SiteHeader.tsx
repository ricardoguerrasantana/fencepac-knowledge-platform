import Link from "next/link";

const navItems = [
  { href: "/", label: "Dashboard" },
  { href: "/wall-systems", label: "Wall Systems" },
  { href: "/sources", label: "Sources" },
  { href: "/glossary", label: "Glossary" },
  { href: "/search", label: "Search" },
  { href: "/review", label: "Review Queue" },
  { href: "/training", label: "Training" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="group">
          <p className="text-sm font-medium text-slate-500">Fencepac</p>
          <h1 className="text-lg font-bold tracking-tight text-slate-950 group-hover:text-slate-700">
            Knowledge Platform
          </h1>
        </Link>

        <nav className="flex flex-wrap gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
