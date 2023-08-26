import { useState, useEffect } from 'react';

//third-party
import _ from 'lodash';

// material-ui
import { Autocomplete, Box, CircularProgress, TextField, Typography } from '@mui/material';
import { LIST_TABLE_PAGE_SIZE } from '@base/config/constant';
import { ListUsersRequest, User } from '@settings/users-groups/users/types';
import { useUsers } from '@settings/users-groups/users/hooks/useUsers';
import { useOrg } from '@base/hooks/iam/useOrg';
import { handleScroll } from '@settings/users-groups/utils/helper';

interface UserAutocompleteProps {
  placeholder?: string;
  value: string;
  onChange: (params: any) => void;
  label?: string;
  disableClearable?: boolean;
  getName?: (value: string) => void;
  multiple?: boolean;
  readOnly?: boolean;
}

const UserAutocomplete = (props: UserAutocompleteProps) => {
  const {
    placeholder = 'click to select a Locale...',
    value, //[], initial value
    onChange,
    label,
    disableClearable = false,
    getName,
    multiple = false,
    readOnly = false
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<User[] | undefined>([]);
  const [selectedValue, setSelectedValue] = useState<User | User[] | null>(null);

  //initial options have at least 20 items to appear scroolbar (support loadding more data when scrolling)
  const [maxResults, setMaxResults] = useState(LIST_TABLE_PAGE_SIZE * 2);

  //==============================================Get Data==============================================
  const { id: orgId } = useOrg();
  // initial selected
  const req: ListUsersRequest = {
    orgId: orgId,
    maxResults: maxResults
  };
  const { results, isLoading } = useUsers(req);
  //============================================================================================

  //================================================Initial options and value===================================
  useEffect(() => {
    if (results) {
      setOptions(results.items);
    }
  }, [results]);

  useEffect(() => {
    if (value) {
      const newValue = options?.find((option) => option.id === value);
      if (newValue) {
        setSelectedValue(newValue);
      } else {
        multiple ? setSelectedValue([]) : setSelectedValue(null);
      }
    }
  }, [value, options]);
  //==========================================================================================================

  let placeholderCond = placeholder;
  if (label) {
    placeholderCond = '';
  }

  //===DEBUG

  //render
  return (
    <Autocomplete
      id="user-autocomplete"
      readOnly={readOnly}
      ListboxProps={{
        onScroll: (event: any) => {
          const orderCondition = results?.nextCursor && results?.nextCursor?.length > 0 ? true : false;
          /**handle scroll to load more data */
          handleScroll(event, orderCondition, () => {
            setMaxResults((prev) => prev + LIST_TABLE_PAGE_SIZE);
          });
        }
      }}
      disableClearable={disableClearable}
      multiple={multiple ?? false}
      open={isOpen}
      onOpen={() => {
        setIsOpen(true);
      }}
      onClose={() => {
        setIsOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      filterSelectedOptions={multiple ?? false}
      options={options ?? []}
      getOptionLabel={(options) => options?.displayName}
      loading={isLoading}
      renderInput={(params) => <TextField {...params} label={label} placeholder={placeholderCond} />}
      onChange={(event: any, value: User | User[] | null) => {
        if (Array.isArray(value)) {
          onChange && onChange(value);
          setSelectedValue(value);
        } else {
          onChange && onChange(value?.id);
          setSelectedValue(value);
          getName && getName(value?.displayName ?? '');
        }
      }}
      value={selectedValue}
    />
  );
};

export default UserAutocomplete;
