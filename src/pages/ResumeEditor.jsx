
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  ArrowLeft,
  Eye,
  FileText,
  Settings2,
  LayoutTemplate,
  Pencil,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

import { useResumeStore } from "../store/resumeStore";
import { useToast } from "../components/common/ToastProvider";

import {
  personalInfoSchema,
  professionalSummarySchema,
  validateSectionEntry,
} from "../utils/resumeValidation";

import {
  validateSkills,
  validateCustomSections,
} from "../utils/advancedResumeValidation";

// PDF Export
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
import ResumeCompleteness from "../components/editor/ResumeCompleteness";

// -------------------------------------
// VALIDATION SECTION CONFIGURATION
// -------------------------------------

const VALIDATION_SECTIONS = [
  {
    key: "experience",
    label: "Experience",
    elementId: "editor-experience",
  },
  {
    key: "education",
    label: "Education",
    elementId: "editor-education",
  },
  {
    key: "projects",
    label: "Projects",
    elementId: "editor-projects",
  },
  {
    key: "certifications",
    label: "Certifications",
    elementId: "editor-certifications",
  },
  {
    key: "languages",
    label: "Languages",
    elementId: "editor-languages",
  },
  {
    key: "awards",
    label: "Awards",
    elementId: "editor-awards",
  },
  {
    key: "volunteerExperience",
    label: "Volunteer Experience",
    elementId: "editor-volunteer",
  },
  {
    key: "publications",
    label: "Publications",
    elementId: "editor-publications",
  },
  {
    key: "references",
    label: "References",
    elementId: "editor-references",
  },
];

// -------------------------------------
// FIELD LABEL FORMATTER
// -------------------------------------

function formatFieldName(fieldName) {
  return fieldName
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (character) => character.toUpperCase());
}

// -------------------------------------
// VALIDATE COMPLETE RESUME
// -------------------------------------

function validateCompleteResume(resume) {
  const errors = [];

  // Personal Details
  const personalResult = personalInfoSchema.safeParse(
    resume.personalInfo || {}
  );

  if (!personalResult.success) {
    personalResult.error.issues.forEach((issue) => {
      errors.push({
        section: "Personal Details",
        elementId: "editor-personal-details",
        field: formatFieldName(
          issue.path.join(".") || "Personal Details"
        ),
        message: issue.message,
      });
    });
  }

  // Professional Summary
  const summaryResult = professionalSummarySchema.safeParse({
    professionalSummary: resume.professionalSummary || "",
  });

  if (!summaryResult.success) {
    summaryResult.error.issues.forEach((issue) => {
      errors.push({
        section: "Professional Summary",
        elementId: "editor-professional-summary",
        field: "Professional Summary",
        message: issue.message,
      });
    });
  }

  // Repeatable Resume Sections
  VALIDATION_SECTIONS.forEach((section) => {
    const entries = resume[section.key];

    if (!Array.isArray(entries)) return;

    entries.forEach((entry, index) => {
      const result = validateSectionEntry(
        section.key,
        entry
      );

      Object.entries(result.errors).forEach(
        ([field, message]) => {
          errors.push({
            section: section.label,
            elementId: section.elementId,
            entryNumber: index + 1,
            field: formatFieldName(field),
            message,
          });
        }
      );
    });
  });

  // Skills Validation
  errors.push(
    ...validateSkills(resume.skills)
  );

  // Custom Sections Validation
  errors.push(
    ...validateCustomSections(resume.customSections)
  );

  return errors;
}

// -------------------------------------
// RESUME EDITOR
// -------------------------------------

