/**
 * @file Knob.jsx
 * @author Jozef Gallo <xgallo06>
 */
import React from 'react'
import styles from "./css/Knob.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateLeft, faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";
import { useContext } from 'react';
import { KeyboardContext } from './App.jsx';

/**
 * Component for mini keyboard knob
 * @param {clss} props 
 * @returns Knob component
 */
export default function Knob(props) {
  const [keyboard, setKeyboard] = useContext(KeyboardContext);

  return (
    <div className={styles.grid}>
        <div >
          <FontAwesomeIcon onClick={(e) => keyboard.keySelection(e,{type: "knob",x: props.knob,y: "ccw"})} className={[styles.arrow, styles.ccw, "bindable"].join(' ')} icon={faArrowRotateLeft} />
        </div>
        <div >

          <FontAwesomeIcon onClick={(e) => keyboard.keySelection(e,{type: "knob",x: props.knob,y: "cw"})} className={[styles.arrow, styles.cw, "bindable"].join(' ')} icon={faArrowRotateRight} />
        </div>
        <div onClick={(e) => keyboard.keySelection(e,{type: "knob",x: props.knob,y: "press"})} className={`${styles.knob} bindable`}></div>
    </div>
  )
}
