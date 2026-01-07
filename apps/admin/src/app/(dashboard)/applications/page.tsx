import { createServerSupabaseClient } from '@/lib/supabase-server';

async function getApplications() {
  const supabase = await createServerSupabaseClient();

  const { data } = await supabase
    .from('driver_profiles')
    .select(`
      *,
      user:users!driver_profiles_user_id_fkey(id, full_name, email, phone, created_at)
    `)
    .eq('is_approved', false)
    .order('created_at', { ascending: false });

  return data || [];
}

export default async function ApplicationsPage() {
  const applications = await getApplications();

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-navy">Driver Applications</h1>
        <p className="text-gray-500">
          {applications.length} pending application{applications.length !== 1 ? 's' : ''}
        </p>
      </div>

      {applications.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center">
          <div className="text-5xl mb-4">check</div>
          <h2 className="text-xl font-semibold text-navy mb-2">
            All caught up!
          </h2>
          <p className="text-gray-500">
            No pending driver applications to review.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {applications.map((app) => (
            <ApplicationCard key={app.id} application={app} />
          ))}
        </div>
      )}
    </div>
  );
}

function ApplicationCard({ application }: { application: any }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-bold text-navy">
            {application.user?.full_name}
          </h3>
          <p className="text-gray-500">{application.user?.email}</p>
          <p className="text-gray-500 text-sm">{application.user?.phone}</p>
        </div>
        <div className="text-right">
          <span className="text-xs text-gray-400">Applied</span>
          <div className="text-charcoal">
            {new Date(application.created_at).toLocaleDateString()}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        {/* Vehicle Info */}
        <div>
          <span className="text-gray-500 text-sm">Vehicle</span>
          <div className="font-medium">
            {application.vehicle_year} {application.vehicle_make}{' '}
            {application.vehicle_model}
          </div>
          <div className="text-gray-400 text-sm capitalize">
            {application.vehicle_type.replace('_', ' ')} - {application.vehicle_color}
          </div>
        </div>

        {/* License */}
        <div>
          <span className="text-gray-500 text-sm">Drivers License</span>
          <div className="font-medium">{application.drivers_license_number || '-'}</div>
          <div className="text-gray-400 text-sm">
            Exp: {application.drivers_license_expiry || '-'}
          </div>
        </div>

        {/* Insurance */}
        <div>
          <span className="text-gray-500 text-sm">Insurance</span>
          <div className="font-medium">
            {application.insurance_policy_number || '-'}
          </div>
          <div className="text-gray-400 text-sm">
            Exp: {application.insurance_expiry || '-'}
          </div>
        </div>

        {/* Background Check */}
        <div>
          <span className="text-gray-500 text-sm">Background Check</span>
          <div
            className={`font-medium ${
              application.background_check_status === 'passed'
                ? 'text-success-green'
                : application.background_check_status === 'failed'
                ? 'text-error-red'
                : 'text-warning-yellow'
            }`}
          >
            {application.background_check_status.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4 border-t border-border-gray">
        <form action={`/api/applications/${application.id}/approve`} method="POST">
          <button
            type="submit"
            className="bg-success-green text-white px-6 py-2 rounded-lg font-medium hover:bg-success-green/90 transition"
          >
            Approve
          </button>
        </form>
        <form action={`/api/applications/${application.id}/reject`} method="POST">
          <button
            type="submit"
            className="bg-error-red text-white px-6 py-2 rounded-lg font-medium hover:bg-error-red/90 transition"
          >
            Reject
          </button>
        </form>
        <button className="border border-border-gray px-6 py-2 rounded-lg font-medium hover:bg-light-gray transition">
          Request More Info
        </button>
      </div>
    </div>
  );
}
