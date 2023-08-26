import React, { useMemo } from 'react';

//third-party
import { Chip, Stack, Typography } from '@mui/material';

//project base
import { convertDateTimeServerToClient, moneyFormat } from '@base/utils/helpers';
import RouteName from '@base/components/@hanbiro/RouteName';
import ListTableCellDroplist from '@base/components/@hanbiro/List/ListTableCellDropList';

//menu
import * as keyNames from '@opportunity/config/keyNames';
import { MENU_OPPORTUNITY } from '@base/config/menus';
import { OPPORTUNITY_GROUP_BY_DELETED } from '@opportunity/config/list-field';
import { OPPORTUNITY_TYPES } from '@opportunity/config/constants';

export const getMapColumns = () => ({
  [keyNames.KEY_NAME_OPPORTUNITY_CODE](col: string, data: any) {
    return <Typography noWrap>{data[col]}</Typography>;
  },
  [keyNames.KEY_NAME_OPPORTUNITY_TITLE](col: string, data: any) {
    const name = data[col] ? data[col] : '';
    const id = data.id ?? '';
    let url = `/opportunity/${MENU_OPPORTUNITY}/${id}`;

    return (
      <Stack direction="row" spacing={0.5} alignItems="center">
        <RouteName name={name} url={url} variant="h6" />
      </Stack>
    );
  },
  [keyNames.KEY_NAME_OPPORTUNITY_TYPE](col: string, data: any) {
    const typeItem = OPPORTUNITY_TYPES.find((_ele: any) => _ele.keyName === data[col]);
    return typeItem ? typeItem.languageKey : <em></em>;
  },
  [keyNames.KEY_NAME_OPPORTUNITY_CUSTOMER](col: string, data: any) {
    return data[col] ? <Typography>{data[col]?.name}</Typography> : <em></em>;
  },
  [keyNames.KEY_NAME_OPPORTUNITY_PRODUCT](col: string, data: any) {
    // let itemData = null;
    // if (Array.isArray(data[col]) && data[col]?.length > 0) {
    //   itemData = data[col].map((_ele: any) => ({ ..._ele.productItem }));
    // } else {
    //   itemData = data[col]; //object or null
    // }
    return Array.isArray(data[col]) && data[col]?.length > 0 ? (
      <ListTableCellDroplist showAvatar={false} values={data[col]} />
    ) : data[col] ? (
      data[col].name
    ) : (
      <em></em>
    );
  },
  [keyNames.KEY_NAME_OPPORTUNITY_REFERRER](col: string, data: any) {
    return data[col]?.name || <em></em>;
  },
  [keyNames.KEY_NAME_OPPORTUNITY_SALES_REP](col: string, data: any) {
    let rows = [];
    if (Array.isArray(data[col]) && data[col]?.length > 0) {
      rows = data[col].map((_ele: any) => ({ ..._ele.rep }));
    }
    return rows.length > 0 ? <ListTableCellDroplist showAvatar={false} values={rows} /> : <em></em>;
  },
  [keyNames.KEY_NAME_OPPORTUNITY_PROCESS](col: string, data: any) {
    return data[col]?.name || <em></em>;
  },
  [keyNames.KEY_NAME_OPPORTUNITY_COMPETITOR](col: string, data: any) {
    return data[col]?.length > 0 ? <ListTableCellDroplist showAvatar={false} values={data[col]} /> : <em></em>;
  },
  [keyNames.KEY_NAME_OPPORTUNITY_STAGE](col: string, data: any) {
    return data[col]?.name || <em></em>;
  },
  [keyNames.KEY_NAME_OPPORTUNITY_STATUS](col: string, data: any) {
    return data[col]?.name || <em></em>;
  },
  [keyNames.KEY_NAME_OPPORTUNITY_ESTIMATED_REVENUE](col: string, data: any) {
    return moneyFormat(data[col] || 0);
  },
  [keyNames.KEY_NAME_OPPORTUNITY_PROBABILITY](col: string, data: any) {
    return moneyFormat(data[col] || 0);
  },
  [keyNames.KEY_NAME_OPPORTUNITY_WEIGHTED_AMOUNT](col: string, data: any) {
    return moneyFormat(data[col] || 0);
  },
  [keyNames.KEY_NAME_OPPORTUNITY_CLOSE_DATE](col: string, data: any) {
    return data[col] ? convertDateTimeServerToClient({ date: data[col] }) : <em></em>;
  }
});

export const isDeleteList = (groupBy: string): boolean => {
  return [OPPORTUNITY_GROUP_BY_DELETED].indexOf(groupBy) >= 0;
};
