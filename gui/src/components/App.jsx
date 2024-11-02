import React from 'react'
import { createContext, useState, useEffect } from 'react';
import Keyboard from './Keyboard.jsx';
import Settings from './Settings.jsx';
import { FileHandler } from '../fileHandler.js';
import PCKeyboard from './PCKeyboard.jsx'; //delete

const fh = new FileHandler();
export const KeyboardContext = createContext();

const MAX_ROWS = 4;
const MAX_COLUMNS = 3;
const MAX_KNOBS = 2;

export default function App() {
  const keySelection = (_, key) => {
    setKeyboard(k => ({...k, selectedKey: key}));
  }
  const [keyboard, setKeyboard] = useState({
    rows: MAX_ROWS,
    columns: MAX_COLUMNS,
    knobs: MAX_KNOBS,
    selectedKey: null, //type, x, y
    keySelection: keySelection
  });
  useEffect( () => {
    const handleClick = (event) => {
      let element = event.target;
      if (element.tagName === "path"){
        element = element.parentElement;
      }
      const clearActive = () => {
        document.querySelectorAll('.bindable').forEach((element) => {
          element.classList.remove('active');
        });
      }
      if (element.classList.contains('bindable')){
        clearActive();
        element.classList.add('active');
      }
      else if (element.classList.contains('settings') || element.closest('.settings')) {
          
      }
      else if (element === document.body || element.closest('.app')){
        clearActive();
        setKeyboard(k => ({...k, selectedKey: null}));
      }
    };

    fh.getInitState().then((data) => {
      setKeyboard(k => ({...k, ...data}));
    });

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
    
  },[]);


  return (
    <>
    <div className='app'>
      <KeyboardContext.Provider value={[keyboard, setKeyboard]}>
        <Keyboard />

        {keyboard.selectedKey !== null && <Settings key={keyboard.selectedKey.type + keyboard.selectedKey.x + keyboard.selectedKey.y}/>}
        
      </KeyboardContext.Provider>
    </div>
    </>
  )
}
