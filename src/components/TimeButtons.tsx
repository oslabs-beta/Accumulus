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

  return (
    <>
      <h3>Time</h3>
      <FnSelectButton
        onClick={changeToHour}
        selected={props.timePeriod === '1hr'}
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