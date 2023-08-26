import React, { useState, useEffect, useRef, Fragment } from 'react';

//third-party
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

//project
import { Customer } from '@customer/types/interface';

// material-ui
import { Autocomplete, Chip, CircularProgress, TextField } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

//menu
import { useAutoCompleteCompetitors } from '@competitor/hooks/useCompetitors';

interface AutoCompleteProps {
  single?: boolean;
  placeholder?: string;
  value?: any; //object or array
  onChange?: (val: any) => void;
}

/**
 *
 * @param {*} props
 * @returns
 */
const CompetitorAutoComplete = (props: AutoCompleteProps) => {
  const { t } = useTranslation();
  const {
    placeholder = 'Type or click to select a item...',
    single = true,
    value, //[], initial value
    onChange
  } = props;
  //state
  const [inputText, setInputText] = useState('');
  const [searchText, setSearchText] = useState('');
  const setSearchTextDebounced = useRef(_.debounce((searchText) => setSearchText(searchText), 1000)).current;
  const [options, setOptions] = useState<readonly Customer[]>([]);
  const [selectedValue, setSelectedValue] = useState<any>(single ? null : []);
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

  //get data
  const {
    data,
    isFetching
    //refetch,
  } = useAutoCompleteCompetitors(searchText);
  //console.log('postResult', custData);

  //init states list
  useEffect(() => {
    if (data?.data) {
      setOptions(data.data);
    } else {
      setOptions([]);
    }
  }, [data]);

  //value change
  const handleValueChange = (event: React.SyntheticEvent, selected: any, reason: string) => {
    //console.log('selected', selected);
    setSelectedValue(selected);
    setInputText('');
    setSearchTextDebounced('');
    //callback
    onChange && onChange(selected);
  };

  return (
    <Autocomplete
      id="asynchronous-competitor-list"
      multiple={!single}
      //disabled={isDisabled}
      //readOnly={readOnly}
      //limitTags={3}
      // sx={{ minWidth: 300 }}
      open={isOpen}
      onOpen={() => {
        setIsOpen(true);
      }}
      onClose={() => {
        setIsOpen(false);
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
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip
            label={option.name}
            //avatar={showAvatar ? <IconAvatar url={option.photo} alt={option.name} sx={{ mr: 1 }} /> : undefined}
            {...getTagProps({ index })}
            key={option.id}
          />
        ))
      }
      value={selectedValue}
      onChange={handleValueChange}
      popupIcon={<ArrowDropDownIcon />}
      isOptionEqualToValue={(option, value) => {
        return option.id === value.id;
      }}
    />
  );
};

export default CompetitorAutoComplete;
