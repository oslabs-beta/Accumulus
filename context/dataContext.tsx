// dataContext is not being used, but is here for a future iteration

import React, { useMemo, useState, FC, createContext, useContext, useReducer } from 'react';
import { DataContextState, DataProviderProps } from './@types/data';
import { AppReducer } from './AppReducer';

const defaultState = {
  funcNames: ['func1', 'func2', 'func3'],
  start: false, 
  userRegion: 'us-east-2',
  //dashboard- all funcs hooks
  totalInvocations: [],
  totalErrors: [],
  totalCost: [],
  //dashboard - by func hooks
  slowestFuncs: [],
  mostErroredFuncs: [],
  errorMsgs: [],
  memUsedVsAllo: [],
  //functions
  invocations: [],
  duration: [],
  errors: [],
  memUsage: [],
  cost: [],
  throttles: [],
  timePeriod: '7d',
  syncData: false, 
  currentView: 'splash',
  metricType: 'Invocations',
  dataSum: 'Sum',
  //user state
  nameReg: '',
  emailReg: '',
  passwordReg: '',
  arnReg: '',
  //userRegion is above
  EXTERNAL_ID: '',
  email: '',
  password: '',
  //testing global name
  globalName: '',
  setGlobalName: ()=>{},
}

export const DataContext = createContext<DataContextState>(defaultState);

// export const DataProvider: FC<{children: any}> = ({ children }) => {
//   const [state, dispatch] = useReducer(AppReducer, defaultState);

//   //add actions here?
//   // function changeView(view: string){
//   //   console.log('entered changeView')
//   //   dispatch({
//   //     type: 'CHANGE_VIEW',
//   //     payload: view
//   //   })
//   // }

//   const [globalName, setGlobalName ] = useState('mark test');

//   const val:any = useMemo(
//     ()=>({globalName, setGlobalName}),
//     [globalName]
//   )
 
//   return (
//     <DataContext.Provider 
//     value={{ 
//       globalName: state.globalName,
//       setGlobalName: state.setGlobalName,
//      }}>
    
//       { children }
//     </DataContext.Provider>
//   );
// };











//------------GRAVEYARD------


// // interface IData {
// //   functionNames?: string[];
// //   stuff?: {
// //     invocations?: {
// //       month: string;
// //       day: number;
// //       name1: string;
// //     }[];
// //   };
// // }

// interface IDataContext {
//   // data?: IData;
//   data: string;
//   receivedData?: (arg: string) => void;
// }

// const defaultState: IDataContext = {
//   // data: {
//   //   functionNames: ['name1', 'name2', 'name3', 'name4', 'name5'],
//   //   stuff: {
//   //     invocations: [
//   //       {
//   //         month: 'Jan',
//   //         day: 0,
//   //         name1: 'testName',
//   //       },
//   //     ],
//   //   }
//   // }
//   data: 'Hello',
// };



// interface Props {
//   children: React.ReactNode;
// }

// export const AppWrapper = ({ children }: Props) => {
//   const [data, setData] = useState(defaultState.data);

//   //Do we need to put in parameter so when receivedData is called,
//   //it puts in the fetch request data and set that to data state?
//   const receivedData = (arg: string) => {
//     setData(arg);
//     console.log(`Data inside setData: ${data}`);
//   };

//   return (
//     <>
//       <DataContext.Provider value={{ data, receivedData }}>
//         {children}
//       </DataContext.Provider>
//     </>
//   );
// };

// export function useDataContext() {
//   return React.useContext(DataContext);
// }

// // Landing Page
// // 	-Nav Menu
// // 		-Registration Page
// // 		- Log In
// // 			-Dashboard —-GET request for user data here?
// // 				-Dash Nav Menu
// // 					-Functions Page
// // 					-Step Functions Page
// // 					-Cost Analysis Page

// // Matts Data Baby
// // {
// //   functionNames: [name1, name2, …],
// //   data: {
// //     invocations: [{
// //       ‘month’: ‘Jan’,
// //       ‘day’: 0, … ,
// //       name1: value,
// //       name2: value
// //     }],
// //     duration: { ... }
// //   }
// // }
