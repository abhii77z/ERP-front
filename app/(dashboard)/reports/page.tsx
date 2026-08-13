export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Reports</h2>
        <p className="text-slate-500">Business insights and analytics</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {['Sales Report', 'Purchase Report', 'Inventory Report', 'Expense Report', 'Profit & Loss'].map((report) => (
          <div key={report} className="p-6 border border-slate-200 rounded-lg bg-white shadow-sm flex flex-col items-start hover:border-blue-500 cursor-pointer transition-colors">
            <h3 className="font-medium text-lg text-slate-900">{report}</h3>
            <p className="text-sm text-slate-500 mt-1 mb-4">View detailed {report.toLowerCase()}</p>
            <span className="text-blue-600 text-sm font-medium mt-auto">Generate Report →</span>
          </div>
        ))}
      </div>
    </div>
  );
}
