import React, { useMemo } from 'react';

// material-ui
import { Box, Grid } from '@mui/material';

// third-party
import _ from 'lodash';
import { Control, FieldErrorsImpl, UseFormWatch } from 'react-hook-form';

// project imports
import WriteField from '@base/containers/WriteField';
import * as keyNames from '@product/product/config/keyNames';

interface WriteFieldsProps {
  menuApi: string;
  fields: any[]; //with write form
  watch: UseFormWatch<any>; //hook-form
  control: Control<any, any>; //hook-form
  //setValue: UseFormSetValue<any>; //hook-form
  errors: Partial<FieldErrorsImpl<any>>; //hook-from
}

const WriteFields = (props: WriteFieldsProps) => {
  const {
    menuApi,
    fields,
    watch,
    control,
    //setValue,
    errors
  } = props;

  const ignoreFields: string[] = [keyNames.KEY_PRODUCT_ASSIGN_TO];

  //main fields
  const MainFields = useMemo(() => {
    const fieldPositions = ['name', 'code', 'canBeSold', 'group', 'type', 'unit', 'attributes'];
    let newFields: any[] = [];
    fieldPositions.forEach((keyName: string) => {
      const field = fields.find((_f: any) => {
        return _f.keyName === keyName;
      });
      if (field) {
        newFields.push(field);
      }
    });

    return (
      <>
        {newFields.map((_item, _index) => {
          if (ignoreFields?.includes(_item?.keyName)) return null;
          return <WriteField key={_item.keyName} item={_item} control={control} errors={errors} />;
        })}
      </>
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
