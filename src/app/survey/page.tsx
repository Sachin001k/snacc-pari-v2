import SurveyForm from "@/components/SurveyForm";

export default function SurveyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4">Take the Survey</h1>
      <p className="text-gray-600 text-lg mb-8">
        Your anonymous responses help us understand nutrition challenges in schools.
        This survey takes about 5-10 minutes to complete.
      </p>
      <SurveyForm />
    </div>
  );
}
