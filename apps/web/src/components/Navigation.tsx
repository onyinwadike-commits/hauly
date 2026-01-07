'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-border-gray sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="flex">
                <div className="w-6 h-5 bg-copper rounded-sm mr-0.5" />
                <div className="w-6 h-5 bg-copper rounded-sm" />
              </div>
              <span className="text-navy font-bold text-xl ml-2">HAULY</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/property-managers"
              className="text-charcoal hover:text-navy transition"
            >
              For Property Managers
            </Link>
            <Link
              href="/pricing"
              className="text-charcoal hover:text-navy transition"
            >
              Pricing
            </Link>
            <Link
              href="/safety"
              className="text-charcoal hover:text-navy transition"
            >
              Safety
            </Link>
            <Link
              href="/about"
              className="text-charcoal hover:text-navy transition"
            >
              About
            </Link>
            <Link
              href="/demo"
              className="bg-copper text-white px-6 py-2 rounded-md font-semibold hover:bg-copper/90 transition"
            >
              Schedule Demo
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-charcoal p-2"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-border-gray">
          <div className="px-4 py-3 space-y-3">
            <Link
              href="/property-managers"
              className="block text-charcoal hover:text-navy"
            >
              For Property Managers
            </Link>
            <Link href="/pricing" className="block text-charcoal hover:text-navy">
              Pricing
            </Link>
            <Link href="/safety" className="block text-charcoal hover:text-navy">
              Safety
            </Link>
            <Link href="/about" className="block text-charcoal hover:text-navy">
              About
            </Link>
            <Link
              href="/demo"
              className="block bg-copper text-white px-4 py-2 rounded-md font-semibold text-center"
            >
              Schedule Demo
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
