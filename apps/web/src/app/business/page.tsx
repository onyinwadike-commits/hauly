import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import {
  Building2,
  CheckCircle2,
  Clock,
  CreditCard,
  FileText,
  Users,
  TrendingUp,
  Calendar,
  Headphones,
  BarChart3,
  ArrowRight,
  Star,
  Truck,
  Shield,
} from 'lucide-react';

const benefits = [
  {
    icon: CreditCard,
    title: 'Volume Discounts',
    description:
      'Save 10-20% on every job with our business pricing tiers. The more you haul, the more you save.',
  },
  {
    icon: Calendar,
    title: 'Priority Scheduling',
    description:
      'Get first access to Haulers during peak times. Your jobs are always prioritized.',
  },
  {
    icon: FileText,
    title: 'Monthly Invoicing',
    description:
      'No more individual payments. Get a single monthly invoice with detailed job breakdown.',
  },
  {
    icon: Users,
    title: 'Dedicated Account Manager',
    description:
      'Your personal point of contact for scheduling, issues, and optimizing your hauling operations.',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description:
      'Track spending, job history, turnaround times, and identify opportunities for efficiency.',
  },
  {
    icon: Headphones,
    title: 'Priority Support',
    description:
      'Skip the queue. Business accounts get direct access to our enterprise support team.',
  },
];

const useCases = [
  {
    industry: 'Property Management',
    icon: Building2,
    description: 'Apartment turns, tenant cleanouts, and maintenance hauling.',
    stats: '60% faster turns',
  },
  {
    industry: 'Retail & E-Commerce',
    icon: Truck,
    description: 'Last-mile delivery, returns processing, and inventory transfers.',
    stats: 'Same-day delivery',
  },
  {
    industry: 'Construction',
    icon: TrendingUp,
    description: 'Debris removal, material delivery, and job site cleanup.',
    stats: 'On-demand capacity',
  },
];

const pricingTiers = [
  {
    name: 'Starter',
    jobsPerMonth: '5-15',
    discount: '10%',
    features: [
      'Volume discount on all jobs',
      'Monthly invoicing',
      'Email support',
      'Basic analytics',
    ],
  },
  {
    name: 'Professional',
    jobsPerMonth: '16-50',
    discount: '15%',
    popular: true,
    features: [
      'Everything in Starter',
      'Priority scheduling',
      'Dedicated account manager',
      'Phone support',
      'Advanced analytics',
    ],
  },
  {
    name: 'Enterprise',
    jobsPerMonth: '50+',
    discount: '20%',
    features: [
      'Everything in Professional',
      'Custom pricing',
      'API access',
      'SLA guarantees',
      'Custom integrations',
      'Quarterly business reviews',
    ],
  },
];

const testimonials = [
  {
    quote:
      'Hauly has cut our apartment turn time in half. The before/after photos are invaluable for documentation.',
    author: 'Maria S.',
    role: 'Operations Manager',
    company: 'Sunrise Property Group',
    savings: '45% cost reduction',
  },
  {
    quote:
      'The dedicated account manager understands our business. Scheduling 20+ jobs per month has never been easier.',
    author: 'James T.',
    role: 'Facilities Director',
    company: 'Desert Valley Apartments',
    savings: '12 hours/week saved',
  },
];

