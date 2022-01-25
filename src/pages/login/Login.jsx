import React, { useState } from 'react';
import './login.css'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Login({ user, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate()

  const handleLogin = (e, email, password) => {
    e.preventDefault();
    console.log('clicked');
    console.log(email, password);

    axios
    .post("/auth/login", { email, password })
    .then((result) => {
      console.log('-----___-----' + result.data)
      const user = {
        email: result.data.user.email,
        firstName: result.data.user.firstName,
        lastName: result.data.user.lastName,
        token: result.data.token.token,
        id: result.data.user.id,
        picture: result.data.user.picture,
      };
      axios.defaults.headers.common["Authorization"] =
        result.data.token.token;
      setUser(user);
      setEmail("");
      setPassword("");
      navigate("/");
    })
    .catch((err) => {
      if (err.response.data.errors) {
        setErrors(err.response.data.errors);
        setTimeout(() => {
          setErrors([]);
        }, 3000);
      } else if (err.response.data.message) {
        setErrors([...errors, { msg: err.response.data.message }]);
        setTimeout(() => {
          setErrors([]);
        }, 3000);
      }
    });
  }

  return (
    <div className='login'>
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">FakeBook</h3>
          <span className="loginDesc">
            Connect with friends and stuff...
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={(e) => handleLogin(e, email, password)} >
            <input placeholder="Email" className="loginInput" type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input placeholder="Password" className="loginInput" type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="loginButton" >Log In</button>
            <span className="loginForgot">Forgot Password?</span>
            <Link to={'/register'} style={{ textDecoration: 'none', color: 'inherit'}} >
              <button className="loginRegisterButton">Sign Up</button>
            </Link>
            {/* <button className="loginButton">Login with FaceBook</button> */}
          </form>
        </div>
      </div>

    </div>
  )
}

export default Login;
