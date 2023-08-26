import _ from 'lodash';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import SidebarHeader from '@base/components/@hanbiro/Sidebar/Header';
import { LAYOUT_PROCESS_AUTOMATION_INSTANT } from '@base/config/menus';
import { IdName, OptionValue } from '@base/types/common';
import { removeItemAtIndex, replaceItemAtIndex } from '@base/utils/helpers/arrayUtils';
import { WriteParseFields } from '@base/utils/helpers/noLayoutUtils';
import { Button, Divider, Stack, useTheme } from '@mui/material';
import { FieldProperty } from '@process/components/FieldValue';

import { openInstantState } from '../Criteria/CriteriaAutomation';
import WriteFields from './WriteFields';
import { useTranslation } from 'react-i18next';

export interface InstantValue {
  id?: string;
  name: string;
  type: OptionValue;
  template?: OptionValue;
  targetUsers?: IdName[];
  targetCustomers?: IdName[];
  field?: FieldProperty;
  message?: string;
}

export interface InstantsValue {
  [index: string]: InstantValue[];
}

interface InstantFieldsProps {
  instants: InstantsValue;
  openInstant: openInstantState;
  triggerModule: string;
  onChangeInstant?: (v: openInstantState, instants?: InstantsValue) => void;
}

const InstantWrite = (props: InstantFieldsProps) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { instants, openInstant, triggerModule, onChangeInstant } = props;
  const { fields, getParams, defaultValues } = useMemo(() => WriteParseFields(LAYOUT_PROCESS_AUTOMATION_INSTANT), []);

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
    watch
  } = useForm<InstantValue>({
    defaultValues: {
      ...defaultValues
    },
    criteriaMode: 'firstError',
    mode: 'onChange'
  });

  useEffect(() => {
    if (openInstant.action) {
      reset(openInstant.action);
    }
  }, [openInstant?.action]);

  const onSubmit = (formData: any) => {
    let newParams = getParams(formData);
    let newInstants = _.cloneDeep(instants);
    if (!(openInstant.id in newInstants)) {
      newInstants[openInstant.id] = [];
    }

    console.log('openInstant', openInstant)

    // edit
    if (openInstant.mode == 'v') {
      const oldInstant = newInstants[openInstant.id];
      const targetIndex = oldInstant.findIndex((action) => action.id === openInstant.action?.id);
      const targetValue = { ...oldInstant[targetIndex], ...newParams };
      newInstants[openInstant.id] = replaceItemAtIndex(oldInstant, targetIndex, targetValue);
    } else {
      newInstants[openInstant.id].push({ ...newParams, id: uuidv4() });
    }

    console.log('newInstants', newInstants)

    onInstantClose(newInstants);
  };

  const onInstantClose = useCallback((instants?: InstantsValue) => {
    reset();
    onChangeInstant && onChangeInstant({ id: '', mode: 'w', open: false }, instants);
  }, []);

  const onDeleteInstant = useCallback(() => {
    if (openInstant.mode == 'v') {
      const newInstants = _.cloneDeep(instants);
      const oldInstant = newInstants[openInstant.id];
      const targetIndex = oldInstant.findIndex((action) => action.id === openInstant.action?.id);
      newInstants[openInstant.id] = removeItemAtIndex(oldInstant, targetIndex);
      onInstantClose(newInstants);
    }
  }, [openInstant, instants]);

  const onError = (errors: any, e: any) => {
    console.log('error', errors, e);
  };

  const formSubmit = () => {
    handleSubmit((data) => onSubmit(data), onError)();
  };

  const renderFooter = useMemo(() => {
    return (
      <Stack spacing={0} sx={{ bgcolor: theme.palette.background.paper, width: '100%' }}>
        <Divider />
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent={onChangeInstant ? 'space-between' : 'flex-end'}
          sx={{ px: 2, py: 1 }}
        >
          {onChangeInstant && (
            <Button size="small" variant="contained" color="secondary" onClick={() => onInstantClose()}>
              {t('ncrm_common_btn_close')}
            </Button>
          )}
          <Stack direction="row" spacing={1} alignItems="center">
            {openInstant?.mode == 'v' && (
              <Button size="small" variant="outlined" color="error" onClick={onDeleteInstant}>
                {t('ncrm_common_btn_delete')}
              </Button>
            )}
            <Button size="small" variant="contained" color="success" onClick={formSubmit} disabled={!isValid}>
              {openInstant?.mode == 'v' ? t('ncrm_common_btn_save') : t('ncrm_common_btn_add')}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    );
  }, [isValid, openInstant]);

  return (
    <Stack spacing={0} sx={{ width: '100%', boxShadow: theme.customShadows.z1 }}>
      {SidebarHeader({ title: t('ncrm_process_automation_instant_add_action'), onClose: () => onInstantClose() })}
      <WriteFields triggerModule={triggerModule} control={control} watch={watch} errors={errors} fields={fields} />
      {renderFooter}
    </Stack>
  );
};

export default InstantWrite;
