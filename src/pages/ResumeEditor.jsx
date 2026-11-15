
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  Eye,
  Settings2,
  Sparkles,
} from "lucide-react";

function ResumeEditor() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-brand-600"
          >
            <ArrowLeft size={16} />
            Back to dashboard
          </Link>

          <h1 className="mt-3 text-2xl font-extrabold text-slate-900">
            Resume Builder
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Create and customize your professional resume.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            disabled
            className="inline-flex cursor-not-allowed items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-400"
          >
            <Eye size={17} />
            Preview
          </button>

          <button
            type="button"
            disabled
            className="inline-flex cursor-not-allowed items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white opacity-50"
          >
            Export PDF
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.85fr)]">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-brand-600">
              <FileText size={23} />
            </div>
            <div>
              <h2 className="font-bold text-slate-900">
                Resume information
              </h2>
              <p className="text-xs text-slate-500">
                Your information will appear here.
              </p>
            </div>
          </div>

          <div className="mt-7 space-y-4">
            {[
              "Personal Information",
              "Professional Summary",
              "Work Experience",
              "Education",
              "Skills",
              "Projects",
              "Certifications",
              "Additional Sections",
            ].map((section, index) => (
              <div
                key={section}
                className="flex items-center justify-between rounded-xl border border-slate-200 p-4"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-500">
                    {index + 1}
                  </span>
                  <span className="text-sm font-semibold text-slate-700">
                    {section}
                  </span>
                </div>
                <Settings2 size={17} className="text-slate-400" />
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-dashed border-indigo-200 bg-indigo-50/50 p-4 text-sm text-indigo-700">
            <Sparkles size={17} className="mb-2" />
            <p className="font-semibold">Editor setup</p>
            <p className="mt-1 text-xs leading-5 text-indigo-600">
              These sections are placeholders. Interactive resume forms
              will be implemented in the upcoming phases.
            </p>
          </div>
        </section>

        <section className="flex min-h-[500px] flex-col rounded-2xl border border-slate-200 bg-slate-100 p-4 sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-bold text-slate-800">Live Preview</h2>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-500">
              A4 Preview
            </span>
          </div>

          <div className="flex flex-1 items-center justify-center">
            <div className="flex aspect-[210/297] w-full max-w-[360px] flex-col items-center justify-center bg-white px-8 text-center shadow-md">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50 text-brand-600">
                <FileText size={27} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-800">
                Your Resume
              </h3>

              <p className="mt-2 text-xs leading-5 text-slate-400">
                Your professional resume preview will appear here as you
                enter your information.
              </p>

              <div className="mt-6 h-1 w-16 rounded-full bg-brand-500" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ResumeEditor;
