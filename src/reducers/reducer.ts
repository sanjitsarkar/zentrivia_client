import { ActionType, InitialStateType } from './../types/OtherDataTypes';

const initialState = {
  data: [],
  loading: false,
  error: "",
  isLoggedIn: false,
};


const reducer = (state:InitialStateType, action:ActionType):InitialStateType => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        loading: true,
      };
    case "SUCCESS":
      return {
        ...state,
        data: action.payload,
        loading: false,
        isLoggedIn: action?.isLoggedIn,
      };
    case "FAILURE":
      return {
        ...state,
        error: action.payload,
        loading: false,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export { initialState, reducer };
