import NumberField from '@base/components/@hanbiro/NumberField';
import { defaultCurrencySelector } from '@base/store/selectors/app';
import { moneyFormat } from '@base/utils/helpers';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import LinearProgressWithLabel from '@opportunity/components/LinearProgressWithLabel';
import React from 'react';
import { useRecoilValue } from 'recoil';
import * as keyNames from '@opportunity/config/keyNames';

interface OptInsightProps {
  layoutData: any;
}

const OptInsight = (props: OptInsightProps) => {
  const { layoutData } = props;
  const theme = useTheme();

  //get Value
  const basicFields = layoutData?.layout?.data?.[0]?.children ?? [];
  const insightWinProbabilityField = basicFields?.find((_field: any) => _field?.keyName === keyNames.KEY_NAME_OPPORTUNITY_WIN_PROBABILITY);
  const insightEstimatedRevenueField = basicFields?.find(
    (_field: any) => _field?.keyName === keyNames.KEY_NAME_OPPORTUNITY_INSIGHT_ESTIMATED_REVENUE
  );
  //get default currency and set prefix
  const defaultCurrency = useRecoilValue(defaultCurrencySelector);

  const insightEstimatedRevenueValue = insightEstimatedRevenueField?.data?.moneyValue || 0;
  const insightEstimatedRevenueCurrency = insightEstimatedRevenueField?.data?.fCurrency?.code || defaultCurrency.code;

  return (
    <Stack spacing={2} ml={2} mt={2} mb={2}>
      <Box>
        <Typography fontWeight={500}>Win Probability</Typography>
        <Box sx={{ width: '100%' }}>
          <LinearProgressWithLabel value={insightWinProbabilityField?.data || 0} />
        </Box>
      </Box>
      <Box>
        <Typography color={theme.palette.warning[500]} fontWeight={500}>
          Estimated Revenue
        </Typography>
        <Box sx={{ width: '100%' }}>
          <Typography sx={{ color: `${theme.palette.warning.main}` }}>
            {moneyFormat(insightEstimatedRevenueValue, insightEstimatedRevenueCurrency)}
          </Typography>
        </Box>
      </Box>
    </Stack>
  );
};

export default OptInsight;
