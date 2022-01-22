import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { useNavigate } from 'react-router-dom';

const Facebook = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleFBLogin = (accessToken) => {
    const url = "/auth/facebook/token";
    fetch(url, {
      method: 'POST',
      // credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${accessToken}`
      }
    }).then((result) => {
      // console.log(result);
      return result.json();
    }).then(function (data) {
      console.log('api response', data);
      const user = {
        email: data.user.email,
        first_name: data.user.first_name,
        last_name: data.user.last_name,
        token: `Bearer ${accessToken}`,
        id: data.user.id,
        profilePicUrl: data.user.profilePicUrl,
        facebookId: data.user.facebookId,
      };
      // console.log(user);
    });
  };

  const componentClicked = () => console.log('clicked');

  const responseFacebook = response => {
    console.log( 'facebook response', response);
    handleFBLogin(response.accessToken);
  };

  return (
    <div style={{ width: "100%", margin: "0 8px 8px 8px" }}>
      <FacebookLogin
        appId="663629001739255"
        // autoLoad={true}
        fields="name,email,picture"
        onClick={componentClicked}
        callback={responseFacebook}
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            variant="contained"
            color="secondary"
            style={{ width: "100%" }}
          >
            Log in with Facebook
          </button>
        )}
      />
    </div>
  );
};

export default Facebook;
