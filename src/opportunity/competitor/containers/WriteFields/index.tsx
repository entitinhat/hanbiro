import React, { useMemo, useState } from 'react';

// material-ui
import { Box, Grid } from '@mui/material';

// third-party
import _ from 'lodash';
import { Control, FieldErrorsImpl, UseFormWatch } from 'react-hook-form';

// project
import WriteField from '@base/containers/WriteField';

//config
import * as keyNames from '@competitor/config/keyNames';

interface WriteFieldsProps {
  menuApi: string;
  fields: any[]; //with write form
  watch: UseFormWatch<any>; //hook-form
  control: Control<any, any>; //hook-form
  errors: Partial<FieldErrorsImpl<any>>; //hook-from
}

const WriteFields = (props: WriteFieldsProps) => {
  const { menuApi, fields, watch, control, errors } = props;

  //state

  //watching

  //render
  return (
    <Box sx={{ p: 2.5 }}>
      <Grid container spacing={2} alignItems="center">
        {fields.map((_item: any) => {
          // let newComponentProps = { ..._item?.componentProps };
          // // custom field's props
          // let newItem = { ..._item };
          // if (_item.keyName === keyNames.KEY_NAME_QUOTE_CONTACT) {
          //   if (accountValue) {
          //     newComponentProps.isDisabled = false;
          //     newComponentProps.accountId = accountValue?.id || '';
          //   }
          // }
          // newItem.componentProps = newComponentProps;
          //isHidden={formStep != stepIdx}
          return <WriteField key={_item.keyName} item={_item} control={control} errors={errors} />;
        })}
      </Grid>
    </Box>
  );
};

export default WriteFields;
