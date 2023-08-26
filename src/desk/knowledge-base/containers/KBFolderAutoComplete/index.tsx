import React, { useState, useEffect, useRef } from 'react';

//third-party
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

// material-ui
import { Autocomplete, Box, Chip, CircularProgress, TextField } from '@mui/material';
import { KnowledgeBaseCategory } from '@desk/knowledge-base/types/knowledge';
import { useKnowledgeBaseCategories, useKnowledgeBaseFolders } from '@desk/knowledge-base/hooks/useKnowledgeBaseCategories';

interface KBFolderAutoCompleteProps {
  single?: boolean;
  visible?: boolean;
  isDisabled?: boolean;
  value?: KnowledgeBaseCategory | KnowledgeBaseCategory[] | null; // [], initial value
  onChange?: (val: KnowledgeBaseCategory | KnowledgeBaseCategory[] | null) => void;
  addLabel?: string;
  onAdd?: () => void;
  categoryId?: string;
  folderParentId?: string;
}

/**
 *
 * @param {*} props
 * @returns
 */

const newPlaceholder = `ncrm_desk_knowledge_folder_auto_placeholder`;
const noOptMsg = `ncrm_desk_knowledge_folder_not_found_message`;
const noIdMsg = `ncrm_desk_knowledge_category_not_selected_message`;
const KBFolderAutoComplete = (props: KBFolderAutoCompleteProps) => {
  const {
    single = true, //
    visible = true, //hide or display selected items
    value, //[], initial value
    onChange,
    addLabel,
    onAdd,
    categoryId,
    folderParentId
  } = props;
  const { t } = useTranslation();
  //state
  const [inputText, setInputText] = useState<string>('');
  const [searchText, setSearchText] = useState('');
  const setSearchTextDebounced = useRef(_.debounce((searchText) => setSearchText(searchText), 1500)).current;
  const [options, setOptions] = useState<readonly KnowledgeBaseCategory[]>([]);
  const [selectedValue, setSelectedValue] = useState<KnowledgeBaseCategory | KnowledgeBaseCategory[] | null>(single ? null : []);
  const [isOpen, setIsOpen] = useState(false);

  //initial selected
  useEffect(() => {
    if (value) {
      if (Array.isArray(value)) {
        if (value.length > 0 && JSON.stringify(value) !== JSON.stringify(selectedValue)) {
          setSelectedValue(value);
        } else {
          setSelectedValue([]);
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
  const {
    data: postData,
    isLoading,
    isFetching,
    refetch
  } = useKnowledgeBaseFolders({
    keyword: searchText,
    categoryId: categoryId || '',
    folderParentId: folderParentId || ''
  });


  //init states list
  useEffect(() => {
    if (postData?.data) {
      setOptions(postData?.data);
    } else {
      setOptions([]);
    }
  }, [postData]);

  //input text change
  const handleInputChange = (event: React.SyntheticEvent, value: string, reason: string) => {

    setInputText(value);
    // fix delay when select/delete
    if (reason == 'clear' || reason == 'reset') setSearchText(value);
    else setSearchTextDebounced(value);
  };

  //value change
  const handleValueChange = (
    event: React.SyntheticEvent,
    selected: KnowledgeBaseCategory | KnowledgeBaseCategory[] | null,
    reason: string
  ) => {

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
    <>
      {folderParentId && options.length == 0 ? (
        <></>
      ) : (
        <Autocomplete
          id="asynchronous-folder"
          multiple={!single}
          //limitTags={3}
          open={isOpen}
          onOpen={() => {
            setIsOpen(true);
          }}
          onClose={() => {
            setIsOpen(false);
          }}
          isOptionEqualToValue={(option, value) => option?.id === value?.id}
          getOptionLabel={(option) => option.name}
          noOptionsText={t(noOptMsg)}
          options={categoryId ? options : []}
          loading={isLoading}
          renderOption={(props, option) => {
            // fix duplicate key map method
            return (
              <li {...props} key={option.id}>
                {option.name}
              </li>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={categoryId ? (t(newPlaceholder) as string) : (t(noIdMsg) as string)}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {isLoading ? <CircularProgress size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                )
              }}
            />
          )}
          inputValue={inputText}
          onInputChange={handleInputChange}
          value={selectedValue}
          onChange={handleValueChange}
        />
      )}
    </>
  );
};

export default KBFolderAutoComplete;
