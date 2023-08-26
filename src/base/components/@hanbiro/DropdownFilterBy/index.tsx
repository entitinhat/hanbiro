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
  ListItem,
  Stack,
  Chip
} from '@mui/material';
import { SxProps, useTheme } from '@mui/material/styles';

//project
import { FilterByOption } from '@base/types/common';
import { LabelValueData } from '@base/types/app';
//import { labelValueSearchItem } from '@base/utils/helpers';

//local
import FilterItem from './Item';
import { useTranslation } from 'react-i18next';
import useDevice from '@base/hooks/useDevice';

// export interface LabelValueIcon {
//   label: string;
//   value: string;
//   icon?: ReactElement;
// }

export interface DropdownProps {
  isSmall?: boolean;
  placement?: PopperPlacementType;
  icon?: ReactElement;
  title?: string;
  sx?: SxProps;
  items: FilterByOption[];
  onChange?: (nValue: LabelValueData[]) => void;
  selected: any[];
}

const Dropdown = (props: DropdownProps) => {
  const { isSmall = false, title, items, icon, sx, onChange, placement, selected } = props;

  //hook
  const theme = useTheme();
  const { t } = useTranslation();
  const { isMobile } = useDevice();

  //state
  const anchorRef = useRef<any>(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const [selectedFilters, setSelectedFilters] = useState<LabelValueData[]>([]);

  //init selectedFilters
  useEffect(() => {
    if (selected) {
      if (!_.isEqual(selected, selectedFilters)) {
        setSelectedFilters(selected);
      }
    } else {
      setSelectedFilters([]);
    }
  }, [selected]);

  //close popover
  const handleClose = (event: any) => {
    //console.log('event.target', event.target.localName);
    if (event.target.localName === 'body') {
      return;
    }

    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  //filter item change
  const handleFilterItemValueChange = (val: LabelValueData) => {
    console.log('val filterBy', val);
    const newSelected = _.cloneDeep(selectedFilters);
    const fIdx = newSelected.findIndex((_ele: LabelValueData) => _ele.value === val.value);
    if (fIdx > -1) {
      // if (val.data) {
      if (isEmpty(val.data) && typeof val.data != 'boolean') {
        //allow false value to filter
        newSelected.splice(fIdx, 1);
      } else {
        newSelected.splice(fIdx, 1, val);
      }
    } else {
      newSelected.push(val);
    }

    //console.log('newSelected', newSelected);
    setSelectedFilters(newSelected);
  };

  //apply filter and search
  const handleApply = () => {
    //calllback
    onChange && onChange(selectedFilters);
    //close
    setOpen(false);
  };

  //remove filter
  const handleRemoveFilter = (item: LabelValueData, extra: any) => {
    console.log('LabelValueData2', item, extra);

    const newSelected = _.cloneDeep(selectedFilters);
    const fIdx = newSelected.findIndex((_ele: LabelValueData) => _ele.value === item.value);
    if (fIdx > -1) {
      if (extra) {
        //remove an item in multi-selected
        const fExtraIdx = newSelected[fIdx].extra.findIndex((_ele: any) => _ele.id === extra.id);
        if (fExtraIdx > -1) {
          newSelected[fIdx].extra.splice(fExtraIdx, 1);
          //reset data
          if (newSelected[fIdx].extra.length === 0) {
            newSelected.splice(fIdx, 1); //remove filter
          } else {
            newSelected[fIdx].data = newSelected[fIdx].extra.map((_ele: any) => _ele.id).join(',');
          }
        }
      } else {
        //single selected
        newSelected.splice(fIdx, 1); //remove filter
      }
    }
    setSelectedFilters(newSelected);
    //calllback
    onChange && onChange(newSelected);
  };

  //render fields
  const ItemsRender = useMemo(() => {
    return items?.map((item: FilterByOption) => {
      const selectedField = selectedFilters?.find((_ele: LabelValueData) => _ele.value === item.value);
      return (
        <React.Fragment key={item.value}>
          <FilterItem item={item} defaultVal={selectedField?.data} onChange={handleFilterItemValueChange} />
        </React.Fragment>
      );
    });
  }, [items, selectedFilters]);

  console.log('selectedFilters', selectedFilters);
  //render selected items
  const FilteredItemsRender = useMemo(() => {
    return (
      <Stack direction={'row'} spacing={1} sx={{ maxWidth: '250px' }}>
        {selectedFilters.map((_item: LabelValueData, seIdx: number) => {
          const parseExtraFunc = items?.find((v: any) => v.value === _item?.value)?.parseExtra;
          if (_item?.extra && Array.isArray(_item.extra)) {
            //multiple selected options
            return _item.extra.map((_extra: any, exIdx: number) => {
              // const extraLabel = _extra?.languageKey ? t(_extra.languageKey) : _extra?.name;
              const extraLabel = isFunction(parseExtraFunc)
                ? parseExtraFunc(_extra)
                : _extra?.languageKey
                ? t(_extra.languageKey)
                : _extra?.name;
              return (
                <Chip
                  variant="outlined"
                  size="small"
                  color="primary"
                  key={exIdx} //_extra.id
                  label={t(extraLabel)}
                  onDelete={() => handleRemoveFilter(_item, _extra)}
                />
              );
            });
          } else {
            //single selected
            // const filterLabel = _item?.extra?.languageKey ? t(_item.extra.languageKey) : _item.extra?.name ?? _item.extra?.label; // update for render cta language filter
            const filterLabel = isFunction(parseExtraFunc)
              ? parseExtraFunc(_item?.extra)
              : _item?.extra?.languageKey
              ? t(_item.extra.languageKey)
              : _item.extra?.name ?? _item.extra?.label;
            const dataLabel = Array.isArray(_item.data) ? _item.data.join(',') : _item.data;
            return (
              <Chip
                variant="outlined"
                size="small"
                color="primary"
                key={seIdx} //_item?.extra?.id
                label={t(filterLabel || dataLabel)}
                onDelete={() => handleRemoveFilter(_item, null)}
              />
            );
          }
        })}
      </Stack>
    );
  }, [selectedFilters]);

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
                backgroundColor: 'inherit'
              }
            }}
          >
            {t(title)}
          </Button>
        ) : (
          <IconButton color="inherit" ref={anchorRef} onClick={handleToggle}>
            {icon}
          </IconButton>
        )}
        {!isSmall && FilteredItemsRender}
      </Stack>
      <Popper
        placement={placement ? placement : isMobile ? 'bottom' : undefined}
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
                offset: [isMobile ? -4 : 0, 4]
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
