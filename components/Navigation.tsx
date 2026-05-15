"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Github, Menu, X } from "lucide-react";
import { useFlag } from "@/components/flags/flags-provider";
import { trackEvent } from "@/lib/analytics";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const showDemo = useFlag("enable-demo");
  const showShowcase = useFlag("enable-showcase");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: "/quick-start", label: "Start" },
    { href: "/hardware", label: "Hardware" },
    ...(showDemo ? [{ href: "/demo", label: "Playground" }] : []),
    ...(showShowcase ? [{ href: "/showcase", label: "Showcase" }] : []),
    { href: "/docs", label: "Docs" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-ink/85 backdrop-blur-xl border-b border-rule"
            : "bg-transparent"
        }`}
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              href="/"
              className="flex items-center gap-3 z-50"
              aria-label="Lights Pi home"
            >
              {/* Wordmark — small filament dot + monospaced lockup */}
              <span
                aria-hidden
                className="filament inline-block w-2 h-2 rounded-full bg-amber-tungsten"
              />
              <span className="font-mono uppercase tracking-widest text-paper text-sm">
                lights-pi
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div
              className="hidden md:flex items-center gap-8"
              role="navigation"
              aria-label="Primary navigation"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-mono uppercase tracking-widest text-xs text-paper/60 hover:text-paper transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-6">
              <a
                href="https://github.com/gfargo/lights-pi"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent.clickViewGitHub("navigation")}
                className="text-paper/60 hover:text-paper transition-colors"
                aria-label="View Lights Pi on GitHub"
              >
                <Github className="w-4 h-4" aria-hidden="true" />
              </a>
              <Link
                href="/quick-start"
                onClick={() => trackEvent.clickGetStarted("navigation")}
                className="font-mono uppercase tracking-widest text-xs text-amber-tungsten border-b border-amber-tungsten pb-0.5 hover:text-paper hover:border-paper transition-colors"
              >
                Get started →
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden z-50 p-2 text-paper/80 hover:text-amber-tungsten transition-colors"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu — CSS-only enter/exit, no framer-motion */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        aria-hidden={!isMobileMenuOpen}
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-200 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <button
          aria-label="Close menu"
          tabIndex={isMobileMenuOpen ? 0 : -1}
          className="absolute inset-0 bg-ink/85 backdrop-blur-md"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Panel — slides in from right */}
        <div
          className={`absolute right-0 top-0 bottom-0 w-full max-w-sm bg-ink border-l border-rule transition-transform duration-300 ease-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full pt-24 px-8 pb-8">
            <nav
              className="flex-1 flex flex-col gap-1"
              aria-label="Mobile navigation"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-display text-3xl text-paper hover:text-amber-tungsten transition-colors py-3"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="pt-8 hairline flex flex-col gap-4">
              <a
                href="https://github.com/gfargo/lights-pi"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent.clickViewGitHub("mobile_navigation")}
                className="flex items-center gap-3 font-mono uppercase tracking-widest text-xs text-paper/60 hover:text-paper transition-colors"
                aria-label="View Lights Pi on GitHub"
              >
                <Github className="w-4 h-4" aria-hidden="true" />
                <span>View on GitHub</span>
              </a>
              <Link
                href="/quick-start"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  trackEvent.clickGetStarted("mobile_navigation");
                }}
                className="font-mono uppercase tracking-widest text-xs text-amber-tungsten border-b border-amber-tungsten pb-1 self-start hover:text-paper hover:border-paper transition-colors"
              >
                Get started →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
