'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import {
  Truck,
  Package,
  Sofa,
  Trash2,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  MapPin,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  Building2,
  Camera,
  Shield
} from 'lucide-react';

type ServiceType = 'apartment_turn' | 'furniture_delivery' | 'junk_removal' | 'other';
type LoadSize = 'light' | 'medium' | 'heavy';

interface QuoteData {
  serviceType: ServiceType | null;
  loadSize: LoadSize | null;
  pickupAddress: string;
  dropoffAddress: string;
  date: string;
  timeSlot: string;
  description: string;
  photos: boolean;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
}

const serviceTypes = [
  {
    id: 'apartment_turn' as ServiceType,
    title: 'Apartment Turn',
    description: 'Clear out furniture, appliances, and debris from a unit.',
    icon: Building2,
    popular: true,
  },
  {
    id: 'furniture_delivery' as ServiceType,
    title: 'Furniture Delivery',
    description: 'Pick up and deliver furniture with white-glove service.',
    icon: Sofa,
    popular: false,
  },
  {
    id: 'junk_removal' as ServiceType,
    title: 'Junk Removal',
    description: 'Remove unwanted items, debris, and household junk.',
    icon: Trash2,
    popular: false,
  },
  {
    id: 'other' as ServiceType,
    title: 'Something Else',
    description: 'Custom hauling job? Tell us what you need.',
    icon: Package,
    popular: false,
  },
];

const loadSizes = [
  {
    id: 'light' as LoadSize,
    title: 'Light Load',
    vehicle: 'Pickup Truck',
    price: 89,
    capacity: 'Up to 1,000 lbs',
    examples: ['Single couch or mattress', 'Small appliances', '10-20 boxes'],
  },
  {
    id: 'medium' as LoadSize,
    title: 'Medium Load',
    vehicle: 'Cargo Van',
    price: 149,
    capacity: 'Up to 3,000 lbs',
    examples: ['Living room set', 'Studio apartment', 'Multiple appliances'],
    popular: true,
  },
  {
    id: 'heavy' as LoadSize,
    title: 'Heavy Load',
    vehicle: 'Box Truck',
    price: 249,
    capacity: 'Up to 10,000 lbs',
    examples: ['Full apartment turn', '2+ bedroom move', 'Estate cleanout'],
  },
];

const timeSlots = [
  '8:00 AM - 10:00 AM',
  '10:00 AM - 12:00 PM',
  '12:00 PM - 2:00 PM',
  '2:00 PM - 4:00 PM',
  '4:00 PM - 6:00 PM',
];

