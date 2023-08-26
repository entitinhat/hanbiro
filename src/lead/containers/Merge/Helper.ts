import * as keyNames from '@customer/config/keyNames';

//generate email param
const parseEmailParam = (emails: any[]) => {
  return emails?.map((_ele: any) => ({
    id: _ele.id || '',
    label: _ele.label.label,
    labelValue: _ele.labelValue,
    email: _ele.email
  }));
};

//generate phone param
const parsePhoneParam = (phones: any[]) => {
  return phones?.map((_ele: any) => ({
    id: _ele.id || '',
    label: _ele.label.label,
    labelValue: _ele.labelValue,
    country: _ele.country,
    phoneNumber: _ele.phoneNumber,
    extension: _ele.extension
  }));
};

//generate address param
const parseAddressParam = (addresses: any[]) => {
  return addresses?.map((_ele: any) => ({
    id: _ele.id,
    country: _ele.country?.isoCode2,
    addrState: _ele.state,
    city: _ele.city,
    street: _ele.street,
    zipcode: _ele.zipcode
  }));
};

export const getParams = (mergeMaster: any, mergeItems: any[], isMergeAll: boolean) => {
  const params: any = {};
  //master params
  params[keyNames.KEY_NAME_CUSTOMER_ID] = mergeMaster[keyNames.KEY_NAME_CUSTOMER_ID];
  params[keyNames.KEY_NAME_CUSTOMER_EMAIL] = parseEmailParam(mergeMaster[keyNames.KEY_NAME_CUSTOMER_EMAIL]);
  params[keyNames.KEY_NAME_CUSTOMER_PHONES] = parsePhoneParam(mergeMaster[keyNames.KEY_NAME_CUSTOMER_PHONES]);
  if (mergeMaster[keyNames.KEY_NAME_CUSTOMER_BILL_ADDRESSES]?.length > 0) {
    params[keyNames.KEY_NAME_CUSTOMER_BILL_ADDRESSES] = parseAddressParam(mergeMaster[keyNames.KEY_NAME_CUSTOMER_BILL_ADDRESSES]);
  }
  if (mergeMaster[keyNames.KEY_NAME_CUSTOMER_SHIP_ADDRESSES]?.length > 0) {
    params[keyNames.KEY_NAME_CUSTOMER_SHIP_ADDRESSES] = parseAddressParam(mergeMaster[keyNames.KEY_NAME_CUSTOMER_SHIP_ADDRESSES]);
  }
  //other merged items
  params.mergedFromIds = [];
  mergeItems.map((_mItem: any) => {
    if (_mItem.id !== mergeMaster.id) {
      params.mergedFromIds.push(_mItem.id);
      if (isMergeAll || _mItem?.mergeFields?.includes(keyNames.KEY_NAME_CUSTOMER_EMAIL)) {
        //params[KEY_NAME_CUSTOMER_EMAIL] = params[KEY_NAME_CUSTOMER_EMAIL].concat(parseEmailParam(_mItem[KEY_NAME_CUSTOMER_EMAIL]));
        const newItemEmails = parseEmailParam(_mItem[keyNames.KEY_NAME_CUSTOMER_EMAIL]);
        newItemEmails?.map((_ele: any) => {
          const isExisted = params[keyNames.KEY_NAME_CUSTOMER_EMAIL].findIndex((_email: any) => _email.email === _ele.email);
          if (isExisted === -1) {
            params[keyNames.KEY_NAME_CUSTOMER_EMAIL].push(_ele);
          }
        });
      }
      if (isMergeAll || _mItem?.mergeFields?.includes(keyNames.KEY_NAME_CUSTOMER_PHONES)) {
        //params[KEY_NAME_CUSTOMER_PHONES] = params[KEY_NAME_CUSTOMER_PHONES].concat(parsePhoneParam(_mItem[KEY_NAME_CUSTOMER_PHONES]));
        const newItemPhones = parsePhoneParam(_mItem[keyNames.KEY_NAME_CUSTOMER_PHONES]);
        newItemPhones?.map((_ele: any) => {
          const isExisted = params[keyNames.KEY_NAME_CUSTOMER_PHONES].findIndex((_phone: any) => _phone.phoneNumber === _ele.phoneNumber);
          if (isExisted === -1) {
            params[keyNames.KEY_NAME_CUSTOMER_PHONES].push(_ele);
          }
        });
      }
      if (isMergeAll || _mItem?.mergeFields?.includes(keyNames.KEY_NAME_CUSTOMER_ADDRESSES)) {
        if (_mItem[keyNames.KEY_NAME_CUSTOMER_BILL_ADDRESSES]?.length > 0) {
          params[keyNames.KEY_NAME_CUSTOMER_BILL_ADDRESSES] = params[keyNames.KEY_NAME_CUSTOMER_BILL_ADDRESSES].concat(
            parseAddressParam(_mItem[keyNames.KEY_NAME_CUSTOMER_BILL_ADDRESSES])
          );
        }
        if (_mItem[keyNames.KEY_NAME_CUSTOMER_SHIP_ADDRESSES]?.length > 0) {
          params[keyNames.KEY_NAME_CUSTOMER_SHIP_ADDRESSES] = params[keyNames.KEY_NAME_CUSTOMER_SHIP_ADDRESSES].concat(
            parseAddressParam(_mItem[keyNames.KEY_NAME_CUSTOMER_SHIP_ADDRESSES])
          );
        }
      }
    }
  });

  return params;
};
