import React from 'react';
import style from './expense.module.scss';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import { MdSave, MdAddCircle } from 'react-icons/md';
import { IoTrashSharp } from 'react-icons/io5';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const Expense = () => {
  return (
    <div className={style.container}>
      <div className={style.date_container}>
        <span className={style.date_text}>תאריך</span>
        <span className={style.date}> אוק' 12 2022</span>
      </div>
      <form action=''>
        <div className={`${style.input_container} login-form-wrapper`}>
          <FormControl variant='standard'>
            <InputLabel htmlFor='standard-adornment-amount'>סכום</InputLabel>
            <Input
              id='standard-adornment-amount'
              endAdornment={
                <InputAdornment sx={{ fontSize: '4px' }} position='start'>
                  ש"ח
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl variant='standard' sx={{ mt: 2.5, minWidth: 220 }}>
            <InputLabel
              id='demo-simple-select-standard-label'
              // sx={{ mt: -2.5 }}
            >
              סוג הוצאה
            </InputLabel>
            <Select
              labelId='demo-simple-select-standard-label'
              id='demo-simple-select-standard'
              label='סוג הוצאה'
            >
              <MenuItem value={`הכנסה`}>הכנסה</MenuItem>
              <MenuItem value={`הוצאה`}>הוצאה</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant='standard'>
            <InputLabel htmlFor='standard-adornment-amount'>
              שם ההוצאה
            </InputLabel>
            <Input id='standard-adornment-amount' />
          </FormControl>
        </div>
      </form>

      <div className={style.btn_container}>
        <button className={`${style.btn} ${style.btn_save}`}>
          <MdSave />
        </button>
        <button className={`${style.btn} ${style.btn_add}`}>
          <MdAddCircle />
        </button>
        <button className={`${style.btn} ${style.btn_trash}`}>
          <IoTrashSharp />
        </button>
      </div>
    </div>
  );
};

export default Expense;
