import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';

function Dummy() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState('john.smith@gmail.com');
  const [password, setPassword] = useState('secret password');
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    dispatch(sessionActions.login({ credential, password }))
    // .then((res) => setUser(res))
    .then(closeModal())
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }
  return (
    <>
    <h1>Try this profile</h1>
    <form onSubmit={handleSubmit} className='login-spotform'>
      <label className='input-box'>
        <input
        className='input-fields'
        type="text"
        value={credential}
        placeholder='Username or Email'
        onChange={(e) => setCredential(e.target.value)}
        required
          />
      </label>
      <label className='input-box'>
        <input
        className='input-fields'
        type="password"
        value={password}
        placeholder='Password'
        onChange={(e) => setPassword(e.target.value)}
        required
        />
      </label>
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
      <button type="submit">Log In</button>
    </form>
        </>
  );
}

export default Dummy;
