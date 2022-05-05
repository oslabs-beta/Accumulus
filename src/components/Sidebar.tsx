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

library.add(fas)

const lambdaLookup: IconLookup = { prefix: 'fas', iconName: 'lambda' }
const lambdaIconDefinition: IconDefinition = findIconDefinition(lambdaLookup)

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
      <BasicBtn>

        <FontAwesomeIcon icon={chartIconDefinition} size='2x'/>
      </BasicBtn>
      <BasicBtn onClick={dashBtnHandler}>Dashboard</BasicBtn>
      <BasicBtn onClick={funcBtnHandler}>Functions</BasicBtn>
      <BasicBtn onClick={alloBtnHandler}>Memory</BasicBtn>
    </>
  );
};

export default Sidebar;
