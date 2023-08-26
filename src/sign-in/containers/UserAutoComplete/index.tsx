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
import { useOrg } from '@base/hooks/iam/useOrg';
import { ListUsersRequest } from '@settings/users-groups/users/types';
import { useUsers } from '@settings/users-groups/users/hooks/useUsers';
import { LIST_TABLE_PAGE_SIZE } from '@base/config/constant';
import { handleScroll } from '@settings/users-groups/utils/helper';

interface UserAutoCompleteProps {
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
const UserAutoComplete = (props: UserAutoCompleteProps) => {
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
  //initial options have at least 20 items to appear scroolbar (support loadding more data when scrolling)
  const [maxResults, setMaxResults] = useState(LIST_TABLE_PAGE_SIZE * 2);
  //initial selected
  useEffect(() => {
    if (value) {
      if (Array.isArray(value)) {
        if (value.length > 0) {
          //2 cases for value: string[] or object[]
          //Case: string[]-> ids[]
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
            // Case user or Case {user, group}
            if (JSON.stringify(value) !== JSON.stringify(selectedValue)) {
              const newValue: any = [];
              const userIds = value.map((item: any) => {
                if (item.hasOwnProperty('user')) {
                  return item.user.id;
                } else {
                  return item.id;
                }
              });
              userIds.forEach((_item: string) => {
                //find in options
                const fOption = options.find((_ele: any) => _ele.id === _item);
                if (fOption) {
                  newValue.push(fOption);
                }
              });
              setSelectedValue(newValue);
            }
          }
        } else {
          setSelectedValue(single ? null : []);
        }
      } else {
        //single object
        //Case 1: if Value is id
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
          //Case 2: if Value is Object
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

  //@TODO: Update search API
  const { id: orgId } = useOrg();
  // initial selected
  const req: ListUsersRequest = {
    orgId: orgId,
    maxResults: maxResults
  };
  const { results, isLoading } = useUsers(req);
  // const users: User[] = [
  //   {
  //     id: '8S6wUoVSJE',
  //     displayName: 'Viet HM',
  //     urlName: 'viethm',
  //     primaryEmail: 'hoangminhviet2223@gmail.com',
  //     primaryPhone: '0982222132',
  //     orgId: 'org',
  //     fullName: 'Viet HM',
  //     emails: [],
  //     phones: [],
  //     name: 'Viet HM'
  //   }
  // ];
  // const results = {
  //   items: users,
  //   nextCursor: ''
  // };

  // console.log('setOptions', results);

  //init states list
  useEffect(() => {
    if (!initOptions && results?.items) {
      let userData = results?.items;

      let newUserData = userData.map((user) => {
        return {
          ...user,
          //=============This is old Format============================
          name: user.displayName ?? '',
          photo: '',
          email: user.primaryEmail,
          phone: user.primaryPhone
          //============================================================
        };
      });
      setOptions(newUserData);
    }
  }, [results, initOptions]);

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
    // console.log('OUTPUT: newItem  for Autocomplete ', newItem);
    onChange && onChange(newItem);
  };

  //===================================================Debug=============================================
  // console.log('INPUT: Data from server', results?.items);
  // console.log('INPUT: Initial Value ', value);
  console.log('INPUT: Initial Options for Autocomplete ', options);
  // console.log('INPUT: Initial Selected Value for Autocomplete ', selectedValue);

  //========================================================================================================
  //render
  return (
    <Autocomplete
      id="asynchronous-user"
      size={size}
      multiple={!single}
      ListboxProps={{
        onScroll: (event: any) => {
          const orderCondition = results?.nextCursor && results?.nextCursor?.length > 0 ? true : false;
          /**handle scroll to load more data */
          handleScroll(event, orderCondition, () => {
            setMaxResults((prev) => prev + LIST_TABLE_PAGE_SIZE);
          });
        }
      }}
      sx={{ minWidth: 200, width: '100%' }}
      open={isOpen}
      onOpen={() => {
        setIsOpen(true);
      }}
      onClose={() => {
        setIsOpen(false);
      }}
      isOptionEqualToValue={(option, value) => {
        return option.id === value.id;
      }}
      getOptionLabel={(option) => option.name || ''}
      options={options}
      // loading={searchStatus === 'loading'}
      filterSelectedOptions
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={t(placeholder) as string} // translate language
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {/* {searchStatus === 'loading' ? <CircularProgress size={20} /> : null} */}
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
      disabled={isDisabled}
    />
  );
};

export default UserAutoComplete;
