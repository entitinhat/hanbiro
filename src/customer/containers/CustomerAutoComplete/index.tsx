import React, { useState, useEffect, useRef, Fragment } from 'react';

//third-party
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
// material-ui
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  InputLabel,
  Stack,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

//project
import IconAvatar from '@base/components/@hanbiro/IconAvatar';

//customer
import { CUSTOMER_CATEGORY_ACCOUNT, CUSTOMER_CATEGORY_CONTACT, CUSTOMER_CATEGORY_ENUM } from '@customer/config/constants';
import { useCustomersAutoComplete } from '@customer/hooks/useCustomersAutoComplete';
import { Customer } from '@customer/types/interface';
import { formatAddress } from '@base/utils/helpers';

interface CustomerAutoCompleteProps {
  placeholder?: string;
  //placement?: string;
  category?: string;
  type?: string;
  accountId?: string;
  single?: boolean;
  visible?: boolean;
  showAvatar?: boolean;
  showEmail?: boolean;
  showPhone?: boolean;
  showAddress?: boolean;
  showAllOption?: boolean;
  showAdd?: boolean;
  addAll?: boolean;
  //showPopover?: boolean;
  isDisabled?: boolean;
  readOnly?: boolean;
  addLabel?: string;
  //exceptItems?: any;
  value: any | any[];
  onChange: (val: Customer | Customer[] | null) => void;
  onAdd?: () => void;
}

/**
 *
 * @param {*} props
 * @returns
 */
const CustomerAutoComplete = (props: CustomerAutoCompleteProps) => {
  const { t } = useTranslation();
  const {
    placeholder = 'ncrm_common_customer_auto_placeholder',
    category = '', //'' : all, 'account', 'contact'
    type = '', //'TYPE_VENDOR, TYPE_PARTNER'
    accountId, //for get account's employees
    single = false, //
    visible = true, //hide or display selected items
    showAvatar = false,
    showEmail = false,
    showPhone = false,
    showAddress = false,
    showAllOption = false,
    showAdd = false,
    isDisabled = false,
    readOnly = false,
    addLabel,
    addAll = false,
    //exceptItems = [],
    value, //[], initial value
    onAdd,
    onChange
  } = props;
  const theme = useTheme();
  //state
  const [inputText, setInputText] = useState('');
  const [searchText, setSearchText] = useState('');
  const setSearchTextDebounced = useRef(_.debounce((searchText) => setSearchText(searchText), 1000)).current;
  const [options, setOptions] = useState<readonly Customer[]>([]);
  const [selectedValue, setSelectedValue] = useState<Customer | Customer[] | null>(single ? null : []);
  const [isOpen, setIsOpen] = useState(false);
  console.log(`~~~~INPUT CUSTOMER AUTOCOMPLETE VALUE`, value);
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
              value.map((_item: string) => {
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
    //type params
    if (type && type.length > 0) {
      //params.filter.filters.type = type.split(','); // type='partner, vendor'
      type.split(',').map((_ele: string) => {
        //params.filter.query += ` type=${CUSTOMER_TYPE_ENUM[_ele]}`; //type=3,4
        params.filter.query += ` type=${_ele}`;
      });
    }
    if (searchText) {
      params.filter.query += ` name:\"${searchText}\"`;
    }

    return params;
  };

  const {
    data: custData,
    isFetching
    //refetch,
  } = useCustomersAutoComplete(getSearchParams(), { enabled: !isDisabled });
  //console.log('postResult', custData);

  //init states list
  useEffect(() => {
    if (custData?.data) {
      const nOptions = custData.data;
      if (addAll && nOptions.findIndex((ele: any) => ele.id === 'all') == -1) {
        nOptions?.unshift({
          id: 'all',
          name: 'All'
        } as Customer);
      }
      setOptions(nOptions);
    } else {
      setOptions([]);
    }
  }, [custData]);

  //input text change
  // const handleInputChange = (event: React.SyntheticEvent, value: string, reason: string) => {
  //   // prevent outside click from resetting inputText to ""
  //   setInputText(value);
  //   setSearchTextDebounced(value);
  // };

  //value change
  const handleValueChange = (event: React.SyntheticEvent, selected: Customer | Customer[] | null, reason: string) => {
    //console.log('selected', selected);
    //if selected is Add new option
    if (Array.isArray(selected)) {
      if (selected.length > 0 && selected[selected.length - 1].id === '0') {
        return;
      }
    } else {
      if (selected?.id === '0') {
        return;
      }
    }
    let newItem = selected;
    if (visible) {
      if (!single) {
        if (Array.isArray(newItem)) {
          const allIdx = newItem.findIndex((ele: any) => ele.id === 'all');
          if (allIdx > -1) {
            newItem = [newItem[allIdx]];
          }
        }
      }
      setSelectedValue(newItem);
    } else {
      setInputText('');
      setSearchTextDebounced('');
    }
    //callback
    onChange && onChange(newItem);
  };

  //console.log('selectedValue', selectedValue);
  return (
    <>
      <Autocomplete
        id="asynchronous-customer"
        multiple={!single}
        disabled={isDisabled}
        readOnly={readOnly}
        //limitTags={3}
        // sx={{ minWidth: 300 }}
        open={isOpen}
        onOpen={() => {
          setIsOpen(true);
        }}
        onClose={() => {
          setIsOpen(false);
        }}
        popupIcon={readOnly ? '' : <ArrowDropDownIcon />}
        isOptionEqualToValue={(option, value) => {
          return option.id === value.id;
        }}
        getOptionLabel={(option) => option?.name ?? ''}
        options={options}
        loading={isFetching}
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
        filterOptions={(options) => {
          const results = [...options];
          if (showAdd) {
            results.unshift({
              id: '0',
              name: ''
            } as Customer);
          }

          return results;
        }}
        renderOption={(props, option, { selected }) => (
          <Fragment key={option.id}>
            {option.id === '0' ? (
              <Box component="li" sx={{ mb: 1 }}>
                <Button size="small" sx={{ width: '100%' }} color="primary" onClick={onAdd} startIcon={<AddIcon />}>
                  {addLabel}
                </Button>
                <Divider />
              </Box>
            ) : (
              <Box component="li" {...props}>
                {showAvatar && <IconAvatar url={option?.photo || ''} alt={option.name} sx={{ mr: 1 }} />}
                {option.name}
              </Box>
            )}
          </Fragment>
        )}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => (
            <Chip
              {...getTagProps({ index })}
              label={option.name}
              avatar={showAvatar ? <IconAvatar url={option.photo} alt={option.name} sx={{ mr: 1 }} /> : undefined}
              key={index}
            />
          ))
        }
        value={selectedValue}
        onChange={handleValueChange}
      />
      {/* just single showing address */}
      {showAddress && selectedValue && !Array.isArray(selectedValue) && (
        <Grid container sx={{ pt: 1 }}>
          <Grid item xs={12} lg={6}>
            <Stack spacing={1}>
              <InputLabel>Billing Address</InputLabel>
              {selectedValue?.billAddress ? <Typography>{formatAddress(selectedValue.billAddress)}</Typography> : <em>(none)</em>}
            </Stack>
          </Grid>
          <Grid item xs={12} lg={6} sx={{ pl: 1 }}>
            <Stack spacing={1}>
              <InputLabel>Shipping Address</InputLabel>
              {selectedValue?.shipAddress ? <Typography>{formatAddress(selectedValue.shipAddress)}</Typography> : <em>(none)</em>}
            </Stack>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default CustomerAutoComplete;
