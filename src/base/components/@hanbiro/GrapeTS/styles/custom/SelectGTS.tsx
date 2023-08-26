import React, { useEffect, useMemo, useState } from 'react';

import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';

interface SelectGTSrops {
  onChange?: (value: any) => void;
  value: string;
  options: any[];
  type: string;
}

const SelectGTS: React.FC<SelectGTSrops> = (props: SelectGTSrops) => {
  const { options, value, onChange, type } = props;

  const handleValueChange = (event: SelectChangeEvent) => {
    onChange && onChange(event.target.value);
  };

  const renderItem = () => {
    switch (type) {
      case 'text-align': {
        return options.map((option) => {
          const Icon = option.icon;
          return (
            <MenuItem key={option.value} value={option.value}>
              <Button size="small" sx={{ color: 'inherit' }}>
                <Icon fontSize="small" />
              </Button>
              {/* <Button size="small" sx={{ color: 'inherit' }} startIcon={<Icon />}>
                <Typography>{option.label}</Typography>
              </Button> */}
            </MenuItem>
          );
        });
      }
      case 'letter-spacing': {
        return options.map((option) => {
          const Icon = option.icon;
          return (
            <MenuItem key={option.value} value={option.value}>
              <Button size="small" sx={{ color: 'inherit' }} startIcon={<Icon />}>
                <Typography> {option.label}</Typography>
              </Button>
            </MenuItem>
          );
        });
      }

      case 'font-weight': {
        return options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <Button size="small" sx={{ color: 'inherit' }}>
              <Typography sx={{ fontWeight: `${option.value}` }}> {option.label}</Typography>
            </Button>
          </MenuItem>
        ));
      }
      case 'border-style-sub': {
        return options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <Tooltip title={option.value}>
              <Button size="small" sx={{ color: 'inherit' }}>
                {option.value === 'none' ? (
                  'none'
                ) : (
                  <Box sx={{ borderBottom: `3px ${option.value}`, width: '100%', height: '3px' }} />
                )}
              </Button>
            </Tooltip>
          </MenuItem>
        ));
      }

      case 'font-family': {
        return options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <Button size="small" sx={{ color: 'inherit' }}>
              <Typography sx={{ fontFamily: `${option.value}` }}> {option.label}</Typography>
            </Button>
          </MenuItem>
        ));
      }
      default: {
        return options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <Button size="small" sx={{ color: 'inherit' }}>
              <Typography> {option.label}</Typography>
            </Button>
          </MenuItem>
        ));
      }
    }
  };
  //render
  return (
    <Select
      MenuProps={{
        disablePortal: true
      }}
      labelId="demo-simple-select-autowidth-label"
      id="demo-simple-select-autowidth"
      value={value}
      onChange={handleValueChange}
      autoWidth
      style={{ boxShadow: 'none', border: 'none' }}
      // IconComponent={{<></>}}
      sx={{
        //MuiOutlinedInput-notchedOutline
        '& fieldset': {
          border: 'none !important'
        },
        height: 40,
        overflow: 'hidden',
        '& .MuiOutlinedInput-notchedOutline': {
          border: 'none',
          '&.Mui-focused': {
            border: 'none'
          }
        },
        '& .MuiOutlinedInput-root': {
          '&.Mui-focused fieldset': {
            borderColor: 'transparent'
          },
          '&.Mui-focused': {
            boxShadow: 'none'
          },
          ':focus-within': { border: 'none' }
        },
        fontSize: '12px'
      }}
    >
      {renderItem()}
    </Select>
  );
};

export default SelectGTS;
