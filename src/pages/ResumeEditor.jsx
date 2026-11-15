
import { Link } from "react-router-dom";

import {
  ArrowLeft,
  Eye,
  FileDown,
  FileText,
  Settings2,
  LayoutTemplate,
  Pencil,
} from "lucide-react";

import { useResumeStore } from "../store/resumeStore";

// PDF Download
import PdfExportButton from "../components/export/PdfExportButton";

// Preview and customization
import ResumePreview from "../components/preview/ResumePreview";
import TemplateSelector from "../components/templates/TemplateSelector";
import CustomizationPanel from "../components/customization/CustomizationPanel";
import ResumeDataTransfer from "../components/export/ResumeDataTransfer";

// Resume editor sections
import PersonalDetails from "../components/editor/PersonalDetails";
import ProfessionalSummary from "../components/editor/PersonalSummary";
import Experience from "../components/editor/Experience";
import Education from "../components/editor/Education";
import Skills from "../components/editor/Skills";
import Projects from "../components/editor/Projects";
import Certifications from "../components/editor/Certifications";
import Languages from "../components/editor/Languages";
import Awards from "../components/editor/Awards";
import VolunteerExperience from "../components/editor/VolunteerExperience";
import Publications from "../components/editor/Publications";
import References from "../components/editor/References";
import CustomSections from "../components/editor/CustomSections";
import SectionManager from "../components/editor/SectionManager";

export default function ResumeEditor() {
  const settings = useResumeStore((state) => state.settings);

  const editorClasses = [
    "min-h-screen bg-slate-50",
    settings.largerControls ? "smartcv-accessible-controls" : "",
    settings.reduceMotion ? "smartcv-reduce-motion" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const scrollToPreview = () => {
    document.getElementById("resume-preview")?.scrollIntoView({
      behavior: settings.reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <div className={editorClasses}>
      {/* =====================================
          TOP NAVIGATION
      ===================================== */}

      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1800px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              to="/"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-100"
              aria-label="Back to dashboard"
            >
              <ArrowLeft size={19} />
            </Link>

            <div className="min-w-0">
              <h1 className="truncate text-lg font-bold text-slate-900 sm:text-xl">
                Resume Builder
              </h1>

              <p className="hidden text-xs text-slate-500 sm:block">
                Create and customize your professional resume
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={scrollToPreview}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
            >
              <Eye size={16} />
              <span className="hidden sm:inline">Preview</span>
            </button>

            <div className="flex flex-wrap items-center gap-2">
              <ResumeDataTransfer />
              <PdfExportButton />
            </div>
          </div>
        </div>
      </header>

      {/* =====================================
          MAIN WORKSPACE
      ===================================== */}

      <main className="mx-auto max-w-[1800px] px-4 py-6 sm:px-6 lg:px-8">
        {/* PAGE INTRODUCTION */}

        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
            <span>Dashboard</span>
            <span>/</span>
            <span className="text-indigo-600">Resume Editor</span>
          </div>

          <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Build your resume
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Enter your information, organize your resume sections,
            customize your design, and review the live preview.
          </p>
        </div>

        {/* =====================================
            RESPONSIVE TWO-COLUMN WORKSPACE
        ===================================== */}

        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] 2xl:gap-8">

          {/* =================================
              LEFT PANEL: RESUME EDITOR
          ================================= */}

          <div className="min-w-0 space-y-6">
            {/* EDITOR INTRODUCTION */}

            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <Pencil size={20} />
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">
                  Resume information
                </h3>

                <p className="text-xs text-slate-500">
                  Add and manage your professional details.
                </p>
              </div>
            </div>

            {/* PERSONAL DETAILS */}

            <PersonalDetails />

            {/* PROFESSIONAL SUMMARY */}

            <ProfessionalSummary />

            {/* EXPERIENCE */}

            <Experience />

            {/* EDUCATION */}

            <Education />

            {/* SKILLS */}

            <Skills />

            {/* PROJECTS */}

            <Projects />

            {/* CERTIFICATIONS */}

            <Certifications />

            {/* LANGUAGES */}

            <Languages />

            {/* AWARDS */}

            <Awards />

            {/* VOLUNTEER EXPERIENCE */}

            <VolunteerExperience />

            {/* PUBLICATIONS */}

            <Publications />

            {/* REFERENCES */}

            <References />

            {/* CUSTOM SECTIONS */}

            <CustomSections />

            {/* SECTION VISIBILITY AND ORDER */}

            <SectionManager />

          </div>

          {/* =================================
              RIGHT PANEL: PREVIEW AND DESIGN
          ================================= */}

          <aside className="min-w-0 space-y-6">
            {/* LIVE PREVIEW */}

            <section
              id="resume-preview"
              className="scroll-mt-24 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-4 py-4 sm:px-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <FileText size={19} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Live resume preview
                    </h3>

                    <p className="text-xs text-slate-500">
                      Updates as you edit your information.
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                  Live
                </span>
              </div>

              <div className="min-w-0">
                <ResumePreview />
              </div>
            </section>

            {/* TEMPLATE SELECTOR */}

            <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <LayoutTemplate size={19} />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    Resume templates
                  </h3>

                  <p className="text-xs text-slate-500">
                    Choose your preferred design.
                  </p>
                </div>
              </div>

              <TemplateSelector />
            </section>

            {/* ADVANCED CUSTOMIZATION */}

            <section className="scroll-mt-24" id="resume-customization">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Settings2 size={19} />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    Advanced customization
                  </h3>

                  <p className="text-xs text-slate-500">
                    Control typography, colors, spacing, and layout.
                  </p>
                </div>
              </div>

              <CustomizationPanel />
            </section>
          </aside>
        </div>

        {/* =====================================
            BOTTOM NAVIGATION
        ===================================== */}

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>

          <button
            type="button"
            onClick={scrollToPreview}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            <Eye size={16} />
            Review Resume
          </button>
        </div>
      </main>
    </div>
  );
}
