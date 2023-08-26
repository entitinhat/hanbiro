import React, { lazy, useEffect, useState } from 'react';

import View from './View';
import Edit from './Edit';
import { CommonViewFieldProps } from '@base/containers/ViewField/Common/interface';
import CommonViewField from '@base/containers/ViewField/Common';


interface ContactMethodViewFieldProps extends CommonViewFieldProps {}

const ContactMethodViewField = (props: ContactMethodViewFieldProps) => {
  return <CommonViewField {...props} componentView={View} componentEdit={Edit} />;
};

export default ContactMethodViewField;
