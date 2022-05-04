import React, { useState } from 'react';

interface Props {
  names: string[];
}

const FunctionSelector = (props: any) => {
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

  return <div>{functionButtons}</div>;
};

export default FunctionSelector;
