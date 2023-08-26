import React, { ReactElement, useMemo, useRef, useState, useEffect } from 'react';

//third-party
import dayjs from 'dayjs';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

//project
import { LabelValueData } from '@base/types/app';
import { Check, KeyboardArrowDown } from '@mui/icons-material';
import {
  Box,
  Button,
  ClickAwayListener,
  Collapse,
  Divider,
  Grow,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Popper,
  PopperPlacementType,
  Stack,
  Typography,
  useMediaQuery
} from '@mui/material';
import { SxProps, useTheme } from '@mui/material/styles';

import Item from './Item';

export interface LabelValueIcon {
  label: string;
  value: string;
  icon?: ReactElement;
}

export interface DropdownProps {
  placement?: PopperPlacementType;
  icon?: ReactElement;
  title?: string;
  sx?: SxProps;
  items: LabelValueData[];
  selected?: LabelValueData;
  onChange?: (nValue: LabelValueData) => void;
}

const Dropdown = (props: DropdownProps) => {
  const { title, items, icon, sx, selected, onChange, placement = 'bottom-end' } = props;
  //console.log('>>>>>>>>> Dropdown items', items);

  //==============================
  //hooks
  const theme = useTheme();
  const { t } = useTranslation();
  const matchesMd = useMediaQuery(theme.breakpoints.down('md'));

  //state
  const anchorRef = useRef<any>(null);
  const [open, setOpen] = useState(false);
  const [selectedDateBy, setSelectedDateBy] = useState<any>(null);

  //init date by
  useEffect(() => {
    if (selected) {
      if (!_.isEqual(selected, selectedDateBy)) {
        setSelectedDateBy(selected);
      }
    } else {
      setSelectedDateBy(null);
    }
  }, [selected]);

  //toogle popover
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  //close popover
  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
    //rollback state change
    if (!_.isEqual(selected, selectedDateBy)) {
      setSelectedDateBy(selected);
    }
  };

  //apply date by filter
  const handleApply = () => {
    //callback
    onChange && onChange(selectedDateBy);
    //close
    setOpen(false);
  };

  //value change
  const handleDateByChange = (val: LabelValueData) => {
    setSelectedDateBy(val);
  };

  //date group render
  const ItemsRender = useMemo(() => {
    return items?.map((item: any, index: number) => {
      const initialValue = selectedDateBy?.value === item.value ? selectedDateBy : undefined;
      return <Item key={index} item={item} defaultVal={initialValue} onChange={handleDateByChange} />;
    });
  }, [items, selectedDateBy]);

  console.log('...selectedDateBy...', selectedDateBy);
  return (
    <Box sx={{ flexShrink: 0, ml: 0.75, ...sx }}>
      {title ? (
        <Button
          size={'small'}
          color="inherit"
          endIcon={icon ? icon : <KeyboardArrowDown />}
          ref={anchorRef}
          onClick={handleToggle}
          sx={{
            '&:hover': {
              backgroundColor: 'inherit'
            }
          }}
        >
          {title}
        </Button>
      ) : (
        <IconButton color="inherit" ref={anchorRef} onClick={handleToggle}>
          {icon}
        </IconButton>
      )}
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
        sx={{ zIndex: 2 }}
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
                      pt: 0,
                      pb: 0.5,
                      width: '100%',
                      minWidth: 300,
                      maxWidth: 300,
                      borderRadius: 1,
                      maxHeight: `calc(100vh - 300px)`
                      // [theme.breakpoints.down('md')]: {
                      //   maxWidth: 250
                      // }
                    }}
                    className="scroll-box"
                  >
                    <ListItem
                      disablePadding
                      sx={{
                        '& .MuiListItemButton-root': {
                          backgroundColor: `${(selectedDateBy === null || !selectedDateBy) && 'primary.lighter'}`
                        }
                      }}
                    >
                      <ListItemButton
                        sx={{
                          height: 36
                        }}
                        onClick={() => setSelectedDateBy(null)}
                      >
                        <ListItemText
                          primary={
                            <Typography color={selectedDateBy === null || !selectedDateBy ? 'primary' : 'textPrimary'}>
                              {t('ncrm_common_all')}
                            </Typography>
                          }
                        />
                        {/* {(selectedDateBy === null || !selectedDateBy) && <Check color="success" fontSize="small" />} */}
                      </ListItemButton>
                    </ListItem>
                    <Divider sx={{ mb: 0.5 }} />
                    {ItemsRender}
                  </List>
                  <Divider />
                  <Box sx={{ p: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Button sx={{ mr: 1 }} size="small" variant="outlined" color="secondary" onClick={(e: any) => handleClose(e)}>
                      {t('ncrm_common_btn_cancel')}
                    </Button>
                    <Button size="small" color="primary" variant="contained" onClick={() => handleApply()}>
                      {t('ncrm_common_btn_apply')}
                    </Button>
                  </Box>
                </Stack>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
};

export default Dropdown;
