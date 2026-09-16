"use client";

import { useState } from "react";
import { SURVEY_SECTIONS, SURVEY_QUESTIONS } from "@/lib/constants";
import { submitSurvey, calculateScore } from "@/lib/api";

export default function SurveyForm() {
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({
    // Demographics defaults
    age: 13,
    sex: "M",
    grade: "8",
    school: "",
    sgic: "",
    // Anthropometry defaults
    height_cm: 150,
    weight_kg: 45,
    measured_flag: "No",
    // Dietary defaults
    fg_grains: "1-2 days/week",
    fg_pulses: "1-2 days/week",
    fg_nuts: "Never",
    fg_dairy: "1-2 days/week",
    fg_eggs: "Never",
    fg_meatfish: "Never",
    fg_greens: "1-2 days/week",
    fg_othveg: "1-2 days/week",
    fg_vitafruit: "Never",
    fg_othfruit: "Never",
    // Economic defaults
    fi_worry: "Never",
    meals_day: "3",
    cost_barrier: "No",
    // Awareness defaults
    know_protein: "Roughly",
    think_balanced: "Sometimes",
    know_needs: "Somewhat",
    // Barriers defaults
    avail_protein: "Easily available",
    school_meal: "Yes, daily",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState<any>(null);

  const sections = Object.keys(SURVEY_QUESTIONS) as Array<
    keyof typeof SURVEY_QUESTIONS
  >;
  const currentSectionKey = sections[currentSection];
  const currentQuestions = SURVEY_QUESTIONS[currentSectionKey];
  const totalSections = sections.length;

  const handleChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const handleNext = () => {
    if (currentSection < totalSections - 1) {
      setCurrentSection((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSection > 0) {
      setCurrentSection((prev) => prev - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate required fields
    if (!formData.age || !formData.height_cm || !formData.weight_kg) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    try {
      const surveyResponse = {
        sgic: formData.sgic || "ANONYMOUS",
        school: formData.school || "Not specified",
        age: parseInt(formData.age),
        grade: formData.grade || "Not specified",
        sex: formData.sex || "Not specified",
        height_cm: parseFloat(formData.height_cm),
        weight_kg: parseFloat(formData.weight_kg),
        measured_flag: formData.measured_flag || "No",
        ...formData,
      };

      console.log("Submitting survey data:", surveyResponse);

      // Submit survey
      const submitResult = await submitSurvey(surveyResponse);
      console.log("Submit result:", submitResult);

      if (!submitResult.success) {
        setError(`Failed: ${submitResult.error || "Unknown error"}`);
        setLoading(false);
        return;
      }

      setResults(submitResult.data);
      setLoading(false);
    } catch (err) {
      console.error("Error submitting survey:", err);
      setError(`Error: ${String(err)}`);
      setLoading(false);
    }
  };

  // Results view
  if (results) {
    return (
      <div className="bg-white p-8 rounded-lg shadow max-w-2xl">
        <h2 className="text-3xl font-bold mb-4">Your Results</h2>

        <div className="bg-blue-50 p-6 rounded-lg mb-6">
          <p className="text-gray-600 mb-2">Risk Score</p>
          <div className="text-5xl font-bold text-blue-600 mb-2">
            {results.risk_score || "N/A"}
          </div>
          <p className="text-lg font-semibold text-gray-800">
            Risk Level:{" "}
            <span className={`${
              results.risk_level === "High"
                ? "text-red-600"
                : results.risk_level === "Moderate"
                  ? "text-yellow-600"
                  : "text-green-600"
            }`}>
              {results.risk_level || "Unknown"}
            </span>
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-4">Domain Breakdown</h3>
          <div className="space-y-3">
            {Object.entries(results.domain_scores || {}).map(
              ([domain, score]: [string, any]) => (
                <div key={domain} className="flex justify-between">
                  <span className="capitalize text-gray-700">{domain}</span>
                  <span className="font-semibold">{score}%</span>
                </div>
              )
            )}
          </div>
        </div>

        {results.recommendations && (
          <div className="mb-6 bg-green-50 p-4 rounded-lg">
            <h3 className="font-bold text-green-900 mb-2">Recommendations</h3>
            <ul className="list-disc list-inside space-y-1 text-green-900">
              {results.recommendations.map((rec: string, idx: number) => (
                <li key={idx}>{rec}</li>
              ))}
            </ul>
          </div>
        )}

        <p className="text-sm text-gray-500 mb-6">
          This is an anonymous screening tool and does not replace clinical diagnosis.
        </p>

        <button
          onClick={() => {
            setCurrentSection(0);
            setFormData({});
            setResults(null);
          }}
          className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700"
        >
          Take Survey Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow max-w-2xl">
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <h2 className="text-2xl font-bold">
            {SURVEY_SECTIONS[currentSection]}
          </h2>
          <span className="text-gray-600">
            Step {currentSection + 1}/{totalSections}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{
              width: `${((currentSection + 1) / totalSections) * 100}%`,
            }}
          />
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={currentSection === totalSections - 1 ? handleSubmit : undefined}>
        <div className="space-y-6 mb-6">
          {currentQuestions.map((question: any) => (
            <div key={question.id}>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                {question.label}
                {question.required && <span className="text-red-600">*</span>}
              </label>

              {question.type === "number" && (
                <input
                  type="number"
                  min={question.min}
                  max={question.max}
                  value={formData[question.id] || ""}
                  onChange={(e) =>
                    handleChange(question.id, parseFloat(e.target.value))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required={question.required}
                />
              )}

              {question.type === "text" && (
                <input
                  type="text"
                  value={formData[question.id] || ""}
                  onChange={(e) => handleChange(question.id, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required={question.required}
                />
              )}

              {question.type === "select" && (
                <select
                  value={formData[question.id] || ""}
                  onChange={(e) => handleChange(question.id, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required={question.required}
                >
                  {formData[question.id] === "" && (
                    <option value="">Select an option</option>
                  )}
                  {question.options.map((opt: any) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentSection === 0}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {currentSection === totalSections - 1 ? (
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
            >
              Next
            </button>
          )}
        </div>
      </form>

      <p className="text-xs text-gray-500 mt-4 text-center">
        This survey is anonymous. Your responses are confidential.
      </p>
    </div>
  );
}
