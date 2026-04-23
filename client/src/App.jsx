import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Notes from './pages/Notes';
import About from './pages/About';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Login from './pages/login';
import ForgotPassword from './pages/ForgotPassword';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppContent = () => {
  const location = useLocation();
  const hideNavbarRoutes = ['/login', '/register', '/forgot-password'];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="page-wrapper">
      <ScrollToTop />
      {!shouldHideNavbar && <Navbar />}

      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />

        <Route path='/home' element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path='/notes' element={<PrivateRoute><Notes /></PrivateRoute>} />
        <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path='/contact' element={<PrivateRoute><Contact /></PrivateRoute>} />
        <Route path='/about-us' element={<PrivateRoute><About /></PrivateRoute>} />
        <Route path="/notes/:department" element={<Notes />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}

export default App;
