import { ProductItem } from '@product/item/types/item';
import * as keyNames from '@product/item/config/keyNames';
import { UnitValue } from '@product/unit/types/unit';
import {
  INVENTORY_TYPE_INVENTORY,
  PRODUCT_ITEM_TYPE_ENUM_COMPOSITE,
  PRODUCT_ITEM_TYPE_ENUM_PREPAID,
  PRODUCT_TYPE_PRODUCED,
  PRODUCT_TYPE_PURCHASE
} from '@product/main/config/constants';
import { IdName } from '@base/types/common';
import _ from 'lodash';
import {
  generateCode,
  SKU_GENERATOR_OPTION_ATTRIBUTES,
  SKU_GENERATOR_OPTION_ATTRIBUTE_1,
  SKU_GENERATOR_OPTION_ATTRIBUTE_2,
  SKU_GENERATOR_OPTION_CUSTOM,
  SKU_GENERATOR_OPTION_ITEM_INVENTORY_TYPE,
  SKU_GENERATOR_OPTION_ITEM_NAME,
  SKU_GENERATOR_OPTION_ITEM_SUPPLY_METHOD_TYPE,
  SKU_GENERATOR_OPTION_ITEM_TYPE,
  SKU_GENERATOR_OPTION_PRODUCT_GROUP,
  SKU_GENERATOR_OPTION_PRODUCT_NAME,
  SKU_GENERATOR_OPTION_UNIT_NAME
} from '@product/item/config/sku';

export const finalizeParams = (formData: any) => {
  const newParams = [
    ...formData?.items?.map((item: ProductItem) => {
      return {
        ...item,
        [keyNames.KEY_ITEM_SKU]: item.sku ? item.sku : null,
        [keyNames.KEY_ITEM_PRODUCT]: { id: formData?.prod?.id, name: formData?.prod?.name },
        [keyNames.KEY_ITEM_ACTIVE]: true,
        [keyNames.KEY_ITEM_DESCRIPTION]: formData?.description,
        [keyNames.KEY_ITEM_INVENTORY_TYPE]: formData?.inventoryType?.value,
        [keyNames.KEY_ITEM_TYPE]: formData?.itemType?.value,
        [keyNames.KEY_ITEM_UNIT]: { id: formData?.unit?.id, name: formData?.unit?.name },
        [keyNames.KEY_ITEM_ATTR_VALUES]: item.attrValues ? (_.isArray(item.attrValues) ? item.attrValues : [item.attrValues]) : null,
        [keyNames.KEY_ITEM_BASE_PRICE]: item.basePrice ? item.basePrice : null,
        [keyNames.KEY_ITEM_COST_PRICE]: item.costPrice ? item.costPrice : null,
        [keyNames.KEY_ITEM_PURCHASE_PRICE]: item.purchasePrice ? item.purchasePrice : null,
        [keyNames.KEY_ITEM_ASSOCIATED_ITEMS]:
          formData[keyNames.KEY_ITEM_TYPE]?.value === PRODUCT_ITEM_TYPE_ENUM_COMPOSITE
            ? formData[keyNames.KEY_ITEM_ASSOCIATED_ITEMS].map((_ele: any) => ({
                item: { id: _ele.item.id, name: _ele.item.name },
                qty: parseInt(_ele.contained_qty)
              }))
            : null
      };
    })
  ];

  return newParams;
};

const cartesian = (...a: any[]) => a.reduce((a, b) => a.flatMap((d: any) => b.map((e: any) => [d, e].flat())));

