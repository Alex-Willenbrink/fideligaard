import React from "react";
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

const DateWidget = ({
  minDate,
  maxDate,
  currentDate,
  minValue,
  maxValue,
  onDateChange
}) =>
  <div className="slider-container">
    <p className="date-slider-label">
      {minDate.format("MM/DD/YYYY")}
    </p>
    <Slider
      min={minValue}
      max={maxValue}
      defaultValue={minValue}
      onChange={onDateChange}
      step={1}
      name="dateValue"
      className="date-slider"
      label={
        <div style={styles.labelStyleOuter}>
          <div style={styles.labelStyleInner}>
            {currentDate.format("MM/DD/YYYY")}
          </div>
        </div>
      }
    />
    <p className="date-slider-label">
      {maxDate.format("MM/DD/YYYY")}
    </p>
  </div>;

export default DateWidget;
