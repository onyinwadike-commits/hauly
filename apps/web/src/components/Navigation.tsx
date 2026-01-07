'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';

const navLinks = [
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/safety', label: 'Safety' },
  {
    label: 'Business',
    children: [
      { href: '/property-managers', label: 'Property Managers' },
      { href: '/business', label: 'Business Accounts' },
      { href: '/drive', label: 'Become a Hauler' },
    ],
  },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container-width px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex">
              <div
                className={`w-7 h-6 rounded-sm mr-0.5 transition-colors ${
                  isScrolled ? 'bg-copper' : 'bg-copper'
                }`}
              />
              <div
                className={`w-7 h-6 rounded-sm transition-colors ${
                  isScrolled ? 'bg-copper' : 'bg-copper'
                }`}
              />
            </div>
            <span
              className={`font-bold text-xl tracking-tight transition-colors ${
                isScrolled ? 'text-navy' : 'text-white'
              }`}
            >
              HAULY
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                      isScrolled
                        ? 'text-charcoal hover:text-navy hover:bg-light-gray'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {link.label}
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {activeDropdown === link.label && (
                    <div className="absolute top-full left-0 pt-2">
                      <div className="bg-white rounded-xl shadow-xl border border-border-gray py-2 min-w-[200px]">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2 text-charcoal hover:bg-light-gray hover:text-navy transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    pathname === link.href
                      ? isScrolled
                        ? 'text-copper'
                        : 'text-white'
                      : isScrolled
                      ? 'text-charcoal hover:text-navy hover:bg-light-gray'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/login"
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isScrolled
                  ? 'text-navy hover:bg-light-gray'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Sign In
            </Link>
            <Link
              href="/quote"
              className="btn-primary"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className={`w-6 h-6 ${isScrolled ? 'text-navy' : 'text-white'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled ? 'text-navy' : 'text-white'}`} />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t border-border-gray">
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label} className="space-y-2">
                    <div className="font-semibold text-navy px-2">
                      {link.label}
                    </div>
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-charcoal hover:bg-light-gray rounded-lg"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-2 py-2 font-medium text-charcoal hover:text-navy"
                  >
                    {link.label}
                  </Link>
                )
              )}

              <div className="pt-4 border-t border-border-gray space-y-3">
                <Link
                  href="/login"
                  className="block w-full text-center py-3 font-medium text-navy border border-navy rounded-lg hover:bg-navy hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/quote"
                  className="block w-full text-center btn-primary"
                >
                  Get a Quote
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
