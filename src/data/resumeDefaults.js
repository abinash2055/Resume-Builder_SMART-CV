
export const createEmptyResume = () => ({
    id: crypto.randomUUID(),

    personalInfo: {
        firstName: "",
        lastName: "",
        jobTitle: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        country: "",
        postalCode: "",
        website: "",
        linkedIn: "",
        github: "",
        portfolio: "",
        profileImage: "",
    },

    professionalSummary: "",
    experience: [],
    education: [],

    skills: {
        technical: [],
        soft: [],
        other: [],
    },

    projects: [],
    certifications: [],
    languages: [],
    awards: [],
    volunteerExperience: [],
    publications: [],
    references: [],
    customSections: [],
});

export const createDefaultResumeSettings = () => ({
    template: "modern",
    fontFamily: "Inter",
    fontSize: 10,
    headingSize: 16,
    nameSize: 26,
    accentColor: "#4f46e5",
    textColor: "#1e293b",
    pageSize: "A4",
    orientation: "portrait",

    margins: {
        top: 16,
        bottom: 16,
        left: 16,
        right: 16,
    },

    lineSpacing: 1.4,
    columns: 1,
    showProfileImage: true,
    showContactIcons: true,
    showPageNumbers: false,
    highContrast: false,
    largerControls: false,
    reduceMotion: false,
});

export const createInitialResumeState = () => ({
    resume: createEmptyResume(),
    settings: createDefaultResumeSettings(),
});
