export const validators = {
  required: (value, fieldLabel = "This field") =>
    value === undefined || value === null || String(value).trim() === ""
      ? `${fieldLabel} is required.`
      : "",

  email: (value) => {
    if (!value) return "";
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value) ? "" : "Please enter a valid email address.";
  },

  minAge: (value, min = 0) => {
    if (value === "" || value === undefined || value === null) return "";
    return Number(value) >= min ? "" : `Age must be ${min} or greater.`;
  },
};


export const runValidation = (values, rules) => {
  const errors = {};
  Object.entries(rules).forEach(([field, ruleFn]) => {
    const error = ruleFn(values[field]);
    if (error) errors[field] = error;
  });
  return errors;
};

export const hasErrors = (errors) => Object.values(errors).some(Boolean);
