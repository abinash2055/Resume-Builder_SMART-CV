
const RESUME_FORMAT = "smartcv-resume";
const RESUME_VERSION = 1;

const isObject = (value) =>
  value !== null &&
  typeof value === "object" &&
  !Array.isArray(value);

export const createResumeJson = (snapshot) => {
  if (
    !snapshot ||
    !isObject(snapshot.resume) ||
    !isObject(snapshot.settings) ||
    !Array.isArray(snapshot.sections)
  ) {
    throw new Error("Cannot export invalid resume data.");
  }

  return {
    format: RESUME_FORMAT,
    version: RESUME_VERSION,
    exportedAt: new Date().toISOString(),
    data: {
      resume: snapshot.resume,
      settings: snapshot.settings,
      sections: snapshot.sections,
    },
  };
};

export const validateResumeJson = (fileData) => {
  if (!isObject(fileData)) {
    throw new Error("The selected file is not a valid JSON object.");
  }

  if (fileData.format !== RESUME_FORMAT) {
    throw new Error("This file is not a SmartCV resume backup.");
  }

  if (fileData.version !== RESUME_VERSION) {
    throw new Error(
      `Unsupported backup version: ${fileData.version}.`
    );
  }

  const data = fileData.data;

  if (!isObject(data)) {
    throw new Error("Resume backup data is missing.");
  }

  if (!isObject(data.resume)) {
    throw new Error("Resume information is invalid.");
  }

  if (!isObject(data.resume.personalInfo)) {
    throw new Error("Personal information is missing or invalid.");
  }

  if (!isObject(data.settings)) {
    throw new Error("Resume design settings are invalid.");
  }

  if (!Array.isArray(data.sections)) {
    throw new Error("Resume section configuration is invalid.");
  }

  const validSections = data.sections.every(
    (section) =>
      isObject(section) &&
      typeof section.id === "string" &&
      typeof section.title === "string" &&
      typeof section.visible === "boolean"
  );

  if (!validSections) {
    throw new Error("The backup contains invalid section data.");
  }

  return {
    resume: data.resume,
    settings: data.settings,
    sections: data.sections,
  };
};
