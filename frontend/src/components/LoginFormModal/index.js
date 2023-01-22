import React, { useState, useSelector } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';



function LoginFormModal() {
  const dispatch = useDispatch();
  // const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  // if (sessionUser) return (
  //   <Redirect to="/" />
  // );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    dispatch(sessionActions.login({ credential, password }))
    // .then(closeModal())
    .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        } else {
         closeModal()

        }
      });

      // return setErrors(['User Data not found'])

  }

  return (
    <>
    <h1>Welcome to Santuary</h1>
    <form onSubmit={handleSubmit} className='login-spotform'>
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
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
      <button type="submit">Log In</button>
    </form>
        </>
  );
}

export default LoginFormModal;
