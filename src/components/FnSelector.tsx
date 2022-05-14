import React, { useState } from 'react';

import { FnSelectButton } from '../styles';

interface IFunctionSelector {
  funcNames: string[];
  onFunctions: Record<string, string>;
  setOnFunctions: Function;
}

const FunctionSelector = (props: IFunctionSelector) => {
  const colors = ['red', 'blue', 'orange', 'green', 'purple'];
  const [counter, setCounter] = useState(0);

  const handleClick = (e: React.MouseEvent) => {
    const functionClicked = (e.target as HTMLElement).id;
    const newState = { ...props.onFunctions };
    // Check if
    if (props.onFunctions.hasOwnProperty(functionClicked)) {
      // Function button already clicked
      delete newState[functionClicked];
      props.setOnFunctions(newState);
      (e.target as HTMLElement).setAttribute(
        'style',
        'background-color: white'
      );
    } else {
      // Function button not yet clicked
      // Make new property on onFunctions
      newState[functionClicked] = colors[counter];
      setCounter(counter + 1);
      props.setOnFunctions(newState);
      (e.target as HTMLElement).setAttribute(
        'style',
        `background-color: ${colors[counter]}`
      );
    }
  };

  const functionButtons = [];
  for (let i = 0; i < props.funcNames.length; i++) {
    functionButtons.push(
      <FnSelectButton
        key={props.funcNames[i]}
        id={props.funcNames[i]}
        onClick={handleClick}
      >
        {props.funcNames[i]}
      </FnSelectButton>
    );
  }

  return (
    <>
      <h3 style={{ color: 'black' }}>Functions</h3>
      {/* <SelectContainer> */}
        <div>{functionButtons}</div>
      {/* </SelectContainer> */}
    </>
  );
};

export default FunctionSelector;
