export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4">Research Findings</h1>
      <p className="text-gray-600 text-lg mb-8">
        Understanding nutritional challenges in schools.
      </p>
      <div className="bg-white p-8 rounded-lg shadow space-y-6">
        <section>
          <h2 className="text-2xl font-bold mb-2">Methodology</h2>
          <p className="text-gray-600">
            This research was conducted with 1,006 students across multiple schools.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-2">Key Findings</h2>
          <p className="text-gray-600">Key findings coming soon...</p>
        </section>
      </div>
    </div>
  );
}
