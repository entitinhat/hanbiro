import { useEffect, useMemo, useState } from 'react';
import _, { isObject, isUndefined } from 'lodash';
import { useTranslation } from 'react-i18next';

// mui import
import { FormControl, IconButton, MenuItem, Select, Tooltip, useTheme } from '@mui/material';
import { Clear } from '@mui/icons-material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
      // maxWidth: 200
    }
  }
};

interface LookUpProps {
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
}

const LookUp = (props: LookUpProps) => {
  console.log('...LookUp...', props);

  const {
    value,
    onChange = (params: any) => {},
    fieldValue = 'value',
    fieldLabel = 'label',
    isSearch = true,
    isMultiple = false,
    fetchList = (params: any, schema?: string, options?: any) => {
      return { data: null, isLoading: false };
    },
    extraParams = {},
    schema = '',
    defaultOptions = null
  } = props;

  const { t } = useTranslation();

  const theme = useTheme();

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

  const handleValueChange = (event: any) => {
    console.log('handleValueChange', event.target.value);
    const value = event.target.value;
    const found = lookupOptions.find((_opt: any) => _opt[fieldValue] === value);
    if (found) {
      onChange && onChange(found);
    }
  };

  const defaultValue = useMemo(() => {
    if (!_.isEmpty(value)) {
      if (_.isArray(value)) {
        // return value.map((v) => ({
        //   [fieldLabel]: t(v[fieldLabel]),
        //   [fieldValue]: v[fieldValue]
        // }));
        return value?.map((v: any) => v?.[fieldValue]);
      } else if (_.isString(value)) {
        return value;
      } else {
        // return {
        //   [fieldLabel]: t(value[fieldLabel]),
        //   [fieldValue]: value[fieldValue]
        // };
        return value?.[fieldValue];
      }
    }
    if ((!value || _.isEmpty(value)) && lookupOptions.length > 0) {
      return lookupOptions[0][fieldValue];
    }
    return null;
  }, [value, lookupOptions]);

  useEffect(() => {
    if (defaultValue) {
      handleValueChange({ target: { value: defaultValue } });
    }
  }, [defaultValue]);

  console.log('...LOOKUP...', defaultValue, lookupOptions);
  return (
    <Select
      fullWidth
      displayEmpty
      inputProps={{ 'aria-label': 'look up' }}
      multiple={isMultiple}
      value={defaultValue ?? ''}
      onChange={handleValueChange}
      MenuProps={MenuProps}
      endAdornment={
        <Tooltip title="Clear">
          <IconButton
            size="small"
            sx={{ visibility: (isMultiple && defaultValue.length > 0) || (!isMultiple && defaultValue) ? 'visible' : 'hidden', mr: 2 }}
          >
            <Clear color="inherit" fontSize="small" />
          </IconButton>
        </Tooltip>
      }
    >
      {lookupOptions.length == 0 ? (
        <MenuItem value="" disabled>
          <em>No option</em>
        </MenuItem>
      ) : null}

      {lookupOptions.map((_option: any, idx: number) => {
        const key = _option?.[fieldValue] ?? idx;
        return (
          <MenuItem key={key} value={_option?.[fieldValue]} style={{ fontWeight: theme.typography.fontWeightRegular }}>
            {t(_option?.[fieldLabel])}
          </MenuItem>
        );
      })}
    </Select>
  );
};
export default LookUp;
