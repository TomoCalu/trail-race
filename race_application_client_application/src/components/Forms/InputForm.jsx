import React from "react";
import InputField from "./InputField";

const InputForm = ({
  title,
  formData,
  handleChange,
  handleSubmit,
  fields,
  buttonLabel,
  loading,
  error,
}) => {
  return (
    <div className="container mx-auto p-4 max-w-screen-lg">
      <div className="bg-base-100 shadow-lg rounded-lg mb-8 p-6">
        <h2 className="text-4xl font-bold text-center text-primary mb-8">
          {title}
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <InputField
              key={field.name}
              field={field}
              value={formData[field.name]}
              handleChange={handleChange}
            />
          ))}
          <div className="flex justify-center">
            <button
              type="submit"
              className="btn btn-primary w-1/3"
              disabled={loading}
            >
              {loading ? "Saving..." : buttonLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InputForm;
