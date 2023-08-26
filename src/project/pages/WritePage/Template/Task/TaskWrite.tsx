import _ from 'lodash';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';

import NoteAndError from '@base/components/@hanbiro/NoteAndError';
import SidebarFooter from '@base/components/@hanbiro/Sidebar/Footer';
import SidebarHeader from '@base/components/@hanbiro/Sidebar/Header';
import { LAYOUT_PROJECT_TASK_TEMPLATE, MENU_PROJECT_TEMPLATE } from '@base/config/menus';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { WriteParseFields } from '@base/utils/helpers/noLayoutUtils';
import { Box, Stack } from '@mui/material';
import {
  KEY_NAME_TASK_DEV_COST_TYPE,
  KEY_NAME_TASK_DEV_SOURCE,
  KEY_NAME_TASK_DEV_TYPE,
  KEY_NAME_TASK_PAGE_TYPE
} from '@project/config/keyNames';
import useTaskTemplateMutation from '@project/hooks/useTemplateMutation';
import { getQuery } from '@project/pages/ListPage/Template/Task/Helper';
import { projectSettingSelector } from '@project/store/selectors/setting';
import { Setting } from '@project/types/setting';

import WriteFields from './WriteFields';

interface TaskWriteProps {
  category: string;
  onClose: () => void;
}

export function getDefault(settings: Setting[]) {
  let defaultValue = null;
  settings.forEach((v) => {
    if (v.default) {
      defaultValue = { keyName: v.id, languageKey: v.name };
    }
  });
  return defaultValue;
}

function TaskWrite({ category, onClose }: TaskWriteProps) {
  const { t } = useTranslation();
  const { fields, getParams, defaultValues } = useMemo(() => WriteParseFields(LAYOUT_PROJECT_TASK_TEMPLATE), []);
  const pageDataKey = `${MENU_PROJECT_TEMPLATE}_${category}`;
  const { listQueryKey } = useListPageSettings(pageDataKey, getQuery);
  const settingPage = useRecoilValue(projectSettingSelector('TYPE_PAGE'));
  const settingDev = useRecoilValue(projectSettingSelector('TYPE_DEV'));
  const settingDevSource = useRecoilValue(projectSettingSelector('TYPE_DEV_SOURCE'));
  const settingCost = useRecoilValue(projectSettingSelector('TYPE_COST'));

  const newDefaultValues = useMemo(() => {
    defaultValues[KEY_NAME_TASK_PAGE_TYPE] = getDefault(settingPage);
    defaultValues[KEY_NAME_TASK_DEV_TYPE] = getDefault(settingDev);
    defaultValues[KEY_NAME_TASK_DEV_SOURCE] = getDefault(settingDevSource);
    defaultValues[KEY_NAME_TASK_DEV_COST_TYPE] = getDefault(settingCost);
    return defaultValues;
  }, [settingPage, settingDev, settingDevSource, settingCost]);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid }
  } = useForm({
    // defaultValues: defaultValues,
    criteriaMode: 'firstError',
    mode: 'onChange'
  });

  useEffect(() => {
    setTimeout(() => {
      reset(newDefaultValues);
    }, 500);
  }, [reset, newDefaultValues]);

  const onChange = (success: boolean) => {
    reset(newDefaultValues);
    onClose && onClose();
  };

  const handleClose = () => {
    reset(newDefaultValues);
    onClose && onClose();
  };

  const {
    mAddTaskTemplate: { mutate: mutationAdd, isLoading }
  } = useTaskTemplateMutation({ listQueryKey, onChange });

  const onSubmit = (formData: any) => {
    delete formData.attachment;
    const newParams = getParams(formData);
    const addData = {
      ...newParams
    };
    console.log('addData', addData);
    mutationAdd({ task: addData });
  };

  const onError = (errors: any, e: any) => {
    console.log('error', errors, e);
  };

  const formSubmit = () => {
    handleSubmit((data) => onSubmit(data), onError)();
  };

  return (
    <Stack spacing={0} sx={{ width: '100%', position: 'relative', overflow: 'hidden' }}>
      {SidebarHeader({ title: t('project_create_task_template'), onClose: handleClose })}
      <Box component="form" sx={{ margin: 0, height: `calc(100vh - 145px)`, overflowY: 'auto' }}>
        <NoteAndError errors={errors} />
        <WriteFields control={control} errors={errors} fields={fields} />
      </Box>
      {SidebarFooter({ onSubmit: formSubmit, isLoading, isValid, onClose: handleClose })}
    </Stack>
  );
}

export default TaskWrite;
