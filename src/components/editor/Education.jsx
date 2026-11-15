
import { useResumeStore } from "../../store/resumeStore";

import {
  GraduationCap,
  Plus,
  Trash2,
} from "lucide-react";

import useEntryValidation from "../../hooks/useEntryValidation";

import Input from "../common/Input";
import Textarea from "../common/Textarea";
import SectionCard from "../common/SectionCard";

function createEmptyEducation() {
  return {
    institution: "",
    degree: "",
    fieldOfStudy: "",
    location: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
    grade: "",
    description: "",
  };
}

function Education() {
  const education = useResumeStore(
    (state) => state.resume.education
  );

  const addEntry = useResumeStore(
    (state) => state.addEntry
  );

  const updateEntry = useResumeStore(
    (state) => state.updateEntry
  );

  const removeEntry = useResumeStore(
    (state) => state.removeEntry
  );

  // Education validation
  const {
    errorsByEntry,
    validateField,
    validateEntry,
    clearEntryErrors,
  } = useEntryValidation("education");

  // Add education
  const handleAddEducation = () => {
    addEntry("education", createEmptyEducation());
  };

  // Update education
  const handleChange = (id, event) => {
    const { name, value, type, checked } = event.target;

    const updatedValue =
      type === "checkbox" ? checked : value;

    updateEntry("education", id, {
      [name]: updatedValue,
      ...(name === "isCurrent" && checked
        ? { endDate: "" }
        : {}),
    });

    // Validate changed field
    if (type !== "checkbox") {
      const currentEntry = education.find(
        (item) => item.id === id
      );

      if (currentEntry) {
        validateField(
          id,
          currentEntry,
          name,
          updatedValue
        );
      }
    }
  };

  // Remove education
  const handleRemoveEducation = (id) => {
    clearEntryErrors(id);
    removeEntry("education", id);
  };

  return (
    <SectionCard
      title="Education"
      description="Add your academic qualifications, degrees, and achievements."
      icon={GraduationCap}
    >
      <div className="space-y-6">

        {/* Empty State */}
        {education.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center">
            <GraduationCap
              size={32}
              className="mx-auto text-slate-400"
            />

            <h3 className="mt-3 font-semibold text-slate-700">
              No education added
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Add your school, college, university, or other qualifications.
            </p>
          </div>
        )}

        {/* Education Entries */}
        {education.map((item, index) => {
          const entryErrors =
            errorsByEntry[item.id] || {};

          return (
            <div
              key={item.id}
              className="rounded-xl border border-slate-200 p-4 sm:p-5"
            >
              {/* Entry Header */}
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-slate-800">
                    Education {index + 1}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Academic qualification
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    handleRemoveEducation(item.id)
                  }
                  className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                  aria-label={`Delete education ${index + 1}`}
                >
                  <Trash2 size={16} />
                  <span className="hidden sm:inline">
                    Remove
                  </span>
                </button>
              </div>

              {/* Input Fields */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                {/* Institution */}
                <Input
                  label="Institution / University"
                  name="institution"
                  value={item.institution || ""}
                  onChange={(event) =>
                    handleChange(item.id, event)
                  }
                  onBlur={(event) =>
                    validateField(
                      item.id,
                      item,
                      "institution",
                      event.target.value
                    )
                  }
                  error={entryErrors.institution}
                  placeholder="e.g. Tribhuvan University"
                />

                {/* Degree */}
                <Input
                  label="Degree / Qualification"
                  name="degree"
                  value={item.degree || ""}
                  onChange={(event) =>
                    handleChange(item.id, event)
                  }
                  onBlur={(event) =>
                    validateField(
                      item.id,
                      item,
                      "degree",
                      event.target.value
                    )
                  }
                  error={entryErrors.degree}
                  placeholder="e.g. Bachelor's Degree"
                />

                {/* Field of Study */}
                <Input
                  label="Field of Study"
                  name="fieldOfStudy"
                  value={item.fieldOfStudy || ""}
                  onChange={(event) =>
                    handleChange(item.id, event)
                  }
                  onBlur={(event) =>
                    validateField(
                      item.id,
                      item,
                      "fieldOfStudy",
                      event.target.value
                    )
                  }
                  error={entryErrors.fieldOfStudy}
                  placeholder="e.g. Computer Engineering"
                />

                {/* Location */}
                <Input
                  label="Institution Location"
                  name="location"
                  value={item.location || ""}
                  onChange={(event) =>
                    handleChange(item.id, event)
                  }
                  onBlur={(event) =>
                    validateField(
                      item.id,
                      item,
                      "location",
                      event.target.value
                    )
                  }
                  error={entryErrors.location}
                  placeholder="e.g. Kathmandu, Nepal"
                />

                {/* Start Date */}
                <Input
                  label="Start Date"
                  name="startDate"
                  type="month"
                  value={item.startDate || ""}
                  onChange={(event) =>
                    handleChange(item.id, event)
                  }
                  onBlur={(event) =>
                    validateField(
                      item.id,
                      item,
                      "startDate",
                      event.target.value
                    )
                  }
                  error={entryErrors.startDate}
                />

                {/* End Date */}
                <Input
                  label="Graduation / End Date"
                  name="endDate"
                  type="month"
                  value={item.endDate || ""}
                  onChange={(event) =>
                    handleChange(item.id, event)
                  }
                  onBlur={(event) =>
                    validateField(
                      item.id,
                      item,
                      "endDate",
                      event.target.value
                    )
                  }
                  error={entryErrors.endDate}
                  disabled={item.isCurrent}
                />

                {/* Grade */}
                <Input
                  label="Grade / GPA / Percentage"
                  name="grade"
                  value={item.grade || ""}
                  onChange={(event) =>
                    handleChange(item.id, event)
                  }
                  onBlur={(event) =>
                    validateField(
                      item.id,
                      item,
                      "grade",
                      event.target.value
                    )
                  }
                  error={entryErrors.grade}
                  placeholder="e.g. 3.8 GPA or 85%"
                  helperText="Optional. Use the grading format relevant to your qualification."
                />
              </div>

              {/* Currently Studying */}
              <label className="mt-5 flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  name="isCurrent"
                  checked={Boolean(item.isCurrent)}
                  onChange={(event) =>
                    handleChange(item.id, event)
                  }
                  className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />

                <span className="text-sm font-medium text-slate-700">
                  I am currently studying here
                </span>
              </label>

              {/* Description */}
              <div className="mt-5">
                <Textarea
                  label="Description / Achievements"
                  name="description"
                  value={item.description || ""}
                  onChange={(event) =>
                    handleChange(item.id, event)
                  }
                  onBlur={(event) =>
                    validateField(
                      item.id,
                      item,
                      "description",
                      event.target.value
                    )
                  }
                  error={entryErrors.description}
                  placeholder="Add relevant coursework, academic achievements, honors, activities, or other details..."
                  rows={4}
                  maxLength={3000}
                  helperText={`${(item.description || "").length}/3000 characters`}
                />
              </div>

            </div>
          );
        })}

        {/* Add Education */}
        <button
          type="button"
          onClick={handleAddEducation}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-indigo-300 bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-700 transition hover:border-indigo-500 hover:bg-indigo-100"
        >
          <Plus size={18} />
          Add Education
        </button>

      </div>
    </SectionCard>
  );
}

export default Education;
