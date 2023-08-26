import React, { useState, useEffect, useRef } from 'react';

//third-party
import _ from 'lodash';

// material-ui
import { Autocomplete, Box, CircularProgress, Stack, TextField, Typography } from '@mui/material';
import { LIST_TABLE_PAGE_SIZE } from '@base/config/constant';
import { Group, ListGroupsRequest } from '../../types/group';
import { useOrg } from '@base/hooks/iam/useOrg';
import { useGroups } from '../../hooks/useGroups';
import { handleScroll } from '@settings/users-groups/utils/helper';

interface GroupAutocompleteProps {
  placeholder?: string;
  value: string | string[] | null;
  onChange: (params: any) => void;
  label?: string;
  multiple?: boolean;
  disableClearable?: boolean;
  getName?: (value: string) => void;
}

const GroupAutocomplete = (props: GroupAutocompleteProps) => {
  const {
    placeholder = 'click to select a group...',
    value, //[], initial value
    onChange,
    label,
    multiple = false,
    disableClearable = false,
    getName
  } = props;

  //State
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<Group[] | undefined>([]);
  const [selectedValue, setSelectedValue] = useState<Group | Group[] | null>(multiple ? [] : null);

  //initial options have at least 20 items to appear scroolbar (support loadding more data when scrolling)
  const [maxResults, setMaxResults] = useState(LIST_TABLE_PAGE_SIZE * 2);
  //@TODO: Apply Search API
  const { id: orgId } = useOrg();
  const req: ListGroupsRequest = {
    orgId: orgId,
    maxResults: maxResults
  };
  const { results, isLoading } = useGroups(req);

  // console.log('check value', value, options, selectedValue);

  //==================================================Initial Value=====================================
  useEffect(() => {
    if (results) {
      setOptions(results?.items);
    }
  }, [results]);
  useEffect(() => {
    if (value) {
      if (Array.isArray(value)) {
        if (value.length > 0) {
          const newValue: any = [];
          value.forEach((_item: string) => {
            //find in options
            const fOption = options?.find((_ele: any) => _ele.id === _item);
            if (fOption) {
              newValue.push(fOption);
            }
          });
          setSelectedValue(newValue);
        }
      }
      //Single ID
      else {
        const newValue = options?.find((option) => option.id === value);
        if (newValue) {
          setSelectedValue(newValue);
        }
      }
    } else {
      multiple ? setSelectedValue([]) : setSelectedValue(null);
    }
  }, [value, options]);
  //=========================================================End===========================================
  // console.log('INPUT: GROUP Initial Value', value);
  //=========================================Place holder================================
  let placeholderCond = placeholder;
  if (label) {
    placeholderCond = '';
  }

  //===DEBUG

  //render
  return (
    <Autocomplete
      id="group-autocomplete"
      multiple={multiple ?? false}
      loading={isLoading}
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
      open={isOpen}
      onOpen={() => {
        setIsOpen(true);
      }}
      onClose={() => {
        setIsOpen(false);
      }}
      filterSelectedOptions={multiple ?? false}
      options={options ?? []}
      getOptionLabel={(options) => options.displayName}
      renderOption={(props, option, { selected }) => {
        return (
          <Box component="li" {...props} key={option.urlName}>
            <Stack direction="column">
              <Typography>{option.displayName}</Typography>
            </Stack>
          </Box>
        );
      }}
      // loading={searchStatus === 'loading'}
      renderInput={(params) => <TextField {...params} label={label} placeholder={placeholderCond} />}
      onChange={(event: any, value: Group | Group[] | null) => {
        if (Array.isArray(value)) {
          const groupIds = value.map((group) => group.id);
          onChange && onChange(groupIds);
          setSelectedValue(value);
        } else {
          onChange && onChange(value?.id);
          getName && getName(value?.displayName ?? '');
          setSelectedValue(value);
        }
      }}
      value={selectedValue}
    />
  );
};

export default GroupAutocomplete;
