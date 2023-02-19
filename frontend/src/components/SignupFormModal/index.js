import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";

function SignupFormModal() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  //TODO go back and add custom validators to throw custom message as error in backend
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
      .then(async (res) => {
        closeModal()
      })
      .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    } else {
      setErrors(['Passwords must match']);
    }
  };

  return (
    <>
    <h1>Make an Account</h1>
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
      <button type="submit">Sign Up</button>
      <br></br>
          <div className="error-lists">
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </div>
    </form>
    </>
  );
}

export default SignupFormModal;
