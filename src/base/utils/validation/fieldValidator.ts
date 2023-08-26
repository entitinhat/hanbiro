import _, { values } from 'lodash';
import validator from 'validator';
import dayjs from 'dayjs';
import { BaseUnit } from '@product/unit/types/unit';
import { t } from 'i18next';
import { TOOLTIP_FOR_URL_NAME, TOOLTIP_FOR_YOUR_SITE } from '@vora-works/config/constants';
import { KEY_ITEM_BASE_PRICE, KEY_ITEM_COST_PRICE, KEY_ITEM_PURCHASE_PRICE } from '@product/item/config/keyNames';

const isRequired = (value: any): boolean => {
  try {
    if (Array.isArray(value)) {
      return value.length > 0;
    } else if (typeof value == 'object') {
      return Object?.keys(value)?.length > 0;
    } else {
      return Boolean(value);
    }
  } catch (error) {
    return false;
  }
};

//custom validation
export default {
  required: (value: string) => isRequired(value), //|| 'language_key_required'
  maxLength: (value: string, length = 0) => String(value).length <= length || `language_key_max_length_${length}`,
  min: (value: string, min = 0) => parseFloat(value) >= min || `language_key_min_${min}`,
  date: (value: Date | string) => dayjs(value).isValid() || 'Date invalid',
  email: (value: string) => validator.isEmail(value) || 'Email invalid',
  emails: (value: any[]) => {
    if (Array.isArray(value)) {
      const result = value.some((_item) => !validator.isEmail(_item.email));
      if (result) {
        return 'Email invalid';
      }
      return true;
    }
    return 'Email invalid';
  },
  phone: (value: string) => validator.isMobilePhone(value) || 'Phone Number invalid',
  website: (value: string) => validator.isURL(value) || 'language_key_incorrect_url',
  protocol: (value: string) => isRequired(value) || 'protocol_require',
  ip: (value: string) => validator.isIP(value) || 'ip_incorrect',
  isIntMaxLength: (value: string | number, maxValue = 10) =>
    validator.isInt(String(value), { min: 1, max: maxValue }) || `Number max length is ${maxValue}`,
  isInt: (value: string | number) => validator.isInt(String(value)) || 'Please input number integer',
  //for product item validate
  attribute: (value: any) => {
    let isValid: boolean = true;
    if (value.useAttr) {
      if (value.attributes?.length === 0) {
        isValid = false;
      }
    }
    return isValid || 'language_key_required';
  },
  item: (value: any) => {
    let isValid: boolean = true;
    return isValid || 'language_key_required';
  },
  ctaLink: (value: any) => validator.isURL(value?.link),
  itemAttribute: (value: any) => {
    let isValid: boolean = true;
    let isValidUnique: boolean = true;
    let isValidRequired: boolean = true;

    // const newArr = value.map(function (item: any) {
    //   if (item?.values <= 0) {
    //     isValidRequired = false;
    //   }
    //   return item.id;
    // });
    // isValidUnique = !newArr.some(function (item: any, idx: number) {
    //   return newArr.indexOf(item) != idx;
    // });
    // isValid = isValidUnique && isValidRequired ? true : false;
    return isValid || t('language_key_unique_or_language_key_required');
  },
  itemUnit: (value: BaseUnit) => {
    let isValid: boolean = true;
    isValid = (value?.unitValues?.length as number) > 0 ? true : false;
    return isValid || t('language_key_required');
  },
  isSpecialCharacter: (value: string) => {
    let regex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return !regex.test(value) || t('Having Special Character');
  },
  isValidUrl: (value: string) => {
    let regex = /\s/;
    return !regex.test(value) || t(TOOLTIP_FOR_URL_NAME);
  },
  isValidDomain: (isValid: boolean, value: string) => {
    // console.log("isValidDomain", value, isValid);
    let regex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const isSpecialCharacter = regex.test(value);
    return (isValid && !isSpecialCharacter) || t(TOOLTIP_FOR_YOUR_SITE);
  },
  productItem: (fieldValidates: string[], items: any) => {
    let isValid = true;
    console.log('items validate', items);
    items.every((_i: any) => {
      fieldValidates.every((key: string) => {
        if (_.has(_i, key) && !isRequired(_i[key])) {
          isValid = false;
          return false;
        }
        if (key === KEY_ITEM_BASE_PRICE) {
          if (_.has(_i, key) && !isRequired(_i[key].amount)) {
            isValid = false;
            return false;
          }
        }
        if (key === KEY_ITEM_COST_PRICE) {
          if (_.has(_i, key) && !isRequired(_i[key].amount)) {
            isValid = false;
            return false;
          }
        }
        if (key === KEY_ITEM_PURCHASE_PRICE) {
          if (_.has(_i, key) && !isRequired(_i[key].amount)) {
            isValid = false;
            return false;
          }
        }

        return true;
      });
      if (!isValid) return false;
      return true;
    });
    // console.log('product Item value validation', items);
    // console.log('product Item value fieldValidates', fieldValidates);
    // console.log('product Item value isValid', isValid);
    return isValid;
  }
};
