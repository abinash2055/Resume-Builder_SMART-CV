
import { useResumeStore } from "../../store/resumeStore";
import {
  FolderKanban,
  Plus,
  Trash2,
  ExternalLink,
  GitBranch,
} from "lucide-react";

import Input from "../common/Input";
import Textarea from "../common/Textarea";
import SectionCard from "../common/SectionCard";

function createEmptyProject() {
  return {
    name: "",
    role: "",
    description: "",
    technologies: [],
    startDate: "",
    endDate: "",
    projectUrl: "",
    githubUrl: "",
  };
}

function Projects() {
  const projects = useResumeStore(
    (state) => state.resume.projects
  );

  const addEntry = useResumeStore((state) => state.addEntry);
  const updateEntry = useResumeStore((state) => state.updateEntry);
  const removeEntry = useResumeStore((state) => state.removeEntry);

  const handleAddProject = () => {
    addEntry("projects", createEmptyProject());
  };

  const handleChange = (id, event) => {
    const { name, value } = event.target;

    let updatedValue = value;

    // Store technologies as an array rather than a plain string.
    if (name === "technologies") {
      updatedValue = value
        .split(",")
        .map((technology) => technology.trim())
        .filter(Boolean);
    }

    updateEntry("projects", id, {
      [name]: updatedValue,
    });
  };

  const handleRemoveProject = (id) => {
    removeEntry("projects", id);
  };

  return (
    <SectionCard
      title="Projects"
      description="Showcase your personal, academic, and professional projects."
      icon={FolderKanban}
    >
      <div className="space-y-6">
        {projects.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center">
            <FolderKanban
              size={32}
              className="mx-auto text-slate-400"
            />

            <h3 className="mt-3 font-semibold text-slate-700">
              No projects added
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Add projects to demonstrate your practical experience.
            </p>
          </div>
        )}

        {projects.map((project, index) => (
          <div
            key={project.id}
            className="rounded-xl border border-slate-200 p-4 sm:p-5"
          >
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <h3 className="font-semibold text-slate-800">
                  Project {index + 1}
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Project information and links
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleRemoveProject(project.id)}
                aria-label={`Delete project ${index + 1}`}
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
              >
                <Trash2 size={16} />
                <span className="hidden sm:inline">Remove</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Input
                label="Project Name"
                name="name"
                value={project.name || ""}
                onChange={(event) => handleChange(project.id, event)}
                placeholder="e.g. Smart Resume Builder"
              />

              <Input
                label="Your Role"
                name="role"
                value={project.role || ""}
                onChange={(event) => handleChange(project.id, event)}
                placeholder="e.g. Full Stack Developer"
              />

              <Input
                label="Start Date"
                name="startDate"
                type="month"
                value={project.startDate || ""}
                onChange={(event) => handleChange(project.id, event)}
              />

              <Input
                label="End Date"
                name="endDate"
                type="month"
                value={project.endDate || ""}
                onChange={(event) => handleChange(project.id, event)}
              />

              <Input
                label="Live Project URL"
                name="projectUrl"
                type="url"
                value={project.projectUrl || ""}
                onChange={(event) => handleChange(project.id, event)}
                placeholder="https://yourproject.com"
              />

              <Input
                label="GitHub / Source Code URL"
                name="githubUrl"
                type="url"
                value={project.githubUrl || ""}
                onChange={(event) => handleChange(project.id, event)}
                placeholder="https://github.com/username/project"
              />
            </div>

            <div className="mt-5">
              <Input
                label="Technologies and Tools"
                name="technologies"
                value={(project.technologies || []).join(", ")}
                onChange={(event) => handleChange(project.id, event)}
                placeholder="e.g. React, Node.js, MongoDB, Tailwind CSS"
                helperText="Separate each technology with a comma."
              />
            </div>

            <div className="mt-5">
              <Textarea
                label="Project Description"
                name="description"
                value={project.description || ""}
                onChange={(event) => handleChange(project.id, event)}
                placeholder="Describe the project's purpose, features, your contributions, and results..."
                rows={5}
                maxLength={2000}
                helperText={`${(project.description || "").length}/2000 characters`}
              />
            </div>

            {(project.projectUrl || project.githubUrl) && (
              <div className="mt-4 flex flex-wrap gap-4">
                {project.projectUrl && (
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-800"
                  >
                    <ExternalLink size={15} />
                    View Live Project
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900"
                  >
                    <GitBranch size={15} />
                    View Source Code
                  </a>
                )}
              </div>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddProject}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-indigo-300 bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-700 transition hover:border-indigo-500 hover:bg-indigo-100"
        >
          <Plus size={18} />
          Add Project
        </button>
      </div>
    </SectionCard>
  );
}

export default Projects;
