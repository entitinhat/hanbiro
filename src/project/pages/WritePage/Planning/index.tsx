import _ from 'lodash';
import React, { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';

//config
import ButtonSplit from '@base/components/@hanbiro/ButtonSplit';
import MiModal from '@base/components/@hanbiro/MiModal';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import { LAYOUT_PROJECT_PLANNING } from '@base/config/menus';
import { ButtonOption } from '@base/types/extended';
import { S3UploadedFile } from '@base/types/s3';
import { WriteParseFields } from '@base/utils/helpers/noLayoutUtils';
import { Button, Grid, Stack } from '@mui/material';
import { KEY_NAME_PLANNING_PAGE_TYPE } from '@project/config/keyNames';
import usePlanningMutation from '@project/hooks/usePlanningMutation';
import { getDefault } from '@project/pages/WritePage/Template/Task/TaskWrite';
import { projectSettingSelector } from '@project/store/selectors/setting';

import WriteFields from './WriteFields';

interface WriteModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId?: string;
  onReload?: () => void;
}

const PlanningWriteModal = (props: WriteModalProps) => {
  const { isOpen, onClose, projectId, onReload } = props;
  const { t } = useTranslation();
  const [isReset, setIsReset] = useState(false);
  const { fields, getParams, defaultValues } = WriteParseFields(LAYOUT_PROJECT_PLANNING);
  const settingPage = useRecoilValue(projectSettingSelector('TYPE_PAGE'));
  const [startUpload, setStartUpload] = useState(false);
  const [submitData, setSubmitData] = useState<Record<string, any>>({});

  const newDefaultValues = useMemo(() => {
    defaultValues[KEY_NAME_PLANNING_PAGE_TYPE] = getDefault(settingPage);
    return defaultValues;
  }, [settingPage]);

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid }
  } = useForm({
    criteriaMode: 'firstError',
    mode: 'onChange'
  });

  useEffect(() => {
    setTimeout(() => {
      reset(newDefaultValues);
    }, 500);
  }, [reset, newDefaultValues]);

  const onChange = (sucess: boolean) => {
    onReload && onReload();
    if (isReset) {
      reset();
    } else {
      handleClose();
    }
  };

  //create mutation
  const {
    mAddPlanning: { mutate: mutationAdd, isLoading }
  } = usePlanningMutation({ onChange });

  //when submit error, call this
  const onError = (errors: any, e: any) => {
    console.log('error', errors, e);
  };

  //close
  const handleClose = () => {
    reset();
    onClose && onClose();
  };

  const onUploadComplete = (uploads: Record<string, S3UploadedFile[]>) => {
    console.log('uploads', uploads);
    console.log('submitData', submitData);
    mutationAdd({ planning: submitData });
  };

  //submit form
  const onSubmit = useCallback((formData: any) => {
    setStartUpload(true);
    console.log('formData => ', formData);
    const newParams: any = getParams(formData);
    const addData = {
      ...newParams,
      projectId: projectId
    };
    console.log('addData => ', addData);
    setSubmitData(addData);
  }, []);

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
        title={<SpanLang keyLang={`ncrm_new_project_planning`} />}
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

export default PlanningWriteModal;
