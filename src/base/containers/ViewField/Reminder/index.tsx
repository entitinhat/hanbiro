import React, { lazy, useEffect, useState } from 'react';
import CommonViewField from '../Common';
import { CommonViewFieldProps } from '../Common/interface';
import { ReminderState } from '@base/components/@hanbiro/Reminder';

import View from './View';
import Edit from './Edit';

interface ReminderProps extends CommonViewFieldProps {
  value: ReminderState;
}

const ReminderViewField = (props: ReminderProps) => {
  return <CommonViewField {...props} componentView={View} componentEdit={Edit} />;
};

export default ReminderViewField;
