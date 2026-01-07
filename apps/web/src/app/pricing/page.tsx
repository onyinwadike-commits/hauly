import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Check, HelpCircle, ArrowRight } from 'lucide-react';

const tiers = [
  {
    name: 'Light',
    vehicle: 'Pickup Truck',
    price: 89,
    unit: '/hour',
    description: 'Perfect for small items and light loads',
    capacity: 'Up to 1,000 lbs',
    features: [
      'Standard pickup truck bed',
      'Single-item moves',
      'Small furniture pieces',
      'Yard waste removal',
      'Estate sale pickups',
    ],
    examples: [
      'Single couch or mattress',
      'Small appliance delivery',
      'Garden debris',
      'Moving boxes (10-20)',
    ],
    popular: false,
  },
  {
    name: 'Medium',
    vehicle: 'Cargo Van',
    price: 149,
    unit: '/hour',
    description: 'Our most popular option for most jobs',
    capacity: 'Up to 3,000 lbs',
    features: [
      'Enclosed cargo space',
      'Multi-item loads',
      'Weather protection',
      'Furniture sets',
      'Apartment cleanouts',
    ],
    examples: [
      'Living room set',
      'Studio apartment move',
      'Multiple appliances',
      'Office furniture',
    ],
    popular: true,
  },
  {
    name: 'Heavy',
    vehicle: 'Box Truck',
    price: 249,
    unit: '/hour',
    description: 'Maximum capacity for large jobs',
    capacity: 'Up to 10,000 lbs',
    features: [
      '16-26 ft box truck',
      'Full home cleanouts',
      'Commercial jobs',
      'Large furniture',
      'Construction debris',
    ],
    examples: [
      'Full apartment turn',
      '2+ bedroom move',
      'Estate cleanout',
      'Commercial equipment',
    ],
    popular: false,
  },
];

const faqs = [
  {
    question: 'Is there a minimum booking time?',
    answer: 'Yes, all bookings have a 2-hour minimum. This ensures our Haulers can properly complete your job and covers their travel time to your location.',
  },
  {
    question: "What's included in the hourly rate?",
    answer: 'The hourly rate includes the Hauler, their vehicle, loading/unloading labor, basic equipment (dollies, straps, blankets), and mileage within our service area.',
  },
  {
    question: 'Are there any additional fees?',
    answer: 'There are no hidden fees. The only additional costs would be dump/disposal fees (passed through at cost) or tips for exceptional service (optional, 100% goes to your Hauler).',
  },
  {
    question: 'How does billing work?',
    answer: "You'll receive an upfront estimate before booking. After the job, you're charged for the actual time used (rounded to the nearest 15 minutes). We never charge more than your estimate without your approval.",
  },
  {
    question: 'Can I book for a specific time?',
    answer: "Absolutely! You can schedule your haul up to 30 days in advance. For same-day bookings, we'll match you with the next available Hauler (usually within 1-2 hours).",
  },
  {
    question: 'What if I need to cancel?',
    answer: 'Cancel free up to 2 hours before your scheduled time. Cancellations within 2 hours incur a $50 fee to compensate the Hauler who set aside time for your job.',
  },
  {
    question: 'Do you offer business pricing?',
    answer: 'Yes! Property managers and businesses with recurring needs can get volume discounts of 10-20%. Contact us for a custom quote.',
  },
  {
    question: 'Is my stuff insured?',
    answer: 'Yes. All Haulers carry liability insurance, and every job includes up to $10,000 in cargo protection at no extra cost.',
  },
];

