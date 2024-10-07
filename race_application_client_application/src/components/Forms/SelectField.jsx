import React from 'react';

const SelectField = ({ field, value, handleChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-lg font-medium mb-2">{field.label}</label>
      <select
        name={field.name}
        value={value}
        onChange={handleChange}
        className="select select-bordered w-full"
        required={field.required}
      >
        <option value="" disabled>
          {field.placeholder}
        </option>
        {Array.isArray(field.options) &&
          field.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
    </div>
  );
};

export default SelectField;
