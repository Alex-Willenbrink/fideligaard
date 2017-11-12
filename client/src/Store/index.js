import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import * as Reducers from "../Reducers";

export default () =>
  createStore(
    combineReducers({ ...Reducers }),
    composeWithDevTools(applyMiddleware(thunk))
  );
