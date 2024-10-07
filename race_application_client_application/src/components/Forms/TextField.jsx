import React from 'react';

const TextField = ({ field, value, handleChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-lg font-medium mb-2">{field.label}</label>
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
    </div>
  );
};

export default TextField;
