import Icon from '@base/assets/icons/svg-icons';
import { Box, Button, Chip, CircularProgress, useTheme } from '@mui/material';
import { Paper } from '@mui/material';
import { Autocomplete, TextField } from '@mui/material';
import { SxProps } from '@mui/system';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ExportTemplateAutocompleteProps {
  placeholder?: string;
  single?: boolean;
  value?: any | any[];
  addLabel?: string;
  sx?: SxProps;
  onChange?: (val: any) => void;
  onAdd?: (val: boolean) => void;
}

const ExportTemplateAutocomplete = (props: ExportTemplateAutocompleteProps) => {
  const { placeholder = 'Select an Export Template', single = true, value, onChange, onAdd, addLabel, sx } = props;

  // state
  const [inputText, setInputText] = useState<string>('');
  const [options, setOptions] = useState<any>([]);
  const [selectedValue, setSelectedValue] = useState<any>(null);
  const theme = useTheme();
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);

  // input text change
  const handleInputChange = (event: React.SyntheticEvent, value: string, reason: string) => {
    setInputText(value);
  };

  //value change
  const handleValueChange = (event: React.SyntheticEvent, selected: any, reason: string) => {
    setSelectedValue(selected);

    //callback
    onChange && onChange(selected);
  };

  // customize
  const CustomOption: React.FC<any> = (propsCustomOption: any) => {
    const { props, option } = propsCustomOption;
    return (
      <Box component="li" {...props}>
        {option.label ?? option.name ?? option.keyName ?? option}
      </Box>
    );
  };

  const CustomMenuOption: React.FC<any> = (propsOption: any) => {
    const { children, ...props } = propsOption;
    //render
    return (
      //<Grow in>
      <Paper elevation={8} {...props}>
        {addLabel ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '5px',
              // padding: '5px 0',
              borderBottom: `1px solid ${theme.palette.divider}`,
              [`&:hover`]: {
                bgcolor: theme.palette.grey[100]
              }
            }}
          >
            <Button
              onMouseDown={(e) => {
                console.log('add tempalte export');
                e.stopPropagation();
                onAdd && onAdd(true);
              }}
              size="small"
              color="primary"
              fullWidth
              startIcon={Icon('plus')}
            >
              {addLabel}
            </Button>
          </Box>
        ) : null}

        {children}
      </Paper>
      //</Grow>
    );
  };

  return (
    <>
      <Autocomplete
        id="asynchronous-export-template"
        multiple={!single}
        sx={{ ...sx }}
        open={isOpen}
        onOpen={() => {
          setIsOpen(true);
        }}
        onClose={() => {
          setIsOpen(false);
        }}
        isOptionEqualToValue={(option, value) => {
          return option.id === value.id;
        }}
        getOptionLabel={(option) => option?.name ?? ''}
        options={options}
        filterSelectedOptions={!single}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder}
            InputProps={{
              ...params.InputProps
            }}
          />
        )}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => {
            return <Chip label={option.name} {...getTagProps({ index })} key={option.id} size="small" />;
          })
        }
        inputValue={inputText}
        onInputChange={handleInputChange}
        value={selectedValue}
        onChange={handleValueChange}
        PaperComponent={CustomMenuOption}
        renderOption={(props, option) => <CustomOption key={option?.id} option={option} props={props} />}
      />
    </>
  );
};

export default ExportTemplateAutocomplete;
