import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
    const history = useHistory();
  
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (password !== confirmPassword) {
          setErrors({
            confirmPassword: "Confirm Password field must be the same as the Password field",
          });
          return;
        }
    
        setErrors({});
    
        try {
          await dispatch(
            sessionActions.signup({
              email,
              username,
              firstName,
              lastName,
              password,
            })
          );
    
          closeModal();
        } catch (res) {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        }
      };
    
      const isDisabled =
        username.length <= 4 ||
        password.length <= 6 ||
        !email ||
        !firstName ||
        !lastName ||
        !confirmPassword;
    
      return (
        <div className="loggin">
          <form onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            {errors.email && <div className="errors">{errors.email}</div>}
            <label>
              Username
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
            {errors.username && <div className="errors">{errors.username}</div>}
            <label>
              First Name
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </label>
            {errors.firstName && <div className="errors">{errors.firstName}</div>}
            <label>
              Last Name
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </label>
            {errors.lastName && <div className="errors">{errors.lastName}</div>}
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            {errors.password && <div className="errors">{errors.password}</div>}
            <label>
              Confirm Password
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>
            {errors.confirmPassword && (
              <div className="errors">{errors.confirmPassword}</div>
            )}
            <div className="signup-button">
              <button type="submit" disabled={isDisabled}>
                Sign Up
              </button>
            </div>
          </form>
        </div>
      );
    }

export default SignupFormModal;
