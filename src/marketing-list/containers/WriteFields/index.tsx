import React, { useMemo } from 'react';

// material-ui
import { Box, Grid } from '@mui/material';

// third-party
import _ from 'lodash';
import { Control, FieldErrorsImpl, UseFormWatch } from 'react-hook-form';

// project imports
import WriteField from '@base/containers/WriteField';

//config
import * as keyNames from '@marketing-list/config/keyNames';

interface WriteFieldsProps {
  menuApi: string;
  type?: any; //customer type
  fields: any[]; //with write form
  watch: UseFormWatch<any>; //hook-form
  control: Control<any, any>; //hook-form
  //setValue: UseFormSetValue<any>; //hook-form
  errors: Partial<FieldErrorsImpl<any>>; //hook-from
}

const WriteFields = (props: WriteFieldsProps) => {
  const {
    menuApi,
    type,
    fields,
    watch,
    control,
    //setValue,
    errors
  } = props;

  //state

  //watching
  // const contactType: any = watch(keyNames.KEY_NAME_CUSTOMER_CONTACT_TYPE);

  //top fields
  const MainFields = useMemo(() => {
    const nameField = fields.find((_item) => _item.keyName === keyNames.KEY_NAME_CUSTOMER_NAME);
    const typeField = fields.find((_item) => _item.keyName === keyNames.KEY_NAME_CUSTOMER_MARKETING_TYPE);
    const activeField = fields.find((_item) => _item.keyName === keyNames.KEY_NAME_CUSTOMER_ACTIVE);
    const descriptionField = fields.find((_item) => _item.keyName === keyNames.KEY_NAME_CUSTOMER_MARKETING_DESCRIPTION);

    console.log('write fields: ', fields);

    return (
      <Grid item xs={12}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} lg={12}>
            <WriteField key={nameField?.keyName} item={{ ...nameField, columns: 1 }} control={control} errors={errors} />
          </Grid>
          <Grid item xs={12} lg={12}>
            <Grid container spacing={2} alignItems="center">
              {/* <WriteField key={codeField?.keyName} item={{ ...codeField, columns: 1 }} control={control} errors={errors} /> */}
              <Grid item xs={6} lg={6}>
                <WriteField key={typeField?.keyName} item={{ ...typeField, columns: 1 }} control={control} errors={errors} />
              </Grid>
              <Grid item xs={6} lg={6}>
                <WriteField key={activeField?.keyName} item={{ ...activeField, columns: 1 }} control={control} errors={errors} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={12}>
            <WriteField key={descriptionField?.keyName} item={{ ...descriptionField, columns: 1 }} control={control} errors={errors} />
          </Grid>
        </Grid>
      </Grid>
    );
  }, [fields]);

  //render
  return (
    <Box sx={{ p: 2.5 }}>
      <Grid container spacing={2} alignItems="center">
        {MainFields}
      </Grid>
    </Box>
  );
};

export default WriteFields;
