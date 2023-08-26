import { useState, useEffect, useRef } from 'react';
import _ from 'lodash';

import { Autocomplete, TextField } from '@mui/material';
import { IdName } from '@base/types/common';
import { useTranslation } from 'react-i18next';
import { PRIORITIES as priorityOptions } from '@base/config/constant';

export interface PriorityValue {
  keyName: string;
  languageKey: string;
}
interface PriorityProps {
  placeholder?: string;
  single?: string;
  defaultOptions?: PriorityValue[];
  value?: PriorityValue | null;
  onChange?: (nVal: PriorityValue | PriorityValue[] | null) => void;
}

/**
 *
 * @param {*} props
 * @returns
 */
const PriorityAutoComplete = (props: PriorityProps) => {
  const {
    placeholder = 'Select group then select a rep...',
    single,
    defaultOptions = [],
    value, //[], initial value
    onChange
  } = props;

  //state
  const [inputText, setInputText] = useState('');
  const [searchText, setSearchText] = useState('');
  const [options, setOptions] = useState<PriorityValue[]>([]); //for default options
  const [selectedValue, setSelectedValue] = useState<PriorityValue | PriorityValue[] | null>(value ? null : []);
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  //init states list
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
  }, [value, options]);

  useEffect(() => {
    if (priorityOptions.length > 0) {
      setOptions(priorityOptions);
    } else if (defaultOptions.length > 0) {
      setOptions(defaultOptions);
    } else setOptions([]);
  }, [defaultOptions]);

  //value change
  const handleSelectChange = (event: any, newValue: PriorityValue | PriorityValue[] | null) => {
    let newItem = newValue;
    setSelectedValue(newItem);
    //callback
    onChange && onChange(newValue);
  };

  //render
  return (
    <>
      <Autocomplete
        id="asynchronous-priority"
        multiple={!single}
        open={isOpen}
        onOpen={() => {
          setIsOpen(true);
        }}
        onClose={() => {
          setIsOpen(false);
        }}
        noOptionsText={t('ncrm_desk_ticket_no_priority_found')}
        renderInput={(params) => <TextField {...params} placeholder={t(placeholder) as string} />}
        getOptionLabel={(option: any) => option?.languageKey ?? ''}
        options={priorityOptions}
        // onInputChange={(event, nValue: string) => handleInputChange(nValue, event)}
        // inputValue={inputText} // if have inputValue, when select item in option, rerender -> inputText ='' -> no selected value
        onChange={handleSelectChange}
      />
    </>
  );
};

export default PriorityAutoComplete;
