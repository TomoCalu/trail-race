import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Layout from '../components/Layout';

const Root = () => {
  return (
    <>
      <Navbar />
      <Layout>
        <Outlet />
      </Layout>
    </>
  );
};

export default Root;
