import React from 'react'
import styles from "./css/Key.module.css";
import { useContext } from 'react';
import { KeyboardContext } from './App.jsx';

export default function Key(props) {
  const [keyboard, setKeyboard] = useContext(KeyboardContext);
  return (
    <button onClick={(e) => keyboard.keySelection(e,{type: "key",y: props.row,x: props.column})} className={`${styles.keyboard_key} bindable`}>
      {`${props.column}, ${props.row}`}
    </button>
  )
}