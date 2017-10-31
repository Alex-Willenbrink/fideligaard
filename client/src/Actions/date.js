import moment from "moment";

export const SET_MIN_DATE = "SET_MIN_DATE";
export const SET_MAX_DATE = "SET_MAX_DATE";
export const SET_CURRENT_DATE = "SET_CURRENT_DATE";

// date string format: "YYYY-MM-DD"
export const setMinDate = date => ({
  type: SET_MIN_DATE,
  date: moment(date)
});

export const setMaxDate = date => ({
  type: SET_MAX_DATE,
  date: moment(date)
});

export const setCurrentDate = date => ({
  type: SET_CURRENT_DATE,
  date: moment(date)
});
