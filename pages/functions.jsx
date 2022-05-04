import React, { useState } from 'react';
import FuncGraph from '../components/fn-graph';
import BarFuncGraph from '../components/bar-func-graph';
import Counter from '../features/counter/Counter';
const Functions = () => {

  return (
    <>
      <h2 className="text-3xl font-bold underline">Functions Page</h2>
      <FuncGraph />
      <BarFuncGraph /> 
    <Counter />
    </>
  );
};

export default Functions;
