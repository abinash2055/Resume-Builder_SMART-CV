
import { useState } from "react";
import { FileDown } from "lucide-react";

export default function PdfExportButton({ onBeforeExport }) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    // Validate resume before exporting.
    if (onBeforeExport) {
      const validationPassed = onBeforeExport();

      if (!validationPassed) {
        return;
      }
    }

    const resumeElement = document.getElementById("resume-paper");

    if (!resumeElement) {
      alert("Resume preview could not be found.");
      return;
    }

    setIsExporting(true);

    const previousTitle = document.title;

    document.title = "SmartCV-Resume";

    let restored = false;

    const restoreTitle = () => {
      if (restored) return;

      restored = true;

      document.title = previousTitle;
      setIsExporting(false);

      window.removeEventListener("afterprint", restoreTitle);
    };

    window.addEventListener("afterprint", restoreTitle);

    window.print();

    // Fallback for browsers that don't fire afterprint.
    window.setTimeout(() => {
      restoreTitle();
    }, 30000);
  };

  return (
    <button
      type="button"
      onClick={handleExport}
      disabled={isExporting}
      title="Validate your resume and open the print dialog to save as PDF."
      className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-wait disabled:opacity-60"
    >
      <FileDown size={16} />

      <span>
        {isExporting ? "Preparing..." : "Export PDF"}
      </span>
    </button>
  );
}