export const generateProductItems = (
  unitValues: UnitValue[],
  attributes: any[],
  prodData: any,
  itemType: string,
  inventoryType: string,
  defaultCurrency: string,
  skuValue: any
) => {
  let itemArr: ProductItem[] = [];

  if (unitValues?.length === 0) return itemArr;

  let newOptionValues: any = [];
  if (attributes.length !== 0) {
    const arrAttrs: any = [];
    attributes.length > 0 &&
      attributes.forEach((_x: any) => {
        arrAttrs.push(_x.values?.map((_v: any) => ({ id: _v.id, name: _v.name })));
      });
    newOptionValues = arrAttrs.length > 0 ? cartesian(...arrAttrs) : [];
  }

  unitValues.forEach((unitValue: UnitValue) => {
    const tempLine: ProductItem = {
      [keyNames.KEY_ITEM_NAME]: '',
      [keyNames.KEY_ITEM_CODE]: '',
      [keyNames.KEY_ITEM_ACTIVE]: true,
      [keyNames.KEY_ITEM_UNIT]: unitValue.unit,
      [keyNames.KEY_ITEM_UNIT_VALUE]: { id: unitValue.id, name: unitValue.name }
      // [keyNames.KEY_ITEM_SKU]: [],
      // [keyNames.KEY_ITEM_OPEN_STOCK]: 0,
      // [keyNames.KEY_ITEM_REPLENISHMENT_POINT]: 0
    };

    // Base prices
    if (prodData.canBeSold && itemType != PRODUCT_ITEM_TYPE_ENUM_PREPAID) {
      tempLine[keyNames.KEY_ITEM_BASE_PRICE] = {
        amount: 0,
        currency: defaultCurrency
      };
    }

    // Cost prices
    if ((prodData?.canBeSold || prodData?.type === PRODUCT_TYPE_PRODUCED) && itemType != PRODUCT_ITEM_TYPE_ENUM_PREPAID) {
      tempLine[keyNames.KEY_ITEM_COST_PRICE] = {
        amount: 0,
        currency: defaultCurrency
      };
    }

    // Purchase prices
    if (!prodData?.canBeSold && prodData?.type === PRODUCT_TYPE_PURCHASE) {
      tempLine[keyNames.KEY_ITEM_PURCHASE_PRICE] = {
        amount: 0,
        currency: defaultCurrency
      };
    }

    if (newOptionValues.length > 0) {
      newOptionValues.map((optValue: any) => {
        let optionName = Array.isArray(optValue) ? optValue.map((ov) => ov.name).join('/') : optValue.name;
        let itemName = [prodData.name, unitValue.name, optionName].join(' ');
        const newLine = {
          ...tempLine,
          [keyNames.KEY_ITEM_NAME]: itemName,
          [keyNames.KEY_ITEM_ATTR_VALUES]: optValue
        };
        itemArr.push(newLine);
      });
    } else {
      itemArr.push({
        ...tempLine,
        [keyNames.KEY_ITEM_NAME]: unitValue.name
        // [keyNames.KEY_ITEM_ATTR_VALUES]: undefined
      });
    }
  });

  if (inventoryType == INVENTORY_TYPE_INVENTORY && skuValue.generator == 'auto') {
    itemArr = itemArr.map((item) => {
      let configData = {
        [SKU_GENERATOR_OPTION_PRODUCT_GROUP]: prodData.group.name,
        [SKU_GENERATOR_OPTION_PRODUCT_NAME]: prodData.name,
        [SKU_GENERATOR_OPTION_ITEM_NAME]: item.name,
        [SKU_GENERATOR_OPTION_UNIT_NAME]: item.unit.name,
        [SKU_GENERATOR_OPTION_ITEM_INVENTORY_TYPE]: inventoryType,
        [SKU_GENERATOR_OPTION_ITEM_TYPE]: itemType,
        [SKU_GENERATOR_OPTION_ATTRIBUTES]: _.isArray(item.attrValues) ? item.attrValues : [item.attrValues],
        [SKU_GENERATOR_OPTION_ITEM_SUPPLY_METHOD_TYPE]: prodData.type,
        [SKU_GENERATOR_OPTION_CUSTOM]: 'CUSTOMDESK'
      };

      const sku = generateCode({ valueRows: skuValue.valueRows, seperator: skuValue.seperator, caseUse: skuValue.caseUse }, configData);
      return {
        ...item,
        sku
      };
    });
  }
  //===========================================DEBUG=======================================================================
  // console.log('SKU debug inventoryType', inventoryType);
  // console.log('SKU debug skuValue', skuValue);
  // console.log('SKU debug prodData', prodData);
  // console.log('SKU debug item', itemArr);
  //=========================================================================================================================

  return itemArr;
};
