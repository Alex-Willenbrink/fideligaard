export const TRADE_TRANSACTION_REQUEST = "TRADE_TRANSACTION_REQUEST";
export const TRADE_TRANSACTION_FAILURE = "TRADE_TRANSACTION_FAILURE";
export const TRADE_TRANSACTION_SUCCESS = "TRADE_TRANSACTION_SUCCESS";

export const tradeTransactionRequest = () => ({
  type: TRADE_TRANSACTION_REQUEST
});

export const tradeTransactionFailure = errorMsg => ({
  type: TRADE_TRANSACTION_FAILURE,
  payload: errorMsg
});

export const tradeTransactionSuccess = transaction => ({
  type: TRADE_TRANSACTION_SUCCESS,
  payload: transaction
});

export const tradeTransaction = transaction => dispatch => {
  dispatch(tradeTransactionRequest());

  try {
    dispatch(tradeTransactionSuccess(transaction));
  } catch (error) {
    dispatch(tradeTransactionFailure(error));
  }
};
