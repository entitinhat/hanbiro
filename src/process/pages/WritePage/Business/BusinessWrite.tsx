import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import NoteAndError from '@base/components/@hanbiro/NoteAndError';
import SidebarFooter from '@base/components/@hanbiro/Sidebar/Footer';
import SidebarHeader from '@base/components/@hanbiro/Sidebar/Header';
import { LAYOUT_PROCESS_BUSINESS, MENU_PROCESS, MENU_PROCESS_BUSINESS } from '@base/config/menus';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { WriteParseFields } from '@base/utils/helpers/noLayoutUtils';
import { Box, Stack } from '@mui/material';
import useProcessMutate from '@process/hooks/useProcessMutation';
import { getQuery } from '@process/pages/ListPage/Business/Helper';

import WriteFields from './WriteFields';

interface BusinessWriteProps {
  onClose?: () => void;
}

function BusinessWrite({ onClose }: BusinessWriteProps) {
  const { fields, getParams, defaultValues } = WriteParseFields(LAYOUT_PROCESS_BUSINESS);
  const pageDataKey = `${MENU_PROCESS}_${MENU_PROCESS_BUSINESS}`;
  const { listQueryKey } = useListPageSettings(pageDataKey, getQuery);

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset
  } = useForm({
    defaultValues: {
      ...defaultValues
    },
    criteriaMode: 'firstError',
    mode: 'onChange'
  });

  const {
    mAddProcess: { mutate: mutationAdd, isLoading }
  } = useProcessMutate(listQueryKey, onClose, reset);

  const onSubmit = (formData: any) => {
    const newParams = getParams(formData);
    console.log('newParams', newParams);
    // mutationAdd({ process: { id: uuidv4(), ...newParams } });
    mutationAdd({ process: newParams });
  };

  const onError = (errors: any, e: any) => {
    console.log('error', errors, e);
  };

  const formSubmit = () => {
    handleSubmit((data) => onSubmit(data), onError)();
  };

  return (
    // <Stack spacing={0} sx={{ width: '100%', position: 'relative', overflow: 'hidden', height: `calc(100vh - 50px)` }}>
    <Stack spacing={0} sx={{ width: '100%', position: 'relative', overflow: 'hidden' }}>
      {SidebarHeader({ title: 'ncrm_process_create_business', onClose: onClose })}
      <Box component="form" sx={{ margin: 0, height: `calc(100vh - 145px)`, overflowY: 'auto' }}>
        <NoteAndError errors={errors} />
        <WriteFields control={control} errors={errors} fields={fields} />
      </Box>
      {SidebarFooter({ onSubmit: formSubmit, isLoading: isLoading, isValid: isValid, onClose: onClose })}
    </Stack>
  );
}

export default BusinessWrite;
