import React, { useEffect } from 'react';
import Home from './pages/Home/Home';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Login from './pages/Login/Login';
import Player from './pages/Player/Player';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from './firebase';
import { ToastContainer } from 'react-toastify';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // useEffect(() => {
  //   onAuthStateChanged(auth, async (user) => {
  //     if (user) {
  //   navigate('/home'); // Redirect to home if the user is authenticated
  //     } else {
  //       console.log('Logged Out');
  //       navigate('/login'); // Redirect to login if the user is not authenticated
  //     }
  //   });
  // }, [navigate, location.pathname]);

  return (
    <>
      <ToastContainer theme="dark" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/player/:id" element={<Player />} />
      </Routes>
    </>
  );
};

export default App;
