import React, {useEffect} from "react";
import {
  Box,
  TextField,
  Slider,
  Stack,
  Typography
} from "@mui/material";

interface AmountRangeSliderProps {
  value: number[];
  onChange?: (val: number[]) => void;
}

export default function AmountRangeSlider(props: AmountRangeSliderProps) {
  const {value: defaultValue = [0, 50000000], onChange} = props;

  const [value, setValue] = React.useState<number[]>(defaultValue);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  useEffect(() => {
    onChange && onChange(value);
  }, [value]);

  return (
    <Box sx={{px: '5px'}}>
      <Stack
        direction="row"
        divider={<Typography>~</Typography>}
        spacing={1}
        alignItems="center"
      >
        <TextField inputProps={{sx: {px: '5px!important'}}} id="outlined-basic" label="From" variant="outlined" value={value[0]} />
        <TextField inputProps={{sx: {px: '5px!important'}}} id="outlined-basic" label="To" variant="outlined" value={value[1]} />
      </Stack>
      <Slider
        step={10000000}
        marks
        max={100000000}
        value={value}
        onChange={handleChange}
      />
    </Box>
  );
}