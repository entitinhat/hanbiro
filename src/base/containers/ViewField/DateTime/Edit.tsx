import React from 'react';
import DatePicker from '@base/components/@hanbiro/Date/DatePicker';
import { CommonEditProps } from '../Common/interface';

interface EditProps extends CommonEditProps {
  value: string;
  onChange: (date: Date | null) => void;
  componentProps?: {
    [x: string]: any;
  };
}

const Edit = (props: EditProps) => {
  const { value, onChange, componentProps } = props;
  const dateFormat = componentProps?.dateFormat ?? 'MM/DD/YYYY';

  const handleOnChange = (newDate: Date | null) => {
    onChange && onChange(newDate);
  };

  return <DatePicker value={value ? new Date(value) : null} onChange={handleOnChange} inputFormat={dateFormat} />;
};

export default Edit;
