## Resume Builder Activities

SmartCV includes a comprehensive resume-building system that allows users to create, edit, customize, preview, validate, and export professional resumes.

### 1. Resume Creation and Editing
- Create a new resume with an initially empty resume structure.
- Edit personal information and contact details.
- Add and manage a professional summary.
- Add, edit, and remove work experience.
- Manage educational qualifications.
- Add and organize technical, soft, and other skills.
- Manage projects and project technologies.
- Add professional certifications and credentials.
- Manage language proficiency.
- Add awards and achievements.
- Manage volunteer experience.
- Add publications and research information.
- Add professional references.
- Create and manage custom resume sections.

### 2. Resume Templates
- Implemented 15 resume templates.
- Search templates by name, description, and category.
- Filter templates by category.
- Preview template styles before selection.
- Switch between different resume designs.
- Reset template styling to its default configuration.

Available templates:
1. Modern
2. Classic
3. Minimal
4. Compact
5. Executive
6. Corporate
7. Creative
8. Developer
9. Elegant
10. Academic
11. ATS Friendly
12. Sidebar
13. Bold
14. Professional
15. Modern Two Column

### 3. Live Resume Preview
- Real-time resume preview while editing.
- Dynamic rendering of resume sections.
- Support for different resume layouts.
- A4 and US Letter page sizes.
- Portrait and landscape orientations.
- Dynamic resume typography and spacing.
- Conditional rendering of optional resume information.
- Profile image and contact information display settings.
- Optional page numbering.

### 4. Resume Customization
- Customize resume accent colors.
- Customize text colors.
- Select different font families.
- Adjust body font size.
- Adjust heading font size.
- Adjust name font size.
- Customize page margins.
- Adjust line spacing.
- Choose single-column or two-column layouts.
- Configure profile image visibility.
- Configure contact icon visibility.
- Configure page number visibility.
- Enable high-contrast mode.
- Enable larger accessibility controls.
- Enable reduced-motion preferences.

### 5. Resume Validation
- Implemented Zod-based validation.
- Validate personal information.
- Validate professional summaries.
- Validate experience entries.
- Validate education entries.
- Validate project information.
- Validate certification details.
- Validate language information.
- Validate awards and achievements.
- Validate volunteer experience.
- Validate publication information.
- Validate professional references.
- Validate email addresses.
- Validate phone numbers.
- Validate URLs.
- Validate date formats and date ranges.
- Validate certification expiry dates.
- Detect duplicate skills.
- Validate custom section titles and entries.
- Enforce field length restrictions.
- Display field-level validation errors.
- Clear validation errors when corrected.
- Validate the complete resume before export.
- Display resume validation summaries.

### 6. Resume Completeness
- Implemented a resume completeness checker.
- Calculate a resume completeness percentage.
- Check personal name information.
- Check contact information.
- Check professional summary.
- Check professional or academic background.
- Check skills information.
- Display missing information.
- Provide suggestions for improving resume completeness.

### 7. Resume Section Management
- Show or hide resume sections.
- Reorder sections using drag-and-drop.
- Maintain section visibility settings.
- Manage the order of resume sections.
- Support custom resume sections.

### 8. PDF Export
- Export resumes using the browser's native print functionality.
- Support selectable and searchable PDF text.
- Configure page size and orientation.
- Apply resume print styles.
- Include page numbering where supported by the browser.
- Validate resume information before export.
- Display export success and error notifications.

### 9. JSON Import and Export
- Export resume data as a JSON backup.
- Import previously exported resume data.
- Validate imported JSON structure.
- Verify supported backup format and version.
- Enforce a 5 MB import file size limit.
- Confirm before replacing existing resume data.
- Import resume information, design settings, and section configurations.
- Display import and export notifications.

### 10. Accessibility
- Keyboard-accessible interface.
- Visible keyboard focus indicators.
- Accessible form labels.
- Accessible validation messages.
- ARIA attributes for form controls.
- Screen-reader-friendly notifications.
- Reduced-motion support.
- High-contrast support.
- Larger control support.
- Mobile-friendly form controls.

### 11. User Experience and Error Handling
- Responsive resume editor interface.
- Reusable form components.
- Reusable resume section components.
- Application-wide error boundary.
- Custom toast notification system.
- Success, error, warning, and informational notifications.
- Automatic toast dismissal.
- Manual toast dismissal.
- Protection against accidental resume replacement.
- User-friendly error fallback screen.

### 12. State Management
- Zustand-based application state management.
- Centralized resume data management.
- Centralized resume design settings.
- Section configuration management.
- Resume reset functionality.
- Resume data replacement and validation.
- In-memory state management without a backend or database.

---

### Development Status

- [x] Resume creation and editing
- [x] Resume section management
- [x] Resume templates
- [x] Live resume preview
- [x] Resume customization
- [x] Form validation
- [x] Resume completeness checker
- [x] PDF export functionality
- [x] JSON import and export
- [x] Accessibility improvements
- [x] Toast notifications
- [x] Global error boundary
- [x] Console error resolution
- [ ] Final production build verification
- [ ] Complete cross-browser testing
- [ ] Final responsive UI testing
- [ ] Final production readiness review



