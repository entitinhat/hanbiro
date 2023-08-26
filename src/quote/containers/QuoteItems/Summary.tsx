import { useEffect, useState } from 'react';

//third-party
import { KeyboardArrowDown } from '@mui/icons-material';
import { Button, Divider, InputLabel, Stack, TextField, Typography } from '@mui/material';
import { Grid } from '@mui/material';
import { useRecoilValue } from 'recoil';

//project base
import Dropdown from '@base/components/@hanbiro/Dropdown';
import MuiCheckbox from '@base/components/@hanbiro/MuiCheckbox';
import MainCard from '@base/components/App/MainCard';
import { defaultCurrencySelector } from '@base/store/selectors/app';
import { moneyFormat } from '@base/utils/helpers';

interface SummaryProps {
  //items: Item[];
  value?: any;
  onChange?: (newVal: any) => void;
}

const Summary = (props: SummaryProps) => {
  const { value, onChange } = props;
  const defaultCurrency = useRecoilValue(defaultCurrencySelector);
  const defaultSummary = {
    currency: defaultCurrency,
    totalItems: 0,
    netAmount: 0,
    totalDiscount: 0,
    totalLoyalty: 0,
    loyalty: {
      point: 0,
      isPointUseMax: true,
      coupon: 0,
      stamp: 0,
      isStampNotUse: true
    },
    subTotal: 0,
    shippingCharge: {
      amount: 0,
      isApplyTax: true
    },
    totalShippingCharge: 0,
    totalTax: 0,
    taxUnit: 10, //%
    roundOff: 0,
    totalAmount: 0
  };
  //state
  const [summary, setSummary] = useState<any>(defaultSummary);

  //items change
  // useEffect(() => {
  //   let totalAmount = 0;
  //   items.map((_ele: any) => {
  //     totalAmount += _ele.orderedAmount;
  //   });
  //   setSummary({ ...summary, totalItems: items.length, netAmount: totalAmount, totalAmount });
  // }, [items]);

  //init
  useEffect(() => {
    if (JSON.stringify(value) !== JSON.stringify(summary)) {
      setSummary(value);
    }
  }, [value]);

  //console.log('summary', summary);
  //render
  return (
    <Grid container>
      <Grid item xs={12} md={6} lg={6}>
        <MainCard sx={{ mr: 0.5 }}>
          <Stack spacing={1}>
            <Stack direction={'row'} justifyContent={'space-between'}>
              <InputLabel>Items: {summary.totalItems}</InputLabel>
              <Typography>
                {summary.currency.currencySymbol}
                {moneyFormat(summary.netAmount)}
              </Typography>
            </Stack>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems="center">
              <InputLabel>Total Discount</InputLabel>
              <Stack direction={'row'} alignItems="center">
                <Button color="secondary" size="small">
                  Change
                </Button>
                <Typography color="error.main">
                  -{summary.currency.currencySymbol}
                  {moneyFormat(summary.totalDiscount)}
                </Typography>
              </Stack>
            </Stack>
            {/* <Stack direction={'row'} justifyContent={'space-between'}>
              <InputLabel>Loyalty</InputLabel>
              <Stack direction={'row'} alignItems="center">
                <Typography color="error.main">
                  -{summary.currency.currencySymbol}
                  {moneyFormat(summary.totalLoyalty)}
                </Typography>
              </Stack>
            </Stack>
            <Stack>
              <MainCard
                sx={{
                  '& .MuiCardContent-root': {
                    padding: 0
                  }
                }}
              >
                <Stack>
                  <Stack sx={{ p: 1.5 }}>
                    <Stack direction={'row'} justifyContent={'space-between'} alignItems="center">
                      <InputLabel>Points</InputLabel>
                      <Stack direction={'row'} alignItems="center">
                        <Typography color="error.main">{summary.currency.currencySymbol}</Typography>
                        <TextField value={summary.loyalty.point} inputProps={{ style: { color: 'red', textAlign: 'right' } }} />
                      </Stack>
                    </Stack>
                    <Stack direction={'row'} justifyContent={'space-between'} alignItems="center">
                      <Stack direction={'row'}>
                        <Typography color="primary.main">1,000</Typography>/<InputLabel>3000</InputLabel>
                      </Stack>
                      <Stack direction={'row'} alignItems="center">
                        <MuiCheckbox value={true} label="Use maximum" labelPlacement="end" />
                      </Stack>
                    </Stack>
                  </Stack>
                  <Divider />
                  <Stack direction={'row'} justifyContent={'space-between'} sx={{ p: 1.5 }}>
                    <InputLabel>Coupon</InputLabel>
                    <Stack direction={'row'} alignItems="center">
                      <Button color="secondary" size="small">
                        Change
                      </Button>
                      <Typography color="error.main">
                        -{summary.currency.currencySymbol}
                        {moneyFormat(summary.loyalty.coupon)}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Divider />
                  <Stack sx={{ p: 1.5 }}>
                    <Stack direction={'row'} justifyContent={'space-between'} alignItems="center">
                      <InputLabel>Stamps</InputLabel>
                      <Typography color="error.main">
                        -{summary.currency.currencySymbol}
                        {moneyFormat(summary.loyalty.stamp)}
                      </Typography>
                    </Stack>
                    <Stack direction={'row'} justifyContent={'space-between'} alignItems="center">
                      <Typography color="primary.main">3% Off</Typography>
                      <MuiCheckbox value={true} label="Do not use" labelPlacement="end" />
                    </Stack>
                  </Stack>
                </Stack>
              </MainCard>
            </Stack> */}
          </Stack>
        </MainCard>
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <MainCard sx={{ ml: 0.5 }}>
          <Stack spacing={1}>
            <Stack direction={'row'} justifyContent={'space-between'}>
              <InputLabel>Sub Total</InputLabel>
              <Typography>
                {summary.currency.currencySymbol}
                {moneyFormat(summary.subTotal)}
              </Typography>
            </Stack>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems="center">
              <Stack>
                <Stack direction={'row'} spacing={0.5} alignItems="center">
                  <InputLabel>Shipping Charges</InputLabel>
                  <TextField value={summary.shippingCharge.amount} inputProps={{ style: { textAlign: 'right' } }} />
                </Stack>
                <MuiCheckbox value={true} label="Apply tax" labelPlacement="end" />
              </Stack>
              <Typography>
                {summary.currency.currencySymbol}
                {moneyFormat(summary.totalShippingCharge)}
              </Typography>
            </Stack>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems="center">
              <Stack>
                <InputLabel>Tax (10%)</InputLabel>
                <Stack direction={'row'} alignItems="center">
                  <InputLabel>Change</InputLabel>
                  <Dropdown icon={<KeyboardArrowDown fontSize="small" color="secondary" />} items={[{ label: '10%', value: '10' }]} />
                </Stack>
              </Stack>
              <Typography>
                {summary.currency.currencySymbol}
                {moneyFormat(summary.totalTax)}
              </Typography>
            </Stack>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems="center">
              <InputLabel>Round Off</InputLabel>
              <Typography>
                {summary.currency.currencySymbol}
                {moneyFormat(summary.roundOff)}
              </Typography>
            </Stack>
            <Divider />
            <Stack direction={'row'} justifyContent={'space-between'} alignItems="center" sx={{ pt: 1 }}>
              <InputLabel>Total Amount</InputLabel>
              <Typography>
                {summary.currency.currencySymbol}
                {moneyFormat(summary.totalAmount)}
              </Typography>
            </Stack>
          </Stack>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default Summary;