export default function QuotePage() {
  const [step, setStep] = useState(1);
  const [quoteData, setQuoteData] = useState<QuoteData>({
    serviceType: null,
    loadSize: null,
    pickupAddress: '',
    dropoffAddress: '',
    date: '',
    timeSlot: '',
    description: '',
    photos: true,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const totalSteps = 4;

  const updateQuoteData = (updates: Partial<QuoteData>) => {
    setQuoteData((prev) => ({ ...prev, ...updates }));
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return quoteData.serviceType !== null;
      case 2:
        return quoteData.loadSize !== null;
      case 3:
        return (
          quoteData.pickupAddress.trim() !== '' &&
          quoteData.date !== '' &&
          quoteData.timeSlot !== ''
        );
      case 4:
        return (
          quoteData.firstName.trim() !== '' &&
          quoteData.lastName.trim() !== '' &&
          quoteData.email.trim() !== '' &&
          quoteData.phone.trim() !== ''
        );
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsComplete(true);
  };

  const getEstimate = () => {
    const size = loadSizes.find((s) => s.id === quoteData.loadSize);
    if (!size) return { hourly: 0, minimum: 0 };
    return {
      hourly: size.price,
      minimum: size.price * 2,
    };
  };

  if (isComplete) {
    return (
      <>
        <Navigation />
        <section className="bg-navy pt-32 pb-20 min-h-screen">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-24 h-24 bg-success-green rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-display-md font-bold text-white mb-6">
                Quote Request Received!
              </h1>
              <p className="text-xl text-white/80 mb-8">
                Thanks, {quoteData.firstName}! We have received your quote request and will
                contact you within 15 minutes during business hours.
              </p>

              <div className="bg-white rounded-xl p-8 text-left mb-8">
                <h3 className="text-xl font-bold text-navy mb-4">Quote Summary</h3>
                <div className="space-y-3 text-charcoal">
                  <div className="flex justify-between">
                    <span className="text-charcoal/70">Service:</span>
                    <span className="font-medium">
                      {serviceTypes.find((s) => s.id === quoteData.serviceType)?.title}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal/70">Load Size:</span>
                    <span className="font-medium">
                      {loadSizes.find((s) => s.id === quoteData.loadSize)?.title}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal/70">Date:</span>
                    <span className="font-medium">{quoteData.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal/70">Time:</span>
                    <span className="font-medium">{quoteData.timeSlot}</span>
                  </div>
                  <div className="border-t border-border-gray pt-3 mt-3">
                    <div className="flex justify-between text-lg">
                      <span className="font-semibold text-navy">Estimated Total:</span>
                      <span className="font-bold text-copper">
                        ${getEstimate().minimum}+
                      </span>
                    </div>
                    <p className="text-sm text-charcoal/50 mt-1">
                      2-hour minimum, then ${getEstimate().hourly}/hr
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/"
                  className="btn-primary text-center px-8 py-4"
                >
                  Back to Home
                </Link>
                <Link
                  href="/how-it-works"
                  className="btn-ghost text-white border-2 border-white/30 hover:bg-white hover:text-navy text-center px-8 py-4"
                >
                  Learn How It Works
                </Link>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navigation />

      <section className="bg-navy pt-32 pb-8">
        <div className="container-width px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-display-md font-bold text-white mb-4">
            Get Your Free Quote
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Tell us about your hauling needs and get an instant estimate.
          </p>
        </div>
      </section>

      <section className="section-padding bg-light-gray min-h-[60vh]">
        <div className="container-width max-w-3xl">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
                    s === step
                      ? 'bg-copper text-white'
                      : s < step
                      ? 'bg-success-green text-white'
                      : 'bg-white text-charcoal/50 border border-border-gray'
                  }`}
                >
                  {s < step ? <CheckCircle2 className="w-5 h-5" /> : s}
                </div>
              ))}
            </div>
            <div className="h-2 bg-white rounded-full overflow-hidden">
              <div
                className="h-full bg-copper transition-all duration-300"
                style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-sm text-charcoal/70">
              <span>Service</span>
              <span>Load Size</span>
              <span>Details</span>
              <span>Contact</span>
            </div>
          </div>

          {/* Step Content */}
          <div className="bg-white rounded-xl p-8 shadow-sm">
            {/* Step 1: Service Type */}
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-bold text-navy mb-2">
                  What do you need hauled?
                </h2>
                <p className="text-charcoal/70 mb-6">
                  Select the service that best describes your job.
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  {serviceTypes.map((service) => {
                    const Icon = service.icon;
                    const isSelected = quoteData.serviceType === service.id;
                    return (
                      <button
                        key={service.id}
                        onClick={() => updateQuoteData({ serviceType: service.id })}
                        className={`relative p-6 rounded-xl border-2 text-left transition-all ${
                          isSelected
                            ? 'border-copper bg-copper/5'
                            : 'border-border-gray hover:border-copper/50'
                        }`}
                      >
                        {service.popular && (
                          <span className="absolute top-2 right-2 bg-copper text-white text-xs px-2 py-1 rounded-full">
                            Popular
                          </span>
                        )}
                        <div
                          className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                            isSelected ? 'bg-copper' : 'bg-navy'
                          }`}
                        >
                          <Icon
                            className={`w-6 h-6 ${
                              isSelected ? 'text-white' : 'text-copper'
                            }`}
                          />
                        </div>
                        <h3 className="font-bold text-navy mb-1">{service.title}</h3>
                        <p className="text-sm text-charcoal/70">{service.description}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 2: Load Size */}
            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold text-navy mb-2">
                  How big is your load?
                </h2>
                <p className="text-charcoal/70 mb-6">
                  Choose the vehicle size that fits your needs.
                </p>

                <div className="space-y-4">
                  {loadSizes.map((size) => {
                    const isSelected = quoteData.loadSize === size.id;
                    return (
                      <button
                        key={size.id}
                        onClick={() => updateQuoteData({ loadSize: size.id })}
                        className={`w-full p-6 rounded-xl border-2 text-left transition-all ${
                          isSelected
                            ? 'border-copper bg-copper/5'
                            : 'border-border-gray hover:border-copper/50'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-bold text-navy">{size.title}</h3>
                              {size.popular && (
                                <span className="bg-copper text-white text-xs px-2 py-0.5 rounded-full">
                                  Most Popular
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-copper font-medium mb-2">
                              {size.vehicle} • {size.capacity}
                            </p>
                            <p className="text-sm text-charcoal/70">
                              {size.examples.join(' • ')}
                            </p>
                          </div>
                          <div className="text-right ml-4">
                            <div className="text-2xl font-bold text-navy">
                              ${size.price}
                            </div>
                            <div className="text-sm text-charcoal/70">/hour</div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <p className="text-sm text-charcoal/50 mt-4 text-center">
                  2-hour minimum for all bookings
                </p>
              </div>
            )}

            {/* Step 3: Location & Time */}
            {step === 3 && (
              <div>
                <h2 className="text-2xl font-bold text-navy mb-2">
                  Where and when?
                </h2>
                <p className="text-charcoal/70 mb-6">
                  Tell us the pickup location and your preferred schedule.
                </p>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      Pickup Address *
                    </label>
                    <input
                      type="text"
                      value={quoteData.pickupAddress}
                      onChange={(e) =>
                        updateQuoteData({ pickupAddress: e.target.value })
                      }
                      className="w-full border border-border-gray rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-copper"
                      placeholder="123 Main St, Henderson, NV 89012"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      Dropoff Address (if applicable)
                    </label>
                    <input
                      type="text"
                      value={quoteData.dropoffAddress}
                      onChange={(e) =>
                        updateQuoteData({ dropoffAddress: e.target.value })
                      }
                      className="w-full border border-border-gray rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-copper"
                      placeholder="456 Oak Ave, Las Vegas, NV 89101"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        value={quoteData.date}
                        onChange={(e) => updateQuoteData({ date: e.target.value })}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full border border-border-gray rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-copper"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        <Clock className="w-4 h-4 inline mr-1" />
                        Preferred Time *
                      </label>
                      <select
                        value={quoteData.timeSlot}
                        onChange={(e) => updateQuoteData({ timeSlot: e.target.value })}
                        className="w-full border border-border-gray rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-copper"
                      >
                        <option value="">Select time slot</option>
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Job Description (optional)
                    </label>
                    <textarea
                      value={quoteData.description}
                      onChange={(e) =>
                        updateQuoteData({ description: e.target.value })
                      }
                      rows={3}
                      className="w-full border border-border-gray rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-copper"
                      placeholder="Describe items, access requirements, or special instructions..."
                    />
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-light-gray rounded-lg">
                    <input
                      type="checkbox"
                      id="photos"
                      checked={quoteData.photos}
                      onChange={(e) => updateQuoteData({ photos: e.target.checked })}
                      className="mt-1"
                    />
                    <label htmlFor="photos" className="text-sm">
                      <span className="font-medium text-navy flex items-center gap-1">
                        <Camera className="w-4 h-4" />
                        Include before & after photos
                      </span>
                      <span className="text-charcoal/70 block">
                        Timestamped, geotagged photos for documentation (included free)
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Contact Info */}
            {step === 4 && (
              <div>
                <h2 className="text-2xl font-bold text-navy mb-2">
                  Almost done!
                </h2>
                <p className="text-charcoal/70 mb-6">
                  Enter your contact info to receive your quote.
                </p>

                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        <User className="w-4 h-4 inline mr-1" />
                        First Name *
                      </label>
                      <input
                        type="text"
                        value={quoteData.firstName}
                        onChange={(e) =>
                          updateQuoteData({ firstName: e.target.value })
                        }
                        className="w-full border border-border-gray rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-copper"
                        placeholder="John"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        value={quoteData.lastName}
                        onChange={(e) =>
                          updateQuoteData({ lastName: e.target.value })
                        }
                        className="w-full border border-border-gray rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-copper"
                        placeholder="Smith"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      <Mail className="w-4 h-4 inline mr-1" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={quoteData.email}
                      onChange={(e) => updateQuoteData({ email: e.target.value })}
                      className="w-full border border-border-gray rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-copper"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      <Phone className="w-4 h-4 inline mr-1" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={quoteData.phone}
                      onChange={(e) => updateQuoteData({ phone: e.target.value })}
                      className="w-full border border-border-gray rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-copper"
                      placeholder="(702) 555-1234"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      <Building2 className="w-4 h-4 inline mr-1" />
                      Company Name (optional)
                    </label>
                    <input
                      type="text"
                      value={quoteData.company}
                      onChange={(e) => updateQuoteData({ company: e.target.value })}
                      className="w-full border border-border-gray rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-copper"
                      placeholder="Vista Property Management"
                    />
                  </div>
                </div>

                {/* Quote Summary */}
                <div className="mt-8 p-6 bg-light-gray rounded-xl">
                  <h3 className="font-bold text-navy mb-4">Your Estimate</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-charcoal/70">Service:</span>
                      <span className="font-medium">
                        {serviceTypes.find((s) => s.id === quoteData.serviceType)?.title}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-charcoal/70">Vehicle:</span>
                      <span className="font-medium">
                        {loadSizes.find((s) => s.id === quoteData.loadSize)?.vehicle}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-charcoal/70">Rate:</span>
                      <span className="font-medium">${getEstimate().hourly}/hour</span>
                    </div>
                    <div className="border-t border-border-gray pt-2 mt-2">
                      <div className="flex justify-between text-lg">
                        <span className="font-semibold">Estimated Total:</span>
                        <span className="font-bold text-copper">
                          ${getEstimate().minimum}+
                        </span>
                      </div>
                      <p className="text-xs text-charcoal/50 mt-1">
                        2-hour minimum, then ${getEstimate().hourly}/hr after
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-6 text-sm text-charcoal/70">
                  <Shield className="w-4 h-4 text-copper" />
                  <span>Your info is secure and will never be shared.</span>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-border-gray">
              {step > 1 ? (
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 text-charcoal/70 hover:text-charcoal transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back
                </button>
              ) : (
                <div />
              )}

              {step < totalSteps ? (
                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className={`flex items-center gap-2 font-semibold px-6 py-3 rounded-lg transition-colors ${
                    canProceed()
                      ? 'bg-copper text-white hover:bg-copper-600'
                      : 'bg-border-gray text-charcoal/50 cursor-not-allowed'
                  }`}
                >
                  Continue
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!canProceed() || isSubmitting}
                  className={`flex items-center gap-2 font-semibold px-8 py-3 rounded-lg transition-colors ${
                    canProceed() && !isSubmitting
                      ? 'bg-copper text-white hover:bg-copper-600'
                      : 'bg-border-gray text-charcoal/50 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Get My Quote
                      <CheckCircle2 className="w-5 h-5" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-charcoal/70">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-copper" />
              <span>Fully Insured</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-copper" />
              <span>No Hidden Fees</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-copper" />
              <span>Vetted Haulers</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
