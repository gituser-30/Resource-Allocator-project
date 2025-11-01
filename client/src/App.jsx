// import React from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import Home from './pages/Home';
// import Contact from './pages/Contact';
// import Notes from './pages/Notes';
// import About from './pages/About';
// import Profile from './pages/Profile';
// import Register from './pages/Register';
// import Login from './pages/login';  // ✅ Capital;
// import Navbar from './components/Navbar';
// import PrivateRoute from './components/PrivateRoute'; // ✅ Import PrivateRoute


// import './App.css';



// function App() {
//   return (
//     <div>
//       <BrowserRouter>
        
//         <Navbar />
//         <Routes>
//           {/* Default → redirect to login */}
//           <Route path='/' element={<Navigate to="/login" />} />

//           {/* Auth pages */}
//           <Route path='/login' element={<Login />} />
//           <Route path='/register' element={<Register />} />

          
//           {/* Protected pages (after login) */}
//           <Route
//             path='/home'
//             element={
//               <PrivateRoute>
//                 <Home />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path='/notes'
//             element={
//               <PrivateRoute>
//                 <Notes />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path='/profile'
//             element={
//               <PrivateRoute>
//                 <Profile />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path='/contact'
//             element={
//               <PrivateRoute>
//                 <Contact />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path='/about-us'
//             element={
//               <PrivateRoute>
//                 <About />
//               </PrivateRoute>
//             }
//           />

            
//             <Route path="/notes/:department" element={<Notes />} />
          

//           {/* Email Verification
//           <Route path="/api/auth/verify/:token" element={<VerifyEmail />} /> */}
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Notes from './pages/Notes';
import About from './pages/About';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Login from './pages/login';  // ✅ Capital
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute'; // ✅ Import PrivateRoute
import './App.css';

// ✅ Component to conditionally show Navbar
const AppContent = () => {
  const location = useLocation();

  // Hide navbar on these routes
  const hideNavbarRoutes = ['/login', '/register'];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      
      <Routes>
        {/* Default → redirect to login */}
        <Route path='/' element={<Navigate to="/login" />} />

        {/* Auth pages */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        {/* Protected pages (after login) */}
        <Route
          path='/home'
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path='/notes'
          element={
            <PrivateRoute>
              <Notes />
            </PrivateRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path='/contact'
          element={
            <PrivateRoute>
              <Contact />
            </PrivateRoute>
          }
        />
        <Route
          path='/about-us'
          element={
            <PrivateRoute>
              <About />
            </PrivateRoute>
          }
        />



        <Route path="/notes/:department" element={<Notes />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;

