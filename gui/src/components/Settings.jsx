import React from "react";
import { useContext, createContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { KeyboardContext } from "./App.jsx";
import { FileHandler } from "../fileHandler.js";
import "./css/Settings.css";
import { handleKeyEvent } from "../handleKeyboard.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareCaretLeft,
  faSquareCheck,
  faKeyboard,
  faPlay,
  faPause,
  faForwardStep,
  faBackwardStep,
  faVolumeHigh,
  faVolumeLow,
  faVolumeXmark,
  faStar,
  faCalculator,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import PCKeyboard from "./PCKeyboard.jsx";

const fh = new FileHandler();
const SettingsWindowContext = createContext();
export const KeyboardSettingsContext = createContext();

/**
 * Menu settings component
 * @returns Main settings component
 */
function MainSettings() {
  const [keyboard, setKeyboard] = useContext(KeyboardContext);    
  const [currBind, setCurrBind] = useState("");                   // Current bind for selected key
  const settingsContext = useContext(SettingsWindowContext);
  useEffect(() => {
    const fun = async () => {
      // Get current bind for selected key
      const cb = await fh.getCurrBind(keyboard.selectedKey);
      setCurrBind(cb);
    };
    fun();
  }, [keyboard]);

  return (
    <div className="settings settings-main">
      <div className="current-selection">
        <h1>Current bind:</h1>
        <p><span>{currBind ? currBind : ''}</span></p>
      </div>

      <button
        onClick={() => settingsContext.setSettingWindow(<KeyboardSettings />)}
        id="keyboard-setting-btn">
        Keyboard
      </button>
      <button
        onClick={() => settingsContext.setSettingWindow(<MouseSettings />)}
        id="mouse-setting-btn">Mouse</button>
      <button
      onClick={() => settingsContext.setSettingWindow(<MediaSettings />)}
      id="media-setting-btn">Media</button>
    </div>
  );
}

/**
 * Confirm and back buttons for settings
 */
function LowerSettingsButtons(props) {
  const settingsContext = useContext(SettingsWindowContext);
  const [keyboard, setKeyboard] = useContext(KeyboardContext);
  const [isDisabled, setIsDisabled] = useState(true);

  /**
   * Handles commiting bind value to selected key
   */
  const handleCommit = async() => {
    await fh.changeBind(keyboard.selectedKey, props.bindValue);   // Change bind value for selected key in config file
    settingsContext.setSettingWindow(<MainSettings />);           // Set main settings window
  };
  
  useEffect(() => {
    setIsDisabled(props.bindValue === "" ? true : false);     // Disable confirm button if bind value is empty
  }, [props.bindValue]);
  
  return (
    <div className="lower-buttons">
      <button onClick={() => settingsContext.setSettingWindow(<MainSettings />)} className="back-button">
        <FontAwesomeIcon icon={faSquareCaretLeft} />
      </button>
      <button disabled={isDisabled} onClick={handleCommit} className="confirm-button">
        <FontAwesomeIcon icon={faSquareCheck} />
      </button>
    </div>
  );
}

/**
 * Keyboard settings component
 * @returns Keyboard settings component
 */
function KeyboardSettings() {
  const [key, setKey] = useState('');
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  
  useEffect(() => {
    // Handle key press event
    const handleKeyPress = (event) => {
      let combination = handleKeyEvent(event);  // Get key combination
      setKey(combination);                      // Set key combination
    };

    window.addEventListener("keydown", handleKeyPress);     // Listen for keydown event

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);


  return (
    <div className="settings settings-keyboard">
      <KeyboardSettingsContext.Provider value={{setIsKeyboardOpen, key, setKey}}>
      {isKeyboardOpen && createPortal(
        <PCKeyboard />,
        document.body
        )}
      </KeyboardSettingsContext.Provider>
      <h1>Keyboard</h1>
      <div className="current-selection">
        <h2>Press any key to bind!</h2>
        <p>Key pressed: <span>{key}</span></p>
      </div>
      <button onClick={() => setIsKeyboardOpen(true)} className="neutral-button">
        <FontAwesomeIcon icon={faKeyboard} />
      </button>
      <LowerSettingsButtons bindValue={key}></LowerSettingsButtons>
    </div>
  );
}

/**
 * Mouse settings component
 * @returns Mouse settings component
 */
function MouseSettings() {
  const [key, setKey] = useState('');


  return (
    <div className="settings settings-mouse">
      <div className="current-selection">
        <h1>Mouse</h1>
        <p>Current Selection: <span>{key}</span></p>
      </div>
      <div className="mouse-buttons-selection">
        <button onClick={() => setKey('click')}>Left</button>
        <button onClick={() => setKey('rclick')}>Right</button>
        <button onClick={() => setKey('wheeldown')}>Down</button>
        <button onClick={() => setKey('wheelup')}>Up</button>
        <button onClick={() => setKey('mclick')}>Middle Click</button>
      </div>

      <LowerSettingsButtons bindValue={key}></LowerSettingsButtons>
    </div>
  );
}

/**
 * Media settings component
 * @returns Media settings component
 */
function MediaSettings() {
  const [key, setKey] = useState('');

  return (
    <div className="settings settings-media">
      <div className="current-selection">
        <h1>Media</h1>
        <p>Current Selection: <span>{key}</span></p>
      </div>
      <div className="media-buttons-selection">
        <button onClick={() => setKey('play')}><FontAwesomeIcon icon={faPlay} /></button>
        <button onClick={() => setKey('pause')}><FontAwesomeIcon icon={faPause} /></button>
        <button onClick={() => setKey('next')}><FontAwesomeIcon icon={faForwardStep} /></button>
        <button onClick={() => setKey('prev')}><FontAwesomeIcon icon={faBackwardStep} /></button>
        <button onClick={() => setKey('volumeup')}><FontAwesomeIcon icon={faVolumeHigh} /></button>
        <button onClick={() => setKey('volumedown')}><FontAwesomeIcon icon={faVolumeLow} /></button>
        <button onClick={() => setKey('mute')}><FontAwesomeIcon icon={faVolumeXmark} /></button>
        <button onClick={() => setKey('favorite')}><FontAwesomeIcon icon={faStar} /></button>
        <button onClick={() => setKey('calculator')}><FontAwesomeIcon icon={faCalculator} /></button>
        <button onClick={() => setKey('screenlock')}><FontAwesomeIcon icon={faLock} /></button>
      </div>
      <LowerSettingsButtons bindValue={key}></LowerSettingsButtons>
    </div>
  );
}

/**
 * Component for settings on rihgt side of the screen
 * @returns Settings component
 */
export default function Settings() {
  // Component that is currently displayed in settings window
  const [settingWindow, setSettingWindow] = useState(<MainSettings />);

  return (
    <>
      <SettingsWindowContext.Provider value={{settingWindow, setSettingWindow}}>
        {settingWindow}
      </SettingsWindowContext.Provider>
    </>
  );
}
