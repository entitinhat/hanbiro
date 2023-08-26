import _ from 'lodash';
import React, { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';

//config
import ButtonSplit from '@base/components/@hanbiro/ButtonSplit';
import MiModal from '@base/components/@hanbiro/MiModal';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import { LAYOUT_PROJECT_PROJECT, MENU_PROJECT } from '@base/config/menus';
import { ListType } from '@base/types/app';
import { ButtonOption } from '@base/types/extended';
import { WriteParseFields } from '@base/utils/helpers/noLayoutUtils';
import { Button, Grid, Stack } from '@mui/material';
import { KEY_NAME_PROJECT_TYPE } from '@project/config/keyNames';
import useProjectMutation from '@project/hooks/useProjectMutation';
import { getDefault } from '@project/pages/WritePage/Template/Task/TaskWrite';
import { projectSettingSelector } from '@project/store/selectors/setting';

import WriteFields from './WriteFields';
import { useTranslation } from 'react-i18next';

interface WriteModalProps {
  isOpen: boolean;
  onClose: () => void;
  menuApi: string;
  listType: ListType;
  category: string;
  onReload?: () => void;
}

const ProjectWriteModal = (props: WriteModalProps) => {
  const { isOpen, onClose, category } = props;
  const { t } = useTranslation();
  const [isReset, setIsReset] = useState(false);
  const { fields, getParams, defaultValues } = WriteParseFields(LAYOUT_PROJECT_PROJECT);
  const settingProject = useRecoilValue(projectSettingSelector('TYPE_PROJECT'));

  const newDefaultValues = useMemo(() => {
    defaultValues[KEY_NAME_PROJECT_TYPE] = getDefault(settingProject);
    return defaultValues;
  }, [settingProject]);

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
    if (isReset) {
      reset();
    } else {
      handleClose();
    }
  };

  //create mutation
  const {
    mAddProject: { mutate: mutationAdd, isLoading }
  } = useProjectMutation({ onChange });

  //when submit error, call this
  const onError = (errors: any, e: any) => {
    console.log('error', errors, e);
  };

  //close
  const handleClose = () => {
    reset();
    onClose && onClose();
  };

  //submit form
  const onSubmit = useCallback((formData: any) => {
    console.log('formData => ', formData);
    const newParams: any = getParams(formData);
    const addData = {
      ...newParams
    };
    console.log('addData => ', addData);
    mutationAdd({ project: addData });
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
        title={<SpanLang keyLang={`ncrm_new_${MENU_PROJECT}_${category}`} />}
        isOpen={isOpen}
        size="sm"
        fullScreen={false}
        onClose={handleClose}
        footer={Footer}
      >
        {isOpen && (
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <WriteFields control={control} errors={errors} fields={fields} />
          </form>
        )}
      </MiModal>
    </Suspense>
  );
};

export default ProjectWriteModal;
