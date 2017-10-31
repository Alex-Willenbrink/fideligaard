import * as DateActions from "../Actions/date";

const initialState = {
  minDate: null,
  maxDate: null,
  currentDate: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DateActions.SET_MIN_DATE:
      return {
        ...state,
        minDate: action.date
      };
    case DateActions.SET_MAX_DATE:
      return {
        ...state,
        maxDate: action.date
      };
    case DateActions.SET_CURRENT_DATE:
      return {
        ...state,
        currentDate: action.date
      };
    default:
      return state;
  }
};
