import WriteField from '@base/containers/WriteField';
import { Box, Grid } from '@mui/material';
import { useMemo } from 'react';
import { Control, FieldErrorsImpl, UseFormWatch } from 'react-hook-form';

interface WriteFieldsProps {
  menuApi: string;
  fields: any[]; //with write form
  watch: UseFormWatch<any>; //hook-form
  control: Control<any, any>; //hook-form
  //setValue: UseFormSetValue<any>; //hook-form
  errors: Partial<FieldErrorsImpl<any>>; //hook-from
}
const WriteFields = (props: WriteFieldsProps) => {
  const {
    menuApi,
    fields,
    watch,
    control,
    //setValue,
    errors
  } = props;

  let assignMode = 'AR_ASSGIN_TO_MODE_USERS';
  let checkAvailable = true;

  // main fields
  console.log('writeFrom', fields);
  //console.log('watch WriteFieldsEntry >>>>>>>>>', watch()); //get form values when inputing
  const WatchForm = () => {
    const formData = watch();
    if (formData?.assignMode) {
      assignMode = formData.assignMode.value;
    }
    checkAvailable = formData.check_available;
  };
  WatchForm();

  const MainFields = useMemo(() => {
    return (
      <>
        {fields?.map((_item, _index) => {
          let isHidden = false;
          if (assignMode === 'AR_ASSGIN_TO_MODE_USERS') {
            if (_item.keyName === 'assignGroup') {
              isHidden = true;
            }
          } else {
            if (_item.keyName === 'assignUser') {
              isHidden = true;
            }
          }
          if (_item.keyName === 'available_based_on' && checkAvailable === false) {
            isHidden = true;
          }

          return <WriteField key={_item.keyName} item={_item} control={control} errors={errors} isHidden={isHidden} />;
        })}
      </>
    );
  }, [fields]);

  return (
    <Box sx={{ p: 2.5 }}>
      <Grid container spacing={2} alignItems="center">
        {MainFields}
      </Grid>
    </Box>
  );
};

export default WriteFields;
