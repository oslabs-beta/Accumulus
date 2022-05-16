import React, { useEffect, useState } from 'react';
import StackedBarFnGraph from '../components/StackedBarFnGraph';
import AlloFunctionSelector from '../components/MemFnSelector';
import MemReduction from '../components/MemReduction';
import Sidebar from '../components/Navbar';
import {
  SideBarDiv,
  FnGrid,
  MemoryGrid,
  FnGraphContainer,
  FnSideBarWrapper,
  MemoryReductionContainer
} from '../styles';

type Props = {
  setCurrentView: Function;
  memUsedVsAllo: object[];
};

const Allocations = ({ setCurrentView, memUsedVsAllo }: Props) => {
  const [onStacked, setOnStacked] = useState([{ name: 'Select a function' }]);

  /*

  onFunction signature
  {
    funcName: color,
    funcName: color,
    ...
  }

  onMemories signature
  [
    {
      name: 'AccumulusFunc1',
      used: 35,
      allocated1: 128,
      difference1: 95,
    },
    {
      name: 'AccumulusFunc2',
      used: 192,
      allocated2: 256,
      difference2: 64,
    },
  ]

  iterate through onMemories
  look for name value = function you're deleting
  copy value at index+1
  loop until end
  pop last element 

  }


  */

  const functions = {
    names: [
      'AccumulusFunc1',
      'AccumulusFunc2',
      'AccumulusFunc3',
      'AccumulusFunc4',
      'AccumulusFunc5',
    ],
  };

  return (
    <>
      <MemoryGrid>
        <SideBarDiv>
          <FnSideBarWrapper>
          <AlloFunctionSelector
            {...functions}
            onStacked={onStacked}
            setOnStacked={setOnStacked}
            data={memUsedVsAllo}
          />
         </FnSideBarWrapper>
        </SideBarDiv>
        <FnGraphContainer>
          <StackedBarFnGraph
            onStacked={onStacked}
            name={'Excess Memory Allocated'}
            width={'100%'}
            height={300}
          />
        </FnGraphContainer>
        <MemoryReductionContainer>
          <MemReduction />
        </MemoryReductionContainer>
      </MemoryGrid>
    </>
  );
};

export default Allocations;
