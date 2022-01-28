import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Signup } from '../components/styles/Register.styled';

function Register({ user, setUser }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate()

  const handleSignUp = (e, firstName, lastName, email, password) => {
    e.preventDefault()
    axios
      .post("/auth/signup", { firstName, lastName, email, password })
      .then((result) => {
        console.log('result', result)
        const newUser = {
          email: result.data.user.email,
          firstName: result.data.user.firstName,
          lastName: result.data.user.lastName,
          token: result.data.token.token,
          id: result.data.user.id,
          picture: result.data.user.picture,
          about: '',
        };
        axios.defaults.headers.common["Authorization"] =
          result.data.token.token;
        setUser(newUser);
        setEmail('');
        setPassword('');
        setFirstName('');
        setPassword('');
        navigate('/');
      })
      .catch((err) => {
        console.log(err)
        if (err.response.data.errors) {
          setErrors(err.response.data.errors);
          setTimeout(() => {
            setErrors([]);
          }, 5000);
        } else if (err.response.data.message) {
          setErrors([...errors, { msg: err.response.data.message }]);
          setTimeout(() => {
            setErrors([]);
          }, 5000);
        }
      });
  }

  return (
    <Signup>
      <div className="signupWrapper">
        <div className="signupLeft">
          <h3 className="signupLogo">FakeBook</h3>
          <span className="signupDesc">
            Connect with friends and stuff...
          </span>
        </div>
        <div className="signupRight">
          <form className="signupBox" onClick={(e) => handleSignUp(e, firstName, lastName, email, password)}>
            <input placeholder="Email" type='email' className="signupInput" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input placeholder="Password" type='password' className="signupInput" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input placeholder="First Name" className="signupInput" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <input placeholder="Last Name" className="signupInput" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            {errors
              ? errors.map((error) => {
                return (
                  <span style={{ color: "red", display: "block", width: "100%" }}>
                    {error.msg}
                  </span>
                );
              })
              : null}
            <button className="button" >Sign Up</button>
          </form>
        </div>
      </div>
    </Signup>
  )
}

export default Register;
