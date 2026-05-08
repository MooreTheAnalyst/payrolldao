"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Zap } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500">
              <Zap className="h-4 w-4 text-black" />
            </div>
            <span className="text-lg font-bold text-white">PayrollDAO</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 md:flex">
            <Link href="#problem" className="text-sm text-gray-400 hover:text-white transition-colors">
              Problem
            </Link>
            <Link href="#solution" className="text-sm text-gray-400 hover:text-white transition-colors">
              Solution
            </Link>
            <Link href="#stellar" className="text-sm text-gray-400 hover:text-white transition-colors">
              Why Stellar
            </Link>
            <a
              href="https://github.com/payrolldao/payrolldao"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              GitHub
            </a>
          </div>

          {/* CTA */}
          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/dashboard"
              className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-black hover:bg-emerald-400 transition-colors"
            >
              Launch App
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="text-gray-400 md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-white/10 bg-black/95 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <Link href="#problem" className="text-sm text-gray-400" onClick={() => setOpen(false)}>Problem</Link>
            <Link href="#solution" className="text-sm text-gray-400" onClick={() => setOpen(false)}>Solution</Link>
            <Link href="#stellar" className="text-sm text-gray-400" onClick={() => setOpen(false)}>Why Stellar</Link>
            <Link
              href="/dashboard"
              className="rounded-lg bg-emerald-500 px-4 py-2 text-center text-sm font-medium text-black"
              onClick={() => setOpen(false)}
            >
              Launch App
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
