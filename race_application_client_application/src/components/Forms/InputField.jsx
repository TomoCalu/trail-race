import React from 'react';
import TextField from './TextField';
import SelectField from './SelectField';

const InputField = ({ field, value, handleChange }) => {
  if (field.type === 'select') {
    return (
      <SelectField field={field} value={value} handleChange={handleChange} />
    );
  } else {
    return (
      <TextField field={field} value={value} handleChange={handleChange} />
    );
  }
};

export default InputField;
