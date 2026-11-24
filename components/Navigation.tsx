"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Github, Menu, X } from "lucide-react";
import { useFlag } from "@/components/flags/flags-provider";
import { SCENES } from "@/lib/scenes";
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
    { href: "/roadmap", label: "Roadmap" },
  ];

  return (
    <>
      <nav
        className="fixed top-0 w-full z-50 bg-ink"
        data-scrolled={isScrolled}
        aria-label="Main navigation"
      >
        <div className="px-[var(--gutter)]">
          <div className="flex justify-between items-center h-16">
            <Link
              href="/"
              className="flex items-center gap-3 z-50"
              aria-label="Lights Pi home"
            >
              {/* Wordmark — the eight-cell swatch + the name */}
              <span aria-hidden className="swatch !gap-[2px] w-[34px] h-[18px]">
                {SCENES[0].cells.map((c, i) => (
                  <span key={i} style={{ backgroundColor: c }} />
                ))}
              </span>
              <span className="font-display text-paper text-[20px] tracking-[-0.02em]">
                Lights Pi
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
                  className="text-[16px] font-medium text-paper/85 hover:text-paper transition-colors"
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
                className="text-paper/85 hover:text-paper transition-colors p-2"
                aria-label="View Lights Pi on GitHub"
              >
                <Github className="w-5 h-5" aria-hidden="true" />
              </a>
              <Link
                href="/quick-start"
                onClick={() => trackEvent.clickGetStarted("navigation")}
                className="inline-flex items-center min-h-[40px] px-4 bg-amber-tungsten text-ink text-[16px] font-semibold hover:bg-paper transition-colors"
              >
                Build one
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
          className="absolute inset-0 bg-ink/90"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Panel — slides in from right */}
        <div
          className={`absolute right-0 top-0 bottom-0 w-full max-w-sm bg-steel transition-transform duration-300 ease-out ${
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

            <div className="pt-8 flex flex-col gap-5">
              <a
                href="https://github.com/gfargo/lights-pi"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent.clickViewGitHub("mobile_navigation")}
                className="flex items-center gap-3 text-[16px] text-paper hover:text-amber-tungsten transition-colors"
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
                className="self-start inline-flex items-center min-h-[48px] px-5 bg-amber-tungsten text-ink text-[16px] font-semibold hover:bg-paper transition-colors"
              >
                Build one
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
