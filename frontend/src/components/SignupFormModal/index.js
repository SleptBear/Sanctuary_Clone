import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
// import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  // const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  // if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
      .then(closeModal())
      .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <>
    <h1>Welcome to Sanctuary</h1>
    <form onSubmit={handleSubmit} className='signup-spotform'>
      <label className='input-box'>
        <input
          className='input-fields'
          type="text"
          value={email}
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
          required
          />
      </label>
      <label className='input-box'>
        <input
          className='input-fields'
          type="text"
          value={username}
          placeholder='Username'
          onChange={(e) => setUsername(e.target.value)}
          required
          />
      </label>
      <label className='input-box'>

        <input
          className='input-fields'
          type="text"
          value={firstName}
          placeholder='First Name'
          onChange={(e) => setFirstName(e.target.value)}
          required
          />
      </label>
      <label className='input-box'>

        <input
          className='input-fields'
          type="text"
          value={lastName}
          placeholder='Last Name'
          onChange={(e) => setLastName(e.target.value)}
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
      <label className='input-box'>

        <input
          className='input-fields'
          type="password"
          value={confirmPassword}
          placeholder='Confirm Password'
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          />
      </label>
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
      <button type="submit">Sign Up</button>
    </form>
    </>
  );
}

export default SignupFormModal;
