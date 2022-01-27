import "./usernav.css";
import { RssFeed, People, GroupAdd, ExitToApp, SearchRounded, AccountCircle } from '@material-ui/icons'
import { Link, Navigate, useNavigate } from "react-router-dom";

function UserNav({ user, setUser }) {
  // console.log(user)
  const navigate = useNavigate();


  const handleLogOut = () => {
    console.log('LOG OUT THE USER');
    setUser('');
    navigate('/login');
  }

  return (
    <div className="userNav">
      <div className="userNavWrapper">
        <ul className="userNavList">
          <Link to={'/'} style={{ textDecoration: 'none', color: 'inherit' }} >
            <li className="userNavListItem">
              <RssFeed className="userNavIcon" />
              <span className="userNavListItemText">Feed</span>
            </li>
          </Link>
          <Link to={`/${user?.id}`} style={{ textDecoration: 'none', color: 'inherit' }} >
          <li className="userNavListItem">
              <AccountCircle className="userNavIcon" />
              <span className="userNavListItemText">Profile</span>
            </li>
          </Link>
          <Link to={'/myFriends'} style={{ textDecoration: 'none', color: 'inherit' }} >
            <li className="userNavListItem">
              <People className="userNavIcon" />
              <span className="userNavListItemText">Friends</span>
            </li>
          </Link>
          <Link to={'/findFriends'} style={{ textDecoration: 'none', color: 'inherit' }} >
            <li className="userNavListItem">
              <SearchRounded className="userNavIcon" />
              <span className="userNavListItemText">Find Friends</span>
            </li>
          </Link>
          <li className="userNavListItem" onClick={() => handleLogOut()}>
              <ExitToApp className="userNavIcon" />
              <span className="userNavListItemText">Logout</span>
            </li>
        </ul>
        <hr className="userNavHr" />
      </div>
    </div>
  );
}

export default UserNav;
