import MainCard from '@base/components/App/MainCard';
import { defaultCurrencySelector } from '@base/store/selectors/app';
import { moneyFormat } from '@base/utils/helpers';
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';
import { Item } from '@product/item/types/item';
import { useRecoilValue } from 'recoil';

interface SummaryProps {
  items: Item[];
  //value: any //TODO
  //onChange: (val: any) => void; //TODO
}

const Summary = (props: SummaryProps) => {
  const { items = [] } = props;
  const defaultCurrency = useRecoilValue(defaultCurrencySelector);
  let totalAmount = 0;
  items.map((_ele: any) => {
    totalAmount += _ele.orderedAmount;
  });

  return (
    <MainCard>
      <Grid container>
        <Grid item xs={8} lg={8} sx={{ textAlign: 'right' }}>
          <Typography variant="subtitle1">Total Amount</Typography>
        </Grid>
        <Grid item xs={4} lg={4} sx={{ textAlign: 'right' }}>
          <Typography>{moneyFormat(totalAmount, defaultCurrency.code)}</Typography>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default Summary;
