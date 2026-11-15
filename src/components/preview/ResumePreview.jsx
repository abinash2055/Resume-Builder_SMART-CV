
import { useResumeStore } from "../../store/resumeStore";

import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Link2,
} from "lucide-react";

import "./resumeTemplates.css";

// =====================================
// FONT CONFIGURATION
// =====================================

const FONT_STACKS = {
  Inter: 'Inter, Arial, sans-serif',
  Arial: 'Arial, Helvetica, sans-serif',
  Roboto: 'Roboto, Arial, sans-serif',
  Georgia: 'Georgia, serif',
  "Times New Roman": '"Times New Roman", Times, serif',
};

// =====================================
// DATE FORMATTER
// =====================================

function formatDate(value) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

function DateRange({ startDate, endDate, isCurrent }) {
  const start = formatDate(startDate);
  const end = isCurrent ? "Present" : formatDate(endDate);

  if (!start && !end) return null;

  return (
    <span className="text-xs text-slate-500">
      {start}
      {start && end ? " - " : ""}
      {end}
    </span>
  );
}

// =====================================
// DESCRIPTION
// =====================================

function Description({ children }) {
  if (!children) return null;

  return (
    <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-inherit">
      {children}
    </p>
  );
}

// =====================================
// SECTION COMPONENT
// =====================================

function ResumeSection({ title, children, headingSize }) {
  if (!children) return null;

  return (
    <section className="resume-section min-w-0">
      <h2
        style={{
          fontSize: `${headingSize}pt`,
          color: "var(--resume-accent-color)",
        }}
      >
        {title}
      </h2>

      {children}
    </section>
  );
}

// =====================================
// ENTRY HEADING
// =====================================

function EntryHeading({
  title,
  subtitle,
  location,
  startDate,
  endDate,
  isCurrent,
}) {
  return (
    <div className="mb-2 flex flex-col gap-1">
      <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1">
        <h3 className="text-sm font-bold text-inherit">
          {title}
        </h3>

        <DateRange
          startDate={startDate}
          endDate={endDate}
          isCurrent={isCurrent}
        />
      </div>

      {(subtitle || location) && (
        <div className="flex flex-wrap items-center gap-x-2 text-xs text-slate-500">
          {subtitle && <span>{subtitle}</span>}

          {subtitle && location && <span>•</span>}

          {location && <span>{location}</span>}
        </div>
      )}
    </div>
  );
}

// =====================================
// CONTACT ITEM
// =====================================

function ContactItem({
  value,
  icon: Icon,
  showIcons,
}) {
  if (!value) return null;

  return (
    <span className="inline-flex min-w-0 items-center gap-1.5 text-xs text-slate-600">
      {showIcons && (
        <Icon
          size={12}
          className="shrink-0 text-slate-500"
          aria-hidden="true"
        />
      )}

      <span className="break-all">{value}</span>
    </span>
  );
}

// =====================================
// SKILL CATEGORY
// =====================================

