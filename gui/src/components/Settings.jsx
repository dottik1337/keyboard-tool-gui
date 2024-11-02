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
} from "@fortawesome/free-solid-svg-icons";
import PCKeyboard from "./PCKeyboard.jsx";

const fh = new FileHandler();
const SettingsWindowContext = createContext();
export const KeyboardSettingsContext = createContext();

function MainSettings() {
  const [keyboard, setKeyboard] = useContext(KeyboardContext);
  const [currBind, setCurrBind] = useState("");
  const settingsContext = useContext(SettingsWindowContext);
  useEffect(() => {
    const fun = async () => {
      const cb = await fh.getCurrBind(keyboard.selectedKey);
      setCurrBind(cb);
    };
    fun();
  }, [keyboard]);

  return (
    <div className="settings settings-main">
      <h1>Current bind:</h1>
      <p>{currBind ? currBind : 'None'}</p>

      <button
        onClick={() => settingsContext.setSettingWindow(<KeyboardSettings />)}
        id="keyboard-setting-btn">
        Keyboard
      </button>
      <button id="mouse-setting-btn">Mouse</button>
      <button id="media-setting-btn">Media</button>
    </div>
  );
}

function LowerSettingsButtons(props) {
  const settingsContext = useContext(SettingsWindowContext);
  const [keyboard, setKeyboard] = useContext(KeyboardContext);
  const [isDisabled, setIsDisabled] = useState(true);

  const handleCommit = async() => {

    await fh.changeBind(keyboard.selectedKey, props.bindValue);
    settingsContext.setSettingWindow(<SuccesWindow />);
  };
  
  useEffect(() => {
    setIsDisabled(props.bindValue === "" ? true : false);
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

function KeyboardSettings() {
  const [key, setKey] = useState('');
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  
  useEffect(() => {
    const handleKeyPress = (event) => {
      let combination = handleKeyEvent(event);
      setKey(combination);
    };

    window.addEventListener("keydown", handleKeyPress);

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
      <div className="key-listen">
        <h2>Press any key to bind!</h2>
        <p>Key pressed: {key}</p>
      </div>
      <button onClick={() => setIsKeyboardOpen(true)} className="neutral-button">
        <FontAwesomeIcon icon={faKeyboard} />
      </button>
      <LowerSettingsButtons bindValue={key}></LowerSettingsButtons>
    </div>
  );
}

function SuccesWindow() {
  return (
    <div className="settings settings-succes">
      <h1>Bind succesful!</h1>
      <LowerSettingsButtons></LowerSettingsButtons>
    </div>
  );
}

export default function Settings() {
  const [settingWindow, setSettingWindow] = useState(<MainSettings />);

  return (
    <>
      <SettingsWindowContext.Provider value={{settingWindow, setSettingWindow}}>
        {settingWindow}
      </SettingsWindowContext.Provider>
    </>
  );
  //return (<KeyboardSettings />);
}
