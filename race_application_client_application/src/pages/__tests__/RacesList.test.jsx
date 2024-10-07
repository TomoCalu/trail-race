import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import * as router from 'react-router';
import RacesList from '../RacesList';
import AuthContext from '../../context/AuthContext';
import { getRaces, deleteRace } from '../../services/raceApi';
import { ROLE_ADMINISTRATOR } from '../../constants/roles';

jest.mock('../../services/raceApi', () => ({
  getRaces: jest.fn(),
  deleteRace: jest.fn(),
}));

const renderComponent = (authContextValues) => {
  return render(
    <AuthContext.Provider value={authContextValues}>
      <Router>
        <RacesList />
      </Router>
    </AuthContext.Provider>
  );
};

describe('RacesList component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => mockNavigate);
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockNavigate,
    }));
  });

  it('renders the list of races', async () => {
    const races = [
      { id: '1', name: 'Race 1', distance: 'FIVE_K' },
      { id: '2', name: 'Race 2', distance: 'TEN_K' },
    ];
    getRaces.mockResolvedValue(races);

    const authContextValues = {
      token: 'test-token',
      user: { roles: [ROLE_ADMINISTRATOR] },
      checkTokenExpiration: jest.fn(),
    };

    renderComponent(authContextValues);

    expect(screen.getByText(/Races/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Race 1')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Race 2')).toBeInTheDocument();
    });
  });

  it('allows an admin to delete a race', async () => {
    const races = [{ id: '1', name: 'Race 1', distance: 'FIVE_K' }];
    getRaces.mockResolvedValue(races);
    deleteRace.mockResolvedValue({});

    const authContextValues = {
      token: 'test-token',
      user: { roles: [ROLE_ADMINISTRATOR] },
      checkTokenExpiration: jest.fn(),
    };

    renderComponent(authContextValues);

    await waitFor(() => {
      expect(screen.getByText('Race 1')).toBeInTheDocument();
    });

    window.confirm = jest.fn().mockImplementation(() => true);

    fireEvent.click(screen.getByText(/Delete/i));

    await waitFor(() => {
      expect(deleteRace).toHaveBeenCalledWith('1', 'test-token');
    });
  });

  it('navigates to the race details when a race is clicked', async () => {
    const races = [{ id: '1', name: 'Race 1', distance: 'FIVE_K' }];
    getRaces.mockResolvedValue(races);

    const authContextValues = {
      token: 'test-token',
      user: { roles: [] },
      checkTokenExpiration: jest.fn(),
    };

    renderComponent(authContextValues);

    await waitFor(() => {
      expect(screen.getByText('Race 1')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Race 1'));

    expect(mockNavigate).toHaveBeenCalledWith('/races/1');
  });

  it('displays the Add New Race button for admin users', async () => {
    getRaces.mockResolvedValue([]);

    const authContextValues = {
      token: 'test-token',
      user: { roles: [ROLE_ADMINISTRATOR] },
      checkTokenExpiration: jest.fn(),
    };

    renderComponent(authContextValues);

    await waitFor(() => {
      expect(screen.getByText(/Add New Race/i)).toBeInTheDocument();
    });
  });

  it('does not display the Add New Race button for non-admin users', async () => {
    getRaces.mockResolvedValue([]);

    const authContextValues = {
      token: 'test-token',
      user: { roles: [] },
      checkTokenExpiration: jest.fn(),
    };

    renderComponent(authContextValues);

    await waitFor(() => {
      expect(screen.queryByText(/Add New Race/i)).not.toBeInTheDocument();
    });
  });
});
