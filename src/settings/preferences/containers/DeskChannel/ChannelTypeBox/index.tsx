import { useEffect, useState } from 'react';

import { Autocomplete, TextField, useTheme } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { DeskChannelType, ListType } from '@settings/preferences/types/desk/channel';
import { useTranslation } from 'react-i18next';
import { ChannelType } from '@settings/preferences/types/desk/common';

interface ChannelTypeBoxProps {
  placeholder?: DeskChannelType | string; // Placeholder prop
  getOption?: (data: ChannelType) => void; // Function => get value selected option via getOption prop
  value?: any;
  onChange?: (value: any) => void;
}

// const ChannelTypeBox = (props: any) => {
const ChannelTypeBox = (props: ChannelTypeBoxProps) => {
  const theme = useTheme();
  const {
    placeholder = 'Type or click to select',
    getOption,
    onChange, //
    value //
  } = props;
  const { t } = useTranslation();

  //state
  // const [selectedOption, setSelectedOption] = useState<ChannelType | null>(null);
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Map channel type data from ListType
  const data = [];
  for (const key in ListType) {
    if (key === ChannelType.LANDING_PAGE || key === ChannelType.WEBHOOK) {
      data.push(t(ListType[key].languageKey));
    }
  }

  // Handle change when clicking a option
  const handleValueChange = (event: React.SyntheticEvent, newValue: any) => {
    // Set keyName and languageKey for data.type when passed
    for (const key in ListType) {
      const typeName = t(ListType[key].languageKey);
      if (newValue === typeName) {
        newValue = ListType[key];
      }
    }
    setSelectedOption(t(newValue.languageKey)); // Set value TextField = selected option
    getOption && getOption(newValue.keyName); // Get value selected option via getOption props
    onChange && onChange(newValue.keyName); // Get value selected option via onChange props
  };

  //render
  return (
    <>
      <Autocomplete
        // disabled={isDisabled}
        popupIcon={<ArrowDropDownIcon />}
        multiple={false}
        open={isOpen}
        onOpen={() => {
          setIsOpen(true);
        }}
        onClose={() => {
          setIsOpen(false);
        }}
        disableClearable
        options={data}
        renderInput={(params) => (
          <TextField {...params} placeholder={`${typeof placeholder === 'string' ? placeholder : t(placeholder.languageKey)}`} />
        )}
        sx={{
          '& .MuiInputBase-input.Mui-disabled': {
            WebkitTextFillColor: `${theme.palette.grey[800]}` // Set color when disabled
          }
        }}
        onChange={handleValueChange}
        // getOptionDisabled={(option) => option === 'Email' || option === 'Direct Input'} // Disable option 'Email' and 'Direct Input' => Not use to create channel by user
        value={selectedOption}
      />
    </>
  );
};

export default ChannelTypeBox;
