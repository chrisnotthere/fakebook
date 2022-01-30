import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NavBarContainer } from './styles/NavBar.styled';

function NavBar({ user, setUser }) {
  const navigate = useNavigate();
  const [profileUser, setProfileUser] = useState([]);

  useEffect(() => {
    const getProfileUser = async () => {
      try {
        const profileUser = await axios.get(`/users/${user.id}/`, { headers: { "Authorization": user.token } });
        setProfileUser(profileUser.data.user);
      } catch (err) {
        console.log(err);
      }
    }
    getProfileUser();
  }, [])

  const handleLogOut = () => {
    setUser('');
    navigate('/login');
  }

  return (
    <NavBarContainer>
      <div className="navBarLeft">
        <Link to='/' style={{ textDecoration: 'none' }}>
          <span className="logo">FakeBook</span>
        </Link>
      </div>

      <div className="navBarRight">
        <div className="navBarLinks">
          <span className="navBarLink">Settings</span>
          <span className="navBarLink" onClick={() => handleLogOut()}>Logout</span>
        </div>

        <div className="navBarIcons">
          <Link to={`/${user.id}`} style={{ textDecoration: 'none', color: 'inherit' }} >
            <img className="navBarProfilePicture" src={profileUser.picture || 'https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png'} alt="" />
          </Link>
        </div>
      </div>
    </NavBarContainer>
  )
}

export default NavBar;
