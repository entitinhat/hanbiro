import React, { useState, useEffect, useRef } from 'react';

//third-party
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

// material-ui
import { Autocomplete, Box, Chip, CircularProgress, TextField } from '@mui/material';
import { KnowledgeBase } from '@desk/knowledge-base/types/knowledge';
import { useKnowledgeBasesAutoComplete } from '@desk/knowledge-base/hooks/useKnowledgeBasesAutoComplete';

interface KBAutoCompleteProps {
  placeholder?: string;
  single?: boolean;
  visible?: boolean;
  isDisabled?: boolean;
  value?: KnowledgeBase | KnowledgeBase[]; // [], initial value
  onChange?: (val: KnowledgeBase | KnowledgeBase[] | null) => void;
  addLabel?: string;
  onAdd?: () => void;
}

/**
 *
 * @param {*} props
 * @returns
 */
const KBAutoComplete = (props: KBAutoCompleteProps) => {
  const {
    placeholder = 'ncrm_common_knowledge_autocomplete_placeholder',
    single = false, //
    visible = true, //hide or display selected items
    value, //[], initial value
    onChange,
    addLabel,
    onAdd
  } = props;
  const { t } = useTranslation();
  //state
  const [searchText, setSearchText] = useState('');
  const setSearchTextDebounced = useRef(_.debounce((searchText) => setSearchText(searchText), 1500)).current;
  const [options, setOptions] = useState<readonly KnowledgeBase[]>([]);
  const [selectedValue, setSelectedValue] = useState<KnowledgeBase | KnowledgeBase[] | null>(single ? null : []);
  const [isOpen, setIsOpen] = useState(false);

  //initial selected
  useEffect(() => {
    if (value) {
      if (Array.isArray(value)) {
        if (value.length > 0 && JSON.stringify(value) !== JSON.stringify(selectedValue)) {
          setSelectedValue(value);
        } else {
          // setSelectedValue([]);
        }
      } else {
        //single object
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
    } else {
      setSelectedValue(single ? null : []);
    }
  }, [value, options]);

  // build params
  const getSearchParams = () => {
    let params: any = {
      filter: {
        query: `groupBy=allPublished subject:${searchText}`,
        paging: {
          page: 1,
          size: 50
        }
      }
    };
    return params;
  };

  const {
    data: kbData,
    status: searchStatus
    //refetch,
  } = useKnowledgeBasesAutoComplete(getSearchParams());

  //init states list
  useEffect(() => {
    if (kbData?.data) {
      setOptions(kbData.data);
    } else {
      setOptions([]);
    }
  }, [kbData]);

  //input text change
  const handleInputChange = (event: React.SyntheticEvent, value: string, reason: string) => {
    // prevent outside click from resetting inputText to ""
    setSearchText(value);
    setSearchTextDebounced(value);
  };

  //value change
  const handleValueChange = (event: React.SyntheticEvent, selected: KnowledgeBase | KnowledgeBase[] | null, reason: string) => {
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
      id="asynchronous-kb"
      multiple={!single}
      //limitTags={3}
      sx={{ width: '80%' }}
      open={isOpen}
      onOpen={() => {
        setIsOpen(true);
      }}
      onClose={() => {
        setIsOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option?.subject === value?.subject}
      getOptionLabel={(option) => option.subject}
      options={options}
      loading={searchStatus === 'loading'}
      filterSelectedOptions
      renderOption={(props, option) => {
        // fix duplicate key map method
        return (
          <li {...props} key={option.id}>
            {option.subject}
          </li>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={t(placeholder) as string}
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
      inputValue={searchText}
      onInputChange={handleInputChange}
      value={selectedValue}
      onChange={handleValueChange}
    />
  );
};

export default KBAutoComplete;
