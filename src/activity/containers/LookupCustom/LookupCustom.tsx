import Icon from '@base/assets/icons/svg-icons';
import { OptionValue } from '@base/types/common';
import { Box, Chip } from '@mui/material';
import _, { isObject, isUndefined } from 'lodash';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AutoCompleteCustom from '@base/components/@hanbiro/AutocompleteCustom';

interface LookupProps {
  value: any;
  onChange: (params: any) => void;
  fieldValue?: string;
  fieldLabel?: string;
  isSearch?: boolean;
  isMultiple?: boolean;
  fetchList: (params: any) => void;
  useDefault?: boolean;
  extraParams?: Object;
  schema?: string;
  defaultOptions?: any[];
  label?: string;
}
const PRIORITY_STYLE = {
  default: {
    fontWeight: 'normal',
    fontSize: '0.8125rem',
    color: '#fff'
  },
  priorityUrgen: {
    backgroundColor: '#f00'
  },
  priorityHight: {
    backgroundColor: '#ffa200'
  },
  priorityMedium: {
    backgroundColor: '#3658c',
    color: '#0d0d0d'
  },
  priorityLow: {
    backgroundColor: '#1ec19a',
    color: '#0d0d0d'
  }
};
const CustomOption = (customProps: any) => {
  const { option, props } = customProps;

  const { t } = useTranslation();
  switch (option.languageKey) {
    case 'Urgent':
      return (
        <Box component="li" {...props}>
          <Chip size="small" sx={{ ...PRIORITY_STYLE.default, ...PRIORITY_STYLE.priorityUrgen }} label={`${t(option.languageKey)}`} />
          {/* //<Box sx={{ backgroundColor: 'red', padding: '5px', borderRadius: '4px' }} component="span"></Box> */}
        </Box>
      );

    case 'Hight':
      return (
        <Box component="li" {...props}>
          <Chip size="small" sx={{ ...PRIORITY_STYLE.default, ...PRIORITY_STYLE.priorityHight }} label={`${t(option.languageKey)}`} />
          {/* <Box sx={{ backgroundColor: 'orange', padding: '5px', borderRadius: '4px' }} component="span">{`${t(option.languageKey)}`}</Box> */}
        </Box>
      );

    case 'Medium':
      return (
        <Box component="li" {...props}>
          <Chip size="small" sx={{ ...PRIORITY_STYLE.default, ...PRIORITY_STYLE.priorityMedium }} label={`${t(option.languageKey)}`} />
          {/* <Box sx={{ backgroundColor: 'blue', padding: '5px', borderRadius: '4px' }} component="span">{`${t(option.languageKey)}`}</Box> */}
        </Box>
      );
    case 'Low':
      return (
        <Box component="li" {...props}>
          <Chip size="small" sx={{ ...PRIORITY_STYLE.default, ...PRIORITY_STYLE.priorityLow }} label={`${t(option.languageKey)}`} />
          {/* <Box sx={{ backgroundColor: 'gray', padding: '5px', borderRadius: '4px' }} component="span">{`${t(option.languageKey)}`}</Box> */}
        </Box>
      );
    default:
      return (
        <Box component="li" {...props}>
          {`${t(option.languageKey)}`}
        </Box>
      );
  }
};
const CustomTagValue = (tagValueProps: any) => {
  const { value, getTagProps } = tagValueProps;
  console.log(value);
  const { t } = useTranslation();
  return value.map((option: any, index: any) => {
    switch (option.languageKey) {
      case 'Urgent':
        return (
          <Chip
            {...getTagProps({ index })}
            size="small"
            sx={{ ...PRIORITY_STYLE.default, ...PRIORITY_STYLE.priorityUrgen }}
            label={`${t(option.languageKey)}`}
          />
        );

      case 'Hight':
        return (
          <Chip
            {...getTagProps({ index })}
            size="small"
            sx={{ ...PRIORITY_STYLE.default, ...PRIORITY_STYLE.priorityHight }}
            label={`${t(option.languageKey)}`}
          />
        );

      case 'Medium':
        return (
          <Chip
            {...getTagProps({ index })}
            size="small"
            sx={{ ...PRIORITY_STYLE.default, ...PRIORITY_STYLE.priorityMedium }}
            label={`${t(option.languageKey)}`}
          />
        );
      case 'Low':
        return (
          <Chip
            {...getTagProps({ index })}
            size="small"
            sx={{ ...PRIORITY_STYLE.default, ...PRIORITY_STYLE.priorityLow }}
            label={`${t(option.languageKey)}`}
          />
        );
      default:
        return (
          <Box component="li" {...getTagProps({ index })}>
            {`${t(option.languageKey)}`}
          </Box>
        );
    }
  });
};
const LookupCustom = (props: LookupProps) => {
  const {
    value,
    onChange = (params: any) => {},
    fieldValue = 'value',
    fieldLabel = 'label',
    isSearch = true,
    isMultiple = false,
    fetchList = (params: any, schema?: string, options?: any) => {},
    extraParams = {},
    schema,
    defaultOptions,
    ...opts
  } = props;
  const { t } = useTranslation();
  const [keyword, setKeyword] = useState('');
  const [params, setParams] = useState<any>({
    keyword: keyword,
    ...extraParams
  });
  const queryOptions = defaultOptions && {
    enabled: false
  };
  const useParams = !isUndefined(extraParams) && isObject(extraParams);
  const { data, isLoading: queryLoading }: any = useParams ? fetchList(params, schema, queryOptions) : fetchList(keyword);
  const items = data?.results ?? data?.data;
  const isLoading = defaultOptions ? false : queryLoading;
  const lookupOptions = useMemo(() => {
    if (defaultOptions) {
      return defaultOptions;
    }
    if (items) {
      return items.map((v: any) => ({
        [fieldLabel]: t(v[fieldLabel]),
        [fieldValue]: v[fieldValue]
      }));
    }
    return [];
  }, [items, defaultOptions]);

  const onInputChange = (newValue: string, event: any) => {
    if (event.action !== 'input-blur' && event.action !== 'menu-close') {
      // for template
      if (useParams) {
        setParams({
          keyword: newValue,
          ...extraParams
        });
      } else {
        // for normal
        setKeyword(newValue);
      }
    }
  };

  const handleValueChange = (data: any) => {
    console.log(data);
    onChange && onChange(data);
  };

  const defaultValue = useMemo(() => {
    if (!_.isEmpty(value)) {
      if (_.isArray(value)) {
        return value.map((v) => ({
          [fieldLabel]: t(v[fieldLabel]),
          [fieldValue]: v[fieldValue]
        }));
      } else {
        return {
          [fieldLabel]: t(value[fieldLabel]),
          [fieldValue]: value[fieldValue]
        };
      }
    }
    return null;
  }, [value]);

  console.log('lookupOptions >>>>>>', lookupOptions);
  console.log('defaultValue >>>>>>', defaultValue);
  return (
    <AutoCompleteCustom
      iconIndicator={Icon('down')}
      options={lookupOptions}
      disabled={true}
      multiple={isMultiple}
      onChange={handleValueChange}
      value={defaultValue}
      Component={CustomOption}
      {...opts}
      //isCustomRenderTag={lookupOptions[0]?.languageKey === 'Urgent'}
      //TagComponent={CustomTagValue}
    />
  );
};

export default LookupCustom;
