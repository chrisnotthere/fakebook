import './App.css';
import React, { useState } from 'react';
import Facebook from './components/Facebook';
import TestUser from './components/TestUser';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  const [user, setUser] = useState('');

  fetch('/')
    .then(response => response.text())
    .then(data => console.log({ data }));
  // .then(response => console.log(response))

  return (
    <Router>
      <div className="App">
        <h1>Welcome to Fakebook</h1>
        <h2>another title</h2>
        <p>playing around with facebook login</p>
        <TestUser user={user} setUser={setUser} />
        <Routes>
          <Route path='/' element={<Facebook user={user} setUser={setUser} />} />
        </Routes>
        <div>
        </div>
      </div>
    </Router>
  );
}

export default App;
