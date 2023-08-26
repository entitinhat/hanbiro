import React from 'react';
import { ListGridCardProps as BaseListGridCardProps } from '@base/components/@hanbiro/List/ListGrid';
import { AvatarGroup, Box, Card, Checkbox, Chip, Divider, Grid, IconButton, InputLabel, Stack, Typography, useTheme } from '@mui/material';
import { Quote } from '@quote/types/interfaces';
import { AccessAlarm, LocalShippingOutlined, PlaceOutlined } from '@mui/icons-material';
import { Link as RouteLink } from 'react-router-dom';
import { ClockCircleOutlined, MoreOutlined } from '@ant-design/icons';
import HanAvatar from '@base/components/@hanbiro/HanAvatar';
import { User } from '@base/types/user';
import { convertDateTimeServerToClient, moneyFormat } from '@base/utils/helpers';
import { MENU_QUOTE } from '@base/config/menus';
import MainCard from '@base/components/App/MainCard';
import RouteName from '@base/components/@hanbiro/RouteName';
import * as keyNames from '@quote/config/keyNames';
import ListTableCellDroplist from '@base/components/@hanbiro/List/ListTableCellDropList';

interface ListGridCardProps extends BaseListGridCardProps {
  data: Quote;
  isSplitMode: boolean;
}

const ListGridCard = (props: ListGridCardProps) => {
  const { data, isSplitMode, sx, isChecked, onChecked } = props;
  const theme = useTheme();

  let url = `/${MENU_QUOTE}/${data[keyNames.KEY_NAME_QUOTE_ID]}`;
  const quoteDate = data[keyNames.KEY_NAME_QUOTE_DATE]
    ? convertDateTimeServerToClient({ date: data[keyNames.KEY_NAME_QUOTE_DATE].toString(), humanize: true, isTime: true })
    : null;

  let itemData = null;
  if (Array.isArray(data[keyNames.KEY_NAME_QUOTE_ITEMS]) && data[keyNames.KEY_NAME_QUOTE_ITEMS]?.length > 0) {
    itemData = data[keyNames.KEY_NAME_QUOTE_ITEMS].map((_ele: any) => ({ ..._ele.productItem }));
  } else {
    itemData = data[keyNames.KEY_NAME_QUOTE_ITEMS]; //object or null
  }

  return (
    <MainCard
      content={false}
      boxShadow={isSplitMode ? false : true}
      sx={{ ...sx, ...(isSplitMode && { borderRadius: 0, borderBottom: `1px solid ${theme.palette.divider}` }) }}
      border={isSplitMode ? false : true}
    >
      {!isSplitMode && (
        <>
          <Box sx={{ pl: 1, pb: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <Stack direction="row" spacing={0.5} alignItems="center" sx={{ width: '100%' }}>
                <Checkbox
                  sx={{ pr: 1 }}
                  checked={isChecked ?? false}
                  onClick={() => onChecked && onChecked(data[keyNames.KEY_NAME_QUOTE_ID])}
                />
                <RouteName name={data[keyNames.KEY_NAME_QUOTE_NAME]} url={url} />
              </Stack>
            </Box>
          </Box>
          <Divider />
          <Box sx={{ pt: 1.5, pb: 1.5, px: 2 }}>
            <Card elevation={0} sx={{ bgColor: theme.palette.background.paper, height: '100%', minHeight: 0 }}>
              <Stack spacing={2}>
                <Grid container>
                  <Grid item xs={6} lg={6}>
                    <Stack direction="row" spacing={0.5}>
                      <InputLabel>Quote ID: </InputLabel>
                      <Typography>{data[keyNames.KEY_NAME_QUOTE_CODE]}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={6} lg={6}>
                    <Stack direction="row" spacing={0.5}>
                      <InputLabel>Customer: </InputLabel>
                      <Typography>{data[keyNames.KEY_NAME_QUOTE_CUSTOMER]?.name}</Typography>
                    </Stack>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={6} lg={6}>
                    <Stack direction="row" spacing={0.5}>
                      <InputLabel>Quote Date: </InputLabel>
                      <Typography>{quoteDate || <em>(none)</em>}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={6} lg={6}>
                    <Stack direction="row" spacing={0.5}>
                      <InputLabel>Item: </InputLabel>
                      {Array.isArray(itemData) ? (
                        <ListTableCellDroplist showAvatar={false} values={itemData} />
                      ) : itemData ? (
                        itemData.name
                      ) : (
                        <em>(none)</em>
                      )}
                    </Stack>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={6} lg={6}>
                    <Stack direction="row" spacing={0.5}>
                      <InputLabel>Total Amount: </InputLabel>
                      <Typography>
                        {data.currency}
                        {moneyFormat(data.totalAmount || 0)}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={6} lg={6}>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <InputLabel>Sales Rep: </InputLabel>
                      <Typography>{data[keyNames.KEY_NAME_QUOTE_SALES_REP]?.fullName || <em>(none)</em>}</Typography>
                    </Stack>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={6} lg={6}>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <InputLabel>Stage: </InputLabel>
                      {data[keyNames.KEY_NAME_QUOTE_STAGE] ? (
                        <Chip label={data[keyNames.KEY_NAME_QUOTE_STAGE]?.name} color="secondary" />
                      ) : (
                        <em>(none)</em>
                      )}
                    </Stack>
                  </Grid>
                  <Grid item xs={6} lg={6}>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <InputLabel>Status: </InputLabel>
                      {data[keyNames.KEY_NAME_QUOTE_STATUS] ? (
                        <Chip label={data[keyNames.KEY_NAME_QUOTE_STATUS]?.name} color="secondary" />
                      ) : (
                        <em>(none)</em>
                      )}
                    </Stack>
                  </Grid>
                </Grid>
              </Stack>
            </Card>
          </Box>
        </>
      )}
      {isSplitMode && (
        <Stack spacing={1.5}>
          <Stack direction={'row'} justifyContent="space-between">
            <Stack direction="row" alignItems="center">
              <Checkbox
                sx={{ pl: 0 }}
                checked={isChecked ?? false}
                onClick={() => onChecked && onChecked(data[keyNames.KEY_NAME_QUOTE_ID])}
              />
              <RouteName name={data[keyNames.KEY_NAME_QUOTE_NAME]} url={url} />
            </Stack>
            <Typography>
              {data.currency}
              {moneyFormat(data.totalAmount || 0)}
            </Typography>
          </Stack>
          <Stack direction={'row'} justifyContent="space-between">
            <Typography>{data[keyNames.KEY_NAME_QUOTE_CODE]}</Typography>
            <Typography>{quoteDate || <em>(none)</em>}</Typography>
          </Stack>
          <Stack direction={'row'} justifyContent="space-between" alignItems={'center'}>
            <Stack direction={'row'} spacing={0.5}>
              <Chip label={data[keyNames.KEY_NAME_QUOTE_STAGE]?.name || 'none'} color="secondary" size="small" />
              <Chip label={data[keyNames.KEY_NAME_QUOTE_STATUS]?.name || 'none'} color="lime" size="small" />
            </Stack>
            <Typography>{data[keyNames.KEY_NAME_QUOTE_SALES_REP]?.fullName || <em>(none)</em>}</Typography>
          </Stack>
        </Stack>
      )}
    </MainCard>
  );
};

export default ListGridCard;
