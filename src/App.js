import style from './App.module.scss';
import SignIn from './components/sign-in/sign-in';
import Navbar from './components/navbar/Navbar';
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import Charts from './pages/Charts/Charts';
import LoginNavbar from './components/loginNavbar/LoginNavbar';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './store/userSlice';
import { auth, onAuthStateChanged } from './firebase';

import { Routes, Route } from 'react-router-dom';
function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        // user is logged in, send the user's details to redux, store the current user in the state
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoUrl: userAuth.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Navbar />}>
        <Route index element={<Home />} />
      </Route>
      <Route path='/loggedin' element={<LoginNavbar />}>
        <Route path='/loggedin/dashboard' element={<Dashboard />} />
        <Route path='/loggedin/charts' element={<Charts />} />
      </Route>
    </Routes>
  );
}

export default App;
