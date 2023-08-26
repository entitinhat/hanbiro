import React, { useEffect, useMemo, useRef, useState } from 'react';

import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Input,
  InputBase,
  Radio,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import _ from 'lodash';
interface ColorPickerProps {
  onChange?: (value: string) => void;
  value: string;
  type: string;
}

const ColorPicker: React.FC<ColorPickerProps> = (props: ColorPickerProps) => {
  const { type = 'text', value, onChange } = props;
  const [color, setColor] = useState(value);
  const setColorDebounced = useRef(_.debounce((color) => onChange && onChange(color), 500)).current;
  const handleChangeColor = (event: any) => {
    setColor(event.target.value);
    setColorDebounced(event.target.value);
  };

  useEffect(() => {
    setColor(value);
  }, [value]);

  const getTypeColorPicker = () => {
    switch (type) {
      case 'color': {
        return <FormatColorTextIcon fontSize="small" sx={{ color: `${color}` }} />;
      }

      case 'background-color': {
        return <FormatColorFillIcon fontSize="small" sx={{ color: `${color}` }} />;
      }
      default: {
        return <BorderColorIcon fontSize="small" sx={{ color: `${color}` }} />;
      }
    }
  };

  //render
  return (
    <Box sx={{ position: 'relative', margin: '0 5px'}}>
      {getTypeColorPicker()}
      <InputBase
        onClick={(event: any) => {
          event.stopPropagation();
        }}
        value={color}
        onChange={handleChangeColor}
        fullWidth
        sx={{ opacity: 0, position: 'absolute', top: '0', left: '0', cursor: 'pointer' }}
        type="color"
      />
    </Box>
  );
};

export default ColorPicker;
