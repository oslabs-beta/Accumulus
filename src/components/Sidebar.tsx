import React, { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

type Props = {};

const Sidebar = () => {
  let history = useHistory();

  const dashBtnHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    history.push('/home');
  };

  const funcBtnHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    history.push('/functions');
  };

  const alloBtnHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    history.push('/allocations');
  };

  return (
    <>
      <button onClick={dashBtnHandler}>Dashboard</button>
      <button onClick={funcBtnHandler}>Functions</button>
      <button onClick={alloBtnHandler}>Allocation Improvements</button>
    </>
  );
};

export default Sidebar;
