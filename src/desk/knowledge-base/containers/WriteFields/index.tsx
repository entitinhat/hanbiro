import WriteField from '@base/containers/WriteField';
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material';
import _ from 'lodash';
import { lazy, useMemo } from 'react';
import { Control, FieldErrorsImpl, UseFormWatch } from 'react-hook-form';
import * as keyNames from '@desk/knowledge-base/config/keyNames';
import { default as viewConfig } from '@desk/knowledge-base/config/view-field';

interface WriteFieldsProps {
  menuApi: string;
  fields: any[]; //with write form
  watch: UseFormWatch<any>; //hook-form
  control: Control<any, any>; //hook-form
  //setValue: UseFormSetValue<any>; //hook-form
  errors: Partial<FieldErrorsImpl<any>>; //hook-from
}
const TUIEditorTemplateView = lazy(() => import('@base/containers/ViewField/EditorTemplate/Edit'));

const WriteFields = (props: WriteFieldsProps) => {
  const {
    menuApi,
    fields,
    watch,
    control,
    //setValue,
    errors
  } = props;
  // main fields

  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));

  const MainFields = useMemo(() => {
    return (
      <>
        {fields?.map((_item, _index) => {
          if (_item.keyName === keyNames.KEY_KNOWLEDGE_BASE_CONTENT) {
            _item.componentProps = {
              ..._item.componentProps,
              parentID: '#write-grapes'
            };
            
          }
          return <WriteField key={_item.keyName} item={_item} control={control} errors={errors} />;
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
