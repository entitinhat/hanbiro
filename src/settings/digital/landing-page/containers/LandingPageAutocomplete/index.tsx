import { Autocomplete, Box, Chip, TextField, useTheme } from '@mui/material';
import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { useGetLangdingPageList } from '@settings/digital/landing-page/hooks/useGetLandingPageList';
import { useTranslation } from 'react-i18next';
import { FilterInput } from '@base/types/common';

interface Props {
  value?: any;
  onChange: (params: any) => void;
  placeholder?: string;
  filter?: FilterInput;
}

const LandingPageAutocomplete = (props: Props) => {
  const { value = null, onChange, placeholder, filter } = props;

  const theme = useTheme();
  const { t } = useTranslation();

  //state
  const [searchText, setSearchText] = useState('');
  const setSearchTextDebounced = useRef(_.debounce((searchText) => setSearchText(searchText), 1500)).current;
  const [options, setOptions] = useState<any>([]);
  const [selectedValue, setSelectedValue] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  const { data: landingPageData, isLoading } = useGetLangdingPageList(filter);

  //convert to select options
  useEffect(() => {
    if (landingPageData?.data) {
      let newOptions = landingPageData?.data?.map((_item: any) => {
        return {
          ..._item,
          label: _item.name,
          value: _item.id
        };
      });
      setOptions(newOptions);
    } else {
      setOptions([]);
    }
  }, [landingPageData]);

  //initial selected
  useEffect(() => {
    if (value) {
      if (Array.isArray(value)) {
        if (value.length > 0) {
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
        }
      }
    } else {
      setSelectedValue(null);
    }
  }, [value, options]);

  //input text change
  const handleInputChange = (event: React.SyntheticEvent, value: string, reason: string) => {
    // prevent outside click from resetting inputText to ""
    setSearchText(value);
    setSearchTextDebounced(value);
  };

  //value change
  const handleValueChange = (event: React.SyntheticEvent, selected: any, reason: string) => {
    let newItem = selected;
    setSelectedValue(newItem);
    setSearchText('');
    setSearchTextDebounced('');

    //callback
    onChange && onChange(newItem);
  };
  
  return (
    <Autocomplete
      loading={isLoading}
      id="landing-page-autocomplete"
      open={isOpen}
      onOpen={() => {
        setIsOpen(true);
      }}
      onClose={() => {
        setIsOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option?.id === value.id}
      getOptionLabel={(option) => option?.name ?? ''}
      options={options || []}
      renderInput={(params) => (
        <TextField {...params} placeholder={placeholder ?? (t('ncrm_generalsetting_landingpage_placeholder') as string)} />
      )}
      renderOption={(props, option, { selected }) => (
        <Box component="li" {...props} key={option?.id}>
          {option?.name}
        </Box>
      )}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => <Chip label={option?.name} {...getTagProps({ index })} key={option?.id} />)
      }
      inputValue={searchText}
      onInputChange={handleInputChange}
      value={selectedValue}
      onChange={handleValueChange}
    />
  );
};

export default LandingPageAutocomplete;
