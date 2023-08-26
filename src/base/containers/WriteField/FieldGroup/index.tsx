import SpanLang from '@base/components/@hanbiro/SpanLang';
import { Grid, InputLabel, useTheme } from '@mui/material';
import WriteField from '@base/containers/WriteField';
import { FieldErrorsImpl } from 'react-hook-form/dist/types/errors';
import { Control } from 'react-hook-form/dist/types/form';
import { useTranslation } from 'react-i18next';

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
      <Grid container>
        {fields?.map((_item, _index) => {
          let componentProps = {
            ..._item.componentProps,
            placeholder: t(_item?.componentProps?.placeholder ?? '')
          };
          let validate = { ..._item.validate };

          if (groupFields.includes(_item.keyName)) {
            return (
              <Grid key={_item.keyName} item xs={12} lg={6} sx={_item.keyName === groupFields[0] ? { pr: 1, mb: 1 } : { pl: 1, mb: 1 }}>
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
              </Grid>
            );
          }
        })}
      </Grid>
    </Grid>
  );
};
export default FieldGroup;