## Technology Stack

SmartCV is built using modern frontend technologies to provide a responsive, interactive, and user-friendly resume-building experience.

### Frontend
- **React.js** – Component-based user interface development.
- **Vite** – Fast development server and build tool.
- **Tailwind CSS** – Utility-first styling and responsive design.
- **React Router DOM** – Client-side navigation and routing.
- **Lucide React** – Modern and consistent icon library.

### State Management
- **Zustand** – Lightweight global state management for resume data, templates, and customization settings.

### Form Handling and Validation
- **React Hook Form** – Form management.
- **Zod** – Schema-based data validation.
- **@hookform/resolvers** – Integration between React Hook Form and Zod.

### Drag and Drop
- **@dnd-kit/core** – Drag-and-drop functionality.
- **@dnd-kit/sortable** – Sortable resume section management.
- **@dnd-kit/utilities** – Drag-and-drop utility functions.

### Development Tools
- **JavaScript (ES6+)**
- **HTML5**
- **CSS3**
- **ESLint**
- **Git and GitHub**
- **npm**

---

## Installation and Setup

Follow these steps to run SmartCV locally.

### Prerequisites

Make sure you have installed:

- Node.js (LTS version recommended)
- npm
- Git
- Visual Studio Code (recommended)

### 1. Clone the Repository

```bash
git clone "https://github.com/abinash2055/Resume-Builder_SMART-CV.git"
```

### 2. Navigate to the Project Directory

```bash
cd smartcv
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

### 5. Open SmartCV in Your Browser

Visit the local development URL displayed in your terminal. By default, Vite commonly uses:

```text
http://localhost:5173/
```

---

## Production Build

To generate an optimized production build, run:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

The generated production files will be available in the `dist/` directory.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Generate the production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint checks |

---

## Application Architecture

SmartCV follows a component-based frontend architecture.

- **Components:** Reusable UI elements and resume sections.
- **Pages:** Main application pages and navigation views.
- **Store:** Centralized Zustand state management.
- **Data:** Resume defaults, template configurations, and section settings.
- **Hooks:** Reusable application logic and validation hooks.
- **Utils:** Resume validation, data processing, and helper functions.
- **Styles:** Global styling and resume template-specific CSS.

---

## Data Management

- Resume information is managed using Zustand.
- Resume design settings are managed centrally.
- JSON import and export are available for manual backup and restoration.
- No backend server or database is currently required.
- Resume state is maintained in memory during the application session.
- Automatic cloud synchronization is not included.




## Project Structure

SmartCV uses a modular and reusable React project structure.

```text
smartcv/
│
├── public/
│   └── favicon.ico
│
├── src/
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── ErrorBoundary.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Textarea.jsx
│   │   │   ├── SectionCard.jsx
│   │   │   └── ToastProvider.jsx
│   │   │
│   │   ├── editor/
│   │   │   ├── PersonalDetails.jsx
│   │   │   ├── PersonalSummary.jsx
│   │   │   ├── Experience.jsx
│   │   │   ├── Education.jsx
│   │   │   ├── Skills.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Certifications.jsx
│   │   │   ├── Languages.jsx
│   │   │   ├── Awards.jsx
│   │   │   ├── VolunteerExperience.jsx
│   │   │   ├── Publications.jsx
│   │   │   ├── References.jsx
│   │   │   ├── CustomSections.jsx
│   │   │   ├── SectionManager.jsx
│   │   │   └── ResumeCompleteness.jsx
│   │   │
│   │   ├── preview/
│   │   │   ├── ResumePreview.jsx
│   │   │   └── resumeTemplates.css
│   │   │
│   │   ├── templates/
│   │   │   └── TemplateSelector.jsx
│   │   │
│   │   ├── customization/
│   │   │   ├── CustomizationPanel.jsx
│   │   │   ├── ColorPicker.jsx
│   │   │   └── RangeControl.jsx
│   │   │
│   │   ├── export/
│   │   │   ├── PdfExportButton.jsx
│   │   │   └── ResumeDataTransfer.jsx
│   │   │
│   │   └── layout/
│   │
│   ├── data/
│   │   ├── resumeDefaults.js
│   │   ├── sectionConfig.js
│   │   └── templateConfig.js
│   │
│   ├── hooks/
│   │   └── useEntryValidation.js
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── ResumeEditor.jsx
│   │   ├── TemplateGallery.jsx
│   │   └── NotFound.jsx
│   │
│   ├── store/
│   │   └── resumeStore.js
│   │
│   ├── utils/
│   │   ├── resumeHelpers.js
│   │   ├── resumeValidation.js
│   │   ├── advancedResumeValidation.js
│   │   ├── resumeCompleteness.js
│   │   └── resumeJson.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

*Note: This is an illustrative structure based on the implemented modules. Keep it synchronized with the actual files in your repository.*

---

## How to Use SmartCV

### Step 1: Launch the Application
Start the development server and open SmartCV in your browser.

### Step 2: Open the Resume Builder
Navigate to the resume editor from the application dashboard.

### Step 3: Enter Personal Information
Provide your name, professional title, contact information, website, and professional profile links.

