
import { z } from "zod";

// -------------------------------------
// COMMON VALIDATION RULES
// -------------------------------------

const optionalText = (maxLength = 5000) =>
  z
    .string()
    .trim()
    .max(
      maxLength,
      `Maximum ${maxLength} characters allowed.`
    )
    .optional()
    .or(z.literal(""));

const optionalEmail = z
  .string()
  .trim()
  .max(254, "Email cannot exceed 254 characters.")
  .refine(
    (value) =>
      value === "" ||
      z.string().email().safeParse(value).success,
    "Please enter a valid email address."
  )
  .optional();

const optionalPhone = z
  .string()
  .trim()
  .max(30, "Phone number cannot exceed 30 characters.")
  .refine(
    (value) =>
      value === "" ||
      /^[+]?[\d\s().-]{7,30}$/.test(value),
    "Please enter a valid phone number."
  )
  .optional();

// -------------------------------------
// URL VALIDATION
// -------------------------------------

const isValidUrl = (value) => {
  if (!value) return true;

  try {
    const normalized = /^https?:\/\//i.test(value)
      ? value
      : `https://${value}`;

    const url = new URL(normalized);

    return (
      ["http:", "https:"].includes(url.protocol) &&
      url.hostname.includes(".")
    );
  } catch {
    return false;
  }
};

const optionalUrl = z
  .string()
  .trim()
  .max(2048, "URL cannot exceed 2048 characters.")
  .refine(
    isValidUrl,
    "Please enter a valid website URL."
  )
  .optional();

// -------------------------------------
// DATE VALIDATION
// Supports YYYY-MM and YYYY-MM-DD
// -------------------------------------

const optionalDate = z
  .string()
  .refine((value) => {
    if (!value) return true;

    if (
      !/^\d{4}-(0[1-9]|1[0-2])(-\d{2})?$/.test(value)
    ) {
      return false;
    }

    const parts = value.split("-").map(Number);

    if (parts.length === 3) {
      const [year, month, day] = parts;

      const daysInMonth = new Date(
        Date.UTC(year, month, 0)
      ).getUTCDate();

      return (
        year >= 1 &&
        day >= 1 &&
        day <= daysInMonth
      );
    }

    return true;
  }, "Please enter a valid date.")
  .optional();

// -------------------------------------
// PERSONAL INFORMATION
// -------------------------------------

export const personalInfoSchema = z.object({
  firstName: optionalText(100),
  lastName: optionalText(100),
  jobTitle: optionalText(150),

  email: optionalEmail,
  phone: optionalPhone,

  address: optionalText(250),
  city: optionalText(100),
  country: optionalText(100),
  postalCode: optionalText(30),

  website: optionalUrl,
  linkedIn: optionalUrl,
  github: optionalUrl,
  portfolio: optionalUrl,

  profileImage: optionalText(2000),
});

// -------------------------------------
// PROFESSIONAL SUMMARY
// -------------------------------------

export const professionalSummarySchema = z.object({
  professionalSummary: optionalText(3000),
});

// -------------------------------------
// EXPERIENCE
// -------------------------------------

export const experienceSchema = z.object({
  jobTitle: optionalText(150),
  company: optionalText(150),
  location: optionalText(200),

  startDate: optionalDate,
  endDate: optionalDate,
  isCurrent: z.boolean().optional(),

  description: optionalText(5000),
});

// -------------------------------------
// EDUCATION
// -------------------------------------

export const educationSchema = z.object({
  institution: optionalText(200),
  degree: optionalText(150),
  fieldOfStudy: optionalText(150),
  location: optionalText(200),

  startDate: optionalDate,
  endDate: optionalDate,
  isCurrent: z.boolean().optional(),

  grade: optionalText(100),
  description: optionalText(3000),
});

// -------------------------------------
// PROJECTS
// -------------------------------------

export const projectSchema = z.object({
  name: optionalText(150),
  role: optionalText(150),
  description: optionalText(3000),

  technologies: z.array(z.string()).optional(),

  startDate: optionalDate,
  endDate: optionalDate,

  projectUrl: optionalUrl,
  githubUrl: optionalUrl,
});

// -------------------------------------
// CERTIFICATIONS
// -------------------------------------

export const certificationSchema = z.object({
  name: optionalText(200),
  issuer: optionalText(200),

  issueDate: optionalDate,
  expiryDate: optionalDate,
  noExpiry: z.boolean().optional(),

  credentialId: optionalText(150),
  credentialUrl: optionalUrl,

  description: optionalText(3000),
});

