import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Style from './sign-in.module.scss';

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import { useSpring, animated } from 'react-spring';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';

import {
  setActiveUser,
  setUserLogOutState,
  selectUserEmail,
  selectUserName,
  login,
} from '../../store/userSlice';

import {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  googleProvider,
  createUserDocumentFromAuth,
  setLastLogin,
} from '../../firebase';

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 0,
};

const SignIn = ({ openModal, isSignupModal, noBtn }) => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  const userEmail = useSelector(selectUserEmail);

  let navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    setIsSignUp(false);
  };
  const handleClose = () => setOpen(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [lastName, setLastName] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    if (openModal) {
      setOpen(openModal);
    }
  }, [openModal]);

  useEffect(() => {
    setIsSignUp(isSignupModal);
  }, [isSignupModal]);

  const loginToApp = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
          })
        );
        setLastLogin(userAuth.user);
        setOpen(false);
        setTimeout(() => {
          navigate('loggedin/dashboard', { replace: true });
        }, 1000);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const register = () => {
    if (!name) {
      return alert('בבקשה להכניס שם מלא');
    }
    if (password !== passwordCheck) {
      return alert('אימות סיסמא לא נכון');
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
        createUserDocumentFromAuth(userAuth.user);
        setLastLogin(userAuth.user);

        updateProfile(userAuth.user, {
          displayName: lastName,
        })
          .then(() => {
            dispatch(
              login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: name + ' ' + lastName,
              })
            );

            setOpen(false);
            setTimeout(() => {
              navigate('loggedin/dashboard', { replace: true });
            }, 1000);
          })
          .catch((error) => {
            console.log('user not updated');
          });
      })
      .catch((err) => {
        alert(err);
      });
  };
  const handleSignInWithGoogle = () => {
    auth.signInWithPopup(googleProvider).then((result) => {
      createUserDocumentFromAuth(result.user);
      setLastLogin(result.user);
      dispatch(
        setActiveUser({
          email: result.user.email,
          uid: result.user.uid,
          displayName: result.user.displayName,
        })
      );
      setOpen(false);
      setTimeout(() => {
        navigate('loggedin/dashboard', { replace: true });
      }, 1000);
    });
  };

  const SignUpBtn = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 25,
    padding: '10px 20px',
    borderRadius: '10px',
    lineHeight: 1.5,
    backgroundColor: '#e45858',

    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      boxShadow: '0 0 0 0.2rem rgba(#333,0.5)',
      backgroundColor: '#e45858',
    },
    '&:focus': {},
  });

  return (
    <div>
      <div>
        {!open && !noBtn && (
          <SignUpBtn onClick={handleOpen} size='large' variant='contained'>
            כניסה
          </SignUpBtn>
        )}
        <Modal
          aria-labelledby='spring-modal-title'
          aria-describedby='spring-modal-description'
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <div className={Style.btn_container}>
                <button
                  className={`${Style.btn_connect} ${!isSignUp && 'activebtn'}`}
                  onClick={() => setIsSignUp(false)}
                >
                  התחבר
                </button>
                <button
                  className={`${Style.btn_signup} ${isSignUp && 'activebtn'}`}
                  onClick={() => setIsSignUp(true)}
                >
                  הרשם
                </button>
              </div>
              <div>
                <h2 className={Style.title}>ברוכים הבאים</h2>
              </div>
              {isSignUp ? (
                <div>
                  <div className={Style.container}>
                    <div className={`input-width`}>
                      <div className={Style.input_container_signup}>
                        <TextField
                          id='demo-helper-text-misaligned'
                          label='שם פרטי'
                          margin='normal'
                          onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                          id='demo-helper-text-misaligned'
                          label='שם משפחה'
                          margin='normal'
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                      <TextField
                        id='demo-helper-text-misaligned'
                        label='אימייל'
                        margin='normal'
                        fullWidth
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <TextField
                        id='demo-helper-text-misaligned'
                        label='סיסמא'
                        margin='normal'
                        fullWidth
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <TextField
                        id='demo-helper-text-misaligned'
                        label='אימות סיסמא'
                        margin='normal'
                        fullWidth
                        onChange={(e) => setPasswordCheck(e.target.value)}
                      />
                    </div>
                    <button className={Style.signup_confirm} onClick={register}>
                      הרשם
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className={Style.container}>
                    <div className={`input-width`}>
                      <TextField
                        id='demo-helper-text-misaligned'
                        label='אימייל'
                        margin='normal'
                        fullWidth
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className={`input-width ${Style.input_container}`}>
                      <TextField
                        id='demo-helper-text-misaligned-no-helper'
                        label='סיסמא'
                        margin='normal'
                        fullWidth
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <button className={Style.btn_signin} onClick={loginToApp}>
                      התחבר
                    </button>
                    <button className={Style.btn_forgot_password}>
                      שחזור סיסמא
                    </button>
                    <div>
                      <button
                        className={Style.btn_signin_google}
                        onClick={handleSignInWithGoogle}
                      >
                        התחבר עם גוגל
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </Box>
          </Fade>
        </Modal>
      </div>
    </div>
  );
};

export default SignIn;
