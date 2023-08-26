import { MENU_ITEM, MENU_PRODUCT, MENU_UNIT } from '@base/config/menus';

import Icon from '@base/assets/icons/svg-icons';

export const PRODUCT_ADD_OPTIONS: Record<string, any> = {
  [MENU_PRODUCT]: {
    name: 'ncrm_product_btn_create_product',
    icon: Icon('product')
  },
  [MENU_ITEM]: {
    name: 'ncrm_product_btn_create_item',
    icon: Icon('item')
  },
  [MENU_UNIT]: {
    name: 'ncrm_product_btn_create_unit',
    icon: Icon('unit')
  }
};
