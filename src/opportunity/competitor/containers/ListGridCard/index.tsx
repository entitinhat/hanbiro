import React, { useMemo } from 'react';

//third-party
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { Box, Card, Checkbox, Divider, Grid, InputLabel, Stack, Typography, useTheme } from '@mui/material';

//project base
import { ListGridCardProps as BaseListGridCardProps } from '@base/components/@hanbiro/List/ListGrid';
import MainCard from '@base/components/App/MainCard';
import { MENU_OPPORTUNITY, MENU_COMPETITOR } from '@base/config/menus';
import ListTableCellDroplist from '@base/components/@hanbiro/List/ListTableCellDropList';
import RouteName from '@base/components/@hanbiro/RouteName';

//menu
import { Competitor } from '@competitor/types/interfaces';
import * as keyNames from '@competitor/config/keyNames';

interface ListGridCardProps extends BaseListGridCardProps {
  data: Competitor;
  isSplitMode: boolean;
}

const ListGridCard = (props: ListGridCardProps) => {
  const { data, sx, isChecked, onChecked, isSplitMode } = props;
  const { t } = useTranslation();

  const url = `/${MENU_OPPORTUNITY}/${MENU_COMPETITOR}/${data.id}`;

  const theme = useTheme();
  const bgColor = theme.palette.background.paper;

  const CardMemo = useMemo(() => {
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
                    onClick={() => onChecked && onChecked(data[keyNames.KEY_NAME_COMPETITOR_ID])}
                  />
                  <RouteName name={data[keyNames.KEY_NAME_COMPETITOR_NAME]} url={url} />
                </Stack>
              </Box>
            </Box>
            <Divider />
            <Box sx={{ pt: 1.5, pb: 1.5, px: 2 }}>
              <Card elevation={0} sx={{ bgColor: bgColor, height: '100%', minHeight: 0 }}>
                <Stack spacing={1}>
                  {isSplitMode ? (
                    <>
                      <Stack spacing={2}>
                        <Grid container>
                          <Grid item xs={6} lg={6}>
                            <Typography>{data[keyNames.KEY_NAME_COMPETITOR_WEBSITE]?.website}</Typography>
                          </Grid>
                          <Grid item xs={6} lg={6}>
                            <ListTableCellDroplist showAvatar={false} values={data[keyNames.KEY_NAME_COMPETITOR_PRODUCT]} />
                          </Grid>
                        </Grid>
                      </Stack>
                    </>
                  ) : (
                    <>
                      <Stack spacing={2}>
                        <Grid container>
                          <Grid item xs={6} lg={6}>
                            <Stack direction="row" spacing={0.5}>
                              <InputLabel>Website: </InputLabel>
                              <Typography>{data[keyNames.KEY_NAME_COMPETITOR_WEBSITE]?.website}</Typography>
                            </Stack>
                          </Grid>
                          <Grid item xs={6} lg={6}>
                            <Stack direction="row" spacing={0.5}>
                              <InputLabel>Product: </InputLabel>
                              <ListTableCellDroplist showAvatar={false} values={data[keyNames.KEY_NAME_COMPETITOR_PRODUCT]} />
                            </Stack>
                          </Grid>
                        </Grid>
                        <Stack direction="row" spacing={0.5}>
                          <InputLabel>Strength: </InputLabel>
                          <Typography>{data[keyNames.KEY_NAME_COMPETITOR_STRENGTH]}</Typography>
                        </Stack>
                        <Stack direction="row" spacing={0.5}>
                          <InputLabel>Weakness: </InputLabel>
                          <Typography>{data[keyNames.KEY_NAME_COMPETITOR_WEAKNESS]}</Typography>
                        </Stack>
                      </Stack>
                    </>
                  )}
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
                  onClick={() => onChecked && onChecked(data[keyNames.KEY_NAME_COMPETITOR_ID])}
                />
                <RouteName name={data[keyNames.KEY_NAME_COMPETITOR_NAME]} url={url} />
              </Stack>
            </Stack>
            <Stack direction={'row'} justifyContent="space-between">
              <Typography>{data[keyNames.KEY_NAME_COMPETITOR_WEBSITE]?.website || <em>(none)</em>}</Typography>
              <ListTableCellDroplist showAvatar={false} values={data[keyNames.KEY_NAME_COMPETITOR_PRODUCT]} />
            </Stack>
          </Stack>
        )}
      </MainCard>
    );
  }, [data, isChecked, onChecked]);

  return <>{CardMemo}</>;
};

export default ListGridCard;
