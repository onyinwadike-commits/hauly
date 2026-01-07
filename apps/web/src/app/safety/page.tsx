import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import {
  Shield,
  UserCheck,
  MapPin,
  Camera,
  Lock,
  Phone,
  FileCheck,
  Car,
  AlertTriangle,
  CheckCircle2,
  Star,
  Clock,
} from 'lucide-react';

const safetyFeatures = [
  {
    icon: UserCheck,
    title: 'Background Checked Haulers',
    description:
      'Every Hauler undergoes a comprehensive background check including criminal history, driving record, and identity verification before they can accept jobs.',
  },
  {
    icon: FileCheck,
    title: 'License & Insurance Verified',
    description:
      "We verify every Hauler's driver's license, vehicle registration, and personal auto insurance. Commercial Haulers must provide proof of commercial coverage.",
  },
  {
    icon: MapPin,
    title: 'Real-Time GPS Tracking',
    description:
      'Track your Hauler in real-time from the moment they accept your job until completion. Share your tracking link with anyone who needs to know.',
  },
  {
    icon: Camera,
    title: 'Photo Documentation',
    description:
      'Haulers capture timestamped, geotagged before and after photos of every job. This creates an indisputable record for accountability.',
  },
  {
    icon: Lock,
    title: 'Secure Payments',
    description:
      'All payments are processed securely through Stripe. Your payment info is never stored on our servers or shared with Haulers.',
  },
  {
    icon: Phone,
    title: '24/7 Support',
    description:
      'Our safety team is available around the clock. If something goes wrong, help is just a tap away in the app or a phone call.',
  },
];

const insuranceCoverage = [
  {
    title: 'Liability Coverage',
    amount: '$1,000,000',
    description: 'Per occurrence for third-party bodily injury or property damage',
  },
  {
    title: 'Cargo Protection',
    amount: '$10,000',
    description: 'Per job coverage for items being transported',
  },
  {
    title: 'Auto Insurance',
    amount: 'State Minimum+',
    description: 'All Haulers must maintain valid auto insurance on their vehicles',
  },
];

const driverRequirements = [
  'Valid driver\'s license for at least 3 years',
  'Clean driving record (no major violations)',
  'Pass comprehensive background check',
  'Vehicle inspection passed within last year',
  'Minimum auto insurance coverage',
  'Smartphone with GPS capability',
];

const safetyStats = [
  { value: '99.8%', label: 'Jobs completed without incident' },
  { value: '100%', label: 'Haulers background checked' },
  { value: '<15 min', label: 'Average support response time' },
  { value: '4.9★', label: 'Average Hauler rating' },
];

export default function SafetyPage() {
  return (
    <>
      <Navigation />

      {/* Hero Section */}
      <section className="bg-navy pt-32 pb-20">
        <div className="container-width px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-copper/20 text-copper px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              YOUR SAFETY IS OUR PRIORITY
            </div>
            <h1 className="text-display-md md:text-display-lg font-bold text-white mb-6">
              Trust & Safety at Hauly
            </h1>
            <p className="text-xl text-white/80">
              We've built safety into every part of Hauly. From rigorous Hauler vetting
              to real-time tracking and comprehensive insurance, you're protected at
              every step.
            </p>
          </div>
        </div>
      </section>

      {/* Safety Stats */}
      <section className="bg-copper py-8">
        <div className="container-width px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {safetyStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-white/80 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Features Grid */}
      <section className="section-padding">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-display-sm md:text-display-md font-bold mb-4">
              How We Keep You Safe
            </h2>
            <p className="text-xl text-charcoal/70 max-w-2xl mx-auto">
              Multiple layers of protection for every job.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {safetyFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-white rounded-xl p-8 shadow-sm border border-border-gray hover:shadow-md transition-shadow"
                >
                  <div className="w-14 h-14 bg-navy rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-copper" />
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-3">{feature.title}</h3>
                  <p className="text-charcoal/70">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Insurance Coverage */}
      <section className="section-padding bg-light-gray">
        <div className="container-width">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-display-sm font-bold mb-6">
                Comprehensive Insurance Coverage
              </h2>
              <p className="text-xl text-charcoal/70 mb-8">
                Every Hauly job is backed by our comprehensive insurance program.
                From the moment a Hauler accepts your job to final delivery, you're
                covered.
              </p>

              <div className="space-y-6">
                {insuranceCoverage.map((coverage) => (
                  <div
                    key={coverage.title}
                    className="bg-white rounded-xl p-6 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-navy mb-1">{coverage.title}</h3>
                        <p className="text-sm text-charcoal/70">
                          {coverage.description}
                        </p>
                      </div>
                      <div className="text-2xl font-bold text-copper whitespace-nowrap">
                        {coverage.amount}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-navy rounded-2xl p-8 text-white">
              <Shield className="w-12 h-12 text-copper mb-6" />
              <h3 className="text-2xl font-bold mb-4">Claims Process</h3>
              <p className="text-white/80 mb-6">
                In the rare event something goes wrong, our claims process is simple
                and fair.
              </p>
              <ol className="space-y-4">
                <li className="flex gap-3">
                  <span className="w-6 h-6 bg-copper rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    1
                  </span>
                  <span className="text-white/90">
                    Report the issue through the app within 24 hours
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 bg-copper rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    2
                  </span>
                  <span className="text-white/90">
                    Provide photos and description of damage
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 bg-copper rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    3
                  </span>
                  <span className="text-white/90">
                    Our team reviews and responds within 48 hours
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 bg-copper rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    4
                  </span>
                  <span className="text-white/90">
                    Approved claims paid within 5-7 business days
                  </span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Hauler Requirements */}
      <section className="section-padding">
        <div className="container-width">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <Car className="w-12 h-12 text-copper mx-auto mb-4" />
              <h2 className="text-display-sm font-bold mb-4">
                Hauler Requirements
              </h2>
              <p className="text-xl text-charcoal/70">
                We only accept Haulers who meet our strict standards.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-border-gray">
              <div className="grid sm:grid-cols-2 gap-4">
                {driverRequirements.map((requirement) => (
                  <div key={requirement} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success-green flex-shrink-0 mt-0.5" />
                    <span className="text-charcoal">{requirement}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 p-6 bg-copper/10 rounded-xl">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-copper flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-navy mb-2">Zero Tolerance Policy</h3>
                  <p className="text-charcoal/70">
                    We have a zero tolerance policy for safety violations. Any Hauler
                    who engages in unsafe behavior, harassment, or fraud is immediately
                    and permanently removed from the platform.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Support */}
      <section className="section-padding bg-navy">
        <div className="container-width text-center">
          <Phone className="w-12 h-12 text-copper mx-auto mb-6" />
          <h2 className="text-display-sm font-bold text-white mb-4">
            Need Help? We're Here.
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Our safety team is available 24/7. If you ever feel unsafe or need
            assistance, don't hesitate to reach out.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+17025551234"
              className="inline-flex items-center justify-center gap-2 bg-copper text-white font-semibold px-8 py-4 rounded-lg hover:bg-copper-600 transition-colors"
            >
              <Phone className="w-5 h-5" />
              Call Safety Line
            </a>
            <Link
              href="/help"
              className="inline-flex items-center justify-center gap-2 bg-transparent text-white font-semibold px-8 py-4 rounded-lg border-2 border-white/30 hover:bg-white hover:text-navy transition-colors"
            >
              Visit Help Center
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
