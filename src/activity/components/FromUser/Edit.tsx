import { useMemo } from 'react';
import _ from 'lodash';

import { UserOrCustomer } from '@activity/types/activity';
import UserAutoComplete from '@sign-in/containers/UserAutoComplete';

interface FromUserEditProps {
  value: UserOrCustomer[];
  onChange: (val: UserOrCustomer[]) => void;
  mode?: 'phone' | 'email';
  single?: boolean;
  placeholder?: string;
  isDisabled?: boolean;
}

function FromUserEdit(props: FromUserEditProps) {
  const { value, onChange, mode, single = false, placeholder, isDisabled } = props;
  const items = useMemo(() => {
    return single
      ? value?.length > 0
        ? { name: value[0]?.name, id: value[0]?.id }
        : null
      : value?.map((v) => ({ name: v.name, id: v.id }));
  }, [value]);

  const setUser = (item: any) => {
    if (!_.has(item, 'properties')) return item;
    let user: UserOrCustomer = {
      type: 'TYPE_USER',
      id: item.id,
      name: item.name
      // group: item.properties?.crmBaseGroup
    };
    if (mode == 'email') {
      // const email = item.emails?.find((o: any) => o.label?.label == 'LABEL_PRIMARY');
      user.email = item?.primaryEmail ?? '';
    } else if (mode == 'phone') {
      // const phone = item.phones?.find((o: any) => o.label?.label == 'LABEL_PRIMARY');
      user.phone = item?.primaryPhone ?? '';
    }
    return user;
  };

  const onChangeUser = (val: any | any[]) => {
    if (_.isEmpty(val)) {
      if (single) {
        onChange && onChange([]);
      }
    } else {
      if (single) {
        const user = setUser(val);
        onChange && onChange([user]);
      } else {
        const users = _.isArray(val)
          ? val.map((v) => {
              return setUser(v);
            })
          : [];
        onChange && onChange(users);
      }
    }
  };

  return (
    <UserAutoComplete
      isDisabled={isDisabled}
      placeholder={placeholder}
      single={single}
      value={items}
      onChange={(val: any) => onChangeUser(val)}
    />
  );
}

export default FromUserEdit;
