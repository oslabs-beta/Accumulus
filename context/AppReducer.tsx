
export const AppReducer = (state: any, action: any) => {
  console.log('entered AppReducer')
  switch(action.type){
    case 'CHANGE_VIEW':
      return {
        ...state,
        testView: action.payload
      }
    default: 
      return state;
  }
}