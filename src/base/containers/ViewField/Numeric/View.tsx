import React from 'react';
import { useTranslation } from 'react-i18next';

import { CommonViewProps } from '../Common/interface';
import Edit from './Edit';

interface ViewProps extends CommonViewProps {
  value: number | string;
  componentProps?: {
    [x: string]: any;
  };
}

const View = (props: ViewProps) => {
  const { value, componentProps } = props;

  const handleOnChange = (newValue: string | number) => {};

  return <Edit onChange={handleOnChange} value={value} componentProps={componentProps} />;
};

export default View;