### Step 4: Complete Resume Sections
Add your professional summary, work experience, education, skills, projects, certifications, and other relevant information.

### Step 5: Organize Resume Sections
Use the section manager to show, hide, and reorder resume sections.

### Step 6: Select a Resume Template
Choose from the available 15 resume templates.

### Step 7: Customize Your Resume
Adjust colors, typography, page settings, margins, spacing, and layout.

### Step 8: Review the Live Preview
Check the resume preview and verify that your information is displayed correctly.

### Step 9: Validate Your Resume
Run the resume validation process to identify missing or invalid information.

### Step 10: Export Your Resume
Use the PDF export functionality to open the browser's print dialog and save your resume as a PDF.

### Step 11: Backup Your Resume
Export your resume data as a JSON file so that you can manually restore it later.

---

## Important Notes

- SmartCV is currently a frontend-only application.
- No user registration or authentication is required.
- No backend or database is currently connected.
- Resume data is managed through in-memory Zustand state.
- Resume information is not automatically saved between browser sessions.
- Use JSON export to create a manual backup of your resume.
- Imported JSON backups must follow the supported SmartCV backup format.
- PDF export uses the browser's native printing functionality.
- PDF output can vary depending on browser and print settings.
- Some advanced print features depend on browser support.

---

## Troubleshooting

### Application Does Not Start

Install dependencies again:

```bash
npm install
```

Then run:

```bash
npm run dev
```

### Changes Are Not Appearing

- Save the modified file.
- Refresh the browser.
- Restart the Vite development server if necessary.

### Production Build Fails

Run:

```bash
npm run build
```

Review the terminal output and resolve reported errors.

### Resume Preview Looks Different in PDF

- Check the selected page size.
- Verify portrait or landscape orientation.
- Review browser print settings.
- Enable background graphics if required.
- Check the print preview before saving.

---

## Current Limitations

- No backend integration.
- No database storage.
- No automatic cloud backup.
- No user authentication.
- No multi-device synchronization.
- No automatic resume saving between sessions.
- PDF generation depends on browser printing capabilities.



## Roadmap

The following improvements are planned for future development.

- [x] Resume creation and editing.
- [x] 15 resume templates.
- [x] Live resume preview.
- [x] Resume customization.
- [x] Resume section management.
- [x] Drag-and-drop section ordering.
- [x] Zod-based form validation.
- [x] Resume completeness checker.
- [x] PDF export functionality.
- [x] JSON import and export.
- [x] Accessibility improvements.
- [x] Application-wide error handling.
- [x] Toast notification system.
- [ ] Production build verification.
- [ ] Cross-browser compatibility testing.
- [ ] Complete responsive design testing.
- [ ] Final production readiness review.

---

## Future Enhancements

Potential improvements for future versions of SmartCV include:

### Resume Management

- Multiple resume profiles.
- Resume duplication and version management.
- Automatic local backup.
- Resume history and version comparison.

### Advanced Templates

- Additional industry-specific resume templates.
- More ATS-optimized layouts.
- Custom template creation.
- Enhanced resume design previews.

### Export and Documents

- Additional document export formats.
- Improved PDF page-break handling.
- Advanced print configuration.
- Resume sharing options.

### User Experience

- Improved onboarding experience.
- Enhanced resume-writing guidance.
- More customization options.
- Additional accessibility improvements.

### Backend Integration

- Optional user authentication.
- Cloud-based resume storage.
- Secure data synchronization.
- Multi-device resume access.

---

## Contributing

Contributions, suggestions, and feedback are welcome.

If you would like to contribute to SmartCV:

1. Fork the repository.
2. Create a new feature branch.
3. Make your changes.
4. Test your implementation.
5. Commit your changes with a descriptive message.
6. Push your branch.
7. Open a Pull Request.

### Contribution Guidelines

- Follow the existing project structure.
- Write clean and reusable React components.
- Maintain consistent coding conventions.
- Avoid unnecessary dependencies.
- Test changes before submitting a Pull Request.
- Keep documentation updated.
- Report bugs with clear reproduction steps.

---

## License

This project is currently developed as a personal software project.

A formal open-source license can be added after choosing the appropriate licensing terms.

---

## Author

**Abinash Nath Pandey**

Full Stack Developer | Python AI/ML Developer

Interested in building modern web applications, intelligent software solutions, and practical tools that improve productivity.

### Connect With Me

- **GitHub:** [abinash2055](https://github.com/abinash2055)
- **Portfolio:** Add your portfolio website URL here.
- **LinkedIn:** Add your LinkedIn profile URL here.
- **Email:** Add your professional email address here.

---

## Acknowledgements

SmartCV is developed using the open-source JavaScript ecosystem and the following technologies:

- React.js
- Vite
- Tailwind CSS
- Zustand
- React Router
- Lucide React
- React Hook Form
- Zod
- dnd-kit

Special thanks to the developers and communities behind these tools and libraries.

---

\<p align="center">   \<strong>SmartCV — Build Your Resume. Shape Your Future.\</strong> \</p>

\<p align="center">   Designed and developed with care by Abinash Nath Pandey. \</p>
