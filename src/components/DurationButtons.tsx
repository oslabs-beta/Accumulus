import React, { useState, useEffect } from 'react';

const DurationButtons = () =>{
  const [duration, setDuration] = useState('')

  return(
    <>
      <button onClick={() => setDuration('1hr')}>1 Hour</button>
      <button onClick={() => setDuration('12hr')}>12 Hour</button>
      <button onClick={() => setDuration('24hr')}>24 Hour</button>
      <button onClick={() => setDuration('7d')}>1 week</button>
    </>
  )
}

export default DurationButtons;