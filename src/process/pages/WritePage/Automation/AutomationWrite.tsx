import _ from 'lodash';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';

import NoteAndError from '@base/components/@hanbiro/NoteAndError';
import SidebarFooter from '@base/components/@hanbiro/Sidebar/Footer';
import SidebarHeader from '@base/components/@hanbiro/Sidebar/Header';
import { LAYOUT_PROCESS_AUTOMATION, MENU_PROCESS, MENU_PROCESS_AUTOMATION } from '@base/config/menus';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { WriteParseFields } from '@base/utils/helpers/noLayoutUtils';
import { Box, Stack } from '@mui/material';
import useAutomationMutate from '@process/hooks/useAutomationMutation';
import { getQuery } from '@process/pages/ListPage/Automation/Helper';

import WriteFields from './WriteFields';
import { useTranslation } from 'react-i18next';

interface AutomationWriteProps {
  onClose: () => void;
}

function AutomationWrite({ onClose }: AutomationWriteProps) {
  const { t } = useTranslation();
  const { fields, getParams, defaultValues } = useMemo(() => WriteParseFields(LAYOUT_PROCESS_AUTOMATION), []);
  const pageDataKey = `${MENU_PROCESS}_${MENU_PROCESS_AUTOMATION}`;
  const { listQueryKey } = useListPageSettings(pageDataKey, getQuery);

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: defaultValues,
    criteriaMode: 'firstError',
    mode: 'onChange'
  });

  const {
    mAddAutomation: { mutate: mutationAdd, isLoading }
  } = useAutomationMutate(listQueryKey, onClose);

  const onSubmit = (formData: any) => {
    const newParams = getParams(formData);
    const addData = {
      name: newParams.name,
      type: newParams.type,
      description: newParams.description,
      trigger: {
        id: newParams.trigger.id,
        name: newParams.trigger.name
      },
      module: newParams.trigger.module,
      criteria: newParams.criteria.criteria,
      instants: newParams.criteria.instants
    };
    console.log('addData', addData);
    mutationAdd({ rule: addData });
  };

  const onError = (errors: any, e: any) => {
    console.log('error', errors, e);
  };

  const formSubmit = () => {
    handleSubmit((data) => onSubmit(data), onError)();
  };

  return (
    // <Stack spacing={0} sx={{ width: '100%', position: 'relative', height: `calc(100vh - 50px)` }}>
    <Stack spacing={0} sx={{ width: '100%', position: 'relative', overflow: 'hidden' }}>
      {SidebarHeader({ title: t('ncrm_process_automation_rule_create_automation'), onClose })}
      <Box component="form" sx={{ margin: 0, height: `calc(100vh - 145px)`, overflowY: 'auto' }}>
        <NoteAndError errors={errors} />
        <WriteFields control={control} watch={watch} errors={errors} fields={fields} />
      </Box>
      {SidebarFooter({ onSubmit: formSubmit, isLoading, isValid, onClose })}
    </Stack>
  );
}

export default AutomationWrite;
