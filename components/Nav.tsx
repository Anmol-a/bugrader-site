"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-line bg-paper sticky top-0 z-50">
      <div className="max-w-[1180px] mx-auto px-8">
        <nav className="flex items-center justify-between py-6">
          <Link href="/" className="flex items-center gap-2.5 font-display font-semibold text-[19px]">
            <span className="relative w-4 h-4">
              <span className="absolute inset-[5px] bg-gold rounded-full" />
              <span className="absolute inset-0 border border-gold rounded-full opacity-45" />
            </span>
            BugRadar
          </Link>

          <div className="hidden md:flex gap-7 text-[14.5px]">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={
                  pathname === link.href
                    ? "text-ink font-medium"
                    : "text-ink-soft hover:text-ink transition-colors"
                }
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-5">
            <Link
              href="/contact"
              className="inline-block bg-ink text-paper px-[18px] py-2.5 rounded font-medium text-sm whitespace-nowrap"
            >
              Talk to us
            </Link>
          </div>

          <button
            className="md:hidden text-ink"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle navigation menu"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M2 6h18M2 11h18M2 16h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </nav>

        {open && (
          <div className="md:hidden flex flex-col gap-4 pb-6 text-[15px]">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={pathname === link.href ? "text-ink font-medium" : "text-ink-soft"}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}