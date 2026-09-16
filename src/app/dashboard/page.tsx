import Dashboard from "@/components/Dashboard";

export default function DashboardPage() {
  return (
    <div>
      <div className="max-w-6xl mx-auto px-4 py-8 border-b border-gray-200">
        <h1 className="text-4xl font-bold mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600 text-lg">
          Anonymized survey data and research findings.
        </p>
      </div>
      <Dashboard />
    </div>
  );
}
