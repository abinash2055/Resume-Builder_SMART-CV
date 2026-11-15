
import { Link } from "react-router-dom";
import { ArrowLeft, Eye, FileDown } from "lucide-react";

import PersonalDetails from "../components/editor/PersonalDetails";

import ProfessionalSummary from "../components/editor/PersonalSummary";

function ResumeEditor() {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <Link
            to="/"
            className="mb-3 inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-indigo-600"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Resume Editor
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Build your professional resume by adding your information.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            disabled
            title="Live preview will be implemented in a later batch"
            className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-400"
          >
            <Eye size={17} />
            Preview
          </button>

          <button
            type="button"
            disabled
            title="PDF export will be implemented in a later phase"
            className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl bg-indigo-300 px-4 py-2.5 text-sm font-medium text-white"
          >
            <FileDown size={17} />
            Export PDF
          </button>
        </div>
      </div>

      {/* Resume Form */}
      <div className="space-y-5">
        <PersonalDetails />
        <ProfessionalSummary />
      </div>

      {/* Progress Information */}
      <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-5">
        <h3 className="font-semibold text-indigo-900">
          Your resume is taking shape!
        </h3>

        <p className="mt-1 text-sm text-indigo-700">
          Continue adding your work experience, education, skills, and
          projects to complete your resume.
        </p>
      </div>
    </div>
  );
}

export default ResumeEditor;
