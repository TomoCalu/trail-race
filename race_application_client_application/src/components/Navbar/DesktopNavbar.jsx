import React from 'react';
import { Link } from 'react-router-dom';

const DesktopNavbar = ({ username, handleLogout, isApplicant }) => {
  return (
    <div className="flex items-center space-x-4">
      <span className="text-xl font-semibold">{username}</span>
      {isApplicant && (
        <Link to="/my-applications" className="btn btn-ghost normal-case text-lg">
          My Applications
        </Link>
      )}
      <button onClick={handleLogout} className="btn btn-error text-white">
        Logout
      </button>
    </div>
  );
};

export default DesktopNavbar;