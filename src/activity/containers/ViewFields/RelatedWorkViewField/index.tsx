import React from 'react';

import { CommonViewFieldProps } from '@base/containers/ViewField/Common/interface';
import CommonViewField from '@base/containers/ViewField/Common';
import { UserOrCustomer } from '@activity/types/activity';

// import Edit from './Edit';
import View from './View';
import { RelatedValue } from '@base/components/@hanbiro/RelatedTo/interface';

interface FromUserProps extends CommonViewFieldProps {
  value: RelatedValue[];
}

const RelatedWork = (props: FromUserProps) => {
  return <CommonViewField {...props} componentView={View} componentEdit={<></>} />;
};

export default RelatedWork;
