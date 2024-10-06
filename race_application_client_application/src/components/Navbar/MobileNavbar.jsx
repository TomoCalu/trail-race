import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MobileNavbar = ({ username, handleLogout, isApplicant }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <button className="btn btn-ghost lg:hidden" onClick={toggleMenu}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>

      {isMenuOpen && (
        <div className="absolute top-0 left-0 w-full h-screen bg-base-100 z-10 flex flex-col items-center justify-center space-y-8">
          <button className="absolute top-4 right-4 btn btn-ghost" onClick={toggleMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <ul className="menu p-0 flex flex-col items-center justify-center space-y-8">
            <li>
              <span className="text-xl font-semibold">{username}</span>
            </li>
            {isApplicant && (
              <li>
                <Link to="/my-applications" className="btn btn-ghost normal-case text-lg" onClick={toggleMenu}>
                  My Applications
                </Link>
              </li>
            )}
            <li>
              <button onClick={handleLogout} className="btn btn-error text-white">
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MobileNavbar;