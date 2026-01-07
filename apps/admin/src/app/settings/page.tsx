'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'integrations', label: 'Integrations' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1E3A5F]">Settings</h1>
          <p className="text-gray-500">Manage platform configuration</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeTab === tab.id
                  ? 'bg-[#1E3A5F] text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          {activeTab === 'general' && (
            <div className="space-y-6 max-w-xl">
              <h2 className="text-xl font-bold text-[#1E3A5F]">General Settings</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Platform Name
                </label>
                <input
                  type="text"
                  defaultValue="Hauly"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#B87333]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Support Email
                </label>
                <input
                  type="email"
                  defaultValue="support@hauly.app"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#B87333]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Support Phone
                </label>
                <input
                  type="tel"
                  defaultValue="(702) 555-1234"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#B87333]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timezone
                </label>
                <select className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#B87333]">
                  <option>Pacific Time (PT)</option>
                  <option>Mountain Time (MT)</option>
                  <option>Central Time (CT)</option>
                  <option>Eastern Time (ET)</option>
                </select>
              </div>

              <button className="bg-[#B87333] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#9A5F28] transition">
                Save Changes
              </button>
            </div>
          )}

          {activeTab === 'pricing' && (
            <div className="space-y-6 max-w-xl">
              <h2 className="text-xl font-bold text-[#1E3A5F]">Pricing Settings</h2>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pickup Rate ($/hr)
                  </label>
                  <input
                    type="number"
                    defaultValue="89"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#B87333]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Van Rate ($/hr)
                  </label>
                  <input
                    type="number"
                    defaultValue="149"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#B87333]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Box Truck ($/hr)
                  </label>
                  <input
                    type="number"
                    defaultValue="249"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#B87333]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Platform Fee (%)
                  </label>
                  <input
                    type="number"
                    defaultValue="25"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#B87333]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Hours
                  </label>
                  <input
                    type="number"
                    defaultValue="2"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#B87333]"
                  />
                </div>
              </div>

              <button className="bg-[#B87333] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#9A5F28] transition">
                Save Changes
              </button>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-4 max-w-xl">
              <h2 className="text-xl font-bold text-[#1E3A5F]">Notification Settings</h2>

              {[
                { label: 'New Order Alerts', desc: 'Get notified when new orders are placed' },
                { label: 'Driver Applications', desc: 'Get notified when new drivers apply' },
                { label: 'Payment Alerts', desc: 'Get notified about payment issues' },
                { label: 'Daily Reports', desc: 'Receive daily summary emails' },
                { label: 'Weekly Reports', desc: 'Receive weekly summary emails' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <div className="font-medium text-[#1E3A5F]">{item.label}</div>
                    <div className="text-sm text-gray-500">{item.desc}</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-[#B87333] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </label>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'integrations' && (
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-xl font-bold text-[#1E3A5F]">Integrations</h2>

              {[
                { name: 'Stripe', desc: 'Payment processing', connected: true },
                { name: 'Twilio', desc: 'SMS notifications', connected: true },
                { name: 'Sentry', desc: 'Error monitoring', connected: true },
                { name: 'OneSignal', desc: 'Push notifications', connected: true },
                { name: 'Google Maps', desc: 'Maps and geocoding', connected: true },
                { name: 'Resend', desc: 'Transactional emails', connected: false },
              ].map((integration) => (
                <div
                  key={integration.name}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#1E3A5F] rounded-lg flex items-center justify-center text-white font-bold">
                      {integration.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-[#1E3A5F]">{integration.name}</div>
                      <div className="text-sm text-gray-500">{integration.desc}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`text-sm font-medium ${
                        integration.connected ? 'text-green-600' : 'text-gray-500'
                      }`}
                    >
                      {integration.connected ? 'Connected' : 'Not connected'}
                    </span>
                    <button
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                        integration.connected
                          ? 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                          : 'bg-[#B87333] text-white hover:bg-[#9A5F28]'
                      }`}
                    >
                      {integration.connected ? 'Configure' : 'Connect'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
