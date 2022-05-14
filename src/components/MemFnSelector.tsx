import React, { useState } from 'react';

interface Props {
  names: string[];
  onStacked: any[];
  setOnStacked: Function;
  data: object[];
}

const AlloFunctionSelector = (props: any) => {
  const colors = ['red', 'blue', 'orange', 'green', 'purple'];
  const [counter, setCounter] = useState(0);

  const handleClick = (e: React.MouseEvent) => {
    const functionClicked = (e.target as HTMLElement).id;

    // 2 level shallow clone of current state
    const newState: any[] = [];
    props.onStacked.map((func: any) => {
      newState.push({ ...func });
    });

    // Helper Function: Does onStacked hook have clicked function?
    const hasFunction = (functionName: string, newState: any[]): boolean => {
      for (let i = 0; i < newState.length; i++) {
        if (newState[i].name === functionName) return true;
      }
      return false;
    };

    // Helper Function: Delete clicked function entry from onStacked hook
    const deleteFunction = (functionName: string, newState: any[]): void => {
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
          newState.push({ ...data[i], color: colors[counter] });
          return;
        }
      }
    };

    if (hasFunction(functionClicked, newState)) {
      // Function button already clicked
      deleteFunction(functionClicked, newState);
      props.setOnStacked(newState);
      (e.target as HTMLElement).setAttribute(
        'style',
        'background-color: white'
      );
    } else {
      // Function button not yet clicked
      // Make new property on onFunctions
      addFunction(functionClicked, props.data, newState);
      setCounter(counter + 1);
      props.setOnStacked(newState);
      (e.target as HTMLElement).setAttribute(
        'style',
        `background-color: ${colors[counter]}`
      );
    }
  };

  const functionButtons = [];
  for (let i = 0; i < props.names.length; i++) {
    functionButtons.push(
      <button
        key={props.names[i]}
        style={{ backgroundColor: 'white' }}
        id={props.names[i]}
        onClick={handleClick}
      >
        {props.names[i]}
      </button>
    );
  }

  return (
    <>
      <h3>Functions</h3>
      <div>{functionButtons}</div>
    </>
  );
};

export default AlloFunctionSelector;
