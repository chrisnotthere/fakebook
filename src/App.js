import './App.css';

function App() {
  fetch('/users')
  .then(response => response.text())
  .then(data => console.log({data}));
  // .then(response => console.log(response))

  return (
    <div className="App">
      <h1>Welcome to Fakebook</h1>
      <h2>another title</h2>
      <p>hello, im in a p tag...</p>

    </div>
  );
}

export default App;
