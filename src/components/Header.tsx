"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { MailorLogo, MenuIcon, XIcon } from "./icons";

const navItems = [
  { label: "Product" },
  { label: "How it works" },
  { label: "Pricing" },
  { label: "Resources" },
  { label: "Enterprise" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-white/70 glass border-b border-black/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
          : "bg-white"
      )}
    >
      <div className="px-6">
        <div className="mx-auto max-w-[1200px] flex h-[62px] items-center justify-between">
          <div className="flex min-h-0 items-baseline gap-9">
            <a href="/" className="inline-flex shrink-0 items-baseline text-foreground">
              <MailorLogo className="text-[22px] leading-none" />
            </a>
            <nav
              className={cn(
                "hidden lg:flex items-baseline gap-0.5 transition-all duration-300",
                scrolled
                  ? "opacity-0 pointer-events-none max-w-0 overflow-hidden"
                  : "opacity-100 pointer-events-auto max-w-[600px]"
              )}
            >
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href="#"
                  className="rounded-md px-3 py-2 text-[14.5px] leading-none text-black/50 hover:text-black transition-colors whitespace-nowrap"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href="http://localhost:5173/login"
              className="rounded-md px-4 py-2 text-[14.5px] leading-none text-black/70 hover:text-black transition-colors"
            >
              Log in
            </a>
            <a
              href="http://localhost:5173/signup"
              className="inline-flex shrink-0 items-center px-5 py-2 text-[14.5px] font-medium leading-none text-white bg-black hover:bg-black/85 rounded-full transition-all"
            >
              Sign up
            </a>
          </div>

          <button
            className="lg:hidden p-2.5 text-black/60 hover:text-black"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <XIcon className="size-6" />
            ) : (
              <MenuIcon className="size-6" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-black/[0.04]">
          <nav className="max-w-[1200px] mx-auto px-6 py-4 space-y-0.5">
            {navItems.map((item) => (
              <a
                key={item.label}
                href="#"
                className="block px-3 py-3.5 text-[15px] text-black/60 hover:text-black transition-colors rounded-lg hover:bg-black/[0.03]"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 mt-2 border-t border-black/[0.06] flex gap-2">
              <a
                href="http://localhost:5173/login"
                className="flex-1 px-4 py-3 text-[15px] text-center text-black/60 hover:text-black border border-black/[0.08] rounded-full transition-colors"
              >
                Log in
              </a>
              <a
                href="http://localhost:5173/signup"
                className="flex-1 px-4 py-3 text-[15px] text-center font-medium text-white bg-black hover:bg-black/85 rounded-full transition-all"
              >
                Sign up
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
