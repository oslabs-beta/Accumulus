import React, { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { BasicBtn, SideAct, MainNav } from './../styles';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { fa-solid, fa-chart-line } from '@fortawesome/free-solid-svg-icons';

import {
  IconLookup,
  IconDefinition,
  findIconDefinition
} from '@fortawesome/fontawesome-svg-core'

library.add(fas)

const gearLookup: IconLookup = { prefix: 'fas', iconName: 'gear' }
const gearIconDefinition: IconDefinition = findIconDefinition(gearLookup)

const chartLookup: IconLookup = { prefix: 'fas', iconName: 'chart-line' }
const chartIconDefinition: IconDefinition = findIconDefinition(chartLookup)

// coffeeIconDefinition

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
      <MainNav>
      <li><FontAwesomeIcon icon={chartIconDefinition} size='2x'/></li>
      <li><BasicBtn onClick={dashBtnHandler}>Dashboard</BasicBtn></li>
      <li><BasicBtn onClick={funcBtnHandler}>Functions</BasicBtn></li>
      <li><BasicBtn onClick={alloBtnHandler}>Memory</BasicBtn></li>
      <li><SideAct>Welcome, Christian</SideAct></li>
      <li><FontAwesomeIcon icon={gearIconDefinition} size='2x'/></li>
      </MainNav>
    </>
  );
};

export default Sidebar;
