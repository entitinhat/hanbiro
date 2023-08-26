//import React, { useMemo } from 'react';

//third-party
import { Stack, Typography } from '@mui/material';

//project base
//import { convertDateTimeServerToClient, formatAddress, moneyFormat } from '@base/utils/helpers';
import RouteName from '@base/components/@hanbiro/RouteName';
import ListTableCellDroplist from '@base/components/@hanbiro/List/ListTableCellDropList';

//menu
import * as keyNames from '@competitor/config/keyNames';

export const getMapColumns = () => ({
  [keyNames.KEY_NAME_COMPETITOR_CODE](col: string, data: any) {
    return <Typography noWrap>{data[col]}</Typography>;
  },
  [keyNames.KEY_NAME_COMPETITOR_NAME](col: string, data: any) {
    const name = data[col] ? data[col] : '';
    const id = data.id ?? '';
    let url = `/opportunity/competitor/${id}`;

    return (
      <Stack direction="row" spacing={0.5} alignItems="center">
        <RouteName name={name} url={url} variant="h6" />
      </Stack>
    );
  },
  [keyNames.KEY_NAME_COMPETITOR_WEBSITE](col: string, data: any) {
    return data[col] ? <Typography>{data[col]?.website}</Typography> : <em></em>;
  },
  [keyNames.KEY_NAME_COMPETITOR_PRODUCT](col: string, data: any) {
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
  [keyNames.KEY_NAME_COMPETITOR_STRENGTH](col: string, data: any) {
    return (
      <Typography noWrap sx={{ textOverflow: 'ellipsis', maxWidth: '250px' }}>
        {data[col] || ''}
      </Typography>
    );
  },
  [keyNames.KEY_NAME_COMPETITOR_WEAKNESS](col: string, data: any) {
    return (
      <Typography noWrap sx={{ textOverflow: 'ellipsis', maxWidth: '250px' }}>
        {data[col] || ''}
      </Typography>
    );
  },
  [keyNames.KEY_NAME_COMPETITOR_DESCRIPTION](col: string, data: any) {
    return (
      <Typography noWrap sx={{ textOverflow: 'ellipsis', maxWidth: '250px' }}>
        {data[col] || ''}
      </Typography>
    );
  }
});

export const isDeleteList = (groupBy: string): boolean => {
  return ['deletedCompetitor'].indexOf(groupBy) >= 0;
};
