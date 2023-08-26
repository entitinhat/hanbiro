import _ from 'lodash';
import React, { useMemo } from 'react';
import { Control, FieldErrorsImpl, UseFormWatch } from 'react-hook-form';
import { useRecoilValue } from 'recoil';

import WriteField from '@base/containers/WriteField';
import { OptionValue } from '@base/types/common';
import { Box, Grid } from '@mui/material';
import {
    KEY_NAME_STEP_AUTOMATION, KEY_NAME_STEP_DO, KEY_NAME_STEP_NAME, KEY_NAME_STEP_STATUSES
} from '@process/config/keyNames';
import { stepSettingAtom } from '@process/store/atoms/diagram';
import stepTypeAtom from '@process/store/atoms/step';
import { DefinedItem } from '@process/types/settings';

interface WriteFieldsProps {
  fields: any[]; //with write form
  watch: UseFormWatch<any>; //hook-form
  control: Control<any, any>; //hook-form
  //setValue: UseFormSetValue<any>; //hook-form
  errors: Partial<FieldErrorsImpl<any>>; //hook-from
  definedOptions: OptionValue[];
  definedData: Record<string, DefinedItem[]>;
  processId: string;
}

const WriteFields = (props: WriteFieldsProps) => {
  const { fields, watch, control, errors, definedOptions, definedData, processId } = props;
  const stepType = useRecoilValue(stepTypeAtom);
  const stepSetting = useRecoilValue(stepSettingAtom);

  //main fields
  const MainFields = useMemo(() => {
    return (
      <>
        {fields.map((_item, _index) => {
          let componentProps: any = _item?.componentProps ?? {};
          if (componentProps?.steptype) {
            if (_.isArray(componentProps.steptype)) {
              if (!_.includes(componentProps.steptype, stepType.key)) {
                return;
              }
            } else {
              if (stepType.key !== componentProps.steptype) {
                return;
              }
            }
          }

          if (_item.keyName == KEY_NAME_STEP_DO) {
            componentProps = { ...componentProps, options: definedOptions };
          }

          if (_item.keyName == KEY_NAME_STEP_NAME) {
            if (stepType.value == 'TYPE_ACTION' || stepType.value == 'TYPE_SITE' || stepType.value == 'TYPE_CRITERIA') {
              _item.showFullRow = false;
            } else {
              _item.showFullRow = true;
            }
          }

          if (_item.keyName == KEY_NAME_STEP_AUTOMATION && !stepSetting.auto) {
            return;
          }

          componentProps.process = processId;
          if (_item.keyName == KEY_NAME_STEP_STATUSES) {
            componentProps.defined = definedData;
          }
          return <WriteField key={_item.keyName} item={{ ..._item, componentProps: componentProps }} control={control} errors={errors} />;
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
