import React, { useState } from 'react';
import InputField from '../components/InputField';
import '../styles/login.css';
import { AiOutlineLock, AiOutlineMail } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { assignUser } from '../reducers/userReducer';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const nav = useNavigate();
  const loginHandler = () => {
    if (username && password) {
      dispatch(
        assignUser({
          username: username,
          token: null,
          isLoggedIn: true,
          role: null,
        })
      );
      nav('/');
    }
  };

  return (
    <div className='login-box'>
      <div className='login-form'>
        <p className='title'>Sign In</p>
        <InputField
          name='email'
          placeholder='Email address'
          prefix={<AiOutlineMail size={18} />}
          onChange={(event) => setUsername(event.target.value)}
        />
        <InputField
          name='password'
          placeholder='Password'
          prefix={<AiOutlineLock size={18} />}
          type='password'
          onChange={(event) => setPassword(event.target.value)}
        />
        <div className='spacer'></div>
        <button className='btn-primary' onClick={loginHandler}>
          Sign In
        </button>
      </div>
    </div>
  );
}

export default Login;
