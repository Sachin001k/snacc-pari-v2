import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            SNACC PARI
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Student Nutrition Access Risk Index
          </p>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Understanding nutritional challenges in schools. Participate in our anonymous screening survey to help identify students who may benefit from nutritional support.
          </p>
          <Link
            href="/survey"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Take the Survey
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 my-16">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-2">📊 See the Data</h3>
            <p className="text-gray-600 mb-4">View anonymized research findings and statistics.</p>
            <Link href="/dashboard" className="text-blue-600 hover:underline">
              View Dashboard →
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-2">🔬 Research Findings</h3>
            <p className="text-gray-600 mb-4">Learn about our methodology and key takeaways.</p>
            <Link href="/about" className="text-blue-600 hover:underline">
              Read Research →
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-2">🏫 For Coordinators</h3>
            <p className="text-gray-600 mb-4">Access school data and analytics.</p>
            <Link href="/admin" className="text-blue-600 hover:underline">
              Admin Panel →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
