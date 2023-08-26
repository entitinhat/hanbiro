import { useTranslation } from 'react-i18next';

import { CommonViewFieldProps } from '@base/containers/ViewField/Common/interface';
import { Divider, Grid, InputLabel, Stack, SxProps, Typography, useTheme } from '@mui/material';

import ViewField from './ViewField';
import SpanLang from '../SpanLang';
import React, { useState } from 'react';

interface ViewFieldsProps {
  menuSource?: string;
  menuSourceId?: string;
  fields: any[];
  ignoreFields?: string[];
  column?: number;
  data?: any;
  onSave?: (keyName: string, isSuccess: boolean, value: any) => void;
  onClose?: (keyName: string, value: any) => void;
  setQueryData?: string[];
  metadata?: any;
  readOnly?: boolean;
  divider?: boolean;
  onChange?: (value: any) => void; // In case Component want to apply change for API with out click onSave (ex: NewProductView - menu lead)
  //I using this for component from IAM web
  isIAMComponent?: boolean;
  direction?: any;
  sxGridItem?: any;
}

const ViewFields = (props: ViewFieldsProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const {
    menuSource,
    menuSourceId,
    fields,
    ignoreFields = [],
    column,
    data: viewData,
    onSave,
    onClose,
    setQueryData,
    metadata,
    readOnly = false,
    divider = false,
    onChange,
    isIAMComponent = false,
    direction,
    sxGridItem
  } = props;

  return (
    <Grid
      container
      spacing={1}
      sx={{
        // px: 1 ,
        ml: 0,
        width: '100%'
      }}
    >
      {fields?.map((field: any, index: number) => {
        const _config = field?.config ?? null;
        const userPermission = _config?.viewProps?.userPermission ?? field?.userPermission;

        if ((ignoreFields && ignoreFields?.indexOf(field?.keyName) > -1) || !userPermission?.isShow) {
          return null;
        }

        const newColumn = _config?.showFullRow ? 1 : column ?? 2;
        const showFieldLabel = _config?.hideFieldLabel ? false : true;

        const { data } = field;
        const viewFieldProps: CommonViewFieldProps = {
          keyName: field.keyName,
          value: data,
          isIAMComponent,
          // onChange: onChange, // for hook form
          userPermission: { ...userPermission, isEdit: readOnly ? false : userPermission?.isEdit },
          config: _config,
          onSave: onSave,
          onClose: onClose,
          menuSource: field?.menuSource ?? menuSource,
          menuSourceId: field?.menuSourceId ?? menuSourceId,
          viewData: viewData,
          metadata: { ...field?.metadata, ...metadata },
          setQueryData,
          onChange: onChange
        };

        //console.log('...viewFieldProps...', viewFieldProps);

        return (
          <React.Fragment key={field.keyName + index.toString()}>
            <Grid
              key={field.keyName + index.toString()}
              item
              xs={12}
              sm={newColumn == 1 ? 12 : 6}
              sx={sxGridItem ? sxGridItem : { pb: 1, px: 1 }}
            >
              <Stack spacing={0} direction={direction}>
                {/* label */}
                {showFieldLabel && (
                  <InputLabel
                    sx={{ display: 'flex', alignItems: 'center', pl: '8px', color: theme.palette.secondary.main, overflow: 'visible' }}
                  >
                    <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={field?.languageKey} />
                  </InputLabel>
                )}
                {/* field component */}
                <ViewField {...viewFieldProps} />
              </Stack>
              {/* {divider && index < fields.length - 1 && <Divider sx={{ width: `calc(100% + 32px)`, left: '-16px', position: 'relative' }} />} */}
            </Grid>
            {divider && index < fields.length - 1 && (
              <Divider sx={{ width: '100%', position: 'relative', '&:last-child': { display: 'none' } }} />
            )}
          </React.Fragment>
        );
      })}
    </Grid>
  );
};

export default ViewFields;
