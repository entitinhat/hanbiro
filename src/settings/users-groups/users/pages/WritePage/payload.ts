import {   CreateUserRequest, Email, Phone } from '@settings/users-groups/users/types';
import { isEmpty } from 'lodash';

export const getParams = (formData: any, orgId: string) => {
  let newParams: { input: CreateUserRequest };
  // const locale = formData.locale;

  // console.log('formData::', formData);
  newParams = {
    input: {
      ...formData,
      emails: formData.emails.map((email: Email) => email.address),
      phones: formData.phones.map((phone: Phone) => phone.number),
      orgId: orgId
      // locale:locale
    }
  };
  return newParams;
};
