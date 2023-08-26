import _ from 'lodash';
import React, { useMemo } from 'react';
import { Control, FieldErrorsImpl, UseFormWatch } from 'react-hook-form';

import WriteField from '@base/containers/WriteField';
import { Box, Grid } from '@mui/material';
import { KEY_NAME_AUTOMATION_CRITERIA, KEY_NAME_AUTOMATION_TRIGGER } from '@process/config/keyNames';

interface WriteFieldsProps {
  fields: any[]; //with write form
  watch: UseFormWatch<any>; //hook-form
  control: Control<any, any>; //hook-form
  errors: Partial<FieldErrorsImpl<any>>; //hook-from
}

const WriteFields = (props: WriteFieldsProps) => {
  const { fields, watch, control, errors } = props;
  const triggerName = watch(KEY_NAME_AUTOMATION_TRIGGER);

  console.log('triggerName', triggerName);

  //main fields
  const MainFields = useMemo(() => {
    return (
      <>
        {fields.map((_item, _index) => {
          if (_item.keyName == KEY_NAME_AUTOMATION_CRITERIA) {
            if (_.isEmpty(triggerName?.keyName)) return;
            _item.componentProps = {
              ..._item.componentProps,
              triggerModule: triggerName?.extra?.module
            };
          }

          return <WriteField key={_item.keyName} item={_item} control={control} errors={errors} />;
        })}
      </>
    );
  }, [fields, triggerName]);

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
