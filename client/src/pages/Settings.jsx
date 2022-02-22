import NavBar from "../components/NavBar";
import UserNav from "../components/UserNav";
import { SettingsContainer } from '../components/styles/Settings.styled'
import { useState } from "react";
import axios from '../utils/axios'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Settings({ user, setUser }) {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [picture, setPicture] = useState(user.picture);
  const [coverPicture, setCoverPicture] = useState(user.coverPicture);
  const [about, setAbout] = useState(user.about);

  // NOTE input values do not update after editing details and then returning to settings page
  // - unless you logout/login
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedDetails = { firstName, lastName, picture, coverPicture, about }
    try {
      await axios.put(`/users/${user.id}`, updatedDetails, { headers: { "Authorization": user.token } });
      // NOTE having problems when using setUser(updatedUser) - This might be because the auth token needs to be updated
      
      // console.log('Details updated');
      // const updatedUser = await (await axios.get(`/users/${user.id}`, { headers: { "Authorization": user.token } })).data.user;
      // setUser(updatedUser);
      // const updatedToken = await (await axios.get(`/users/${user.id}`, { headers: { "Authorization": user.token } })).data.user.token;
      // axios.defaults.headers.common["Authorization"] = updatedToken;
      // console.log(updatedUser);
      navigate('/');

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <SettingsContainer>
        <UserNav user={user} setUser={setUser} />
        <div className='settingsWrapper' >
          <h2>Update User Details</h2>

          <form className='settings-form' onSubmit={handleSubmit}>
            <label htmlFor="fname">First Name:</label>
            <div className="settings-form-inputs">
              <input
                type='text'
                id='fname'
                required
                placeholder='First Name'
                defaultValue={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <label htmlFor="lname">Last Name:</label>
              <input
                type='text'
                id='lname'
                required
                placeholder='Last Name'
                defaultValue={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <label htmlFor="picture">Picture:</label>
              <input
                type='text'
                id='picture'
                required
                placeholder='Picture'
                defaultValue={picture}
                onChange={(e) => setPicture(e.target.value)}
              />
              <label htmlFor="cover">Cover Picture:</label>
              <input
                type='text'
                id='cover'
                required
                placeholder='Cover Picture'
                defaultValue={coverPicture}
                onChange={(e) => setCoverPicture(e.target.value)}
              />
              <label htmlFor="about">About:</label>
              <textarea
                required
                id='about'
                placeholder='About'
                defaultValue={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>
            <button type='submit' className='settings-form-submit'>Update Details</button>
          </form>
        </div>
      </SettingsContainer>
    </>
  );
}

export default Settings;
