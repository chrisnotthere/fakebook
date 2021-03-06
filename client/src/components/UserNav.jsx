import { RssFeed, People, ExitToApp, SearchRounded, AccountCircle } from '@material-ui/icons'
import { Link, useNavigate } from "react-router-dom";
import { UserNavContainer } from './styles/UserNav.styled';

function UserNav({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogOut = () => {
    setUser('');
    navigate('/login');
  }

  return (
    <UserNavContainer>
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

      </div>
    </UserNavContainer>
  );
}

export default UserNav;
