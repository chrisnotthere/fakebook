import React from 'react';
import './navbar.css';
import { Person, } from '@material-ui/icons'
import { Link } from 'react-router-dom';
// import SettingsIcon from '@mui/icons-material/Settings';

function NavBar() {
  return (
    <div className='navBarContainer'>

      <div className="navBarLeft">
        <Link to='/' style={{textDecoration:'none'}}>
          <span className="logo">FakeBook</span>
        </Link>
      </div>

      <div className="navBarRight">

        <div className="navBarLinks">
          <span className="navBarLink">Homepage</span>
          <span className="navBarLink">Timeline</span>
        </div>

        <div className="navBarIcons">
          <div className="navBarIconItem">
            <Person />
            <span className="navBarIconBadge">1</span>
          </div>

          <img className="navBarProfilePicture" src="/assets/person/1.png" alt="" />

        </div>
      </div>

    </div>
  )
}

export default NavBar;