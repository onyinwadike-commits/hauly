import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
  company: [
    { href: '/about', label: 'About Us' },
    { href: '/careers', label: 'Careers' },
    { href: '/press', label: 'Press' },
    { href: '/blog', label: 'Blog' },
  ],
  services: [
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/safety', label: 'Safety' },
    { href: '/coverage', label: 'Service Areas' },
  ],
  business: [
    { href: '/property-managers', label: 'Property Managers' },
    { href: '/business', label: 'Business Accounts' },
    { href: '/drive', label: 'Become a Hauler' },
    { href: '/fleet', label: 'Fleet Partners' },
  ],
  support: [
    { href: '/help', label: 'Help Center' },
    { href: '/contact', label: 'Contact Us' },
    { href: '/faq', label: 'FAQ' },
    { href: '/accessibility', label: 'Accessibility' },
  ],
  legal: [
    { href: '/terms', label: 'Terms of Service' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/cookies', label: 'Cookie Policy' },
  ],
};

const socialLinks = [
  { href: 'https://facebook.com/haulyapp', icon: Facebook, label: 'Facebook' },
  { href: 'https://twitter.com/haulyapp', icon: Twitter, label: 'Twitter' },
  { href: 'https://instagram.com/haulyapp', icon: Instagram, label: 'Instagram' },
  { href: 'https://linkedin.com/company/hauly', icon: Linkedin, label: 'LinkedIn' },
];

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      {/* Main Footer */}
      <div className="container-width section-padding pb-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                <div className="w-7 h-6 bg-copper rounded-sm mr-0.5" />
                <div className="w-7 h-6 bg-copper rounded-sm" />
              </div>
              <span className="font-bold text-xl tracking-tight">HAULY</span>
            </div>
            <p className="text-white/70 text-sm mb-6">
              Consider it handled.™
            </p>

            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <a
                href="tel:+17025551234"
                className="flex items-center gap-2 text-white/70 hover:text-copper transition-colors"
              >
                <Phone className="w-4 h-4" />
                (702) 555-1234
              </a>
              <a
                href="mailto:hello@hauly.app"
                className="flex items-center gap-2 text-white/70 hover:text-copper transition-colors"
              >
                <Mail className="w-4 h-4" />
                hello@hauly.app
              </a>
              <div className="flex items-start gap-2 text-white/70">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>Henderson, Nevada</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-copper transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-copper transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Business Links */}
          <div>
            <h4 className="font-semibold mb-4">Business</h4>
            <ul className="space-y-2">
              {footerLinks.business.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-copper transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-copper transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* App Download Badges */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-white/70 text-sm mb-4">Download the Hauly app</p>
          <div className="flex gap-4">
            <a
              href="https://apps.apple.com/app/hauly"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <img
                src="/images/app-store-badge.svg"
                alt="Download on the App Store"
                className="h-10"
              />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.hauly.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <img
                src="/images/google-play-badge.svg"
                alt="Get it on Google Play"
                className="h-10"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-width px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-white/50 text-sm">
              © {new Date().getFullYear()} Hauly Technologies Inc. All rights reserved.
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/50 hover:text-copper transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/50 hover:text-copper transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
