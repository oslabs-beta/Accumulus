import React, { useState, useEffect } from 'react';
import { FnSelectButton } from '../styles';

type Props = {
  setTimePeriod: Function;
};

const TimeButtons = ({setTimePeriod}: Props) =>{

  const changeToHour = () =>{
    setTimePeriod('1hr');
  }

  const changeToHalfDay = () =>{
    setTimePeriod('12hr');
  }

  const changeToFullDay = () =>{
    setTimePeriod('24hr');
  }

  const changeToWeek = () => {
    setTimePeriod('7d');
  }

  return(
    <>
      <h3>Time</h3>
      <FnSelectButton onClick={changeToHour}>1 Hour</FnSelectButton>
      <FnSelectButton onClick={changeToHalfDay}>12 Hour</FnSelectButton>
      <FnSelectButton onClick={changeToFullDay}>24 Hour</FnSelectButton>
      <FnSelectButton onClick={changeToWeek}>1 week</FnSelectButton>
    </>
  )
}

export default TimeButtons;