export default function BusinessPage() {
  return (
    <>
      <Navigation />

      {/* Hero Section */}
      <section className="bg-navy pt-32 pb-20">
        <div className="container-width px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-copper/20 text-copper px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Building2 className="w-4 h-4" />
                HAULY FOR BUSINESS
              </div>
              <h1 className="text-display-md md:text-display-lg font-bold text-white mb-6">
                Hauling at scale, handled.
              </h1>
              <p className="text-xl text-white/80 mb-8">
                From property management to retail logistics, Hauly helps businesses
                move more while spending less. Get volume discounts, priority service,
                and dedicated support.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/demo"
                  className="btn-primary text-center text-lg px-8 py-4"
                >
                  Request Demo
                </Link>
                <Link
                  href="/contact"
                  className="btn-ghost text-white border-2 border-white/30 hover:bg-white hover:text-navy text-center text-lg px-8 py-4"
                >
                  Contact Sales
                </Link>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="bg-white/10 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-copper mb-2">500+</div>
                    <div className="text-white/70 text-sm">Business Accounts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-copper mb-2">20%</div>
                    <div className="text-white/70 text-sm">Average Savings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-copper mb-2">15min</div>
                    <div className="text-white/70 text-sm">Avg. Response Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-copper mb-2">98%</div>
                    <div className="text-white/70 text-sm">On-Time Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="section-padding">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-display-sm md:text-display-md font-bold mb-4">
              Built for Business
            </h2>
            <p className="text-xl text-charcoal/70 max-w-2xl mx-auto">
              Everything you need to manage hauling operations at any scale.
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
                  <div className="w-14 h-14 bg-copper/10 rounded-xl flex items-center justify-center mb-6">
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

      {/* Use Cases */}
      <section className="section-padding bg-light-gray">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-display-sm font-bold mb-4">Industries We Serve</h2>
            <p className="text-xl text-charcoal/70">
              Trusted by businesses across multiple sectors.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase) => {
              const Icon = useCase.icon;
              return (
                <div
                  key={useCase.industry}
                  className="bg-white rounded-xl p-8 shadow-sm"
                >
                  <Icon className="w-10 h-10 text-copper mb-4" />
                  <h3 className="text-xl font-bold text-navy mb-2">
                    {useCase.industry}
                  </h3>
                  <p className="text-charcoal/70 mb-4">{useCase.description}</p>
                  <div className="inline-block bg-success-green/10 text-success-green text-sm font-medium px-3 py-1 rounded-full">
                    {useCase.stats}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="section-padding">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-display-sm font-bold mb-4">Business Pricing</h2>
            <p className="text-xl text-charcoal/70">
              The more you haul, the more you save.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative bg-white rounded-2xl overflow-hidden ${
                  tier.popular
                    ? 'ring-2 ring-copper shadow-lg'
                    : 'border border-border-gray'
                }`}
              >
                {tier.popular && (
                  <div className="bg-copper text-white text-center py-2 text-sm font-semibold">
                    MOST POPULAR
                  </div>
                )}

                <div className="p-8">
                  <h3 className="text-2xl font-bold text-navy mb-2">{tier.name}</h3>
                  <div className="text-charcoal/70 mb-4">
                    {tier.jobsPerMonth} jobs/month
                  </div>

                  <div className="mb-6">
                    <span className="text-4xl font-bold text-copper">
                      {tier.discount}
                    </span>
                    <span className="text-charcoal/70"> off all jobs</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-success-green flex-shrink-0 mt-0.5" />
                        <span className="text-charcoal">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/demo"
                    className={`block w-full text-center py-3 rounded-lg font-semibold transition-colors ${
                      tier.popular
                        ? 'bg-copper text-white hover:bg-copper-600'
                        : 'bg-navy text-white hover:bg-navy-600'
                    }`}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-navy">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-display-sm font-bold text-white mb-4">
              Trusted by Industry Leaders
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-8">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-copper text-copper" />
                  ))}
                </div>
                <blockquote className="text-lg text-charcoal mb-6">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-navy">{testimonial.author}</div>
                    <div className="text-sm text-charcoal/70">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                  <div className="bg-success-green/10 text-success-green text-sm font-medium px-3 py-1 rounded-full">
                    {testimonial.savings}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-copper">
        <div className="container-width text-center">
          <h2 className="text-display-sm md:text-display-md font-bold text-white mb-6">
            Ready to streamline your hauling?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join 500+ businesses saving time and money with Hauly. Get a custom quote
            for your operation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/demo"
              className="inline-flex items-center justify-center gap-2 bg-white text-copper font-semibold px-8 py-4 rounded-lg hover:bg-light-gray transition-colors text-lg"
            >
              Request Demo
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:+17025551234"
              className="inline-flex items-center justify-center gap-2 bg-transparent text-white font-semibold px-8 py-4 rounded-lg border-2 border-white hover:bg-white hover:text-copper transition-colors text-lg"
            >
              Call Sales: (702) 555-1234
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
