import { useTranslation } from 'react-i18next';

import { CommonViewFieldProps } from '@base/containers/ViewField/Common/interface';
import { Divider, Grid, InputLabel, Stack, SxProps, Typography, useTheme } from '@mui/material';

import React, { useState } from 'react';
import Section from '.';
import ViewField from '@base/components/@hanbiro/ViewPage/ViewField';

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
  parseLayoutData?: any;
}

const ViewFieldsSection = (props: ViewFieldsProps) => {
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
    parseLayoutData
  } = props;

  {
    return (
      <Grid
        container
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
          console.log('viewFieldProps section', viewFieldProps);
          return (
            <Grid key={field.keyName + index.toString()} item xs={12}>
              <Section noBorder header={field?.languageKey}>
                <Stack spacing={0}>
                  {/* field component */}
                  <ViewField {...viewFieldProps} />
                </Stack>
                {/* {divider && index < fields.length - 1 && <Divider sx={{ width: `calc(100% + 32px)`, left: '-16px', position: 'relative' }} />} */}
              </Section>
            </Grid>
          );
        })}
      </Grid>
    );
  }
};
export default ViewFieldsSection;
