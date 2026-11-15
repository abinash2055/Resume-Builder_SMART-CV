
import { Link } from "react-router-dom";
import {
  ArrowRight,
  FileText,
  Palette,
  Sparkles,
  CheckCircle2,
  WandSparkles,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Resume Builder",
    description: "Enter your professional information and organize your resume.",
    link: "/builder",
    action: "Open builder",
  },
  {
    icon: Palette,
    title: "Resume Templates",
    description: "Explore professional layouts and choose your preferred design.",
    link: "/templates",
    action: "Explore templates",
  },
  {
    icon: WandSparkles,
    title: "Customization",
    description: "Personalize fonts, colors, page sizes, and section layouts.",
    link: "/builder",
    action: "Customize resume",
  },
];

const steps = [
  "Add your personal and professional information",
  "Choose a resume template",
  "Customize your layout and appearance",
  "Preview and export your resume",
];

function Dashboard() {
  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-700 via-brand-600 to-violet-600 px-6 py-10 text-white shadow-lg sm:px-10 sm:py-14">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-indigo-50">
            <Sparkles size={14} />
            Your professional journey starts here
          </div>

          <h1 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-5xl">
            Create a resume
            <br />
            that stands out.
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-indigo-100 sm:text-base">
            Build a professional resume with customizable templates,
            flexible sections, and a live preview of your work.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/builder"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-brand-700 transition hover:bg-indigo-50"
            >
              Create your resume
              <ArrowRight size={17} />
            </Link>

            <Link
              to="/templates"
              className="rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Browse templates
            </Link>
          </div>
        </div>

        <div className="pointer-events-none absolute -right-16 -top-20 hidden h-80 w-80 rounded-full border-[35px] border-white/10 lg:block" />
        <div className="pointer-events-none absolute -bottom-36 right-32 hidden h-80 w-80 rounded-full border-[35px] border-white/10 lg:block" />
      </section>

      <section>
        <div className="mb-5">
          <h2 className="text-xl font-bold text-slate-900">
            Your workspace
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Everything you need to create your resume.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-brand-600">
                  <Icon size={23} />
                </div>

                <h3 className="mt-5 font-bold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-2 min-h-12 text-sm leading-6 text-slate-500">
                  {feature.description}
                </p>

                <Link
                  to={feature.link}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700"
                >
                  {feature.action}
                  <ArrowRight size={16} />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 size={21} />
            </div>
            <div>
              <h2 className="font-bold text-slate-900">Getting started</h2>
              <p className="text-xs text-slate-500">Your resume workflow</p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {steps.map((step, index) => (
              <div key={step} className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-xs font-bold text-brand-700">
                  {index + 1}
                </span>
                <p className="pt-1 text-sm text-slate-600">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-2xl border border-indigo-100 bg-indigo-50/70 p-6 sm:p-8">
          <div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-brand-600 shadow-sm">
              <FileText size={22} />
            </div>
            <h2 className="mt-5 text-xl font-bold text-slate-900">
              Ready to build your first resume?
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Add your experience, education, skills, projects, and other
              professional details.
            </p>
          </div>

          <Link
            to="/builder"
            className="mt-7 inline-flex w-fit items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Open resume builder
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
