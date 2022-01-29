import React from 'react';
import { Link } from 'react-router-dom';
import { NavBarContainer } from './styles/NavBar.styled';

function NavBar({ user }) {

  console.log(user)
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
          <span className="navBarLink">Logout</span>
        </div>

        <div className="navBarIcons">
          <Link to={`/${user.id}`} style={{ textDecoration: 'none', color: 'inherit' }} >
            <img className="navBarProfilePicture" src={user.picture || 'https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png'} alt="" />
          </Link>
        </div>
      </div>

    </NavBarContainer>
  )
}

export default NavBar;
