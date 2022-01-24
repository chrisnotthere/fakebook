import "./usernav.css";
import {RssFeed, People, GroupAdd} from '@material-ui/icons'

function UserNav() {
  return (
    <div className="userNav">
      <div className="userNavWrapper">
        <ul className="userNavList">
          <li className="userNavListItem">
            <RssFeed className="userNavIcon" />
            <span className="userNavListItemText">Feed</span>
          </li>
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
        <hr className="userNavHr"/>
      </div>
    </div>
  );
}

export default UserNav;