export default function ResumeEditor() {
  // Zustand Store
  const settings = useResumeStore(
    (state) => state.settings
  );

  const resume = useResumeStore(
    (state) => state.resume
  );

  const { showToast } = useToast();

  // -------------------------------------
  // VALIDATION STATE
  // -------------------------------------

  const [validationErrors, setValidationErrors] =
    useState([]);

  const [hasValidated, setHasValidated] =
    useState(false);

  const [isValid, setIsValid] =
    useState(false);

  const [shouldScrollToSummary, setShouldScrollToSummary] =
    useState(false);

  // -------------------------------------
  // AUTOMATIC VALIDATION
  // -------------------------------------

  useEffect(() => {
    if (!hasValidated) return;

    const errors = validateCompleteResume(resume);

    setValidationErrors(errors);
    setIsValid(errors.length === 0);
  }, [resume, hasValidated]);

  // -------------------------------------
  // SCROLL TO VALIDATION SUMMARY
  // -------------------------------------

  useEffect(() => {
    if (!shouldScrollToSummary) return;

    document
      .getElementById("resume-validation-summary")
      ?.scrollIntoView({
        behavior: settings.reduceMotion ? "auto" : "smooth",
        block: "center",
      });

    setShouldScrollToSummary(false);
  }, [
    shouldScrollToSummary,
    validationErrors,
    settings.reduceMotion,
  ]);

  // -------------------------------------
  // EDITOR STYLES
  // -------------------------------------

  const editorClasses = [
    "min-h-screen bg-slate-50",
    settings.largerControls
      ? "smartcv-accessible-controls"
      : "",
    settings.reduceMotion
      ? "smartcv-reduce-motion"
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  // -------------------------------------
  // SCROLL TO PREVIEW
  // -------------------------------------

  const scrollToPreview = () => {
    document
      .getElementById("resume-preview")
      ?.scrollIntoView({
        behavior: settings.reduceMotion ? "auto" : "smooth",
        block: "start",
      });
  };

  // -------------------------------------
  // SCROLL TO ERROR SECTION
  // -------------------------------------

  const scrollToError = (elementId) => {
    document
      .getElementById(elementId)
      ?.scrollIntoView({
        behavior: settings.reduceMotion ? "auto" : "smooth",
        block: "start",
      });
  };

  // -------------------------------------
  // SECTION ERROR INDICATOR
  // -------------------------------------

  const renderSectionError = (elementId) => {
    const errorCount = validationErrors.filter(
      (error) => error.elementId === elementId
    ).length;

    if (errorCount === 0) return null;

    return (
      <button
        type="button"
        onClick={() =>
          scrollToError("resume-validation-summary")
        }
        className="mb-3 flex w-full items-center justify-between rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-left transition hover:bg-red-100"
        aria-label={`${errorCount} validation errors in this section`}
      >
        <span className="flex items-center gap-2 text-sm font-medium text-red-700">
          <AlertCircle size={16} />

          {errorCount} validation{" "}
          {errorCount === 1 ? "error" : "errors"} found
        </span>

        <span className="text-xs font-semibold text-red-600">
          Review errors
        </span>
      </button>
    );
  };

  // -------------------------------------
  // RUN COMPLETE RESUME VALIDATION
  // -------------------------------------

  const handleValidateResume = () => {
    const errors = validateCompleteResume(resume);

    setValidationErrors(errors);
    setHasValidated(true);

    const validationPassed = errors.length === 0;

    setIsValid(validationPassed);

    setShouldScrollToSummary(!validationPassed);

    if (validationPassed) {
      showToast(
        "Your resume passed all validation checks!",
        "success"
      );
    } else {
      showToast(
        `Found ${errors.length} validation ${errors.length === 1 ? "error" : "errors"
        }. Please review your resume.`,
        "warning"
      );
    }

    return validationPassed;
  };

  // -------------------------------------
  // RENDER
  // -------------------------------------

  return (
    <div className={editorClasses}>

      {/* TOP NAVIGATION */}

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
              <span className="hidden sm:inline">
                Preview
              </span>
            </button>

            <div className="flex flex-wrap items-center gap-2">
              <ResumeDataTransfer />

              <PdfExportButton
                onBeforeExport={handleValidateResume}
              />
            </div>
          </div>
        </div>
      </header>

      {/* MAIN WORKSPACE */}

      <main className="mx-auto max-w-[1800px] px-4 py-6 sm:px-6 lg:px-8">

        {/* PAGE INTRODUCTION */}

        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
            <span>Dashboard</span>
            <span>/</span>
            <span className="text-indigo-600">
              Resume Editor
            </span>
          </div>

          <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Build your resume
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Enter your information, organize your resume sections,
            customize your design, and review the live preview.
          </p>
        </div>

        {/* VALIDATION ACTION */}

        <section className="mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <ShieldCheck size={21} />
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">
                  Resume validation
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Check your resume for invalid information before exporting.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleValidateResume}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              <ShieldCheck size={17} />
              Validate Resume
            </button>
          </div>
        </section>

        {/* VALIDATION SUMMARY */}

        {hasValidated && (
          <section
            id="resume-validation-summary"
            aria-live="polite"
            className={`mb-6 scroll-mt-24 rounded-xl border p-4 sm:p-5 ${isValid
              ? "border-emerald-200 bg-emerald-50"
              : "border-red-200 bg-red-50"
              }`}
          >

            {isValid ? (
              <div className="flex items-start gap-3">
                <CheckCircle2
                  size={22}
                  className="shrink-0 text-emerald-600"
                />

                <div>
                  <h3 className="font-semibold text-emerald-800">
                    Resume validation successful
                  </h3>

                  <p className="mt-1 text-sm text-emerald-700">
                    No validation errors were found in the supported resume sections.
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-start gap-3">
                  <AlertCircle
                    size={22}
                    className="shrink-0 text-red-600"
                  />

                  <div>
                    <h3 className="font-semibold text-red-800">
                      Please review your resume
                    </h3>

                    <p className="mt-1 text-sm text-red-700">
                      {validationErrors.length} validation{" "}
                      {validationErrors.length === 1
                        ? "error was"
                        : "errors were"}{" "}
                      found.
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  {validationErrors.map((error, index) => (
                    <button
                      key={`${error.elementId}-${error.entryNumber || 0}-${error.field}-${index}`}
                      type="button"
                      onClick={() =>
                        scrollToError(error.elementId)
                      }
                      className="flex w-full items-start justify-between gap-3 rounded-lg border border-red-200 bg-white px-3 py-3 text-left transition hover:border-red-400 hover:bg-red-50"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-800">
                          {error.section}

                          {error.entryNumber
                            ? ` — Entry ${error.entryNumber}`
                            : ""}

                          {" — "}
                          {error.field}
                        </p>

                        <p className="mt-1 text-xs text-red-600">
                          {error.message}
                        </p>
                      </div>

                      <ChevronRight
                        size={17}
                        className="mt-1 shrink-0 text-slate-400"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* RESUME COMPLETENESS */}

        <div className="mb-6">
          <ResumeCompleteness />
        </div>

        {/* RESPONSIVE WORKSPACE */}

        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] 2xl:gap-8">

          {/* LEFT PANEL: EDITOR */}

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

            <div id="editor-personal-details" className="scroll-mt-24">
              {renderSectionError("editor-personal-details")}
              <PersonalDetails />
            </div>

            {/* PROFESSIONAL SUMMARY */}

            <div id="editor-professional-summary" className="scroll-mt-24">
              {renderSectionError("editor-professional-summary")}
              <ProfessionalSummary />
            </div>

            {/* EXPERIENCE */}

            <div id="editor-experience" className="scroll-mt-24">
              {renderSectionError("editor-experience")}
              <Experience />
            </div>

            {/* EDUCATION */}

            <div id="editor-education" className="scroll-mt-24">
              {renderSectionError("editor-education")}
              <Education />
            </div>

            {/* SKILLS */}

            <div id="editor-skills" className="scroll-mt-24">
              {renderSectionError("editor-skills")}
              <Skills />
            </div>

            {/* PROJECTS */}

            <div id="editor-projects" className="scroll-mt-24">
              {renderSectionError("editor-projects")}
              <Projects />
            </div>

            {/* CERTIFICATIONS */}

            <div id="editor-certifications" className="scroll-mt-24">
              {renderSectionError("editor-certifications")}
              <Certifications />
            </div>

            {/* LANGUAGES */}

            <div id="editor-languages" className="scroll-mt-24">
              {renderSectionError("editor-languages")}
              <Languages />
            </div>

            {/* AWARDS */}

            <div id="editor-awards" className="scroll-mt-24">
              {renderSectionError("editor-awards")}
              <Awards />
            </div>

            {/* VOLUNTEER EXPERIENCE */}

            <div id="editor-volunteer" className="scroll-mt-24">
              {renderSectionError("editor-volunteer")}
              <VolunteerExperience />
            </div>

            {/* PUBLICATIONS */}

            <div id="editor-publications" className="scroll-mt-24">
              {renderSectionError("editor-publications")}
              <Publications />
            </div>

            {/* REFERENCES */}

            <div id="editor-references" className="scroll-mt-24">
              {renderSectionError("editor-references")}
              <References />
            </div>

            {/* CUSTOM SECTIONS */}

            <div id="editor-custom-sections" className="scroll-mt-24">
              {renderSectionError("editor-custom-sections")}
              <CustomSections />
            </div>

            {/* SECTION MANAGER */}

            <SectionManager />
          </div>

          {/* RIGHT PANEL: PREVIEW AND DESIGN */}

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

            <section
              className="scroll-mt-24"
              id="resume-customization"
            >
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

        {/* BOTTOM NAVIGATION */}

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
