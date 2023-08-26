import React from 'react';
import { useParams } from 'react-router-dom';

import { MENU_PRODUCT } from '@base/config/menus';
import { EmptySplitView } from '@base/components/@hanbiro/SplitView';

import ItemView from '@product/item/pages/ViewPage';
import ProductView from '@product/product/pages/ViewPage';

interface ViewPageProps {
  isSplitMode: boolean;
}

const ViewPage = (props: ViewPageProps) => {
  const { isSplitMode } = props;

  const params = useParams();
  const { type, id } = params;

  return (
    <>
      {type === 'type' || id === 'id' ? <EmptySplitView /> : type === MENU_PRODUCT ? <ProductView isSplitMode /> : <ItemView isSplitMode />}
    </>
  );
};

export default ViewPage;
