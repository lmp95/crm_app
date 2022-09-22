import React, { useState } from 'react';
import InputField from '../components/InputField';
import { AiOutlineLock, AiOutlineMail } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { assignUser } from '../reducers/userReducer';
import { useNavigate } from 'react-router-dom';
import { setCookie } from '../utils/cookie';
import { loginInterface } from '../interface/login.interface';
import ToastBox from '../components/ToastBox';

function Login() {
  const initLoginState: loginInterface = {
    email: null,
    password: null,
  };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [formError, setFormError] = useState(initLoginState);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const loginHandler = async () => {
    setLoading(true);
    setFormError(initLoginState);
    if (email.length > 0 && password.length > 0) {
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_API_PORT}/v1/user/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email, password: password }),
        }
      )
        .then((response) => {
          if (!response.ok) {
            setError(true);
            throw new Error('Invalid');
          } else return response.json();
        })
        .then((result) => {
          dispatch(
            assignUser({
              email: result.email,
              token: result.token,
              role: result.role,
            })
          );
          localStorage.setItem('email', email);
          localStorage.setItem('role', result.role);
          setCookie('token', result.token);
          nav('/');
        })
        .catch(() => {
          setError(true);
          setTimeout(() => {
            setError(false);
          }, 1000);
        });
    } else {
      email.length <= 0 &&
        setFormError((formError) => ({ ...formError, email: 'error' }));
      password.length <= 0 &&
        setFormError((formError) => ({ ...formError, password: 'error' }));
    }
    setLoading(false);
  };

  return (
    <div className='login-box'>
      <div className='login-form'>
        <p className='title'>Sign In</p>
        <InputField
          name='email'
          placeholder='Email address'
          prefix={<AiOutlineMail size={18} />}
          onChange={(event) => setEmail(event.target.value)}
        />
        {formError?.email && (
          <p className='error-text'>Please fill out this field.</p>
        )}
        <InputField
          name='password'
          placeholder='Password'
          prefix={<AiOutlineLock size={18} />}
          type='password'
          onChange={(event) => setPassword(event.target.value)}
        />
        {formError?.password && (
          <p className='error-text'>Please fill out this field.</p>
        )}
        <div className='spacer'></div>
        <button
          className='btn-primary'
          onClick={loginHandler}
          disabled={loading}
        >
          Sign In
        </button>
        {error && <ToastBox message='Invalid email or password.' />}
      </div>
    </div>
  );
}

export default Login;
