import _ from 'lodash';
import { useMemo } from 'react';

import { CustomerAutoComplete } from '@activity/config/write-field/components';
import { UserOrCustomer } from '@activity/types/activity';
import ToEmail from '@activity/containers/ToEmail';

interface ToCustomerEditProps {
  value: UserOrCustomer[];
  mode?: 'phone' | 'email' | 'none' | 'sms';
  single?: boolean;
  onChange: (val: UserOrCustomer[]) => void;
}

function ToCustomerEdit(props: ToCustomerEditProps) {
  const { value, onChange, single = false, mode = 'none' } = props;
  const items = useMemo(() => {
    let newValue = value;
    if (newValue) {
      if (single) {
        return { name: value[0]?.name, id: value[0]?.id };
      } else if (Array.isArray(value)) {
        return value?.map((v) => ({ name: v.name, id: v.id }));
      } else return [value]?.map((v: any) => ({ name: v.name, id: v.id }));
    }
  }, [value]);

  const setCustomer = (item: any) => {
    if (!_.has(item, 'code')) return item;
    let customer: UserOrCustomer = {
      type: item.category == 'CATEGORY_ACCOUNT' ? 'TYPE_ACCOUNT' : 'TYPE_CONTACT',
      id: item.id,
      name: item.name
    };
    if (mode == 'email') {
      const email = item.emails?.find((o: any) => o.label?.label == 'LABEL_PRIMARY');
      customer.email = email?.email ?? '';
    } else if (mode == 'phone') {
      const phone = item.phones?.find((o: any) => o.label?.label == 'LABEL_PRIMARY');
      customer.phone = phone?.phoneNumber ?? '';
    }
    return customer;
  };

  const onChangeCustomer = (val: any | any[]) => {
    if (_.isEmpty(val)) {
      return;
    }

    if (single) {
      const customer = setCustomer(val);
      onChange && onChange([customer]);
    } else {
      const customers = _.isArray(val)
        ? val.map((v) => {
            return setCustomer(v);
          })
        : [];
      onChange && onChange(customers);
    }
  };
  return (
    <>
      {(mode == 'none' || mode == 'phone') && (
        <CustomerAutoComplete single={single} value={items} onChange={(val: any) => onChangeCustomer(val)} />
      )}
      {(mode == 'email' || mode == 'sms') && <ToEmail mode={mode} onChange={onChange} value={value} />}
    </>
  );
}

export default ToCustomerEdit;
