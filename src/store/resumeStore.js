
import { create } from "zustand";

import {
  createEmptyResume,
  createDefaultResumeSettings,
} from "../data/resumeDefaults";

import { createDefaultSections } from "../data/sectionConfig";
import { TEMPLATE_CONFIG } from "../data/templateConfig";

import {
  createEntry,
  updateObject,
  reorderItems,
  moveSection,
} from "../utils/resumeHelpers";

const createInitialState = () => ({
  resume: createEmptyResume(),
  settings: createDefaultResumeSettings(),
  sections: createDefaultSections(),
});

export const useResumeStore = create((set, get) => ({
  ...createInitialState(),

  // --------------------------------
  // RESUME FIELD MANAGEMENT
  // --------------------------------

  updateResumeField: (path, value) => {
    set((state) => ({
      resume: updateObject(state.resume, path, value),
    }));
  },

  replaceResume: (newResume) => {
    if (!newResume || typeof newResume !== "object") {
      throw new Error("Invalid resume data.");
    }

    set({ resume: structuredClone(newResume) });
  },

  // --------------------------------
  // REPEATED SECTION MANAGEMENT
  // --------------------------------

  addEntry: (sectionName, fields = {}) => {
    const entry = createEntry(fields);

    set((state) => {
      const currentEntries = state.resume[sectionName];

      if (!Array.isArray(currentEntries)) {
        throw new Error(`Invalid resume section: ${sectionName}`);
      }

      return {
        resume: {
          ...state.resume,
          [sectionName]: [...currentEntries, entry],
        },
      };
    });

    return entry.id;
  },

  updateEntry: (sectionName, entryId, updates) => {
    set((state) => {
      const currentEntries = state.resume[sectionName];

      if (!Array.isArray(currentEntries)) return state;

      return {
        resume: {
          ...state.resume,
          [sectionName]: currentEntries.map((entry) =>
            entry.id === entryId
              ? { ...entry, ...updates }
              : entry
          ),
        },
      };
    });
  },

  removeEntry: (sectionName, entryId) => {
    set((state) => {
      const currentEntries = state.resume[sectionName];

      if (!Array.isArray(currentEntries)) return state;

      return {
        resume: {
          ...state.resume,
          [sectionName]: currentEntries.filter(
            (entry) => entry.id !== entryId
          ),
        },
      };
    });
  },

  reorderEntries: (sectionName, activeId, overId) => {
    set((state) => {
      const currentEntries = state.resume[sectionName];

      if (!Array.isArray(currentEntries)) return state;

      return {
        resume: {
          ...state.resume,
          [sectionName]: reorderItems(
            currentEntries,
            activeId,
            overId
          ),
        },
      };
    });
  },

  // --------------------------------
  // SKILL MANAGEMENT
  // --------------------------------

  addSkill: (category, skillName) => {
    const skill = skillName.trim();

    if (!skill) return;

    set((state) => {
      const currentSkills = state.resume.skills[category];

      if (!Array.isArray(currentSkills)) return state;

      const alreadyExists = currentSkills.some(
        (item) => item.toLowerCase() === skill.toLowerCase()
      );

      if (alreadyExists) return state;

      return {
        resume: {
          ...state.resume,
          skills: {
            ...state.resume.skills,
            [category]: [...currentSkills, skill],
          },
        },
      };
    });
  },

  removeSkill: (category, skillName) => {
    set((state) => {
      const currentSkills = state.resume.skills[category];

      if (!Array.isArray(currentSkills)) return state;

      return {
        resume: {
          ...state.resume,
          skills: {
            ...state.resume.skills,
            [category]: currentSkills.filter(
              (skill) => skill !== skillName
            ),
          },
        },
      };
    });
  },

  updateSkills: (category, skills) => {
    if (!Array.isArray(skills)) return;

    set((state) => ({
      resume: {
        ...state.resume,
        skills: {
          ...state.resume.skills,
          [category]: skills,
        },
      },
    }));
  },

  // --------------------------------
  // SECTION VISIBILITY
  // --------------------------------

  toggleSectionVisibility: (sectionId) => {
    set((state) => ({
      sections: state.sections.map((section) =>
        section.id === sectionId && !section.required
          ? { ...section, visible: !section.visible }
          : section
      ),
    }));
  },

  setSectionVisibility: (sectionId, visible) => {
    set((state) => ({
      sections: state.sections.map((section) =>
        section.id === sectionId && !section.required
          ? { ...section, visible }
          : section
      ),
    }));
  },

  // --------------------------------
  // SECTION ORDER
  // --------------------------------

  reorderSections: (activeId, overId) => {
    set((state) => {
      const oldIndex = state.sections.findIndex(
        (section) => section.id === activeId
      );

      const newIndex = state.sections.findIndex(
        (section) => section.id === overId
      );

      if (oldIndex === -1 || newIndex === -1) return state;

      const updated = [...state.sections];
      const [moved] = updated.splice(oldIndex, 1);

      updated.splice(newIndex, 0, moved);

      return {
        sections: updated.map((section, index) => ({
          ...section,
          order: index,
        })),
      };
    });
  },

  moveSectionUp: (sectionId) => {
    set((state) => ({
      sections: moveSection(state.sections, sectionId, "up"),
    }));
  },

  moveSectionDown: (sectionId) => {
    set((state) => ({
      sections: moveSection(state.sections, sectionId, "down"),
    }));
  },

  // --------------------------------
  // CUSTOM SECTIONS
  // --------------------------------

  addCustomSection: (title) => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) return null;

    const section = createEntry({
      title: trimmedTitle,
      description: "",
      items: [],
    });

    set((state) => ({
      resume: {
        ...state.resume,
        customSections: [...state.resume.customSections, section],
      },
    }));

    return section.id;
  },

  updateCustomSection: (sectionId, updates) => {
    set((state) => ({
      resume: {
        ...state.resume,
        customSections: state.resume.customSections.map((section) =>
          section.id === sectionId
            ? { ...section, ...updates }
            : section
        ),
      },
    }));
  },

  removeCustomSection: (sectionId) => {
    set((state) => ({
      resume: {
        ...state.resume,
        customSections: state.resume.customSections.filter(
          (section) => section.id !== sectionId
        ),
      },
    }));
  },

  // --------------------------------
  // RESUME DESIGN SETTINGS
  // --------------------------------

  updateSetting: (path, value) => {
    set((state) => ({
      settings: updateObject(state.settings, path, value),
    }));
  },

  updateSettings: (updates) => {
    set((state) => ({
      settings: {
        ...state.settings,
        ...updates,
      },
    }));
  },

  // --------------------------------
  // TEMPLATE MANAGEMENT
  // --------------------------------

  selectTemplate: (templateId) => {
    const template = TEMPLATE_CONFIG.find(
      (item) => item.id === templateId
    );

    if (!template) return;

    set((state) => ({
      settings: {
        ...state.settings,
        template: template.id,
        accentColor: template.defaultAccentColor,
        fontFamily: template.defaultFont,
        columns: template.columns,
      },
    }));
  },

  // --------------------------------
  // RESET MANAGEMENT
  // --------------------------------

  resetResume: () => {
    set({
      resume: createEmptyResume(),
      settings: createDefaultResumeSettings(),
      sections: createDefaultSections(),
    });
  },

  getResumeSnapshot: () => {
    const { resume, settings, sections } = get();

    return structuredClone({
      resume,
      settings,
      sections,
    });
  },
}));