export default function PricingPage() {
  return (
    <>
      <Navigation />

      {/* Hero Section */}
      <section className="bg-navy pt-32 pb-20">
        <div className="container-width px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-display-md md:text-display-lg font-bold text-white mb-6">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            No hidden fees. No surge pricing. Just honest rates for professional hauling service.
          </p>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="section-padding -mt-8">
        <div className="container-width">
          <div className="grid md:grid-cols-3 gap-8">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative bg-white rounded-2xl shadow-lg overflow-hidden ${
                  tier.popular ? 'ring-2 ring-copper' : 'border border-border-gray'
                }`}
              >
                {tier.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-copper text-white text-center py-2 text-sm font-semibold">
                    MOST POPULAR
                  </div>
                )}

                <div className={`p-8 ${tier.popular ? 'pt-14' : ''}`}>
                  {/* Tier Header */}
                  <div className="mb-6">
                    <div className="text-sm font-semibold text-copper mb-1">
                      {tier.vehicle.toUpperCase()}
                    </div>
                    <h3 className="text-2xl font-bold text-navy">{tier.name} Load</h3>
                    <p className="text-charcoal/70 mt-1">{tier.description}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-bold text-navy">${tier.price}</span>
                      <span className="text-charcoal/70">{tier.unit}</span>
                    </div>
                    <div className="text-sm text-charcoal/70 mt-1">
                      2-hour minimum • {tier.capacity}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link
                    href="/quote"
                    className={`block w-full text-center py-3 rounded-lg font-semibold transition-colors mb-8 ${
                      tier.popular
                        ? 'bg-copper text-white hover:bg-copper-600'
                        : 'bg-navy text-white hover:bg-navy-600'
                    }`}
                  >
                    Get Quote
                  </Link>

                  {/* Features */}
                  <div className="mb-6">
                    <div className="text-sm font-semibold text-navy mb-3">
                      INCLUDES:
                    </div>
                    <ul className="space-y-2">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-success-green flex-shrink-0 mt-0.5" />
                          <span className="text-charcoal">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Examples */}
                  <div className="border-t border-border-gray pt-6">
                    <div className="text-sm font-semibold text-navy mb-3">
                      PERFECT FOR:
                    </div>
                    <ul className="space-y-1 text-sm text-charcoal/70">
                      {tier.examples.map((example) => (
                        <li key={example}>• {example}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-12 bg-light-gray rounded-xl p-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-semibold text-navy mb-2">No Hidden Fees</h4>
                <p className="text-charcoal/70 text-sm">
                  What you see is what you pay. Dump fees are passed through at cost with receipt.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-navy mb-2">15-Minute Billing</h4>
                <p className="text-charcoal/70 text-sm">
                  After the 2-hour minimum, you are billed in 15-minute increments. Fair and precise.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-navy mb-2">Volume Discounts</h4>
                <p className="text-charcoal/70 text-sm">
                  Property managers and businesses save 10-20% with recurring bookings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Price Calculator CTA */}
      <section className="section-padding bg-navy">
        <div className="container-width text-center">
          <h2 className="text-display-sm font-bold text-white mb-4">
            Not sure which size you need?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Use our instant quote tool. Describe your job and we will recommend
            the right vehicle and give you an accurate estimate.
          </p>
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 bg-copper text-white font-semibold px-8 py-4 rounded-lg hover:bg-copper-600 transition-colors text-lg"
          >
            Get Instant Quote <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-display-sm font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-charcoal/70">
              Everything you need to know about Hauly pricing.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-sm border border-border-gray"
                >
                  <h3 className="flex items-start gap-3 font-semibold text-navy text-lg mb-2">
                    <HelpCircle className="w-6 h-6 text-copper flex-shrink-0 mt-0.5" />
                    {faq.question}
                  </h3>
                  <p className="text-charcoal/70 pl-9">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-charcoal/70 mb-4">
              Still have questions? We are happy to help.
            </p>
            <Link
              href="/contact"
              className="text-copper font-semibold hover:underline"
            >
              Contact our team →
            </Link>
          </div>
        </div>
      </section>

      {/* Business CTA */}
      <section className="section-padding bg-light-gray">
        <div className="container-width">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl font-bold text-navy mb-2">
                Need enterprise pricing?
              </h3>
              <p className="text-charcoal/70">
                Get custom rates for your property management company or business.
              </p>
            </div>
            <Link
              href="/property-managers"
              className="btn-primary whitespace-nowrap"
            >
              Get Business Pricing
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
