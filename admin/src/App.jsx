import React from 'react'
import { HashRouter, Route,Routes } from "react-router-dom";
import AdminLogin from './Admin2/adminlogin';
import AdminDashboard from './Admin2/Admindashboard';

const App = () => {
  return (
    <>
      <HashRouter>


        <Routes>
          <Route path='/' element={<AdminLogin/>}/>
          <Route path='/admin2/Admindashboard' element={<AdminDashboard/>}/>
        </Routes>
      </HashRouter>
    </>
  )
}

export default App