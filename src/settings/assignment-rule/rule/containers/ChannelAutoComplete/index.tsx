import { useEffect, useRef, useState } from 'react';

//project
import { IdName } from '@base/types/common';
import { CTYPE_OPTIONS } from '@settings/preferences/config/constants';
import { useChannelsType } from '@settings/preferences/hooks/desk/useChannels';
import { ChannelType } from '@settings/preferences/types/desk/common';

//material-ui
import { Autocomplete, Grid, TextField, useTheme } from '@mui/material';

//third-party
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

interface ChannelAutoCompleteProps {
  value: { id: string; name: string; type: ChannelType };
  onChange?: (val: { id: string; name: string; type: ChannelType }) => void;
}
const ChannelAutoComplete = (props: ChannelAutoCompleteProps) => {
  const { value, onChange } = props;
  const theme = useTheme();
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState<string>('');
  const setSearchTextDebounced = useRef(_.debounce((searchText) => setSearchText(searchText), 1500)).current;

  const [curType, setCurType] = useState<{ value: ChannelType; label: string } | null>(null);
  const [curChannel, setCurChannel] = useState<IdName | null>(null);
  const [channelOptions, setChannelOptions] = useState<IdName[]>([]);
  const { data } = useChannelsType(searchText, curType ? curType.value : undefined);
  //initial value
  useEffect(() => {
    if (value) {
      setCurType(CTYPE_OPTIONS.filter((option) => option.value == value.type)[0]);
      setCurChannel({ id: value.id, name: value.name });
    }
  }, [value]);
  useEffect(() => {
    if (data && data.results) {
      setChannelOptions(data.results);
      if (curType?.value == ChannelType.EMAIL) {
        setCurChannel(data.results[0]);
        onChange && onChange({ ...data.results[0], type: curType!.value });
      }
    } else setChannelOptions([]);
  }, [data]);
  useEffect(() => {
    setCurChannel(null);
  }, [curType]);
  const handleTypeChange = (event: React.SyntheticEvent, selected: { value: ChannelType; label: string } | null, reason: string) => {
    if (selected) {
      setCurType(selected);
    }
  };
  const handleChannelChange = (event: React.SyntheticEvent, selected: IdName | null, reason: string) => {
    if (selected) {
      console.log('!!!selected', selected);
      setCurChannel(selected);
      onChange && onChange({ ...selected, type: curType!.value });
    }
  };
  //input text change
  const handleInputChange = (event: React.SyntheticEvent, value: string, reason: string) => {
    // prevent outside click from resetting inputText to ""
    setSearchText(value);
    setSearchTextDebounced(value);
  };
  return (
    <Grid container>
      <Grid item xs={6} sx={{ pr: 2 }}>
        <Autocomplete
          multiple={false}
          value={curType}
          onChange={handleTypeChange}
          options={CTYPE_OPTIONS}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          getOptionLabel={(option) => option.label || ''}
          renderInput={(params) => (
            <TextField {...params} placeholder={t('ncrm_generalsetting_assignment_rule_channel_type_placeholder') ?? ''} />
          )}
        />
      </Grid>
      {curType && (
        <Grid item xs={6}>
          <Autocomplete
            multiple={false}
            disabled={curType?.value == ChannelType.EMAIL}
            value={curChannel}
            onChange={handleChannelChange}
            inputValue={searchText}
            onInputChange={handleInputChange}
            options={channelOptions}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) => option.name || ''}
            sx={{
              '& .Mui-disabled': {
                backgroundColor: theme.palette.secondary.lighter
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{
                  '& .MuiInputBase-input.Mui-disabled': {
                    WebkitTextFillColor: theme.palette.text.primary
                  }
                }}
                placeholder={t('ncrm_generalsetting_assignment_rule_channel_name_placeholder') ?? ''}
              />
            )}
          />
        </Grid>
      )}
    </Grid>
  );
};
export default ChannelAutoComplete;
