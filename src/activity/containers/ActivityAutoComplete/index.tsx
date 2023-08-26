import React, { useState, useEffect, useRef, ReactNode } from 'react';

//third-party
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

//project
import { Activity } from '@activity/types/activity';
import { ActivityType } from '@activity/types/type';
import { useActivityList } from '@activity/hooks/useActivityList';

// material-ui
import { Autocomplete, Box, Chip, CircularProgress, TextField } from '@mui/material';

interface ActivityAutoCompleteProps {
  placeholder?: string;
  type?: ActivityType; // call, email, sms, task
  single?: boolean;
  visible?: boolean;
  //showAllOption?: boolean;
  isDisabled?: boolean;
  //exceptItems?: any;
  value?: any | any[]; // [], initial value
  onChange?: (val: Activity | Activity[] | null) => void;
  minWidth?: number | string;
  //addLabel?: string;
  //onAdd?: any;
}

/**
 *
 * @param {*} props
 * @returns
 */
const ActivityAutoComplete = (props: ActivityAutoCompleteProps) => {
  const {
    placeholder = 'ncrm_common_activity_auto_placeholder',
    type = 'TYPE_TASK',
    single = false, //
    visible = true, //hide or display selected items
    //showAllOption = false,
    isDisabled = false,
    //exceptItems = [],
    value, //[], initial value
    onChange,
    minWidth = 300
    //addLabel,
    //onAdd,
  } = props;
  const { t } = useTranslation();
  //state
  const [searchText, setSearchText] = useState('');
  const setSearchTextDebounced = useRef(_.debounce((searchText) => setSearchText(searchText), 1500)).current;
  const [options, setOptions] = useState<readonly Activity[]>([]);
  const [selectedValue, setSelectedValue] = useState<Activity | Activity[] | null>(single ? null : []);
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
      setSelectedValue(single ? null : []);
    }
  }, [value, options]);

  // build params
  const getSearchParams = () => {
    let queryFilters: string[] = [`type:${type}`];

    if (searchText != '') {
      queryFilters.push(`subject:${searchText}`);
    }

    let params = {
      filter: {
        query: queryFilters.join(' '),
        sort: {
          field: 'createdAt',
          orderBy: 2
        },
        paging: {
          page: 1,
          size: 99
        }
      }
    };

    return params;
  };

  const {
    results: activityData,
    status: searchStatus
    //refetch,
  } = useActivityList(['id', 'subject'].join('\n'), getSearchParams());

  //init states list
  useEffect(() => {
    if (activityData?.data) {
      //TODO: add all option
      //   if (showAllOption) {
      //     tmpOptions?.unshift({
      //       label: t('All Customers'),
      //       value: 'all',
      //     });
      //   }
      setOptions(activityData.data);
    } else {
      setOptions([]);
    }
  }, [activityData]);

  //input text change
  const handleInputChange = (event: React.SyntheticEvent, value: string, reason: string) => {
    // prevent outside click from resetting inputText to ""
    setSearchText(value);
    setSearchTextDebounced(value);
  };

  //value change
  const handleValueChange = (event: React.SyntheticEvent, selected: Activity | Activity[] | null, reason: string) => {
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
      id="asynchronous-activity"
      multiple={!single}
      //limitTags={3}
      sx={{ minWidth: minWidth }}
      open={isOpen}
      onOpen={() => {
        setIsOpen(true);
      }}
      onClose={() => {
        setIsOpen(false);
      }}
      //isOptionEqualToValue={(option, value) => option.subject === value.subject}
      getOptionLabel={(option) => (option ? option.subject : '')}
      options={options}
      loading={searchStatus === 'loading'}
      filterSelectedOptions
      renderInput={(params) => (
        <TextField
          {...params}
          // label={placeholder}
          placeholder={t(placeholder) as string}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {searchStatus === 'loading' ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            )
          }}
        />
      )}
      renderOption={(props, option, { selected }) => (
        <Box component="li" {...props} key={option.id}>
          {/* {showAvatar && <IconAvatar url={option.photo} alt={option.name} sx={{ mr: 1 }} />} */}
          {option.subject}
        </Box>
      )}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip
            label={option.subject}
            // avatar={showAvatar ? <IconAvatar url={option.photo} alt={option.name} sx={{ mr: 1 }} /> : undefined}
            {...getTagProps({ index })}
            key={option.id}
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

export default ActivityAutoComplete;
