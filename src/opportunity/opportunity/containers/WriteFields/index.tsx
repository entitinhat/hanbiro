import React, { useEffect, useMemo, useState } from 'react';

// material-ui
import { Box, Grid } from '@mui/material';

// third-party
import _ from 'lodash';
import { Control, FieldErrorsImpl, UseFormWatch } from 'react-hook-form';

// project
import WriteField from '@base/containers/WriteField';

//config
import * as keyNames from '@opportunity/config/keyNames';
import { OPPORTUNITY_TYPE_NEW_CUSTOMER } from '@opportunity/config/constants';

interface WriteFieldsProps {
  fields: any[]; //with write form
  watch: UseFormWatch<any>; //hook-form
  control: Control<any, any>; //hook-form
  errors: Partial<FieldErrorsImpl<any>>; //hook-from
}

const WriteFields = (props: WriteFieldsProps) => {
  const { fields, watch, control, errors } = props;

  //watching
  const oppType = watch(keyNames.KEY_NAME_OPPORTUNITY_TYPE);

  //render
  return (
    <Box sx={{ p: 2.5 }}>
      <Grid container spacing={2} alignItems="center">
        {fields.map((_item: any) => {
          let newComponentProps = { ..._item?.componentProps };
          // custom field's props
          let newItem = { ..._item };
          if (_item.keyName === keyNames.KEY_NAME_OPPORTUNITY_CUSTOMER) {
            if (oppType) {
              newComponentProps.category = oppType.customerType;
              newComponentProps.opportunityType = oppType.type;
              if (oppType.type !== OPPORTUNITY_TYPE_NEW_CUSTOMER) {
                newItem.columns = 2;
                newItem.hideTitle = false;
              } else {
                newItem.hideTitle = true;
              }
            }
          }
          newItem.componentProps = newComponentProps;
          //console.log('newItem', newItem);
          return <WriteField key={_item.keyName} item={newItem} control={control} errors={errors} />;
        })}
      </Grid>
    </Box>
  );
};

export default WriteFields;
