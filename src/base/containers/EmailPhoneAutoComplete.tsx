import { useCustomersAutoComplete } from '@customer/hooks/useCustomersAutoComplete';
import { Customer } from '@customer/types/interface';
import { Autocomplete, autocompleteClasses, Box, Chip, InputAdornment, TextField } from '@mui/material';
import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import IconAvatar from '../components/@hanbiro/IconAvatar';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
interface EmailAutoCompleteProps {
  placeholder?: string;
  single?: boolean;
  visible?: boolean;
  showAvatar?: boolean;
  showEmail?: boolean;
  showPhone?: boolean;
  showAllOption?: boolean;
  showPopupIcon?: boolean;
  isDisabled?: boolean;
  exceptItems?: any;
  value: any | any[];
  onChange: (val: Customer | Customer[] | null) => void;
  mode?: 'To' | 'Bcc' | 'None' | 'Cc';
}

/**
 *
 * @param {*} props
 * @returns
 */
const EmailPhoneAutoComplete = (props: EmailAutoCompleteProps) => {
  const {
    placeholder = 'Type to select or enter to create a new email',
    single = false, //
    visible = true, //hide or display selected items
    showAvatar = false,
    showEmail = false,
    showPhone = false,
    showAllOption = false,
    isDisabled = false,
    value, //[], initial value
    onChange,
    mode = 'None',
    showPopupIcon = true
  } = props;
  const { t } = useTranslation();
  //state
  const [searchText, setSearchText] = useState('');
  const setSearchTextDebounced = useRef(_.debounce((searchText) => setSearchText(searchText), 1500)).current;
  const [options, setOptions] = useState<Customer[]>([]);
  const [selectedValue, setSelectedValue] = useState<Customer | Customer[] | null>(single ? null : []);
  const [isOpen, setIsOpen] = useState(false);

  //initial selected
  useEffect(() => {
    if (value) {
      if (Array.isArray(value)) {
        if (value.length > 0) {
          //2 cases for value: string[] or object[]
          let isArrayString = _.isString(value[0]);
          if (isArrayString) {
            const selectedIds = Array.isArray(selectedValue) ? selectedValue?.map((_ele: any) => _ele.id) : selectedValue?.id;
            if (JSON.stringify(value) !== JSON.stringify(selectedIds)) {
              const newValue: any = [];
              value.forEach((_item: string) => {
                //find in options
                const fOption = options.find((_ele: any) => _ele.id === _item);
                if (fOption) {
                  newValue.push(fOption);
                }
              });
              setSelectedValue(newValue);
            }
          } else {
            //array object
            if (JSON.stringify(value) !== JSON.stringify(selectedValue)) {
              setSelectedValue(value);
            }
          }
        } else {
          setSelectedValue([]);
        }
      } else {
        //single object
        if (_.isString(value)) {
          const selectedId = Array.isArray(selectedValue) ? selectedValue?.map((_ele: any) => _ele.id) : selectedValue?.id;
          if (value !== selectedId) {
            //find in options
            const fOption = options.find((_ele: any) => _ele.id === value);
            if (fOption) {
              setSelectedValue(fOption);
            }
          }
        } else {
          const selectedId = Array.isArray(selectedValue) ? selectedValue?.map((_ele: any) => _ele.id) : selectedValue?.id;
          if (value?.id !== selectedId) {
            setSelectedValue(value);
          }
          //if value is not in options
          const fIndex = options.findIndex((_ele: any) => _ele.id === value?.id);
          if (fIndex === -1) {
            const newOptions = [...options];
            newOptions.unshift(value);
            setOptions(newOptions);
          }
        }
      }
    } else {
      setSelectedValue(single ? null : []);
    }
  }, [value, options]);

  //build params
  const getSearchParams = () => {
    let params: any = {
      filter: {
        query: '',
        paging: {
          page: 1,
          size: 50
        }
      }
    };

    if (searchText) {
      params.filter.query += `name:\"${searchText}\"`; //type=3,4
    }

    return params;
  };

  const { data: custData, status: searchStatus } = useCustomersAutoComplete(getSearchParams());
  // =============================================================debug=============================
  // console.log('test----------------------------------------------------->', custData);
  // console.log('test----------------------------------------------------->',value)
  // console.log('test----------------------------------------------------->',selectedValue)
  // =============================================================end=============================
  //init states list
  useEffect(() => {
    if (custData?.data) {
      setOptions(custData.data);
    } else {
      setOptions([]);
    }
  }, [custData]);

  //input text change
  const handleInputChange = (event: React.SyntheticEvent, value: string, reason: string) => {
    // prevent outside click from resetting inputText to ""
    setSearchText(value);
    setSearchTextDebounced(value);
  };

  //value change
  const handleValueChange = (event: React.SyntheticEvent, selected: Customer | Customer[] | null, reason: string) => {
    //console.log('selected', selected);
    let newItem = selected;
    if (visible) {
      if (!single) {
        if (Array.isArray(newItem)) {
          const allIdx = newItem.findIndex((ele: any) => ele.value === 'all');
          if (allIdx > -1) {
            newItem = [newItem[allIdx]];
          }
        }
      }
      setSelectedValue(newItem);
    } else {
      setSearchText('');
      setSearchTextDebounced('');
    }
    //callback
    onChange && onChange(newItem);
  };

  const getLables = (option: any) => {
    const primaryEmail: any = option?.emails?.find((_ele: any) => _ele.label === 'LABEL_PRIMARY');
    const primaryPhone: any = option?.phones?.find((_ele: any) => _ele.label === 'LABEL_PRIMARY');
    let labels = option?.name;
    if (showEmail && primaryEmail != undefined) labels += `\<${primaryEmail?.email}\>`;
    if (showPhone && primaryPhone != undefined) labels += `\<${primaryPhone?.phoneNumber}\>`;
    return labels;
  };
  return (
    <Autocomplete
      disablePortal
      popupIcon={
        showPopupIcon ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingLeft: '5px', borderLeft: '1px solid gray' }}>
            <MailOutlineIcon fontSize="small" />
          </Box>
        ) : (
          <></>
        )
      }
      disableCloseOnSelect={!single}
      multiple={!single}
      disabled={isDisabled}
      open={isOpen}
      onOpen={() => {
        setIsOpen(true);
      }}
      onClose={() => {
        setIsOpen(false);
      }}
      //Style
      sx={{
        [`& .${autocompleteClasses.popupIndicator}`]: {
          transform: 'none'
        }
      }}
      //Render option
      renderOption={(props, option, { selected }) => {
        return (
          <Box component="li" {...props} key={option.id}>
            {showAvatar && <IconAvatar url={option.photo} alt={option.name} sx={{ mr: 1 }} />}
            {getLables(option)}
          </Box>
        );
      }}
      getOptionLabel={(option) => {
        return getLables(option);
      }}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => {
          return (
            <Chip
              label={getLables(option)}
              avatar={showAvatar ? <IconAvatar url={option.photo} alt={option.name} sx={{ mr: 1 }} /> : undefined}
              {...getTagProps({ index })}
              key={option.id + index}
            />
          );
        })
      }
      options={options}
      // inputValue={searchText}
      // onInputChange={handleInputChange}
      value={selectedValue}
      onChange={handleValueChange}
      renderInput={({ InputProps, ...rest }) => {
        const { startAdornment, ...restInput } = InputProps;
        const nStartAdornment = (
          <>
            <InputAdornment position="start">{mode == 'None' ? '' : `${mode}:`}</InputAdornment>
            {startAdornment}
          </>
        );

        return (
          <TextField
            {...rest}
            InputProps={{
              ...restInput,
              startAdornment: nStartAdornment
            }}
            placeholder={!single && selectedValue ? '' : placeholder}
          />
        );
      }}
      isOptionEqualToValue={(option, value) => option.id == value.id}
    />
  );
};
export default EmailPhoneAutoComplete;
