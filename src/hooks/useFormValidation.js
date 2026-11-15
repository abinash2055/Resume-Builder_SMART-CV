
import { useState } from "react";

export default function useFormValidation(schema) {
  const [errors, setErrors] = useState({});

  const validateField = (fieldName, value) => {
    const fieldSchema = schema.shape?.[fieldName];

    if (!fieldSchema) return true;

    const result = fieldSchema.safeParse(value);

    setErrors((currentErrors) => {
      const nextErrors = { ...currentErrors };

      if (result.success) {
        delete nextErrors[fieldName];
      } else {
        nextErrors[fieldName] =
          result.error.issues[0]?.message || "Invalid value.";
      }

      return nextErrors;
    });

    return result.success;
  };

  const validateAll = (values) => {
    const result = schema.safeParse(values);

    if (result.success) {
      setErrors({});
      return {
        valid: true,
        errors: {},
      };
    }

    const nextErrors = {};

    result.error.issues.forEach((issue) => {
      const fieldName = issue.path.join(".");

      if (fieldName && !nextErrors[fieldName]) {
        nextErrors[fieldName] = issue.message;
      }
    });

    setErrors(nextErrors);

    return {
      valid: false,
      errors: nextErrors,
    };
  };

  const clearError = (fieldName) => {
    setErrors((currentErrors) => {
      const nextErrors = { ...currentErrors };
      delete nextErrors[fieldName];
      return nextErrors;
    });
  };

  const clearErrors = () => {
    setErrors({});
  };

  return {
    errors,
    validateField,
    validateAll,
    clearError,
    clearErrors,
  };
}
