import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import * as Reducers from "../Reducers";

export default () =>
  createStore(combineReducers({ ...Reducers }), applyMiddleware(thunk));
