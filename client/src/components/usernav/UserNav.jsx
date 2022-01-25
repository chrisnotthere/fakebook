import "./usernav.css";
import { RssFeed, People, GroupAdd } from '@material-ui/icons'
import { Link } from "react-router-dom";

function UserNav() {
  return (
    <div className="userNav">
      <div className="userNavWrapper">
        <ul className="userNavList">
          <Link to={'/'} style={{textDecoration:'none', color:'inherit'}} >
            <li className="userNavListItem">
              <RssFeed className="userNavIcon" />
              <span className="userNavListItemText">Feed</span>
            </li>
          </Link>

          <li className="userNavListItem">
            <People className="userNavIcon" />
            <span className="userNavListItemText">Friends</span>
          </li>
          <li className="userNavListItem">
            <GroupAdd className="userNavIcon" />
            <span className="userNavListItemText">Find Friends</span>
          </li>
        </ul>
        {/* <button className="userNavButton">Show More</button> */}
        <hr className="userNavHr" />
      </div>
    </div>
  );
}

export default UserNav;
