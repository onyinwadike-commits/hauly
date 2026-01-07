import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import {
  Building2,
  Clock,
  Camera,
  FileText,
  Users,
  TrendingDown,
  CheckCircle2,
  Calendar,
  DollarSign,
  BarChart3,
  Headphones
} from 'lucide-react';

const benefits = [
  {
    icon: Clock,
    title: 'Faster Turns',
    description: 'Reduce apartment turn time from days to hours with on-demand scheduling.',
    stat: '60%',
    statLabel: 'faster than traditional services',
  },
  {
    icon: Camera,
    title: 'Photo Documentation',
    description: 'Timestamped before/after photos for every job. Perfect for move-out records.',
    stat: '100%',
    statLabel: 'of jobs documented',
  },
  {
    icon: DollarSign,
    title: 'Predictable Pricing',
    description: 'Volume-based discounts and consistent rates. No surprise charges.',
    stat: '20%',
    statLabel: 'average savings',
  },
  {
    icon: BarChart3,
    title: 'Detailed Reporting',
    description: 'Monthly reports on jobs, costs, and savings. Invoice everything at once.',
    stat: 'Real-time',
    statLabel: 'dashboard access',
  },
];

const features = [
  {
    title: 'Dedicated Account Manager',
    description: 'A single point of contact who knows your properties and preferences.',
    icon: Headphones,
  },
  {
    title: 'Priority Scheduling',
    description: 'Jump to the front of the queue. Same-day service when you need it.',
    icon: Calendar,
  },
  {
    title: 'Multi-Property Dashboard',
    description: 'Manage all your locations from one centralized portal.',
    icon: Building2,
  },
  {
    title: 'Team Access',
    description: 'Add property managers and maintenance staff to your account.',
    icon: Users,
  },
  {
    title: 'Monthly Invoicing',
    description: 'One consolidated invoice per billing cycle. Net-30 terms available.',
    icon: FileText,
  },
  {
    title: 'Cost Tracking',
    description: 'Break down costs by property, unit, or job type for easy budgeting.',
    icon: TrendingDown,
  },
];

const useCases = [
  {
    title: 'Move-Out Cleanouts',
    description: 'Clear abandoned furniture and belongings quickly to start the turn process.',
    image: '/images/use-cases/moveout.jpg',
  },
  {
    title: 'Appliance Disposal',
    description: 'Old refrigerators, washers, dryers—we handle proper disposal.',
    image: '/images/use-cases/appliances.jpg',
  },
  {
    title: 'Renovation Debris',
    description: 'Clear construction waste, old flooring, and renovation materials.',
    image: '/images/use-cases/renovation.jpg',
  },
  {
    title: 'Bulk Trash Removal',
    description: 'Common area cleanups, dumpster overflow, and bulk item pickups.',
    image: '/images/use-cases/bulk.jpg',
  },
];

const testimonials = [
  {
    quote: "We've cut our average turn time by 2 full days since switching to Hauly. The photo documentation alone is worth it for liability purposes.",
    author: "Jennifer K.",
    role: "Regional Property Manager",
    company: "Greystar",
    properties: "14 properties, 2,800 units",
  },
  {
    quote: "Having a dedicated account manager who knows our properties has been a game-changer. We just send a text and they handle everything.",
    author: "Marcus T.",
    role: "Maintenance Director",
    company: "Pinnacle Property Management",
    properties: "8 properties, 1,200 units",
  },
];

