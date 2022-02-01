import NavBar from "../components/NavBar";
import UserNav from "../components/UserNav";
import { SettingsContainer } from '../components/styles/Settings.styled'

function Settings({ user, setUser }) {

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <SettingsContainer>
        <UserNav user={user} setUser={setUser} />
        <div className='settingsWrapper' >
          <h2>Not implemented.</h2>
          <p>TODO: edit profile picture, cover picture, and about/description</p>
        </div>
      </SettingsContainer>
    </>
  );
}

export default Settings;
