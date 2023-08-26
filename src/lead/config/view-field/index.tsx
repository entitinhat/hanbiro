import * as keyNames from '@lead/config/keyNames';
import * as commonConfig from '@base/config/view-field';
import * as baseComponents from '@base/config/view-field/components';
import * as components from './components';
import { FieldConfig } from '@base/types/pagelayout';
import { LABEL_VALUE_OTHER } from '@base/config/constant';
import { generateUUID } from '@base/utils/helpers';

const viewFieldsConfig: FieldConfig = {
  ...commonConfig?.default,
  [keyNames.KEY_LEAD_COMPANY_NAME]: {
    component: components.PrioritizeName,
    componentProps: {},
    schema: `companyName
    isPrioritize`,
    getValue(apiData: any) {
      return {
        name: apiData.companyName,
        isPrioritize: apiData.isPrioritize
      };
    },
    getMutationValue: (value: any) => {
      return { [keyNames.KEY_LEAD_COMPANY_NAME]: value?.name };
    }
  },
  [keyNames.KEY_LEAD_CONTACT_NAME]: {
    component: components.PrioritizeName,
    componentProps: {},
    schema: `contactName
    isPrioritize`,
    getValue(apiData: any) {
      return {
        name: apiData.contactName,
        isPrioritize: apiData.isPrioritize
      };
    },
    getMutationValue: (value: any) => {
      return { [keyNames.KEY_LEAD_CONTACT_NAME]: value?.name };
    }
  },
  [keyNames.KEY_LEAD_COMPANY_WEBSITE]: {
    component: baseComponents.WebsiteInputView,
    componentProps: {
      isMultiple: false,
      disableLabel: true
    },
    schema: `companyWebsite{
      protocol
      website
    }`,
    getMutationValue: (value: any) => {
      return { [keyNames.KEY_LEAD_COMPANY_WEBSITE]: { ...value, label: value?.label?.label } };
    },
    getValueEdit(fieldValue: any) {
      return { ...fieldValue, protocol: fieldValue?.protocol ? fieldValue?.protocol : ' PROTOCOL_HTTPS' };
    }
  },
  [keyNames.KEY_LEAD_COMPANY_INDUSTRY]: {
    component: baseComponents.DataSourceView,
    componentProps: {
      sourceKey: 'industry',
      sourceType: 'field', //group
      single: true
    },
    schema: `companyIndustry{
      id
     languageKey
     }`,
    getMutationValue: (value: any) => {
      const newValue = { id: value.id };

      return { [keyNames.KEY_LEAD_COMPANY_INDUSTRY]: newValue };
    }
  },
  [keyNames.KEY_LEAD_CONTACT_BILLTO]: {
    component: baseComponents.AddressInputView,
    componentProps: {
      isMultiple: false
    },
    schema: `contactBillTo{
      id
      country
      fCountry {
        country
        isoCode2
      }
      zipcode
      addrState
      city
      street
     }`,
    getValueEdit: (value: any) => {
      return {
        ...value,
        country: value?.fCountry ?? null,
        state: value?.addrState ?? '',
        city: value?.city ?? '',
        zipcode: value?.zipcode ?? '',
        street: value?.street ?? ''
      };
    },
    getValueView: (value: any) => {
      return { ...value, country: value?.fCountry ?? value?.country, state: value?.state ?? value?.addrState };
    },
    getMutationValue: (value: any) => {
      const newValue =
        value.street.length > 0
          ? {
              //label: value.label?.label,
              //labelValue: value.labelValue,
              id: value.id,
              country: value.country?.isoCode2,
              addrState: value.state,
              city: value.city,
              street: value.street,
              zipcode: value.zipcode
            }
          : {};
      return { [keyNames.KEY_LEAD_CONTACT_BILLTO]: newValue };
    }
  },
  [keyNames.KEY_LEAD_CONTACT_SHIPTO]: {
    component: baseComponents.AddressInputView,
    componentProps: {
      isMultiple: false
    },
    schema: `contactShipTo{
      id
      country
      fCountry {
        country
        isoCode2
      }
      zipcode
      addrState
      city
      street
     }`,
    getValueEdit: (value: any) => {
      return {
        ...value,
        country: value?.fCountry ?? null,
        state: value?.addrState ?? '',
        city: value?.city ?? '',
        zipcode: value?.zipcode ?? '',
        street: value?.street ?? ''
      };
    },
    getValueView: (value: any) => {
      return { ...value, country: value?.fCountry ?? value?.country, state: value?.state ?? value?.addrState };
    },
    getMutationValue: (value: any) => {
      const newValue =
        value.street.length > 0
          ? {
              //label: value.label?.label,
              //labelValue: value.labelValue,
              id: value.id,
              country: value.country?.isoCode2,
              addrState: value.state,
              city: value.city,
              street: value.street,
              zipcode: value.zipcode
            }
          : {};
      return { [keyNames.KEY_LEAD_CONTACT_SHIPTO]: newValue };
    }
  },
  [keyNames.KEY_LEAD_SHIP_TO]: {
    component: baseComponents.AddressInputView,
    componentProps: {
      isMultiple: false
    },
    schema: `companyShipTo{
      id
      country
      fCountry {
        country
        isoCode2
      }
      zipcode
      addrState
      city
      street
     }`,
    getValueEdit: (value: any) => {
      return {
        ...value,
        country: value?.fCountry ?? null,
        state: value?.addrState ?? '',
        city: value?.city ?? '',
        zipcode: value?.zipcode ?? '',
        street: value?.street ?? ''
      };
    },
    getValueView: (value: any) => {
      return { ...value, country: value?.fCountry ?? value?.country, state: value?.state ?? value?.addrState };
    },
    getMutationValue: (value: any) => {
      const newValue =
        value.street.length > 0
          ? {
              //label: value.label?.label,
              //labelValue: value.labelValue,
              id: value.id,
              country: value.country?.isoCode2,
              addrState: value.state,
              city: value.city,
              street: value.street,
              zipcode: value.zipcode
            }
          : {};
      return { [keyNames.KEY_LEAD_SHIP_TO]: newValue };
    }
  },
  [keyNames.KEY_LEAD_BILL_TO]: {
    component: baseComponents.AddressInputView,
    componentProps: {
      isMultiple: false
    },
    schema: `companyBillTo{
      id
      country
      fCountry {
        country
        isoCode2
      }
      zipcode
      addrState
      city
      street
     }`,
    getValueEdit: (value: any) => {
      return {
        ...value,
        country: value?.fCountry ?? null,
        state: value?.addrState ?? '',
        city: value?.city ?? '',
        zipcode: value?.zipcode ?? '',
        street: value?.street ?? ''
      };
    },
    getValueView: (value: any) => {
      return { ...value, country: value?.fCountry ?? value?.country, state: value?.state ?? value?.addrState };
    },
    getMutationValue: (value: any) => {
      const newValue =
        value.street.length > 0
          ? {
              //label: value.label?.label,
              //labelValue: value.labelValue,
              id: value.id,
              country: value.country?.isoCode2,
              addrState: value.state,
              city: value.city,
              street: value.street,
              zipcode: value.zipcode
            }
          : {};
      return { [keyNames.KEY_LEAD_BILL_TO]: newValue };
    }
  },
  [keyNames.KEY_LEAD_CONTACT_EMAIL]: {
    component: baseComponents.EmailInputView,
    componentProps: {
      isMultiple: true,
      disableLabel: true
    },
    schema: `contactEmails {
      id
      label 
      labelValue
      email
     }`,
    getMutationValue: (value: any) => {
      const newValue = value?.map((_ele: any, _index: number) => ({
        id: _ele.id ? _ele.id : generateUUID(),
        label: _ele?.label?.label || LABEL_VALUE_OTHER,
        labelValue: _ele.labelValue,
        email: _ele.email
        //primary: _ele.primary
      }));
      return { [keyNames.KEY_LEAD_CONTACT_EMAIL]: newValue };
    },
    getValueEdit(fieldValue: any) {
      return fieldValue?.map((item: any) => {
        return {
          ...item,
          label: {
            languageKey: `ncrm_common_${item?.label.toLowerCase()}` || '',
            label: item?.label
          }
        };
      });
    }
  },
  [keyNames.KEY_LEAD_CONTACT_PHONE]: {
    // component: components.PhoneInputView,PhoneInputView
    component: baseComponents.PhoneInputView,
    componentProps: {
      isMultiple: true,
      disableLabel: true
    },
    schema: `contactPhones {
      label 
      labelValue
      country
      phoneNumber
      extension
      id
     }`,
    getMutationValue: (value: any) => {
      const newValue = value
        ?.filter((_ele: any) => _ele.phoneNumber.length > 0)
        ?.map((_ele: any) => ({
          label: _ele.label?.label || '',
          labelValue: _ele.labelValue,
          country: _ele.country,
          phoneNumber: _ele.phoneNumber,
          extension: _ele.extension,
          id: _ele.id
          //primary: _ele.primary
        }));
      return { [keyNames.KEY_LEAD_CONTACT_PHONE]: newValue };
    },
    getValueView(fieldValue: any) {
      return fieldValue?.map((item: any) => {
        return {
          ...item,
          country: item?.country || null,
          label: {
            languageKey: item?.label?.label ? item?.label?.languageKey : `ncrm_common_${item?.label.toLowerCase()}` || '',
            label: item?.label
          }
        };
      });
    },
    getValueEdit(fieldValue: any) {
      return fieldValue?.map((item: any) => {
        return {
          ...item,
          country: item?.country || null,
          label: {
            languageKey: item?.label?.languageKey || '',
            label: item?.label
          }
        };
      });
    }
  },
  [keyNames.KEY_LEAD_CONTACT_MOBILE]: {
    component: baseComponents.MobileInputView,
    componentProps: {
      isMultiple: true,
      disableLabel: true
    },
    schema: `contactMobiles {
      id
      label
      country
      labelValue
      mobileNumber
     }`,
    getMutationValue: (value: any) => {
      const newValue = value
        ?.filter((_ele: any) => _ele.mobileNumber.length > 0)
        ?.map((_ele: any) => ({
          label: _ele.label?.label || '',
          labelValue: _ele.labelValue,
          country: _ele.country,
          mobileNumber: _ele.mobileNumber,
          id: _ele.id
        }));
      return { [keyNames.KEY_LEAD_CONTACT_MOBILE]: newValue };
    },
    getValueView(fieldValue: any) {
      return fieldValue?.map((item: any) => {
        return {
          ...item,
          phoneNumber: item?.mobileNumber ? item?.mobileNumber : item?.phoneNumber,
          country: item?.country || null,
          label: {
            languageKey: item?.label?.label ? item?.label?.languageKey : `ncrm_common_${item?.label.toLowerCase()}` || '',
            label: item?.label
          }
        };
      });
    },
    getValueEdit(fieldValue: any) {
      return fieldValue?.map((item: any) => {
        return {
          ...item,
          phoneNumber: item?.mobileNumber,
          country: item?.country || null,
          label: {
            languageKey: item?.label?.label ? item?.label?.languageKey : `ncrm_common_${item?.label.toLowerCase()}` || '',
            label: item?.label
          }
        };
      });
    }
  },
  [keyNames.KEY_LEAD_COLLECTION_METHOD]: {
    component: components.CollectionMethodViewField,
    componentProps: {},
    schema: `collectionMethod {
      id
      name
      parent {
        id
        name
      }
     }`
  },
  [keyNames.KEY_LEAD_ASSIGN_TO]: {
    component: baseComponents.UserInputView,
    componentProps: {
      single: true,
      disableChip: true,
      userPermission: {
        isEdit: true
      }
    },
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
    getValueView: (value: any) => {
      return value?.user ? value?.user : value;
    },
    getValueEdit: (value: any) => {
      return value?.user ? value?.user : value;
    },
    getMutationValue: (value: any) => {
      return { [keyNames.KEY_LEAD_ASSIGN_TO]: { user: { id: value?.id, name: value?.name }, group: {} } };
    }
  },
  [keyNames.KEY_LEAD_CREATED_BY]: {
    component: baseComponents.TextView,
    componentProps: {
      userPermission: {
        isEdit: false
      }
    },
    getValueView: (value: any) => {
      return value?.name;
    },
    schema: `createdBy{
      id
      name
    }`
  },
  [keyNames.KEY_LEAD_PRODUCT]: {
    component: components.ProductViewFieldv2,
    componentProps: {},
    viewProps: { maxItems: 2 },
    schema: `products{
      id
      name
    }`,
    getValueView: (value: any) => {
      return value;
    }
    // getMutationValue: (value: any) => {
    //   return { [keyNames.KEY_LEAD_PRODUCT]: value };
    // }
  }
};

export default viewFieldsConfig;

export const companyGroup = [
  keyNames.KEY_LEAD_COMPANY_NAME,
  keyNames.KEY_LEAD_COMPANY_WEBSITE,
  keyNames.KEY_LEAD_COMPANY_INDUSTRY,
  keyNames.KEY_LEAD_BILL_TO,
  keyNames.KEY_LEAD_SHIP_TO
];
export const contactGroup = [
  keyNames.KEY_LEAD_CONTACT_NAME,
  keyNames.KEY_LEAD_CONTACT_EMAIL,
  keyNames.KEY_LEAD_CONTACT_MOBILE,
  keyNames.KEY_LEAD_CONTACT_PHONE,
  keyNames.KEY_LEAD_CONTACT_BILLTO,
  keyNames.KEY_LEAD_CONTACT_SHIPTO
  // keyNames.KEY_LEAD_BILL_TO,
  // keyNames.KEY_LEAD_SHIP_TO
];
