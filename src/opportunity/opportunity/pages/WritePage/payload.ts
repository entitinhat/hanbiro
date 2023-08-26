//third-party
import _, { isFunction } from 'lodash';

//customer menu
import * as accountConfig from '@customer/config/write-field/account';
import * as contactConfig from '@customer/config/write-field/contact';
import * as customerKeyNames from '@customer/config/keyNames';
import { CUSTOMER_CATEGORY_ACCOUNT, CUSTOMER_CATEGORY_ENUM } from '@customer/config/constants';

//menu
import * as keyNames from '@opportunity/config/keyNames';
import { OPPORTUNITY_TYPE_NEW_CUSTOMER } from '@opportunity/config/constants';

export const finalizeParams = (configParams: any) => {
  const newParams = { ...configParams };

  //custom customer field - new or existing
  const typeValue = _.cloneDeep(newParams[keyNames.KEY_NAME_OPPORTUNITY_TYPE]);
  if (typeValue.type !== OPPORTUNITY_TYPE_NEW_CUSTOMER) {
    newParams[keyNames.KEY_NAME_OPPORTUNITY_CUSTOMER] = {
      id: newParams[keyNames.KEY_NAME_OPPORTUNITY_CUSTOMER].id,
      name: newParams[keyNames.KEY_NAME_OPPORTUNITY_CUSTOMER].name
    };
  } else {
    const customerValue = _.cloneDeep(newParams[keyNames.KEY_NAME_OPPORTUNITY_CUSTOMER]);
    const customerParams: any = {};
    const category = typeValue.customerType;
    const customerConfig: any = category === CUSTOMER_CATEGORY_ACCOUNT ? accountConfig.default : contactConfig.default;
    Object.keys(customerValue).map((_key: string) => {
      if (isFunction(customerConfig[_key]?.parseParam)) {
        customerParams[_key] = customerConfig[_key].parseParam(customerValue[_key]);
      }
    });
    //set new customer param
    customerParams[customerKeyNames.KEY_NAME_CUSTOMER_CATEGORY] = CUSTOMER_CATEGORY_ENUM[category];
    newParams[keyNames.KEY_NAME_OPPORTUNITY_CUSTOMER] = customerParams;
  }
  //set opportunity type string
  newParams[keyNames.KEY_NAME_OPPORTUNITY_TYPE] = typeValue.type;

  //sales rep
  const salesRepValue = _.cloneDeep(newParams[keyNames.KEY_NAME_OPPORTUNITY_SALES_REP]);
  if (salesRepValue) {
    newParams[keyNames.KEY_NAME_OPPORTUNITY_SALES_REP_TYPE] = salesRepValue[keyNames.KEY_NAME_OPPORTUNITY_SALES_REP_TYPE];
    newParams[keyNames.KEY_NAME_OPPORTUNITY_SALES_REP] =
      salesRepValue.value?.length > 0 ? salesRepValue.value.map((_ele: any) => ({ id: _ele.id, name: _ele.name })) : [];
  }

  //remove fields
  //delete newParams[keyNames.KEY_NAME_QUOTE_];

  return newParams;
};
