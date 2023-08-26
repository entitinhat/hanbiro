import React, { ReactElement, useRef, useState, useMemo, useEffect } from 'react';

//third-party
import { KeyboardArrowDown } from '@mui/icons-material';
import _, { isEmpty, isFunction } from 'lodash';

//material
import {
  Box,
  Button,
  ClickAwayListener,
  Grow,
  List,
  Paper,
  Popper,
  useMediaQuery,
  IconButton,
  PopperPlacementType,
  Divider,
  Stack
} from '@mui/material';
import { SxProps, useTheme } from '@mui/material/styles';

//project
import { FilterByOption } from '@base/types/common';
import { LabelValueData } from '@base/types/app';

//local
import BulkUpdateItem from './Item';
import { useTranslation } from 'react-i18next';

export interface DropdownProps {
  isSmall?: boolean;
  placement?: PopperPlacementType;
  icon?: ReactElement;
  title?: string;
  sx?: SxProps;
  items: FilterByOption[];
  onChange?: (nValue: any) => void;
  // selected?: any[];
}

const DropdownListBottomToolBar = (props: DropdownProps) => {
  const { 
    title, 
    items, 
    icon, 
    sx, 
    onChange, 
    placement = 'bottom-end', 
    // selected 
  } = props;

  //hook
  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.down('md'));
  const { t } = useTranslation();

  //state
  const anchorRef = useRef<any>(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const [selectedBulkUpdates, setSelectedBulkUpdates] = useState<LabelValueData[]>([]);

  //init selectedBulkUpdates
  // useEffect(() => {
  //   if (selected) {
  //     if (!_.isEqual(selected, selectedBulkUpdates)) {
  //       setSelectedBulkUpdates(selected);
  //     }
  //   } else {
  //     setSelectedBulkUpdates([]);
  //   }
  // }, [selected]);

  //close popover
  const handleClose = (event: any) => {
    if (event.target.localName === 'body') {
      return;
    }
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setSelectedBulkUpdates([]);
    setOpen(false);
  };

  //BulkUpdate item change
  const handleValueChange = (val: LabelValueData) => {
    const newSelected = _.cloneDeep(selectedBulkUpdates);
    const fIdx = newSelected.findIndex((_ele: LabelValueData) => _ele.value === val.value);
    if (fIdx > -1) {
      if (isEmpty(val?.data)) {
        newSelected[fIdx] = val;
      } else {
        newSelected.splice(fIdx, 1, val);
      }
    } else {
      newSelected.push(val);
    }
    setSelectedBulkUpdates(newSelected);
  };

  //apply BulkUpdate and search
  const handleApply = () => {
    console.log('selectedBulkUpdates', selectedBulkUpdates);

    //calllback
    let params: any = selectedBulkUpdates?.length ? {} : null;
    selectedBulkUpdates?.length &&
      selectedBulkUpdates?.map((item: LabelValueData) => {
        params[item?.value] = item?.data;
      });
    onChange && onChange(params);

    //close
    setSelectedBulkUpdates([]);
    setOpen(false);
  };

  //render fields
  const ItemsRender = useMemo(() => {
    return items?.map((item: FilterByOption) => {
      const selectedField = selectedBulkUpdates?.find((_ele: LabelValueData) => _ele.value === item.value);
      return (
        <React.Fragment key={item.value}>
          <BulkUpdateItem
            item={item}
            defaultVal={selectedField?.data}
            onChange={handleValueChange}
          />
        </React.Fragment>
      );
    });
  }, [items, selectedBulkUpdates]);

  return (
    <Box sx={{ position: 'relative', flexShrink: 0, ml: 0.75, ...sx }}>
      <Stack direction={'row'} spacing={1} alignItems="center">
        {title ? (
          <Button
            size={'small'}
            color="inherit"
            endIcon={icon ? icon : <KeyboardArrowDown />}
            ref={anchorRef}
            onClick={handleToggle}
            sx={{
              '&:hover': {
                backgroundColor: 'transparent!important',
                borderColor: `${theme.palette.grey[500]}!important`,
                zIndex: 5
              },
              border: 'solid 1px transparent',
              padding: '0.2rem 0.9rem',
              position: 'relative'
            }}
          >
            {t(title)}
          </Button>
        ) : (
          <IconButton color="inherit" ref={anchorRef} onClick={handleToggle}>
            {icon}
          </IconButton>
        )}
        {/* {!isSmall && FilteredItemsRender} */}
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
        sx={{ zIndex: 2, transform: `translate(88px, 40px)` }}
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
                      minWidth: 300,
                      maxWidth: 500,
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
                  <Divider />
                  <Box sx={{ p: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Button sx={{ mr: 1 }} size="small" variant="outlined" color="secondary" onClick={(e: any) => handleClose(e)}>
                      {t('ncrm_common_btn_cancel')}
                    </Button>
                    <Button size="small" color="primary" variant="contained" onClick={() => handleApply()}>
                      {t('ncrm_common_btn_update')}
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

export default DropdownListBottomToolBar;
