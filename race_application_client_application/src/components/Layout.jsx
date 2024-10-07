import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
