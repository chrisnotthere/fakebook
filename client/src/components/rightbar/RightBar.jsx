import "./rightbar.css";
import { Users } from '../../testData';
import FriendRequest from "../friendrequest/FriendRequest";
import Friend from "../friend/Friend";

function RightBar() {
  return (
    <div className='rightBar'>
      <div className="rightbarWrapper">

        <h4 className="rightbarTitle">Friend Requests</h4>
        <ul className="rightbarFriendRequests">
          {Users.map(u => (
            <FriendRequest key={u.id} user={u} />
          ))}
        </ul>

        <hr className="rightbarHr" />

        <h4 className="rightbarTitle">Friends</h4>
        <ul className="rightbarFriends">
          {Users.map(u => (
            <Friend key={u.id} user={u} />
          ))}
        </ul>

      </div>
    </div>
  );
}

export default RightBar;
