import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { BasicBtn, LogoutBtn, SideAct, MainNav, SpinBtn, SelectorBox, RegionSelect } from '../styles';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { fa-solid, fa-chart-line } from '@fortawesome/free-solid-svg-icons';

import {
  IconLookup,
  IconDefinition,
  findIconDefinition,
} from '@fortawesome/fontawesome-svg-core';

library.add(fas);

const gearLookup: IconLookup = { prefix: 'fas', iconName: 'gear' };
const gearIconDefinition: IconDefinition = findIconDefinition(gearLookup);

const RotateLookup: IconLookup = { prefix: 'fas', iconName: 'rotate' };
const RotateIconDefinition: IconDefinition = findIconDefinition(RotateLookup);

const CloudLookup: IconLookup = { prefix: 'fas', iconName: 'cloud' };
const CloudIconDefinition: IconDefinition = findIconDefinition(CloudLookup);

// coffeeIconDefinition

type Props = {
  currentView: string;
  setCurrentView: Function;
  setSyncData: Function;
  setStart: Function;
  setUserRegion: Function;
};

const Sidebar = (props: Props) => {
  const { name } = useContext(UserContext)

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

  //Button to trigger fetching of data from AWS Cloudwatch
  const syncBtnHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    // console.log('sync button clicked');
    props.setSyncData(true);
  };

  const logOutHandler = async () => {
    // console.log('log out clicked!');
    //post request to /signout
    const leaving = await fetch('/api/user/signout', {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      method: 'POST',
    });
    // console.log(leaving);

    props.setCurrentView('login');
    props.setStart(false);
    history.push('/login');
  };

  
  const updateRegion = (e: React.ChangeEvent<HTMLSelectElement>): void =>{
    props.setUserRegion(e.target.value);
  }


  return (
    <>
      <MainNav>
        <li>
          <FontAwesomeIcon icon={CloudIconDefinition} />
        </li>
        <li>accumulus</li>
        <li>
           <BasicBtn
             onClick={dashBtnHandler}
             style={{
               borderBottom:
                 props.currentView === 'dashboard'
                   ? '1px solid black'
                   : 'transparent',
             }}
           >
             Dashboard
           </BasicBtn>
         </li>
         <li>
           <BasicBtn
             onClick={funcBtnHandler}
             style={{
               borderBottom:
                 props.currentView === 'functions'
                   ? '1px solid black'
                   : 'transparent',
             }}
           >
             Functions
           </BasicBtn>
         </li>
         <li>
           <BasicBtn
             onClick={alloBtnHandler}
             style={{
               borderBottom:
                 props.currentView === 'memory'
                   ? '1px solid black'
                   : 'transparent',
             }}
           >
             Memory
           </BasicBtn>
         </li>
        <li><SideAct>Welcome</SideAct>{`${name}`}</li>
        <li><SpinBtn onClick={syncBtnHandler}><FontAwesomeIcon icon={RotateIconDefinition} size='2x'/></SpinBtn></li>
        <li><SpinBtn onClick={syncBtnHandler}><FontAwesomeIcon icon={gearIconDefinition} size='2x'/></SpinBtn>
           <ul>
           {/* <SelectorBox> */}
            {/* <RegionSelect> */}
              {/* <select onChange={updateRegion}>
                <option value='us-east-2'>Ohio (US-East-2)</option>
                <option value='us-east-1'>Virginia (US-East-1)</option>
                <option value='us-west-1'>California (US-West-1)</option>
               <option value='us-west-2'>Oregon (US-West-2)</option>
              </select> */}
            {/* </RegionSelect> */}
          {/* </SelectorBox> */}
          </ul>
        </li>
        <li><LogoutBtn onClick={logOutHandler}>Log Out</LogoutBtn></li>
      </MainNav>
    </>
  );
};
//<FontAwesomeIcon icon={RotateIconDefinition} size='2x'/>
export default Sidebar;
