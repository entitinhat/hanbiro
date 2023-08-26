import React from 'react';
import classnames from 'classnames';
import DatePicker from '@base/components/@hanbiro/Date/DatePicker';

const Edit: React.FC = (props: any) => {
  const { value, errors, componentProps, onChange } = props;

  let initDate = new Date()
  initDate.setDate(initDate.getDate() + 1);

  return (
    <DatePicker {...componentProps} value={value} onChange={onChange} minDate={initDate}/>
  );
};

export default Edit;
