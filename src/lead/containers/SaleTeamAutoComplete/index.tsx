import React, { useState, useEffect, useRef } from 'react';

//third-party
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

//project
import IconAvatar from '@base/components/@hanbiro/IconAvatar';

// material-ui
import { Autocomplete, Box, Chip, CircularProgress, TextField } from '@mui/material';
import { Group, User } from '@base/types/user';
import { useUsersAutoComplete } from '@sign-in/hooks/useUsersAutoComplete';

interface SaleTeamAutoCompleteProps {
  size?: 'small' | 'medium' | undefined;
  placeholder?: string;
  single?: boolean;
  visible?: boolean;
  showAvatar?: boolean;
  showAllOption?: boolean;
  //showPopover?: boolean;
  isDisabled?: boolean;
  value?: any | any[]; // [], initial value
  onChange?: (val: User | User[] | null) => void;
  onAssignToMe?: () => void;
  options?: User[];
  fixedValue?: Group[];
}

/**
 *
 * @param {*} props
 * @returns
 */
const SaleTeamAutoComplete = (props: SaleTeamAutoCompleteProps) => {
  const { t } = useTranslation();
  const {
    placeholder = t('ncrm_common_user_auto_placeholder') as string,
    single = false, //
    visible = true, //hide or display selected items
    showAvatar = false,
    showAllOption = false,
    isDisabled = false,
    value, //[], initial value
    onChange,
    size = 'medium',
    onAssignToMe, //TODO
    options: initOptions,
    fixedValue
  } = props;

  const fixedIds: string[] = !!fixedValue ? fixedValue.map((v) => v.id) : [];

  //state
  const [searchText, setSearchText] = useState('');
  const setSearchTextDebounced = useRef(_.debounce((searchText) => setSearchText(searchText), 1500)).current;
  const [options, setOptions] = useState<readonly User[]>(initOptions ?? []);
  const [selectedValue, setSelectedValue] = useState<User | User[] | null>(single ? null : []);
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
      // setSelectedValue(single ? null : []);
    }
  }, [value, options]);

  //build params
  const getSearchParams = () => {
    let params: any = {
      groupId: '',
      keyword: searchText
    };
    return params;
  };

  const {
    data: userData,
    status: searchStatus
    //refetch,
  } = useUsersAutoComplete(getSearchParams());
  //console.log('postResult', userData);

  //init states list
  useEffect(() => {
    if (!initOptions && userData?.data) {
      //TODO: add all option
      //   if (showAllOption) {
      //     tmpOptions?.unshift({
      //       label: t('All Customers'),
      //       value: 'all',
      //     });
      //   }
      setOptions(userData.data);
    }
  }, [userData, initOptions]);

  //input text change
  const handleInputChange = (event: React.SyntheticEvent, value: string, reason: string) => {
    // prevent outside click from resetting inputText to ""
    setSearchText(value);
    setSearchTextDebounced(value);
  };

  //value change
  const handleValueChange = (event: React.SyntheticEvent, selected: User | User[] | null, reason: string) => {
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

  //render
  return (
    <Autocomplete
      id="asynchronous-user"
      size={size}
      multiple={!single}
      sx={{ minWidth: 200, width: '100%' }}
      open={isOpen}
      onOpen={() => {
        setIsOpen(true);
      }}
      onClose={() => {
        setIsOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.name || ''}
      options={options}
      loading={searchStatus === 'loading'}
      filterSelectedOptions
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={t(placeholder) as string} // translate language
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {searchStatus === 'loading' ? <CircularProgress size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            )
          }}
        />
      )}
      renderOption={(props, option, { selected }) => (
        <Box component="li" {...props} key={option.id}>
          {showAvatar && <IconAvatar url={option.photo} alt={option.name} sx={{ mr: 1 }} />}
          {option.name}
        </Box>
      )}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip
            size={size}
            label={option.name}
            avatar={showAvatar ? <IconAvatar url={option.photo} alt={option.name} sx={{ mr: 1 }} /> : undefined}
            {...getTagProps({ index })}
            key={option.id}
            disabled={fixedIds.indexOf(option.id) !== -1}
          />
        ))
      }
      inputValue={searchText}
      onInputChange={handleInputChange}
      value={selectedValue}
      onChange={handleValueChange}
    />
  );
};

export default SaleTeamAutoComplete;
