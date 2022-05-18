import React, { useState, useEffect } from 'react';
import { FnSelectButton, BasicBtn } from '../styles';

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

  return (
    <>
      {/* <h3 style={{ color: '#efefef' }}>Time</h3> */}
      <h3>Time</h3>
      <FnSelectButton onClick={changeToHour}>1 Hour</FnSelectButton>
      <FnSelectButton onClick={changeToHalfDay}>12 Hour</FnSelectButton>
      <FnSelectButton onClick={changeToFullDay}>24 Hour</FnSelectButton>
      <FnSelectButton onClick={changeToWeek}>1 week</FnSelectButton>
      {/*<h3 style={{ color: '#efefef' }}>Regions</h3>
      <FnSelectButton>US East (N. VA)</FnSelectButton>
      <FnSelectButton>US East (Ohio)</FnSelectButton>
      <FnSelectButton>GovCloud (US-East)</FnSelectButton>
      <FnSelectButton>Canada (Central)</FnSelectButton>
      <FnSelectButton>US West (N. CA)</FnSelectButton>
      <FnSelectButton>US West (OR)</FnSelectButton>
      <FnSelectButton>GovCloud (US-West)</FnSelectButton> */}
    </>
  );
}

export default TimeButtons;