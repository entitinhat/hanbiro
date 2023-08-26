import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Divider, Stack} from "@mui/material";
import {
  AssignGroup,
  AssignGroupProps,
  AssignUser,
  AssignUserProps,
  DateRange,
  DateRangeProps
} from "@analytic/main/components/Filter";
import {debounce} from "lodash";

export interface FilterBarProps {
  dateProps?: DateRangeProps;
  userProps?: AssignUserProps;
  groupProps?: AssignGroupProps;
  isDateUser?: boolean;
  isDateGroup?: boolean;
}

interface Props extends FilterBarProps {
  onChange?: (q: string) => void;
}

const FilterBar = (props: Props) => {
  const {
    dateProps: baseDateProps,
    userProps: baseUserProps,
    groupProps: baseGroupProps,
    isDateUser,
    isDateGroup,
    onChange
  } = props;

  const dateProps = {key: 'createdAt', ...baseDateProps};
  const userProps = isDateUser ? {key: 'assignToUser', ...baseUserProps} : undefined;
  const groupProps = isDateGroup ? {key: 'assignToGroup', ...baseGroupProps} : undefined;

  const [dateValue, setDateValue] = useState<{s: string, e: string}>({s: '', e: ''});
  const [userValue, setUserValue] = useState<string>('');
  const [groupValue, setGroupValue] = useState<string>('');

  const handleDateChange = (s: string, e: string) => {
    setDateValue({s, e});
  }

  const handleUserChange = (q: string) => {
    setUserValue(q);
  }

  const handleGroupChange = (q: string) => {
    setGroupValue(q);
  }

  const combineQuery = (): string => {
    let queries: string[] = [];
    if(!!dateValue){
      if(!!dateValue.s){
        queries = [...queries, `${dateProps?.key}>="${dateValue.s}"`];
      }
      if(!!dateValue.e){
        queries = [...queries, `${dateProps?.key}<="${dateValue.e}"`];
      }
      if(queries.length){
        queries = [`(${queries.join(' ')})`];
      }
    }
    if(!!userProps && !!userValue){
      queries = [...queries, `${userProps.key}="${userValue}"`];
    }
    if(!!groupProps && !!groupValue){
      queries = [...queries, `${groupProps.key}="${groupValue}"`];
    }
    return queries?.length ? queries.join(' ') : '';
  };

  const onChangeDebounce = useCallback(
    debounce(q => {
      console.log(q, 'aaaaaaaa')
      onChange && onChange(q);
    }, 200), []);

  useEffect(() => {
    const q: string = combineQuery();
    if (q !== ''){
      onChangeDebounce(q);
    }
  }, [dateValue, userValue, groupValue]);

  /*useEffect(() => {
    console.log(dateValue, 'dateValue');
  }, [dateValue]);

  useEffect(() => {
    console.log(userValue, 'userValue');
  }, [userValue]);

  useEffect(() => {
    console.log(groupValue, 'groupValue');
  }, [groupValue]);*/

  const DateRangeMemo = useMemo(() => {
    return <DateRange onChange={handleDateChange} {...dateProps}/>;
  }, []);

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      divider={<Divider orientation="vertical" flexItem />}
      p="15px"
    >
      {dateProps && <>{DateRangeMemo}</>}
      {userProps && <AssignUser onChange={handleUserChange} {...userProps}/>}
      {groupProps && <AssignGroup onChange={handleGroupChange} {...groupProps}/>}
    </Stack>
  );
};

export default FilterBar;