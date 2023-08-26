import React from "react";
import {DateRange as BaseDateRange, DateRangeProps as BaseDateRangeProps} from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import DateRangeStyled from "./DateRangeStyled";

interface DateRangeProps extends BaseDateRangeProps {}

const DateRange = (props: DateRangeProps) => {
  return (
    <DateRangeStyled>
      <BaseDateRange {...props}/>
    </DateRangeStyled>
  );
};

export default DateRange;