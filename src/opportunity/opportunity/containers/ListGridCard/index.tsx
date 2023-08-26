import React, { useMemo } from 'react';

//third-party
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { Box, Card, Checkbox, Chip, Divider, Grid, InputLabel, Stack, Typography, useTheme } from '@mui/material';
import { useRecoilValue } from 'recoil';

//project base
import { ListGridCardProps as BaseListGridCardProps } from '@base/components/@hanbiro/List/ListGrid';
import MainCard from '@base/components/App/MainCard';
import { MENU_OPPORTUNITY } from '@base/config/menus';
import ListTableCellDroplist from '@base/components/@hanbiro/List/ListTableCellDropList';
import RouteName from '@base/components/@hanbiro/RouteName';
import { convertDateTimeServerToClient } from '@base/utils/helpers';
import { Currency } from '@base/types/common';
import { defaultCurrencySelector } from '@base/store/selectors/app';

//menu
import { Opportunity } from '@opportunity/types/interfaces';
import * as keyNames from '@opportunity/config/keyNames';

interface ListGridCardProps extends BaseListGridCardProps {
  data: Opportunity;
  isSplitMode: boolean;
}

const ListGridCard = (props: ListGridCardProps) => {
  const { data, sx, isChecked, onChecked, isSplitMode } = props;
  const { t } = useTranslation();
  const defaultCurrency: Currency = useRecoilValue(defaultCurrencySelector);
  const url = `/${MENU_OPPORTUNITY}/${MENU_OPPORTUNITY}/${data.id}`;
  const theme = useTheme();
  const bgColor = theme.palette.background.paper;

  const CardMemo = useMemo(() => {
    const companyAccount =
      data[keyNames.KEY_NAME_OPPORTUNITY_CUSTOMER]?.category === 'CATEGORY_ACCOUNT'
        ? data[keyNames.KEY_NAME_OPPORTUNITY_CUSTOMER]?.parentAccount
        : data[keyNames.KEY_NAME_OPPORTUNITY_CUSTOMER]?.account;

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
                    onClick={() => onChecked && onChecked(data[keyNames.KEY_NAME_OPPORTUNITY_ID])}
                  />
                  <RouteName name={data[keyNames.KEY_NAME_OPPORTUNITY_TITLE]} url={url} />
                </Stack>
              </Box>
            </Box>
            <Divider />
            <Box sx={{ pt: 1.5, pb: 1.5, px: 2 }}>
              <Card elevation={0} sx={{ bgColor: bgColor, height: '100%', minHeight: 0 }}>
                <Stack spacing={1}>
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={0.5} alignItems={'center'}>
                      <InputLabel>Customer: </InputLabel>
                      <Typography>{data[keyNames.KEY_NAME_OPPORTUNITY_CUSTOMER]?.name || ''}</Typography>
                      {companyAccount && <Chip color="secondary" size="small" label={companyAccount.name} />}
                    </Stack>
                    <Grid container>
                      <Grid item xs={6} lg={6}>
                        <Stack direction="row" spacing={0.5}>
                          <InputLabel>Process: </InputLabel>
                          <Typography>{data[keyNames.KEY_NAME_OPPORTUNITY_PROCESS]?.name || ''}</Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={6} lg={6}>
                        <Stack direction="row" spacing={0.5} alignItems={'center'}>
                          <InputLabel>Stage: </InputLabel>
                          {data[keyNames.KEY_NAME_OPPORTUNITY_STAGE] && (
                            <Chip color="secondary" size="small" label={data[keyNames.KEY_NAME_OPPORTUNITY_STAGE]?.name || ''} />
                          )}
                        </Stack>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={6} lg={6}>
                        <Stack direction="row" spacing={0.5}>
                          <InputLabel>Estimated Revenue: </InputLabel>
                          <Typography>
                            {defaultCurrency.currencySymbol}
                            {data[keyNames.KEY_NAME_OPPORTUNITY_ESTIMATED_REVENUE] || 0}
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={6} lg={6}>
                        <Stack direction="row" spacing={0.5}>
                          <InputLabel>Probability: </InputLabel>
                          <Typography>{data[keyNames.KEY_NAME_OPPORTUNITY_WIN_PROBABILITY] || 0}%</Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={6} lg={6}>
                        <Stack direction="row" spacing={0.5}>
                          <InputLabel>Weighted Amount: </InputLabel>
                          <Typography>
                            {defaultCurrency.currencySymbol}
                            {data[keyNames.KEY_NAME_OPPORTUNITY_WEIGHTED_AMOUNT] || 0}
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={6} lg={6}>
                        <Stack direction="row" spacing={0.5}>
                          <InputLabel>Closed Date: </InputLabel>
                          <Typography>
                            {data[keyNames.KEY_NAME_OPPORTUNITY_CLOSE_DATE]
                              ? convertDateTimeServerToClient({ date: data[keyNames.KEY_NAME_OPPORTUNITY_CLOSE_DATE] })
                              : ''}
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Stack>
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
                  onClick={() => onChecked && onChecked(data[keyNames.KEY_NAME_OPPORTUNITY_ID])}
                />
                <RouteName name={data[keyNames.KEY_NAME_OPPORTUNITY_TITLE]} url={url} />
              </Stack>
            </Stack>
            <Stack direction={'row'} justifyContent="space-between" alignItems={'center'}>
              <Stack spacing={0.5}>
                <Typography>{data[keyNames.KEY_NAME_OPPORTUNITY_CUSTOMER]?.name || ''}</Typography>
                {companyAccount && (
                  <Typography color="grey" fontSize={12}>
                    {companyAccount.name}
                  </Typography>
                )}
              </Stack>
              <Typography>
                {defaultCurrency.currencySymbol}
                {data[keyNames.KEY_NAME_OPPORTUNITY_ESTIMATED_REVENUE] || 0}
              </Typography>
            </Stack>
            <Stack direction={'row'} justifyContent="space-between" alignItems={'center'}>
              {data[keyNames.KEY_NAME_OPPORTUNITY_STAGE] && (
                <Chip color="secondary" size="small" label={data[keyNames.KEY_NAME_OPPORTUNITY_STAGE]?.name || ''} />
              )}
              <Typography>{data[keyNames.KEY_NAME_OPPORTUNITY_WIN_PROBABILITY] || 0}%</Typography>
            </Stack>
          </Stack>
        )}
      </MainCard>
    );
  }, [data, isChecked, onChecked]);

  return <>{CardMemo}</>;
};

export default ListGridCard;
