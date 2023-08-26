import {round} from "lodash";
import {Stack, Typography} from "@mui/material";
import {ArrowDownward, ArrowUpward} from "@mui/icons-material";
import React from "react";
import { useTranslation } from "react-i18next";

interface TrendItemProps {
  title: string;
  newValue: number;
  oldValue: number;
  newValueView?: number|string;
  oldValueView?: number|string;
}

const TrendItem = (props: TrendItemProps) => {
  const {
    title,
    newValue = 0,
    oldValue = 0,
    ...restProps
  } = props;
  const { t } = useTranslation()

  let {
    newValueView = 0,
    oldValueView = 0
  } = restProps;

  const percent = oldValue > 0 ? round(((newValue * 100) / oldValue) - 100, 2) : (newValue > 0 ? 100 : 0);

  const isUp = percent > 0;
  const isDown = percent < 0;

  if (newValueView == 0) {
    newValueView = newValue
  }
  if (oldValueView == 0) {
    oldValueView = oldValue
  }

  return (
    <Stack direction="column" justifyContent="center" p="20px" width="100%">
      <Typography variant="overline" sx={{
        '&.MuiTypography-overline': {
          fontWeight: 'bold'
        }
      }}>{t(title)}</Typography>
      <Stack direction="row" alignItems="flex-end">
        <Typography variant="h4">{newValueView || 0}</Typography>
        <Typography variant="h6" ml="2px" color={isUp ? 'success' : (isDown ? 'error' : 'secondary')}>
          {Math.abs(percent)}%
          {
            isDown && <ArrowDownward sx={{width: '14px', height: '14px'}} fontSize="small"/>
          }
          {
            isUp && <ArrowUpward sx={{width: '14px', height: '14px'}} fontSize="small"/>
          }
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="flex-end">
        <Typography variant="body1">{t('ncrm_dashboard_chart_field_last')} :</Typography>
        <Typography variant="body2" color="secondary" ml="2px">{oldValueView || 0}</Typography>
      </Stack>
    </Stack>
  );
};

export default TrendItem;