// -------------------------------------
// LANGUAGES
// -------------------------------------

export const languageSchema = z.object({
  language: optionalText(100),
  proficiency: optionalText(100),
  certification: optionalText(200),
  notes: optionalText(2000),
});

// -------------------------------------
// AWARDS
// -------------------------------------

export const awardSchema = z.object({
  title: optionalText(200),
  issuer: optionalText(200),
  date: optionalDate,
  description: optionalText(3000),
});

// -------------------------------------
// VOLUNTEER EXPERIENCE
// -------------------------------------

export const volunteerSchema = z.object({
  role: optionalText(200),
  organization: optionalText(200),
  location: optionalText(200),

  startDate: optionalDate,
  endDate: optionalDate,
  isCurrent: z.boolean().optional(),

  description: optionalText(5000),
});

// -------------------------------------
// PUBLICATIONS
// -------------------------------------

export const publicationSchema = z.object({
  title: optionalText(300),
  publisher: optionalText(200),
  publicationDate: optionalDate,
  authors: optionalText(500),

  publicationUrl: optionalUrl,

  description: optionalText(3000),
});

// -------------------------------------
// REFERENCES
// -------------------------------------

export const referenceSchema = z.object({
  name: optionalText(200),
  jobTitle: optionalText(200),
  organization: optionalText(200),
  relationship: optionalText(200),

  email: optionalEmail,
  phone: optionalPhone,

  notes: optionalText(2000),
});

// -------------------------------------
// SECTION SCHEMA LOOKUP
// -------------------------------------

export const ENTRY_SCHEMAS = {
  experience: experienceSchema,
  education: educationSchema,
  projects: projectSchema,
  certifications: certificationSchema,
  languages: languageSchema,
  awards: awardSchema,
  volunteerExperience: volunteerSchema,
  publications: publicationSchema,
  references: referenceSchema,
};

// -------------------------------------
// DATE NORMALIZATION
// -------------------------------------

const normalizeDate = (date) => {
  if (!date) return "";

  return date.length === 7
    ? `${date}-01`
    : date;
};

// -------------------------------------
// GENERAL DATE RANGE VALIDATION
// -------------------------------------

export const validateDateRange = (
  startDate,
  endDate,
  isCurrent = false
) => {
  if (!startDate || !endDate || isCurrent) {
    return {
      valid: true,
      message: "",
    };
  }

  const normalizedStart = normalizeDate(startDate);
  const normalizedEnd = normalizeDate(endDate);

  if (normalizedEnd < normalizedStart) {
    return {
      valid: false,
      message: "End date cannot be before start date.",
    };
  }

  return {
    valid: true,
    message: "",
  };
};

// -------------------------------------
// CERTIFICATION DATE RANGE VALIDATION
// -------------------------------------

export const validateCertificationDateRange = (
  issueDate,
  expiryDate,
  noExpiry = false
) => {
  if (!issueDate || !expiryDate || noExpiry) {
    return {
      valid: true,
      message: "",
    };
  }

  const normalizedIssue = normalizeDate(issueDate);
  const normalizedExpiry = normalizeDate(expiryDate);

  if (normalizedExpiry < normalizedIssue) {
    return {
      valid: false,
      message: "Expiry date cannot be before issue date.",
    };
  }

  return {
    valid: true,
    message: "",
  };
};

// -------------------------------------
// COMPLETE ENTRY VALIDATION
// -------------------------------------

export const validateSectionEntry = (
  sectionName,
  entry
) => {
  const schema = ENTRY_SCHEMAS[sectionName];

  if (!schema) {
    return {
      valid: true,
      errors: {},
    };
  }

  const result = schema.safeParse(entry);
  const errors = {};

  // Individual field validation
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      const field = issue.path.join(".");

      if (field && !errors[field]) {
        errors[field] = issue.message;
      }
    });
  }

  // Experience, education and volunteer date validation
  if (
    ["startDate", "endDate"].every(
      (field) => field in entry
    )
  ) {
    const dateRange = validateDateRange(
      entry.startDate,
      entry.endDate,
      entry.isCurrent
    );

    if (!dateRange.valid) {
      errors.endDate = dateRange.message;
    }
  }

  // Certification date validation
  if (sectionName === "certifications") {
    const dateRange = validateCertificationDateRange(
      entry.issueDate,
      entry.expiryDate,
      entry.noExpiry
    );

    if (!dateRange.valid) {
      errors.expiryDate = dateRange.message;
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};
