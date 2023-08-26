import { isEmpty } from 'lodash';

export const finalizeParams = (formData: any) => {
  let newParams: any = {};
  let ar: any = {};

  const rulesEntry: any = formData;
  ar.name = formData.name;
  ar.description = formData?.description;
  ar.active = formData?.active;
  if (formData?.module !== '' && !isEmpty(formData?.module)) {
    ar.module = formData.module.value;
  }
  ar.rulesEntry = [rulesEntry.arEntry];
  newParams = {
    ar: ar
  };
  return newParams;
};
