/**
 * @file PlusMinus.jsx
 * @author Jozef Gallo <xgallo06>
 */
import React from 'react'
import styles from "./css/PlusMinus.module.css";

/**
 * Component for plus minus buttons
 */
export default function PlusMinus(props) {
  const div_style = props.vertical ? styles.verticalDiv : styles.btndiv;
  return (
    <div className={div_style} style={props.style}>
        <button onClick={props.clickMinus} className={styles.btn}>-</button>
        <button onClick={props.clickPlus} className={styles.btn}>+</button>
    </div>
  )
}
