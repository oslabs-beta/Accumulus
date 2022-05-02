import React, { useState } from 'react';
import FuncGraph from '../components/fn-graph';
import BarFuncGraph from '../components/bar-func-graph';
import { useDataContext } from '../context/dataContext';

const Functions = () => {
  const { data, receivedData } = useDataContext();
  return (
    <>
      <h2 className="text-3xl font-bold underline">Functions Page</h2>
      <FuncGraph />
      <BarFuncGraph />
      <h3>{data}</h3>
    </>
  );
};

export default Functions;
