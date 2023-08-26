import React, { useState, useEffect, useMemo } from 'react';

//third-party
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

//project
//import { useMenuSetting } from '@settings/general/hooks/useMenuSetting';
//import { PriorityOption } from '@activity/types/type';
import { useSelectionFields } from '@settings/general/hooks/useSelectionFields';

//material
import { useTheme } from '@mui/material/styles';
import { Box, Chip, FormControl, IconButton, MenuItem, Select, SelectChangeEvent, Tooltip } from '@mui/material';
import { Clear } from '@mui/icons-material';
import { Selection } from '@settings/general/types/interface';
import { priorityConfigs } from '@activity/config/list-field/column';
import { OptionValue } from '@base/types/common';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      maxWidth: 200
    }
  }
};

interface PrioritySelectProps {
  //className?: string;
  //single?: boolean;
  isDisabled?: boolean;
  readOnly?: boolean;
  defaultOptions?: Selection[];
  value?: Selection | OptionValue | null;
  onChange?: (value: Selection | null) => void;
  placeholder?: string;
  filterToolbarAction?: boolean; // Check if is filter toolbar checked action
}

const PrioritySelect = (props: PrioritySelectProps) => {
  const { t } = useTranslation();
  const {
    isDisabled,
    readOnly = false,
    defaultOptions = [],
    value, //={}
    onChange,
    // placeholder = 'Type or click to select',
    placeholder = t('ncrm_desk_ticket_placeholder_priority'),
    filterToolbarAction = false
  } = props;
  //state
  const [options, setOptions] = useState<Selection[]>(defaultOptions);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const theme = useTheme();

  //init rows
  useEffect(() => {
    if (value) {
      if (_.isString(value)) {
        if (value !== selectedOption) {
          setSelectedOption(value);
        }
      } else {
        if (value?.keyName !== selectedOption) {
          setSelectedOption(value?.keyName as string);
        }
      }
    } else {
      // setSelectedOption('');
    }
  }, [value]); //options

  // ============= HOOK get field options ======================

  const { data } = useSelectionFields(
    {
      filter: { query: 'keyRoot=priority' }
    },
    {
      enabled: defaultOptions.length === 0
    }
  );
  console.log(`~~~~ Priority select options/data`, options, data);
  //init states list
  useEffect(() => {
    if (data?.data) {
      setOptions(data.data);
      // set default from setting
      const defaultOpt = data.data.find((v) => v.isDefault);
      if (!value && defaultOpt) {
        setSelectedOption(defaultOpt.keyName as string);
        onChange && onChange(defaultOpt);
      }
    }
  }, [value, data]);

  // ============= END get field options ======================

  //option change
  const handleValueChange = (event: SelectChangeEvent) => {
    const selectedId = event.target.value as string;
    const newOption = options.find((_ele: any) => _ele.keyName === selectedId) || null;
    setSelectedOption(selectedId);
    //callback
    onChange && onChange(newOption);
  };

  const handleClear = () => {
    setSelectedOption('');
    //callback
    onChange && onChange(null);
  };

  //priority by color
  const getChipColor = (selected: string) => {
    const option = options.find((_ele: Selection) => _ele.keyName === selected);
    switch (option?.keyName) {
      case 'PRIORITY_URGENT':
        return (
          <Chip
            key={option?.keyName}
            label={t(option?.languageKey || '')}
            sx={{
              color: priorityConfigs?.['PRIORITY_URGENT']?.textColor,
              backgroundColor: priorityConfigs?.['PRIORITY_URGENT']?.backgroundColor
            }}
            size="small"
          />
        );
      case 'PRIORITY_HIGH':
        return (
          <Chip
            key={option?.keyName}
            label={t(option?.languageKey || '')}
            variant="outlined"
            color={priorityConfigs?.['PRIORITY_HIGH']?.color}
            sx={{
              color: priorityConfigs?.['PRIORITY_HIGH']?.textColor,
              backgroundColor: priorityConfigs?.['PRIORITY_HIGH']?.backgroundColor
            }}
            size="small"
          />
        );
      case 'PRIORITY_MEDIUM':
        return (
          <Chip
            key={option?.keyName}
            label={t(option?.languageKey || '')}
            sx={{
              color: priorityConfigs?.['PRIORITY_MEDIUM']?.textColor,
              backgroundColor: priorityConfigs?.['PRIORITY_MEDIUM']?.backgroundColor
            }}
            size="small"
          />
        );
      case 'PRIORITY_LOW':
        return (
          <Chip
            key={option?.keyName}
            label={t(option?.languageKey || '')}
            sx={{
              color: priorityConfigs?.['PRIORITY_LOW']?.textColor,
              backgroundColor: priorityConfigs?.['PRIORITY_LOW']?.backgroundColor
            }}
            size="small"
          />
        );
    }
  };

  //render
  return (
    <Box
      sx={{ pl: +`${filterToolbarAction ? 1 : 0}`, pr: +`${filterToolbarAction ? 1 : 0}` }} // Check if is checked action => set paddingLeft & paddingRight = 1
    >
      <Select
        fullWidth
        readOnly={readOnly}
        displayEmpty
        disabled={isDisabled}
        inputProps={{
          'aria-label': 'priority select',
          ...(readOnly && { IconComponent: () => null })
        }}
        sx={{
          '& .MuiSelect-iconOutlined': { display: selectedOption ? 'none' : '' },
          '&.Mui-focused .MuiIconButton-root': { color: 'primary.main' },
          '& .MuiInputBase-input': { color: 'info.main' }
        }}
        value={options.length > 0 ? selectedOption : ''}
        onChange={handleValueChange}
        renderValue={(selected) => {
          // return <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>{getChipColor(selected)}</Box>;
          if (selected) return <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>{getChipColor(selected)}</Box>;
          else return placeholder;
        }}
        MenuProps={MenuProps}
        endAdornment={
          <>
            {!isDisabled && !readOnly && (
              <Tooltip title="Clear">
                <IconButton size="small" sx={{ visibility: selectedOption ? 'visible' : 'hidden' }} onClick={handleClear}>
                  <Clear sx={{ fontSize: 18 }} />
                </IconButton>
              </Tooltip>
            )}
          </>
        }
      >
        {options.map((_option: Selection) => {
          return (
            <MenuItem key={_option.keyName} value={_option.keyName} style={{ fontWeight: theme.typography.fontWeightRegular }}>
              {getChipColor(_option.keyName as string)}
            </MenuItem>
          );
        })}
      </Select>
    </Box>
  );
};

export default PrioritySelect;
