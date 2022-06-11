import React, { useState } from 'react';
import { AiFillBug } from 'react-icons/ai';
import style from './Navbar.module.scss';
import { Outlet } from 'react-router-dom';
import SignIn from '../sign-in/sign-in';

const Navbar = () => {
  const [openModel, setOpenModal] = useState(false);

  return (
    <>
      <div className={`${style.navbar}`}>
        <button className={`${style.btn}`} onClick={() => setOpenModal(true)}>
          הרשמה
        </button>
        <AiFillBug className={`${style.svg}`} />
      </div>
      {openModel && (
        <SignIn openModal={openModel} isSignupModal={true} noBtn={true} />
      )}
      <Outlet />
    </>
  );
};

export default Navbar;
