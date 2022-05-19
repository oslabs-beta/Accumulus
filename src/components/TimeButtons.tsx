import React, { useState, useEffect } from 'react';
import { FnSelectButton, BasicBtn } from '../styles';

type Props = {
  timePeriod: string
  setTimePeriod: Function;
};

const TimeButtons = (props: Props) =>{

  const changeToHour = () =>{
    props.setTimePeriod('1hr');
  }

  const changeToHalfDay = () =>{
    props.setTimePeriod('12hr');
  }

  const changeToFullDay = () =>{
    props.setTimePeriod('24hr');
  }

  const changeToWeek = () => {
    props.setTimePeriod('7d');
  }

  // const hoverBackground = (e: React.MouseEvent) => {
  //   console.log(1);
  //   (e.target as HTMLElement).style.background = 'red'
  // }

  // const unHoverBackground = (e: React.MouseEvent) => {
  //   console.log(1);
  //   (e.target as HTMLElement).style.background = 'red';
  // };

  return (
    <>
      {/* <h3 style={{ color: '#efefef' }}>Time</h3> */}
      <h3>Time</h3>
      <FnSelectButton
        onClick={changeToHour}
        selected={props.timePeriod === '1hr'}
        // style={{
        //   backgroundColor: props.timePeriod === '1hr' ? '#9b4ac6' : '#a674c1',
        // }}
      >
        1 Hour
      </FnSelectButton>
      <FnSelectButton
        onClick={changeToHalfDay}
        selected={props.timePeriod === '12hr'}
      >
        12 Hour
      </FnSelectButton>
      <FnSelectButton
        onClick={changeToFullDay}
        selected={props.timePeriod === '24hr'}
      >
        24 Hour
      </FnSelectButton>
      <FnSelectButton
        onClick={changeToWeek}
        selected={props.timePeriod === '7d'}
      >
        1 week
      </FnSelectButton>
    </>
  );
}

export default TimeButtons;