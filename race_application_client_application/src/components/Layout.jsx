import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full">{children}</div>
    </div>
  );
};

export default Layout;
