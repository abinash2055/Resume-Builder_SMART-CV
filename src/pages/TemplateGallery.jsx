import TemplateSelector from "../components/templates/TemplateSelector";

export default function TemplateGallery() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Resume Templates
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Choose the design you want to use for your resume.
        </p>
      </div>

      <TemplateSelector />
    </div>
  );
}