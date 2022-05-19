import React from 'react';
import { memUsedVsAllo } from '../../Data/byFunc/memUsedVsAllo';
import { MemUsed } from '../../server/types';

// const fetchedData = memUsedVsAllo;

interface IMemReduction{
  memUsedVsAllo: {[key: string]: string | number}[]
}

const MemReduction = (props:IMemReduction) => {
  //declare var to hold all divs
  // const fetchedData = props.memUsedVsAllo
  const eligibleFuncs = [];
  const memRatioOrdered = [];

  for (let i = 0; i < props.memUsedVsAllo.length; i++) {
    const objOfInterest = props.memUsedVsAllo[i];
    const funcName = objOfInterest.name;
    const diff: number = Number(objOfInterest[`diff${funcName}`]);
    const allocated: number = Number(props.memUsedVsAllo[i][`allo${funcName}`]);
    const memRatio = Math.floor((diff / allocated) * 100);
    if (memRatio > 80) {
      memRatioOrdered.push([funcName, memRatio]);
    }
  }
  memRatioOrdered.sort((a, b) => {
    if (a[1] < b[1]) return 1;
    if (a[1] > b[1]) return -1;
    else return 0;
  });

  for (let i = 0; i < memRatioOrdered.length; i++) {
    eligibleFuncs.push(
      <li style={{ color: 'black' }} key={`${memRatioOrdered[i]}`}>
        Function {memRatioOrdered[i][0]} qualifies for lower memory allocation.
        <br />
        There is {memRatioOrdered[i][1]}% of free memory space.
      </li>
    );
  }

  return <>{eligibleFuncs}</>;
};

export default MemReduction;
