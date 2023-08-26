import * as keyNames from '@lead/config/keyNames';
import validators from '@base/utils/validation/fieldValidator';
import * as components from './components';
import { TextField } from '@mui/material';
import * as baseComponents from '@base/config/write-field/components';
import { WRITE_TYPE_COLLECTION } from '@settings/preferences/config/lead/constants';
import { Selection } from '@settings/general/types/interface';
import { LABEL_VALUE_CUSTOM_WEB } from '@base/config/constant';

const writeConfig = {
  [keyNames.KEY_LEAD_TITLE]: {
    component: TextField,
    componentProps: {
      // placeholder: 'Title'
    },
    defaultValue: '',
    showFullRow: true,
    validate: {
      required: validators.required
    }
  },
  [keyNames.KEY_LEAD_COLLECTION_METHOD]: {
    component: components.LeadSettingSelect,
    componentProps: { settingKey: WRITE_TYPE_COLLECTION },
    showFullRow: false
  },
  [keyNames.KEY_LEAD_CONTACT_NAME]: {
    component: TextField,
    componentProps: {
      placeholder: 'ncrm_sales_lead_name_placeholder'
    },
    defaultValue: '',
    showFullRow: false
  },
  [keyNames.KEY_LEAD_CONTACT_EMAIL]: {
    component: baseComponents.EmailInput,
    componentProps: { isMultiple: true },
    showFullRow: false,
    validate: {
      email: validators.email
    }
  },
  [keyNames.KEY_LEAD_CONTACT_MOBILE]: {
    component: baseComponents.MobileInput,
    componentProps: { isSmall: true, isMultiple: true },
    showFullRow: false
  },
  [keyNames.KEY_LEAD_CONTACT_PHONE]: {
    component: baseComponents.PhoneInput,
    componentProps: { isMultiple: true, haveExtension: false },
    showFullRow: false
  },
  [keyNames.KEY_LEAD_COMPANY_NAME]: {
    component: TextField,
    componentProps: {
      placeholder: 'ncrm_sales_lead_company_field_placeholder'
    },
    showFullRow: false
  },
  [keyNames.KEY_LEAD_COMPANY_WEBSITE]: {
    component: baseComponents.WebsiteInput,
    componentProps: {
      // placeholder: 'ncrm_sales_lead_website_field_placeholder'
    },
    showFullRow: false,
    defaultValue: [],
    parseParam: (value: any) =>
      value.map((_ele: any) => ({
        website: _ele.website,
        protocol: _ele.protocol
      }))
  },
  [keyNames.KEY_LEAD_COMPANY_INDUSTRY]: {
    component: baseComponents.DataSourceSelect,
    componentProps: { single: true, sourceKey: 'industry', sourceType: 'field' },
    showFullRow: false,
    parseParam: (v: Selection) => (v ? { id: v.id, name: v.languageKey } : null)
  },
  [keyNames.KEY_LEAD_SHIP_TO]: {
    component: baseComponents.AddressInput,
    componentProps: {},
    defaultValue: null,
  },
  [keyNames.KEY_LEAD_BILL_TO]: {
    component: baseComponents.AddressInput,
    componentProps: {},
    validate: {},
    defaultValue: null,
  },
  [keyNames.KEY_LEAD_DESCRIPTION]: {
    component: TextField,
    componentProps: {
      multiline: true,
      rows: 3,
      autoComplete: 'off'
    },
    defaultValue: '',
    showFullRow: true
  }
};
export const contactGroup = [
  keyNames.KEY_LEAD_CONTACT_NAME,
  keyNames.KEY_LEAD_CONTACT_EMAIL,
  keyNames.KEY_LEAD_CONTACT_MOBILE,
  keyNames.KEY_LEAD_CONTACT_PHONE
];
export const companyGroup = [keyNames.KEY_LEAD_COMPANY_NAME, keyNames.KEY_LEAD_COMPANY_INDUSTRY, keyNames.KEY_LEAD_COMPANY_WEBSITE];
export const AddressGroup = [keyNames.KEY_LEAD_SHIP_TO, keyNames.KEY_LEAD_BILL_TO];
export default writeConfig;
