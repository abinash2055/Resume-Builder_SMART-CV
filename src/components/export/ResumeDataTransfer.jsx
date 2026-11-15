
import { useRef, useState } from "react";
import { Download, Upload } from "lucide-react";

import { useResumeStore } from "../../store/resumeStore";
import {
  createResumeJson,
  validateResumeJson,
} from "../../utils/resumeJson";

export default function ResumeDataTransfer() {
  const fileInputRef = useRef(null);
  const [isImporting, setIsImporting] = useState(false);

  const handleExport = () => {
    try {
      const snapshot = useResumeStore
        .getState()
        .getResumeSnapshot();

      const backup = createResumeJson(snapshot);

      const blob = new Blob(
        [JSON.stringify(backup, null, 2)],
        { type: "application/json" }
      );

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      const date = new Date().toISOString().slice(0, 10);

      link.href = url;
      link.download = `smartcv-resume-${date}.json`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Resume export failed:", error);
      alert(error.message || "Unable to export resume.");
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImport = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setIsImporting(true);

    try {
      if (file.size > 5 * 1024 * 1024) {
        throw new Error("File size must not exceed 5 MB.");
      }

      const fileText = await file.text();
      const parsedData = JSON.parse(fileText);

      // Validate the entire backup before changing the store.
      const importedData = validateResumeJson(parsedData);

      const shouldImport = window.confirm(
        "Importing this backup will replace your current resume, " +
        "design settings, and section configuration. Continue?"
      );

      if (!shouldImport) return;

      const store = useResumeStore.getState();

      // Restore all three parts of the resume.
      store.replaceResume(importedData.resume);
      store.updateSettings(importedData.settings);
      store.replaceSections(importedData.sections);

      alert("Your SmartCV resume was imported successfully.");
    } catch (error) {
      console.error("Resume import failed:", error);

      alert(
        error instanceof SyntaxError
          ? "The selected file contains invalid JSON."
          : error.message || "Unable to import resume."
      );
    } finally {
      setIsImporting(false);

      // Allow the same file to be selected again.
      event.target.value = "";
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <input
        ref={fileInputRef}
        type="file"
        accept=".json,application/json"
        onChange={handleImport}
        className="hidden"
      />

      <button
        type="button"
        onClick={handleExport}
        className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
      >
        <Download size={16} />
        <span>Export JSON</span>
      </button>

      <button
        type="button"
        onClick={handleImportClick}
        disabled={isImporting}
        className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-wait disabled:opacity-60"
      >
        <Upload size={16} />
        <span>{isImporting ? "Importing..." : "Import JSON"}</span>
      </button>
    </div>
  );
}
