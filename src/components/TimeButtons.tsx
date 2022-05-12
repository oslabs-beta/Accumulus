import React, { useState, useEffect } from 'react';

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
      <button onClick={changeToHour}>1 Hour</button>
      <button onClick={changeToHalfDay}>12 Hour</button>
      <button onClick={changeToFullDay}>24 Hour</button>
      <button onClick={changeToWeek}>1 week</button>
    </>
  )
}

export default TimeButtons;