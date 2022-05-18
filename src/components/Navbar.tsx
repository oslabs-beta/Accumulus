import React, { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { BasicBtn, LogoutBtn, SideAct, MainNav } from '../styles';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { fa-solid, fa-chart-line } from '@fortawesome/free-solid-svg-icons';

import {
  IconLookup,
  IconDefinition,
  findIconDefinition,
} from '@fortawesome/fontawesome-svg-core';

library.add(fas);

const gearLookup: IconLookup = { prefix: 'fas', iconName: 'gear' }
const gearIconDefinition: IconDefinition = findIconDefinition(gearLookup)

const chartLookup: IconLookup = { prefix: 'fas', iconName: 'chart-line' };
const chartIconDefinition: IconDefinition = findIconDefinition(chartLookup);

const BrainLookup: IconLookup = { prefix: 'fas', iconName: 'brain' };
const BrainIconDefinition: IconDefinition = findIconDefinition(BrainLookup);



// coffeeIconDefinition

type Props = {
  setCurrentView: Function;
};

const Sidebar = (props: Props) => {
  let history = useHistory();

  const dashBtnHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    props.setCurrentView('dashboard');
    history.push('/home');
  };

  const funcBtnHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    props.setCurrentView('functions');
    history.push('/functions');
  };

  const alloBtnHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    props.setCurrentView('memory');
    history.push('/memory');
  };

  const logOutHandler = async () => {
    console.log('log out clicked!');
    //post request to /signout
    const leaving = await fetch('/api/user/signout', {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      method: 'POST',
    });
    console.log(leaving);

    // setCurrentView('login');
    history.push('/login');
  };

  return (
    <>
      <MainNav>
        <li><FontAwesomeIcon icon={BrainIconDefinition} size='2x'/></li>
        <li>Accumulus</li>
        <li><BasicBtn onClick={dashBtnHandler}>Dashboard</BasicBtn></li>
        <li><BasicBtn onClick={funcBtnHandler}>Functions</BasicBtn></li>
        <li><BasicBtn onClick={alloBtnHandler}>Memory</BasicBtn></li>
        <li><SideAct>Welcome, Christian</SideAct></li>
        <li><LogoutBtn onClick={logOutHandler}>Log Out</LogoutBtn></li>
        <li><FontAwesomeIcon icon={gearIconDefinition} size='2x'/></li>
      </MainNav>
    </>
  );
};

export default Sidebar;
