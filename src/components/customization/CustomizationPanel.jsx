
import { useResumeStore } from "../../store/resumeStore";

import ColorPicker from "./ColorPicker";
import RangeControl from "./RangeControl";

import {
  RotateCcw,
  Palette,
  Type,
  Layout,
  Accessibility,
  Image,
} from "lucide-react";

const FONT_OPTIONS = [
  "Inter",
  "Arial",
  "Roboto",
  "Georgia",
  "Times New Roman",
];

function SettingSelect({
  label,
  value,
  options,
  onChange,
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-700">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function ToggleSetting({
  label,
  description,
  checked,
  onChange,
}) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4 rounded-xl border border-slate-200 p-3">
      <div>
        <span className="text-sm font-medium text-slate-800">
          {label}
        </span>

        {description && (
          <p className="mt-1 text-xs text-slate-500">
            {description}
          </p>
        )}
      </div>

      <input
        type="checkbox"
        checked={Boolean(checked)}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-indigo-600"
      />
    </label>
  );
}

function CustomizationSection({
  title,
  icon: Icon,
  children,
}) {
  return (
    <section className="space-y-4 border-b border-slate-100 pb-6 last:border-0 last:pb-0">
      <div className="flex items-center gap-2">
        <Icon size={18} className="text-indigo-600" />
        <h3 className="font-semibold text-slate-900">
          {title}
        </h3>
      </div>

      {children}
    </section>
  );
}

export default function CustomizationPanel() {
  const settings = useResumeStore((state) => state.settings);
  const updateSetting = useResumeStore((state) => state.updateSetting);
  const updateSettings = useResumeStore((state) => state.updateSettings);

  const set = (key, value) => updateSetting(key, value);

  const updateMargin = (side, value) => {
    updateSetting(`margins.${side}`, value);
  };

  const resetCustomization = () => {
    updateSettings({
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
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Resume Customization
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Personalize the appearance and layout of your resume.
          </p>
        </div>

        <button
          type="button"
          onClick={resetCustomization}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-indigo-300 hover:text-indigo-600"
        >
          <RotateCcw size={15} />
          Reset settings
        </button>
      </div>

      <div className="space-y-7">

        {/* COLORS */}
        <CustomizationSection title="Colors" icon={Palette}>
          <ColorPicker
            label="Accent color"
            value={settings.accentColor}
            onChange={(value) => set("accentColor", value)}
            description="Used for headings and visual highlights."
          />

          <ColorPicker
            label="Text color"
            value={settings.textColor}
            onChange={(value) => set("textColor", value)}
            description="Used for the main resume text."
          />
        </CustomizationSection>

        {/* TYPOGRAPHY */}
        <CustomizationSection title="Typography" icon={Type}>
          <SettingSelect
            label="Font family"
            value={settings.fontFamily}
            onChange={(value) => set("fontFamily", value)}
            options={FONT_OPTIONS.map((font) => ({
              value: font,
              label: font,
            }))}
          />

          <RangeControl
            label="Body font size"
            value={settings.fontSize}
            min={8}
            max={16}
            unit=" pt"
            onChange={(value) => set("fontSize", value)}
          />

          <RangeControl
            label="Heading size"
            value={settings.headingSize}
            min={10}
            max={24}
            unit=" pt"
            onChange={(value) => set("headingSize", value)}
          />

          <RangeControl
            label="Name size"
            value={settings.nameSize}
            min={18}
            max={40}
            unit=" px"
            onChange={(value) => set("nameSize", value)}
          />
        </CustomizationSection>

        {/* PAGE LAYOUT */}
        <CustomizationSection title="Page layout" icon={Layout}>
          <SettingSelect
            label="Page size"
            value={settings.pageSize}
            onChange={(value) => set("pageSize", value)}
            options={[
              { value: "A4", label: "A4" },
              { value: "Letter", label: "US Letter" },
            ]}
          />

          <SettingSelect
            label="Orientation"
            value={settings.orientation}
            onChange={(value) => set("orientation", value)}
            options={[
              { value: "portrait", label: "Portrait" },
              { value: "landscape", label: "Landscape" },
            ]}
          />

          <SettingSelect
            label="Columns"
            value={String(settings.columns)}
            onChange={(value) => set("columns", Number(value))}
            options={[
              { value: "1", label: "Single column" },
              { value: "2", label: "Two columns" },
            ]}
          />

          <div className="space-y-4 rounded-xl bg-slate-50 p-4">
            <h4 className="text-sm font-semibold text-slate-800">
              Page margins
            </h4>

            {["top", "bottom", "left", "right"].map((side) => (
              <RangeControl
                key={side}
                label={`${side.charAt(0).toUpperCase()}${side.slice(1)} margin`}
                value={settings.margins?.[side] ?? 16}
                min={5}
                max={35}
                unit=" mm"
                onChange={(value) => updateMargin(side, value)}
              />
            ))}
          </div>

          <RangeControl
            label="Line spacing"
            value={settings.lineSpacing}
            min={1}
            max={2}
            step={0.1}
            unit="x"
            onChange={(value) => set("lineSpacing", value)}
          />
        </CustomizationSection>

        {/* DISPLAY */}
        <CustomizationSection title="Display options" icon={Image}>
          <ToggleSetting
            label="Profile image"
            description="Display your uploaded profile image."
            checked={settings.showProfileImage}
            onChange={(value) => set("showProfileImage", value)}
          />

          <ToggleSetting
            label="Contact icons"
            description="Show icons alongside contact information."
            checked={settings.showContactIcons}
            onChange={(value) => set("showContactIcons", value)}
          />

          <ToggleSetting
            label="Page numbers"
            description="Reserve a footer area for page numbering."
            checked={settings.showPageNumbers}
            onChange={(value) => set("showPageNumbers", value)}
          />
        </CustomizationSection>

        {/* ACCESSIBILITY */}
        <CustomizationSection title="Accessibility" icon={Accessibility}>
          <ToggleSetting
            label="High contrast"
            description="Increase text and divider contrast."
            checked={settings.highContrast}
            onChange={(value) => set("highContrast", value)}
          />

          <ToggleSetting
            label="Larger controls"
            description="Increase the size of editor controls."
            checked={settings.largerControls}
            onChange={(value) => set("largerControls", value)}
          />

          <ToggleSetting
            label="Reduce motion"
            description="Reduce non-essential interface transitions."
            checked={settings.reduceMotion}
            onChange={(value) => set("reduceMotion", value)}
          />
        </CustomizationSection>

      </div>
    </div>
  );
}
