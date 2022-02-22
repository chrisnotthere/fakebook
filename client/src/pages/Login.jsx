import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
// import axios from 'axios';
import axios from '../utils/axios'
import Facebook from '../components/auth/Facebook';
import { LoginContainer } from '../components/styles/Login.styled';

function Login({ user, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate()

  const handleLogin = (e, email, password) => {
    e.preventDefault();
    axios
      .post("/auth/login", { email, password })
      .then((result) => {
        const user = {
          email: result.data.user.email,
          firstName: result.data.user.firstName,
          lastName: result.data.user.lastName,
          token: result.data.token.token,
          id: result.data.user.id,
          picture: result.data.user.picture,
          coverPicture: result.data.user.coverPicture,
          about: result.data.user.about
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
          }, 5000);
        } else if (err.response.data.message) {
          setErrors([...errors, { msg: err.response.data.message }]);
          setTimeout(() => {
            setErrors([]);
          }, 5000);
        }
      });
  }

  const handleGuestLogin = (e) => {
    e.preventDefault();
    const email = process.env.REACT_APP_GUEST_EMAIL;
    const password = process.env.REACT_APP_GUEST_PASSWORD;
    handleLogin(e, email, password);
  }

  return (
    <LoginContainer>
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
            
            {errors
              ? errors.map((error) => {
                return (
                  <span style={{ color: "red", display: "block", width: "100%" }}>
                    {error.msg}
                  </span>
                );
              })
              : null}
              
            <button className="button" >Log In</button>
            <button className="button register" onClick={(e) => navigate('/register')} >Create Account</button>
            <button className="button" onClick={(e) => handleGuestLogin(e)}>Login as Guest</button>
            <Facebook setUser={setUser} />
          </form>
        </div>

      </div>
    </LoginContainer>
  )
}

export default Login;
