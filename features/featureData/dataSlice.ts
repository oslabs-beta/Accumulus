import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { AppState, AppThunk } from '../../app/store'
import { fetchData } from './dataAPI'

export interface DataState {
  data: any
}

const initialState: DataState = {
  data: 'default state'
}

//-----DEFAULT STATE FOR USER DATA---------------

// interface IData {
//   functionNames?: string[];
//   data?: {
//     [key:string]: {[key:string]: string | number}[]
//   };
//   receivedData?: () => any;
//   children?: React.ReactNode;
// }

// const defaultState = {
//   functionNames: ['name1', 'name2', 'name3', 'name4', 'name5'],
//   data: {
//     invocations:[{
//       month:'Jan',
//       day: 0,
//       name1: 'testName',
//     }]
//   }
// }

export const fetchDataAsync = createAsyncThunk(
  'data/fetchData',
  async(userInfo: any) => {
    const response = await fetchData(userInfo)
    return response.data
  }
)

export const dataSlice = createSlice({
  name: 'data slice',
  initialState,
  reducers: {
    print: (state) => {
      console.log(state, 'this is the state from the reducer in dataSlice')
    },

  }
});

export const { print } = dataSlice.actions;

export const selectData = (state: AppState) => state.counter.value

export default dataSlice.reducer;