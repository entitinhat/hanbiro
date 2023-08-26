import React, { lazy, useEffect, useState } from 'react';
import { CommonViewFieldProps } from '@base/containers/ViewField/Common/interface';
import CommonViewField from '@base/containers/ViewField/Common';

import View from './View';

interface ChannelsProps extends CommonViewFieldProps {}

const ChannelsViewField = (props: ChannelsProps) => {
  return <CommonViewField {...props} componentView={View} componentEdit={null} />;
};

export default ChannelsViewField;
