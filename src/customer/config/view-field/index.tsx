//third-party
import { t } from 'i18next';

//project
import * as baseComponents from '@base/config/view-field/components';
import validators from '@base/utils/validation/fieldValidator'; //all validate functions
import { LABEL_VALUE_BIRTHDAY, LABEL_VALUE_CUSTOM_WEB, LABEL_VALUE_OTHER } from '@base/config/constant';
import { FieldConfig } from '@base/types/pagelayout';

//menu
import * as keyNames from '@customer/config/keyNames';
import { CUSTOMER_GENDER_OPTIONS, SEND_MODE_OPTIONS } from '@customer/config/constants';
import * as components from '@customer/config/view-field/components';
import { Product } from '@product/product/types/product';

const viewConfig: FieldConfig = {
  // ================================ SUMMARY FIELDS ====================================
  [keyNames.KEY_NAME_CUSTOMER_NAME]: {
    //component: commonComponents.TextView,
    schema: 'name'
    // getRecoilStateValue: (value: any) => {
    //   return value || '';
    // }
  },
  [keyNames.KEY_NAME_CUSTOMER_CODE]: {
    //component: commonComponents.TextView,
    schema: 'code'
  },
  [keyNames.KEY_NAME_CUSTOMER_EMAIL]: {
    component: baseComponents.EmailInputView,
    componentProps: {
      isMultiple: true
    },
    schema: `emails {
      id
      label
      labelValue
      email
    }`,
    validate: {
      emails: validators.emails //'emails' --> error key
    },
    getValueView: (value: any) => {
      return value;
    },
    getValueEdit: (value: any) => {
      return Array.isArray(value) ? value?.map((v: any) => ({ ...v, label: { label: v.label } })) : value;
    },
    getMutationValue: (value: any) => {
      const newValue = value?.map((_ele: any, _index: number) => ({
        id: _ele?.id || '',
        label: _ele.label?.label || LABEL_VALUE_OTHER,
        labelValue: _ele.labelValue,
        email: _ele.email
        //primary: _ele.primary
      }));
      return { [keyNames.KEY_NAME_CUSTOMER_EMAIL]: newValue };
    }
    // getRecoilStateValue: (value: any) => {
    //   return value || null;
    // }
  },
  [keyNames.KEY_NAME_CUSTOMER_PHONES]: {
    component: baseComponents.PhoneInputView,
    languageKey: 'Phone',
    componentProps: {
      isMultiple: true
    },
    schema: `phones {
      id
      label
      labelValue
      country
      fCountry {
        country
        isoCode2
        isoCode3
        phoneCode
        region
      }
      phoneNumber
    }`,
    validate: {
      required: (v: any) => {
        if (!Array.isArray(v)) {
          return true;
        }
        const isNotValidated = !!v?.find((item: any) => {
          return validators.required(item?.country) === false;
        });
        return isNotValidated ? 'Phone is required.' : true;
      }
    },
    getValueEdit: (value: any) => {
      return Array.isArray(value) ? value.map((v: any) => ({ ...v, country: v?.fCountry?.phoneCode, label: { label: v?.label } })) : value;
    },
    getMutationValue: (value: any) => {
      const newValue = value
        ?.filter((_ele: any) => _ele.phoneNumber.length > 0)
        ?.map((_ele: any) => ({
          id: _ele?.id || '',
          label: _ele.label?.label || '',
          labelValue: _ele.labelValue,
          country: _ele?.country,
          phoneNumber: _ele.phoneNumber
          // fCountry: { ..._ele?.fCountry }
          //primary: _ele.primary
        }));
      return { [keyNames.KEY_NAME_CUSTOMER_PHONES]: newValue };
    }
    // getRecoilStateValue: (value: any) => {
    //   return value || null;
    // }
  },
  [keyNames.KEY_NAME_CUSTOMER_MOBILE]: {
    component: baseComponents.MobileInputView,
    componentProps: {
      isMultiple: true
    },
    schema: `mobiles {
      id
      label
      labelValue
      country
      fCountry {
        country
        isoCode2
        isoCode3
        phoneCode
        region
      }
      mobileNumber
    }`,
    validate: {
      required: (v: any) => {
        if (!Array.isArray(v)) {
          return true;
        }
        const isNotCountryValidated = !!v.find((item: any) => {
          return validators.required(item?.country) === false;
        });
        const isNotMobileNumberValidated = !!v.find((item: any) => {
          return validators.required(item?.mobileNumber) === false;
        });
        return isNotCountryValidated ? 'Phone code is required.' : isNotMobileNumberValidated ? 'Mobile number is required.' : true;
      }
    },
    getValueEdit: (value: any) => {
      return Array.isArray(value) ? value.map((v: any) => ({ ...v, country: v?.fCountry?.phoneCode, label: { label: v?.label } })) : value;
    },
    getMutationValue: (value: any) => {
      const newValue = value
        ?.filter((_ele: any) => _ele.mobileNumber.length > 0)
        ?.map((_ele: any) => ({
          id: _ele?.id || '',
          label: _ele.label?.label || LABEL_VALUE_OTHER,
          labelValue: _ele.labelValue,
          country: _ele.country,
          mobileNumber: _ele.mobileNumber
        }));
      return { [keyNames.KEY_NAME_CUSTOMER_MOBILE]: newValue };
    }
    // getRecoilStateValue: (value: any) => {
    //   return value || null;
    // }
  },
  [keyNames.KEY_NAME_CUSTOMER_TYPE]: {
    schema: `type`,
    component: components.CustomerTypeView,
    componentProps: {
      sourceKey: 'customer_category',
      sourceType: 'field',
      single: true,
      keyOptionValue: 'keyName',
      keyOptionLabel: 'languageKey'
    },
    getValueView: (value: any) => {
      return typeof value === 'string' ? { keyName: value } : value;
    },
    getValueEdit: (value: any) => {
      return { ...value, keyName: value };
    },
    getMutationValue: (value: any) => {
      //basic api params
      return value?.keyName || 'TYPE_NONE';
    }
  },
  [keyNames.KEY_NAME_CUSTOMER_INDUSTRIES]: {
    schema: `industries {
      keyName
      languageKey
    }`,
    component: baseComponents.DataSourceView,
    componentProps: {
      sourceKey: 'industry',
      sourceType: 'field', //group
      single: false
    },
    getValueView: (value: any) => {
      return { languageKey: value && value?.length > 0 ? value.map((item: any) => t(item?.languageKey ?? '')).join(', ') : '' };
    },
    // getValueEdit: (value: any) => {
    //   return value && value?.length > 0 ? value.map((item: any) => ({ ...item, value: item?.id, label: t(item?.languageKey) })) : [];
    // },
    getMutationValue: (value: any) => {
      const newValue = value?.map((_ele: any) => ({
        id: _ele?.keyName,
        name: t(_ele?.languageKey)
      }));
      return { [keyNames.KEY_NAME_CUSTOMER_INDUSTRIES]: newValue };
    }
  },
  [keyNames.KEY_NAME_CUSTOMER_RATING]: {
    component: baseComponents.DataSourceView,
    componentProps: {
      single: true,
      sourceKey: 'customer_rating',
      sourceType: 'field',
      keyOptionValue: 'keyName',
      keyOptionLabel: 'languageKey'
    },
    schema: `rating {
      id
      languageKey
    }`,
    getValueView: (value: any) => {
      return { ...value, value: value?.id, label: value?.languageKey ? t(value?.languageKey) : '' };
    },
    getValueEdit: (value: any) => {
      return value ? { ...value, value: value?.id, label: t(value?.languageKey) } : '';
    },
    getMutationValue: (value: any) => {
      const newValue = {
        id: value?.id,
        name: value?.keyName
      };
      return { [keyNames.KEY_NAME_CUSTOMER_RATING]: newValue };
    }
  },

  //TODO
  // [keyNames.KEY_NAME_CUSTOMER_PREFERRED]: {
  //   //component: commonComponents.CheckboxSingle,
  //   schema: `preferred`
  // },
  // [keyNames.KEY_NAME_CUSTOMER_SALES_COMMISSION]: {
  //   //component: commonComponents.CurrencyInputView,
  //   componentProps: {
  //     showSymbol: true
  //   },
  //   schema: `saleCommission`,
  //   getValue: (value: any) => {
  //     return {
  //       currency: value.currency?.code || '',
  //       value: value.saleCommission || 0
  //     };
  //   },
  //   getMutationValue: (value: any) => {
  //     return { [keyNames.KEY_NAME_CUSTOMER_SALES_COMMISSION]: value.value };
  //   }
  // },
  //TODO - may refer to discount / loyalty
  [keyNames.KEY_NAME_CUSTOMER_REFERRAL_REWARD]: {
    //component: commonComponents.CurrencyInputView,
    componentProps: {
      showSymbol: true
    },
    schema: `referralReward`,
    getValue: (value: any) => {
      return {
        currency: value.currency?.code || '',
        value: value.referralReward || 0
      };
    },
    getMutationValue: (value: any) => {
      return { [keyNames.KEY_NAME_CUSTOMER_REFERRAL_REWARD]: value.value };
    }
  },
  //TODO
  // [keyNames.KEY_NAME_CUSTOMER_SALES_PRODUCT]: {
  //   //component: commonComponents.Selectbox, //products list
  //   schema: `saleProducts  {
  //     id
  //     name
  //   }`,
  //   getValueView: (value: any) => {
  //     return value || '';
  //   }
  // },
  [keyNames.KEY_NAME_CUSTOMER_RELATED_PRODUCT]: {
    component: components.ProductViewField,
    schema: `relatedProducts  {
      id
      name
    }`,
    componentProps: {},
    languageKey: 'crm_new_menu_product',
    getValueView: (value: any) => {
      return value;
    },
    getMutationValue: (value: Product[]) => {
      return { [keyNames.KEY_NAME_CUSTOMER_RELATED_PRODUCT]: value.map((v: any) => ({ id: v?.id, name: v?.name })) };
    }
  },
  [keyNames.KEY_NAME_CUSTOMER_FAX]: {
    component: baseComponents.FaxInputView,
    componentProps: {
      isMultiple: true
    },
    schema: `faxes {
      id
      label
      labelValue
      faxNumber
      country
    }`,
    getValueEdit: (value: any) => {
      return Array.isArray(value) ? value?.map((v: any) => ({ ...v, country: v?.country || '', label: { label: v?.label } })) : value;
    },
    getMutationValue: (value: any) => {
      const newValue = value
        ?.filter((_ele: any) => _ele.faxNumber.length > 0)
        ?.map((_ele: any) => ({
          id: _ele?.id || '',
          label: _ele.label?.label || LABEL_VALUE_OTHER,
          labelValue: _ele.labelValue,
          // country: _ele.country,
          faxNumber: _ele.faxNumber
          //extension: _ele.extension,
          //primary: _ele.primary
        }));
      return { [keyNames.KEY_NAME_CUSTOMER_FAX]: newValue };
    }
    // getRecoilStateValue: (value: any) => {
    //   return value || null;
    // }
  },

  //TODO
  // [keyNames.KEY_NAME_CUSTOMER_PAYMENT_TERM]: {
  //   component: null, //components.PaymentTermView,
  //   componentProps: {
  //     single: true
  //   },
  //   schema: `paymentTerms {
  //     name
  //     numberDays
  //     isEdit
  //   }`,
  //   getValueView: (value: any) => {
  //     return value?.name || '';
  //   },
  //   getValueEdit: (value: any) => {
  //     return value ? { ...value, value: value.id, label: value.name } : null;
  //   },
  //   getMutationValue: (value: any) => {
  //     return {
  //       [keyNames.KEY_NAME_CUSTOMER_PAYMENT_TERM]: {
  //         name: value.name,
  //         numberDays: value.numberDays
  //       }
  //     };
  //   }
  // },
  // [keyNames.KEY_NAME_CUSTOMER_TAX]: {
  //   //component: commonComponents.DataSourceView,
  //   componentProps: {
  //     sourceType: 'setting',
  //     sourceKey: 'tax',
  //     sourceMenu: 'price_discount',
  //     single: true
  //   },
  //   schema: `tax {
  //     id
  //     name
  //     percentage
  //     customers {
  //       id
  //       name
  //     }
  //     isUsed
  //     isDefault
  //   }`,
  //   getValue: (viewData: any) => {
  //     return viewData.tax ? { sourceId: viewData.id, ...viewData.tax } : { sourceId: viewData.id };
  //   },
  //   getValueView: (value: any) => {
  //     return value?.name || '';
  //   },
  //   getValueEdit: (value: any) => {
  //     //// console.log('view value', value);
  //     return value?.id ? { ...value, value: value.id, label: value.name } : value;
  //   },
  //   getMutationValue: (value: any) => {
  //     return { [keyNames.KEY_NAME_CUSTOMER_TAX]: { id: value.id, name: value.name } };
  //   }
  // },
  // [keyNames.KEY_NAME_CUSTOMER_CHARGE_LATE_FEE]: {
  //   //component: commonComponents.Switch,
  //   schema: keyNames.KEY_NAME_CUSTOMER_CHARGE_LATE_FEE
  // },

  [keyNames.KEY_NAME_CUSTOMER_CREATED_BY]: {
    component: baseComponents.TextView,
    languageKey: 'customer_account_field_basic_createdby',
    schema: `createdBy {
      id
      name
    }`,
    getValueView: (value: any) => {
      return value?.name;
    }
  },
  [keyNames.KEY_NAME_CUSTOMER_CREATED_AT]: {
    component: baseComponents.DateTimeView,
    schema: 'createdAt'
  },
  [keyNames.KEY_NAME_CUSTOMER_UPDATED_BY]: {
    component: null,
    schema: `updatedBy {
      id
      name
    }`,
    getValueView: (value: any) => {
      return value?.name;
    }
  },
  [keyNames.KEY_NAME_CUSTOMER_UPDATED_AT]: {
    component: baseComponents.DateTimeView,
    //component: commonComponents.DateTimeView,
    schema: 'updatedAt'
  },
  [keyNames.KEY_NAME_CUSTOMER_BILL_ADDRESSES]: {
    component: baseComponents.AddressInputView,
    componentProps: {
      isMultiple: true
    },
    schema: `
    billAddress {
      country
      fCountry {
        country
        isoCode2
        isoCode3
        phoneCode
        region
      }
      zipcode
      addrState
      city
      street
    }
    `,
    // getValueView: (value: any) => {
    //   //array
    //   return value;
    // },
    getValueEdit: (value: any) => {
      //array
      let newValue = [];
      if (Array.isArray(value)) {
        newValue = value.map((_ele: any) => ({ ..._ele, state: _ele.addrState }));
      } else {
        if (value) {
          newValue.push({ ...value, state: value.addrState });
        }
      }
      return newValue;
    },
    getMutationValue: (value: any[]) => {
      const newValue = value?.map((_ele: any) => ({
        id: _ele?.id || '',
        country: _ele.country?.isoCode2,
        addrState: _ele.state,
        city: _ele.city,
        street: _ele.street,
        zipcode: _ele.zipcode
      }));
      return { [keyNames.KEY_NAME_CUSTOMER_BILL_ADDRESSES]: newValue };
    }
  },
  [keyNames.KEY_NAME_CUSTOMER_SHIP_ADDRESSES]: {
    component: baseComponents.AddressInputView,
    componentProps: {
      isMultiple: true
    },
    schema: `
    shipAddress {
      country
      fCountry {
        country
        isoCode2
        isoCode3
        phoneCode
        region
      }
      zipcode
      addrState
      city
      street
    }
    `,
    // getValueView: (value: any) => {
    //   return { ...value, state: value.addrState };
    // },
    getValueEdit: (value: any) => {
      //array
      let newValue = [];
      if (Array.isArray(value)) {
        newValue = value.map((_ele: any) => ({ ..._ele, state: _ele.addrState }));
      } else {
        if (value) {
          newValue.push({ ...value, state: value.addrState });
        }
      }
      return newValue;
    },
    getMutationValue: (value: any[]) => {
      const newValue = value?.map((_ele: any) => ({
        id: _ele?.id || '',
        country: _ele.country?.isoCode2,
        addrState: _ele.state,
        city: _ele.city,
        street: _ele.street,
        zipcode: _ele.zipcode
      }));
      return { [keyNames.KEY_NAME_CUSTOMER_SHIP_ADDRESSES]: newValue };
    }
  },
  [keyNames.KEY_NAME_CUSTOMER_WEBSITES]: {
    component: baseComponents.WebsiteInputView,
    componentProps: {
      isMultiple: false
    },
    schema: `website {
      #id
      #label
      #labelValue
      protocol
      website
    }`,
    // getValueEdit: (value: any) => {
    //   return Array.isArray(value) ? value?.map((v: any) => ({ ...v, label: { label: v?.label } })) : value;
    // },
    getMutationValue: (value: any) => {
      // const newValue = value.map((_ele: any) => ({
      //   id: _ele?.id,
      //   label: _ele.label?.label || LABEL_VALUE_CUSTOM_WEB,
      //   labelValue: _ele.labelValue,
      //   website: _ele.website,
      //   protocol: _ele.protocol
      // }));
      const newValue = {
        id: value?.id,
        website: value.website,
        protocol: value.protocol
      };
      return { [keyNames.KEY_NAME_CUSTOMER_WEBSITES]: newValue };
    }
  },
  [keyNames.KEY_NAME_CUSTOMER_ASSIGN_TO]: {
    languageKey: 'Assigned Rep',
    component: baseComponents.UserInputView,
    schema: `assignTo {
      user {
        id
        name
      }
      group {
        id
        name
      }
    }`,
    componentProps: {
      category: 'account'
    },
    getValueView: (value: any) => {
      return value?.map((v: any) => ({ id: v?.user?.id, name: v?.user?.name }));
    },
    getValueEdit: (value: any) => {
      return value?.map((v: any) => ({ id: v?.user?.id, name: v?.user?.name }));
    },
    getMutationValue: (value: any) => {
      const newValue = value.map((v: any) => ({ user: { id: v?.id, name: v?.name }, group: { id: '', name: '' } }));
      return { [keyNames.KEY_NAME_CUSTOMER_ASSIGN_TO]: newValue };
    }
  },
  [keyNames.KEY_NAME_CUSTOMER_CURRENCY]: {
    //component: commonComponents.CurrencyView,
    schema: `currency {
      code
      currencyName
    }`,
    getValueView: (value: any) => {
      return value ? [value.code, value.currencyName].join('-') : '';
    },
    getValueEdit: (value: any) => {
      return value
        ? {
            ...value,
            value: value.code,
            label: value.currencyName
          }
        : null;
    },
    getMutationValue: (value: any) => {
      const newValue = value.code;
      return { [keyNames.KEY_NAME_CUSTOMER_CURRENCY]: newValue };
    }
  },
  [keyNames.KEY_NAME_CUSTOMER_EMPLOYEES_NUMBER]: {
    schema: 'employeeNumber',
    component: baseComponents.TextView,
    componentProps: {
      type: 'number'
    },
    getMutationValue: (value: any) => {
      return { [keyNames.KEY_NAME_CUSTOMER_EMPLOYEES_NUMBER]: parseInt(value) };
    }
  },
  [keyNames.KEY_NAME_CUSTOMER_ANNUAL_REVENUE]: {
    schema: keyNames.KEY_NAME_CUSTOMER_ANNUAL_REVENUE,
    component: baseComponents.NumberFieldView,
    componentProps: {
      fullWidth: true
    },
    // getValue: (value: any) => {
    //   return {
    //     currency: value[keyNames.KEY_NAME_CUSTOMER_CURRENCY]?.code || '',
    //     value: value[keyNames.KEY_NAME_CUSTOMER_ANNUAL_REVENUE] || 0
    //   };
    // },
    getValueEdit: (value: any) => {
      return value ? value : 0;
    },
    getMutationValue: (value: any) => {
      return { [keyNames.KEY_NAME_CUSTOMER_ANNUAL_REVENUE]: parseFloat(value || 0) };
    }
  },
  [keyNames.KEY_NAME_CUSTOMER_MAIN_PRODUCT]: {
    component: null,
    schema: keyNames.KEY_NAME_CUSTOMER_MAIN_PRODUCT,
    getValueView: (value: any) => {
      return !!value && value !== 'null' ? value : '';
    },
    getValueEdit: (value: any) => {
      return !!value && value !== 'null' ? value : '';
    }
  },
  [keyNames.KEY_NAME_CUSTOMER_BUSINESS_NUMBER]: {
    component: null,
    schema: keyNames.KEY_NAME_CUSTOMER_BUSINESS_NUMBER
  },
  [keyNames.KEY_NAME_CUSTOMER_DESCRIPTION]: {
    component: baseComponents.TextAreaView,
    schema: keyNames.KEY_NAME_CUSTOMER_DESCRIPTION,
    getValueView: (value: any) => {
      return value ? value : '';
    },
    getValueEdit: (value: any) => {
      return value ?? '';
    }
  },
  [keyNames.KEY_NAME_CUSTOMER_CONTACT_TYPE]: {
    schema: `contactType`,
    component: baseComponents.DataSourceView,
    componentProps: {
      sourceKey: 'contact_type',
      sourceType: 'field',
      single: true
    },
    // getValueView: (value: any) => {
    //   return t(value?.languageKey ?? '');
    // },
    // getValueEdit: (value: any) => {
    //   return { ...value, value: value?.keyName, label: t(value?.languageKey ?? '') };
    // },
    getMutationValue: (value: any) => {
      //basic api params
      return value?.keyName || 'CONTACT_TYPE_NONE';
    }
  },
  [keyNames.KEY_NAME_CUSTOMER_EMPLOYEE_ROLE]: {
    schema: `employeeRole {
      languageKey
      keyName
    }`,
    component: baseComponents.DataSourceView,
    componentProps: {
      sourceKey: 'employee_role',
      sourceType: 'field',
      single: true
    },
    // getValueView: (value: any) => {
    //   return t(value?.languageKey ?? '');
    // },
    // getValueEdit: (value: any) => {
    //   return { ...value, value: value?.keyName, label: t(value?.languageKey ?? '') };
    // },
    getMutationValue: (value: any) => {
      return value ? { [keyNames.KEY_NAME_CUSTOMER_EMPLOYEE_ROLE]: { id: value?.keyName, name: value?.languageKey } } : null;
    }
  },
  [keyNames.KEY_NAME_CUSTOMER_JOB]: {
    schema: `job {
      languageKey
      keyName
    }`,
    component: baseComponents.DataSourceView,
    componentProps: {
      sourceKey: 'job_position',
      sourceType: 'field',
      single: true
    },
    // getValueView: (value: any) => {
    //   return t(value?.languageKey ?? '');
    // },
    // getValueEdit: (value: any) => {
    //   return { ...value, value: value?.keyName, label: t(value?.languageKey ?? '') };
    // },
    getMutationValue: (value: any) => {
      return value ? { [keyNames.KEY_NAME_CUSTOMER_JOB]: { id: value.keyName, name: value.languageKey } } : null;
    }
  },
  [keyNames.KEY_NAME_CUSTOMER_GENDER]: {
    schema: keyNames.KEY_NAME_CUSTOMER_GENDER,
    component: baseComponents.RadioGroupView,
    componentProps: {
      options: CUSTOMER_GENDER_OPTIONS,
      fieldValue: 'keyName',
      fieldLabel: 'languageKey'
    },
    getValue: (value: any) => {
      return value?.[keyNames.KEY_NAME_CUSTOMER_GENDER] ? value?.[keyNames.KEY_NAME_CUSTOMER_GENDER] : { languageKey: '', keyName: '' };
    },
    getValueView: (value: any) => {
      if (value && value?.languageKey) {
        return { label: value?.languageKey };
      } else if (value?.languageKey === '') {
        return value?.languageKey;
      } else {
        const languageKey = CUSTOMER_GENDER_OPTIONS.find((v: any) => v.keyName === value)?.languageKey;
        return languageKey ? { label: languageKey } : value;
      }
    },
    getValueEdit: (value: any) => {
      return { languageKey: value?.languageKey, keyName: value || CUSTOMER_GENDER_OPTIONS[0].keyName };
    },
    getMutationValue: (value: any) => {
      //basic api params
      return value.keyName;
    }
  },
  [keyNames.KEY_NAME_CUSTOMER_POSITION]: {
    // schema: keyNames.KEY_NAME_CUSTOMER_POSITION
    schema: ``
    //component: commonComponents.TextView,
  },
  [keyNames.KEY_NAME_CUSTOMER_DEPARTMENT]: {
    schema: keyNames.KEY_NAME_CUSTOMER_DEPARTMENT,
    component: baseComponents.TextView,
    getValueView: (value: any) => {
      return value ? value : '';
    }
  },
  [keyNames.KEY_NAME_CUSTOMER_ANNIVERSARIES]: {
    component: baseComponents.AnniversaryInputView,
    componentProps: {
      isMultiple: false,
      onlyBirthdayOption: true
    },
    schema: `anniversaries {
      id
      label
      labelValue
      anniversary
    }`,
    getMutationValue: (value: any) => {
      let newValue = value;
      if (Array.isArray(value)) {
        newValue = value?.map((_ele: any) => ({
          id: _ele?.id,
          label: _ele?.label?.label || LABEL_VALUE_BIRTHDAY,
          labelValue: _ele.labelValue,
          anniversary: _ele.anniversary
        }));
      } else {
        newValue = {
          id: value?.id,
          label: value?.label?.label || LABEL_VALUE_BIRTHDAY,
          labelValue: value.labelValue,
          anniversary: value.anniversary
        };
      }
      return { [keyNames.KEY_NAME_CUSTOMER_ANNIVERSARIES]: [newValue] };
    }
  },
  [keyNames.KEY_NAME_CUSTOMER_PARENT_ACCOUNT]: {
    schema: `parentAccount {
      id
      name
    }`,
    component: components.CustomerView,
    componentProps: {
      category: 'account',
      single: true
    },
    // getValueView: (value: any) => {
    //   return value?.name || '';
    // },
    // getValueEdit: (value: any) => {
    //   return value ? { ...value, value: value.id, label: value.name } : null;
    // },
    getMutationValue: (value: any) => {
      const newValue = {
        id: value?.id,
        name: value?.name
      };
      return { [keyNames.KEY_NAME_CUSTOMER_PARENT_ACCOUNT]: newValue };
    }
  },
  [keyNames.KEY_NAME_CUSTOMER_ACCOUNT]: {
    schema: `account {
      id
      code
      name
      category
      emails {
        id
        label
        labelValue
        email
      }
      phones {
        id
        label
        labelValue
        country
        fCountry {
          country
          isoCode2
          isoCode3
          phoneCode
          region
        }
        phoneNumber
        extension
      }
      website {
        #labelValue
        protocol
        website
      }
    }`,
    component: components.CustomerView,
    componentProps: {
      category: 'account',
      single: true
    },
    // getValueView: (value: any) => {
    //   return value?.name || '';
    // },
    // getValueEdit: (value: any) => {
    //   return value ? { ...value, value: value.id, label: value.name } : null;
    // },
    getMutationValue: (value: any) => {
      const newValue = {
        id: value?.id,
        name: value?.name
      };
      return { [keyNames.KEY_NAME_CUSTOMER_ACCOUNT]: newValue };
    }
  },
  [keyNames.KEY_NAME_CUSTOMER_SLA]: {
    component: baseComponents.DataSourceView,
    componentProps: {
      single: true,
      sourceKey: 'sla',
      sourceMenu: 'desk',
      sourceType: 'setting'
    },
    schema: `SLA`,
    getValueView: (value: any) => {
      return value.sla ? { ...value, id: value.sla, languageKey: value.sla } : { id: value, languageKey: value };
    },
    getMutationValue: (value: any) => {
      return { [keyNames.KEY_NAME_CUSTOMER_SLA]: value.sla };
    }
  },
  [keyNames.KEY_NAME_CUSTOMER_OPENING_BALANCE]: {
    //component: commonComponents.CurrencyInputView,
    componentProps: {
      showSymbol: true
    },
    schema: `openingBalance {
      amount
      currency
    }`,
    getValue: (value: any) => {
      return {
        currency: value[keyNames.KEY_NAME_CUSTOMER_CURRENCY]?.code || '',
        value: value[keyNames.KEY_NAME_CUSTOMER_OPENING_BALANCE]?.amount || 0
      };
    },
    getMutationValue: (value: any) => {
      return {
        [keyNames.KEY_NAME_CUSTOMER_OPENING_BALANCE]: {
          currency: value.currency,
          amount: value.value
        }
      };
    }
  },
  [keyNames.KEY_NAME_CUSTOMER_CREDIT_LIMIT]: {
    //component: commonComponents.CurrencyInputView,
    componentProps: {
      showSymbol: true
    },
    schema: `creditLimit {
      amount
      currency
    }`,
    getValue: (value: any) => {
      return {
        currency: value[keyNames.KEY_NAME_CUSTOMER_CURRENCY]?.code || '',
        value: value[keyNames.KEY_NAME_CUSTOMER_CREDIT_LIMIT]?.amount || 0
      };
    },
    getMutationValue: (value: any) => {
      return {
        [keyNames.KEY_NAME_CUSTOMER_CREDIT_LIMIT]: {
          currency: value.currency,
          amount: value.value
        }
      };
    }
  },

  // --------view------------
  [keyNames.KEY_NAME_CUSTOMER_ADDRESSES]: {
    languageKey: 'Address',
    component: components.CustomerAddressView,
    componentProps: {
      // category: 'account',
      // single: true
    },
    getValue: (data: any) => {
      return {
        [keyNames.KEY_NAME_CUSTOMER_BILL_ADDRESSES]: data?.[keyNames.KEY_NAME_CUSTOMER_BILL_ADDRESSES],
        [keyNames.KEY_NAME_CUSTOMER_SHIP_ADDRESSES]: data?.[keyNames.KEY_NAME_CUSTOMER_SHIP_ADDRESSES]
      };
    },
    getValueView: (value: any) => {
      return value;
    },
    getValueEdit: (value: any) => {
      return {
        [keyNames.KEY_NAME_CUSTOMER_BILL_ADDRESSES]: {
          ...value?.[keyNames.KEY_NAME_CUSTOMER_BILL_ADDRESSES],
          // country: value?.[keyNames.KEY_NAME_CUSTOMER_BILL_ADDRESSES]?.fCountry,
          country: {
            country: value?.[keyNames.KEY_NAME_CUSTOMER_BILL_ADDRESSES]?.fCountry?.country || '',
            isDefault: value?.[keyNames.KEY_NAME_CUSTOMER_BILL_ADDRESSES]?.fCountry?.isDefault || false,
            isoCode2: value?.[keyNames.KEY_NAME_CUSTOMER_BILL_ADDRESSES]?.fCountry?.isoCode2 || '',
            phoneCode: value?.[keyNames.KEY_NAME_CUSTOMER_BILL_ADDRESSES]?.fCountry?.phoneCode || '',
            region: value?.[keyNames.KEY_NAME_CUSTOMER_BILL_ADDRESSES]?.fCountry?.region || ''
          },
          state: value?.[keyNames.KEY_NAME_CUSTOMER_BILL_ADDRESSES]?.addrState || '',
          zipcode: value?.[keyNames.KEY_NAME_CUSTOMER_BILL_ADDRESSES]?.zipcode || '',
          city: value?.[keyNames.KEY_NAME_CUSTOMER_BILL_ADDRESSES]?.city || '',
          street: value?.[keyNames.KEY_NAME_CUSTOMER_BILL_ADDRESSES]?.street || ''
        },
        [keyNames.KEY_NAME_CUSTOMER_SHIP_ADDRESSES]: {
          ...value?.[keyNames.KEY_NAME_CUSTOMER_SHIP_ADDRESSES],
          country: {
            country: value?.[keyNames.KEY_NAME_CUSTOMER_SHIP_ADDRESSES]?.fCountry?.country || '',
            isDefault: value?.[keyNames.KEY_NAME_CUSTOMER_SHIP_ADDRESSES]?.fCountry?.isDefault || false,
            isoCode2: value?.[keyNames.KEY_NAME_CUSTOMER_SHIP_ADDRESSES]?.fCountry?.isoCode2 || '',
            phoneCode: value?.[keyNames.KEY_NAME_CUSTOMER_SHIP_ADDRESSES]?.fCountry?.phoneCode || '',
            region: value?.[keyNames.KEY_NAME_CUSTOMER_SHIP_ADDRESSES]?.fCountry?.region || ''
          },
          state: value?.[keyNames.KEY_NAME_CUSTOMER_SHIP_ADDRESSES]?.addrState || '',
          zipcode: value?.[keyNames.KEY_NAME_CUSTOMER_SHIP_ADDRESSES]?.zipcode || '',
          city: value?.[keyNames.KEY_NAME_CUSTOMER_SHIP_ADDRESSES]?.city || '',
          street: value?.[keyNames.KEY_NAME_CUSTOMER_SHIP_ADDRESSES]?.street || ''
        }
      };
    },
    getMutationValue: (value: any) => {
      const billValue = value?.[keyNames.KEY_NAME_CUSTOMER_BILL_ADDRESSES];
      const shipValue = value?.[keyNames.KEY_NAME_CUSTOMER_SHIP_ADDRESSES];

      const billValueSubmit = {
        country: billValue?.country.isoCode2,
        zipcode: billValue?.zipcode,
        addrstate: billValue?.state,
        city: billValue?.city,
        street: billValue?.street
      };

      const shipValueSubmit = {
        country: shipValue?.country.isoCode2,
        zipcode: shipValue?.zipcode,
        addrstate: shipValue?.state,
        city: shipValue?.city,
        street: shipValue?.street
      };

      return {
        [keyNames.KEY_NAME_CUSTOMER_BILL_ADDRESSES]: billValueSubmit,
        [keyNames.KEY_NAME_CUSTOMER_SHIP_ADDRESSES]: shipValueSubmit
      };
    }
  },
  [keyNames.KEY_NAME_CUSTOMER_CRN]: {
    schema: `CRN`,
    component: baseComponents.TextView,
    componentProps: {}
  },
  [keyNames.KEY_NAME_CUSTOMER_BIRTHDAY]: {
    component: baseComponents.DataSourceView,
    schema: keyNames.KEY_NAME_CUSTOMER_BIRTHDAY
  },
  // [keyNames.KEY_NAME_CUSTOMER_RECEIPT_TYPE]: {
  //   //component: commonComponents.Selectbox,
  //   componentProps: {
  //     isMultiple: false,
  //     isSearchable: false,
  //     options: RECEIPT_TYPE_OPTIONS,
  //     fieldValue: 'value',
  //     fieldLabel: 'label'
  //   },
  //   schema: `receiptType`,
  //   // getValueView: (value: any) => {
  //   //   return value ? t(value?.languageKey) : '';
  //   // },
  //   getValueEdit: (value: any) => {
  //     return RECEIPT_TYPE_OPTIONS.find((_ele: any) => _ele.value === value?.keyName) || null;
  //   },
  //   getMutationValue: (value: any) => {
  //     return {
  //       [keyNames.KEY_NAME_CUSTOMER_RECEIPT_TYPE]: value?.value || 'RECEIPT_TYPE_NONE'
  //     };
  //   }
  // },
  [keyNames.KEY_NAME_CUSTOMER_SEND_MODE]: {
    component: null, //components.SendModeView,
    schema: `sendMode`,
    getValueView: (value: any) => {
      return value ? SEND_MODE_OPTIONS.find((_ele: any) => _ele.value === value)?.label || '' : '';
    },
    getMutationValue: (value: any) => {
      return {
        [keyNames.KEY_NAME_CUSTOMER_SEND_MODE]: value || 'SEND_MODE_EMAIL'
      };
    }
  }
  // [keyNames.KEY_NAME_CUSTOMER_DELETED_AT]: {
  //   schema: `restore {
  //     id
  //     aggId
  //     aggType
  //     deletedAt
  //     deletedBy {
  //       id
  //       name
  //     }
  //   }`
  // }
  // [keyNames.KEY_NAME_CUSTOMER_DELETED_BY]: {
  //   schema: `restore {
  //     id
  //     aggId
  //     aggType
  //     deletedAt
  //     deletedBy {
  //       id
  //       name
  //     }
  //   }`
  // }

  /** NOT USE IN DESK */

  // [keyNames.KEY_NAME_CUSTOMER_CURRENT_DEBIT]: {
  //   component: null,
  //   schema: [keyNames.KEY_NAME_CUSTOMER_CURRENT_DEBIT],
  // },
  // [keyNames.KEY_NAME_CUSTOMER_UNUSED_CREDIT]: {
  //   component: null,
  //   schema: keyNames.KEY_NAME_CUSTOMER_UNUSED_CREDIT,
  // },
  // [keyNames.KEY_NAME_CUSTOMER_AMOUNT_RECEIVED]: {
  //   component: null,
  //   schema: keyNames.KEY_NAME_CUSTOMER_AMOUNT_RECEIVED,
  // },

  // [keyNames.KEY_NAME_CUSTOMER_CONNECTED_IPS]: {
  //   component: commonComponents.IpAddressView,
  //   schema: keyNames.KEY_NAME_CUSTOMER_CONNECTED_IPS,
  //   // getMutationValue: (value: any) => {
  //   //   //// console.log('value ips', value);
  //   //   const newValue = value?.map((_ele: any) => ({
  //   //     id: _ele?.id,
  //   //     ip: _ele.ip
  //   //   }));
  //   //   return { [keyNames.KEY_NAME_CUSTOMER_CONNECTED_IPS]: newValue };
  //   // }
  // },
  // [keyNames.KEY_NAME_CUSTOMER_LEAD_SOURCES]: {
  //   component: components.LeadSourceView,
  //   schema: `leadSources {
  //     id
  //     languageKey
  //   }`,
  //   getValueView: (value: any) => {
  //     return value && value?.length > 0
  //       ? value?.map((item: any) => t(item?.languageKey)).join(', ')
  //       : '';
  //   },
  //   getValueEdit: (value: any) => {
  //     return value && value?.length > 0
  //       ? value.map((item: any) => ({
  //         ...item,
  //         title: t(item?.languageKey),
  //       }))
  //       : [];
  //   },
  //   getMutationValue: (value: any) => {
  //     const newValue = value?.map((_ele: any) => ({
  //       id: _ele?.id,
  //       name: t(_ele?.languageKey)
  //     }));
  //     return { [keyNames.KEY_NAME_CUSTOMER_LEAD_SOURCES]: newValue };
  //   }
  // },
  // [keyNames.KEY_NAME_CUSTOMER_RELATED_EMPLOYEES]: {
  //   component: components.RelatedEmployeeView,
  //   schema: `relatedEmployees {
  //     id
  //     code
  //     name
  //     category
  //     type {
  //       languageKey
  //       keyName
  //     }
  //     state {
  //       languageKey
  //       keyName
  //     }
  //     photo
  //   }`,
  //   getValueView: (value: any) => {
  //     return value && value?.length > 0 ? value.map((item: any) => item?.name).join(', ') : '';
  //   },
  //   getMutationValue: (value: any) => {
  //     const newValue = value?.map((_ele: any) => ({
  //       id: _ele?.id,
  //       name: _ele?.name
  //     }));
  //     return { [keyNames.KEY_NAME_CUSTOMER_RELATED_EMPLOYEES]: newValue };
  //   }
  // },
  // [keyNames.KEY_NAME_CUSTOMER_RELATED_ACCOUNTS]: {
  //   component: components.RelatedAccountView,
  //   schema: '',
  //   getValueView: (value: any) => {
  //     return value && value?.length > 0 ? value.map((item: any) => item?.name).join(', ') : '';
  //   },
  //   getMutationValue: (value: any) => {
  //     const newValue = value?.map((_ele: any) => ({
  //       id: _ele?.id,
  //       name: _ele?.name
  //     }));
  //     return { [keyNames.KEY_NAME_CUSTOMER_RELATED_ACCOUNTS]: newValue };
  //   }
  // },
  // [keyNames.KEY_NAME_CUSTOMER_RELATED_CONTACTS]: {
  //   component: components.RelatedContactView,
  //   schema: '',
  //   getValueView: (value: any) => {
  //     return value && value?.length > 0 ? value.map((item: any) => item?.name).join(', ') : '';
  //   },
  //   getMutationValue: (value: any) => {
  //     const newValue = value?.map((_ele: any) => ({
  //       id: _ele?.id,
  //       name: _ele?.name
  //     }));
  //     return { [keyNames.KEY_NAME_CUSTOMER_RELATED_CONTACTS]: newValue };
  //   }
  // },
  // [keyNames.KEY_NAME_CUSTOMER_CONVERSION_DATE]: {
  //   schema: keyNames.KEY_NAME_CUSTOMER_CONVERSION_DATE,
  //   component: commonComponents.DateTimeView,
  // },
  // [keyNames.KEY_NAME_CUSTOMER_JOB]: {
  //   schema: keyNames.KEY_NAME_CUSTOMER_JOB,
  //   component: null,
  // },
  // [keyNames.KEY_NAME_CUSTOMER_COMPANY]: {
  //   schema: keyNames.KEY_NAME_CUSTOMER_COMPANY,
  //   component: null,
  // },
  // [keyNames.KEY_NAME_CUSTOMER_HOBBY]: {
  //   schema: keyNames.KEY_NAME_CUSTOMER_HOBBY,
  //   component: null,
  // },
  // [keyNames.KEY_NAME_CUSTOMER_STATE]: {
  //   component: null,
  //   schema: `state {
  //     languageKey
  //     keyName
  //   }`,
  // },
  // [keyNames.KEY_NAME_CUSTOMER_ACTIVE]: {
  //   component: commonComponents.Switch,
  //   schema: keyNames.KEY_NAME_CUSTOMER_ACTIVE,
  // },
  // [keyNames.KEY_NAME_CUSTOMER_GROUPS]: {
  //   component: commonComponents.DataSourceView,
  //   componentProps: {
  //     sourceKey: 'customer_group',
  //     sourceType: 'group',
  //     single: false,
  //   },
  //   schema: `groups {
  //     id
  //     languageKey
  //   }`,
  //   getValueView: (value: any) => {
  //     return value && value?.length > 0
  //       ? value.map((item: any) => t(item?.languageKey ?? '')).join(', ')
  //       : '';
  //   },
  //   getValueEdit: (value: any) => {
  //     return value ? value.map((item: any) => ({ id: item?.id, title: t(item?.languageKey) })) : [];
  //   },
  //   getMutationValue: (value: any) => {
  //     const newValue = value?.map(
  //       (_ele: any) => ({ id: _ele.id, name: _ele.title })
  //     );
  //     return { [keyNames.KEY_NAME_CUSTOMER_GROUPS]: newValue };
  //   },
  // },
  // [keyNames.KEY_NAME_CUSTOMER_LAST_ACTIVITY_DATE]: {
  //   component: commonComponents.DateTimeView,
  //   schema: keyNames.KEY_NAME_CUSTOMER_LAST_ACTIVITY_DATE,
  // },
};

export default viewConfig;
