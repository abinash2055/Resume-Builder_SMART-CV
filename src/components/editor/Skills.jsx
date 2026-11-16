
import { useState } from "react";
import { useResumeStore } from "../../store/resumeStore";
import {
    Code2,
    Plus,
    X,
    Sparkles,
    Users,
    Lightbulb,
} from "lucide-react";

import SectionCard from "../common/SectionCard";

const SKILL_CATEGORIES = [
    {
        key: "technical",
        title: "Technical Skills",
        description: "Programming languages, frameworks, databases, and tools.",
        icon: Code2,
        placeholder: "e.g. React, Python, PostgreSQL",
    },
    {
        key: "soft",
        title: "Soft Skills",
        description: "Personal and interpersonal professional abilities.",
        icon: Users,
        placeholder: "e.g. Communication, Leadership",
    },
    {
        key: "other",
        title: "Other Skills",
        description: "Additional professional skills and competencies.",
        icon: Lightbulb,
        placeholder: "e.g. Agile, Project Management",
    },
];

function SkillCategory({
    category,
    skills,
    onAdd,
    onRemove,
}) {
    const [skillInput, setSkillInput] = useState("");

    const handleAdd = (event) => {
        event.preventDefault();

        const skill = skillInput.trim();

        if (!skill) return;

        const alreadyExists = skills.some(
            (item) => item.toLowerCase() === skill.toLowerCase()
        );

        if (alreadyExists) return;

        onAdd(category.key, skill);
        setSkillInput("");
    };

    const Icon = category.icon;

    return (
        <div className="rounded-xl border border-slate-200 p-4 sm:p-5">
            <div className="mb-4 flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <Icon size={20} />
                </div>

                <div>
                    <h3 className="font-semibold text-slate-800">
                        {category.title}
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                        {category.description}
                    </p>
                </div>
            </div>

            <form onSubmit={handleAdd} className="flex flex-col gap-2 sm:flex-row">
                <input
                    type="text"
                    value={skillInput}
                    onChange={(event) => setSkillInput(event.target.value)}
                    placeholder={category.placeholder}
                    maxLength={60}
                    aria-label={`Add ${category.title}`}
                    className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                />

                <button
                    type="submit"
                    disabled={!skillInput.trim()}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    <Plus size={17} />
                    Add Skill
                </button>
            </form>

            <div className="mt-5">
                {skills.length === 0 ? (
                    <p className="rounded-lg bg-slate-50 px-4 py-5 text-center text-sm text-slate-400">
                        No skills added yet.
                    </p>
                ) : (
                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                            <span
                                key={`${category.key}-${skill}-${index}`}
                                className="inline-flex items-center gap-2 rounded-lg border border-indigo-100 bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-700"
                            >
                                {skill}

                                <button
                                    type="button"
                                    onClick={() => onRemove(category.key, skill)}
                                    aria-label={`Remove ${skill}`}
                                    className="rounded-full text-indigo-500 transition hover:text-red-600"
                                >
                                    <X size={15} />
                                </button>
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <p className="mt-4 text-xs text-slate-400">
                {skills.length} {skills.length === 1 ? "skill" : "skills"} added
            </p>
        </div>
    );
}

function Skills() {
    const skills = useResumeStore((state) => state.resume.skills);
    const addSkill = useResumeStore((state) => state.addSkill);
    const removeSkill = useResumeStore((state) => state.removeSkill);

    return (
        <SectionCard
            title="Skills"
            description="Highlight the abilities that make you suitable for the role."
            icon={Sparkles}
        >
            <div className="space-y-6">
                {SKILL_CATEGORIES.map((category) => (
                    <SkillCategory
                        key={category.key}
                        category={category}
                        skills={skills[category.key] || []}
                        onAdd={addSkill}
                        onRemove={removeSkill}
                    />
                ))}
            </div>
        </SectionCard>
    );
}

export default Skills;