import { useState, useEffect, useMemo } from 'react';

import _ from 'lodash';

import { useTranslation } from 'react-i18next';
import { Autocomplete, TextField } from '@mui/material';
import { TicketCategory } from '@settings/preferences/types/desk/ticketCategory';
import { useTicketCategories } from '@settings/preferences/hooks/desk/useTicketCategories';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface CategorySelectProps {
  isDisabled?: boolean;
  productIds?: string[];
  value?: TicketCategory | null;
  onChange?: (value: TicketCategory | null) => void;
  placeholder?: string;
  isPublic?: boolean;
  token?: string;
  noProductPlaceholder?: string;
}

// const CategorySelect = (props: any) => {
const CategorySelect = (props: CategorySelectProps) => {
  const { t } = useTranslation();
  const {
    productIds = [],
    value, //={}
    onChange,
    // placeholder = 'Type or click to select',
    placeholder = 'ncrm_common_category_select_placeholder',
    noProductPlaceholder,
    isPublic,
    token,
    isDisabled = false
  } = props;
  //state
  const [options, setOptions] = useState<TicketCategory[]>([]);
  const [selectedOption, setSelectedOption] = useState<TicketCategory | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  //init rows
  useEffect(() => {
    if (value) {
      if (_.isString(value)) {
        if (value !== selectedOption?.id) {
          //find in options
          const fOption = options.find((_ele: any) => _ele.value.id === value);
          if (fOption) {
            setSelectedOption(fOption);
          }
        }
      } else {
        if (value?.id !== selectedOption?.id) {
          setSelectedOption(value);
        }
      }
    } else {
      setSelectedOption(null);
    }
  }, [value, options]);
  // ============= HOOK get field options ======================
  const { data, isLoading, isFetching } = useTicketCategories('', ['all'], isPublic, token);
  // console.log('useTicketCategories\n', data);
  // init states list

  useEffect(() => {
    if (data?.data) {
      setOptions(data.data);
    }
  }, [data]);
  // ============= END get field options ======================

  //option change
  const handleValueChange = (event: React.SyntheticEvent, newValue: TicketCategory | null, reason: string) => {
    setSelectedOption(newValue);
    //callback
    onChange && onChange(newValue);
  };

  //render
  return (
    <>
      <Autocomplete
        readOnly={isDisabled}
        id="asynchronous-category"
        multiple={false}
        open={isOpen}
        onOpen={() => {
          setIsOpen(true);
        }}
        onClose={() => {
          setIsOpen(false);
        }}
        renderInput={(params) => (
          <TextField
            // value={selectedOption?.name}
            {...params}
            // placeholder={isDisabled ? (options.length === 0 ? noProductPlaceholder : placeholder) : placeholder}
            placeholder={
              isDisabled ? (options.length === 0 ? noProductPlaceholder : (t(placeholder) as string)) : (t(placeholder) as string)
            }
          />
        )}
        isOptionEqualToValue={(option, value) => {
          return option.id === value.id;
        }}
        getOptionLabel={(option: any) => option?.name ?? ''}
        options={options}
        onChange={handleValueChange}
        popupIcon={isDisabled ? '' : <ArrowDropDownIcon />}
        value={selectedOption}
      />
    </>
  );
};

export default CategorySelect;
