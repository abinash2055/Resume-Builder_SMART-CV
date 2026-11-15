
import { useCallback, useState } from "react";

import {
  ENTRY_SCHEMAS,
  validateDateRange,
  validateCertificationDateRange,
} from "../utils/resumeValidation";

export default function useEntryValidation(sectionName) {
  const [errorsByEntry, setErrorsByEntry] = useState({});

  const schema = ENTRY_SCHEMAS[sectionName];

  // -------------------------------------
  // UPDATE A SINGLE FIELD ERROR
  // -------------------------------------

  const setEntryError = useCallback(
    (entryId, fieldName, message) => {
      setErrorsByEntry((current) => {
        const next = { ...current };

        const entryErrors = {
          ...(next[entryId] || {}),
        };

        if (message) {
          entryErrors[fieldName] = message;
        } else {
          delete entryErrors[fieldName];
        }

        if (Object.keys(entryErrors).length === 0) {
          delete next[entryId];
        } else {
          next[entryId] = entryErrors;
        }

        return next;
      });
    },
    []
  );

  // -------------------------------------
  // VALIDATE DATE RELATIONSHIP
  // -------------------------------------

  const validateEntryDateRange = useCallback(
    (entryId, entry) => {
      if (
        !("startDate" in entry) ||
        !("endDate" in entry)
      ) {
        return true;
      }

      const dateResult = validateDateRange(
        entry.startDate,
        entry.endDate,
        entry.isCurrent
      );

      setEntryError(
        entryId,
        "endDate",
        dateResult.valid ? "" : dateResult.message
      );

      return dateResult.valid;
    },
    [setEntryError]
  );

  // -------------------------------------
  // VALIDATE INDIVIDUAL FIELD
  // -------------------------------------

  const validateField = useCallback(
    (entryId, entry, fieldName, value) => {
      const fieldSchema = schema?.shape?.[fieldName];

      if (!fieldSchema) {
        return false;
      }

      const result = fieldSchema.safeParse(value);

      const message = result.success
        ? ""
        : result.error.issues[0]?.message ||
          "Invalid value.";

      setEntryError(entryId, fieldName, message);

      const updatedEntry = {
        ...entry,
        [fieldName]: value,
      };

      let dateRangeValid = true;

      // Start date and end date validation
      if (
        fieldName === "startDate" ||
        fieldName === "endDate"
      ) {
        dateRangeValid = validateEntryDateRange(
          entryId,
          updatedEntry
        );
      }

      // Current employment, education or volunteering
      if (fieldName === "isCurrent") {
        if (value === true) {
          setEntryError(entryId, "endDate", "");
          dateRangeValid = true;
        } else {
          dateRangeValid = validateEntryDateRange(
            entryId,
            updatedEntry
          );
        }
      }

      // -------------------------------------
      // CERTIFICATION DATE VALIDATION
      // -------------------------------------

      if (
        fieldName === "issueDate" ||
        fieldName === "expiryDate" ||
        fieldName === "noExpiry"
      ) {
        const dateResult =
          validateCertificationDateRange(
            updatedEntry.issueDate,
            updatedEntry.expiryDate,
            updatedEntry.noExpiry
          );

        setEntryError(
          entryId,
          "expiryDate",
          dateResult.valid ? "" : dateResult.message
        );

        if (!dateResult.valid) {
          return false;
        }
      }

      return result.success && dateRangeValid;
    },
    [
      schema,
      setEntryError,
      validateEntryDateRange,
    ]
  );

  // -------------------------------------
  // VALIDATE COMPLETE ENTRY
  // -------------------------------------

  const validateEntry = useCallback(
    (entryId, entry) => {
      if (!schema) {
        return false;
      }

      const result = schema.safeParse(entry);

      const nextErrors = {};

      // Individual field validation
      if (!result.success) {
        result.error.issues.forEach((issue) => {
          const fieldName = issue.path.join(".");

          if (
            fieldName &&
            !nextErrors[fieldName]
          ) {
            nextErrors[fieldName] = issue.message;
          }
        });
      }

      // Start date and end date validation
      if (
        "startDate" in entry &&
        "endDate" in entry
      ) {
        const dateResult = validateDateRange(
          entry.startDate,
          entry.endDate,
          entry.isCurrent
        );

        if (!dateResult.valid) {
          nextErrors.endDate = dateResult.message;
        }
      }

      // -------------------------------------
      // CERTIFICATION DATE VALIDATION
      // -------------------------------------

      if (
        "issueDate" in entry &&
        "expiryDate" in entry
      ) {
        const dateResult =
          validateCertificationDateRange(
            entry.issueDate,
            entry.expiryDate,
            entry.noExpiry
          );

        if (!dateResult.valid) {
          nextErrors.expiryDate = dateResult.message;
        }
      }

      // Update errors
      setErrorsByEntry((current) => {
        const next = { ...current };

        if (Object.keys(nextErrors).length > 0) {
          next[entryId] = nextErrors;
        } else {
          delete next[entryId];
        }

        return next;
      });

      return Object.keys(nextErrors).length === 0;
    },
    [schema]
  );

  // -------------------------------------
  // CLEAR ONE ENTRY'S ERRORS
  // -------------------------------------

  const clearEntryErrors = useCallback((entryId) => {
    setErrorsByEntry((current) => {
      const next = { ...current };

      delete next[entryId];

      return next;
    });
  }, []);

  // -------------------------------------
  // CLEAR ALL ERRORS
  // -------------------------------------

  const clearAllErrors = useCallback(() => {
    setErrorsByEntry({});
  }, []);

  // -------------------------------------
  // RETURN VALIDATION API
  // -------------------------------------

  return {
    errorsByEntry,
    validateField,
    validateEntry,
    clearEntryErrors,
    clearAllErrors,
  };
}
