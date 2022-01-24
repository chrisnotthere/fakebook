import "./rightbar.css";
import { Users } from '../../testData';
import FriendRequest from "../friendrequest/FriendRequest";
import Friend from "../friend/Friend";

function RightBar({ profile }) {

  const DashRightbar = () => {
    return (
      <>
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
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        <h4 className="rightbarTitle">Friends of Safak</h4>
        <ul className="rightbarFriends">
          {Users.map(u => (
            <Friend key={u.id} user={u} />
          ))}
        </ul>
      </>
    )
  }

  return (
    <div className='rightBar'>
      <div className="rightbarWrapper">
        {profile ? <ProfileRightbar /> : <DashRightbar />}
        {/* <ProfileRightbar /> */}
        {/* <DashRightbar /> */}
      </div>
    </div>
  );
}

export default RightBar;
