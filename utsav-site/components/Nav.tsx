import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/brand/logo-mark-64.png"
            alt=""
            width={28}
            height={28}
            className="h-7 w-7"
            priority
          />
          <span className="font-display text-[17px] font-bold tracking-tight text-ink">
            Utsav
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <a href="#features" className="text-sm font-medium text-ink-secondary transition-colors hover:text-ink">
            Features
          </a>
          <a href="#checklist" className="text-sm font-medium text-ink-secondary transition-colors hover:text-ink">
            Smart checklist
          </a>
          <a href="#providers" className="text-sm font-medium text-ink-secondary transition-colors hover:text-ink">
            For providers
          </a>
        </nav>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <ThemeToggle />
          {/* Placeholder — point at the real customer login/app URL when available */}
          <a
            href="#"
            className="hidden rounded-full border border-border px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-border-strong sm:block"
          >
            Customer login
          </a>
          {/* Placeholder — point at the real provider login/app URL when available */}
          <a
            href="#"
            className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90"
          >
            Provider login
          </a>
        </div>
      </div>
    </header>
  );
}
