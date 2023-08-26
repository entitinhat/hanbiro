//third-party
import { Mail, Phone } from 'react-feather';
import _ from 'lodash';
import { Link as RouteLink } from 'react-router-dom';
import { t } from 'i18next';

//project
import SpanLang from '@base/components/@hanbiro/SpanLang';
import { MENU_CUSTOMER } from '@base/config/menus';
import { convertDateTimeServerToClient, formatAddress, moneyFormat } from '@base/utils/helpers';
import { LABEL_VALUE_CUSTOM_ANNI, LABEL_VALUE_PRIMARY } from '@base/config/constant';
import IconAvatar from '@base/components/@hanbiro/IconAvatar';

//menu
import * as keyNames from '@marketing-list/config/keyNames';

// material-ui
import { Box, Chip, Stack, Typography, InputLabel, Switch } from '@mui/material';
import RouteName from '@base/components/@hanbiro/RouteName';
import { Currency, OptionValue } from '@base/types/common';
import HanAvatar from '@base/components/@hanbiro/HanAvatar';
import { MARKETING_TYPE_OPTIONS } from '@marketing-list/config/constants';

//render columns components
export const getMapColumns = (category: string, selectionFields?: any, currency?: Currency) => {
  //console.log('selectionFields', selectionFields);
  return {
    // ------------------------------Marketing List-----------------------------------
    [keyNames.KEY_NAME_CUSTOMER_NAME](col: string, data: any) {
      let name = data[col] ? data[col] : '';
      let sourceId = data[keyNames.KEY_NAME_CUSTOMER_ID] ?? '';
      let url = `/customer/marketing/${sourceId}`;
      return <RouteName url={url} name={name} />;
    },
    [keyNames.KEY_NAME_CUSTOMER_OWNER](col: string, data: any) {
      return <Typography>{data?.[col]?.name}</Typography>;
    },
    [keyNames.KEY_NAME_CUSTOMER_MARKETING_TYPE](col: string, data: any) {
      if (typeof data?.[col] === 'string') {
        return <Typography>{MARKETING_TYPE_OPTIONS.find((v: OptionValue) => v.keyName === data?.[col])?.languageKey}</Typography>;
      } else {
        return <Typography>{MARKETING_TYPE_OPTIONS.find((v: OptionValue) => v.keyName === data?.[col]?.label)?.languageKey}</Typography>;
      }
    },
    [keyNames.KEY_NAME_CUSTOMER_ACTIVE](col: string, data: any) {
      return <Switch checked={data?.[col] || false} size="small" readOnly />;
    },
    [keyNames.KEY_NAME_CUSTOMER_USED_DATE](col: string, data: any) {
      const usedDate = data[col] ? data[col] : '';
      return convertDateTimeServerToClient({ date: usedDate, isTime: false });
    },
    [keyNames.KEY_NAME_CUSTOMER_MEMBERS](col: string, data: any) {
      return data[keyNames.KEY_NAME_CUSTOMER_TOTAL_MEMBERS];
    },
    [keyNames.KEY_NAME_CUSTOMER_RELATED_CAMPAIGNS](col: string, data: any) {
      return <Typography>{data[col]?.label}</Typography>;
    }
  };
};

//columns render in grid split mode
export const getMapColumnsInSplitMode = (category: string) => {
  return {};
};

export const isDeleteList = (groupBy: string): boolean => {
  return ['deletedMarketingList'].indexOf(groupBy) >= 0;
};

export const getTableType = (groupBy: string) => {
  const isRowSpanned = ['myGroupMarketingList_1', 'marketingListperType_1', 'marketingListperOwner_1'].includes(groupBy);
  const isGroupByAccordion = ['myGroupMarketingList_2', 'marketingListperType_2', 'marketingListperOwner_2'].includes(groupBy);

  return {
    isRowSpanned,
    isGroupByAccordion
  };
};

export const getAccordionsummary = (data: any, keyName: string) => {
  switch (keyName) {
    case keyNames.KEY_NAME_CUSTOMER_MARKETING_TYPE:
      return MARKETING_TYPE_OPTIONS.find((v: OptionValue) => v.keyName === data[keyName].label)?.languageKey;
    case keyNames.KEY_NAME_CUSTOMER_OWNER:
      return data[keyName].name;
  }
};
