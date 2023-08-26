import React from 'react';

import { CommonViewFieldProps } from '@base/containers/ViewField/Common/interface';
import CommonViewField from '@base/containers/ViewField/Common';
import { UserOrCustomer } from '@activity/types/activity';
import View from './View';
import Edit from './Edit';
import { IdName } from '@base/types/common';

interface FromUserProps extends CommonViewFieldProps {
  value: IdName;
}

const ChannelView = (props: FromUserProps) => {
  return <CommonViewField {...props} componentView={View} componentEdit={Edit} />;
};

export default ChannelView;
