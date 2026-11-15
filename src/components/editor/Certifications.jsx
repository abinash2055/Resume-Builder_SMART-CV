
import { useResumeStore } from "../../store/resumeStore";

import {
  Award,
  Plus,
  Trash2,
  ExternalLink,
} from "lucide-react";

import useEntryValidation from "../../hooks/useEntryValidation";

import Input from "../common/Input";
import Textarea from "../common/Textarea";
import SectionCard from "../common/SectionCard";

function createEmptyCertification() {
  return {
    name: "",
    issuer: "",
    issueDate: "",
    expiryDate: "",
    noExpiry: false,
    credentialId: "",
    credentialUrl: "",
    description: "",
  };
}

// Return a safe HTTP/HTTPS URL for the verification link.
function getSafeCredentialUrl(value) {
  if (!value?.trim()) return "";

  try {
    const normalizedUrl = /^https?:\/\//i.test(value)
      ? value
      : `https://${value}`;

    const url = new URL(normalizedUrl);

    if (!["http:", "https:"].includes(url.protocol)) {
      return "";
    }

    return url.href;
  } catch {
    return "";
  }
}

function Certifications() {
  const certifications = useResumeStore(
    (state) => state.resume.certifications
  );

  const addEntry = useResumeStore(
    (state) => state.addEntry
  );

  const updateEntry = useResumeStore(
    (state) => state.updateEntry
  );

  const removeEntry = useResumeStore(
    (state) => state.removeEntry
  );

  // Certification validation
  const {
    errorsByEntry,
    validateField,
    clearEntryErrors,
  } = useEntryValidation("certifications");

  // Add certification
  const handleAddCertification = () => {
    addEntry("certifications", createEmptyCertification());
  };

  // Update certification and validate the changed field
  const handleChange = (id, event) => {
    const { name, value, type, checked } = event.target;

    const updatedValue =
      type === "checkbox" ? checked : value;

    const currentEntry = certifications.find(
      (item) => item.id === id
    );

    if (!currentEntry) return;

    const updatedEntry = {
      ...currentEntry,
      [name]: updatedValue,

      // Clear expiry date when No Expiry is selected.
      ...(name === "noExpiry" && checked
        ? { expiryDate: "" }
        : {}),
    };

    updateEntry("certifications", id, {
      [name]: updatedValue,

      ...(name === "noExpiry" && checked
        ? { expiryDate: "" }
        : {}),
    });

    // Validate both regular fields and the No Expiry checkbox.
    // The validation hook also checks the issue/expiry date relationship.
    validateField(
      id,
      updatedEntry,
      name,
      updatedValue
    );
  };

  // Remove certification
  const handleRemoveCertification = (id) => {
    clearEntryErrors(id);
    removeEntry("certifications", id);
  };

  return (
    <SectionCard
      title="Certifications"
      description="Show your professional certifications, courses, and credentials."
      icon={Award}
    >
      <div className="space-y-6">

        {/* Empty State */}
        {certifications.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center">
            <Award
              size={32}
              className="mx-auto text-slate-400"
            />

            <h3 className="mt-3 font-semibold text-slate-700">
              No certifications added
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Add certificates, professional credentials, or completed courses.
            </p>
          </div>
        )}

        {/* Certification Entries */}
        {certifications.map((item, index) => {
          const entryErrors =
            errorsByEntry[item.id] || {};

          const credentialUrl = getSafeCredentialUrl(
            item.credentialUrl
          );

          return (
            <div
              key={item.id}
              className="rounded-xl border border-slate-200 p-4 sm:p-5"
            >
              {/* Entry Header */}
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-slate-800">
                    Certification {index + 1}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Credential information
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    handleRemoveCertification(item.id)
                  }
                  aria-label={`Delete certification ${index + 1}`}
                  className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                  <Trash2 size={16} />

                  <span className="hidden sm:inline">
                    Remove
                  </span>
                </button>
              </div>

              {/* Certification Fields */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                {/* Certification Name */}
                <Input
                  label="Certification Name"
                  name="name"
                  value={item.name || ""}
                  onChange={(event) =>
                    handleChange(item.id, event)
                  }
                  onBlur={(event) =>
                    validateField(
                      item.id,
                      item,
                      "name",
                      event.target.value
                    )
                  }
                  error={entryErrors.name}
                  placeholder="e.g. AWS Certified Developer"
                  maxLength={200}
                />

                {/* Issuing Organization */}
                <Input
                  label="Issuing Organization"
                  name="issuer"
                  value={item.issuer || ""}
                  onChange={(event) =>
                    handleChange(item.id, event)
                  }
                  onBlur={(event) =>
                    validateField(
                      item.id,
                      item,
                      "issuer",
                      event.target.value
                    )
                  }
                  error={entryErrors.issuer}
                  placeholder="e.g. Amazon Web Services"
                  maxLength={200}
                />

                {/* Issue Date */}
                <Input
                  label="Issue Date"
                  name="issueDate"
                  type="month"
                  value={item.issueDate || ""}
                  onChange={(event) =>
                    handleChange(item.id, event)
                  }
                  onBlur={(event) =>
                    validateField(
                      item.id,
                      item,
                      "issueDate",
                      event.target.value
                    )
                  }
                  error={entryErrors.issueDate}
                />

                {/* Expiration Date */}
                <Input
                  label="Expiration Date"
                  name="expiryDate"
                  type="month"
                  value={item.expiryDate || ""}
                  onChange={(event) =>
                    handleChange(item.id, event)
                  }
                  onBlur={(event) =>
                    validateField(
                      item.id,
                      item,
                      "expiryDate",
                      event.target.value
                    )
                  }
                  error={entryErrors.expiryDate}
                  disabled={item.noExpiry}
                />

                {/* Credential ID */}
                <Input
                  label="Credential ID"
                  name="credentialId"
                  value={item.credentialId || ""}
                  onChange={(event) =>
                    handleChange(item.id, event)
                  }
                  onBlur={(event) =>
                    validateField(
                      item.id,
                      item,
                      "credentialId",
                      event.target.value
                    )
                  }
                  error={entryErrors.credentialId}
                  placeholder="Enter credential ID"
                  maxLength={200}
                />

                {/* Credential URL */}
                <Input
                  label="Credential Verification URL"
                  name="credentialUrl"
                  type="url"
                  value={item.credentialUrl || ""}
                  onChange={(event) =>
                    handleChange(item.id, event)
                  }
                  onBlur={(event) =>
                    validateField(
                      item.id,
                      item,
                      "credentialUrl",
                      event.target.value
                    )
                  }
                  error={entryErrors.credentialUrl}
                  placeholder="https://example.com/verify"
                  maxLength={500}
                />
              </div>

              {/* No Expiry */}
              <label className="mt-5 flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  name="noExpiry"
                  checked={Boolean(item.noExpiry)}
                  onChange={(event) =>
                    handleChange(item.id, event)
                  }
                  className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />

                <span className="text-sm font-medium text-slate-700">
                  This certification does not expire
                </span>
              </label>

              {/* Description */}
              <div className="mt-5">
                <Textarea
                  label="Description"
                  name="description"
                  value={item.description || ""}
                  onChange={(event) =>
                    handleChange(item.id, event)
                  }
                  onBlur={(event) =>
                    validateField(
                      item.id,
                      item,
                      "description",
                      event.target.value
                    )
                  }
                  error={entryErrors.description}
                  placeholder="Add details about the certification, skills covered, or achievements..."
                  rows={4}
                  maxLength={3000}
                  helperText={`${(item.description || "").length}/3000 characters`}
                />
              </div>

              {/* Verification Link */}
              {credentialUrl && (
                <div className="mt-4">
                  <a
                    href={credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-800"
                  >
                    <ExternalLink size={15} />
                    Verify Credential
                  </a>
                </div>
              )}
            </div>
          );
        })}

        {/* Add Certification */}
        <button
          type="button"
          onClick={handleAddCertification}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-indigo-300 bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-700 transition hover:border-indigo-500 hover:bg-indigo-100"
        >
          <Plus size={18} />
          Add Certification
        </button>

      </div>
    </SectionCard>
  );
}

export default Certifications;
