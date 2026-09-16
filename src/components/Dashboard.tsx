"use client";

import { useState, useEffect } from "react";
import { getStatistics } from "@/lib/api";

interface Statistics {
  total_responses: number;
  avg_score: number;
  high_risk_count: number;
  high_risk_percent: number;
  moderate_risk_count: number;
  moderate_risk_percent: number;
  low_risk_count: number;
  low_risk_percent: number;
  avg_age: number;
  avg_bmi?: number;
  avg_baz?: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      const result = await getStatistics();
      if (result.success && result.data) {
        setStats(result.data);
      } else {
        setError(result.error || "Failed to load statistics");
      }
      setLoading(false);
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-200 rounded w-1/4"></div>
          <div className="grid md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-red-50 p-4 rounded text-red-700">
          {error}
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16">
        <p className="text-gray-600 text-center">No data available yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Key Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600 text-sm mb-1">Total Responses</p>
          <p className="text-3xl font-bold text-blue-600">{stats.total_responses}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600 text-sm mb-1">Average Risk Score</p>
          <p className="text-3xl font-bold text-purple-600">
            {stats.avg_score.toFixed(1)}
          </p>
          <p className="text-xs text-gray-500">out of 100</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600 text-sm mb-1">Average Age</p>
          <p className="text-3xl font-bold text-green-600">
            {stats.avg_age.toFixed(1)}
          </p>
          <p className="text-xs text-gray-500">years</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600 text-sm mb-1">Avg BMI</p>
          <p className="text-3xl font-bold text-orange-600">
            {stats.avg_bmi ? stats.avg_bmi.toFixed(1) : "N/A"}
          </p>
        </div>
      </div>

      {/* Risk Distribution */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-red-500">
          <p className="text-gray-600 text-sm mb-2">High Risk</p>
          <p className="text-2xl font-bold text-red-600">
            {stats.high_risk_count}
            <span className="text-lg text-gray-600 ml-2">
              ({stats.high_risk_percent}%)
            </span>
          </p>
          <p className="text-xs text-gray-500 mt-2">Students at high nutritional risk</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-yellow-500">
          <p className="text-gray-600 text-sm mb-2">Moderate Risk</p>
          <p className="text-2xl font-bold text-yellow-600">
            {stats.moderate_risk_count}
            <span className="text-lg text-gray-600 ml-2">
              ({stats.moderate_risk_percent}%)
            </span>
          </p>
          <p className="text-xs text-gray-500 mt-2">Students at moderate risk</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
          <p className="text-gray-600 text-sm mb-2">Low Risk</p>
          <p className="text-2xl font-bold text-green-600">
            {stats.low_risk_count}
            <span className="text-lg text-gray-600 ml-2">
              ({stats.low_risk_percent}%)
            </span>
          </p>
          <p className="text-xs text-gray-500 mt-2">Students at low risk</p>
        </div>
      </div>

      {/* Risk Distribution Chart (Text-based for now) */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-bold mb-4">Risk Distribution</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">High Risk</span>
              <span className="text-sm font-medium text-red-600">
                {stats.high_risk_percent}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-red-500 h-3 rounded-full"
                style={{ width: `${stats.high_risk_percent}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Moderate Risk</span>
              <span className="text-sm font-medium text-yellow-600">
                {stats.moderate_risk_percent}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-yellow-500 h-3 rounded-full"
                style={{ width: `${stats.moderate_risk_percent}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Low Risk</span>
              <span className="text-sm font-medium text-green-600">
                {stats.low_risk_percent}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-green-500 h-3 rounded-full"
                style={{ width: `${stats.low_risk_percent}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded p-4 text-sm text-blue-900">
        <p>
          <strong>Note:</strong> This dashboard displays anonymized data from
          the screening survey. Individual results are confidential and not shown here.
        </p>
      </div>
    </div>
  );
}
