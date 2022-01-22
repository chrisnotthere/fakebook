import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { useNavigate } from 'react-router-dom';

const TestUser = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleTestUserLogin = (accessToken) => {
    const url = "/auth/testUser";
    fetch(url, {
      method: 'POST',
      // credentials: 'include',
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify({ email: "email@email.com", password: "blahblah123"} ),
    }).then((result) => {
      console.log(result);
      return result.json();
    }).then(function(data) {
      console.log(data);  
    });
  };

  return (
    <div style={{ width: "50%", margin: "1rem auto " }}>
      <button
        onClick={handleTestUserLogin}
        variant="contained"
        color="secondary"
        style={{ width: "100%" }}
      // startIcon={<FacebookIcon />}
      >
        Log in as Test User
      </button>
    </div>
  );
};

export default TestUser;
