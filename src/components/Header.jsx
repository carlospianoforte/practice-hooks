import React, {useState, useContext} from 'react';
import ThemeContext from '../context/ThemeContext';

const Header = () => {
    const {darkMode, setDarkMode} = useContext(ThemeContext);

    const handleClick = () => {
        setDarkMode(!darkMode);
    }

  return (
  <div className='Header'>
{/*     <h1>ReactHooks</h1>
 */}    <button onClick={handleClick} type='button'>
        {darkMode ?  'Dark Mode' : 'Light Mode'}
    </button>
  </div>
  );
};

export default Header;
