import React, { useState } from 'react';
import { FnSelectButton } from '../styles';
interface Props {
  names: string[];
  onStacked: {[key:string]: string | number}[];
  setOnStacked: Function;
  data: object[];
}

const AlloFunctionSelector = (props: Props) => {
  const colors = ['red', 'blue', 'orange', 'green', 'purple'];
  const [ colorArr, setColorArr ] = useState(colors)
  const [counter, setCounter] = useState(0);

  const handleClick = (e: React.MouseEvent) => {
    const functionClicked = (e.target as HTMLElement).id;

    // 2 level shallow clone of current state
    const newState: {[key:string]: string | number}[] = [];
    props.onStacked.map((func: {[key:string]: string | number}) => {
      newState.push({ ...func });
    });

    // Helper Function: Does onStacked hook have clicked function?
    const hasFunction = (functionName: string, newState: {[key:string]: string | number}[]): boolean => {
      for (let i = 0; i < newState.length; i++) {
        if (newState[i].name === functionName) return true;
      }
      return false;
    };

    // Helper Function: Delete clicked function entry from onStacked hook
    const deleteFunction = (functionName: string, newState: {[key:string]: string | number}[]): void => {
      for (let i = 0; i < newState.length; i++) {
        if (newState[i].name === functionName) {
          for (let j = i; j < newState.length; j++) {
            newState[i] = newState[i + 1];
          }
          newState.pop();
          if (newState.length === 0)
            newState.push({ name: 'Select a function' });
          return;
        }
      }
    };

    // Helper Function: Add clicked function entry from fetched data into onStacked hook
    const addFunction = (
      functionName: string,
      data: any[],
      newState: any[]
    ): void => {
      if (newState[0].name === 'Select a function') newState.pop();
      for (let i = 0; i < data.length; i++) {
        if (data[i].name === functionName) {
          newState.push({ ...data[i], color: colorArr[counter] });
          return;
        }
      }
    };

    const newColor = '#' + Math.floor(Math.random()*16777215).toString(16)
    colorArr.push(newColor);
    colorArr.shift();
    setColorArr(colorArr);

    if (hasFunction(functionClicked, newState)) {
      // Function button already clicked
      deleteFunction(functionClicked, newState);
      props.setOnStacked(newState);
      (e.target as HTMLElement).setAttribute(
        'style',
        'background-color: #a674c1'
      );
    } else {
      // Function button not yet clicked
      // Make new property on onFunctions
      addFunction(functionClicked, props.data, newState);
      setCounter(counter + 1);
      if(counter > 3) setCounter(0);
      props.setOnStacked(newState);
      (e.target as HTMLElement).setAttribute(
        'style',
        `background-color: ${colorArr[counter]}`
      );
    }
  };

  const functionButtons = [];
  for (let i = 0; i < props.names.length; i++) {
    functionButtons.push(
      <FnSelectButton
        key={props.names[i]}
        id={props.names[i]}
        onClick={handleClick}
      >
        {props.names[i]}
      </FnSelectButton>
    );
  }

  return (
    <>
      <h3>Function</h3>
      <div>{functionButtons}</div>
    </>
  );
};

export default AlloFunctionSelector;
