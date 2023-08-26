import React, { SyntheticEvent, useCallback, useState } from 'react';
import Compact from 'react-color/lib/components/compact/Compact';

import { CheckBox, CheckBoxOutlineBlank, MoreVert } from '@mui/icons-material';
import { Checkbox, IconButton, Popover, Stack, Typography } from '@mui/material';

import { CategoryItem } from '..';

interface ItemProps {
  item: CategoryItem;
  onChangeCategory: (v: string, c: string | boolean) => void;
}

function Item({ item, onChangeCategory }: ItemProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeComplete = useCallback((color: any, event: SyntheticEvent) => {
    onChangeCategory && onChangeCategory(item.id, color.hex);
    handleClose();
  }, []);

  const handleCheckbox = useCallback((checked: boolean) => {
    onChangeCategory && onChangeCategory(item.id, checked);
  }, []);

  const open = Boolean(anchorEl);
  const id = open ? 'category-item-popover' + item.id : undefined;

  return (
    <Stack spacing={0} sx={{ px: 1 }} direction="row" alignItems="center" justifyContent="space-between">
      <Stack spacing={1} direction="row" alignItems="center">
        <Checkbox
          sx={{
            p: 0,
            color: item.color,
            '&:hover': {
              bgcolor: 'transparent'
            },
            '&.Mui-checked': {
              color: item.color
            }
          }}
          checkedIcon={<CheckBox />}
          icon={<CheckBoxOutlineBlank />}
          checked={item.checked}
          onChange={(event, checked) => {
            handleCheckbox(checked);
          }}
        />
        <Typography>{item.title}</Typography>
      </Stack>
      <IconButton size="small" aria-describedby={id} onClick={handleClick}>
        <MoreVert />
      </IconButton>
      <Popover
        id={id}
        open={open}
        PaperProps={{
          elevation: 0,
          sx: {
            // boxShadow: 'none' -> for github color
          }
        }}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <Compact onChangeComplete={handleChangeComplete} />
      </Popover>
    </Stack>
  );
}

export default React.memo(Item);
