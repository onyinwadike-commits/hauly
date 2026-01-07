'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import {
  Truck,
  DollarSign,
  Clock,
  Calendar,
  Shield,
  Star,
  CheckCircle2,
  ArrowRight,
  Smartphone,
  MapPin,
  CreditCard,
  Users,
  TrendingUp,
  Car,
  FileCheck,
  Camera,
} from 'lucide-react';

const benefits = [
  {
    icon: DollarSign,
    title: 'Keep 75% of Every Job',
    description:
      'Industry-leading payout. You keep 75% of the job total plus 100% of tips. Get paid weekly via direct deposit.',
  },
  {
    icon: Calendar,
    title: 'Your Schedule, Your Rules',
    description:
      'Work when you want. Accept only the jobs you want. No minimum hours, no mandatory shifts.',
  },
  {
    icon: Smartphone,
    title: 'Simple App, Easy Jobs',
    description:
      'See job details and earnings before accepting. Built-in navigation, photo documentation, and customer chat.',
  },
  {
    icon: Shield,
    title: 'Insurance Coverage',
    description:
      'Supplemental liability coverage while on active jobs. Your personal insurance stays protected.',
  },
  {
    icon: TrendingUp,
    title: 'Earn Bonuses',
    description:
      'Weekly streak bonuses, peak time multipliers, and referral rewards. Top Haulers earn $2,000+/week.',
  },
  {
    icon: Star,
    title: 'Build Your Reputation',
    description:
      'Earn ratings and reviews. Unlock Platinum status for priority job access and higher earnings.',
  },
];

const requirements = [
  {
    icon: Car,
    title: 'Vehicle',
    items: [
      'Pickup truck, cargo van, or box truck',
      'Model year 2010 or newer',
      'Passed inspection within last 12 months',
      'Valid registration and insurance',
    ],
  },
  {
    icon: FileCheck,
    title: 'Documents',
    items: [
      "Valid driver's license (3+ years)",
      'Clean driving record',
      'Auto insurance (state minimum+)',
      'Smartphone with data plan',
    ],
  },
  {
    icon: Users,
    title: 'Background',
    items: [
      'Pass background check',
      'No major violations in past 7 years',
      'No DUI/DWI in past 7 years',
      'Eligible to work in the US',
    ],
  },
];

const howItWorks = [
  {
    step: '01',
    title: 'Apply Online',
    description: 'Complete our simple application in under 10 minutes.',
  },
  {
    step: '02',
    title: 'Get Verified',
    description: 'We run a background check and verify your documents.',
  },
  {
    step: '03',
    title: 'Complete Training',
    description: 'Quick online training on the app and best practices.',
  },
  {
    step: '04',
    title: 'Start Earning',
    description: 'Go online and start accepting jobs in your area.',
  },
];

const faqs = [
  {
    question: 'How much can I earn?',
    answer:
      'Earnings vary based on your vehicle, hours worked, and location. Most Haulers earn $25-50/hour. Top performers with box trucks regularly earn $2,000+ per week.',
  },
  {
    question: 'When do I get paid?',
    answer:
      'Earnings are deposited weekly on Wednesdays for the previous week. You can also access instant payouts for a small fee.',
  },
  {
    question: 'Do I need commercial insurance?',
    answer:
      'Personal auto insurance is required. Commercial insurance is recommended for box truck operators but not required—our supplemental policy covers gaps during active jobs.',
  },
  {
    question: 'Can I work in multiple cities?',
    answer:
      'Yes! Once approved, you can accept jobs anywhere Hauly operates. Great for traveling or seasonal work.',
  },
  {
    question: 'What if I damage something?',
    answer:
      'Our insurance covers accidental damage during jobs. Document everything with before/after photos and report issues immediately through the app.',
  },
];

const earnings = [
  { vehicle: 'Pickup Truck', hourly: '$25-35', weekly: '$800-1,200' },
  { vehicle: 'Cargo Van', hourly: '$35-50', weekly: '$1,200-1,800' },
  { vehicle: 'Box Truck', hourly: '$50-75', weekly: '$1,800-2,500' },
];

