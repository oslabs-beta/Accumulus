import React, { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { BasicBtn } from './../styles';

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
      <BasicBtn onClick={dashBtnHandler}>Dashboard</BasicBtn>
      <BasicBtn onClick={funcBtnHandler}>Functions</BasicBtn>
      <BasicBtn onClick={alloBtnHandler}>Allocation Improvements</BasicBtn>
    </>
  );
};

export default Sidebar;
