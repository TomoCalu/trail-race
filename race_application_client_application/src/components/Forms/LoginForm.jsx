import React from 'react';
import InputField from './InputField';

const LoginForm = ({
  email,
  password,
  setEmail,
  setPassword,
  handleSubmit,
  loading,
  error,
}) => {
  const fields = [
    {
      label: 'Email',
      type: 'email',
      name: 'email',
      value: email,
      placeholder: 'Email',
      required: true,
      handleChange: (e) => setEmail(e.target.value),
    },
    {
      label: 'Password',
      type: 'password',
      name: 'password',
      value: password,
      placeholder: 'Password',
      required: true,
      handleChange: (e) => setPassword(e.target.value),
    },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-8 space-y-6">
        <h2 className="text-4xl font-bold text-center text-gray-100">Login</h2>

        {error && (
          <div className="alert alert-error text-sm text-gray-300">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {fields.map((field) => (
            <InputField
              key={field.name}
              field={field}
              value={field.value}
              handleChange={field.handleChange}
            />
          ))}

          <button
            type="submit"
            className="btn btn-primary w-full py-3 text-lg"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
