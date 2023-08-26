import MainCard from '@base/components/App/MainCard';
import useDevice from '@base/hooks/useDevice';
import { Grid, ListItem, useTheme } from '@mui/material';
import { useState } from 'react';

import CompareTable from '@vora-works/containers/CompareTables';
import PricingPlan from '@vora-works/containers/PricingPlan';

interface PricingProps {}
function Pricing(props: PricingProps) {
  const [priceType, setPriceType] = useState<'annually' | 'monthly'>('monthly');
  const theme = useTheme();
  const { isMobile } = useDevice();
  const handleChangePriceType = (type: 'annually' | 'monthly') => {
    setPriceType(type);
  };
  return (
    <MainCard
      border={!isMobile}
      sx={{
        background: theme.palette.background.paper,
        p: 0,
        border: 0,
        '& .MuiCardContent-root': {
          p: 0
        }
      }}
    >
      <PricingPlan onChange={handleChangePriceType} priceType={priceType} />
      <CompareTable priceType={priceType} />
    </MainCard>
  );
}
export default Pricing;
