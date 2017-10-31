import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";

import * as DateActions from "../Actions/date";
import DateWidget from "../Components/DateWidget";

class DateWidgetContainer extends Component {
  // state = {
  //   minDate: this.props.minDate,
  //   maxDate: this.props.maxDate,
  //   currentDate: this.props.minDate
  //   maxValue: this.props.maxDate).diff(
  //     this.props.minDate,
  //     "days"
  // };

  componentDidMount() {
    this.props.DateActions.setMinDate("2016-01-01");
    this.props.DateActions.setCurrentDate("2016-01-01");
    this.props.DateActions.setMaxDate("2016-12-31");
  }

  onDateChange = (e, value) => {
    this.props.DateActions.setCurrentDate(
      this.props.DateReducers.minDate
        .clone()
        .add(value, "days")
        .format("YYYY-MM-DD")
    );
  };

  calcMaxDateValue = (minDate, maxDate) => {
    return minDate && maxDate ? maxDate.diff(minDate, "days") : null;
  };

  render() {
    const { minDate, maxDate, currentDate } = this.props.DateReducers;
    const dateWidget =
      minDate && maxDate && currentDate
        ? <DateWidget
            minDate={minDate}
            maxDate={maxDate}
            currentDate={currentDate}
            minValue={0}
            maxValue={this.calcMaxDateValue(minDate, maxDate)}
            onDateChange={this.onDateChange}
          />
        : null;
    return (
      <div>
        {dateWidget}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    DateReducers: state.DateReducers
  };
};

const mapDispatchToProps = dispatch => ({
  DateActions: bindActionCreators(DateActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(
  DateWidgetContainer
);
