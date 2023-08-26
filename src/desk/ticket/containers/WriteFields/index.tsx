import { Box, Grid } from '@mui/material';
import _ from 'lodash';
import * as keyNames from '@desk/ticket/config/keyNames';
import { Control, FieldErrorsImpl, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { useEffect, useMemo, useState } from 'react';
import WriteField from '@base/containers/WriteField';
import WriteAddCustomer from '@customer/containers/WriteAddCustomer';
import WriteAddContact from '@customer/pages/WritePage';
import { MENU_CUSTOMER } from '@base/config/menus';
import CategoryProductContainer from './CategoryWriteField';
interface WriteFieldsProps {
  menuApi: string;
  fields: any[]; //with write form
  watch: UseFormWatch<any>; //hook-form
  control: Control<any, any>; //hook-form
  setValue: UseFormSetValue<any>; //hook-form
  errors: Partial<FieldErrorsImpl<any>>; //hook-from
}

const WriteFields = (props: WriteFieldsProps) => {
  const { menuApi, fields, watch, control, setValue, errors } = props;
  const [showAddCustomer, setShowAddCustomer] = useState<boolean>(false);
  const [showAddContact, setShowAddContact] = useState<boolean>(false);

  console.log('WriteFields FIELDS>>>>>>>', menuApi, '\n', fields);

  const productValue = watch(keyNames.KEY_TICKET_PRODUCT);

  const categoryValue = watch(keyNames.KEY_TICKET_CATEGORY);
  const customerValue = watch(keyNames.KEY_TICKET_CUSTOMER);
  const assignGroupValue = watch(keyNames.KEY_TICKET_ASSIGN_GROUP);
  useEffect(() => {
    if (customerValue) {
      setValue(keyNames.KEY_TICKET_CONTACT, null);
    }
  }, [customerValue]);
  // useEffect(() => {
  //   if (!productValue) {
  //     setValue(keyNames.KEY_TICKET_CATEGORY, null);
  //   }
  // }, [productValue]);
  useEffect(() => {
    if (categoryValue) {
      console.log('categoryValue', categoryValue);
      if (categoryValue?.rules?.length > 0) {
        const curRule = categoryValue?.rules?.length > 0 ? categoryValue.rules[0] : null;
        // console.log('categoryValue',curRule);
        setValue(keyNames.KEY_TICKET_PRIORITY, {
          keyName: curRule.priority.keyName,
          languageKey: curRule.priority.languageKey
        });
      }
    } else {
      setValue(keyNames.KEY_TICKET_PRIORITY, null);
    }
  }, [categoryValue]);
  useEffect(() => {
    setValue(keyNames.KEY_TICKET_ASSIGN_USER, null);
  }, [assignGroupValue]);

  //create new customer
  const handleWriteCustomerSuccess = (newCustomer: any) => {
    setValue(keyNames.KEY_TICKET_CUSTOMER, newCustomer);
  };
  //create new contact
  const handleWriteContactSuccess = (newContact: any) => {
    setValue(keyNames.KEY_TICKET_CONTACT, newContact);
  };
  //Debug
  // console.log('CustomerValue:', fields);
  const MainFields = useMemo(() => {
    return (
      <>
        {fields.map((_item, _index) => {
          let newComponentProps = { ..._item?.componentProps };

          if (_item.keyName === keyNames.KEY_TICKET_PRODUCT) return;
          if (_item.keyName === keyNames.KEY_TICKET_CATEGORY) {
            return <CategoryProductContainer fields={fields} control={control} errors={errors} />;
          }

          //filter options for assign reps
          if (_item.keyName === keyNames.KEY_TICKET_ASSIGN_USER) {
            if (assignGroupValue) {
              newComponentProps.groupId = assignGroupValue.id;

              if (assignGroupValue?.reps?.length > 0) {
                newComponentProps.defaultOptions = assignGroupValue?.reps?.map((_ele: any) => ({
                  id: _ele.user?.id,
                  name: _ele.user?.name,
                  group: { id: assignGroupValue.id, name: assignGroupValue.name }
                }));
              }
            }
          }

          //disable contact fields
          if (_item.keyName === keyNames.KEY_TICKET_CONTACT ) {
            return;
          }
          // //visible contact by account
          // if (_item.keyName === keyNames.KEY_TICKET_CONTACT && customerValue?.category !== 'CATEGORY_ACCOUNT') {
          //   return;
          // }
          // //filter contact by account
          // if (_item.keyName === keyNames.KEY_TICKET_CONTACT && customerValue?.category === 'CATEGORY_ACCOUNT') {
          //   newComponentProps.accountId = customerValue.id;
          // }
          // if (_item.keyName === keyNames.KEY_TICKET_CONTACT) {
          //   return;
          // }
          let isHidden = false;
          // if (_item.keyName === keyNames.KEY_TICKET_CODE) {
          //   isHidden = true;
          // }
          //event for New customer
          if (_item.keyName === keyNames.KEY_TICKET_CUSTOMER) {
            newComponentProps.onAdd = () => setShowAddCustomer(true);
          }
          //event for New contact
          if (_item.keyName === keyNames.KEY_TICKET_CONTACT) {
            newComponentProps.onAdd = () => setShowAddContact(true);
          }
          return (
            <WriteField
              key={_item.keyName}
              item={{ ..._item, componentProps: newComponentProps }}
              control={control}
              errors={errors}
              isHidden={isHidden}
            />
          );
        })}
      </>
    );
  }, [fields, productValue, categoryValue, assignGroupValue]);

  return (
    <Box sx={{ p: 2.5 }}>
      <Grid container spacing={2} alignItems="center">
        {MainFields}
      </Grid>
      {showAddCustomer && (
        <WriteAddCustomer
          isOpen={showAddCustomer}
          onClose={() => setShowAddCustomer(false)}
          //type={''}
        />
      )}
      {showAddContact && (
        <WriteAddContact
          isOpen={showAddContact}
          account={{
            id: customerValue.id, //account id
            name: customerValue.name, //account name
            type: customerValue.type,
            code: customerValue.code,
            category: customerValue.category
          }}
          menuApi={`${MENU_CUSTOMER}_contact`}
          onClose={() => setShowAddContact(false)}
          onSuccess={handleWriteContactSuccess}
          category={'contact'}
        />
      )}
    </Box>
  );
};

export default WriteFields;
