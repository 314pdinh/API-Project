// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

//test

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };


  const isDisabled = credential.length < 4 || password.length < 6;

  const demoUser = async () => {
    await dispatch(sessionActions.login({
      credential: 'TheRock',
      password: 'password1',
    }));
    closeModal();
  };

  return (
    <div className='login-box'>
      <form onSubmit={handleSubmit}>
        <h1>Log In</h1>
        <label>
          Username or email
          <input
            type="text"
            value={credential}
            // placeholder="Username or email"
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            // placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && (
          <div className="errors">{errors.credential}</div>
        )}
        <div className='submit-login'>
          <button type="submit" disabled={isDisabled}>Log In</button>
        </div>
      </form>
      <div className="Demo-login">
        <button type='submit' onClick={demoUser}>Demo User</button>
      </div>
    </div>
  );
}

export default LoginFormModal;