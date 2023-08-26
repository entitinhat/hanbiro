import React, { useState, useEffect, useRef } from 'react';

import _ from 'lodash';

import { useAssignmentGroups } from '@settings/preferences/hooks/desk/useAssimentGroups';
import { Autocomplete, TextField } from '@mui/material';
import { IdName } from '@base/types/common';
import { useTranslation } from 'react-i18next';

interface AssignGroupProps {
  placeholder?: string;
  single?: boolean;
  value?: IdName | IdName[] | null;
  onChange?: (nVal: IdName | IdName[] | null) => void;
}

/**
 *
 * @param {*} props
 * @returns
 */
const AssignGroupAutoComplete = (props: AssignGroupProps) => {
  const { placeholder = 'Type or click to select a group...', value, onChange, single = true } = props;
  const { t } = useTranslation();

  //state
  // const [inputText, setInputText] = useState('');
  const [searchText, setSearchText] = useState('');
  const setSearchTextDebounced = useRef(_.debounce((searchText) => setSearchText(searchText), 1000)).current;
  const [options, setOptions] = useState<IdName[]>([]); //for default options
  const [selectedValue, setSelectedValue] = useState<IdName | IdName[] | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  //initial selected
  useEffect(() => {
    if (value) {
      if (JSON.stringify(value) !== JSON.stringify(selectedValue)) {
        setSelectedValue(value);
      }
    }
    if (!value) {
      setSelectedValue(null);
    }
  }, [value]);

  const { data, status: searchStatus } = useAssignmentGroups(searchText);

  //init states list
  useEffect(() => {
    if (data?.results) {
      setOptions(data.results);
    } else {
      setOptions([]);
    }
  }, [data]);

  //input text change
  const handleInputChange = (inputText: string, reason: any) => {
    setSearchText(inputText);
    setSearchTextDebounced(inputText);
  };

  //value change
  const handleSelectChange = (event: any, newValue: IdName | IdName[] | null) => {
    setSelectedValue(newValue);
    //callback
    onChange && onChange(newValue);
  };

  //render
  return (
    <>
      <Autocomplete
        // id="asynchronous-assigngroup"
        multiple={!single}
        open={isOpen}
        onOpen={() => {
          setIsOpen(true);
        }}
        onClose={() => {
          setIsOpen(false);
        }}
        value={selectedValue}
        filterSelectedOptions
        renderInput={(params) => <TextField placeholder={t(placeholder) as string} {...params} />}
        getOptionLabel={(option: any) => option?.name ?? ''}
        options={options}
        inputValue={searchText}
        onInputChange={(event, nValue: string, reason) => handleInputChange(nValue, reason)}
        onChange={handleSelectChange}
      />
    </>
  );
};

export default AssignGroupAutoComplete;
