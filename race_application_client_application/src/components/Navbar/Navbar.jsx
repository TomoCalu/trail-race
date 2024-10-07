import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';
import { ROLE_APPLICANT } from '../../constants/roles';

const Navbar = () => {
  const { token, removeToken, user } = useContext(AuthContext);
  const isApplicant = user?.roles.includes(ROLE_APPLICANT);

  const handleLogout = () => {
    removeToken();
  };

  return (
    <nav className="navbar bg-base-100 shadow-lg p-4">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          Race Application
        </Link>
      </div>

      {token && user && (
        <>
          <MobileNavbar
            username={user.username}
            handleLogout={handleLogout}
            isApplicant={isApplicant}
          />

          <div className="hidden lg:flex">
            <DesktopNavbar
              username={user.username}
              handleLogout={handleLogout}
              isApplicant={isApplicant}
            />
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
