
export const AppReducer = (state: any, action: any) => {
  switch(action.type){
    case 'CHANGE_VIEW':
      return {
        ...state,
        currentView: action.payload
      }
    default: 
      return state;
  }
}