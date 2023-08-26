//project
import * as baseComponents from '@base/config/view-field/components';
import { FieldConfig } from '@base/types/pagelayout';

//menu
import * as keyNames from '@settings/digital/landing-page/config/keyNames';
import { landingPageQueryKeys } from '@settings/digital/landing-page/config/queryKeys';
import * as components from '@settings/digital/landing-page/config/view-field/components';
import { MainTemplate } from '@settings/digital/landing-page/type/template';
import { Product } from '@product/product/types/product';
import { t } from 'i18next';
import { LANDING_PAGE_TYPE_OPTIONS, LANDING_PAGE_STAGE_OPTIONS } from '@settings/digital/landing-page/config/constants';
import { LANGUAGES } from '@base/config/constant';

const viewConfig: FieldConfig = {
  // ================================ SUMMARY FIELDS ====================================

  [keyNames.KEY_NAME_LANDING_PAGE_TYPE]: {
    schema: `type`,
    component: components.SelectBoxView,
    showFullRow: true,
    componentProps: {
      options: LANDING_PAGE_TYPE_OPTIONS.map((type: any) => {
        return {
          ...type,
          keyName: type.value,
          languageKey: type.languageKey
        };
      })
    },
    getValue: (apiData: any) => {
      const currentData = LANDING_PAGE_TYPE_OPTIONS.find((v: any) => v.value === apiData?.[keyNames.KEY_NAME_LANDING_PAGE_TYPE]);
      return {
        ...currentData,
        keyName: currentData?.value,
        languageKey: currentData?.languageKey
      };
    },
    getMutationValue: (value: any) => {
      return value.value;
    }
  },
  [keyNames.KEY_NAME_LANDING_PAGE_NAME]: {
    schema: `name`
  },
  [keyNames.KEY_NAME_LANDING_PAGE_LANGUAGE]: {
    schema: `language`,
    component: components.LanguageSelectViewField,
    showFullRow: true,
    componentProps: {},
    getValue: (apiData: any) => {
      console.log('apiData', apiData);
      return LANGUAGES?.find((v: any) => v.value === apiData?.[keyNames.KEY_NAME_LANDING_PAGE_LANGUAGE]) ?? {};
    },
    getValueView: (value: any) => {
      return value.label;
    },
    getMutationValue: (value: any) => {
      return value;
    }
  },
  [keyNames.KEY_NAME_LANDING_PAGE_STAGE]: {
    schema: `stage`,
    component: components.SelectBoxView,
    showFullRow: true,
    componentProps: {
      options: LANDING_PAGE_STAGE_OPTIONS.map((type: any) => {
        return {
          ...type,
          keyName: type.value,
          languageKey: t(type.label)
        };
      })
    },
    getValue: (apiData: any) => {
      const currentData = LANDING_PAGE_STAGE_OPTIONS.find((v: any) => v.value === apiData?.[keyNames.KEY_NAME_LANDING_PAGE_STAGE]);
      return {
        ...currentData,
        keyName: currentData?.value,
        languageKey: t(currentData?.label)
      };
    },
    getMutationValue: (value: any) => {
      return value.value;
    }
  },
  [keyNames.KEY_NAME_LANDING_PAGE_CREATED_AT]: {
    schema: 'createdAt',
    component: components.DateTimeViewField
  },
  [keyNames.KEY_NAME_LANDING_PAGE_ID]: {
    schema: 'id'
  },
  [keyNames.KEY_NAME_LANDING_PAGE_ASSIGN_TO]: {
    schema: `assignTo {
      id
      name
    }`
  },
  [keyNames.KEY_NAME_LANDING_PAGE_CREATED_BY]: {
    schema: `createdBy{
      fullName
      id
      name
    }`,
    component: baseComponents.TextView,
    getValueView: (value: any) => {
      return value?.fullName ?? '';
    }
  },
  [keyNames.KEY_NAME_LANDING_PAGE_IS_ALL_PRODUCTS]: {
    schema: 'isAllProducts'
  },
  [keyNames.KEY_NAME_LANDING_PAGE_PRODUCT]: {
    schema: `products {
      id
      name
    }
    isAllProducts
    `,
    component: components.ProductViewField,
    componentProps: {
      addLabel: 'Add New Product',
      showAllOption: true
    },
    languageKey: 'crm_new_menu_product',
    getValue: (value: MainTemplate) => {
      const currentValue =
        value?.[keyNames.KEY_NAME_LANDING_PAGE_PRODUCT] ??
        (value?.[keyNames.KEY_NAME_LANDING_PAGE_IS_ALL_PRODUCTS] ? [{ id: 'all', name: 'All' }] : []);
      return currentValue;
    },
    getMutationValue: (value: Product[]) => {
      const currentValue = value?.map((item) => {
        return {
          id: item.id,
          name: item.name
        };
      });
      return { [keyNames.KEY_NAME_LANDING_PAGE_PRODUCT]: currentValue };
    }
  },
  [keyNames.KEY_NAME_LANDING_PAGE_PUBLISH]: {
    schema: `publish
    publishDate
    `,
    component: components.PublishView,
    getValue: (apiData: any) => {
      return {
        publish: apiData.publish,
        publishDate: apiData.publishDate
      };
    },
    getValueEdit: (value: any) => {
      return value;
    },
    getMutationValue: (value: any) => {
      return {
        publish: value.publish,
        publishDate: value.publishDate
      };
    },
    refetchQueryKey: [landingPageQueryKeys.landingPageGet]
  },
  [keyNames.KEY_NAME_LANDING_PAGE_PUBLISH_DATE]: {
    schema: `publishDate`,
    languageKey: 'ncrm_setting_landingpage_publish_or_schedule',
    component: components.PublishDateView
  },
  [keyNames.KEY_NAME_LANDING_PAGE_TEMPLATE]: {
    schema: `template`
  },
  [keyNames.KEY_NAME_LANDING_PAGE_TITLE]: {
    schema: `title`
  },
  [keyNames.KEY_NAME_LANDING_PAGE_UPDATED_AT]: {
    schema: `updatedAt`,
    component: components.DateTimeViewField
  },
  [keyNames.KEY_NAME_LANDING_PAGE_UPDATED_BY]: {
    schema: `updatedBy{
      fullName
      id
      name
    }`
  },
  [keyNames.KEY_NAME_LANDING_PAGE_HTML]: {
    schema: `html`
  },
  [keyNames.KEY_NAME_LANDING_PAGE_CHANNELS]: {
    schema: `channels {
      id
      name
    }`,
    component: components.ChannelsView,
    viewProps: {
      userPermission: { isEdit: false, isShow: true }
    }
  }
};

export default viewConfig;
