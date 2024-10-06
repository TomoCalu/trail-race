import React from 'react';

const InputField = ({ field, value, handleChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-lg font-medium mb-2">{field.label}</label>
      {field.type === 'select' ? (
        <select
          name={field.name}
          value={value}
          onChange={handleChange}
          className="select select-bordered w-full"
          required={field.required}
        >
          <option value="" disabled>{field.placeholder}</option>
          {field.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={field.type || 'text'}
          name={field.name}
          value={value}
          onChange={handleChange}
          className="input input-bordered w-full"
          disabled={field.disabled}
          required={field.required}
          placeholder={field.placeholder}
        />
      )}
    </div>
  );
};

export default InputField;