import _ from 'lodash';
import { useMemo } from 'react';

import { AssignToName } from '@base/types/user';
import UserAutoComplete from '@sign-in/containers/UserAutoComplete';

interface UserEditProps {
  value: AssignToName[];
  onChange: (val: AssignToName[]) => void;
  componentProps?: {
    [x: string]: any;
  };
}

function UserEdit(props: UserEditProps) {
  const { value, onChange, componentProps } = props;

  console.log('user viewfield props', props);
  const items = useMemo(() => {
    return componentProps?.single
      ? value.length > 0
        ? { name: value[0]?.user?.name, id: value[0]?.user?.id }
        : null
      : value?.map((v) => ({ name: v.user?.name, id: v.user?.id }));
  }, [value]);

  const setUser = (item: any) => {
    let user: AssignToName = {
      user: {
        id: item.id,
        name: item.name
      },
      // group: item.properties?.crmBaseGroup
      group: {
        id: '',
        name: ''
      }
    };
    return user;
  };

  const onChangeUser = (val: any | any[]) => {
    if (_.isEmpty(val)) {
      if (componentProps?.single) {
        onChange && onChange([]);
      }
    } else {
      if (componentProps?.single) {
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
      single={componentProps?.single ? componentProps?.single : false}
      value={items}
      onChange={(val: any) => onChangeUser(val)}
    />
  );
}

export default UserEdit;
