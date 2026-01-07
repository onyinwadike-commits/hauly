import { Navigation } from '@/components/Navigation';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy to-navy/90 text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-4">
                Apartment Turns.
                <br />
                Junk Removal.
                <br />
                Furniture Delivery.
              </h1>
              <div className="w-16 h-1 bg-copper mb-6" />
              <p className="text-xl text-white/80 mb-8">
                From chaos to complete in 2 hours—with photo proof and flat-rate
                pricing.
              </p>
              <p className="text-2xl font-semibold text-copper mb-8">
                Consider it handled.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/quote"
                  className="bg-copper text-white px-8 py-4 rounded-md font-semibold text-center hover:bg-copper/90 transition"
                >
                  Get Instant Quote
                </Link>
                <Link
                  href="/coi"
                  className="border-2 border-white text-white px-8 py-4 rounded-md font-semibold text-center hover:bg-white/10 transition"
                >
                  View Sample COI
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-6 mt-12">
                {[
                  { icon: '🛡️', text: '$1M Liability' },
                  { icon: '✓', text: 'Background-Checked' },
                  { icon: '📸', text: 'Photo Documentation' },
                  { icon: '⏰', text: 'On-Time or Free' },
                ].map((badge, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-xl">{badge.icon}</span>
                    <span className="text-sm text-white/80">{badge.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="bg-white/10 rounded-2xl p-8 backdrop-blur">
                <div className="aspect-video bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-6xl">🚚</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy text-center mb-4">
            How It Works
          </h2>
          <div className="w-16 h-1 bg-copper mx-auto mb-12" />

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Book Online',
                desc: 'Select service, enter details, get instant flat-rate quote',
                icon: '📱',
              },
              {
                step: '2',
                title: 'Match Hauler',
                desc: 'We assign a background-checked Hauler with appropriate vehicle',
                icon: '🤝',
              },
              {
                step: '3',
                title: 'Track Live',
                desc: 'Real-time GPS tracking, 15-min arrival window notifications',
                icon: '📍',
              },
              {
                step: '4',
                title: 'Verify Photos',
                desc: 'Before/after photos auto-delivered to your email + dashboard',
                icon: '📸',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white rounded-xl p-6 text-center shadow-sm"
              >
                <div className="w-12 h-12 bg-copper text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-semibold text-navy mb-2">
                  {item.title}
                </h3>
                <p className="text-charcoal text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy text-center mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-charcoal text-center mb-12">
            No surprises. No hidden fees.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: 'Light Load',
                price: 89,
                vehicle: 'Pickup Truck',
                items: ['Small furniture', 'Boxes', 'Bags'],
              },
              {
                name: 'Medium Load',
                price: 149,
                vehicle: 'Cargo Van',
                items: ['Couches', 'Mattresses', 'Appliances'],
                popular: true,
              },
              {
                name: 'Heavy Load',
                price: 249,
                vehicle: 'Box Truck',
                items: ['Full cleanouts', 'Construction debris', 'Estate'],
              },
            ].map((tier) => (
              <div
                key={tier.name}
                className={`rounded-xl p-6 text-center ${
                  tier.popular
                    ? 'bg-navy text-white ring-4 ring-copper'
                    : 'bg-white border border-border-gray'
                }`}
              >
                {tier.popular && (
                  <div className="bg-copper text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                    MOST POPULAR
                  </div>
                )}
                <h3
                  className={`text-lg font-semibold mb-2 ${
                    tier.popular ? 'text-white' : 'text-navy'
                  }`}
                >
                  {tier.name}
                </h3>
                <div
                  className={`text-4xl font-bold mb-1 ${
                    tier.popular ? 'text-copper' : 'text-navy'
                  }`}
                >
                  ${tier.price}
                </div>
                <div
                  className={`text-sm mb-4 ${
                    tier.popular ? 'text-white/70' : 'text-gray-500'
                  }`}
                >
                  /hour
                </div>
                <div
                  className={`text-sm mb-4 ${
                    tier.popular ? 'text-white/80' : 'text-charcoal'
                  }`}
                >
                  {tier.vehicle}
                </div>
                <ul className="text-sm space-y-2">
                  {tier.items.map((item, i) => (
                    <li
                      key={i}
                      className={tier.popular ? 'text-white/80' : 'text-gray-500'}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-500 text-sm mt-8">
            2-hour minimum • All insurance & fees included
          </p>
        </div>
      </section>

      {/* Property Manager CTA */}
      <section className="py-20 bg-navy">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Managing 50+ units?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Get volume pricing, dedicated account support, and a branded dashboard
            for your team.
          </p>
          <Link
            href="/demo"
            className="bg-copper text-white px-8 py-4 rounded-md font-semibold hover:bg-copper/90 transition inline-block"
          >
            Schedule a Demo
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-light-gray py-12 border-t border-border-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="flex">
                  <div className="w-5 h-4 bg-copper rounded-sm mr-0.5" />
                  <div className="w-5 h-4 bg-copper rounded-sm" />
                </div>
                <span className="text-navy font-bold text-lg ml-2">HAULY</span>
              </div>
              <p className="text-charcoal text-sm">
                Professional hauling services in Henderson, Nevada.
              </p>
            </div>

            <div>
              <h4 className="text-navy font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-charcoal">
                <li>Apartment Turns</li>
                <li>Junk Removal</li>
                <li>Furniture Delivery</li>
                <li>Custom Hauling</li>
              </ul>
            </div>

            <div>
              <h4 className="text-navy font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-charcoal">
                <li>
                  <Link href="/about">About</Link>
                </li>
                <li>
                  <Link href="/safety">Safety</Link>
                </li>
                <li>
                  <Link href="/careers">Become a Hauler</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-navy font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-charcoal">
                <li>
                  <Link href="/terms">Terms of Service</Link>
                </li>
                <li>
                  <Link href="/privacy">Privacy Policy</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border-gray mt-8 pt-8 text-center text-sm text-gray-500">
            © 2026 Hauly Technologies Inc. Licensed, Bonded & Insured in Nevada.
          </div>
        </div>
      </footer>
    </main>
  );
}
