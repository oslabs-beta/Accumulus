
//type definitions for Context


export type DataContextState = {
  funcNames?: string[];
  start?: boolean;
  userRegion?: string;
  totalInvocations?: object[];
  totalErrors?: object[];
  totalCost?: object[];
  slowestFuncs?: object[],
  mostErroredFuncs?: object[],
  errorMsgs?: object[],
  memUsedVsAllo?: object[],
  invocations?: object[],
  duration?: object[],
  errors?: object[],
  memUsage?: object[],
  cost?: object[],
  throttles?: object[],
  timePeriod?: string,
  syncData?: boolean, 
  currentView?: string,

  metricType?: string,
  dataSum?: string,

  //user state
  nameReg?: string,
  emailReg?: string,
  passwordReg?: string,
  arnReg?: string,
  //userRegion is above
  EXTERNAL_ID?: string,
  email?: string,
  password?: string,

  changeView?: function,

}

export type DataProviderProps ={
  children: React.ReactNode
}




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