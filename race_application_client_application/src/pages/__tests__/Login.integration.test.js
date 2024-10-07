import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../Login';
import AuthContext from '../../context/AuthContext';
import { loginUser } from '../../services/authApi';

jest.mock('../../services/authApi', () => ({
  loginUser: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const renderComponent = (authContextValues) => {
  return render(
    <AuthContext.Provider value={authContextValues}>
      <Router>
        <Login />
      </Router>
    </AuthContext.Provider>
  );
};

describe('Login Integration Test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('logs in successfully and navigates to home', async () => {
    const mockToken = 'mock-token';
    loginUser.mockResolvedValue(mockToken);

    const authContextValues = {
      token: null,
      saveToken: jest.fn(),
    };

    renderComponent(authContextValues);

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(screen.getByText(/logging in.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(authContextValues.saveToken).toHaveBeenCalledWith(mockToken);
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  it('shows error message on failed login', async () => {
    const mockError = new Error('Invalid credentials');
    loginUser.mockRejectedValue(mockError);

    const authContextValues = {
      token: null,
      saveToken: jest.fn(),
    };

    renderComponent(authContextValues);

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await screen.findByText('Invalid credentials');

    await waitFor(() =>
      expect(authContextValues.saveToken).not.toHaveBeenCalled()
    );

    await waitFor(() => expect(mockNavigate).not.toHaveBeenCalled());
  });
});
