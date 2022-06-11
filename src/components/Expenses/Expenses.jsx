import React from 'react';
import style from './expenses.module.scss';
import Expense from './expense/expense';
const Expenses = () => {
  return (
    <div className={style.container}>
      <Expense />
    </div>
  );
};

export default Expenses;
