import React, { ReactElement, useMemo, useRef, useState } from 'react';

import { LabelValue } from '@base/types/app';
import { KeyboardArrowDown, FormatAlignLeft, FormatAlignCenter, FormatAlignRight } from '@mui/icons-material';
import {
  Box,
  Button,
  ClickAwayListener,
  Grow,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Popper,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery
} from '@mui/material';
import { SxProps, useTheme } from '@mui/material/styles';
import { SortByProps } from '../List/ListHeader';
import { SortInput } from '@base/types/common';
import { ASC, DESC } from '@base/config/constant';
import { SortDescendingOutlined, SortAscendingOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import SpanLang from '../SpanLang';

export interface DropdownSortByProps extends SortByProps {
  // placement?: PopperPlacementType;
  // icon?: ReactElement;
  // title?: string;
  // sx?: SxProps;
  // items: LabelValueData[];
  // selected?: LabelValueData;
  // onChange?: (nValue: LabelValueData) => void;
  [x: string]: any;
}

const DropdownSortBy = (props: DropdownSortByProps) => {
  const { items, sx, selected, onChange, placement = 'bottom-end' } = props;

  //==============================
  //hooks
  const theme = useTheme();
  const { t } = useTranslation();
  const matchesMd = useMediaQuery(theme.breakpoints.down('md'));

  //state
  const anchorRef = useRef<any>(null);
  const [open, setOpen] = useState(false);
  const [selectedSortBy, setSelectedSortBy] = useState<SortInput>(selected);

  // toogle popover
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  // close popover
  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  //value change
  const handleSortByChangeField = (val: LabelValue) => {
    const newSoryBy: SortInput = {
      ...selectedSortBy,
      field: val?.value as string
    };
    setSelectedSortBy(newSoryBy);
    // callback
    onChange && onChange(newSoryBy);
    // clsoe
    setOpen(false);
  };

  const handleSortByChangeOrder = () => {
    const newSoryBy: SortInput = {
      ...selectedSortBy,
      orderBy: selectedSortBy.orderBy === DESC ? ASC : DESC
    };
    setSelectedSortBy(newSoryBy);
    onChange && onChange(newSoryBy);
  };

  //date group render
  const ItemsRender = useMemo(() => {
    return items?.map((item: LabelValue, index: number) => {
      return (
        <ListItemButton
          key={index}
          disabled={item?.value === selectedSortBy?.field}
          sx={{ height: 36 }}
          onClick={() => handleSortByChangeField(item)}
        >
          <ListItemText
            primary={
              <Typography color="textPrimary">
                <SpanLang keyLang={item?.label} textOnly />
              </Typography>
            }
          />
        </ListItemButton>
      );
    });
  }, [items, selectedSortBy]);

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75, ...sx }}>
      <Stack direction="row" spacing={0}>
        <Button
          size={'small'}
          color="inherit"
          // endIcon={<KeyboardArrowDown />}
          ref={anchorRef}
          onClick={handleToggle}
        >
          {`${t('ncrm_common_sort_by')} ${
            t(items?.find((v: LabelValue) => v.value === selectedSortBy.field)?.label as string) ?? selectedSortBy.field
          }`}
        </Button>
        <IconButton color="inherit" onClick={handleSortByChangeOrder}>
          {selectedSortBy?.orderBy === DESC ? <SortDescendingOutlined /> : <SortAscendingOutlined />}
        </IconButton>
      </Stack>
      <Popper
        placement={matchesMd ? 'bottom' : placement}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [matchesMd ? -4 : 0, 4]
              }
            }
          ]
        }}
        sx={{ zIndex: 1310 }}
        onResize={undefined}
        onResizeCapture={undefined}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper sx={{ boxShadow: (t) => t.customShadows.z1 }}>
              <ClickAwayListener onClickAway={handleClose}>
                <Stack spacing={0.5}>
                  <List
                    component="nav"
                    sx={{
                      py: 0.5,
                      width: '100%',
                      minWidth: 185,
                      maxWidth: 300,
                      borderRadius: 1,
                      maxHeight: `calc(100vh - 300px)`
                      // [theme.breakpoints.down('md')]: {
                      //   maxWidth: 250
                      // }
                    }}
                    className="scroll-box"
                  >
                    {ItemsRender}
                  </List>
                </Stack>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
};

export default DropdownSortBy;
