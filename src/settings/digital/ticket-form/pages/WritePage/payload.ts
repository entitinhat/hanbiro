import * as keyNames from '@settings/digital/ticket-form/config/keyNames';

export const finalizeParams = (params: any) => {
  // console.log('params: ', params);

  let newParams: any = {
    ...params,
    [keyNames.KEY_TICKET_FORM_LANGUAGE]: params?.[keyNames.KEY_TICKET_FORM_LANGUAGE].value ?? params?.[keyNames.KEY_TICKET_FORM_LANGUAGE],
    [keyNames.KEY_TICKET_FORM_PRODUCTS]: params?.[keyNames.KEY_TICKET_FORM_PRODUCTS].map((_item: any) => ({
      id: _item.id,
      name: _item.name
    })),
    [keyNames.KEY_TICKET_FORM_LINK_TO_RESOURCE]: params[keyNames.KEY_TICKET_FORM_LINK_TO_RESOURCE]
      ? {
          id: params[keyNames.KEY_TICKET_FORM_LINK_TO_RESOURCE].id,
          name: params[keyNames.KEY_TICKET_FORM_LINK_TO_RESOURCE].name
        }
      : null
  };

  newParams[keyNames.KEY_TICKET_FORM_PRODUCTS];

  if ('type' in newParams) {
    delete newParams[keyNames.KEY_TICKET_FORM_TYPE];
  }

  return { ticketForm: newParams };
};
