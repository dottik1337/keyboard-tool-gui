import React from 'react'
import styles from './css/PCKeyboard.module.css';
import { useContext } from 'react';
import { clickContext } from './PCKeyboard.jsx';

/**
 * Component for virtual keyboard key
 */
export function KeyboardKey({children}) {
    const handleClick = useContext(clickContext);
    return (
        <div onClick={() => handleClick(children.props.children)} className={styles.key}>
            {children}
        </div>
  )
}

/**
 * Component for bigger virtual keyboard key
 */
export function KeyAndHalf({children}) {
    const handleClick = useContext(clickContext);
    return (
        <div onClick={() => handleClick(children.props.children)} className={[styles.keyAndHalf, styles.key].join(' ')}>
            {children}
        </div>
    )
}

/**
 * Component for double virtual keyboard key
 */
export function DoubleKey({children}) {
  const handleClick = useContext(clickContext);
    return (
        <div onClick={() => handleClick(children.props.children)} className={[styles.doubleKey, styles.key].join(' ')}>
            {children}
        </div>
    )
}

/**
 * Component for extra big virtual keyboard key
 */
export function DoubleAndHalfKey({children}) {
  const handleClick = useContext(clickContext);
    return (
        <div onClick={() => handleClick(children.props.children)} className={[styles.doubleAndHalfKey, styles.key].join(' ')}>
            {children}
        </div>
    )
}

/**
 * Compontnt for space key
 */
export function Space() {
  const handleClick = useContext(clickContext);
    return (
        <div onClick={() => handleClick('space')} className={[styles.space, styles.key].join(' ')}></div>
    )
}