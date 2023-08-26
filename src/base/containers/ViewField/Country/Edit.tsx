import React from 'react';

import { CommonEditProps } from '../Common/interface';
import CountrySelect from '@base/components/@hanbiro/CountrySelect';
import { Country } from '@base/types/setting';

interface EditProps extends CommonEditProps {
  value: Country;
  onChange: (params?: Country) => void;
}

const Edit = (props: EditProps) => {
  const { value, onChange } = props;

  return <CountrySelect value={value} onChange={onChange} />;
};

export default Edit;
