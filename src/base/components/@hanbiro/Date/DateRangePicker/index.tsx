import React, {ChangeEvent, useEffect, useState} from 'react';
import {Box, IconButton, InputAdornment, Popover, TextField} from "@mui/material";
import {RangeKeyDict} from "react-date-range";
import {DateRangeOutlined} from "@mui/icons-material";
import dayjs from "dayjs";
import {isDateEqual} from "@analytic/main/utils/date";
import {RangeDate as BaseRangeDate} from "@base/types/date";
import DateRange from "./DateRange";

export interface RangeDate extends Partial<BaseRangeDate>{}

interface DateRangePickerProps extends RangeDate {
  dateFormat?: string;
  onChange?: (startDate?: RangeDate['startDate'], endDate?: RangeDate['endDate']) => void;
  rangeSplitter?: string;
  disabled?: boolean | undefined;
  readOnly?: boolean | undefined;
}

const DateRangePicker = (props: DateRangePickerProps) => {
  const {
    dateFormat = 'YYYY/MM/DD',
    rangeSplitter = '-',
    onChange,
    disabled,
    readOnly = true,
    startDate,
    endDate
  } = props;

  const [displayCalendar, setDisplayCalendar] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [fromDate, setFromDate] = useState<RangeDate['startDate']>(startDate);
  const [toDate, setToDate] = useState<RangeDate['endDate']>(endDate);

  useEffect(() => {
    if((startDate && !fromDate) || (startDate && fromDate && !isDateEqual(startDate, fromDate))){
      setFromDate(startDate);
    }
    if((endDate && !toDate) || (endDate && toDate && !isDateEqual(endDate, toDate))){
      setToDate(endDate);
    }
  }, [startDate, endDate]);

  const onPopoverClose = () => {
    setDisplayCalendar(false);
    setAnchorEl(null);
  };

  const onAdornmentClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if(displayCalendar){
      onPopoverClose();
    } else {
      setDisplayCalendar(true);
      setAnchorEl(e.currentTarget);
    }
  };

  const processInputValue = (value: string) => {
    let [fromDateString, toDateString] = value.split(rangeSplitter).map(elm => elm.trim());

    const fromDate = dayjs(fromDateString, dateFormat).isValid() ? dayjs(fromDateString, dateFormat).toDate() : undefined;
    const toDate = dayjs(toDateString, dateFormat).isValid() ? dayjs(toDateString, dateFormat).toDate() : undefined;

    return {fromDate, toDate};
  };

  const onInputChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const inputValue = e.target.value;
    const {fromDate, toDate} = processInputValue(inputValue);

    setInputValue(inputValue);
    setFromDate(fromDate);
    setToDate(toDate);
  };

  const makeInputValue = (startDate: Date|undefined, endDate: Date|undefined): string => {
    let inputValue = '';
    if (startDate) {
      inputValue += dayjs(startDate).format(dateFormat);
    }
    if (endDate) {
      inputValue += ` ${rangeSplitter} ` + dayjs(endDate).format(dateFormat);
    }
    return inputValue;
  }

  const onSelectDateRanges = ({selection}: RangeKeyDict) => {
    const startDate = dayjs(selection.startDate).isValid() ? dayjs(selection.startDate).toDate() : undefined;
    const endDate = dayjs(selection.endDate).isValid() ? dayjs(selection.endDate).toDate() : undefined;

    setFromDate(startDate);
    setToDate(endDate);
  };

  useEffect(() => {
    if(fromDate && toDate){
      let inputValue = makeInputValue(fromDate, toDate);
      setInputValue(inputValue);
      onChange && onChange(fromDate, toDate);
    }
  }, [fromDate, toDate]);

  return (
    <Box>
      <TextField
        fullWidth={true}
        value={inputValue}
        InputProps={{
          readOnly,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={onAdornmentClick} disabled={disabled}>
                <DateRangeOutlined fontSize="small" sx={{width: 16, height: 16}}/>
              </IconButton>
            </InputAdornment>
          ),
          size: "small",
          sx: {pr: 0}
        }}
        onChange={onInputChange}
        disabled={disabled}
        size="small"
        sx={{width: '250px'}}
      />
      <Popover
        open={displayCalendar}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
        onClose={onPopoverClose}
      >
        <DateRange
          ranges={[
            {
              startDate: fromDate,
              endDate: toDate,
              key: "selection"
            }
          ]}
          onChange={onSelectDateRanges}
          maxDate={new Date()}
          showMonthAndYearPickers={true}
          moveRangeOnFirstSelection={false}
          showDateDisplay={false}
          showPreview={true}
          scroll={{enabled: true}}
        />
      </Popover>
    </Box>
  );
};

export default DateRangePicker;