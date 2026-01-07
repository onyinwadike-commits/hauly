import { Navigation } from '@/components/Navigation';
import Link from 'next/link';

export default function PricingPage() {
  return (
    <main>
      <Navigation />

      {/* Header */}
      <section className="bg-navy py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Transparent Pricing
          </h1>
          <p className="text-white/80 text-lg">
            Flat hourly rates. No hidden fees. All insurance included.
          </p>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Light Load',
                price: 89,
                vehicle: 'Pickup Truck',
                description: 'Perfect for small moves and quick cleanouts',
                features: [
                  '1 professional Hauler',
                  'Pickup truck or SUV',
                  'Up to 1,000 lbs',
                  'Photo documentation',
                  '$1M liability coverage',
                  'Background-checked',
                ],
                examples: ['Boxes and bags', 'Small furniture', 'Yard waste', 'Donations'],
              },
              {
                name: 'Medium Load',
                price: 149,
                vehicle: 'Cargo Van',
                description: 'Our most popular option for apartment turns',
                features: [
                  '1-2 professional Haulers',
                  'Cargo van or large pickup',
                  'Up to 2,500 lbs',
                  'Moving blankets included',
                  'Photo documentation',
                  '$1M liability coverage',
                ],
                examples: ['Couches & mattresses', 'Appliances', 'Apartment cleanouts', 'Furniture delivery'],
                popular: true,
              },
              {
                name: 'Heavy Load',
                price: 249,
                vehicle: 'Box Truck',
                description: 'For large cleanouts and heavy items',
                features: [
                  '2 professional Haulers',
                  '16-ft box truck',
                  'Up to 5,000 lbs',
                  'Lift gate available',
                  'Photo documentation',
                  '$2M liability coverage',
                ],
                examples: ['Full estate cleanouts', 'Construction debris', 'Multiple rooms', 'Commercial'],
              },
            ].map((tier) => (
              <div
                key={tier.name}
                className={`rounded-xl overflow-hidden ${
                  tier.popular
                    ? 'ring-4 ring-copper shadow-xl'
                    : 'border border-border-gray'
                }`}
              >
                {tier.popular && (
                  <div className="bg-copper text-white text-center py-2 font-semibold text-sm">
                    MOST POPULAR
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-navy mb-1">{tier.name}</h3>
                  <p className="text-gray-500 text-sm mb-4">{tier.description}</p>

                  <div className="mb-6">
                    <span className="text-4xl font-bold text-navy">${tier.price}</span>
                    <span className="text-gray-500">/hour</span>
                  </div>

                  <div className="text-charcoal font-medium mb-4">{tier.vehicle}</div>

                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-copper">✓</span>
                        <span className="text-charcoal">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="border-t border-border-gray pt-4">
                    <p className="text-sm text-gray-500 mb-2">Great for:</p>
                    <div className="flex flex-wrap gap-2">
                      {tier.examples.map((ex, i) => (
                        <span
                          key={i}
                          className="bg-light-gray text-charcoal text-xs px-2 py-1 rounded"
                        >
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href="/quote"
                    className={`block text-center py-3 rounded-md font-semibold mt-6 ${
                      tier.popular
                        ? 'bg-copper text-white hover:bg-copper/90'
                        : 'bg-navy text-white hover:bg-navy/90'
                    } transition`}
                  >
                    Get Quote
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-light-gray">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-navy text-center mb-8">
            Pricing FAQ
          </h2>

          <div className="space-y-4">
            {[
              {
                q: 'Is there a minimum charge?',
                a: 'Yes, there is a 2-hour minimum for all services. This ensures we can properly document and complete your job.',
              },
              {
                q: 'Are there any additional fees?',
                a: 'No hidden fees. The hourly rate includes labor, vehicle, fuel, dump fees (for junk removal), insurance, and photo documentation.',
              },
              {
                q: 'How do I know which tier I need?',
                a: "Upload photos when booking and we'll recommend the right tier. When in doubt, go with Medium Load - it handles 80% of jobs.",
              },
              {
                q: 'Can I tip my Hauler?',
                a: 'Tips are optional but appreciated! You can add a tip in the app after job completion. 100% goes to your Hauler.',
              },
              {
                q: 'What about disposal fees?',
                a: 'Dump fees are included in your quote for junk removal. For specialty items (mattresses, electronics, hazmat), a small surcharge may apply.',
              },
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-lg p-6">
                <h3 className="text-navy font-semibold mb-2">{faq.q}</h3>
                <p className="text-charcoal text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
