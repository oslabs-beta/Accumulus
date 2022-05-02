import React, { useState, FC } from 'react';


interface IData {
  functionNames?: string[];
  data?: {
    [key:string]: {[key:string]: string | number}[]
  };
  receivedData?: () => any;
  children?: React.ReactNode;
}

const defaultState = {
  functionNames: ['name1', 'name2', 'name3', 'name4', 'name5'],
  data: {
    invocations:[{
      month:'Jan',
      day: 0,
      name1: 'testName',
    }]
  }
}

const DataContext = React.createContext<IData>(defaultState);

export const AppWrapper:FC<IData> = ({children}) => {
  const [data, setData] = useState(defaultState.data)


  //Do we need to put in parameter so when receivedData is called, 
  //it puts in the fetch request data and set that to data state?
  const receivedData = () => {
    setData(data);
    console.log(`Data inside setData: ${data}`);
  }

  return(
    <>
      <DataContext.Provider value={ {data, receivedData} }>
        {children}
      </DataContext.Provider>
    </>
  );

}

export function useDataContext(){
  return React.useContext(DataContext);
}


// Landing Page
// 	-Nav Menu 
// 		-Registration Page
// 		- Log In
// 			-Dashboard —-GET request for user data here?
// 				-Dash Nav Menu
// 					-Functions Page
// 					-Step Functions Page
// 					-Cost Analysis Page
					


// Matts Data Baby
// { 
//   functionNames: [name1, name2, …], 
//   data: { 
//     invocations: [{ 
//       ‘month’: ‘Jan’, 
//       ‘day’: 0, … ,
//       name1: value,
//       name2: value
//     }],
//     duration: { ... }
//   }
// }
