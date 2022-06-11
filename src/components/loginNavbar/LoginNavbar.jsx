import React from 'react';
import style from './LoginNavbar.module.scss';
import { Outlet, Link } from 'react-router-dom';

import { BsFillFilePersonFill, BsCalendar2Event } from 'react-icons/bs';
import { AiFillPieChart, AiFillBug } from 'react-icons/ai';
import Dashboard from '../../pages/Dashboard/Dashboard';

import { auth } from '../../firebase';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { logout } from '../../store/userSlice';

const LoginNavbar = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleDisconnect = (e) => {
    auth
      .signOut()
      .then(() => {
        dispatch(logout());
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 1000);
      })
      .catch((err) => alert(err.message));
  };
  return (
    <>
      <div className={style.container}>
        <nav className={style.navigation}>
          <div className={style.iconsBox}>
            <button className={style.btn_disconnect} onClick={handleDisconnect}>
              התנתק
            </button>
            <Link to={'/loggedin/expenses'}>
              <BsFillFilePersonFill className={style.icon} />
            </Link>
            <Link to={'/loggedin/charts'}>
              <AiFillPieChart className={style.icon} />
            </Link>
            <BsCalendar2Event className={style.icon} />
          </div>
          <AiFillBug className={style.icon} />
        </nav>
      </div>
      <Outlet />
    </>
  );
};

export default LoginNavbar;
