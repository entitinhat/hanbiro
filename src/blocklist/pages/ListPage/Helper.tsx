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
import * as keyNames from '@blocklist/config/keyNames';

// material-ui
import { Box, Chip, Stack, Typography, InputLabel, Switch } from '@mui/material';
import RouteName from '@base/components/@hanbiro/RouteName';
import { Currency } from '@base/types/common';

//render columns components
export const getMapColumns = (category: string, selectionFields?: any, currency?: Currency) => {
  //console.log('selectionFields', selectionFields);
  return {
    // ------------------------------Block List---------------------------------
    [keyNames.KEY_NAME_CUSTOMER_CAMPAIGN](col: string, data: any) {
      return <Typography>{data[col].rowSpan ? `${data[col].label} (${data[col].rowSpan})` : `${data[col].label}`}</Typography>;
    },
    [keyNames.KEY_NAME_CUSTOMER_CUSTOMER](col: string, data: any) {
      return <Typography>{data[col].rowSpan ? `${data[col].name} (${data[col].rowSpan})` : `${data[col].name}`}</Typography>;
    }
  };
};

//columns render in grid split mode
export const getMapColumnsInSplitMode = (category: string) => {
  return {};
};

export const isDeleteList = (groupBy: string): boolean => {
  return ['deletedCustomer'].indexOf(groupBy) >= 0;
};

// Accordion mode
export const getAccordionsummary = (data: any, keyName: string) => {
  switch (keyName) {
    case keyNames.KEY_NAME_CUSTOMER_CAMPAIGN:
      return data[keyName].label;
    case keyNames.KEY_NAME_CUSTOMER_CREATED_BY:
      return data[keyName].name;
    case keyNames.KEY_NAME_CUSTOMER_CUSTOMER:
      return data[keyName].name;
  }
};

export const getTableType = (groupBy: string) => {
  const isRowSpanned = ['myGroupBlockList_1', 'blockListperCampaign_1', 'blockListperCustomer_1'].includes(groupBy);
  const isGroupByAccordion = ['myGroupBlockList_2', 'blockListperCampaign_2', 'blockListperCustomer_2'].includes(groupBy);

  return {
    isRowSpanned,
    isGroupByAccordion
  };
};
