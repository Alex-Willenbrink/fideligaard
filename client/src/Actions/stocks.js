export const REQUEST_GET_STOCK = "REQUEST_GET_STOCK";
export const SUCCESS_GET_STOCK = "SUCCESS_GET_STOCK";
export const FAILURE_GET_STOCK = "SUCCESS_GET_STOCK";

const requestGetStock = () => ({
  type: REQUEST_GET_STOCK
});

const successGetStock = data => ({
  type: SUCCESS_GET_STOCK,
  data
});

const failureGetStock = error => ({
  type: FAIULRE_GET_STOCK
});

export const getStock = () => async dispatch => {
  dispatch(requestGetStock());
  let url = "api/stock/";
  let result;

  try {
    result = await fetch(url);
    result = await result.json();
    dispatch(successGetStock(result));
  } catch (err) {
    dispatch(failureGetStock(err));
  }
};
