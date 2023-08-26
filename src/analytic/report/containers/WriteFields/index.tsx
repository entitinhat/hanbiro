import { Box, Grid } from '@mui/material';
import _ from 'lodash';
import { Control, FieldErrorsImpl, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { useEffect, useMemo } from 'react';
import * as keyNames from '@analytic/report/config/keyNames';
import WriteField from '@base/containers/WriteField';

interface WriteFieldsProps {
  menuApi: string;
  fields: any[]; //with write form
  watch: UseFormWatch<any>; //hook-form
  control: Control<any, any>; //hook-form
  setValue: UseFormSetValue<any>; //hook-form
  errors: Partial<FieldErrorsImpl<any>>; //hook-from
}

const WriteFields = (props: WriteFieldsProps) => {
  const { menuApi, fields, watch, control, setValue, errors } = props;
  
  const MainFields = useMemo(() => {
    return (
      <>
        {fields.map((_item, _index) => {
          let newComponentProps = { ..._item?.componentProps };
          return (
            <WriteField key={_item.keyName} item={{ ..._item, componentProps: newComponentProps }} control={control} errors={errors} />
          );
        })}
      </>
    );
  }, [fields]);

  return (
    <Box sx={{ p: 2.5 }}>
      <Grid container spacing={2} alignItems="center">
        {MainFields}
      </Grid>
    </Box>
  );
};

export default WriteFields;
