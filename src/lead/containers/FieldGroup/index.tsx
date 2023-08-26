import SpanLang from '@base/components/@hanbiro/SpanLang';
import { Box, Divider, Grid, InputLabel, useTheme } from '@mui/material';
import WriteField from '@base/containers/WriteField';
import { FieldErrorsImpl } from 'react-hook-form/dist/types/errors';
import { Control } from 'react-hook-form/dist/types/form';
import { useTranslation } from 'react-i18next';
import * as keyNames from '@lead/config/keyNames';

interface FieldGroupProps {
  fields?: any[];
  control: Control<any, any>; //hook-form
  errors: Partial<FieldErrorsImpl<any>>; //hook-from
  groupFields: string[];
  title?: string;
}

const FieldGroup = (props: FieldGroupProps) => {
  const { fields, control, errors, groupFields, title } = props;
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <Grid item sx={{ width: '100%' }}>
      <InputLabel sx={{ display: 'flex', alignItems: 'center', mb: '10px' }}>
        <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={title ?? ''} />
      </InputLabel>
      <Divider />
      <Grid container spacing={2} alignItems="flex-start" sx={{ p: '10px' }}>
        {fields?.map((_item, _index) => {
          let componentProps = {
            ..._item.componentProps,
            placeholder: t(_item?.componentProps?.placeholder ?? '')
          };
          let validate = { ..._item.validate };
          if (_item.keyName !== keyNames.KEY_LEAD_TITLE) validate = {};

          if (groupFields.includes(_item.keyName))
            return (
              <WriteField
                key={_item.keyName}
                item={{
                  ..._item,
                  componentProps,
                  validate,
                  TitleSx: { color: theme.palette.text.secondary }
                }}
                control={control}
                errors={errors}
              />
            );
        })}
      </Grid>
    </Grid>
  );
};
export default FieldGroup;
