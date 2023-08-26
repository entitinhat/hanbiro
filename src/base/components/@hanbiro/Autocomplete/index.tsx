import Icon from '@base/assets/icons/svg-icons';
import {
  Autocomplete,
  autocompleteClasses,
  Box,
  Button,
  Chip,
  CircularProgress,
  Grow,
  IconButton,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  TextField
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface AutoCompleteCustomProps {
  iconIndicator?: null;
  options: any[];
  defaultOptions?: string[];
  placeholder?: string;
  multiple?: boolean;
  onAdd?: any;
  onIconClick?: any;
  addLabel?: string;
  Component?: any;
  noOptionsText?: any; //node
  loadingText?: any; //node
  loading?: boolean;
  onChange?: any;
  sx?: any;
  disabled?: boolean;
  readonly?: boolean;
  value?: any;
  open?: any;
  onOpen?: any;
  onClose?: any;
  disableClearable?: boolean;
  isCustomRenderTag?: any;
  TagComponent?: any;
}

const AutoCompleteCustom = (props: AutoCompleteCustomProps) => {
  const {
    iconIndicator,
    options,
    defaultOptions,
    placeholder = 'ncrm_common_select_placeholder',
    multiple = false,
    addLabel,
    Component = null,
    onAdd = null,
    onIconClick = null,
    loading = false,
    loadingText,
    noOptionsText = 'no options',
    sx = undefined,
    disabled = false,
    readonly = false,
    onChange,
    value = null, //prevent the Autocomplete going into uncontrolled mode when value is undifined
    isCustomRenderTag = false,
    TagComponent,
    ...opts
  } = props;
  const { t } = useTranslation();
  //custom dropdown indicator
  const [valueTextField, setValueTextField] = useState<undefined | any>();
  const DropdownIndicator = () => {
    return (
      <Box
        onClick={(e) => {
          if (onIconClick) {
            e.stopPropagation();
            onIconClick ?? onIconClick();
          }
        }}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingLeft: '5px', borderLeft: '1px solid gray' }}
      >
        {iconIndicator || Icon('users')}
      </Box>
    );
  };
  const CustomMenuOption: React.FC<any> = (propsOption: any) => {
    const { children, ...props } = propsOption;
    //render
    return (
      //<Grow in>
      <Paper elevation={8} {...props}>
        {onAdd ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '5px', padding: '5px 0' }}>
            <Button
              onMouseDown={(e) => {
                e.preventDefault();
                onAdd();
              }}
              size="small"
              sx={{ color: 'black', opacity: '50%' }}
              startIcon={Icon('plus')}
            >
              {addLabel}
            </Button>
          </Box>
        ) : (
          ''
        )}

        {children}
      </Paper>
      //</Grow>
    );
  };

  const CustomOption: React.FC<any> = (propsCustomOption: any) => {
    const { props, option } = propsCustomOption;
    if (Component) return <Component option={option} props={props} />;
    else
      return (
        <li key={option.label ?? option.name ?? option.keyName ?? option} {...props}>
          {t(option.label ?? option.name ?? option.keyName ?? option)}
        </li>
      );
  };

  return (
    <Box sx={{ padding: '5px 0px' }}>
      <Box
        sx={{
          marginLeft: 'auto',
          transition: 'all .3s',
          position: 'relative',
          display: 'flex',
          alignItems: 'stretch'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          {/* <OutlinedInput sx={{ border: 'none', width: '100%' }} placeholder="Name" /> */}
          <Autocomplete
            {...opts}
            multiple={multiple}
            id="checkboxes-tags-demo"
            options={options}
            disableCloseOnSelect={multiple}
            // PaperComponent={CustomMenuOption}
            renderOption={(props, option) => <CustomOption key={option.value} option={option} props={props} />}
            style={{ width: sx?.width ?? '100%' }}
            sx={{
              // [`& .${autocompleteClasses.popupIndicator}`]: {
              //   transform: 'none'
              // },
              ['& .MuiAutocomplete-tag']: {
                margin: '2px'
              },

              ...sx
            }}
            disabled={disabled}
            renderInput={({ inputProps, ...rest }) => (
              <TextField
                value={valueTextField}
                {...rest}
                sx={{
                  label: { fontSize: '14px' },
                  '.css-1t81aza-MuiFormLabel-root-MuiInputLabel-root ': {
                    lineHeight: '1.4325rem',
                    top: '-8px'
                  }
                }}
                inputProps={{
                  ...inputProps,
                  readOnly: readonly,
                  endadornment: <>{loading ? <CircularProgress size={20} /> : null}</>
                }}
                placeholder={`${multiple && valueTextField?.length > 0 ? '' : (t(placeholder) as string)}`}
              />
            )}
            // popupIcon={<DropdownIndicator />}
            popupIcon={<ArrowDropDownIcon />}
            loading={loading}
            loadingText={loadingText}
            noOptionsText={noOptionsText}
            onChange={(event, value) => {
              if (multiple) setValueTextField(value);

              onChange(value);
            }}
            value={value}
            renderTags={
              isCustomRenderTag
                ? (value, getTagProps) => {
                    return <TagComponent value={value} getTagProps={getTagProps} />;
                  }
                : undefined
            }
            isOptionEqualToValue={(option, value) => value === undefined || value === '' || option?.value === value?.value}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AutoCompleteCustom;
//<IconButton>{Icon('product_unit')}</IconButton>
