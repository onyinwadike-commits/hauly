import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import {
  Truck,
  Clock,
  Shield,
  Star,
  CheckCircle2,
  ArrowRight,
  Building2,
  Camera,
  CreditCard,
  MapPin
} from 'lucide-react';

const services = [
  {
    icon: '🏠',
    title: 'Apartment Turns',
    description: 'Fast furniture removal and junk hauling for property managers and landlords.',
  },
  {
    icon: '🛋️',
    title: 'Furniture Delivery',
    description: 'White-glove delivery and setup for new or used furniture purchases.',
  },
  {
    icon: '🗑️',
    title: 'Junk Removal',
    description: 'Eco-friendly disposal of household items, appliances, and debris.',
  },
  {
    icon: '📦',
    title: 'Small Moves',
    description: 'Single item or small load moves across town. No job too small.',
  },
];

const howItWorks = [
  {
    step: '01',
    title: 'Book in minutes',
    description: 'Tell us what you need moved, where, and when. Get an instant quote.',
    icon: Clock,
  },
  {
    step: '02',
    title: 'Get matched',
    description: 'We assign a vetted, background-checked Hauler with the right vehicle.',
    icon: Truck,
  },
  {
    step: '03',
    title: 'Track in real-time',
    description: "Follow your Hauler's location live. Get before & after photos.",
    icon: MapPin,
  },
  {
    step: '04',
    title: 'Pay seamlessly',
    description: "Automatic payment when the job's done. No cash, no hassle.",
    icon: CreditCard,
  },
];

const stats = [
  { value: '10,000+', label: 'Hauls Completed' },
  { value: '4.9', label: 'Average Rating' },
  { value: '98%', label: 'On-Time Rate' },
  { value: '15 min', label: 'Avg. Response Time' },
];

const testimonials = [
  {
    quote: "Hauly has transformed how we handle apartment turns. What used to take days now takes hours.",
    author: "Sarah M.",
    role: "Property Manager",
    company: "Vista Property Group",
    rating: 5,
  },
  {
    quote: "Professional, punctual, and the photo documentation is a game-changer for accountability.",
    author: "Mike T.",
    role: "Operations Director",
    company: "Desert Springs Apartments",
    rating: 5,
  },
  {
    quote: "Finally, a hauling service that treats drivers fairly. The 75% payout is why I switched.",
    author: "Carlos R.",
    role: "Hauler",
    company: "Independent Contractor",
    rating: 5,
  },
];

