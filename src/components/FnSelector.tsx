import React, { useState } from 'react';

import { FnSelectButton, FnSideBarWrapper } from '../styles';

//types expected for FunctionSelector
interface IFunctionSelector {
  funcNames: string[];
  onFunctions: Record<string, string>;
  setOnFunctions: Function;
}

const FunctionSelector = (props: IFunctionSelector) => {
  const colors = ['red', 'blue', 'orange', 'green', 'purple'];
  const [ colorArr, setColorArr ] = useState(colors)
  let [counter, setCounter] = useState(0);

  const handleClick = (e: React.MouseEvent) => {
    const functionClicked = (e.target as HTMLElement).id;
    const newState = { ...props.onFunctions };
    const newColor = '#' + Math.floor(Math.random()*16777215).toString(16)
    colorArr.push(newColor);
    colorArr.shift();
    setColorArr(colorArr);
    if (props.onFunctions.hasOwnProperty(functionClicked)) {
      // Function button already clicked
      delete newState[functionClicked];
      props.setOnFunctions(newState);
      (e.target as HTMLElement).setAttribute(
        'style',
        'background-color: #a674c1'
      );
    } else {
      // Function button not yet clicked
      // Make new property on onFunctions
      newState[functionClicked] = colorArr[counter];
      setCounter(counter + 1);
      if(counter > 3) setCounter(0);
      console.log(colorArr)
      console.log(`color array at ${counter} is ${colorArr[counter]}`)
      props.setOnFunctions(newState);
      (e.target as HTMLElement).setAttribute(
        'style',
        `background-color: ${colorArr[counter]}`
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
      {/* <FnSideBarWrapper> */}
        <h3>Functions</h3>
        <div>{functionButtons}</div>
      {/* </FnSideBarWrapper> */}
    </>
  );
};

export default FunctionSelector;