export default function PropertyManagersPage() {
  return (
    <>
      <Navigation />

      {/* Hero Section */}
      <section className="bg-navy pt-32 pb-20">
        <div className="container-width px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-copper/20 text-copper px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Building2 className="w-4 h-4" />
                FOR PROPERTY MANAGERS
              </div>
              <h1 className="text-display-md md:text-display-lg font-bold mb-6 text-white">
                Turn units faster. <br />
                <span className="text-copper">Document everything.</span>
              </h1>
              <p className="text-xl text-white/80 mb-8">
                On-demand hauling built for multifamily. Reduce turn times,
                cut costs, and get photo documentation for every job.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/demo" className="btn-primary text-center text-lg px-8 py-4">
                  Request Demo
                </Link>
                <Link
                  href="/contact"
                  className="btn-ghost text-white border-2 border-white/30 hover:bg-white hover:text-navy text-center text-lg px-8 py-4"
                >
                  Contact Sales
                </Link>
              </div>

              <div className="flex items-center gap-4 text-white/70 text-sm">
                <CheckCircle2 className="w-5 h-5 text-copper" />
                <span>No setup fees. Cancel anytime.</span>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="bg-white rounded-2xl p-6 shadow-2xl">
                <img
                  src="/images/pm-dashboard-preview.png"
                  alt="Property Manager Dashboard"
                  className="rounded-lg"
                />
              </div>

              {/* Floating stat cards */}
              <div className="absolute -left-8 top-8 bg-white rounded-xl p-4 shadow-xl">
                <div className="text-3xl font-bold text-copper">60%</div>
                <div className="text-sm text-charcoal/70">Faster turns</div>
              </div>

              <div className="absolute -right-8 bottom-8 bg-white rounded-xl p-4 shadow-xl">
                <div className="text-3xl font-bold text-success-green">20%</div>
                <div className="text-sm text-charcoal/70">Cost savings</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="section-padding">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-display-sm font-bold mb-4">
              Why property managers choose Hauly
            </h2>
            <p className="text-xl text-charcoal/70 max-w-2xl mx-auto">
              Built for the unique needs of multifamily operations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.title} className="text-center">
                  <div className="w-16 h-16 bg-navy rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-copper" />
                  </div>
                  <div className="text-4xl font-bold text-copper mb-1">
                    {benefit.stat}
                  </div>
                  <div className="text-sm text-charcoal/70 mb-4">
                    {benefit.statLabel}
                  </div>
                  <h3 className="text-lg font-bold text-navy mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-charcoal/70 text-sm">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-light-gray">
        <div className="container-width">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-display-sm font-bold mb-6">
                Enterprise features included
              </h2>
              <p className="text-xl text-charcoal/70 mb-8">
                Everything you need to manage hauling across your portfolio,
                all included in your business account.
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                {features.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <div key={feature.title} className="flex gap-4">
                      <div className="w-10 h-10 bg-copper/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-copper" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-navy mb-1">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-charcoal/70">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-navy mb-6">
                Get a custom quote
              </h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full border border-border-gray rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-copper"
                    placeholder="Jane Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">
                    Work Email
                  </label>
                  <input
                    type="email"
                    className="w-full border border-border-gray rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-copper"
                    placeholder="jane@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    className="w-full border border-border-gray rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-copper"
                    placeholder="Vista Property Management"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">
                    Number of Units
                  </label>
                  <select className="w-full border border-border-gray rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-copper">
                    <option>Select range</option>
                    <option>1-100 units</option>
                    <option>101-500 units</option>
                    <option>501-1,000 units</option>
                    <option>1,000+ units</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full btn-primary py-4"
                >
                  Get Custom Quote
                </button>
              </form>
              <p className="text-xs text-charcoal/50 text-center mt-4">
                We will respond within 1 business day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="section-padding">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-display-sm font-bold mb-4">
              Common use cases
            </h2>
            <p className="text-xl text-charcoal/70">
              How property managers use Hauly every day.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase) => (
              <div
                key={useCase.title}
                className="bg-light-gray rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-40 bg-navy flex items-center justify-center">
                  <span className="text-4xl">📦</span>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-navy mb-2">{useCase.title}</h3>
                  <p className="text-sm text-charcoal/70">{useCase.description}</p>
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
              Trusted by leading property managers
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8"
              >
                <blockquote className="text-lg text-charcoal mb-6">
                  &quot;{testimonial.quote}&quot;
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-navy rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-navy">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-charcoal/70">
                      {testimonial.role}, {testimonial.company}
                    </div>
                    <div className="text-xs text-copper">
                      {testimonial.properties}
                    </div>
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
          <h2 className="text-display-sm font-bold text-white mb-6">
            Ready to streamline your turns?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join hundreds of property managers who trust Hauly for their hauling needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/demo"
              className="bg-white text-copper font-semibold px-8 py-4 rounded-lg hover:bg-light-gray transition-colors text-lg"
            >
              Schedule a Demo
            </Link>
            <a
              href="tel:+17025551234"
              className="bg-transparent text-white font-semibold px-8 py-4 rounded-lg border-2 border-white hover:bg-white hover:text-copper transition-colors text-lg"
            >
              Call (702) 555-1234
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
