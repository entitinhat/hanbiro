import SpanLang from '@base/components/@hanbiro/SpanLang';
import { Grid, InputLabel, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/system';
import _ from 'lodash';
import React from 'react';

interface Props {
  fields?: any[];
  showKeys?: string[];
  mapFields?: any;
  data: any;
  componentProps?: any;
}

const GridFields = ({ fields = [], showKeys = [], mapFields, data, componentProps }: Props) => {
  const theme = useTheme();
  const labelStyle = { display: 'flex', alignItems: 'center', color: theme.palette.secondary.main, lineHeight: '1.57em' };

  return (
    <Grid
      container
      spacing={1}
      sx={{
        ml: 0,
        width: '100%'
      }}
      alignItems={'center'}
    >
      {showKeys?.map((key: string, index: number) => {
        const field = fields?.find((_ele: any) => _ele?.keyName === key);
        const renderValue = mapFields?.[key] ? mapFields?.[key](key, data) : null;
        return (
          <React.Fragment key={index}>
            <Grid item xs={12} sm={6} sx={{ pb: 1.5 }} alignItems={'center'} {...componentProps}>
              <Stack direction="row" spacing={0.5} alignItems={'center'}>
                {/* label */}
                <InputLabel sx={labelStyle}>
                  <SpanLang keyLang={field?.languageKey ?? ''} textOnly />
                  {`:`}
                </InputLabel>
                {/* field component */}
                {renderValue ? (
                  !_.isString(renderValue) ? (
                    renderValue
                  ) : (
                    <Typography>{renderValue ?? ''}</Typography>
                  )
                ) : (
                  <Typography>{data?.[field?.keyName] ?? ''}</Typography>
                )}
              </Stack>
            </Grid>
          </React.Fragment>
        );
      })}
    </Grid>
  );
};

export default GridFields;
