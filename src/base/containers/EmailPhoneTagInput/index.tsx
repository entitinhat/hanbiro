import React, { useState, useEffect, useRef, Fragment } from 'react';

//third-party
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { Autocomplete, Box, Chip, CircularProgress, TextField } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

//project base
import IconAvatar from '@base/components/@hanbiro/IconAvatar';

//customer
import { useCustomersAutoComplete } from '@customer/hooks/useCustomersAutoComplete';
import { CUSTOMER_CATEGORY_ACCOUNT, CUSTOMER_CATEGORY_CONTACT, CUSTOMER_CATEGORY_ENUM } from '@customer/config/constants';
import { nanoid } from '@base/utils/helpers';
import { LABEL_VALUE_PRIMARY } from '@base/config/constant';

interface AutoCompleteProps {
  sx?: any;
  ctrlStyles?: any;
  placeholder?: string;
  single?: boolean;
  visible?: boolean;
  showAvatar?: boolean;
  showEmail?: boolean;
  showPhone?: boolean;
  showAllOption?: boolean;
  isDisabled?: boolean;
  exceptItems?: any;
  category?: string;
  accountId?: string;
  value: any;
  onChange: any;
}

/**
 *
 * @param {*} props
 * @returns
 */
const EmailPhoneTagInput = (props: AutoCompleteProps) => {
  const {
    sx,
    ctrlStyles,
    placeholder = '',
    single = false, //
    visible = true, //hide or display selected items
    showAvatar = false,
    showEmail = false,
    showPhone = false,
    showAllOption = false,
    isDisabled = false,
    category,
    accountId,
    value, //[], initial value
    onChange
  } = props;
  const { t } = useTranslation();
  //state
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [searchText, setSearchText] = useState('');
  const setSearchTextDebounced = useRef(_.debounce((searchText) => setSearchText(searchText), 1000)).current;
  const [options, setOptions] = useState<any>([]);
  const [selectedValue, setSelectedValue] = useState<any>(single ? null : []);

  //initial selected
  useEffect(() => {
    if (value) {
      if (Array.isArray(value)) {
        if (value.length > 0) {
          //2 cases for value: string[] or object[]
          let isArrayString = _.isString(value[0]);
          if (isArrayString) {
            const selectedIds = selectedValue?.map((_ele: any) => _ele.value);
            if (JSON.stringify(value) !== JSON.stringify(selectedIds)) {
              const newValue: any = [];
              value.map((_item: string) => {
                //find in options
                const fOption = options.find((_ele: any) => _ele.value === _item);
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

    //category params
    if (category === CUSTOMER_CATEGORY_ACCOUNT) {
      params.filter.query = `category=${CUSTOMER_CATEGORY_ENUM[category]}`;
    } else if (category === CUSTOMER_CATEGORY_CONTACT) {
      params.filter.query = `category=${CUSTOMER_CATEGORY_ENUM[category]}`;
      if (accountId) {
        params.filter.query += ` contactType=CONTACT_TYPE_EMPLOYEE accounts=${accountId}`;
      } else {
        const contactTypes: string[] = [
          'CONTACT_TYPE_INFLUENCER',
          'CONTACT_TYPE_CHAMPION',
          'CONTACT_TYPE_BUDGET_HOLDER',
          'CONTACT_TYPE_DECISION_MAKER',
          'CONTACT_TYPE_END_USER'
        ];
        // params.filter.query += ` {contactType=CONTACT_TYPE_INFLUENCER contactType=CONTACT_TYPE_CHAMPION contactType=CONTACT_TYPE_BUDGET_HOLDER contactType=CONTACT_TYPE_DECISION_MAKER contactType=CONTACT_TYPE_END_USER}`;
        params.filter.query += ` contactType=${contactTypes.join(',')}`;
      }
    }

    if (searchText) {
      if (showEmail) {
        params.filter.query += ` textEmails:\"${searchText}\"`;
      } else if (showPhone) {
        if (category === CUSTOMER_CATEGORY_CONTACT) {
          params.filter.query += ` textMobiles:\"${searchText}\"`;
        } else {
          params.filter.query += ` textPhones:\"${searchText}\"`;
        }
      } else {
        params.filter.query += ` name:\"${searchText}\"`;
      }
    }

    return params;
  };

  //search all emails, phones for user, customer, ...
  const { data: results, isFetching, refetch } = useCustomersAutoComplete(getSearchParams());
  // console.log('postResult', results);

  //init states list
  useEffect(() => {
    if (results) {
      const nOptions = results.data;
      // if (addAll && nOptions.findIndex((ele: any) => ele.id === 'all') == -1) {
      //   nOptions?.unshift({
      //     id: 'all',
      //     name: 'All'
      //   } as Customer);
      // }
      setOptions(nOptions);
    } else {
      setOptions([]);
    }
  }, [results]);

  //value change
  const handleValueChange = (event: React.SyntheticEvent, selected: any, reason: string) => {
    //console.log('selected', selected);
    let newItem = selected.map((_ele: any) => {
      if (_.isString(_ele)) {
        return {
          id: nanoid(),
          name: _ele,
          emails: [{ email: _ele, label: LABEL_VALUE_PRIMARY }],
          phones: [{ phoneNumber: _ele, label: LABEL_VALUE_PRIMARY }],
          mobiles: [{ mobileNumber: _ele, label: LABEL_VALUE_PRIMARY }]
        };
      } else {
        return _ele;
      }
    });
    if (visible) {
      setSelectedValue(newItem);
    } else {
      setInputText('');
      setSearchTextDebounced('');
    }
    //callback
    onChange && onChange(newItem);
  };

  //get option label
  const getOptionLabel = (option: any) => {
    let optLabel = option.name;
    if (showEmail) {
      const primaryEmail = option.emails?.find((_ele: any) => _ele.label === LABEL_VALUE_PRIMARY);
      if (primaryEmail) {
        optLabel = primaryEmail.email;
      }
    }
    if (showPhone) {
      if (category === CUSTOMER_CATEGORY_CONTACT) {
        const primaryMobile = option.mobiles?.find((_ele: any) => _ele.label === LABEL_VALUE_PRIMARY);
        if (primaryMobile) {
          optLabel = `+${primaryMobile.country || ''}${primaryMobile.mobileNumber}`;
        }
      } else {
        const primaryPhone = option.phones?.find((_ele: any) => _ele.label === LABEL_VALUE_PRIMARY);
        if (primaryPhone) {
          optLabel = `+${primaryPhone.country || ''}${primaryPhone.phoneNumber}`;
        }
      }
    }
    return optLabel;
  };

  //console.log('selectedValue', selectedValue);
  //console.log('options', options);

  //render
  return (
    <>
      <Autocomplete
        id="asynchronous-tag-email-phone"
        multiple={!single}
        disabled={isDisabled}
        //limitTags={3}
        //sx={{ minWidth: 300 }}
        // open={isOpen}
        // onOpen={() => {
        //   setIsOpen(true);
        // }}
        // onClose={() => {
        //   setIsOpen(false);
        // }}
        popupIcon={<ArrowDropDownIcon />}
        isOptionEqualToValue={(option, value) => {
          return option.id === value.id;
        }}
        getOptionLabel={(option) => {
          return getOptionLabel(option);
        }}
        options={options || []}
        loading={isFetching}
        freeSolo
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              placeholder={t(placeholder) as string}
              InputProps={{
                ...params.InputProps,
                autoComplete: 'off',
                endAdornment: (
                  <>
                    {isFetching ? <CircularProgress size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                )
              }}
              value={inputText}
              onChange={(e: any) => {
                setInputText(e.target.value as string);
                setSearchTextDebounced(e.target.value as string);
              }}
            />
          );
        }}
        renderOption={(props, option, { selected }) => {
          const optionLabel = getOptionLabel(option);
          return (
            <Box component="li" {...props} key={option.id}>
              {showAvatar && (
                <IconAvatar id={option?.photo?.key || ''} url={option?.photo?.bucket || ''} alt={optionLabel} sx={{ mr: 1 }} />
              )}
              {optionLabel}
            </Box>
          );
        }}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => {
            const optionLabel = getOptionLabel(option);
            return (
              <Chip
                {...getTagProps({ index })}
                label={optionLabel}
                avatar={
                  showAvatar ? (
                    <IconAvatar id={option?.photo?.key || ''} url={option?.photo?.bucket || ''} alt={optionLabel} sx={{ mr: 1 }} />
                  ) : undefined
                }
                key={index}
              />
            );
          })
        }
        value={selectedValue}
        onChange={handleValueChange}
      />
    </>
  );
};

export default EmailPhoneTagInput;
