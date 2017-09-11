import { StocksActions } from "../Actions";

const initialState = {
  stocksData: {},
  isFetching: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case StocksActions.REQUEST_GET_STOCKS:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case StocksActions.FAILURE_GET_STOCKS:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case StocksActions.SUCCESS_GET_STOCKS:
      return {
        ...state,
        isFetching: false,
        stocksData: action.data
      };
    default:
      return state;
  }
};
