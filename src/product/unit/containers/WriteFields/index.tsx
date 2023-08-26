import React, { useMemo } from 'react';

// material-ui
import { Box, Grid } from '@mui/material';

// third-party
import _ from 'lodash';
import { Control, FieldErrorsImpl, UseFormSetValue, UseFormWatch } from 'react-hook-form';

// project imports
import WriteField from '@base/containers/WriteField';

interface WriteFieldsProps {
  fields: any[]; //with write form
  watch: UseFormWatch<any>; //hook-form
  control: Control<any, any>; //hook-form
  setValue: UseFormSetValue<any>; //hook-form
  errors: Partial<FieldErrorsImpl<any>>; //hook-from
}

const WriteFields = (props: WriteFieldsProps) => {
  const { fields, watch, control, setValue, errors } = props;

  //main fields
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
    <Box sx={{ p: 2.5 }}>
      <Grid container spacing={2} alignItems="center">
        {MainFields}
      </Grid>
    </Box>
  );
};

export default WriteFields;
