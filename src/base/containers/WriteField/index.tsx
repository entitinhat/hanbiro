import React from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import IconButton from '@base/components/@extended/IconButton';
import RawHTML from '@base/components/@hanbiro/RawHTML';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import { HelpOutlineRounded } from '@mui/icons-material';
import { Box, Grid, InputLabel, Stack, Typography, useMediaQuery } from '@mui/material';
import { SxProps, useTheme } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

interface FieldProps {
  item: any;
  control: any;
  errors: any;
  isHidden?: boolean;
  invisible?: boolean;
  TitleSx?: SxProps;
  helperText?: string;
}

const WriteField = (props: FieldProps) => {
  const { item, control, errors, isHidden, invisible, helperText } = props;
  const {
    languageKey,
    hideTitle,
    TitleSx,
    keyName,
    value: itemValue,
    validate,
    columns,
    tooltipShow,
    tooltipText,
    Component,
    componentProps
  } = item;
  const theme = useTheme();
  const { t } = useTranslation();
  //do nothing
  if (invisible) return <></>;

  const matchesMd = useMediaQuery(theme.breakpoints.down('md'));
  const getGridCol = () => {
    switch (matchesMd ? 1 : columns) {
      case 1:
        return 12;
      case 2:
        return 6;
      case 3:
        return 4;
      case 4:
        return 3;
      default:
        return 12;
    }
  };

  //render
  return (
    <Grid item xs={getGridCol()} sx={{ display: isHidden ? 'none' : 'block' }}>
      <Stack spacing={0.5}>
        {!hideTitle && (
          <Stack spacing={1} direction="row" alignItems="center">
            <InputLabel sx={{ display: 'flex', alignItems: 'center' }}>
              <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium, ...TitleSx }} keyLang={languageKey} />
              {validate?.required && (
                <Box component="span" sx={{ ml: 1, color: 'error.main' }}>
                  *
                </Box>
              )}
            </InputLabel>
            {tooltipShow && (
              <Tooltip arrow title={<RawHTML>{t(tooltipText) as string}</RawHTML>} placement="top">
                <IconButton size="small">
                  <HelpOutlineRounded sx={{ fontSize: 16 }} />
                </IconButton>
              </Tooltip>
            )}
          </Stack>
        )}
        {componentProps?.replaceTitle && (
          <Stack direction="row" sx={{ mb: 1 }}>
            <Box component="span" sx={{ mr: 1, px: 2, py: 1, color: 'common.white', bgcolor: 'primary.main' }}>
              {componentProps?.replaceTitle.step}
            </Box>
            <Box component="span" sx={{ width: '100%', pt: 1 }}>
              {componentProps?.replaceTitle.text}
            </Box>
          </Stack>
        )}
        {Component ? (
          <Controller
            name={keyName}
            control={control}
            rules={{
              validate: validate
            }}
            render={({ field: { onChange, value, onBlur } }) => {
              // I use Onblur to update isTouched of field from useForm
              return (
                <React.Suspense fallback={<></>}>
                  <Component onBlur={onBlur} control={control} {...componentProps} value={value} onChange={onChange} />
                </React.Suspense>
              );
            }}
            defaultValue={itemValue}
          />
        ) : (
          'Empty'
        )}
        {errors?.[keyName] && (
          <Typography variant="h6" sx={{ color: 'error.main' }}>
            {errors?.[keyName]?.message}
          </Typography>
        )}
        {helperText && (
          <Typography variant="h6" color={theme.palette.secondary.main} sx={{ fontSize: '0.8rem' }}>
            {helperText}
          </Typography>
        )}
      </Stack>
    </Grid>
  );
};

export default WriteField;
