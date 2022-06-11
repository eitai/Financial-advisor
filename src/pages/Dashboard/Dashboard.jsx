import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import style from './Dashboard.module.scss';

import Expenses from '../../components/Expenses/Expenses';

const Dashboard = () => {
  // const dispatch = useDispatch();
  const userName = useSelector((state) => state.user);

  return (
    <div>
      <Expenses />
    </div>
  );
};

export default Dashboard;
