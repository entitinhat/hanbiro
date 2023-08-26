import * as keyNames from '@desk/ticket/config/keyNames';

export const finalizeParams = (formData: any, customerData: any) => {
  let newParams: any = {
    code: formData[keyNames.KEY_TICKET_CODE],
    [keyNames.KEY_TICKET_SUBJECT]: formData[keyNames.KEY_TICKET_SUBJECT],
    [keyNames.KEY_TICKET_CONTENT]: formData[keyNames.KEY_TICKET_CONTENT]
  };
  if (formData[keyNames.KEY_TICKET_CATEGORY]?.product) {
    newParams[keyNames.KEY_TICKET_PRODUCT] = {
      id: formData[keyNames.KEY_TICKET_CATEGORY]?.product.id,
      name: formData[keyNames.KEY_TICKET_CATEGORY]?.product.name
    };
  }
  if (formData[keyNames.KEY_TICKET_CATEGORY]?.category) {
    newParams[keyNames.KEY_TICKET_CATEGORY] = {
      id: formData[keyNames.KEY_TICKET_CATEGORY]?.category.id,
      name: formData[keyNames.KEY_TICKET_CATEGORY]?.category.name
    };
    //set priority
    const categoryValue = formData[keyNames.KEY_TICKET_CATEGORY]?.category;
    if (categoryValue?.rules?.length > 0) {
      const curRule = categoryValue?.rules?.length > 0 ? categoryValue.rules[0] : null;
      newParams[keyNames.KEY_TICKET_PRIORITY] = curRule.priority.keyName;
    }
  }
  if (customerData.customer) {
    newParams[keyNames.KEY_TICKET_CUSTOMER] = {
      id: customerData.customer.id,
      name: customerData.customer.name
    };
  }
  if (customerData.contact) {
    newParams[keyNames.KEY_TICKET_CONTACT] = {
      id: customerData.contact.id,
      name: customerData.contact.name
    };
  }

  return newParams;
};
