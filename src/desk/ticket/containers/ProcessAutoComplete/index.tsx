import { useState, useEffect, useRef } from 'react';
import _ from 'lodash';

import { Autocomplete, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';

export interface ProcessValue {
  id: string;
  name: string;
}
interface ProcessProps {
  placeholder?: string;
  single?: string;
  defaultOptions?: ProcessValue[];
  value?: ProcessValue | null;
  onChange?: (nVal: ProcessValue | ProcessValue[] | null) => void;
}

/**
 *
 * @param {*} props
 * @returns
 */
const ProcessAutoComplete = (props: ProcessProps) => {
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
  const [options, setOptions] = useState<ProcessValue[]>([]); //for default options
  const [selectedValue, setSelectedValue] = useState<ProcessValue | ProcessValue[] | null>(value ? null : []);
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  //   useEffect(() => {
  //     if (data && data.results) {
  //       setOptions(data.results);
  //     } else setOptions([]);
  //   }, [data]);

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
    if (defaultOptions.length > 0) {
      setOptions(defaultOptions);
    }
  }, [defaultOptions]);

  //value change
  const handleSelectChange = (event: any, newValue: ProcessValue | ProcessValue[] | null) => {
    let newItem = newValue;
    setSelectedValue(newItem);
    //callback
    onChange && onChange(newValue);
  };

  //render
  return (
    <>
      <Autocomplete
        id="asynchronous-process"
        multiple={!single}
        open={isOpen}
        onOpen={() => {
          setIsOpen(true);
        }}
        onClose={() => {
          setIsOpen(false);
        }}
        noOptionsText={t('ncrm_desk_ticket_no_process_found')}
        renderInput={(params) => <TextField {...params} placeholder={t(placeholder) as string} />}
        getOptionLabel={(option: any) => option?.name ?? ''}
        options={options}
        // onInputChange={(event, nValue: string) => handleInputChange(nValue, event)}
        // inputValue={inputText} // if have inputValue, when select item in option, rerender -> inputText ='' -> no selected value
        onChange={handleSelectChange}
      />
    </>
  );
};

export default ProcessAutoComplete;
