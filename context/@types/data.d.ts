
//type definitions for Context


export type DataContextState = {
  funcNames?: string[];
  start: boolean;
  userRegion?: string;
  totalInvocations?: number[];
  totalErrors?: number[];
  totalCost?: number[];
  slowestFuncs: string[],
  mostErroredFuncs: string[],
  errorMsgs: string[],
  memUsedVsAllo: string[],
  invocations: number[],
  duration: number[],
  errors: number[],
  memUsage: number[],
  cost: number[],
  throttles: number[],
  timePeriod: string,
  syncData: boolean, 
  currentView: string,

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