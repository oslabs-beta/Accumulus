import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {print, selectData} from './dataSlice';

function DataDisplay(){
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectData);
  const [ storedData, setStoredData] = useState('default from Data.tsx');

  
  return (
    <div>
      <button onClick={()=>dispatch(print())}>Click for Data!</button>
    <span>{data}</span>
    <span>{storedData}</span>
    </div>
  )
}

export default DataDisplay;