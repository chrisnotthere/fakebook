import React from 'react';
import './register.css'

function Register() {
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
          <div className="loginBox">
            <input placeholder="First Name" className="loginInput" />
            <input placeholder="Last Name" className="loginInput" />
            <input placeholder="Email" className="loginInput" />
            <input placeholder="Password" className="loginInput" />
            <button className="loginButton">Sign Up</button>
            {/* <button className="loginRegisterButton">Log into your Account</button> */}
            {/* <button className="loginButton">Login with FaceBook</button> */}
          </div>
        </div>
      </div>

    </div>
  )
}

export default Register;
