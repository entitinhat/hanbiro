import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ListBody } from '@base/components/@hanbiro/List';
import ProductTree from '@product/group/containers/ProductTree';
import { NODE_TYPE_GROUP } from '@product/main/config/constants';

interface BodyProps {}

const Body = (props: BodyProps) => {
  const navigate = useNavigate();

  const handleOnSelect = (node: any) => {
    if (node && node?.nodeType != NODE_TYPE_GROUP) {
      return navigate(`/product/group/${node?.nodeType?.toLowerCase()}/${node?.id}`);
    }
  };

  return (
    <ListBody>
      <ProductTree onSelect={handleOnSelect} />
    </ListBody>
  );
};

export default Body;
