import { ContactSupportOutlined } from '@material-ui/icons';
import axios from 'axios';
import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { useNavigate } from 'react-router-dom';

const Facebook = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleFBLogin = (accessToken) => {
    const url = '/auth/facebook/token';
    fetch(url, {
      method: 'POST',
      // credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    }).then((result) => {
      // console.log(result);
      return result.json();
    }).then(function (data) {
      console.log('api response', data);
      const user = {
        email: data.user.email,
        firstName: data.user.first_name,
        lastName: data.user.last_name,
        token: `Bearer ${accessToken}`,
        id: data.user.id,
        profilePicUrl: data.user.profilePicUrl,
        facebookId: data.user.facebookId,
      };
      console.log('user1', user);
      setUser(user);
      //populate friend requests THIS IS NOT WORKING
      populateFriendRequests();
      console.log('user2', user);
      navigate('/');
    });
  };

  const componentClicked = () => console.log('clicked');

  const responseFacebook = response => {
    console.log('facebook response', response);
    handleFBLogin(response.accessToken);
  };

  const populateFriendRequests = async () => {
    try {
      await axios.post(`/users/friends/populate`);
    } catch (err) {
      console.log('error at popFriendReqs')
      console.log(err)
    }
  }

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
