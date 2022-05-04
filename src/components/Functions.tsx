import React, { useState } from 'react';
import FuncGraph from '../components/fn-graph';
import BarFuncGraph from '../components/bar-func-graph';

// type Props = {
//   setMenuOpen: Function;
//   funcViewData: { name: string; total: number; error: number }[];
//   allFuncLogs: { name: string; streams: Array<string> }[];
// };

const Functions = (/*{ setMenuOpen, funcViewData, allFuncLogs }: Props*/) => {
  return (
    <>
      <h2>Functions Page</h2>
      <FuncGraph />
      <BarFuncGraph />
    </>
  );
};

export default Functions;
