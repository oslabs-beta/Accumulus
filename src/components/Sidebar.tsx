import React, { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { BasicBtn } from './../styles';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { fa-solid, fa-chart-line } from '@fortawesome/free-solid-svg-icons';

import {
  IconLookup,
  IconDefinition,
  findIconDefinition
} from '@fortawesome/fontawesome-svg-core'
import { AnySchema } from 'yup';
import { AnyNode } from 'postcss';

library.add(fas)

const lambdaLookup: IconLookup = { prefix: 'fas', iconName: 'lambda' }
const lambdaIconDefinition: IconDefinition = findIconDefinition(lambdaLookup)

const chartLookup: IconLookup = { prefix: 'fas', iconName: 'chart-line' }
const chartIconDefinition: IconDefinition = findIconDefinition(chartLookup)

// coffeeIconDefinition

type Props = {
  setCurrentView: Function;
};

const Sidebar = ({setCurrentView}: Props) => {
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

  const logOutHandler = async () => {
    console.log('log out clicked!')
    //post request to /signout
    const leaving = await fetch('http://localhost:3000/api/user/signout', {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      method: 'POST',
    });
    console.log(leaving);

    // setCurrentView('login');
    history.push('/login');
  }

  return (
    <>
      <BasicBtn>

        <FontAwesomeIcon icon={chartIconDefinition} size='2x'/>
      </BasicBtn>
      <BasicBtn onClick={dashBtnHandler}>Dashboard</BasicBtn>
      <BasicBtn onClick={funcBtnHandler}>Functions</BasicBtn>
      <BasicBtn onClick={alloBtnHandler}>Memory</BasicBtn>
      {/* log out button clears cookies */}
      <button onClick={logOutHandler}>Log Out</button> 
      
    </>
  );
};

export default Sidebar;
