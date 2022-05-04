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

  return (
    <>
      <button onClick={dashBtnHandler}>Dashboard</button>
      <button onClick={funcBtnHandler}>Functions</button>
      <button>Show me the STEP Functions!</button>
      <button>Show me the Cost Analysis!</button>
      <button>Show me the Company Analytics!</button>
    </>
  );
};

export default Sidebar;
