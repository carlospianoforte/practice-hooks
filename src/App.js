import React, {useState, useContext} from 'react';
import Header from './components/Header';
import Characters from './components/Characters';
import ThemeContext from './context/ThemeContext';
import './App.css';


function App() {

  const [darkMode, setDarkMode] = useState(false);
  const color = darkMode ? 'white' : 'black';


  return (
    <ThemeContext.Provider value={{darkMode, setDarkMode}}>

      <div className={darkMode ? "Dark" : "Light"}>
        <h1 style={{color}}>Rick and morty API</h1>
        <Header />
        <Characters />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
