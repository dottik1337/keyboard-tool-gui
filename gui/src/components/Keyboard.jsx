/**
 * @file Keyboard.jsx
 * @author Jozef Gallo <xgallo06>
 */

import React from 'react'
import Key from './Key.jsx';
import PlusMinus from './PlusMinus.jsx';
import Knob from './Knob.jsx';
import { useState, useContext, useEffect } from 'react';
import { FileHandler } from '../fileHandler.js';
import { KeyboardContext } from './App.jsx';

const fh = new FileHandler();

const MAX_ROWS = 4;
const MAX_COLUMNS = 3;
const MAX_KNOBS = 2;

/**
 * Mini keyboard component on the left side of the screen with variable number of keys and knobs
 * @returns Keyboard component
 */
export default function Keyboard() {

  const [keyboard, setKeyboard] = useContext(KeyboardContext);
  
  /**
   * handles adding column
   */
  const clickPlusColumn = () => {
    if (keyboard.columns < MAX_COLUMNS) {
      setKeyboard(k => ({...k, columns: k.columns + 1}));
      fh.addColumn();
    }
  }
  /**
   * handles removing column
   */
  const clickMinusColumn = () => {
    if (keyboard.columns > 1){
      setKeyboard(k => ({...k, columns: k.columns - 1}));
      fh.removeColumn();
    }
  }
  /**
   * handles adding row
   */
  const clickPlusRow = () => {
    if (keyboard.rows < MAX_ROWS) {
      setKeyboard(k => ({...k, rows: k.rows + 1}));
      fh.addRow();
    }
  }
  /**
   * handles removing row
   */
  const clickMinusRow = () => {
    if (keyboard.rows > 1){
      setKeyboard(k => ({...k, rows: k.rows - 1}));
      fh.removeRow();
    }
  }
  /**
   * handles adding knob
   */
  const clickPlusKnob = () => {
    if (keyboard.knobs < MAX_KNOBS) {
      setKeyboard(k => ({...k, knobs: k.knobs + 1}));
      fh.addKnob();
    }
  }
  /**
   * handles removing knob
   */
  const clickMinusKnob = () => {
    if (keyboard.knobs > 1){
      setKeyboard(k => ({...k, knobs: k.knobs - 1}));
      fh.removeKnob();
    }
  }

  /**
   * Style for plus and minus knob buttons
   */
  const knobPlusMinus = {
    gridColumn: '2',
    gridRow: '4'
  };
  /**
   * Style for plus and minus column buttons
   */
  const firstPlusMinus = {
    gridColumn: '2',
    gridRow: '1'
  };
  /**
   * Style for plus and minus row buttons
   */
  const secondPlusMinus = {
    gridColumn: '1',
    gridRow: '2'
  };
  return (
    <div className='keyboard'>
      <div></div>
      <PlusMinus style={firstPlusMinus} clickPlus={clickPlusColumn} clickMinus={clickMinusColumn}/>
      <PlusMinus style={secondPlusMinus} vertical={true} clickPlus={clickPlusRow} clickMinus={clickMinusRow}/>
      <Keys rows={keyboard.rows} columns={keyboard.columns}/>
      <div></div>
      <Knobs knobs={keyboard.knobs} />
      <PlusMinus style={knobPlusMinus} clickPlus={clickPlusKnob} clickMinus={clickMinusKnob}/>
    </div>
    
  );
} 

/**
 * Component of mini keyboard keys grid
 * @param {class} props 
 * @returns Keys component
 */
function Keys(props) {

  let keys = [];
  // Make a grid of keys
  for (let i = 0; i < props.rows; i++) {
    for (let j = 0; j < props.columns; j++) {
      keys.push({ row: i, column: j });
    }
  }
  
  // Style for keys grid
  let keys_grid = {
    display: 'grid',
    gridTemplateColumns: `repeat(${props.columns}, 1fr)`,
    gridTemplateRows: `repeat(${props.rows}, 1fr)`,
    gap: '1px',
    maxWidth: '300px',
    justifyItems: 'center',
    margin: 'auto',
    gridColumn: '2',
    gridRow: '2'
  };


  return (
    <div style={keys_grid}>
      {keys.map((key, index) => {
        return <Key key={index} row={key.row} column={key.column}/>
          
      })}
    </div>
  )
}

/**
 * Component of mini keyboard knobs
 * @param {class} props 
 * @returns Knobs component
 */
function Knobs(props) {
  let knbs=[]

  // Make a list of knobs
  for (let i = 0; i < props.knobs; i++) {
    knbs.push({ knob: i });
  } 

  // Style for knobs
  const style = {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
  }
  return (
    <div style={style}>
      {knbs.map((knob, index) => {
        return <Knob key={index} knob={knob.knob}/>
      })}
    </div>
  )
}
