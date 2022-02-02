import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axios'

const Facebook = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleFBLogin = (accessToken) => {
    // const url = '/auth/facebook/token';
    // fetch(url, {
    //   method: 'POST',
    //   mode: 'cors',
    //   // credentials: 'include',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${accessToken}`
    //   }
    // }).then((result) => {
    //   return result.json();
    // }).then(function (data) {
    //   console.log('api response', data);
    //   const user = {
    //     email: data.user.email,
    //     firstName: data.user.firstName,
    //     lastName: data.user.lastName,
    //     token: `Bearer ${accessToken}`,
    //     id: data.user.id,
    //     picture: data.user.picture,
    //     facebookId: data.user.facebookId,
    //   };
    //   setUser(user);
    //   navigate('/');
    // });

    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    axios.post("/auth/facebook/token").then((result) => {
      const user = {
        email: result.data.user.email,
        firstName: result.data.user.firstName,
        lastName: result.data.user.lastName,
        token: `Bearer ${accessToken}`,
        id: result.data.user.id,
        picture: result.data.user.picture,
        facebookId: result.data.user.facebookId,
      };
      setUser(user);
      navigate('/');
    });
  };

  const componentClicked = () => console.log('clicked');

  const responseFacebook = response => {
    console.log('facebook response', response);
    handleFBLogin(response.accessToken);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <FacebookLogin
        appId='663629001739255'
        // autoLoad={true}
        fields='name,email,picture'
        onClick={componentClicked}
        callback={responseFacebook}
        icon='fa-facebook'
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            variant='contained'
            color='secondary'
          >
            Log in with Facebook
          </button>
        )}
      />
    </div>
  );
};

export default Facebook;
