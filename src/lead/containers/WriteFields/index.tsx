import WriteField from '@base/containers/WriteField';
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material';
import _ from 'lodash';
import { lazy, Suspense, useMemo } from 'react';
import { Control, FieldErrorsImpl, UseFormWatch } from 'react-hook-form';
import * as keyNames from '@lead/config/keyNames';
import { AddressGroup, companyGroup, contactGroup } from '@lead/config/write-field';
import FieldGroup from '../FieldGroup';
import { useTranslation } from 'react-i18next';

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

  const theme = useTheme();
  const { t } = useTranslation();

  const MainFields = useMemo(() => {
    return (
      <>
        {fields?.map((_item, _index) => {
          console.log('field: ', _item);
          let componentProps = { ..._item.componentProps, placeholder: t(_item?.componentProps?.placeholder ?? '') };
          let validate = { ..._item.validate };
          if (_item.keyName !== keyNames.KEY_LEAD_TITLE) validate = {};
          if (contactGroup.includes(_item.keyName)) {
            // Group WriteFields
            if (_item.keyName === keyNames.KEY_LEAD_CONTACT_EMAIL)
              return (
                <FieldGroup
                  key={_item.keyName}
                  control={control}
                  errors={errors}
                  fields={fields}
                  groupFields={contactGroup}
                  title={t('sales_lead_field_basic_contact') ?? 'Contact'}
                />
              );
            return;
          }
          if (companyGroup.includes(_item.keyName)) {
            if (_item.keyName === keyNames.KEY_LEAD_COMPANY_INDUSTRY)
              return (
                <FieldGroup
                  key={_item.keyName}
                  control={control}
                  errors={errors}
                  fields={fields}
                  groupFields={companyGroup}
                  title={t('sales_lead_field_basic_company') ?? 'Company'}
                />
              );
            return;
          }
          if (AddressGroup.includes(_item.keyName)) {
            if (_item.keyName === keyNames.KEY_LEAD_SHIP_TO)
              return (
                <FieldGroup
                  key={_item.keyName}
                  control={control}
                  errors={errors}
                  fields={fields}
                  groupFields={AddressGroup}
                  title={t('sales_lead_field_basic_address') ?? ''}
                />
              );
            return;
          }
          return <WriteField key={_item.keyName} item={{ ..._item, componentProps, validate }} control={control} errors={errors} />;
        })}
      </>
    );
  }, [fields, errors, control]);

  return (
    <Suspense fallback={<></>}>
      <Box sx={{ p: 2.5 }}>
        <Grid container spacing={2} alignItems="center">
          <>{MainFields}</>
        </Grid>
      </Box>
    </Suspense>
  );
};

export default WriteFields;
