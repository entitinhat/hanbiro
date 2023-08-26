export const POSITION_FIRST = 'first';
export const POSITION_LAST = 'last';
export const GENERATOR_AUTO = 'auto';
export const GENERATOR_MANUAL = 'manual';
export const SEPERATOR_HYPHEN = 'hyphen';
export const SEPERATOR_SLASH = 'slash';
export const CASE_UPPER = 'upper';
export const CASE_LOWER = 'lower';
export const SKU_GENERATOR_OPTION_PRODUCT_GROUP = 'productGroup';
export const SKU_GENERATOR_OPTION_PRODUCT_NAME = 'productName';
export const SKU_GENERATOR_OPTION_ITEM_NAME = 'itemName';
export const SKU_GENERATOR_OPTION_ITEM_INVENTORY_TYPE = 'itemInventoryType';
export const SKU_GENERATOR_OPTION_ITEM_TYPE = 'itemType';
export const SKU_GENERATOR_OPTION_ITEM_SUPPLY_METHOD_TYPE = 'itemSupplyMethodType';
export const SKU_GENERATOR_OPTION_UNIT_NAME = 'unitValName';
export const SKU_GENERATOR_OPTION_ATTRIBUTE_1 = 'attribute_1';
export const SKU_GENERATOR_OPTION_ATTRIBUTES = 'attributes';
export const SKU_GENERATOR_OPTION_ATTRIBUTE_2 = 'attribute_2';
export const SKU_GENERATOR_OPTION_WAREHOUSE = 'warehouse';
export const BATCH_GENERATOR_OPTION_MANUFACTURER_DATE = 'manufacturer_date';
export const BATCH_GENERATOR_OPTION_EXPIRATION_DATE = 'expiration_date';
export const SKU_GENERATOR_OPTION_CUSTOM = 'custom';

export const SHOW_OPTIONS = [
  { value: POSITION_FIRST, label: 'ncrm_common_sku_position_first' },
  { value: POSITION_LAST, label: 'ncrm_common_sku_position_last' }
];
export const SKU_VALUE_OPTIONS = [
  { value: SKU_GENERATOR_OPTION_PRODUCT_GROUP, label: 'ncrm_common_product_group' },
  // { value: SKU_GENERATOR_OPTION_ITEM_INVENTORY_TYPE, label: 'ncrm_common_item_inventory_type' },
  // { value: SKU_GENERATOR_OPTION_ITEM_TYPE, label: 'ncrm_common_item_type' },
  // { value: SKU_GENERATOR_OPTION_ITEM_SUPPLY_METHOD_TYPE, label: 'ncrm_common_item_supply_method_type' },
  { value: SKU_GENERATOR_OPTION_PRODUCT_NAME, label: 'ncrm_common_product_name' },
  { value: SKU_GENERATOR_OPTION_ITEM_NAME, label: 'ncrm_common_item_name' },
  { value: SKU_GENERATOR_OPTION_UNIT_NAME, label: 'ncrm_common_unit_name' },
  { value: SKU_GENERATOR_OPTION_ATTRIBUTE_1, label: 'ncrm_common_attribute_1' },
  { value: SKU_GENERATOR_OPTION_ATTRIBUTE_2, label: 'ncrm_common_attribute_2' },
  { value: SKU_GENERATOR_OPTION_CUSTOM, label: 'ncrm_common_custom_text' }
];
export const BATCH_VALUE_OPTIONS = [
  { value: SKU_GENERATOR_OPTION_PRODUCT_GROUP, label: 'Product Group' },
  { value: SKU_GENERATOR_OPTION_PRODUCT_NAME, label: 'Product Name' },
  { value: SKU_GENERATOR_OPTION_ITEM_NAME, label: 'Item Name' },
  { value: BATCH_GENERATOR_OPTION_MANUFACTURER_DATE, label: 'Manufacturer Date' },
  { value: BATCH_GENERATOR_OPTION_EXPIRATION_DATE, label: 'Expiration Date' },
  { value: SKU_GENERATOR_OPTION_CUSTOM, label: 'Custom Text' }
];

//generate code (sku, batch number)
//setting = { valueRows, seperator, caseUse },
//data = {product_group: 'test', ...}
export const generateCode = (setting: any, data: any) => {
  let newCode = '';
  if (data) {
    if (setting?.valueRows) {
      let newCodes: string[] = [];
      setting.valueRows.map((item: any) => {
        if (item?.attribute?.value) {
          // attribute name
          // get data of option value
          let attributeValue = '';
          if (item.attribute.value === SKU_GENERATOR_OPTION_CUSTOM) {
            attributeValue = item.customValue || '';
          } else {
            let tmpValue = data[item.attribute.value]?.replace(/\s/g, '');
            if (item?.attribute?.value === SKU_GENERATOR_OPTION_ATTRIBUTE_1) {
              tmpValue = (data?.attributes?.[0]?.name || data?.[SKU_GENERATOR_OPTION_ATTRIBUTE_1]) ?? '';
            } else if (item?.attribute?.value === SKU_GENERATOR_OPTION_ATTRIBUTE_2) {
              tmpValue = (data?.attributes?.[1]?.name || data?.[SKU_GENERATOR_OPTION_ATTRIBUTE_2]) ?? '';
            }

            if (item.show?.value === POSITION_FIRST) {
              //get number of first letters
              attributeValue = tmpValue ? tmpValue.substr(0, item.lettersNr) : '';
            }
            if (item.show?.value === POSITION_LAST) {
              //get number of last letters
              attributeValue = tmpValue ? tmpValue.slice(tmpValue.length - item.lettersNr) : '';
            }

            if (attributeValue != '') {
              newCodes.push(setting.caseUse === CASE_UPPER ? attributeValue.toUpperCase() : attributeValue.toLowerCase());
            }
          }
        }
      });
      newCode = newCodes.join(setting.seperator === SEPERATOR_SLASH ? '/' : '-');
    }
  }
  return newCode;
};

export const validateSKU = (sku: string, values: string[]): string => {
  let newSku = sku;
  const countSku = values?.filter((item: string) => item?.includes(sku))?.length;
  if (countSku > 0) {
    newSku = `${newSku}(${countSku})`;
  }
  return newSku;
};
