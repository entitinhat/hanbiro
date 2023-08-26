import { useState, useEffect, useRef } from 'react';

import _ from 'lodash';

import { useAssignmentUsers } from '@settings/preferences/hooks/desk/useAssigmentUsers';
import { Autocomplete, Box, TextField } from '@mui/material';
import { IdName } from '@base/types/common';

export interface AssignUserValue {
  user: IdName;
  group: IdName;
}
interface AssignUserProps {
  placeholder?: string;
  value?: AssignUserValue | null;
  single?: boolean;
  onChange?: (nVal: AssignUserValue | AssignUserValue[] | null) => void;
}

/**
 *
 * @param {*} props
 * @returns
 */
const AssignUserAutoComplete = (props: AssignUserProps) => {
  const {
    placeholder = 'Select a user...',
    value, //[], initial value
    single = false,
    onChange
  } = props;
  //state
  const [inputText, setInputText] = useState('');
  const [searchText, setSearchText] = useState('');
  const setSearchTextDebounced = useRef(_.debounce((searchText) => setSearchText(searchText), 1000)).current;
  const [options, setOptions] = useState<any[]>([]); //for default options
  const [selectedValue, setSelectedValue] = useState<AssignUserValue | AssignUserValue[] | null>(value ?? null);
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading } = useAssignmentUsers(searchText);
  //init states list
  useEffect(() => {
    if (!isLoading && data?.results) {
      const nReps = data.results.map((rep) => {
        const nData = {
          id: rep.id ?? '',
          name: rep.name ?? ''
        };
        //rep?.user ? rep.user : null;
        // id: nData ? (nData?.id ? nData.id : rep.id) : rep?.id ? rep.id : '', // Set id = data.user.id || data.id
        // name: nData ? (nData?.name ? nData.name : rep.name) : rep?.name ? rep.name : '', // Set name = data.user.name || data.
        const option: any = {
          user: nData,
          group: {
            id: '',
            name: ''
          }
        };
        return option;
      });
      setOptions(nReps);
    }
  }, [data]);

  useEffect(() => {
    if (value) {
      setSelectedValue(value);
    }
  }, [value]);
  console.log('AssignUser', data, options);

  //input text change
  const handleInputChange = (inputText: string, event: any) => {
    // prevent outside click from resetting inputText to ""
    if (event?.action !== 'input-blur' && event?.action !== 'menu-close') {
      setInputText(inputText);
      setSearchTextDebounced(inputText);
    }
  };

  //value change
  const handleSelectChange = (event: any, newValue: AssignUserValue[] | AssignUserValue | null) => {
    setSelectedValue(newValue);
    //callback
    onChange && onChange(newValue);
  };

  //render
  return (
    <>
      <Autocomplete
        id="asynchronous-assignuser"
        multiple={!single}
        open={isOpen}
        onOpen={() => {
          setIsOpen(true);
        }}
        onClose={() => {
          setIsOpen(false);
        }}
        noOptionsText={'No user(s) found.'}
        filterSelectedOptions
        value={selectedValue ?? []}
        isOptionEqualToValue={(option, value) => {
          return option.user?.id === value.user?.id;
        }}
        renderInput={(params) => <TextField {...params} placeholder={placeholder} />}
        getOptionLabel={(option: any) => option?.user?.name ?? ''}
        options={options}
        //Render option
        renderOption={(props, option, { selected }) => {
          return (
            <Box component="li" {...props} key={option.id}>
              {option?.user?.name ?? ''}
            </Box>
          );
        }}
        onInputChange={(event, nValue: string) => handleInputChange(nValue, event)}
        inputValue={inputText} // if have inputValue, when select item in option, rerender -> inputText ='' -> no selected value
        onChange={handleSelectChange}
      />
    </>
  );
};

export default AssignUserAutoComplete;
