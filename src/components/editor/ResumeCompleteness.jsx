
import { useMemo } from "react";
import {
    CheckCircle2,
    Circle,
    TrendingUp,
    Lightbulb,
} from "lucide-react";

import { useResumeStore } from "../../store/resumeStore";
import { getResumeCompleteness } from "../../utils/resumeCompleteness";

export default function ResumeCompleteness() {
    const resume = useResumeStore((state) => state.resume);

    const result = useMemo(
        () => getResumeCompleteness(resume),
        [resume]
    );

    return (
        <section
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900"
            aria-labelledby="resume-completeness-heading"
        >
            <div className="flex items-center gap-3">
                <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                    <TrendingUp size={22} />
                </div>

                <div>
                    <h2
                        id="resume-completeness-heading"
                        className="text-lg font-semibold text-slate-900 dark:text-white"
                    >
                        Resume Completeness
                    </h2>

                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Improve your resume with these recommendations.
                    </p>
                </div>
            </div>

            <div className="mt-6">
                <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Overall completeness
                    </span>

                    <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                        {result.score}%
                    </span>
                </div>

                <div
                    className="h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"
                    role="progressbar"
                    aria-label="Resume completeness"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={result.score}
                >
                    <div
                        className="h-full rounded-full bg-indigo-600 transition-all duration-300"
                        style={{ width: `${result.score}%` }}
                    />
                </div>

                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    {result.completedCount} of {result.totalChecks} checks completed
                    {" · "}
                    {result.rating}
                </p>
            </div>

            <div className="mt-6 space-y-3">
                {result.checks.map((check) => (
                    <div
                        key={check.id}
                        className="flex items-start gap-3"
                    >
                        {check.completed ? (
                            <CheckCircle2
                                size={19}
                                className="mt-0.5 shrink-0 text-green-600"
                                aria-hidden="true"
                            />
                        ) : (
                            <Circle
                                size={19}
                                className="mt-0.5 shrink-0 text-slate-400"
                                aria-hidden="true"
                            />
                        )}

                        <div>
                            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                                {check.title}
                            </p>

                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                {check.completed
                                    ? "Completed"
                                    : check.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {result.suggestions.length > 0 && (
                <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-500/5">
                    <div className="flex items-center gap-2">
                        <Lightbulb
                            size={18}
                            className="text-amber-600 dark:text-amber-400"
                        />

                        <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-300">
                            Improvement suggestions
                        </h3>
                    </div>

                    <ul className="mt-3 space-y-2">
                        {result.suggestions.map((suggestion) => (
                            <li
                                key={suggestion.id}
                                className="text-sm text-amber-800 dark:text-amber-200"
                            >
                                • {suggestion.description}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {result.score === 100 && (
                <div className="mt-5 rounded-xl bg-green-50 p-4 text-sm text-green-800 dark:bg-green-500/10 dark:text-green-300">
                    All completeness checks are satisfied. Continue reviewing your
                    content for accuracy and relevance.
                </div>
            )}
        </section>
    );
}
