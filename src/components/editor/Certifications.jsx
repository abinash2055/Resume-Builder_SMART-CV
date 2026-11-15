
import { useResumeStore } from "../../store/resumeStore";
import {
  Award,
  Plus,
  Trash2,
  ExternalLink,
} from "lucide-react";

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

function Certifications() {
  const certifications = useResumeStore(
    (state) => state.resume.certifications
  );

  const addEntry = useResumeStore((state) => state.addEntry);
  const updateEntry = useResumeStore((state) => state.updateEntry);
  const removeEntry = useResumeStore((state) => state.removeEntry);

  const handleAddCertification = () => {
    addEntry("certifications", createEmptyCertification());
  };

  const handleChange = (id, event) => {
    const { name, value, type, checked } = event.target;

    const updatedValue = type === "checkbox" ? checked : value;

    updateEntry("certifications", id, {
      [name]: updatedValue,
      ...(name === "noExpiry" && checked ? { expiryDate: "" } : {}),
    });
  };

  const handleRemoveCertification = (id) => {
    removeEntry("certifications", id);
  };

  return (
    <SectionCard
      title="Certifications"
      description="Show your professional certifications, courses, and credentials."
      icon={Award}
    >
      <div className="space-y-6">
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

        {certifications.map((item, index) => (
          <div
            key={item.id}
            className="rounded-xl border border-slate-200 p-4 sm:p-5"
          >
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
                onClick={() => handleRemoveCertification(item.id)}
                aria-label={`Delete certification ${index + 1}`}
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
              >
                <Trash2 size={16} />
                <span className="hidden sm:inline">Remove</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Input
                label="Certification Name"
                name="name"
                value={item.name || ""}
                onChange={(event) => handleChange(item.id, event)}
                placeholder="e.g. AWS Certified Developer"
              />

              <Input
                label="Issuing Organization"
                name="issuer"
                value={item.issuer || ""}
                onChange={(event) => handleChange(item.id, event)}
                placeholder="e.g. Amazon Web Services"
              />

              <Input
                label="Issue Date"
                name="issueDate"
                type="month"
                value={item.issueDate || ""}
                onChange={(event) => handleChange(item.id, event)}
              />

              <Input
                label="Expiration Date"
                name="expiryDate"
                type="month"
                value={item.expiryDate || ""}
                onChange={(event) => handleChange(item.id, event)}
                disabled={item.noExpiry}
              />

              <Input
                label="Credential ID"
                name="credentialId"
                value={item.credentialId || ""}
                onChange={(event) => handleChange(item.id, event)}
                placeholder="Enter credential ID"
              />

              <Input
                label="Credential Verification URL"
                name="credentialUrl"
                type="url"
                value={item.credentialUrl || ""}
                onChange={(event) => handleChange(item.id, event)}
                placeholder="https://example.com/verify"
              />
            </div>

            <label className="mt-5 flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                name="noExpiry"
                checked={Boolean(item.noExpiry)}
                onChange={(event) => handleChange(item.id, event)}
                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />

              <span className="text-sm font-medium text-slate-700">
                This certification does not expire
              </span>
            </label>

            <div className="mt-5">
              <Textarea
                label="Description"
                name="description"
                value={item.description || ""}
                onChange={(event) => handleChange(item.id, event)}
                placeholder="Add details about the certification, skills covered, or achievements..."
                rows={4}
                maxLength={1500}
                helperText={`${(item.description || "").length}/1500 characters`}
              />
            </div>

            {item.credentialUrl && (
              <div className="mt-4">
                <a
                  href={item.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-800"
                >
                  <ExternalLink size={15} />
                  Verify Credential
                </a>
              </div>
            )}
          </div>
        ))}

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