export default function DrivePage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    vehicleType: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <>
      <Navigation />

      {/* Hero Section */}
      <section className="bg-navy pt-32 pb-20">
        <div className="container-width px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-copper/20 text-copper px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Truck className="w-4 h-4" />
                DRIVE WITH HAULY
              </div>
              <h1 className="text-display-md md:text-display-lg font-bold text-white mb-6">
                Your truck. Your schedule. Your earnings.
              </h1>
              <p className="text-xl text-white/80 mb-8">
                Join the Hauly network and turn your pickup, van, or box truck into a
                money-making machine. Keep 75% of every job plus 100% of tips.
              </p>

              <div className="flex flex-wrap gap-6 text-white/80 mb-8">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-copper" />
                  <span>No boss, no schedule</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-copper" />
                  <span>Weekly direct deposit</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-copper" />
                  <span>Keep 75% + tips</span>
                </div>
              </div>

              <a
                href="#apply"
                className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4"
              >
                Apply Now <ArrowRight className="w-5 h-5" />
              </a>
            </div>

            {/* Earnings Preview */}
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-xl font-bold text-navy mb-6">
                Potential Weekly Earnings
              </h3>
              <div className="space-y-4">
                {earnings.map((tier) => (
                  <div
                    key={tier.vehicle}
                    className="flex items-center justify-between p-4 bg-light-gray rounded-xl"
                  >
                    <div>
                      <div className="font-semibold text-navy">{tier.vehicle}</div>
                      <div className="text-sm text-charcoal/70">{tier.hourly}/hr</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-copper">
                        {tier.weekly}
                      </div>
                      <div className="text-sm text-charcoal/70">/week</div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-charcoal/50 mt-4 text-center">
                *Based on 30-40 hours/week. Actual earnings vary.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="section-padding">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-display-sm md:text-display-md font-bold mb-4">
              Why Drive with Hauly?
            </h2>
            <p className="text-xl text-charcoal/70 max-w-2xl mx-auto">
              We built Hauly for drivers first. Better pay, better flexibility, better
              support.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="bg-white rounded-xl p-8 shadow-sm border border-border-gray hover:shadow-md transition-shadow"
                >
                  <div className="w-14 h-14 bg-navy rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-copper" />
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-3">{benefit.title}</h3>
                  <p className="text-charcoal/70">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="section-padding bg-light-gray">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-display-sm font-bold mb-4">Requirements</h2>
            <p className="text-xl text-charcoal/70">
              Here's what you need to become a Hauler.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {requirements.map((req) => {
              const Icon = req.icon;
              return (
                <div key={req.title} className="bg-white rounded-xl p-8 shadow-sm">
                  <Icon className="w-10 h-10 text-copper mb-4" />
                  <h3 className="text-xl font-bold text-navy mb-4">{req.title}</h3>
                  <ul className="space-y-3">
                    {req.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-success-green flex-shrink-0 mt-0.5" />
                        <span className="text-charcoal">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-display-sm font-bold mb-4">How to Get Started</h2>
            <p className="text-xl text-charcoal/70">
              From application to first job in as little as 3 days.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div key={step.step} className="relative text-center">
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-border-gray" />
                )}
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-copper text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold text-navy mb-2">{step.title}</h3>
                  <p className="text-charcoal/70">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="section-padding bg-navy">
        <div className="container-width">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-display-sm font-bold text-white mb-4">
                Apply to Drive
              </h2>
              <p className="text-xl text-white/80">
                Start your application in under 10 minutes.
              </p>
            </div>

            {isSubmitted ? (
              <div className="bg-white rounded-xl p-8 text-center">
                <div className="w-16 h-16 bg-success-green rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-navy mb-4">
                  Application Received!
                </h3>
                <p className="text-charcoal/70 mb-6">
                  Thanks for applying, {formData.firstName}! We'll review your
                  application and send next steps to {formData.email} within 24 hours.
                </p>
                <Link href="/" className="btn-primary">
                  Back to Home
                </Link>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-xl p-8 shadow-xl"
              >
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      className="w-full border border-border-gray rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-copper"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      className="w-full border border-border-gray rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-copper"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full border border-border-gray rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-copper"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full border border-border-gray rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-copper"
                    placeholder="(702) 555-1234"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    className="w-full border border-border-gray rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-copper"
                    placeholder="Henderson, NV"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Vehicle Type *
                  </label>
                  <select
                    required
                    value={formData.vehicleType}
                    onChange={(e) =>
                      setFormData({ ...formData, vehicleType: e.target.value })
                    }
                    className="w-full border border-border-gray rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-copper"
                  >
                    <option value="">Select your vehicle</option>
                    <option value="pickup">Pickup Truck</option>
                    <option value="cargo_van">Cargo Van</option>
                    <option value="box_truck">Box Truck (16-26 ft)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-copper text-white font-semibold py-4 rounded-lg hover:bg-copper-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Start Application <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                <p className="text-xs text-charcoal/50 mt-4 text-center">
                  By applying, you agree to our Terms of Service and Privacy Policy.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding">
        <div className="container-width max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-display-sm font-bold mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm border border-border-gray"
              >
                <h3 className="font-bold text-navy text-lg mb-2">{faq.question}</h3>
                <p className="text-charcoal/70">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-charcoal/70 mb-4">Have more questions?</p>
            <Link href="/help" className="text-copper font-semibold hover:underline">
              Visit Driver Help Center →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
