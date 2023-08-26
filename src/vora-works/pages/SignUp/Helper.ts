import { ProductPlans } from '@vora-works/config/constants';
import * as keyNames from '@vora-works/config/keyNames';
import _ from 'lodash';
interface FormUrl {
  isAllowed: boolean;

  [x: string]: any;
}
export const isAllowed = (value?: string[], rules?: string[]) => {
  if (value) {
    if (_.intersection(value, rules).length === value?.length) {
      return true;
    }
  }

  return false;
};

export const validateSignUpURl = (parameters: URLSearchParams) => {
  const productUrl = parameters.get(keyNames.URL_PRODUCTS);
  const languageUrl = parameters.get(keyNames.URL_LANGUAGE);
  const editionUrl = parameters.get(keyNames.URL_EDITION);
  const productArray = productUrl?.split(' ');
  const productRules = ProductPlans.map((plan) => plan.menu);
  let formUrl: FormUrl = { isAllowed: false };
  if (isAllowed(productArray, productRules)) {
    formUrl = { ...formUrl, isAllowed: true, productUrl: productUrl };
  } else {
    formUrl = { ...formUrl, isAllowed: false, productUrl: productUrl };
  }
  formUrl = { ...formUrl, languageUrl: languageUrl, editionUrl: editionUrl };
  return formUrl;
};
