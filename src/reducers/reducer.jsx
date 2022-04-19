const initialState = {
  data: [],
  loading: false,
  erorr: "",
};
const reducer = (state, action) => {
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
      };
    case "FAILURE":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export { initialState, reducer };
