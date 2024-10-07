import { createBrowserRouter } from 'react-router-dom';
import Root from './Root';
import Login from '../pages/Login';
import RacesList from '../pages/RacesList';
import RaceForm from '../pages/RaceForm';
import RaceDetails from '../pages/RaceDetails';
import ApplicationForm from '../pages/ApplicationForm';
import MyApplications from '../pages/MyApplications';
import PrivateRoute from '../components/PrivateRoute';
import ErrorPage from '../pages/ErrorPage';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: '/',
        element: (
          <PrivateRoute>
            <RacesList />
          </PrivateRoute>
        ),
      },
      {
        path: 'races/add',
        element: (
          <PrivateRoute>
            <RaceForm />
          </PrivateRoute>
        ),
      },
      {
        path: 'races/:id',
        element: (
          <PrivateRoute>
            <RaceDetails />
          </PrivateRoute>
        ),
      },
      {
        path: 'races/edit/:id',
        element: (
          <PrivateRoute>
            <RaceForm />
          </PrivateRoute>
        ),
      },
      {
        path: 'races/:raceId/applications/add',
        element: (
          <PrivateRoute>
            <ApplicationForm />
          </PrivateRoute>
        ),
      },
      {
        path: 'races/:raceId/applications/edit/:id',
        element: (
          <PrivateRoute>
            <ApplicationForm />
          </PrivateRoute>
        ),
      },
      {
        path: 'my-applications',
        element: (
          <PrivateRoute>
            <MyApplications />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default Router;
