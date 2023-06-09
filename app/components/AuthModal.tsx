'use client';

import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AuthModalInputs from './AuthModalInputs';
import useAuth from '../hooks/useAuth';
import { useContext } from 'react';
import { AuthenticationContext } from '../context/AuthContext';
import { Alert, CircularProgress } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AuthModal({ isSignIn }: { isSignIn: boolean }) {
  const { data, error, loading, setAuthState } = useContext(
    AuthenticationContext
  );
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { signIn, signUp } = useAuth();

  const renderContent = (signInContent: String, signUpContent: String) => {
    return isSignIn ? signInContent : signUpContent;
  };

  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    password: '',
  });

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (isSignIn) {
      if (inputs.email || inputs.password) {
        return setDisabled(false);
      }
    } else {
      if (
        inputs.email &&
        inputs.password &&
        inputs.city &&
        inputs.phone &&
        inputs.firstName &&
        inputs.lastName
      ) {
        setDisabled(false);
      }
    }
    setDisabled(true);
  }, [inputs]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  const handleClick = () => {
    if (isSignIn) {
      signIn({ email: inputs.email, password: inputs.password },handleClose);
    }else{
      signUp(inputs,handleClose);
    }
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        className={`${renderContent(
          'bg-blue-400 text-white',
          ''
        )} p-1 px-4 rounded mr-3`}
      >
        {renderContent('Sign in', 'Sign up')}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          {loading ? (
            <div className='py-24 px-2 h-[500px] flex justify-center'>
              <CircularProgress />
            </div>
          ) : (
            <div className='pd-2 h-[600px]'>
              {error ? (
                <Alert severity='error' className='mb-4'>
                  {error}
                </Alert>
              ) : null}
              <div className='uppercase font-bold text-center pb-2 border-b mb-2'>
                <p className='text-sm'>
                  {renderContent('Sign In', 'Create Account')}
                </p>
              </div>
              <div className='m-auto'>
                <h2 className='text-2xl font-light text-center'>
                  {renderContent(
                    'Log Into Your Account',
                    'Create Your OpenTable Account'
                  )}
                </h2>
                <AuthModalInputs
                  inputs={inputs}
                  handleChangeInput={handleChangeInput}
                  isSignIn={isSignIn}
                />
                <button
                  className='uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400'
                  disabled={disabled}
                  onClick={handleClick}
                >
                  {renderContent('Sign In', 'Create Account')}
                </button>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
