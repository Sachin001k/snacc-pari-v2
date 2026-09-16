"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Response {
  sgic?: string;
  school?: string;
  age?: string;
  score?: string;
  band?: string;
  created_at?: string;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [responses, setResponses] = useState<Response[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const auth = localStorage.getItem("admin_authenticated");
    if (!auth) {
      router.push("/admin/login");
      return;
    }

    setIsAuthenticated(true);

    // Fetch responses
    const fetchResponses = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
        const res = await fetch(`${apiUrl}/api/responses?limit=50`);
        const data = await res.json();
        setResponses(data.responses || []);
      } catch (err) {
        setError(String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("admin_authenticated");
    localStorage.removeItem("admin_login_time");
    router.push("/");
  };

  const handleExport = () => {
    if (responses.length === 0) return;

    // Create CSV
    const headers = Object.keys(responses[0]);
    const csv = [
      headers.join(","),
      ...responses.map((r) =>
        headers.map((h) => `"${(r as any)[h] || ""}"`).join(",")
      ),
    ].join("\n");

    // Download
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `snacc-pari-responses-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded hover:bg-gray-50"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Toolbar */}
        <div className="bg-white p-4 rounded-lg shadow mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Responses</h2>
            <p className="text-sm text-gray-600">
              Total: <span className="font-bold">{responses.length}</span>
            </p>
          </div>
          <button
            onClick={handleExport}
            disabled={responses.length === 0}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Export CSV
          </button>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading...</div>
          ) : error ? (
            <div className="p-8 text-center text-red-600">{error}</div>
          ) : responses.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No responses yet.
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                    SGIC
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                    School
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                    Age
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                    Score
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                    Risk Level
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {responses.map((response, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-3 text-sm text-gray-900">
                      {response.sgic || "-"}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-900">
                      {response.school || "-"}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-900">
                      {response.age || "-"}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-900">
                      {response.score || "-"}
                    </td>
                    <td className="px-6 py-3 text-sm">
                      <span
                        className={`px-2 py-1 rounded text-white text-xs font-semibold ${
                          response.band === "High"
                            ? "bg-red-600"
                            : response.band === "Moderate"
                              ? "bg-yellow-600"
                              : "bg-green-600"
                        }`}
                      >
                        {response.band || "-"}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-600">
                      {response.created_at
                        ? new Date(response.created_at).toLocaleDateString()
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