export default function HomePage() {
  return (
    <>
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-navy min-h-[90vh] flex items-center">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container-width section-padding relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="text-white">
              <h1 className="text-display-lg md:text-display-xl font-bold mb-6 text-white">
                Hauling, <br />
                <span className="text-copper">handled.</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-lg">
                On-demand pickup trucks, cargo vans, and box trucks.
                Book in minutes. Track in real-time. Consider it handled.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link href="/quote" className="btn-primary text-center text-lg px-8 py-4">
                  Get a Free Quote
                </Link>
                <Link
                  href="/how-it-works"
                  className="btn-ghost text-white border-2 border-white/30 hover:bg-white hover:text-navy text-center text-lg px-8 py-4"
                >
                  See How It Works
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-6 text-white/70 text-sm">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-copper" />
                  <span>Fully Insured</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-copper" />
                  <span>Background Checked</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-copper" />
                  <span>4.9 Star Rated</span>
                </div>
              </div>
            </div>

            {/* Hero Image/App Preview */}
            <div className="relative hidden lg:block">
              <div className="relative">
                {/* Phone Mockup */}
                <div className="bg-white rounded-[3rem] p-3 shadow-2xl max-w-[320px] mx-auto">
                  <div className="bg-light-gray rounded-[2.5rem] overflow-hidden">
                    <img
                      src="/images/app-screenshot-home.png"
                      alt="Hauly App"
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Floating Cards */}
                <div className="absolute -left-20 top-1/4 bg-white rounded-xl p-4 shadow-xl animate-fade-in">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-success-green/10 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-success-green" />
                    </div>
                    <div>
                      <div className="font-semibold text-navy">Driver Matched</div>
                      <div className="text-sm text-gray-500">ETA: 12 minutes</div>
                    </div>
                  </div>
                </div>

                <div className="absolute -right-16 bottom-1/4 bg-white rounded-xl p-4 shadow-xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-copper/10 rounded-full flex items-center justify-center">
                      <Camera className="w-6 h-6 text-copper" />
                    </div>
                    <div>
                      <div className="font-semibold text-navy">Photos Captured</div>
                      <div className="text-sm text-gray-500">Before & after</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-copper py-8">
        <div className="container-width px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
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

      {/* Services Section */}
      <section className="section-padding bg-light-gray">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-display-sm md:text-display-md font-bold mb-4">
              What We Haul
            </h2>
            <p className="text-xl text-charcoal/70 max-w-2xl mx-auto">
              From single items to full apartment cleanouts. Our network of professional
              Haulers handles it all.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-charcoal/70">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-copper font-semibold hover:gap-3 transition-all"
            >
              View all services <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section-padding">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-display-sm md:text-display-md font-bold mb-4">
              How Hauly Works
            </h2>
            <p className="text-xl text-charcoal/70 max-w-2xl mx-auto">
              Get your items hauled in four simple steps. No phone calls, no waiting.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="relative">
                  {/* Connector Line */}
                  {index < howItWorks.length - 1 && (
                    <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-border-gray" />
                  )}

                  <div className="relative z-10">
                    <div className="w-24 h-24 bg-navy rounded-2xl flex items-center justify-center mb-6 mx-auto lg:mx-0">
                      <Icon className="w-10 h-10 text-copper" />
                    </div>
                    <div className="text-copper font-bold text-sm mb-2 text-center lg:text-left">
                      STEP {step.step}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-center lg:text-left">
                      {step.title}
                    </h3>
                    <p className="text-charcoal/70 text-center lg:text-left">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link href="/quote" className="btn-primary text-lg px-8 py-4">
              Book Your First Haul
            </Link>
          </div>
        </div>
      </section>

      {/* Property Managers CTA */}
      <section className="section-padding bg-navy">
        <div className="container-width">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-copper/20 text-copper px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Building2 className="w-4 h-4" />
                FOR PROPERTY MANAGERS
              </div>
              <h2 className="text-display-sm md:text-display-md font-bold mb-6 text-white">
                Streamline your apartment turns
              </h2>
              <p className="text-xl text-white/80 mb-8">
                Reduce turnover time from days to hours. Get dedicated pricing,
                priority scheduling, and detailed documentation for every job.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  'Dedicated account manager',
                  'Volume-based pricing discounts',
                  'Priority scheduling & response',
                  'Detailed photo documentation',
                  'Monthly invoicing & reporting',
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-white/90">
                    <CheckCircle2 className="w-5 h-5 text-copper flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/property-managers"
                  className="btn-primary text-center"
                >
                  Learn More
                </Link>
                <Link
                  href="/demo"
                  className="btn-ghost text-white border-2 border-white/30 hover:bg-white hover:text-navy text-center"
                >
                  Request Demo
                </Link>
              </div>
            </div>

            <div className="relative">
              <img
                src="/images/property-manager-dashboard.png"
                alt="Hauly Business Dashboard"
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-display-sm md:text-display-md font-bold mb-4">
              Trusted by thousands
            </h2>
            <p className="text-xl text-charcoal/70">
              See what our customers and Haulers have to say.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-sm border border-border-gray"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-copper text-copper"
                    />
                  ))}
                </div>

                <blockquote className="text-charcoal mb-6">
                  &quot;{testimonial.quote}&quot;
                </blockquote>

                <div className="flex items-center gap-3">
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section-padding bg-copper">
        <div className="container-width text-center">
          <h2 className="text-display-sm md:text-display-md font-bold text-white mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Book your first haul in minutes. No commitment, no hidden fees.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quote"
              className="bg-white text-copper font-semibold px-8 py-4 rounded-lg hover:bg-light-gray transition-colors text-lg"
            >
              Get a Free Quote
            </Link>
            <Link
              href="/drive"
              className="bg-transparent text-white font-semibold px-8 py-4 rounded-lg border-2 border-white hover:bg-white hover:text-copper transition-colors text-lg"
            >
              Become a Hauler
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
