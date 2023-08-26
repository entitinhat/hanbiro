import React, { useMemo } from 'react';

// material-ui
import { Box, Grid, Stack } from '@mui/material';

// third-party
import _ from 'lodash';
import { Control, FieldErrorsImpl, UseFormWatch } from 'react-hook-form';

// project imports
import WriteField from '@base/containers/WriteField';
import { MENU_CUSTOMER_ACCOUNT, MENU_CUSTOMER_CONTACT } from '@base/config/menus';

//menu
import * as keyNames from '@customer/config/keyNames';
import { Customer } from '@customer/types/interface';
import { CUSTOMER_CATEGORY_ACCOUNT, CUSTOMER_CATEGORY_CONTACT } from '@customer/config/constants';

interface WriteFieldsProps {
  menuApi: string;
  type?: any; //customer type
  account?: Customer;
  fields: any[]; //with write form
  watch: UseFormWatch<any>; //hook-form
  control: Control<any, any>; //hook-form
  //setValue: UseFormSetValue<any>; //hook-form
  errors: Partial<FieldErrorsImpl<any>>; //hook-from
}

const WriteFields = (props: WriteFieldsProps) => {
  const {
    menuApi,
    type,
    account,
    fields,
    watch,
    control,
    //setValue,
    errors
  } = props;

  //state

  //watching
  const contactType: any = watch(keyNames.KEY_NAME_CUSTOMER_CONTACT_TYPE);

  //top fields
  const TopFields = useMemo(() => {
    //const codeField = fields.find((_item) => _item.keyName === keyNames.KEY_NAME_CUSTOMER_CODE);
    //const customerTypeField = fields.find((_item) => _item.keyName === keyNames.KEY_NAME_CUSTOMER_TYPE);
    //const contactTypeField = fields.find((_item) => _item.keyName === keyNames.KEY_NAME_CUSTOMER_CONTACT_TYPE);
    const nameField = fields.find((_item) => _item.keyName === keyNames.KEY_NAME_CUSTOMER_NAME);
    const photoField = fields.find((_item) => _item.keyName === keyNames.KEY_NAME_CUSTOMER_PHOTO);

    // for customer type
    // let newComponentProps = { ...customerTypeField?.componentProps };
    // if (type) {
    //   newComponentProps.isDisabled = true;
    // }

    return (
      <Grid item xs={12} lg={12}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} lg={4}>
            <WriteField key={photoField?.keyName} item={{ ...photoField, columns: 1, hideTitle: true }} control={control} errors={errors} />
          </Grid>
          <Grid item xs={12} lg={8}>
            <Grid container spacing={2}>
              <WriteField key={nameField?.keyName} item={{ ...nameField }} control={control} errors={errors} />
              {/* <WriteField key={codeField?.keyName} item={{ ...codeField, columns: 1 }} control={control} errors={errors} />
              {menuApi === MENU_CUSTOMER_ACCOUNT && customerTypeField && (
                <WriteField
                  key={customerTypeField?.keyName}
                  item={{ ...customerTypeField, columns: 1, componentProps: newComponentProps }}
                  control={control}
                  errors={errors}
                />
              )}
              {menuApi === MENU_CUSTOMER_CONTACT && contactTypeField && (
                <WriteField
                  key={contactTypeField?.keyName}
                  item={{
                    ...contactTypeField,
                    columns: 1,
                    componentProps: {
                      ...contactTypeField?.componentProps,
                      readOnly: account?.id ? true : false
                    }
                  }}
                  control={control}
                  errors={errors}
                />
              )} */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }, [fields]);

  //main fields
  const MainFields = useMemo(() => {
    return (
      <>
        {fields.map((_item, _index) => {
          //for contact type == account, contact
          if (
            _item.keyName !== keyNames.KEY_NAME_CUSTOMER_NAME &&
            _item.keyName !== keyNames.KEY_NAME_CUSTOMER_PHOTO &&
            _item.keyName !== keyNames.KEY_NAME_CUSTOMER_EMPLOYEE_ROLE &&
            _item.keyName !== keyNames.KEY_NAME_CUSTOMER_ACCOUNT &&
            _item.keyName !== keyNames.KEY_NAME_CUSTOMER_DEPARTMENT &&
            _item.keyName !== keyNames.KEY_NAME_CUSTOMER_POSITION &&
            _item.keyName !== keyNames.KEY_NAME_CUSTOMER_JOB
          ) {
            let newComponentProps = { ..._item?.componentProps };
            if (menuApi === MENU_CUSTOMER_CONTACT && _item.keyName === keyNames.KEY_NAME_CUSTOMER_CONTACT_TYPE && account?.id) {
              newComponentProps.isDisabled = true;
            }
            if (_item.keyName === keyNames.KEY_NAME_CUSTOMER_TYPE && type) {
              newComponentProps.isDisabled = true;
            }
            if (
              _item.keyName === keyNames.KEY_NAME_CUSTOMER_PHONES ||
              _item.keyName === keyNames.KEY_NAME_CUSTOMER_EMAIL ||
              _item.keyName === keyNames.KEY_NAME_CUSTOMER_FAX
            ) {
              newComponentProps.category = menuApi === MENU_CUSTOMER_ACCOUNT ? CUSTOMER_CATEGORY_ACCOUNT : CUSTOMER_CATEGORY_CONTACT;
            }

            //not render customer type
            // if (menuApi === MENU_CUSTOMER_ACCOUNT && _item.keyName === keyNames.KEY_NAME_CUSTOMER_TYPE) {
            //   return;
            // }
            //not render customer type
            // if (
            //   menuApi === MENU_CUSTOMER_CONTACT &&
            //   contactType?.keyName === 'CONTACT_TYPE_EMPLOYEE' &&
            //   _item.keyName === keyNames.KEY_NAME_CUSTOMER_TYPE
            // ) {
            //   return;
            // }
            //not render contact type
            // if (menuApi === MENU_CUSTOMER_CONTACT && _item.keyName === keyNames.KEY_NAME_CUSTOMER_CONTACT_TYPE) {
            //   return;
            // }
            if (menuApi === MENU_CUSTOMER_CONTACT && contactType?.keyName === 'CONTACT_TYPE_EMPLOYEE') {
              if (
                _item.keyName === keyNames.KEY_NAME_CUSTOMER_SHIP_ADDRESSES ||
                _item.keyName === keyNames.KEY_NAME_CUSTOMER_BILL_ADDRESSES
              ) {
                return;
              }
            }

            return (
              <WriteField
                key={_item.keyName}
                item={{
                  ..._item,
                  componentProps: newComponentProps
                }}
                control={control}
                errors={errors}
              />
            );
          }

          //for contact type == employee, display employee role + account
          if (menuApi === MENU_CUSTOMER_CONTACT && contactType?.keyName === 'CONTACT_TYPE_EMPLOYEE') {
            if (
              _item.keyName === keyNames.KEY_NAME_CUSTOMER_EMPLOYEE_ROLE ||
              _item.keyName === keyNames.KEY_NAME_CUSTOMER_ACCOUNT ||
              _item.keyName === keyNames.KEY_NAME_CUSTOMER_DEPARTMENT ||
              _item.keyName === keyNames.KEY_NAME_CUSTOMER_POSITION ||
              _item.keyName === keyNames.KEY_NAME_CUSTOMER_JOB
            ) {
              let newComponentProps = { ..._item?.componentProps };
              if (_item.keyName === keyNames.KEY_NAME_CUSTOMER_ACCOUNT && account?.id) {
                newComponentProps.readOnly = true;
              }

              return (
                <WriteField
                  key={_item.keyName}
                  item={{
                    ..._item,
                    componentProps: newComponentProps
                  }}
                  control={control}
                  errors={errors}
                />
              );
            }
          }
        })}
      </>
    );
  }, [fields, contactType]);

  //render
  return (
    <Box sx={{ p: 2.5 }}>
      <Grid container spacing={2}>
        {TopFields}
        {MainFields}
      </Grid>
    </Box>
  );
};

export default WriteFields;
