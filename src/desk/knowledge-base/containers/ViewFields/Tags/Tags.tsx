import Icon from '@base/assets/icons/svg-icons';
import { IdName } from '@base/types/common';
import { useKnowledgeBaseTags } from '@desk/knowledge-base/hooks/useKnowledgeBaseTags';
import { Autocomplete, Box, IconButton, TextField } from '@mui/material';
import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Check, Close, SaveOutlined } from '@mui/icons-material';
import HanButtonGroup from '@base/components/@hanbiro/HanButtonGroup';

interface TagsProps {
  value: IdName[] | null;
  onChange: (nVal: IdName[]) => void;
  readOnly?: boolean;
  tags?: IdName[];
}
const Tags = (props: TagsProps) => {
  const { value, onChange, readOnly = false } = props;
  const [selectedValue, setSelectedValue] = useState<IdName[]>([]);
  const [inputText, setInputText] = useState('');
  const [searchText, setSearchText] = useState('');
  //lang
  const { t } = useTranslation();
  const setSearchTextDebounced = useRef(_.debounce((searchText) => setSearchText(searchText), 500)).current;
  const { data, isLoading } = useKnowledgeBaseTags(searchText);
  const handleInputChange = (event: React.SyntheticEvent, value: string, reason: string) => {
    // prevent outside click from resetting searchText to ""
    setInputText(value);
    setSearchTextDebounced(value);
  };

  const handleValueChange = (nVal: IdName[]) => {
    onChange && onChange(nVal);
  };

  useEffect(() => {
    if (value && value?.length > 0) {
      if (!_.isEqual(value, selectedValue)) {
        setSelectedValue(value);
      }
    } else {
      setSelectedValue([]);
    }
  }, [value]);

  return (
    <Autocomplete
      fullWidth
      multiple={true}
      value={selectedValue}
      getOptionLabel={(option: any) => option?.name ?? ''}
      loading={isLoading}
      options={data?.data ?? []}
      onChange={(event: any, value: IdName[]) => {
        if (value) handleValueChange(value);
      }}
      // value={selectedValue}
      renderInput={(params) => {
        return <TextField {...params} placeholder={t('ncrm_desk_knowledge_tag_placeholder') ?? ''} />;
      }}
      filterSelectedOptions
      inputValue={inputText}
      onInputChange={handleInputChange}
      readOnly={readOnly}
      popupIcon={readOnly ? '' : <ArrowDropDownIcon />}
      isOptionEqualToValue={(option, value) => option?.id === value?.id}
    />
  );
};

export default Tags;
