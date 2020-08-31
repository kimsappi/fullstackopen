import React, { useState } from 'react';
import { submitLogin } from '../services/login';

const Login = ({ setUser, notification, setNotification }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const eventHandler = (event, setState) => {
    setState(event.target.value);
  };

  const handleLogin = async event => {
    event.preventDefault();
    const res = await submitLogin(username, password);
    console.log(res);
    if (res && res.status === 200) {
      setUser(res.data);
      console.log(res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
      setNotification('loginSuccess');
    }
    else {
      setNotification('loginError');
      console.log(notification);
    }
  };

  return (
    <>
      <h2>Log in to the application</h2>
      <form onSubmit={event => handleLogin(event)}>
        <div>
          <label htmlFor='username'>username</label>
          <input type='text' name='username' value={username} onChange={event => eventHandler(event, setUsername)}></input>
        </div>
        <div>
          <label htmlFor='password'>password</label>
          <input type='password' name='password' value={password} onChange={event => eventHandler(event, setPassword)}></input>
        </div>
        <input type='submit' name='submit' value='login' />
      </form>
    </>
  );

};

export default Login;
