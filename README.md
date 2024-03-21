# useFormState

A custom React hook for managing form state with validation using Immer and Yup.

## Overview

The `useFormState` hook allows you to easily manage form state in React components. It utilizes Immer for immutable state updates and Yup for schema-based validation. This hook simplifies the process of handling form inputs and validation errors, making it ideal for building forms in React applications.

## Installation

To use the `useFormState` hook in your React project, simply copy the code into your project or create a separate file for it. You may also need to install the following dependencies:

- React: This hook is built for React applications and requires the React library.
- Immer: Immer is used for producing immutable state updates in a more convenient way.
- Yup: Yup is a schema validation library used for validating form inputs.

```
npm install react immer yup
```

## Usage

```javascript
import React, { useState } from 'react';
import { useFormState } from './useFormState';
import * as Yup from 'yup';

const MyForm = () => {
  const initialValues = {
    name: '',
    email: '',
    password: ''
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
  });

  const { formState, errors, handleChange, handleSubmit } = useFormState(initialValues, validationSchema);

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={formState.name} onChange={handleChange} />
      {errors.name && <span>{errors.name}</span>}
      <input type="email" name="email" value={formState.email} onChange={handleChange} />
      {errors.email && <span>{errors.email}</span>}
      <input type="password" name="password" value={formState.password} onChange={handleChange} />
      {errors.password && <span>{errors.password}</span>}
      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
```

## API

### `useFormState(initialValues: Object, validationSchema: Object)`

Creates a form state management hook with validation.

- `initialValues`: An object containing the initial values of the form fields.
- `validationSchema`: A Yup validation schema defining the validation rules for the form fields.

Returns an object with the following properties:

- `formState`: The current state of the form fields.
- `errors`: An object containing validation errors for each form field.
- `handleChange`: A function to handle changes in form field values.
- `handleSubmit`: A function to handle form submission, including validation.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```plaintext
