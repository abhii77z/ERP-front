export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Settings</h2>
        <p className="text-slate-500">Manage business preferences and configurations</p>
      </div>
      <div className="grid gap-6 md:grid-cols-4">
        <div className="md:col-span-1 space-y-1">
          {['General', 'Business Profile', 'Branches', 'Users & Roles', 'Tax Settings', 'Notifications'].map(item => (
            <button key={item} className={`w-full text-left px-3 py-2 text-sm font-medium rounded-md ${item === 'General' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50'}`}>
              {item}
            </button>
          ))}
        </div>
        <div className="md:col-span-3 bg-white border border-slate-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-slate-900 mb-4">General Settings</h3>
          <div className="space-y-4 max-w-md">
            <div className="space-y-2">
              <label className="text-sm font-medium">Business Name</label>
              <input type="text" defaultValue="TechZone Electronics" className="flex h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Default Currency</label>
              <select className="flex h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm">
                <option>INR (₹)</option>
                <option>USD ($)</option>
              </select>
            </div>
            <button className="h-10 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}
