import React, { useEffect, useMemo, useRef, useState } from 'react';

import { Autocomplete, Box, FormControl, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import _ from 'lodash';

interface TextFieldGTSrops {
  onChange?: (value: any) => void;
  value: string;
  type: string;
  unit?: string;
  placeholder?: string;
  sx?: any;
}

const TextFieldGTS: React.FC<TextFieldGTSrops> = (props: TextFieldGTSrops) => {
  const { value, onChange, type, unit, placeholder, sx } = props;
  const [searchQuery, setSearchQuery] = useState('');
  const setSearchTextDebounced = useRef(_.debounce((searchText) => onChange && onChange(searchText), 1000)).current;
  const handleValueChange = (event: any) => {
    const value: string = event.target.value;
    setSearchQuery(value);
    setSearchTextDebounced(value);
  };

  useEffect(() => {
    setSearchQuery(value);
  }, [value]);
  //render
  return (
    <TextField
      placeholder={placeholder}
      InputProps={{
        endAdornment: unit && <InputAdornment position="end">{unit}</InputAdornment>
      }}
      value={searchQuery}
      onChange={handleValueChange}
      sx={{
        paddingTop: '0',
        paddingLeft: '0',
        height: 40,

        '& .MuiInputBase-input': {
          fontSize: '12px',
          width: 30,
          paddingRight: 0
        },
        '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
        '& .MuiOutlinedInput-root': {
          '&.Mui-focused fieldset': {
            borderColor: 'transparent'
          },
          '&.Mui-focused': {
            boxShadow: 'none'
          },
          ':focus-within': { border: 'none' }
        },
        ...sx
      }}
      type={type}
    />
  );
};

export default TextFieldGTS;
