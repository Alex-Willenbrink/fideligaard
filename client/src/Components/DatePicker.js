import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// date is in moment

const DatePickerCalendar = ({ date, handler }) => {
  return (
    <DatePicker dateFormat="YYYY/MM/DD" selected={date} onChange={handler} />
  );
};

export default DatePickerCalendar;
