/**
 * @file App.jsx
 * @author Jozef Gallo <xgallo06>
 */
import React from 'react'
import { createContext, useState, useEffect } from 'react';
import Keyboard from './Keyboard.jsx';
import Settings from './Settings.jsx';
import { FileHandler } from '../fileHandler.js';

const fh = new FileHandler();                           // Import FileHandler class from fileHandler.js
export const KeyboardContext = createContext();         // Create context for keyboard

// Default values for keyboard
const MAX_ROWS = 4;
const MAX_COLUMNS = 3;
const MAX_KNOBS = 2;

/**
 * App component
 * @returns App component
 */
export default function App() {
  const keySelection = (_, key) => {                    // Function to select current key
    setKeyboard(k => ({...k, selectedKey: key}));     
  }
  const [keyboard, setKeyboard] = useState({            // useState for keyboard     
    rows: MAX_ROWS,
    columns: MAX_COLUMNS,
    knobs: MAX_KNOBS,
    selectedKey: null, //type, x, y
    keySelection: keySelection
  });
  const [uploadBtnText, setUploadBtnText] = useState('Upload to keyboard!');  // useState for upload button text

  /**
   * useEffect hook
   */
  useEffect( () => {
    const handleClick = (event) => {                    // Function to handle click event        
      let element = event.target;                       // Element which is clicked
      if (element.tagName === "path"){                  // Case for SVG path         
        element = element.parentElement;                // Get parent element (SVG)           
      }
      const clearActive = () => {                       // Function to clear active button on keyboard       
        document.querySelectorAll('.bindable').forEach((element) => {   // Select all bindable elements
          element.classList.remove('active');           // Remove active class 
        });
      }
      if (element.classList.contains('bindable')){      // Case for bindable element
        clearActive();                                  // Clear active button        
        element.classList.add('active');                // Make clicked button appear active
      }
      else if (element.classList.contains('settings') || element.closest('.settings') || element.closest('.commit-btn')){   // Case for settings or commit button
        return;                                         // Do nothing 
      }
      else if (element === document.body || element.closest('.app')){  // If clicked on body
        clearActive();                                  // Deactivate all buttons
        setKeyboard(k => ({...k, selectedKey: null}));  // Set selected key to null
      }
    };

    fh.getInitState().then((data) => {                  // Get initial state from config.yaml file
      setKeyboard(k => ({...k, ...data}));
    });

    document.addEventListener('click', handleClick);    // Add event listener for click event

    return () => {
      document.removeEventListener('click', handleClick); // Remove event listener for click event
    };
    
  },[]);

  /**
   * Uploads configuration to keyboard
   * @param {React.MouseEvent} e 
   */
  const handleUpload = (e) => {
    const result = fh.uploadToKeyboard();                 // Upload configuration to keyboard using FileHandler class
    const button = e.target;                              // Get button element  
    const TIMEOUT = 1000;                                 // Timeout for response animation
    if (result){                                          // If upload is successful        
      setUploadBtnText('Uploaded!');                      // Set upload button text to 'Uploaded!'
      button.disabled = true;                             // Disable button temporarily 
      button.style.backgroundColor = 'var(--button-confirm-hover)'; // Change button color to green
      setTimeout(() => {                                  // Set timeout for response animation
        setUploadBtnText('Upload to keyboard!');          // Set upload button text to default value
        button.disabled = false;                          // Enable button  
        button.style.backgroundColor = 'var(--button-neutral)'; // Change button color to default
      }, TIMEOUT);
    }
    else {
      setUploadBtnText('Upload failed!');                 // Set upload button text to 'Upload failed!'
      button.disabled = true;                             // Disable button temporarily
      button.style.backgroundColor = 'var(--button-back-hover)';  // Change button color to red
      setTimeout(() => {                                  // Set timeout for response animation   
        button.disabled = false;                          // Enable button
        button.style.backgroundColor = 'var(--button-neutral)'; // Change button color to default
        setUploadBtnText('Upload to keyboard!');          // Set upload button text to default value  
      }, TIMEOUT);
    }
  };
  return (
    <>
    <div className='app'>
      <KeyboardContext.Provider value={[keyboard, setKeyboard]}>
        <Keyboard />
        {keyboard.selectedKey !== null && <Settings key={keyboard.selectedKey.type + keyboard.selectedKey.x + keyboard.selectedKey.y}/>}
        <div className="commit-btn">
          <button onClick={(e) => handleUpload(e)}>{uploadBtnText}</button>
        </div>
      </KeyboardContext.Provider>
    </div>
    </>
  )
}
