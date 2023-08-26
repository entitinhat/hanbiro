//third-party
import _ from 'lodash';
import { Link as RouteLink } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

//project
//import { convertDateTimeServerToClient } from '@base/utils/helpers';

//menu
import * as keyNames from '@settings/digital/satisfaction/config/keyNames';

// material-ui

//render columns components
export const getMapColumns = (avaiLanguages: any) => {
  return {
    [keyNames.KEY_SATISFACTION_SURVEY_NAME](col: string, data: any) {
      let name = data[col] ? data[col] : '';
      let sourceId = data[keyNames.KEY_SATISFACTION_SURVEY_ID] ?? '';
      let url = `/settings/digital/satisfaction/${sourceId}`;
      return <RouteLink to={url}>{name}</RouteLink>;
    },
    [keyNames.KEY_SATISFACTION_SURVEY_LANGUAGE](col: string, data: any) {
      return avaiLanguages?.find((v: any) => v.code == data?.[col])?.title ?? data?.[col] ?? 'none';
      //return data?.[col] || 'none';
    },
    [keyNames.KEY_SATISFACTION_SURVEY_STAGE](col: string, data: any) {
      return data[col] ?? '';
    }
  };
};
