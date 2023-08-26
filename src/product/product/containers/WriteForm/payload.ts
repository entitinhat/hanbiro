import * as keyNames from '@product/product/config/keyNames';
import { finalizeParams as itemFinalzeParams } from '@product/item/containers/WriteForm/payload';

export const finalizeParams = (configParams: any = {}) => {
  const newParams = { ...configParams };

  newParams[keyNames.KEY_PRODUCT_USE_ATTR] = configParams[keyNames.KEY_PRODUCT_ATTRIBUTE]?.[keyNames.KEY_PRODUCT_USE_ATTR];
  newParams[keyNames.KEY_PRODUCT_ATTRIBUTE] = configParams[keyNames.KEY_PRODUCT_ATTRIBUTE]?.[keyNames.KEY_PRODUCT_ATTRIBUTE]?.map(
    (item: any) => ({ id: item.id, name: item.name })
  );

  // create with items
  if (configParams?.items) {
    //const items: any = itemFinalzeParams(configParams?.items);
    const items: any = configParams?.items;
    newParams.items = items?.map((item: any) => ({ ...item, prod: { name: item.prod.name } }));
  }

  return newParams;
};
