import _ from 'lodash';
import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useRecoilValue } from 'recoil';

//config
import ButtonSplit from '@base/components/@hanbiro/ButtonSplit';
import MiModal from '@base/components/@hanbiro/MiModal';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import { LAYOUT_PROJECT_TASK } from '@base/config/menus';
import { ButtonOption } from '@base/types/extended';
import { S3UploadedFile } from '@base/types/s3';
import { WriteParseFields } from '@base/utils/helpers/noLayoutUtils';
import { Button, Grid, Stack } from '@mui/material';
import {
  KEY_NAME_TASK_DEV_COST_TYPE,
  KEY_NAME_TASK_DEV_SOURCE,
  KEY_NAME_TASK_DEV_TYPE,
  KEY_NAME_TASK_ESTIMATED_TIME,
  KEY_NAME_TASK_FINISHINGQA,
  KEY_NAME_TASK_LINK,
  KEY_NAME_TASK_NAME,
  KEY_NAME_TASK_PAGE_TYPE
} from '@project/config/keyNames';
import useTaskMutation from '@project/hooks/useTaskMutation';
import { taskTemplateAtom } from '@project/store/atoms/template';
import { projectSettingSelector } from '@project/store/selectors/setting';

import { getDefault } from '../Template/Task/TaskWrite';
import WriteFields from './WriteFields';

interface WriteModalProps {
  isOpen: boolean;
  projectId?: string;
  planningId?: string;
  onClose: () => void;
  onReload?: () => void;
}

const WriteModal = (props: WriteModalProps) => {
  const { isOpen, onClose, projectId, planningId } = props;
  const { t } = useTranslation();
  const { fields, getParams, defaultValues } = useMemo(() => WriteParseFields(LAYOUT_PROJECT_TASK), []);
  const [startUpload, setStartUpload] = useState(false);
  const [submitData, setSubmitData] = useState<Record<string, any>>({});
  console.log('startUpload', startUpload);

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

  //state
  const [isReset, setIsReset] = useState(false);
  const [taskTemplate, setTaskTemplate] = useRecoilState(taskTemplateAtom);

  //react-hook
  const {
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors, isValid }
  } = useForm({
    criteriaMode: 'firstError',
    mode: 'onChange'
  });

  useEffect(() => {
    setTimeout(() => {
      reset(newDefaultValues);
    }, 500);
  }, [newDefaultValues]);

  useEffect(() => {
    if (taskTemplate) {
      if (taskTemplate.pageType) {
        setValue(KEY_NAME_TASK_PAGE_TYPE, {
          keyName: taskTemplate.pageType.id,
          languageKey: taskTemplate.pageType.name
        });
      }
      if (taskTemplate.devType) {
        setValue(KEY_NAME_TASK_DEV_TYPE, {
          keyName: taskTemplate.devType.id,
          languageKey: taskTemplate.devType.name
        });
      }

      if (taskTemplate.devSource) {
        setValue(KEY_NAME_TASK_DEV_SOURCE, {
          keyName: taskTemplate.devSource.id,
          languageKey: taskTemplate.devSource.name
        });
      }

      if (taskTemplate.devCostType) {
        setValue(KEY_NAME_TASK_DEV_COST_TYPE, {
          keyName: taskTemplate.devCostType.id,
          languageKey: taskTemplate.devCostType.name
        });
      }

      if (taskTemplate.estimatedTime) {
        setValue(KEY_NAME_TASK_ESTIMATED_TIME, taskTemplate.estimatedTime);
      }

      if (taskTemplate.links) {
        const links = taskTemplate.links.map((v) => {
          return {
            id: v.id,
            title: v.title,
            url: v.url
          };
        });

        setValue(KEY_NAME_TASK_LINK, links);
      }

      if (taskTemplate.qa) {
        const qa = taskTemplate.qa.map((v) => {
          const checklist = v.checklist?.map((_v) => ({
            id: _v.id,
            title: _v.title,
            description: _v.description
          }));

          return {
            id: v.id,
            subject: v.subject,
            checklist: checklist
          };
        });
        setValue(KEY_NAME_TASK_FINISHINGQA, qa);
      }

      // if (taskTemplate.attachments) {
      //   setValue(KEY_NAME_TASK_ATTACHMENT, {
      //     keyName: taskTemplate.devType.id,
      //     languageKey: taskTemplate.devType.name
      //   });
      // }
    }
  }, [taskTemplate]);

  const onChange = (sucess: boolean) => {
    if (isReset) {
      reset(newDefaultValues);
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    reset(newDefaultValues);
    setTaskTemplate(null);
    setStartUpload(false);
    onClose && onClose();
  };

  //create mutation
  const {
    mAddTask: { mutate: mutationAdd, isLoading }
  } = useTaskMutation({ listQueryKey: [], onChange });

  //when submit error, call this
  const onError = (errors: any, e: any) => {
    console.log('error', errors, e);
  };

  const onUploadComplete = (uploads: S3UploadedFile[]) => {
    console.log('uploads', uploads);
    console.log('submitData', submitData);
    mutationAdd({ task: { ...submitData, attachments: uploads } });
  };

  //submit form
  const onSubmit = (formData: any) => {
    console.log('formData => ', formData);
    delete formData.template;

    const newParams: any = getParams(formData);
    const addData = {
      ...newParams,
      projectId: projectId,
      planningId: planningId
    };
    console.log('addData => ', addData);
    setSubmitData(addData);
    setStartUpload(true);
  };

  //buttons
  const Footer = useMemo(() => {
    const options: ButtonOption[] = [
      {
        isMain: true,
        label: t('ncrm_common_btn_save'),
        color: 'primary',
        onClick: () => {
          setIsReset(false);
          handleSubmit((data) => onSubmit(data), onError)();
        },
        disabled: isLoading || !isValid,
        isLoading: isLoading
      },
      {
        isMain: false,
        label: t('ncrm_common_btn_save_and_create_new'),
        color: 'secondary',
        onClick: () => {
          setIsReset(true);
          handleSubmit((data) => onSubmit(data), onError)();
        },
        disabled: isLoading || !isValid,
        isLoading: isLoading
      }
    ];

    return (
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item></Grid>
        <Grid item>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button size="small" variant="outlined" color="secondary" onClick={handleClose}>
              {t('ncrm_common_btn_cancel')}
            </Button>
            <ButtonSplit buttons={options} />
          </Stack>
        </Grid>
      </Grid>
    );
  }, [isLoading, isValid]);

  //======================== Debug ========================//
  // console.log('form values', watch()); //get form values when inputing
  //console.log('form errors', errors); //get form values when inputing
  //console.log('form isValid', isValid); //get form values when inputing
  //console.log('form fields', fields); //All fields from pagelayout
  //======================== End Debug ========================//

  return (
    <Suspense fallback={<></>}>
      <MiModal
        title={<SpanLang keyLang="ncrm_new_project_task" />}
        isOpen={isOpen}
        size="sm"
        fullScreen={false}
        onClose={handleClose}
        footer={Footer}
      >
        {isOpen && (
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <WriteFields control={control} errors={errors} fields={fields} startUpload={startUpload} onUploadComplete={onUploadComplete} />
          </form>
        )}
      </MiModal>
    </Suspense>
  );
};

export default WriteModal;
