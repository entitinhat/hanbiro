import { User } from '@base/types/iam';
import { DOMAIN } from '@vora-works/config/constants';
import { RegisterFreeLicenseRequest } from '@vora-works/types';

export const getParams = (formData: any, user?: User) => {
  let newParams: { input: RegisterFreeLicenseRequest };
  // const locale = formData.locale;
  console.log('formData::', formData);
  newParams = {
    input: {
      ...formData,
      domain: formData.domain + DOMAIN
    }
  };
  if (user) {
    newParams = {
      input: {
        ...formData,
        domain: formData.domain + DOMAIN,
        displayName: user.displayName,
        email: user.primaryEmail,
        phone: user.primaryPhone,
        urlName: user.urlName,
        fullName: user.fullName
      }
    };
  }
  return newParams;
};
