import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';

import SidebarFooter from '@base/components/@hanbiro/Sidebar/Footer';
import SidebarHeader from '@base/components/@hanbiro/Sidebar/Header';
import { LAYOUT_PROCESS_STAGE } from '@base/config/menus';
import { WriteParseFields } from '@base/utils/helpers/noLayoutUtils';
import { Stack } from '@mui/material';
import useStageMutation from '@process/hooks/useStageMutation';
// import { stageOpenAtom } from '@process/store/atoms/diagram';

import WriteFields from './WriteFields';

interface StageWriteProps {
  processId: string;
  sourceId : string;
  onClose?: () => void;
}

function StageWrite({ processId, onClose, sourceId }: StageWriteProps) {
  const { fields, getParams, defaultValues } = useMemo(() => WriteParseFields(LAYOUT_PROCESS_STAGE), []);
  // const openValue = useRecoilValue(stageOpenAtom);

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      ...defaultValues
    },
    criteriaMode: 'firstError',
    mode: 'onChange'
  });

  const handleClose = () => {
    reset();
    onClose && onClose();
  };

  const {
    mAddStage: { mutate: mutationAdd, isLoading }
  } = useStageMutation(processId, handleClose);

  const onSubmit = (formData: any) => {
    // console.log(formData);
    const newParams = getParams(formData);
    // console.log('configParams => ', newParams);
    mutationAdd({
      id: processId,
      stage: { ...newParams, ...{ width: 180 } },
      linkStage: sourceId
    });
  };

  const onError = (errors: any, e: any) => {
    console.log('error', errors, e);
  };

  const formSubmit = () => {
    handleSubmit((data) => onSubmit(data), onError)();
  };

  return (
    <Stack spacing={2} sx={{ width: '100%', position: 'relative', height: `calc(100vh - 50px)` }}>
      {SidebarHeader({ title: 'ncrm_process_create_stage', onClose: onClose })}
      <form style={{ margin: 0, height: `calc(100vh - 145px)`, overflowY: 'auto' }}>
        <WriteFields control={control} errors={errors} fields={fields} />
      </form>
      {SidebarFooter({ onSubmit: formSubmit, isLoading: isLoading, isValid: isValid, onClose: onClose })}
    </Stack>
  );
}

export default StageWrite;
