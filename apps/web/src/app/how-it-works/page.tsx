import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import {
  Smartphone,
  UserCheck,
  MapPin,
  Camera,
  CreditCard,
  Star,
  CheckCircle2,
  Clock,
  Shield,
  MessageSquare
} from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Tell us what you need',
    description: 'Open the Hauly app or website and describe your job. Select your service type, upload photos if helpful, and choose your preferred date and time.',
    icon: Smartphone,
    details: [
      'Choose from apartment turn, junk removal, furniture delivery, or custom',
      'Add photos to help us understand the job scope',
      'Select same-day or schedule up to 30 days ahead',
      'Get an instant price estimate',
    ],
    image: '/images/how-it-works/step-1-booking.png',
  },
  {
    number: '02',
    title: 'Get matched with a Hauler',
    description: 'Our system automatically finds the best available Hauler based on your needs, location, and timing. All Haulers are vetted, insured, and background-checked.',
    icon: UserCheck,
    details: [
      'Smart matching based on vehicle type and availability',
      "View your Hauler's profile, rating, and photo",
      'All Haulers pass background checks and carry insurance',
      'Average match time: under 15 minutes',
    ],
    image: '/images/how-it-works/step-2-matching.png',
  },
  {
    number: '03',
    title: 'Track in real-time',
    description: "Follow your Hauler's location from the moment they head your way. Get accurate ETAs and instant notifications at every step.",
    icon: MapPin,
    details: [
      'Live GPS tracking of your Hauler',
      'Push notifications for status updates',
      'Direct messaging with your Hauler',
      "Know exactly when they'll arrive",
    ],
    image: '/images/how-it-works/step-3-tracking.png',
  },
  {
    number: '04',
    title: 'Before & after photos',
    description: 'Your Hauler documents the job with timestamped, geotagged photos. Perfect for accountability, property records, or peace of mind.',
    icon: Camera,
    details: [
      'Photos taken before work begins',
      'Photos taken after job completion',
      'Automatically saved to your account',
      'GPS and timestamp metadata included',
    ],
    image: '/images/how-it-works/step-4-photos.png',
  },
  {
    number: '05',
    title: 'Pay automatically',
    description: 'When the job is done, payment is processed automatically. No cash, no awkward negotiations. Tip your Hauler if they did great work.',
    icon: CreditCard,
    details: [
      'Secure payment processing',
      'Clear itemized receipt',
      'Optional tip (100% goes to Hauler)',
      'Dispute protection included',
    ],
    image: '/images/how-it-works/step-5-payment.png',
  },
  {
    number: '06',
    title: 'Rate and review',
    description: 'Help maintain our quality standards by rating your experience. Your feedback helps great Haulers get recognized.',
    icon: Star,
    details: [
      'Quick 1-5 star rating',
      'Optional written review',
      'Helps other customers choose',
      'Haulers with high ratings earn badges',
    ],
    image: '/images/how-it-works/step-6-review.png',
  },
];

const guarantees = [
  {
    icon: Clock,
    title: 'On-Time Guarantee',
    description: 'If your Hauler arrives more than 15 minutes late, your first hour is 50% off.',
  },
  {
    icon: Shield,
    title: 'Damage Protection',
    description: 'Every job includes up to $10,000 in cargo protection at no extra cost.',
  },
  {
    icon: MessageSquare,
    title: '24/7 Support',
    description: 'Our support team is always available to help with any questions or issues.',
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <Navigation />

      {/* Hero Section */}
      <section className="bg-navy pt-32 pb-20">
        <div className="container-width px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-display-md md:text-display-lg font-bold text-white mb-6">
            How Hauly Works
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            From booking to completion in six simple steps.
            Professional hauling has never been this easy.
          </p>
          <Link href="/quote" className="btn-primary text-lg px-8 py-4">
            Try It Now — Get a Free Quote
          </Link>
        </div>
      </section>

      {/* Steps Section */}
      <section className="section-padding">
        <div className="container-width">
          <div className="space-y-24">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 1;

              return (
                <div
                  key={step.number}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    isEven ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content */}
                  <div className={isEven ? 'lg:order-2' : ''}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-navy rounded-2xl flex items-center justify-center">
                        <Icon className="w-8 h-8 text-copper" />
                      </div>
                      <div className="text-6xl font-bold text-border-gray">
                        {step.number}
                      </div>
                    </div>

                    <h2 className="text-display-sm font-bold mb-4">
                      {step.title}
                    </h2>

                    <p className="text-xl text-charcoal/70 mb-6">
                      {step.description}
                    </p>

                    <ul className="space-y-3">
                      {step.details.map((detail) => (
                        <li key={detail} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-copper flex-shrink-0 mt-0.5" />
                          <span className="text-charcoal">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Image */}
                  <div className={isEven ? 'lg:order-1' : ''}>
                    <div className="bg-light-gray rounded-2xl p-8 aspect-[4/3] flex items-center justify-center">
                      {/* Placeholder for actual screenshots */}
                      <div className="text-center">
                        <div className="w-24 h-24 bg-navy rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <Icon className="w-12 h-12 text-copper" />
                        </div>
                        <p className="text-charcoal/50 text-sm">
                          Step {step.number} Screenshot
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Guarantees Section */}
      <section className="section-padding bg-light-gray">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-display-sm font-bold mb-4">
              Our Guarantees
            </h2>
            <p className="text-xl text-charcoal/70">
              Every Hauly booking is backed by our service guarantees.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {guarantees.map((guarantee) => {
              const Icon = guarantee.icon;
              return (
                <div
                  key={guarantee.title}
                  className="bg-white rounded-xl p-8 text-center shadow-sm"
                >
                  <div className="w-16 h-16 bg-copper/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-copper" />
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-2">
                    {guarantee.title}
                  </h3>
                  <p className="text-charcoal/70">{guarantee.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="section-padding">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-display-sm font-bold mb-4">
              See Hauly in Action
            </h2>
            <p className="text-xl text-charcoal/70">
              Watch how easy it is to book and track your haul.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-navy rounded-2xl aspect-video flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-20 h-20 bg-copper rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-white/70">Watch 2-minute demo</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-copper">
        <div className="container-width text-center">
          <h2 className="text-display-sm font-bold text-white mb-6">
            Ready to experience the difference?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Book your first haul in under 2 minutes. No app download required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quote"
              className="bg-white text-copper font-semibold px-8 py-4 rounded-lg hover:bg-light-gray transition-colors text-lg"
            >
              Get Started Now
            </Link>
            <Link
              href="/pricing"
              className="bg-transparent text-white font-semibold px-8 py-4 rounded-lg border-2 border-white hover:bg-white hover:text-copper transition-colors text-lg"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
