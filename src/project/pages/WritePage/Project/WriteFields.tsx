import _ from 'lodash';
import React, { useMemo } from 'react';
import { Control, FieldErrorsImpl } from 'react-hook-form';

import WriteField from '@base/containers/WriteField';
import { Box, Grid } from '@mui/material';

interface WriteFieldsProps {
  fields: any[]; //with write form
  control: Control<any, any>; //hook-form
  errors: Partial<FieldErrorsImpl<any>>; //hook-from
}

const WriteFields = (props: WriteFieldsProps) => {
  const { fields, control, errors } = props;

  // main fields
  const MainFields = useMemo(() => {
    return (
      <>
        {fields.map((_item, _index) => {
          return <WriteField key={_item.keyName} item={_item} control={control} errors={errors} />;
        })}
      </>
    );
  }, [fields]);

  //render
  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={2} alignItems="center">
        {MainFields}
      </Grid>
    </Box>
  );
};

export default WriteFields;
