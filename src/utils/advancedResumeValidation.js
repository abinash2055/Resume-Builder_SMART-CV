
// -------------------------------------
// ADVANCED RESUME VALIDATION
// Skills and Custom Sections
// -------------------------------------

function addError(errors, section, elementId, field, message, entryNumber) {
  errors.push({
    section,
    elementId,
    field,
    message,
    ...(entryNumber ? { entryNumber } : {}),
  });
}

// -------------------------------------
// SKILLS VALIDATION
// -------------------------------------

export function validateSkills(skills) {
  const errors = [];

  const categories = [
    { key: "technical", label: "Technical Skills" },
    { key: "soft", label: "Soft Skills" },
    { key: "other", label: "Other Skills" },
  ];

  if (!skills || typeof skills !== "object" || Array.isArray(skills)) {
    addError(
      errors,
      "Skills",
      "editor-skills",
      "Skills",
      "Skills information must be a valid object."
    );

    return errors;
  }

  categories.forEach(({ key, label }) => {
    const categorySkills = skills[key] ?? [];

    if (!Array.isArray(categorySkills)) {
      addError(
        errors,
        "Skills",
        "editor-skills",
        label,
        `${label} must be a list.`
      );

      return;
    }

    const seenSkills = new Set();

    categorySkills.forEach((skill, index) => {
      const entryNumber = index + 1;

      if (typeof skill !== "string") {
        addError(
          errors,
          "Skills",
          "editor-skills",
          label,
          "Each skill must be text.",
          entryNumber
        );

        return;
      }

      const normalizedSkill = skill.trim();

      if (!normalizedSkill) {
        addError(
          errors,
          "Skills",
          "editor-skills",
          label,
          "Skill cannot be empty.",
          entryNumber
        );

        return;
      }

      if (normalizedSkill.length > 60) {
        addError(
          errors,
          "Skills",
          "editor-skills",
          label,
          "A skill cannot exceed 60 characters.",
          entryNumber
        );
      }

      const duplicateKey = normalizedSkill.toLowerCase();

      if (seenSkills.has(duplicateKey)) {
        addError(
          errors,
          "Skills",
          "editor-skills",
          label,
          `Duplicate skill: "${normalizedSkill}".`,
          entryNumber
        );
      } else {
        seenSkills.add(duplicateKey);
      }
    });
  });

  return errors;
}

// -------------------------------------
// CUSTOM SECTIONS VALIDATION
// -------------------------------------

export function validateCustomSections(customSections) {
  const errors = [];

  if (customSections == null) return errors;

  if (!Array.isArray(customSections)) {
    addError(
      errors,
      "Custom Sections",
      "editor-custom-sections",
      "Custom Sections",
      "Custom sections must be a list."
    );

    return errors;
  }

  const seenSectionTitles = new Set();

  customSections.forEach((section, sectionIndex) => {
    const sectionNumber = sectionIndex + 1;

    if (!section || typeof section !== "object" || Array.isArray(section)) {
      addError(
        errors,
        "Custom Sections",
        "editor-custom-sections",
        "Section",
        "Custom section data is invalid.",
        sectionNumber
      );

      return;
    }

    // Validate section title
    if (typeof section.title !== "string" || !section.title.trim()) {
      addError(
        errors,
        "Custom Sections",
        "editor-custom-sections",
        "Section Title",
        "Custom section title is required.",
        sectionNumber
      );
    } else {
      const title = section.title.trim();

      if (title.length > 100) {
        addError(
          errors,
          "Custom Sections",
          "editor-custom-sections",
          "Section Title",
          "Custom section title cannot exceed 100 characters.",
          sectionNumber
        );
      }

      const normalizedTitle = title.toLowerCase();

      if (seenSectionTitles.has(normalizedTitle)) {
        addError(
          errors,
          "Custom Sections",
          "editor-custom-sections",
          "Section Title",
          `Duplicate custom section title: "${title}".`,
          sectionNumber
        );
      } else {
        seenSectionTitles.add(normalizedTitle);
      }
    }

    // Empty items are allowed.
    const items = section.items ?? [];

    if (!Array.isArray(items)) {
      addError(
        errors,
        "Custom Sections",
        "editor-custom-sections",
        "Entries",
        "Custom section entries must be a list.",
        sectionNumber
      );

      return;
    }

    items.forEach((item, itemIndex) => {
      const entryNumber = itemIndex + 1;

      if (!item || typeof item !== "object" || Array.isArray(item)) {
        addError(
          errors,
          "Custom Sections",
          "editor-custom-sections",
          "Entry",
          "Custom entry data is invalid.",
          entryNumber
        );

        return;
      }

      // Entry title is required.
      if (typeof item.title !== "string" || !item.title.trim()) {
        addError(
          errors,
          "Custom Sections",
          "editor-custom-sections",
          "Entry Title",
          "Custom entry title is required.",
          entryNumber
        );
      } else if (item.title.trim().length > 200) {
        addError(
          errors,
          "Custom Sections",
          "editor-custom-sections",
          "Entry Title",
          "Entry title cannot exceed 200 characters.",
          entryNumber
        );
      }

      // Description is optional.
      const description = item.description ?? "";

      if (typeof description !== "string") {
        addError(
          errors,
          "Custom Sections",
          "editor-custom-sections",
          "Description",
          "Entry description must be text.",
          entryNumber
        );
      } else if (description.length > 3000) {
        addError(
          errors,
          "Custom Sections",
          "editor-custom-sections",
          "Description",
          "Entry description cannot exceed 3,000 characters.",
          entryNumber
        );
      }
    });
  });

  return errors;
}
