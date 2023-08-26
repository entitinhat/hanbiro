//third-party
import _ from 'lodash';
import { t } from 'i18next';

//project
import RouteName from '@base/components/@hanbiro/RouteName';

//menu
import * as keyNames from '@settings/digital/survey/config/keyNames';
import {
  SURVEY_STATUS_PUBLISHED,
  SURVEY_STATUS_UNPUBLISH,
  SURVEY_TYPE_GENERAL,
  SURVEY_TYPE_SATISFACTION
} from '@settings/digital/survey/config/constants';
import { Typography } from '@mui/material';

// material-ui

//render columns components
export const getMapColumns = (avaiLanguages: any) => {
  return {
    [keyNames.KEY_SURVEY_NAME](col: string, data: any) {
      let name = data[col] ? data[col] : '';
      let sourceId = data[keyNames.KEY_SURVEY_ID] ?? '';
      let url = `/settings/digital/survey/${sourceId}`;
      return <RouteName url={url} name={name} />;
    },
    [keyNames.KEY_SURVEY_TITLE](col: string, data: any) {
      let name = data[col] ? data[col] : '';
      let sourceId = data[keyNames.KEY_SURVEY_ID] ?? '';
      let url = `/settings/digital/survey/${sourceId}`;
      return <RouteName url={url} name={name} />;
    },
    [keyNames.KEY_SURVEY_TYPE](col: string, data: any) {  
      let typeLabel: any = <em>({t('ncrm_common_setting_none')})</em>;
      if (data[col] === SURVEY_TYPE_GENERAL) {
        typeLabel = t('ncrm_generalsetting_survey_type_general');
      }
      if (data[col] === SURVEY_TYPE_SATISFACTION) {
        typeLabel = t('ncrm_generalsetting_survey_type_satisfaction');
      }
      return typeLabel;
    },
    [keyNames.KEY_SURVEY_LANGUAGE](col: string, data: any) {
      return avaiLanguages?.find((v: any) => v.value == data?.[col])?.label ?? data?.[col] ?? <em>({t('ncrm_common_setting_none')})</em>;
    },
    [keyNames.KEY_SURVEY_STAGE](col: string, data: any) {
      let statusLabel: any = <em>({t('ncrm_common_setting_none')})</em>;
      if (data[col] === SURVEY_STATUS_PUBLISHED) {
        statusLabel = t('ncrm_generalsetting_survey_status_published');
      }
      if (data[col] === SURVEY_STATUS_UNPUBLISH) {
        statusLabel = t('ncrm_generalsetting_survey_status_unpublish');
      }
      return statusLabel;
    }
  };
};
