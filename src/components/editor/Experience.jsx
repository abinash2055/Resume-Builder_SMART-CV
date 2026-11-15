
import { useResumeStore } from "../../store/resumeStore";
import {
    BriefcaseBusiness,
    Plus,
    Trash2,
} from "lucide-react";

import Input from "../common/Input";
import Textarea from "../common/Textarea";
import SectionCard from "../common/SectionCard";

function createEmptyExperience() {
    return {
        jobTitle: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        isCurrent: false,
        description: "",
    };
}

function Experience() {
    const experiences = useResumeStore(
        (state) => state.resume.experience
    );

    const addEntry = useResumeStore((state) => state.addEntry);
    const updateEntry = useResumeStore((state) => state.updateEntry);
    const removeEntry = useResumeStore((state) => state.removeEntry);

    const handleAddExperience = () => {
        addEntry("experience", createEmptyExperience());
    };

    const handleChange = (id, event) => {
        const { name, value, type, checked } = event.target;

        const updatedValue =
            type === "checkbox" ? checked : value;

        updateEntry("experience", id, {
            [name]: updatedValue,
            ...(name === "isCurrent" && checked ? { endDate: "" } : {}),
        });
    };

    const handleRemoveExperience = (id) => {
        removeEntry("experience", id);
    };

    return (
        <SectionCard
            title="Work Experience"
            description="Add your employment history, responsibilities, and achievements."
            icon={BriefcaseBusiness}
        >
            <div className="space-y-6">
                {experiences.length === 0 && (
                    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center">
                        <BriefcaseBusiness
                            size={32}
                            className="mx-auto text-slate-400"
                        />

                        <h3 className="mt-3 font-semibold text-slate-700">
                            No work experience added
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                            Add your current or previous employment details.
                        </p>
                    </div>
                )}

                {experiences.map((experience, index) => (
                    <div
                        key={experience.id}
                        className="rounded-xl border border-slate-200 p-4 sm:p-5"
                    >
                        <div className="mb-5 flex items-center justify-between gap-3">
                            <div>
                                <h3 className="font-semibold text-slate-800">
                                    Experience {index + 1}
                                </h3>

                                <p className="mt-1 text-xs text-slate-500">
                                    Employment information
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => handleRemoveExperience(experience.id)}
                                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                                aria-label={`Delete experience ${index + 1}`}
                            >
                                <Trash2 size={16} />
                                <span className="hidden sm:inline">Remove</span>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <Input
                                label="Job Title"
                                name="jobTitle"
                                value={experience.jobTitle || ""}
                                onChange={(event) =>
                                    handleChange(experience.id, event)
                                }
                                placeholder="e.g. Software Developer"
                            />

                            <Input
                                label="Company Name"
                                name="company"
                                value={experience.company || ""}
                                onChange={(event) =>
                                    handleChange(experience.id, event)
                                }
                                placeholder="Enter company name"
                            />

                            <Input
                                label="Location"
                                name="location"
                                value={experience.location || ""}
                                onChange={(event) =>
                                    handleChange(experience.id, event)
                                }
                                placeholder="e.g. Kathmandu, Nepal"
                            />

                            <div className="hidden md:block" />

                            <Input
                                label="Start Date"
                                name="startDate"
                                type="month"
                                value={experience.startDate || ""}
                                onChange={(event) =>
                                    handleChange(experience.id, event)
                                }
                            />

                            <Input
                                label="End Date"
                                name="endDate"
                                type="month"
                                value={experience.endDate || ""}
                                onChange={(event) =>
                                    handleChange(experience.id, event)
                                }
                                disabled={experience.isCurrent}
                            />
                        </div>

                        <label className="mt-5 flex cursor-pointer items-center gap-3">
                            <input
                                type="checkbox"
                                name="isCurrent"
                                checked={Boolean(experience.isCurrent)}
                                onChange={(event) =>
                                    handleChange(experience.id, event)
                                }
                                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                            />

                            <span className="text-sm font-medium text-slate-700">
                                I currently work here
                            </span>
                        </label>

                        <div className="mt-5">
                            <Textarea
                                label="Responsibilities and Achievements"
                                name="description"
                                value={experience.description || ""}
                                onChange={(event) =>
                                    handleChange(experience.id, event)
                                }
                                placeholder="Describe your responsibilities, contributions, achievements, and measurable results..."
                                rows={5}
                                maxLength={2000}
                                helperText={`${(experience.description || "").length}/2000 characters`}
                            />
                        </div>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={handleAddExperience}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-indigo-300 bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-700 transition hover:border-indigo-500 hover:bg-indigo-100"
                >
                    <Plus size={18} />
                    Add Work Experience
                </button>
            </div>
        </SectionCard>
    );
}

export default Experience;
