export const REQUEST_GET_STOCKS = "REQUEST_GET_STOCKS";
export const SUCCESS_GET_STOCKS = "SUCCESS_GET_STOCKS";
export const FAILURE_GET_STOCKS = "FAILURE_GET_STOCKS";

export const requestGetStocks = () => ({
  type: REQUEST_GET_STOCKS
});

export const successGetStocks = data => ({
  type: SUCCESS_GET_STOCKS,
  data
});

export const failureGetStocks = error => ({
  type: FAILURE_GET_STOCKS
});

export const getStocks = () => async dispatch => {
  dispatch(requestGetStocks());
  let url = "api/stocks/";
  let result;

  try {
    result = await fetch(url);
    result = await result.json();
    dispatch(successGetStocks(result));
  } catch (err) {
    dispatch(failureGetStocks(err));
  }
};
