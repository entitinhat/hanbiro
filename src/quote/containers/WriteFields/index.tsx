import React, { useMemo, useState } from 'react';

// material-ui
import { Box, Grid } from '@mui/material';

// third-party
import _ from 'lodash';
import { Control, FieldErrorsImpl, UseFormGetValues, UseFormWatch } from 'react-hook-form';

// project
import WriteField from '@base/containers/WriteField';

//config
import * as keyNames from '@quote/config/keyNames';

interface WriteFieldsProps {
  isRevision?: boolean;
  opportunity?: any;
  quoteId?: string;
  fields: any[]; //with write form
  control: Control<any, any>; //hook-form
  errors: Partial<FieldErrorsImpl<any>>; //hook-from
  watch: UseFormWatch<any>; //hook-form
  getValues: UseFormGetValues<any>;
}

const WriteFields = (props: WriteFieldsProps) => {
  const { isRevision, opportunity, quoteId, fields, watch, control, errors, getValues } = props;

  //watching
  //const quoteTemplateValue = watch(keyNames.KEY_NAME_QUOTE_TEMPLATE);

  //render
  return (
    <Box sx={{ p: 2.5 }}>
      <Grid container spacing={2} alignItems="center">
        {fields.map((_item: any) => {
          let newComponentProps = { ..._item?.componentProps };
          // custom field's props
          let newItem = { ..._item };
          if (_item.keyName === keyNames.KEY_NAME_QUOTE_OPPORTUNITY && opportunity?.id) {
            newComponentProps.isDisabled = true;
          }
          if (_item.keyName === keyNames.KEY_NAME_QUOTE_CUSTOMER && quoteId) {
            newComponentProps.isDisabled = true;
          }
          newItem.componentProps = newComponentProps;

          if (
            (_item.keyName === keyNames.KEY_NAME_QUOTE_REVISION_ID || _item.keyName === keyNames.KEY_NAME_QUOTE_RECIPIENTS) &&
            !isRevision
          ) {
            return;
          }
          return <WriteField key={_item.keyName} item={newItem} control={control} errors={errors} />;
        })}
      </Grid>
    </Box>
  );
};

export default WriteFields;
