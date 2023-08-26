import MainCard from '@base/components/App/MainCard';
import useDevice from '@base/hooks/useDevice';
import { alpha, Grid, ListItem, Stack, Switch, Typography, useTheme } from '@mui/material';

interface PricingPlanProps {
  priceType: 'annually' | 'monthly';
  onChange: (value: 'annually' | 'monthly') => void;
}
function PricingPlan(props: PricingPlanProps) {
  const { priceType = 'monthly', onChange } = props;
  const theme = useTheme();
  const { isMobile } = useDevice();
  return (
    <MainCard sx={{ marginBottom: 1, background: alpha(theme.palette.primary.lighter, 0.3), border: 0 }}>
      <Stack spacing={0.5}>
        <Typography textAlign="center" variant="h2" color="primary">
          Pricing Plans
        </Typography>
        <Typography textAlign="center" variant="body2" component="h4">
          Affordable for everyone
        </Typography>
        <Stack direction="row" justifyContent="center" alignItems="center">
          <Typography color={priceType == 'monthly' ? 'primary' : 'secondary'} component="h4">
            Bill Monthly
          </Typography>
          <Switch
            checked={priceType == 'monthly' ? false : true}
            color="primary"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              if (event.target.checked) {
                onChange('annually');
              } else {
                onChange('monthly');
              }
            }}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          <Typography color={priceType == 'annually' ? 'primary' : 'secondary'} component="h4">
            Bill Annually
          </Typography>
        </Stack>
      </Stack>
    </MainCard>
  );
}
export default PricingPlan;
