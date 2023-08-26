import SelectBox from '@base/components/@hanbiro/SelectBox';
import { IdName, OptionValue } from '@base/types/common';
import { Autocomplete, TextField } from '@mui/material';
import { useSalesTeams } from '@settings/preferences/hooks/sales/useSalesTeams';
import { useSalesTeamsSelect } from '@settings/preferences/hooks/sales/useSalesTeamsSelect';
import { SalesTeam } from '@settings/preferences/types/sales';
import _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface SalesTeamAutoCompleteProps {
  value: IdName[];
  onChange: (nVal: IdName[]) => void;
}

const SalesTeamAutoComplete = (props: SalesTeamAutoCompleteProps) => {
  const { value, onChange } = props;

  // =================================================================================
  const [selectedValue, setSelectedValue] = useState<IdName[]>([]);
  const [inputText, setInputText] = useState('');
  const [searchText, setSearchText] = useState('');
  //lang
  const { t } = useTranslation();
  const setSearchTextDebounced = useRef(_.debounce((searchText) => setSearchText(searchText), 500)).current;
  const { data, isLoading } = useSalesTeamsSelect(searchText);
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
        return <TextField {...params} placeholder={t('Type or click to select a sales team...') ?? ''} />;
      }}
      filterSelectedOptions
      inputValue={inputText}
      onInputChange={handleInputChange}
      isOptionEqualToValue={(option, value) => option?.id === value?.id}
    />
  );
};

export default SalesTeamAutoComplete;
