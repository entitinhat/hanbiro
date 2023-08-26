import React, { useMemo, useState } from 'react';

// material-ui
import { Box, Grid } from '@mui/material';

// third-party
import _ from 'lodash';
import { Control, FieldErrorsImpl, UseFormWatch } from 'react-hook-form';

// project
import WriteField from '@base/containers/WriteField';

//config
import * as keyNames from '@campaign/config/keyNames';
//import { Campaign } from '@campaign/types/interface';
import { CAMPAIGN_CATEGORY_EMAIL, STEP_FIELDS } from '@campaign/config/constants';

interface WriteFieldsProps {
  menuApi: string;
  category: string;
  fields: any[]; //with write form
  activeStep: number;
  watch: UseFormWatch<any>; //hook-form
  control: Control<any, any>; //hook-form
  errors: Partial<FieldErrorsImpl<any>>; //hook-from
}

const WriteFields = (props: WriteFieldsProps) => {
  const { menuApi, category, fields, activeStep = 0, watch, control, errors } = props;

  //state

  //watching
  //const contactType: any = watch(keyNames.KEY_NAME_CUSTOMER_CONTACT_TYPE);

  //main fields
  const MainFields = useMemo(() => {
    return (
      <>
        {fields.map((_item, _index) => {
          let newComponentProps = { ..._item?.componentProps };

          if (_item.keyName === keyNames.KEY_CAMPAIGN_CONTENT) {
            newComponentProps.templateType = category === CAMPAIGN_CATEGORY_EMAIL ? 'medium' : 'simple';
          }

          //not render contact type
          // if (menuApi === MENU_CUSTOMER_CONTACT && _item.keyName === keyNames.KEY_NAME_CUSTOMER_CONTACT_TYPE) {
          //   return;
          // }

          return (
            <WriteField
              key={_item.keyName}
              item={{
                ..._item,
                componentProps: newComponentProps
              }}
              control={control}
              errors={errors}
              isHidden={!STEP_FIELDS[activeStep].includes(_item.keyName)}
            />
          );
        })}
      </>
    );
  }, [fields, activeStep]);

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
