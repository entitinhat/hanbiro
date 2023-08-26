import _ from 'lodash';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';

import SidebarFooter from '@base/components/@hanbiro/Sidebar/Footer';
import SidebarHeader from '@base/components/@hanbiro/Sidebar/Header';
import { LAYOUT_PROCESS_CLOSED } from '@base/config/menus';
import { WriteParseFields } from '@base/utils/helpers/noLayoutUtils';
import { Stack } from '@mui/material';
import useStepMutation from '@process/hooks/useStepMutation';

import WriteFields from './WriteFields';

interface ClosedWriteProps {
  processId: string;
  onClose?: () => void;
}

function ClosedWrite({ processId, onClose }: ClosedWriteProps) {
  const { fields, getParams, defaultValues } = useMemo(() => WriteParseFields(LAYOUT_PROCESS_CLOSED), []);

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

  //create mutation
  const {
    mAddStep: { mutate: mutationAdd, isLoading }
  } = useStepMutation(processId, handleClose);

  const onSubmit = (formData: any) => {
    const newParams = getParams(formData);
    // console.log('configParams => ', newParams);
    const addData = {
      name: newParams.name,
      type: 'TYPE_CLOSE',
      description: newParams.description,
      close: {
        jump: newParams.jump,
        view: newParams.view,
        property: newParams.property
      }
    };
    mutationAdd({ id: processId, step: addData });
  };

  const onError = (errors: any, e: any) => {
    console.log('error', errors, e);
  };

  const formSubmit = () => {
    handleSubmit((data) => onSubmit(data), onError)();
  };

  return (
    <Stack spacing={2} sx={{ width: '100%', position: 'relative', height: `calc(100vh - 50px)` }}>
      {SidebarHeader({ title: 'ncrm_process_create_closed', onClose: onClose })}
      <form style={{ margin: 0, height: `calc(100vh - 145px)`, overflowY: 'auto' }}>
        <WriteFields control={control} errors={errors} fields={fields} />
      </form>
      {SidebarFooter({ onSubmit: formSubmit, isLoading: isLoading, isValid: isValid, onClose: onClose })}
    </Stack>
  );
}

export default ClosedWrite;
