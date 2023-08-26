import * as keyNames from '@settings/digital/ticket-form/config/keyNames';
import * as components from '@settings/digital/ticket-form/config/view-field/components';
import { FieldConfig } from '@base/types/pagelayout';
import * as baseComponents from '@base/config/view-field/components';
import { TextField } from '@mui/material';
import _ from 'lodash';
import { t } from 'i18next';

const viewConfig: FieldConfig = {
  [keyNames.KEY_TICKET_FORM_NAME]: {
    component: TextField,
    componentProps: {},
    schema: 'name',
    showFullRow: true
  },
  [keyNames.KEY_TICKET_FORM_TITLE]: {
    component: TextField,
    schema: 'title',
    showFullRow: true
  },
  [keyNames.KEY_TICKET_FORM_DESCRIPTION]: {
    component: components.DescriptionView,
    componentProps: {},
    schema: 'description',
    showFullRow: true
  },
  [keyNames.KEY_TICKET_FORM_LINK_TO_TYPE]: {},
  [keyNames.KEY_TICKET_FORM_LANGUAGE]: {
    component: components.LanguageSelect,
    schema: 'language',
    showFullRow: true
  },
  [keyNames.KEY_TICKET_FORM_STAGE]: {
    schema: 'stage'
  },
  [keyNames.KEY_TICKET_FORM_TEMPLATE]: {
    component: null,
    schema: ''
  },
  [keyNames.KEY_TICKET_FORM_CREATED_BY]: {
    component: baseComponents.TextView,
    languageKey: t('ncrm_generalsetting_ticket_form_field_more_createdby') as string,
    schema: `createdBy {
      id
      name
      fullName
    }`,
    getValueView: (value: any) => {
      return value?.name;
    }
  },
  [keyNames.KEY_TICKET_FORM_CREATED_AT]: {
    component: baseComponents.DateTimeView,
    schema: 'createdAt'
  },
  [keyNames.KEY_TICKET_FORM_UPDATED_BY]: {
    schema: `updatedBy {
      id
      name
      fullName
    }`,
    getValueView: (value: any) => {
      return value?.name;
    }
  },
  [keyNames.KEY_TICKET_FORM_UPDATED_AT]: {
    component: baseComponents.DateTimeView,
    schema: 'updatedAt'
  },
  [keyNames.KEY_TICKET_FORM_PRODUCTS]: {
    component: components.ProductAutoComplete,
    schema: `isAllProducts
    products{
        id
        name
    }`,
    componentProps: {
      showAllOption: true
    },
    getValue(data) {
      let value = {
        [keyNames.KEY_TICKET_FORM_PRODUCTS]: data?.[keyNames.KEY_TICKET_FORM_PRODUCTS],
        [keyNames.KEY_TICKET_FORM_IS_ALL_PRODUCT]: data?.[keyNames.KEY_TICKET_FORM_IS_ALL_PRODUCT]
      };
      return value;
    },
    showFullRow: true,
    getValueEdit: (value: any) => {
      return value?.[keyNames.KEY_TICKET_FORM_PRODUCTS];
    },
    getValueView: (value: any) => {
      // console.log('view value: ', value);

      if (value?.[keyNames.KEY_TICKET_FORM_IS_ALL_PRODUCT]) {
        return { name: 'All' };
      }

      if (_.isArray(value)) {
        return value;
      }

      if (!_.isArray(value?.[keyNames.KEY_TICKET_FORM_PRODUCTS])) {
        return { name: 'none' };
      }

      return value?.[keyNames.KEY_TICKET_FORM_PRODUCTS];
    },

    getMutationValue: (value: any) => {
      const products = value.map((_item: any) => ({ id: _item.id, name: _item.name }));
      return {
        products
      };
    }
  },
  [keyNames.KEY_TICKET_FORM_SUBMISSION_DISPLAY]: {
    component: components.SubmissionSetting,
    componentProps: {},
    showFullRow: true,
    hideFieldLabel: true,
    getValue: (data: any) => {
      return {
        [keyNames.KEY_TICKET_FORM_SUBMISSION_DISPLAY]: data[keyNames.KEY_TICKET_FORM_SUBMISSION_DISPLAY],
        [keyNames.KEY_TICKET_FORM_DISPLAY_MESSAGE]: data[keyNames.KEY_TICKET_FORM_DISPLAY_MESSAGE],
        [keyNames.KEY_TICKET_FORM_LINK_TO_PAGE]: data[keyNames.KEY_TICKET_FORM_LINK_TO_PAGE],
        [keyNames.KEY_TICKET_FORM_LINK_TO_RESOURCE]: data[keyNames.KEY_TICKET_FORM_LINK_TO_RESOURCE],
        [keyNames.KEY_TICKET_FORM_LINK_TO_TYPE]: data[keyNames.KEY_TICKET_FORM_LINK_TO_TYPE]
      };
    },
    getMutationValue: (value: any) => {
      const newValue = {
        ...value,
        [keyNames.KEY_TICKET_FORM_LINK_TO_RESOURCE]: value[keyNames.KEY_TICKET_FORM_LINK_TO_RESOURCE]
          ? {
              id: value[keyNames.KEY_TICKET_FORM_LINK_TO_RESOURCE]?.id,
              name: value[keyNames.KEY_TICKET_FORM_LINK_TO_RESOURCE]?.name
            }
          : null
      };
      return newValue;
    }
  },
  [keyNames.KEY_TICKET_FORM_SUBMISSION_BEHAVIOR]: {
    component: components.SubmissionBehavior,
    componentProps: {},
    showFullRow: true,
    // hideFieldLabel: true,
    schema: `
    createTicket
    ticketName
    `,
    getValue: (data: any) => {
      return {
        [keyNames.KEY_TICKET_FORM_CREATE_TICKET]: data[keyNames.KEY_TICKET_FORM_CREATE_TICKET]
        // [keyNames.KEY_TICKET_FORM_TICKET_NAME]: data[keyNames.KEY_TICKET_FORM_TICKET_NAME]
      };
    },
    getMutationValue: (value: any) => {
      return {
        [keyNames.KEY_TICKET_FORM_CREATE_TICKET]: value?.[keyNames.KEY_TICKET_FORM_CREATE_TICKET]
        // [keyNames.KEY_TICKET_FORM_TICKET_NAME]: value?.[keyNames.KEY_TICKET_FORM_TICKET_NAME]
      };
    }
  }
};

export default viewConfig;
