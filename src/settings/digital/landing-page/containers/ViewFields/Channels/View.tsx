import React, { useEffect, useState } from 'react';

import { CommonViewProps } from '@base/containers/ViewField/Common/interface';
import ListTableCellDroplist from '@base/components/@hanbiro/List/ListTableCellDropList';

interface Props extends CommonViewProps {
  value: any;
}

const View = (props: Props) => {
  const { value } = props;

  const items = value?.channels ? value?.channels?.map((channel: any) => channel) : [];
  return <ListTableCellDroplist showAvatar={false} values={items} />;
};

export default View;
