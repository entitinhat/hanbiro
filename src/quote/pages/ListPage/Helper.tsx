import React, { useMemo } from 'react';

//third-party
import { Chip, Stack, Typography } from '@mui/material';

//project base
import HanAvatar from '@base/components/@hanbiro/HanAvatar';
import { LabelValue, SearchFilter } from '@base/types/app';
import { convertDateTimeServerToClient, formatAddress, moneyFormat } from '@base/utils/helpers';
import { FormIcon } from '@base/components/@hanbiro/FormIcon';
import RouteName from '@base/components/@hanbiro/RouteName';

//menu
import { dateByOptions, searchFields } from '@quote/config/list-field/options';
import * as keyNames from '@quote/config/keyNames';
import ListTableCellDroplist from '@base/components/@hanbiro/List/ListTableCellDropList';

export const getMapColumns = () => ({
  [keyNames.KEY_NAME_QUOTE_CODE](col: string, data: any) {
    return <Typography noWrap>{data[col]}</Typography>;
  },
  [keyNames.KEY_NAME_QUOTE_NAME](col: string, data: any) {
    const name = data[col] ? data[col] : '';
    const id = data.id ?? '';
    let url = `/opportunity/quote/${id}`;

    return (
      <Stack direction="row" spacing={0.5} alignItems="center">
        <RouteName name={name} url={url} variant="h6" />
      </Stack>
    );
  },
  [keyNames.KEY_NAME_QUOTE_CUSTOMER](col: string, data: any) {
    return data[col] ? <Typography>{data[col]?.name}</Typography> : <em></em>;
  },
  [keyNames.KEY_NAME_QUOTE_PROCESS](col: string, data: any) {
    return data[col] ? data[col]?.name : <em></em>;
  },
  [keyNames.KEY_NAME_QUOTE_SALES_REP](col: string, data: any) {
    return data[col] ? data[col]?.name : <em></em>;
  },
  [keyNames.KEY_NAME_QUOTE_OPPORTUNITY](col: string, data: any) {
    return data[col] ? data[col]?.title : <em></em>;
  },
  [keyNames.KEY_NAME_QUOTE_DATE](col: string, data: any): JSX.Element | string {
    const dateString = !!data?.[col] ? convertDateTimeServerToClient({ date: data[col], humanize: false }) : null;
    return dateString ? <Typography noWrap>{dateString}</Typography> : '-';
  },
  [keyNames.KEY_NAME_QUOTE_EXPIRY_DATE](col: string, data: any): JSX.Element | string {
    const dateString = !!data?.[col] ? convertDateTimeServerToClient({ date: data[col], humanize: false }) : null;
    return dateString ? <Typography noWrap>{dateString}</Typography> : '-';
  },
  [keyNames.KEY_NAME_QUOTE_STAGE](col: string, data: any) {
    return data[col] ? data[col]?.name : <em></em>;
  },
  [keyNames.KEY_NAME_QUOTE_STATUS](col: string, data: any) {
    return data[col] ? data[col]?.name : <em></em>;
  },
  [keyNames.KEY_NAME_QUOTE_BILL_TO](col: string, data: any) {
    const fieldData = data?.[col] ?? null;
    return <Typography variant="inherit">{fieldData ? formatAddress(fieldData) : <em></em>}</Typography>;
  },
  [keyNames.KEY_NAME_QUOTE_SHIP_TO](col: string, data: any) {
    const fieldData = data?.[col] ?? null;
    return <Typography variant="inherit">{fieldData ? formatAddress(fieldData) : <em></em>}</Typography>;
  },
  [keyNames.KEY_NAME_QUOTE_ITEMS](col: string, data: any) {
    let itemData = null;
    if (Array.isArray(data.items) && data.items?.length > 0) {
      itemData = data.items.map((_ele: any) => ({ ..._ele.productItem }));
    } else {
      itemData = data.items; //object or null
    }
    return Array.isArray(itemData) ? <ListTableCellDroplist showAvatar={false} values={itemData} /> : itemData ? itemData.name : <em></em>;
  },
  [keyNames.KEY_NAME_QUOTE_SUMMARY](col: string, data: any) {
    const amount = data.totalAmount || 0;
    const currency = data.currency;
    return (
      <Typography>
        {currency}
        {moneyFormat(amount)}
      </Typography>
    );
  }

  //default View
  // [keyNames.KEY_NAME_QUOTE_UPDATED_BY](col: string, data: any) {
  //   const createdBy = data[col] ?? null;
  //   return (
  //     <Stack spacing={1.5} sx={{ minWidth: 160 }} direction="row" alignItems="center">
  //       <HanAvatar key={createdBy.id} name={createdBy.name} size="sm" />
  //       <Stack spacing={0}>
  //         <Typography variant="body1" noWrap>
  //           {createdBy.name}
  //         </Typography>
  //         {data.updatedAt && (
  //           <Typography variant="caption" color="textSecondary" noWrap>
  //             {convertDateTimeServerToClient({ date: data.updatedAt, isTime: true, humanize: true })}
  //           </Typography>
  //         )}
  //       </Stack>
  //     </Stack>
  //   );
  // },
  // [keyNames.KEY_NAME_QUOTE_CREATED_BY](col: string, data: any) {
  //   const createdBy = data[col] ?? null;
  //   return (
  //     <Stack spacing={1.5} sx={{ minWidth: 160 }} direction="row" alignItems="center">
  //       <HanAvatar key={createdBy.id} name={createdBy.name} size="sm" />
  //       <Stack spacing={0}>
  //         <Typography variant="body1" noWrap>
  //           {createdBy.name}
  //         </Typography>
  //         {data.createdAt && (
  //           <Typography variant="caption" color="textSecondary" noWrap>
  //             {convertDateTimeServerToClient({ date: data.createdAt, isTime: true, humanize: true })}
  //           </Typography>
  //         )}
  //       </Stack>
  //     </Stack>
  //   );
  // }
});

export const isDeleteList = (groupBy: string): boolean => {
  return ['deletedQuote'].indexOf(groupBy) >= 0;
};
