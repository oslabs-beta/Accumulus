import React, { createContext, useContext } from 'react';


interface IData {
  functionNames: string[];
  data: {[key:string]: object[{[key:string]: string | number}]}
}

const defaultState = {
  functionNames: ['name1', 'name2', 'name3', 'name4', 'name5'],
  data: [invocations:[{month:'Jan'}]]
}

const DataContext = createContext<Partial<IData>>({});

export function AppWrapper(){
  const sharedState: {[key:string]: string| number } = {
    //datafetched goes in here;
  }

  return(
    <>
      <DataContext.Provider value={ sharedState }>
        
      </DataContext.Provider>
    </>
  );

}

export function useDataContext(){
  return useContext(DataContext);
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