function SkillCategory({ title, skills }) {
  if (!Array.isArray(skills) || skills.length === 0) {
    return null;
  }

  return (
    <div className="mb-2">
      <h3 className="mb-1 text-sm font-semibold text-inherit">
        {title}
      </h3>

      <div className="flex flex-wrap gap-1.5">
        {skills.map((skill, index) => (
          <span
            key={`${skill}-${index}`}
            className="rounded-md border border-slate-200 px-2 py-1 text-xs"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

// =====================================
// EXPERIENCE
// =====================================

function ExperienceContent({ entries }) {
  if (!entries?.length) return null;

  return entries.map((item) => (
    <div key={item.id} className="resume-entry mb-4 last:mb-0">
      <EntryHeading
        title={item.jobTitle}
        subtitle={item.company}
        location={item.location}
        startDate={item.startDate}
        endDate={item.endDate}
        isCurrent={item.isCurrent}
      />

      <Description>{item.description}</Description>
    </div>
  ));
}

// =====================================
// EDUCATION
// =====================================

function EducationContent({ entries }) {
  if (!entries?.length) return null;

  return entries.map((item) => (
    <div key={item.id} className="resume-entry mb-4 last:mb-0">
      <EntryHeading
        title={item.degree}
        subtitle={item.institution}
        location={item.location}
        startDate={item.startDate}
        endDate={item.endDate}
        isCurrent={item.isCurrent}
      />

      {item.fieldOfStudy && (
        <p className="text-xs text-slate-600">
          Field of study: {item.fieldOfStudy}
        </p>
      )}

      {item.grade && (
        <p className="text-xs text-slate-600">
          Grade: {item.grade}
        </p>
      )}

      <Description>{item.description}</Description>
    </div>
  ));
}

// =====================================
// PROJECTS
// =====================================

function ProjectsContent({ entries }) {
  if (!entries?.length) return null;

  return entries.map((item) => (
    <div key={item.id} className="resume-entry mb-4 last:mb-0">
      <EntryHeading
        title={item.name}
        subtitle={item.role}
        startDate={item.startDate}
        endDate={item.endDate}
      />

      <Description>{item.description}</Description>

      {item.technologies?.length > 0 && (
        <p className="mt-1 text-xs text-slate-600">
          <strong>Technologies:</strong>{" "}
          {item.technologies.join(", ")}
        </p>
      )}

      {item.projectUrl && (
        <p className="mt-1 break-all text-xs text-slate-600">
          Project: {item.projectUrl}
        </p>
      )}

      {item.githubUrl && (
        <p className="break-all text-xs text-slate-600">
          Repository: {item.githubUrl}
        </p>
      )}
    </div>
  ));
}

// =====================================
// CERTIFICATIONS
// =====================================

function CertificationsContent({ entries }) {
  if (!entries?.length) return null;

  return entries.map((item) => (
    <div key={item.id} className="mb-3 last:mb-0">
      <EntryHeading
        title={item.name}
        subtitle={item.issuer}
        startDate={item.issueDate}
      />

      {item.credentialId && (
        <p className="text-xs text-slate-600">
          Credential ID: {item.credentialId}
        </p>
      )}

      {item.expiryDate && !item.noExpiry && (
        <p className="text-xs text-slate-600">
          Expiry: {formatDate(item.expiryDate)}
        </p>
      )}

      {item.credentialUrl && (
        <p className="break-all text-xs text-slate-600">
          Credential: {item.credentialUrl}
        </p>
      )}

      <Description>{item.description}</Description>
    </div>
  ));
}

// =====================================
// LANGUAGES
// =====================================

function LanguagesContent({ entries }) {
  if (!entries?.length) return null;

  return (
    <div className="space-y-2">
      {entries.map((item) => (
        <div key={item.id}>
          <div className="flex flex-wrap justify-between gap-2">
            <h3 className="text-sm font-semibold text-inherit">
              {item.language}
            </h3>

            {item.proficiency && (
              <span className="text-xs text-slate-500">
                {item.proficiency}
              </span>
            )}
          </div>

          {item.certification && (
            <p className="text-xs text-slate-600">
              {item.certification}
            </p>
          )}

          <Description>{item.notes}</Description>
        </div>
      ))}
    </div>
  );
}

// =====================================
// AWARDS
// =====================================

function AwardsContent({ entries }) {
  if (!entries?.length) return null;

  return entries.map((item) => (
    <div key={item.id} className="mb-3 last:mb-0">
      <EntryHeading
        title={item.title}
        subtitle={item.issuer}
        startDate={item.date}
      />

      <Description>{item.description}</Description>
    </div>
  ));
}

// =====================================
// VOLUNTEER EXPERIENCE
// =====================================

function VolunteerContent({ entries }) {
  if (!entries?.length) return null;

  return entries.map((item) => (
    <div key={item.id} className="resume-entry mb-4 last:mb-0">
      <EntryHeading
        title={item.role}
        subtitle={item.organization}
        location={item.location}
        startDate={item.startDate}
        endDate={item.endDate}
        isCurrent={item.isCurrent}
      />

      <Description>{item.description}</Description>
    </div>
  ));
}

// =====================================
// PUBLICATIONS
// =====================================

function PublicationsContent({ entries }) {
  if (!entries?.length) return null;

  return entries.map((item) => (
    <div key={item.id} className="mb-3 last:mb-0">
      <EntryHeading
        title={item.title}
        subtitle={item.publisher}
        startDate={item.publicationDate}
      />

      {item.authors && (
        <p className="text-xs text-slate-600">
          Authors: {item.authors}
        </p>
      )}

      {item.url && (
        <p className="break-all text-xs text-slate-600">
          {item.url}
        </p>
      )}

      <Description>{item.description}</Description>
    </div>
  ));
}

// =====================================
// REFERENCES
// =====================================

function ReferencesContent({ entries }) {
  if (!entries?.length) return null;

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {entries.map((item) => (
        <div key={item.id}>
          <h3 className="text-sm font-bold text-inherit">
            {item.name}
          </h3>

          {item.designation && (
            <p className="text-xs text-slate-600">
              {item.designation}
            </p>
          )}

          {item.organization && (
            <p className="text-xs text-slate-600">
              {item.organization}
            </p>
          )}

          {item.relationship && (
            <p className="text-xs text-slate-600">
              Relationship: {item.relationship}
            </p>
          )}

          {item.email && (
            <p className="break-all text-xs text-slate-600">
              {item.email}
            </p>
          )}

          {item.phone && (
            <p className="text-xs text-slate-600">
              {item.phone}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

// =====================================
// CUSTOM SECTIONS
// =====================================

function CustomSectionContent({ section }) {
  if (!section) return null;

  return (
    <div>
      <Description>{section.description}</Description>

      {section.items?.map((item) => (
        <div key={item.id} className="mb-3 last:mb-0">
          {item.title && (
            <h3 className="text-sm font-semibold text-inherit">
              {item.title}
            </h3>
          )}

          <Description>{item.description}</Description>
        </div>
      ))}
    </div>
  );
}

// =====================================
// MAIN COMPONENT
// =====================================

export default function ResumePreview() {
  const resume = useResumeStore((state) => state.resume);
  const settings = useResumeStore((state) => state.settings);
  const sections = useResumeStore((state) => state.sections);

  const personalInfo = resume.personalInfo || {};

  // PERSONAL INFORMATION

  const fullName = [
    personalInfo.firstName,
    personalInfo.lastName,
  ]
    .filter(Boolean)
    .join(" ");

  const address = [
    personalInfo.address,
    personalInfo.city,
    personalInfo.country,
    personalInfo.postalCode,
  ]
    .filter(Boolean)
    .join(", ");

  // CONTACT INFORMATION

  const contactItems = [
    {
      value: personalInfo.email,
      icon: Mail,
    },
    {
      value: personalInfo.phone,
      icon: Phone,
    },
    {
      value: address,
      icon: MapPin,
    },
    {
      value: personalInfo.website,
      icon: Globe,
    },
    {
      value: personalInfo.linkedIn,
      icon: Link2,
    },
    {
      value: personalInfo.github,
      icon: Link2,
    },
    {
      value: personalInfo.portfolio,
      icon: Globe,
    },
  ].filter((item) => item.value);

  // PAGE DIMENSIONS

  const isA4 = settings.pageSize === "A4";
  const isLandscape = settings.orientation === "landscape";

  let pageWidth;
  let pageHeight;

  if (isA4) {
    pageWidth = isLandscape ? "297mm" : "210mm";
    pageHeight = isLandscape ? "210mm" : "297mm";
  } else {
    pageWidth = isLandscape ? "11in" : "8.5in";
    pageHeight = isLandscape ? "8.5in" : "11in";
  }


  const printPageSize = `${settings.pageSize === "Letter" ? "Letter" : "A4"
    } ${settings.orientation === "landscape" ? "landscape" : "portrait"}`;


  // DESIGN SETTINGS

  const margins = settings.margins || {};

  const topMargin = margins.top ?? 16;
  const bottomMargin = margins.bottom ?? 16;
  const leftMargin = margins.left ?? 16;
  const rightMargin = margins.right ?? 16;

  const fontFamily =
    FONT_STACKS[settings.fontFamily] || FONT_STACKS.Inter;

  const headingSize = settings.headingSize ?? 16;
  const nameSize = settings.nameSize ?? 26;
  const fontSize = settings.fontSize ?? 10;
  const lineSpacing = settings.lineSpacing ?? 1.4;

  const showProfileImage = settings.showProfileImage;
  const showContactIcons = settings.showContactIcons;
  const showPageNumbers = settings.showPageNumbers;

  // SECTION VISIBILITY AND ORDER

  const visibleSections = [...(sections || [])]
    .filter((section) => section.visible)
    .sort((a, b) => a.order - b.order);

  // STANDARD SECTION RENDERER

  const renderSection = (section) => {
    const sectionId = section.id;

    switch (sectionId) {
      case "personalInfo":
        return null;

      case "professionalSummary":
        if (!resume.professionalSummary) return null;

        return (
          <ResumeSection
            key={sectionId}
            title="Professional Summary"
            headingSize={headingSize}
          >
            <Description>
              {resume.professionalSummary}
            </Description>
          </ResumeSection>
        );

      case "experience":
        if (!resume.experience?.length) return null;

        return (
          <ResumeSection
            key={sectionId}
            title="Work Experience"
            headingSize={headingSize}
          >
            <ExperienceContent entries={resume.experience} />
          </ResumeSection>
        );

      case "education":
        if (!resume.education?.length) return null;

        return (
          <ResumeSection
            key={sectionId}
            title="Education"
            headingSize={headingSize}
          >
            <EducationContent entries={resume.education} />
          </ResumeSection>
        );

      case "skills": {
        const skills = resume.skills || {};

        const hasSkills =
          skills.technical?.length ||
          skills.soft?.length ||
          skills.other?.length;

        if (!hasSkills) return null;

        return (
          <ResumeSection
            key={sectionId}
            title="Skills"
            headingSize={headingSize}
          >
            <SkillCategory
              title="Technical Skills"
              skills={skills.technical}
            />

            <SkillCategory
              title="Soft Skills"
              skills={skills.soft}
            />

            <SkillCategory
              title="Other Skills"
              skills={skills.other}
            />
          </ResumeSection>
        );
      }

      case "projects":
        if (!resume.projects?.length) return null;

        return (
          <ResumeSection
            key={sectionId}
            title="Projects"
            headingSize={headingSize}
          >
            <ProjectsContent entries={resume.projects} />
          </ResumeSection>
        );

      case "certifications":
        if (!resume.certifications?.length) return null;

        return (
          <ResumeSection
            key={sectionId}
            title="Certifications"
            headingSize={headingSize}
          >
            <CertificationsContent
              entries={resume.certifications}
            />
          </ResumeSection>
        );

      case "languages":
        if (!resume.languages?.length) return null;

        return (
          <ResumeSection
            key={sectionId}
            title="Languages"
            headingSize={headingSize}
          >
            <LanguagesContent entries={resume.languages} />
          </ResumeSection>
        );

      case "awards":
        if (!resume.awards?.length) return null;

        return (
          <ResumeSection
            key={sectionId}
            title="Awards and Achievements"
            headingSize={headingSize}
          >
            <AwardsContent entries={resume.awards} />
          </ResumeSection>
        );

      case "volunteerExperience":
        if (!resume.volunteerExperience?.length) return null;

        return (
          <ResumeSection
            key={sectionId}
            title="Volunteer Experience"
            headingSize={headingSize}
          >
            <VolunteerContent
              entries={resume.volunteerExperience}
            />
          </ResumeSection>
        );

      case "publications":
        if (!resume.publications?.length) return null;

        return (
          <ResumeSection
            key={sectionId}
            title="Publications"
            headingSize={headingSize}
          >
            <PublicationsContent entries={resume.publications} />
          </ResumeSection>
        );

      case "references":
        if (!resume.references?.length) return null;

        return (
          <ResumeSection
            key={sectionId}
            title="References"
            headingSize={headingSize}
          >
            <ReferencesContent entries={resume.references} />
          </ResumeSection>
        );

      default:
        return null;
    }
  };

  // =====================================
  // PREVIEW
  // =====================================

  return (
    <div className="w-full overflow-x-auto rounded-xl bg-slate-100 p-3 sm:p-5">
      <style>
        {`
          @page {
            size: ${printPageSize};
            margin: 10mm 0 14mm;

          @bottom-center {
            content: "Page " counter(page) " of " counter(pages);
          font-family: Arial, sans-serif;
          font-size: 9pt;
          color: #64748b;
          }
        }
      `}
      </style>

      <article
        id="resume-paper"
        className="resume-paper relative mx-auto flex flex-col border border-slate-200 shadow-xl"
        data-resume-template={settings.template}
        data-high-contrast={settings.highContrast ? "true" : "false"}
        data-columns={settings.columns === 2 ? "2" : "1"}
        style={{
          width: pageWidth,
          minHeight: pageHeight,
          maxWidth: "none",
          flexShrink: 0,
          paddingTop: `${topMargin}mm`,
          paddingBottom: `${bottomMargin}mm`,
          paddingLeft: `${leftMargin}mm`,
          paddingRight: `${rightMargin}mm`,
          fontFamily,
          fontSize: `${fontSize}pt`,
          lineHeight: lineSpacing,
          color: settings.highContrast
            ? "#000000"
            : settings.textColor,
          backgroundColor: "#ffffff",
          "--resume-accent-color": settings.accentColor,
          "--resume-text-color": settings.highContrast
            ? "#000000"
            : settings.textColor,
        }}
      >
        {/* RESUME HEADER */}

        <header className="mb-6 border-b border-slate-200 pb-5">
          <div className="flex flex-wrap items-start gap-4">
            {showProfileImage && personalInfo.profileImage && (
              <img
                src={personalInfo.profileImage}
                alt="Profile"
                className="h-20 w-20 shrink-0 rounded-full border border-slate-200 object-cover"
              />
            )}

            <div className="min-w-0 flex-1">
              {fullName && (
                <h1
                  className="break-words"
                  style={{
                    fontSize: `${nameSize}px`,
                    color: "var(--resume-accent-color)",
                  }}
                >
                  {fullName}
                </h1>
              )}

              {personalInfo.jobTitle && (
                <p className="mt-1 text-sm font-semibold text-slate-600">
                  {personalInfo.jobTitle}
                </p>
              )}

              {contactItems.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                  {contactItems.map((item, index) => (
                    <ContactItem
                      key={`${item.value}-${index}`}
                      value={item.value}
                      icon={item.icon}
                      showIcons={showContactIcons}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* RESUME CONTENT */}

        <main
          className="resume-content min-w-0 flex-1"
          style={{
            display: "grid",
            gridTemplateColumns:
              settings.columns === 2
                ? "repeat(2, minmax(0, 1fr))"
                : "minmax(0, 1fr)",
            columnGap: "24px",
            alignItems: "start",
          }}
        >
          {visibleSections.map((section) =>
            renderSection(section)
          )}

          {/* CUSTOM SECTIONS */}

          {resume.customSections?.map((section) => (
            <ResumeSection
              key={section.id}
              title={section.title}
              headingSize={headingSize}
            >
              <CustomSectionContent section={section} />
            </ResumeSection>
          ))}
        </main>

        {/* PAGE NUMBER FOOTER */}

        {showPageNumbers && (
          <footer className="mt-auto border-t border-slate-200 pt-3 text-right text-xs text-slate-500">
            Page 1
          </footer>
        )}
      </article>
    </div>
  );
}
