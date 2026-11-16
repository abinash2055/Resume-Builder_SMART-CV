
function hasText(value) {
  return typeof value === "string" && value.trim().length > 0;
}

export function getResumeCompleteness(resume = {}) {
  const personalInfo = resume.personalInfo || {};
  const skills = resume.skills || {};

  const checks = [
    {
      id: "name",
      title: "Personal name",
      description: "Add your first name or last name.",
      completed:
        hasText(personalInfo.firstName) ||
        hasText(personalInfo.lastName),
    },
    {
      id: "contact",
      title: "Contact information",
      description: "Add at least one way for employers to contact you.",
      completed: [
        personalInfo.email,
        personalInfo.phone,
        personalInfo.website,
        personalInfo.linkedIn,
        personalInfo.github,
      ].some(hasText),
    },
    {
      id: "summary",
      title: "Professional summary",
      description: "Write a short introduction about your professional profile.",
      completed: hasText(resume.professionalSummary),
    },
    {
      id: "background",
      title: "Professional or academic background",
      description: "Add experience, education, or a project.",
      completed:
        (Array.isArray(resume.experience) && resume.experience.length > 0) ||
        (Array.isArray(resume.education) && resume.education.length > 0) ||
        (Array.isArray(resume.projects) && resume.projects.length > 0),
    },
    {
      id: "skills",
      title: "Skills",
      description: "Add at least one technical, soft, or other skill.",
      completed: ["technical", "soft", "other"].some((category) =>
        Array.isArray(skills[category]) &&
        skills[category].some(hasText)
      ),
    },
  ];

  const completedCount = checks.filter((check) => check.completed).length;
  const score = Math.round((completedCount / checks.length) * 100);

  let rating = "Needs improvement";

  if (score === 100) {
    rating = "Excellent completeness";
  } else if (score >= 80) {
    rating = "Very good";
  } else if (score >= 60) {
    rating = "Good";
  } else if (score >= 40) {
    rating = "Getting started";
  }

  return {
    score,
    rating,
    completedCount,
    totalChecks: checks.length,
    checks,
    suggestions: checks.filter((check) => !check.completed),
  };
}
