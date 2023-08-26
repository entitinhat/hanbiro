import { ClearOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Box, Button, InputLabel, OutlinedInput, Popover, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ContentAddTabs from './ContentAddTabs';

interface AutoCompleteSelectCustomProps {
  isMulti: boolean;
  onChange: (data: any) => void;
  value?: string | undefined;
  placeholder?: string;
  handleClearRow?: () => void;
}

const AutoCompleteSelectCustom = (props: AutoCompleteSelectCustomProps) => {
  const { isMulti, onChange, value, placeholder = 'Type or click to select', handleClearRow } = props;
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [item, setItem] = useState<string>('');

  useEffect(() => {
    if (value) {
      setItem(value);
    } else {
      setItem('');
    }
  }, [value]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'DigitalContentTable-popover' : undefined;

  const handleClear = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    handleClearRow && handleClearRow();
  };
  return (
    <>
      <OutlinedInput
        id="component-outlined"
        value={item ? item : placeholder}
        placeholder={placeholder}
        onClick={handleClick}
        // endAdornment={
        //   <IconButton size="small" onClick={handleClear}>
        //     <ClearOutlined fontSize="small" color="secondary" />
        //   </IconButton>
        // }
      />

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <ContentAddTabs isMulti={isMulti} handleAddItems={onChange} handlePopClose={handleClose} />
      </Popover>
    </>
  );
};

export default AutoCompleteSelectCustom;
