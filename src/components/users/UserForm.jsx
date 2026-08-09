import React, { useState, useEffect } from "react";
import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";
import { GENDER_OPTIONS } from "../../utils/constants";
import { validators, runValidation, hasErrors } from "../../utils/validators";

const emptyForm = {
  firstName: "",
  lastName: "",
  email: "",
  age: "",
  gender: "",
};

const VALIDATION_RULES = {
  firstName: (v) => validators.required(v, "First name"),
  lastName: (v) => validators.required(v, "Last name"),
  email: (v) => validators.required(v, "Email") || validators.email(v),
  age: (v) => validators.required(v, "Age") || validators.minAge(v, 1),
  gender: (v) => validators.required(v, "Gender"),
};

const UserForm = ({ initialValues, onSubmit, onCancel, isSubmitting }) => {
  const [values, setValues] = useState(initialValues || emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setValues(initialValues || emptyForm);
    setErrors({});
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = runValidation(values, VALIDATION_RULES);

    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    onSubmit({ ...values, age: Number(values.age) });
  };

  const isEditMode = Boolean(initialValues);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="First Name"
          name="firstName"
          value={values.firstName}
          onChange={handleChange}
          error={errors.firstName}
          required
        />
        <Input
          label="Last Name"
          name="lastName"
          value={values.lastName}
          onChange={handleChange}
          error={errors.lastName}
          required
        />
      </div>

      <Input
        label="Email"
        name="email"
        type="email"
        value={values.email}
        onChange={handleChange}
        error={errors.email}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Age"
          name="age"
          type="number"
          min="1"
          value={values.age}
          onChange={handleChange}
          error={errors.age}
          required
        />
        <Select
          label="Gender"
          name="gender"
          value={values.gender}
          onChange={handleChange}
          options={GENDER_OPTIONS}
          error={errors.gender}
          required
        />
      </div>

      <div className="flex justify-end gap-3 mt-2">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isSubmitting}>
          {isEditMode ? "Save Changes" : "Add User"}
        </Button>
      </div>
    </form>
  );
};

export default UserForm;
