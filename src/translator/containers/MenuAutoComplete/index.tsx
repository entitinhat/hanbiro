import { useState, useEffect, useRef } from 'react';

import _ from 'lodash';

import { Autocomplete, Box, TextField } from '@mui/material';
import { IdName } from '@base/types/common';
import { Menu } from '@translator/types';
import { defaultLangValues, menuData, keyNames } from '@base/containers/TranslatorEditor/TranslatorEditorModal/config';

interface MenuProps {
  placeholder?: string;
  value?: Menu | Menu[] | null;
  single?: boolean;
  onChange?: (nVal: Menu | Menu[] | null) => void;
}

/**
 *
 * @param {*} props
 * @returns
 */
const MenuAutoComplete = (props: MenuProps) => {
  const {
    placeholder = 'Select a menu(s)...',
    value, //[], initial value
    single = false,
    onChange
  } = props;

  //state
  const [options, setOptions] = useState<Menu[]>([]); //for default options
  const [selectedValue, setSelectedValue] = useState<Menu | Menu[] | null>(value ?? null);
  const [isOpen, setIsOpen] = useState(false);

  //init states list
  useEffect(() => {
    if (menuData.length > 0) {
      const customMenu = menuData?.map((ele: any) => ({
        ...ele,
        keyName: ele.value,
        languageKey: ele.label
      }));
      customMenu.unshift({
        keyName: 'all',
        languageKey: 'All',
        label: 'All',
        value: 'all'
      });
      setOptions(customMenu);
    }
  }, [menuData]);

  //value change
  const handleSelectChange = (event: any, newValue: Menu[] | Menu | null) => {
    console.log('newValue', newValue);
    if (!single) {
      const curVal = (newValue as Menu[]).length == 0 ? null : (newValue as Menu[]);
      console.log('curVal', curVal);
      //remove All if select a specific menu
      if (curVal !== null) {
        if (curVal[0].value === 'all') {
          if (curVal.length === 1) {
            setSelectedValue(curVal);
            //callback
            onChange && onChange(curVal);
          } else {
            setSelectedValue([curVal[1]]);
            //callback
            onChange && onChange([curVal[1]]);
          }
        } else if (curVal[curVal.length - 1].value === 'all') {
          setSelectedValue([curVal[curVal.length - 1]]);
          //callback
          onChange && onChange([curVal[curVal.length - 1]]);
        } else {
          setSelectedValue([...curVal]);
          //callback
          onChange && onChange([...curVal]);
        }
      } else {
        setSelectedValue([]);
        //callback
        onChange && onChange([]);
      }
    } else {
      setSelectedValue(newValue);
      //callback
      onChange && onChange(newValue);
    }
  };

  //render
  return (
    <Autocomplete
      id="asynchronous-Menu"
      fullWidth
      multiple={!single}
      open={isOpen}
      onOpen={() => {
        setIsOpen(true);
      }}
      onClose={() => {
        setIsOpen(false);
      }}
      noOptionsText={'No menu(s) found.'}
      filterSelectedOptions
      value={selectedValue ?? []}
      isOptionEqualToValue={(option, value) => {
        return option.value === value.value;
      }}
      renderInput={(params) => <TextField {...params} placeholder={placeholder} />}
      getOptionLabel={(option: any) => option?.label ?? ''}
      options={options}
      //Render option
      renderOption={(props, option, { selected }) => {
        return (
          <Box component="li" {...props} key={option.value} value={option.value}>
            {option?.label ?? ''}
          </Box>
        );
      }}
      onChange={handleSelectChange}
    />
  );
};

export default MenuAutoComplete;
