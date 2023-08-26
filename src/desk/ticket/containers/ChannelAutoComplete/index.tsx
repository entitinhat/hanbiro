import { useState, useEffect, useRef } from 'react';
import _ from 'lodash';

import { Autocomplete, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useChannelsType } from '@settings/preferences/hooks/desk/useChannels';

export interface ChannelValue {
  id: string;
  name: string;
}
interface ChannelProps {
  placeholder?: string;
  single?: string;
  defaultOptions?: ChannelValue[];
  value?: ChannelValue | null;
  onChange?: (nVal: ChannelValue | ChannelValue[] | null) => void;
}

/**
 *
 * @param {*} props
 * @returns
 */
const ChannelAutoComplete = (props: ChannelProps) => {
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
  const [options, setOptions] = useState<ChannelValue[]>([]); //for default options
  const [selectedValue, setSelectedValue] = useState<ChannelValue | ChannelValue[] | null>(value ? null : []);
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const { data } = useChannelsType(searchText);

  useEffect(() => {
    if (data && data.results) {
      setOptions(data.results);
    } else setOptions([]);
  }, [data]);

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
  const handleSelectChange = (event: any, newValue: ChannelValue | ChannelValue[] | null) => {
    let newItem = newValue;
    setSelectedValue(newItem);
    //callback
    onChange && onChange(newValue);
  };

  //render
  return (
    <>
      <Autocomplete
        id="asynchronous-channel"
        multiple={!single}
        open={isOpen}
        onOpen={() => {
          setIsOpen(true);
        }}
        onClose={() => {
          setIsOpen(false);
        }}
        noOptionsText={t('ncrm_desk_ticket_no_channel_found')}
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

export default ChannelAutoComplete;
