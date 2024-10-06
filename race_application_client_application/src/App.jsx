import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import RaceForm from './pages/RaceForm';
import {AuthProvider} from './context/AuthContext';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';
import RacesList from './pages/RacesList';
import RaceDetails from './pages/RaceDetails';
import ApplicationForm from './pages/ApplicationForm';
import MyApplications from './pages/MyApplications';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Navbar/>
                <div className="container mx-auto p-4">

                    <Layout>
                        <Routes>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/" element={
                                <PrivateRoute>
                                    <RacesList/>
                                </PrivateRoute>
                            }/>
                            <Route path="/races/add" element={<PrivateRoute><RaceForm/></PrivateRoute>}/>
                            <Route path="/races/:id" element={<PrivateRoute><RaceDetails/></PrivateRoute>}/>
                            <Route path="/races/edit/:id" element={<PrivateRoute><RaceForm/></PrivateRoute>}/>
                            <Route path="/races/:raceId/applications/add"
                                   element={<PrivateRoute><ApplicationForm/></PrivateRoute>}/>
                            <Route path="/races/:raceId/applications/edit/:id"
                                   element={<PrivateRoute><ApplicationForm/></PrivateRoute>}/>
                            <Route path="/my-applications" element={<PrivateRoute><MyApplications/></PrivateRoute>}/>
                        </Routes>

                    </Layout>
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;