import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';



function LoginFormModal() {
  const dispatch = useDispatch();

  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sessionActions.login(credential, password))
    .then(async (res) => {
      closeModal()
    })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);

      });


  }

  return (
    <>
    <div className='login-modal'>

    <form onSubmit={handleSubmit} className='login-spotform'>
    <h1>Welcome to Santuary</h1>
      <label className="input-box">
        <input
        className='input-fields'
        type="text"
        value={credential}
        placeholder="Username or Email"
        onChange={(e) => setCredential(e.target.value)}
        required
        />
      </label>
      <label className="input-box">
        <input
        className='input-fields'
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        required
        />
      </label>
      <br></br>
      <button type="submit">Log In</button>
    </form>
      <button id='form-button' className="submit-button" onClick={() => dispatch(sessionActions.login("john.smith@gmail.com", "secret password")).then(() => closeModal())}>Demo User</button>
      <br></br>
        <div className='error-lists'>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </div>
        </div>
        </>
  );
}

export default LoginFormModal;
