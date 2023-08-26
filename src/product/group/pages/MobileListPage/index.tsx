import { useParams } from 'react-router-dom';

import ListPage from '@product/group/pages/ListPage';
import ItemView from '@product/item/pages/ViewPage';
import ProductView from '@product/product/pages/ViewPage';
import { MENU_PRODUCT } from '@base/config/menus';

function MobileListPage() {
  const params = useParams();
  const { type, id } = params;

  return (
    <>
      {type === 'type' || id === 'id' ? (
        <ListPage isSplitMode />
      ) : type === MENU_PRODUCT ? (
        <ProductView isSplitMode />
      ) : (
        <ItemView isSplitMode />
      )}
    </>
  );
}

export default MobileListPage;
