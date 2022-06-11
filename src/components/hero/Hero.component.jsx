import React, { useState } from 'react';
import style from './Hero.module.scss';
import SignIn from '../sign-in/sign-in';

const Hero = () => {
  return (
    <div className={style.hero}>
      <SignIn />
    </div>
  );
};

export default Hero;
