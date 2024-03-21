import React, { useState, useEffect } from 'react';
import { immer } from 'immer';
import { yup } from 'yup';

/**
 * Custom hook for managing form state using Immer and Yup for validation.
 * @param {Object} initialValues - Initial values of the form fields.
 * @param {Object} validationSchema - Yup validation schema.
 * @returns {Object} Form state, error messages and a handler function.
 */
const useFormState = (initialValues, validationSchema) => {
  const [formState, setFormState] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const validate = async (values) => {
    try {
      await validationSchema.validate(values, { abortEarly: false });
      setErrors({});
      return true;
    } catch (error) {
      const formattedErrors = error.inner.reduce((acc, curr) => {
        acc[curr.path] = curr.message;
        return acc;
      }, {});
      setErrors(formattedErrors);
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(currentState => immer(currentState, draft => {
      draft[name] = value;
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await validate(formState);
    if (isValid) {
      // Handle form submission
      console.log('Form is valid:', formState);
    }
  };

  return { formState, errors, handleChange, handleSubmit };
};

export default useFormState;
