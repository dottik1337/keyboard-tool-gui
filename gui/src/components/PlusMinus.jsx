import React from 'react'
import styles from "./css/PlusMinus.module.css";

export default function PlusMinus(props) {
  return (
    <div className={styles.btndiv} style={props.style}>
        <button onClick={props.clickMinus} className={styles.btn}>-</button>
        <button onClick={props.clickPlus} className={styles.btn}>+</button>
    </div>
  )
}
