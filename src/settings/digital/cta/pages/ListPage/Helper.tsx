import * as keyNames from '@settings/digital/cta/config/keyNames';

// material-ui
import RouteName from '@base/components/@hanbiro/RouteName';
import { LANGUAGES } from '@base/config/constant';
import * as constants from '@settings/digital/cta/config/constants';
import SpanLang from '@base/components/@hanbiro/SpanLang';

//render columns components
export const getMapColumns = () => {
  return {
    [keyNames.KEY_SETTING_CTA_NAME](col: string, data: any) {
      let name = data[col] ? data[col] : '';
      let sourceId = data.id ? data.id : '';
      let url = `/settings/digital/cta/${sourceId}`;
      return <RouteName url={url} name={name} />;
    },
    [keyNames.KEY_SETTING_CTA_TYPE](col: string, data: any) {
      return <SpanLang keyLang={constants.SETTING_CTA_TYPES?.find((v: any) => v.value === data[col])?.languageKey ?? ''} />;
    },
    [keyNames.KEY_SETTING_CTA_LANGUAGE](col: string, data: any) {
      return <SpanLang keyLang={LANGUAGES?.find((v: any) => v.key == data?.[col])?.label ?? data?.[col] ?? ''} />;
    },
    [keyNames.KEY_SETTING_CTA_LINK_TYPE](col: string, data: any) {
      return <SpanLang keyLang={constants.SETTING_CTA_LINK_TYPES?.find((v: any) => v.value === data[col])?.label ?? ''} />;
    },
    [keyNames.KEY_SETTING_CTA_EXT_SITE_NAME](col: string, data: any) {
      return data?.[col] ?? '';
    },
    [keyNames.KEY_SETTING_CTA_LINK_URL](col: string, data: any) {
      return data?.[col] ?? '';
    },
    [keyNames.KEY_SETTING_CTA_CONTENT_TYPE](col: string, data: any) {
      return data?.[keyNames.KEY_SETTING_CTA_LINK_TYPE] == constants.SETTING_CTA_LINK_TYPE_INTERNAL ? (
        <SpanLang keyLang={constants.SETTING_CTA_CONTENT_TYPES?.find((v: any) => v.value === data[col])?.label ?? ''} />
      ) : (
        ''
      );
    },
    [keyNames.KEY_SETTING_CTA_STAGE](col: string, data: any) {
      return <SpanLang keyLang={constants.SETTING_CTA_STAGE_OPTIONS?.find((v: any) => v.value === data[col])?.label ?? ''} />;
    },
    [keyNames.KEY_SETTING_CTA_NEW_WINDOW](col: string, data: any) {
      return <SpanLang keyLang={data[col] ? 'ncrm_generalsetting_cta_new_window_true' : 'ncrm_generalsetting_cta_new_window_false'} />;
    }
  };
};
