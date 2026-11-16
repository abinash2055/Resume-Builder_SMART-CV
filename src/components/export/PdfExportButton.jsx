
import { useState } from "react";
import { FileDown } from "lucide-react";
import { useToast } from "../common/ToastProvider";

export default function PdfExportButton({ onBeforeExport }) {
  const [isExporting, setIsExporting] = useState(false);
  const { showToast } = useToast();

  const handleExport = () => {
    if (isExporting) return;

    // Validate resume before exporting.
    if (onBeforeExport) {
      const validationPassed = onBeforeExport();

      if (!validationPassed) {
        showToast(
          "Please fix the validation errors before exporting your resume.",
          "warning"
        );
        return;
      }
    }

    const resumeElement = document.getElementById("resume-paper");

    if (!resumeElement) {
      showToast(
        "Resume preview could not be found.",
        "error"
      );
      return;
    }

    setIsExporting(true);

    const previousTitle = document.title;
    document.title = "SmartCV-Resume";

    let restored = false;
    let fallbackTimer;

    const restoreTitle = () => {
      if (restored) return;

      restored = true;

      document.title = previousTitle;
      setIsExporting(false);

      window.removeEventListener("afterprint", restoreTitle);

      if (fallbackTimer) {
        window.clearTimeout(fallbackTimer);
      }
    };

    window.addEventListener("afterprint", restoreTitle);

    try {
      window.print();

      showToast(
        "Print dialog opened. Choose Save as PDF to download your resume.",
        "success"
      );

      // Fallback for browsers that don't fire afterprint.
      fallbackTimer = window.setTimeout(() => {
        restoreTitle();
      }, 30000);
    } catch (error) {
      console.error("PDF export error:", error);

      restoreTitle();

      showToast(
        "Unable to open the PDF export dialog. Please try again.",
        "error"
      );
    }
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
