import React, { Component } from "react";

// import Slider from "material-ui/Slider";
import moment from "moment";
import Slider from "material-ui-slider-label/Slider";
import "./DateWidget.css";
import { cyan500 } from "material-ui/styles/colors";

const styles = {
  labelStyleOuter: {
    width: "70px",
    height: "70px",
    borderRadius: "50% 50% 50% 0",
    background: cyan500,
    position: "absolute",
    transform: "rotate(-45deg)",
    top: "-90px",
    left: "-27px"
  },
  labelStyleInner: {
    transform: "rotate(45deg)",
    color: "white",
    textAlign: "center",
    position: "relative",
    marginTop: "25px",
    fontSize: "12px"
  }
};

class DateWidget extends Component {
  constructor(props) {
    super(props);

    // date inputs are strings formatted: "YYYY-MM-DD"
    this.state = {
      minDate: moment(this.props.minDate),
      maxDate: moment(this.props.maxDate),
      currDate: moment(this.props.minDate),
      minValue: 0,
      maxValue: moment(this.props.maxDate).diff(
        moment(this.props.minDate),
        "days"
      ),
      currValue: 0
    };
  }

  onDateChange = (e, value) => {
    this.setState({
      currDate: this.state.minDate.clone().add(value, "days"),
      currValue: value
    });
  };

  render() {
    return (
      <div className="slider-container">
        <p className="date-slider-label">
          {this.state.minDate.format("MM/DD/YYYY")}
        </p>
        <Slider
          min={this.state.minValue}
          max={this.state.maxValue}
          defaultValue={this.state.minValue}
          onChange={this.onDateChange}
          step={1}
          name="dateValue"
          className="date-slider"
          label={
            <div style={styles.labelStyleOuter}>
              <div style={styles.labelStyleInner}>
                {this.state.currDate.format("MM/DD/YYYY")}
              </div>
            </div>
          }
        />
        <p className="date-slider-label">
          {this.state.maxDate.format("MM/DD/YYYY")}
        </p>
      </div>
    );
  }
}

export default DateWidget;
