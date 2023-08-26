import _ from 'lodash';
import React, { useMemo } from 'react';
import { Control, FieldErrorsImpl, UseFormWatch } from 'react-hook-form';

import WriteField from '@base/containers/WriteField';
import { useMenuTemplates } from '@base/services/settingService';
import { OptionValue } from '@base/types/common';
import { Box, Grid } from '@mui/material';
import { INSTANT_ACTION_TEMPLATE } from '@process/config/constants';
import {
    KEY_NAME_AUTOMATION_INSTANT_FIELD, KEY_NAME_AUTOMATION_INSTANT_MESSAGE,
    KEY_NAME_AUTOMATION_INSTANT_TARGET_CUSTOMER, KEY_NAME_AUTOMATION_INSTANT_TARGET_USER,
    KEY_NAME_AUTOMATION_INSTANT_TEMPLATE, KEY_NAME_AUTOMATION_INSTANT_TYPE
} from '@process/config/keyNames';

interface WriteFieldsProps {
  triggerModule: string;
  fields: any[]; //with write form
  watch: UseFormWatch<any>; //hook-form
  control: Control<any, any>; //hook-form
  errors: Partial<FieldErrorsImpl<any>>; //hook-from
}

const WriteFields = (props: WriteFieldsProps) => {
  const { triggerModule, fields, watch, control, errors } = props;
  const selectedInstantType = watch(KEY_NAME_AUTOMATION_INSTANT_TYPE);

  const { data: templateData } = useMenuTemplates({
    templateGroup: INSTANT_ACTION_TEMPLATE[selectedInstantType.keyName],
    options: {
      enabled: selectedInstantType.keyName == 'ACTION_TYPE_TASK' || selectedInstantType.keyName == 'ACTION_TYPE_EMAIL'
    }
  });
  console.log('templatedata', templateData);

  const templateOptions = useMemo(() => {
    console.log(templateData);
    let templates: OptionValue[] = [];
    if (templateData && templateData.results) {
      console.log('template data', templateData);
      templates = templateData.results.map((v) => {
        return {
          keyName: v.id,
          languageKey: v.name!!
        };
      });
    }
    return templates;
  }, [templateData]);

  //main fields
  const MainFields = useMemo(() => {
    return (
      <>
        {fields.map((_item, _index) => {
          if (selectedInstantType.keyName == 'ACTION_TYPE_TASK') {
            if (
              _item.keyName == KEY_NAME_AUTOMATION_INSTANT_TARGET_CUSTOMER ||
              _item.keyName == KEY_NAME_AUTOMATION_INSTANT_FIELD ||
              _item.keyName == KEY_NAME_AUTOMATION_INSTANT_MESSAGE
            ) {
              return;
            }
          } else if (selectedInstantType.keyName == 'ACTION_TYPE_EMAIL') {
            if (
              _item.keyName == KEY_NAME_AUTOMATION_INSTANT_TARGET_USER ||
              _item.keyName == KEY_NAME_AUTOMATION_INSTANT_FIELD ||
              _item.keyName == KEY_NAME_AUTOMATION_INSTANT_MESSAGE
            ) {
              return;
            }
          } else if (selectedInstantType.keyName == 'ACTION_TYPE_FIELD_UPDATE') {
            if (
              _item.keyName == KEY_NAME_AUTOMATION_INSTANT_TARGET_USER ||
              _item.keyName == KEY_NAME_AUTOMATION_INSTANT_TARGET_CUSTOMER ||
              _item.keyName == KEY_NAME_AUTOMATION_INSTANT_MESSAGE ||
              _item.keyName == KEY_NAME_AUTOMATION_INSTANT_TEMPLATE
            ) {
              return;
            }
          } else if (selectedInstantType.keyName == 'ACTION_TYPE_OUTBOUND_MESSAGE') {
            if (
              _item.keyName == KEY_NAME_AUTOMATION_INSTANT_TARGET_USER ||
              _item.keyName == KEY_NAME_AUTOMATION_INSTANT_TARGET_CUSTOMER ||
              _item.keyName == KEY_NAME_AUTOMATION_INSTANT_FIELD ||
              _item.keyName == KEY_NAME_AUTOMATION_INSTANT_TEMPLATE
            ) {
              return;
            }
          } else {
            if (
              _item.keyName == KEY_NAME_AUTOMATION_INSTANT_TARGET_USER ||
              _item.keyName == KEY_NAME_AUTOMATION_INSTANT_TARGET_CUSTOMER ||
              _item.keyName == KEY_NAME_AUTOMATION_INSTANT_FIELD ||
              _item.keyName == KEY_NAME_AUTOMATION_INSTANT_MESSAGE ||
              _item.keyName == KEY_NAME_AUTOMATION_INSTANT_TEMPLATE
            ) {
              return;
            }
          }

          if (_item.keyName == KEY_NAME_AUTOMATION_INSTANT_TEMPLATE) {
            _item.componentProps = {
              ..._item.componentProps,
              options: templateOptions
            };
          }

          if (_item.keyName == KEY_NAME_AUTOMATION_INSTANT_FIELD) {
            _item.componentProps = {
              ..._item.componentProps,
              module: triggerModule
            };
          }
          return <WriteField key={_item.keyName} item={_item} control={control} errors={errors} />;
        })}
      </>
    );
  }, [fields, selectedInstantType]);

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
