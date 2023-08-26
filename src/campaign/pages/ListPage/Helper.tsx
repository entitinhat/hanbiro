//third-party
import _ from 'lodash';
import { t } from 'i18next';

//project
import { MENU_CAMPAIGN } from '@base/config/menus';
import { convertDateTimeServerToClient } from '@base/utils/helpers';
//import IconAvatar from '@base/components/@hanbiro/IconAvatar';
import RouteName from '@base/components/@hanbiro/RouteName';
import { Currency } from '@base/types/common';

//menu
import * as keyNames from '@campaign/config/keyNames';

// material-ui
import { Box, Chip, Stack, Typography } from '@mui/material';
import {
  CAMPAIGN_CATEGORY_ALL,
  CAMPAIGN_CATEGORY_EMAIL,
  CAMPAIGN_CATEGORY_SMS,
  CAMPAIGN_CATEGOTY_ENUM_EMAIL,
  CAMPAIGN_CATEGOTY_ENUM_SMS,
  CAMPAIGN_MAIL_SCHEDULE,
  CAMPAIGN_MAIL_SEND_NONE,
  CAMPAIGN_MAIL_SEND_NOW
} from '@campaign/config/constants';
import { letterSpacing } from '@mui/system';
import ListTableCellDroplist from '@base/components/@hanbiro/List/ListTableCellDropList';

//render columns components
export const getMapColumns = (category: string, selectionFields?: any, currency?: Currency) => {
  //console.log('selectionFields', selectionFields);
  return {
    [keyNames.KEY_CAMPAIGN_NAME](col: string, data: any) {
      let name = data[col] ? data[col] : <em>{`(${t('ncrm_customer_none')})`}</em>;
      let campaignCategory = CAMPAIGN_CATEGORY_EMAIL;
      switch (data[keyNames.KEY_CAMPAIGN_CATEGORY]) {
        case CAMPAIGN_CATEGOTY_ENUM_EMAIL:
          campaignCategory = CAMPAIGN_CATEGORY_EMAIL;
          break;
        case CAMPAIGN_CATEGOTY_ENUM_SMS:
          campaignCategory = CAMPAIGN_CATEGORY_SMS;
          break;
      }
      let sourceId = data[keyNames.KEY_CAMPAIGN_ID] ? data[keyNames.KEY_CAMPAIGN_ID] : '';
      let url =
        category === CAMPAIGN_CATEGORY_ALL
          ? `/${MENU_CAMPAIGN}/${category}/${sourceId}/${campaignCategory}`
          : `/${MENU_CAMPAIGN}/${category}/${sourceId}`;
      return <RouteName name={name} url={url} variant="h6" />;
    },
    [keyNames.KEY_CAMPAIGN_ACTIVITY](col: string, data: any) {
      return data[col] || <em>(none)</em>;
    },
    [keyNames.KEY_CAMPAIGN_SUBJECT](col: string, data: any) {
      return data?.[col] || <em>(none)</em>;
    },
    [keyNames.KEY_CAMPAIGN_OBJECTIVE](col: string, data: any) {
      return data?.[col]?.name || <em>(none)</em>;
    },
    [keyNames.KEY_CAMPAIGN_RECIPIENTS](col: string, data: any) {
      return (
        <>
          {data?.[col]?.map(
            (_item: any, index: number) =>
              _item && (
                <Box key={index} sx={{ p: 0.5 }}>
                  <Chip color="purple" label={_item.name} size="small" variant="light" />
                </Box>
              )
          )}
          {(!data?.[col] || data?.[col]?.length === 0) && <em>{`(${t('none')})`}</em>}
        </>
      );
    },
    [keyNames.KEY_CAMPAIGN_LAUNCHED_ON](col: string, data: any) {
      return convertDateTimeServerToClient({ date: data[col] });
    },
    // [keyNames.KEY_CAMPAIGN_SCHEDULED](col: string, data: any) {
    //   return convertDateTimeServerToClient(data[col]);
    // },
    [keyNames.KEY_CAMPAIGN_SCHEDULE_SEND](col: string, data: any) {
      let title = '';
      if (data?.[col]?.type === CAMPAIGN_MAIL_SEND_NOW) {
        title = t('Send now');
      }
      if (data?.[col]?.type === CAMPAIGN_MAIL_SCHEDULE) {
        title = t('Schedule');
      }
      return title || <em>(none)</em>;
    },
    [keyNames.KEY_CAMPAIGN_PRODUCT](col: string, data: any) {
      return (
        <>
          {/* {data?.[col]?.map(
            (_item: any, index: number) =>
              _item && (
                <Box key={index} sx={{ p: 0.5 }}>
                  <Chip color="magenta" label={_item.name} size="small" variant="light" />
                </Box>
              )
          )} */}
          <ListTableCellDroplist showAvatar={false} values={data?.[col] || []} />
          {(!data?.[col] || data?.[col]?.length === 0) && <em>{`(${t('none')})`}</em>}
        </>
      );
    },
    [keyNames.KEY_CAMPAIGN_PROCESS](col: string, data: any) {
      return data?.[col]?.name || <em>(none)</em>;
    },
    [keyNames.KEY_CAMPAIGN_DESCRIPTION](col: string, data: any) {
      return data?.[col] || <em>(none)</em>;
    },
    [keyNames.KEY_CAMPAIGN_ONWER](col: string, data: any) {
      return data?.[col]?.name || <em>(none)</em>; //single
    },
    [keyNames.KEY_CAMPAIGN_STAGE](col: string, data: any) {
      return data?.[col] || <em>(none)</em>;
    },
    //email
    [keyNames.KEY_CAMPAIGN_SENDER](col: string, data: any) {
      return data?.[col]?.name || <em>(none)</em>;
    },
    [keyNames.KEY_CAMPAIGN_REPLY_TRACKING](col: string, data: any) {
      return data?.[col] ? 'Yes' : 'No'; //boolean
    },
    [keyNames.KEY_CAMPAIGN_REPLY_TO](col: string, data: any) {
      return data?.[col]?.email || <em>(none)</em>;
    },
    //sms
    [keyNames.KEY_CAMPAIGN_SMS_TYPE](col: string, data: any) {
      return data?.[col] || <em>(none)</em>;
    }
  };
};

//columns render in grid split mode
export const getMapColumnsInSplitMode = (category: string) => {
  return {};
};

export const isDeleteList = (groupBy: string): boolean => {
  return ['deletedCampaign', 'deletedCampaign1', 'deletedCampaign2'].indexOf(groupBy) >= 0;
};
