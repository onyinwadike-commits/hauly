'use client';

import { useState } from 'react';

interface SettingsSection {
  id: string;
  title: string;
  description: string;
}

const sections: SettingsSection[] = [
  {
    id: 'general',
    title: 'General',
    description: 'Basic platform settings',
  },
  {
    id: 'notifications',
    title: 'Notifications',
    description: 'Email and alert preferences',
  },
  {
    id: 'pricing',
    title: 'Pricing',
    description: 'Service rates and fees',
  },
  {
    id: 'integrations',
    title: 'Integrations',
    description: 'Third-party service connections',
  },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('general');
  const [isSaving, setIsSaving] = useState(false);

  // General settings state
  const [generalSettings, setGeneralSettings] = useState({
    platformName: 'Hauly',
    supportEmail: 'support@hauly.app',
    supportPhone: '(702) 555-1234',
    timezone: 'America/Los_Angeles',
    maintenanceMode: false,
  });

  // Pricing settings state
  const [pricingSettings, setPricingSettings] = useState({
    pickupRate: 89,
    vanRate: 149,
    boxTruckRate: 249,
    platformFee: 25,
    minimumHours: 2,
  });

  // Notification settings state
  const [notificationSettings, setNotificationSettings] = useState({
    newOrderAlerts: true,
    driverApplications: true,
    paymentAlerts: true,
    dailyReports: false,
    weeklyReports: true,
  });

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-navy">Settings</h1>
        <p className="text-gray-500">Manage platform configuration</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <nav className="bg-white rounded-xl shadow-sm overflow-hidden">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full text-left p-4 border-b border-border-gray transition ${
                  activeSection === section.id
                    ? 'bg-copper/10 border-l-4 border-l-copper'
                    : 'hover:bg-light-gray'
                }`}
              >
                <div
                  className={`font-medium ${
                    activeSection === section.id ? 'text-copper' : 'text-navy'
                  }`}
                >
                  {section.title}
                </div>
                <div className="text-xs text-gray-500">{section.description}</div>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm p-6">
            {/* General Settings */}
            {activeSection === 'general' && (
              <div>
                <h2 className="text-xl font-bold text-navy mb-6">General Settings</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Platform Name
                    </label>
                    <input
                      type="text"
                      value={generalSettings.platformName}
                      onChange={(e) =>
                        setGeneralSettings({
                          ...generalSettings,
                          platformName: e.target.value,
                        })
                      }
                      className="w-full max-w-md border border-border-gray rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-copper"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Support Email
                    </label>
                    <input
                      type="email"
                      value={generalSettings.supportEmail}
                      onChange={(e) =>
                        setGeneralSettings({
                          ...generalSettings,
                          supportEmail: e.target.value,
                        })
                      }
                      className="w-full max-w-md border border-border-gray rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-copper"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Support Phone
                    </label>
                    <input
                      type="tel"
                      value={generalSettings.supportPhone}
                      onChange={(e) =>
                        setGeneralSettings({
                          ...generalSettings,
                          supportPhone: e.target.value,
                        })
                      }
                      className="w-full max-w-md border border-border-gray rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-copper"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Timezone
                    </label>
                    <select
                      value={generalSettings.timezone}
                      onChange={(e) =>
                        setGeneralSettings({
                          ...generalSettings,
                          timezone: e.target.value,
                        })
                      }
                      className="w-full max-w-md border border-border-gray rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-copper"
                    >
                      <option value="America/Los_Angeles">Pacific Time (PT)</option>
                      <option value="America/Denver">Mountain Time (MT)</option>
                      <option value="America/Chicago">Central Time (CT)</option>
                      <option value="America/New_York">Eastern Time (ET)</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-border-gray">
                    <input
                      type="checkbox"
                      id="maintenanceMode"
                      checked={generalSettings.maintenanceMode}
                      onChange={(e) =>
                        setGeneralSettings({
                          ...generalSettings,
                          maintenanceMode: e.target.checked,
                        })
                      }
                      className="w-5 h-5 text-copper rounded"
                    />
                    <label htmlFor="maintenanceMode" className="text-charcoal">
                      <div className="font-medium">Maintenance Mode</div>
                      <div className="text-sm text-gray-500">
                        Temporarily disable new orders and bookings
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Pricing Settings */}
            {activeSection === 'pricing' && (
              <div>
                <h2 className="text-xl font-bold text-navy mb-6">Pricing Settings</h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Pickup Truck Rate ($/hr)
                      </label>
                      <input
                        type="number"
                        value={pricingSettings.pickupRate}
                        onChange={(e) =>
                          setPricingSettings({
                            ...pricingSettings,
                            pickupRate: parseInt(e.target.value),
                          })
                        }
                        className="w-full border border-border-gray rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-copper"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Cargo Van Rate ($/hr)
                      </label>
                      <input
                        type="number"
                        value={pricingSettings.vanRate}
                        onChange={(e) =>
                          setPricingSettings({
                            ...pricingSettings,
                            vanRate: parseInt(e.target.value),
                          })
                        }
                        className="w-full border border-border-gray rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-copper"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Box Truck Rate ($/hr)
                      </label>
                      <input
                        type="number"
                        value={pricingSettings.boxTruckRate}
                        onChange={(e) =>
                          setPricingSettings({
                            ...pricingSettings,
                            boxTruckRate: parseInt(e.target.value),
                          })
                        }
                        className="w-full border border-border-gray rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-copper"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-border-gray">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Platform Fee (%)
                      </label>
                      <input
                        type="number"
                        value={pricingSettings.platformFee}
                        onChange={(e) =>
                          setPricingSettings({
                            ...pricingSettings,
                            platformFee: parseInt(e.target.value),
                          })
                        }
                        className="w-full border border-border-gray rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-copper"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Percentage of job total retained as platform fee
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Minimum Hours
                      </label>
                      <input
                        type="number"
                        value={pricingSettings.minimumHours}
                        onChange={(e) =>
                          setPricingSettings({
                            ...pricingSettings,
                            minimumHours: parseInt(e.target.value),
                          })
                        }
                        className="w-full border border-border-gray rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-copper"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Minimum billable hours per job
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeSection === 'notifications' && (
              <div>
                <h2 className="text-xl font-bold text-navy mb-6">
                  Notification Settings
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      id: 'newOrderAlerts',
                      label: 'New Order Alerts',
                      description: 'Get notified when new orders are placed',
                      checked: notificationSettings.newOrderAlerts,
                    },
                    {
                      id: 'driverApplications',
                      label: 'Driver Applications',
                      description: 'Get notified when new drivers apply',
                      checked: notificationSettings.driverApplications,
                    },
                    {
                      id: 'paymentAlerts',
                      label: 'Payment Alerts',
                      description: 'Get notified about payment issues',
                      checked: notificationSettings.paymentAlerts,
                    },
                    {
                      id: 'dailyReports',
                      label: 'Daily Reports',
                      description: 'Receive daily summary emails',
                      checked: notificationSettings.dailyReports,
                    },
                    {
                      id: 'weeklyReports',
                      label: 'Weekly Reports',
                      description: 'Receive weekly summary emails',
                      checked: notificationSettings.weeklyReports,
                    },
                  ].map((setting) => (
                    <div
                      key={setting.id}
                      className="flex items-center justify-between p-4 bg-light-gray rounded-lg"
                    >
                      <div>
                        <div className="font-medium text-navy">{setting.label}</div>
                        <div className="text-sm text-gray-500">
                          {setting.description}
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={setting.checked}
                          onChange={(e) =>
                            setNotificationSettings({
                              ...notificationSettings,
                              [setting.id]: e.target.checked,
                            })
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-copper peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Integrations Settings */}
            {activeSection === 'integrations' && (
              <div>
                <h2 className="text-xl font-bold text-navy mb-6">Integrations</h2>
                <div className="space-y-4">
                  {[
                    {
                      name: 'Stripe',
                      description: 'Payment processing',
                      status: 'Connected',
                      connected: true,
                    },
                    {
                      name: 'Twilio',
                      description: 'SMS notifications',
                      status: 'Connected',
                      connected: true,
                    },
                    {
                      name: 'Sentry',
                      description: 'Error monitoring',
                      status: 'Connected',
                      connected: true,
                    },
                    {
                      name: 'OneSignal',
                      description: 'Push notifications',
                      status: 'Connected',
                      connected: true,
                    },
                    {
                      name: 'Google Maps',
                      description: 'Maps and geocoding',
                      status: 'Connected',
                      connected: true,
                    },
                    {
                      name: 'Resend',
                      description: 'Transactional emails',
                      status: 'Not connected',
                      connected: false,
                    },
                  ].map((integration) => (
                    <div
                      key={integration.name}
                      className="flex items-center justify-between p-4 border border-border-gray rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-navy rounded-lg flex items-center justify-center text-white font-bold">
                          {integration.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-navy">
                            {integration.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {integration.description}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span
                          className={`text-sm font-medium ${
                            integration.connected
                              ? 'text-success-green'
                              : 'text-gray-500'
                          }`}
                        >
                          {integration.status}
                        </span>
                        <button
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                            integration.connected
                              ? 'border border-border-gray text-charcoal hover:bg-light-gray'
                              : 'bg-copper text-white hover:bg-copper/90'
                          }`}
                        >
                          {integration.connected ? 'Configure' : 'Connect'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="mt-8 pt-6 border-t border-border-gray flex justify-end">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className={`px-6 py-2 rounded-lg font-medium text-white transition ${
                  isSaving ? 'bg-gray-400' : 'bg-copper hover:bg-copper/90'
                }`}
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
