import * as commonComponents from '@base/config/view-field/components';
import * as constants from '@settings/digital/cta/config/constants';
import * as keyNames from '@settings/digital/cta/config/keyNames';
import * as components from './components';

import * as commonConfig from '@base/config/view-field';
import { Divider, InputAdornment, Stack, Typography } from '@mui/material';
import { t } from 'i18next';
import { LANDING_PAGE_TYPE_OPTIONS } from '@settings/digital/landing-page/config/constants';
import { SITE_GROUP_KEY, SITE_GROUP_OPTION, SITE_TYPE_OPTIONS } from '@settings/site/config/constants';
import { SURVEY_TYPES } from '@settings/digital/survey/config/constants';

const configView: any = {
  ...commonConfig?.default,
  [keyNames.KEY_SETTING_CTA_VALUE]: {
    schema: ``
  },
  [keyNames.KEY_SETTING_CTA_TYPE]: {
    component: commonComponents.SelectBoxView,
    schema: keyNames.KEY_SETTING_CTA_TYPE,
    viewProps: {
      userPermission: { isEdit: false, isShow: true }
    },
    componentProps: {
      isSearchable: false,
      options: constants.SETTING_CTA_TYPES,
      fieldValue: 'value',
      fieldLabel: 'label'
    },
    getValue: (apiData: any) => {
      return constants.SETTING_CTA_TYPES?.find((v: any) => v.value === apiData?.[keyNames.KEY_SETTING_CTA_TYPE]);
    },
    getValueView: (value: any) => {
      return value;
    },
    getMutationValue: (value: any) => {
      return value.value;
    }
  },
  [keyNames.KEY_SETTING_CTA_LANGUAGE]: {
    component: components.LanguageSelectView,
    schema: keyNames.KEY_SETTING_CTA_LANGUAGE,
    getMutationValue: (value: any) => {
      return value;
    }
  },
  [keyNames.KEY_SETTING_CTA_IMAGE_URL]: {
    component: null,
    schema: keyNames.KEY_SETTING_CTA_IMAGE_URL
  },
  [keyNames.KEY_SETTING_CTA_IMAGE_SIZE]: {
    component: components.ImageSizeView,
    schema: `imgSize {
      width
      height
    }`,
    getMutationValue: (value: any) => {
      return {
        [keyNames.KEY_SETTING_CTA_IMAGE_SIZE]: {
          width: value?.width,
          height: value?.height
        }
      };
    }
  },
  [keyNames.KEY_SETTING_CTA_IMAGE_ALT]: {
    component: commonComponents.TextView,
    schema: keyNames.KEY_SETTING_CTA_IMAGE_ALT
  },
  [keyNames.KEY_SETTING_CTA_LINK_TYPE]: {
    schema: keyNames.KEY_SETTING_CTA_LINK_TYPE,
    component: components.SelectBoxView,
    componentProps: {
      options: constants.SETTING_CTA_LINK_TYPES.map((type: any) => {
        return {
          ...type,
          keyName: type.value,
          languageKey: type.label
        };
      })
    },
    getValue: (apiData: any) => {
      return constants.SETTING_CTA_LINK_TYPES?.find((v: any) => v.value === apiData?.[keyNames.KEY_SETTING_CTA_LINK_TYPE]) ?? null;
    },
    getValueView: (value: any) => {
      return value;
    },
    getMutationValue: (value: any) => {
      if (value.value === constants.SETTING_CTA_LINK_TYPE_INTERNAL) {
        return {
          [keyNames.KEY_SETTING_CTA_LINK_TYPE]: value.value,
          [keyNames.KEY_SETTING_CTA_EXT_SITE_NAME]: ''
        };
      } else {
        return {
          [keyNames.KEY_SETTING_CTA_LINK_TYPE]: value.value,
          [keyNames.KEY_SETTING_CTA_EXT_SITE_NAME]: t('ncrm_generalsetting_cta_input_exsitename')
        };
      }
    }
  },
  [keyNames.KEY_SETTING_CTA_EXT_SITE_NAME]: {
    schema: keyNames.KEY_SETTING_CTA_EXT_SITE_NAME,
    component: commonComponents.TextView,
    getValueView: (value: any) => {
      return t(value) || t('ncrm_generalsetting_none');
    },
    getValueEdit: (value: any) => {
      return t(value) || t('ncrm_generalsetting_none');
    }
  },
  [keyNames.KEY_SETTING_CTA_LINK_URL]: {
    schema: `linkUrl
    openPageInNewWindow
    `,
    component: components.LinkUrlView,
    getValue: (data: any) => {
      return {
        link: data?.linkUrl,
        openNewWindow: data?.linkBlank
      };
    },
    getMutationValue: (value: any) => {
      return {
        [keyNames.KEY_SETTING_CTA_LINK_URL]: value?.link,
        [keyNames.KEY_SETTING_CTA_NEW_WINDOW]: value?.openNewWindow
      };
    }
  },
  [keyNames.KEY_SETTING_CTA_LANDINGPAGE]: {
    schema: `${keyNames.KEY_SETTING_CTA_LANDINGPAGE} {
      id
      name
    }`,
    component: components.LandingPageView,
    getMutationValue: (value: any) => {
      const newValue = {
        id: value?.id,
        name: value?.name
      };
      return { [keyNames.KEY_SETTING_CTA_LANDINGPAGE]: newValue, [keyNames.KEY_SETTING_CTA_LANDINGPAGE_TITLE]: value?.title };
    }
  },
  [keyNames.KEY_SETTING_CTA_LANDINGPAGE_TYPE]: {
    schema: keyNames.KEY_SETTING_CTA_LANDINGPAGE_TYPE,
    component: commonComponents.SelectBoxView,
    componentProps: {
      options: LANDING_PAGE_TYPE_OPTIONS?.map((type: any) => {
        return {
          ...type,
          keyName: type.value
        };
      })
    },
    getValue: (apiData: any) => {
      const findData: any = LANDING_PAGE_TYPE_OPTIONS?.find((v: any) => v.value === apiData?.[keyNames.KEY_SETTING_CTA_LANDINGPAGE_TYPE]);
      return findData ? { ...findData, keyName: findData?.value } : null;
    },
    getMutationValue: (value: any) => {
      return value?.value;
    }
  },
  [keyNames.KEY_SETTING_CTA_SITE]: {
    schema: `${keyNames.KEY_SETTING_CTA_SITE} {
      id
      name
    }`,
    component: components.SiteView,
    getMutationValue: (value: any) => {
      const newValue = {
        id: value?.id,
        name: value?.name
      };
      return { [keyNames.KEY_SETTING_CTA_SITE]: newValue, [keyNames.KEY_SETTING_CTA_SITE_TITLE]: value?.name };
    }
  },
  [keyNames.KEY_SETTING_CTA_SITE_TYPE]: {
    schema: keyNames.KEY_SETTING_CTA_SITE_TYPE,
    component: commonComponents.SelectBoxView,
    componentProps: {
      options: SITE_TYPE_OPTIONS?.map((type: any) => {
        return {
          ...type,
          keyName: type?.value,
          languageKey: type?.label
        };
      })
    },
    getValue: (apiData: any) => {
      const findData: any = SITE_TYPE_OPTIONS?.find((v: any) => v.value === SITE_GROUP_KEY[apiData?.[keyNames.KEY_SETTING_CTA_SITE_TYPE]]);
      return findData ? { ...findData, keyName: findData?.value } : null;
    },
    getMutationValue: (value: any) => {
      return SITE_GROUP_OPTION[value?.value];
    }
  },
  [keyNames.KEY_SETTING_CTA_SURVEY]: {
    schema: `${keyNames.KEY_SETTING_CTA_SURVEY} {
      id
      name
    }`,
    component: components.SurveyView,
    getMutationValue: (value: any) => {
      const newValue = {
        id: value?.id,
        name: value?.name
      };
      return { [keyNames.KEY_SETTING_CTA_SURVEY]: newValue, [keyNames.KEY_SETTING_CTA_SURVEY_TITLE]: value?.title };
    }
  },
  [keyNames.KEY_SETTING_CTA_SURVEY_TYPE]: {
    schema: keyNames.KEY_SETTING_CTA_SURVEY_TYPE,
    component: commonComponents.SelectBoxView,
    componentProps: {
      options: SURVEY_TYPES?.map((type: any) => {
        return {
          ...type,
          keyName: type.value
        };
      })
    },
    getValue: (apiData: any) => {
      const findData: any = SURVEY_TYPES?.find((v: any) => v.keyName === apiData?.[keyNames.KEY_SETTING_CTA_SURVEY_TYPE]);
      return findData ? { ...findData, value: findData?.keyName } : null;
    },
    getMutationValue: (value: any) => {
      return value?.value;
    }
  },
  [keyNames.KEY_SETTING_CTA_CONTENT_TYPE]: {
    schema: keyNames.KEY_SETTING_CTA_CONTENT_TYPE,
    component: commonComponents.SelectBoxView,
    viewProps: {
      userPermission: { isEdit: false, isShow: true }
    },
    componentProps: {
      options: constants.SETTING_CTA_CONTENT_TYPES
    },
    getValue: (apiData: any) => {
      return constants.SETTING_CTA_CONTENT_TYPES?.find((v: any) => v.value === apiData?.[keyNames.KEY_SETTING_CTA_CONTENT_TYPE]) ?? null;
    },
    getValueView: (value: any) => {
      return value;
    },
    getMutationValue: (value: any) => {
      return value?.value;
    }
  },
  [keyNames.KEY_SETTING_CTA_DESCRIPTION]: {
    component: commonComponents.TextAreaView,
    schema: keyNames.KEY_SETTING_CTA_DESCRIPTION
  },
  [keyNames.KEY_SETTING_CTA_AB_TEST]: {
    schema: keyNames.KEY_SETTING_CTA_AB_TEST,
    component: commonComponents.SwitchView
  },
  [keyNames.KEY_SETTING_CTA_STAGE]: {
    schema: keyNames.KEY_SETTING_CTA_STAGE,
    component: commonComponents.SelectBoxView,
    componentProps: {
      options: constants.SETTING_CTA_STAGE_OPTIONS
    },
    getValue: (apiData: any) => {
      return constants.SETTING_CTA_STAGE_OPTIONS?.find((v: any) => v.value === apiData?.[keyNames.KEY_SETTING_CTA_STAGE]) ?? null;
    },
    getValueView: (value: any) => {
      return value;
    },
    getMutationValue: (value: any) => {
      return value.value;
    }
  },
  [keyNames.KEY_SETTING_CTA_VIEW]: {
    schema: ``
  },
  [keyNames.KEY_SETTING_CTA_CLICK]: {
    schema: ``
  },
  [keyNames.KEY_SETTING_CTA_CLICK_RATE]: {
    schema: ``
  },
  [keyNames.KEY_SETTING_CTA_PREVIEW]: {
    schema: ``
  },
  [keyNames.KEY_SETTING_CTA_TEXT_FONT_WEIGHT]: {
    component: components.SelectBoxView,
    schema: keyNames.KEY_SETTING_CTA_TEXT_FONT_WEIGHT,
    componentProps: {
      options: constants.SETTING_CTA_TEXT_FONT_WEIGHT_OPTIONS
    },
    getValue: (apiData: any) => {
      return constants.SETTING_CTA_TEXT_FONT_WEIGHT_OPTIONS?.find(
        (v: any) => v.value === apiData?.[keyNames.KEY_SETTING_CTA_TEXT_FONT_WEIGHT]
      );
    },
    getValueView: (value: any) => {
      return value;
    },
    getMutationValue: (value: any) => {
      return {
        [keyNames.KEY_SETTING_CTA_TEXT_FONT_WEIGHT]: value?.value
      };
    }
  },
  [keyNames.KEY_SETTING_CTA_TEXT_BG_COLOR]: {
    schema: keyNames.KEY_SETTING_CTA_TEXT_BG_COLOR,
    component: components.InputColorView,
    getMutationValue: (value: any) => {
      return {
        [keyNames.KEY_SETTING_CTA_TEXT_BG_COLOR]: value
      };
    }
  },
  [keyNames.KEY_SETTING_CTA_TEXT_TEXT_COLOR]: {
    schema: keyNames.KEY_SETTING_CTA_TEXT_TEXT_COLOR,
    component: components.InputColorView,
    getMutationValue: (value: any) => {
      return {
        [keyNames.KEY_SETTING_CTA_TEXT_TEXT_COLOR]: value
      };
    }
  },
  [keyNames.KEY_SETTING_CTA_TEXT_FONT_SIZE]: {
    schema: keyNames.KEY_SETTING_CTA_TEXT_FONT_SIZE,
    component: commonComponents.TextView,
    componentProps: {
      type: 'number',
      InputProps: {
        endAdornment: (
          <InputAdornment position="end">
            <Stack direction="row" alignItems="center">
              <Divider orientation="vertical" flexItem />
              <Typography color="secondary" sx={{ pl: '14px' }}>
                px
              </Typography>
            </Stack>
          </InputAdornment>
        )
      }
    },
    getMutationValue: (value: any) => {
      return {
        [keyNames.KEY_SETTING_CTA_TEXT_FONT_SIZE]: Number(value)
      };
    }
  },
  [keyNames.KEY_SETTING_CTA_TEXT_ROUNDED]: {
    schema: keyNames.KEY_SETTING_CTA_TEXT_ROUNDED,
    component: components.SliderView,
    getValue: (apiData: any) => {
      return apiData?.[keyNames.KEY_SETTING_CTA_TEXT_ROUNDED];
    },
    getMutationValue: (value: any) => {
      const mValue = Number(value) < 0 ? 0 : Number(value);
      return {
        [keyNames.KEY_SETTING_CTA_TEXT_ROUNDED]: mValue
      };
    }
  },
  [keyNames.KEY_SETTING_CTA_QR_CODE]: {
    schema: keyNames.KEY_SETTING_CTA_QR_CODE
  }
};

export default configView;
