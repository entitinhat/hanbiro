import { CommonViewFieldProps } from '@base/containers/ViewField/Common/interface';
import { User } from '@base/types/user';
import UserAutoComplete from '@sign-in/containers/UserAutoComplete';
import { isArray } from 'lodash';
import React from 'react';

interface EditProps extends CommonViewFieldProps {
  value: User[];
  onChange?: (nVal: User[] | null) => void;
  componentProps?: {
    [x: string]: any;
  };
}
const Edit: React.FC<EditProps> = (props: EditProps) => {
  const { value = [], onChange, componentProps } = props;

  const handleChange = (nVal: User | User[] | null) => {
    const nValue = nVal ? (isArray(nVal) ? nVal : [nVal]) : [];
    onChange && onChange(nValue);
  };
  return <UserAutoComplete {...componentProps} value={value} onChange={handleChange} />;
};

export default Edit;
