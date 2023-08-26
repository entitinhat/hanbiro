import RouteName from '@base/components/@hanbiro/RouteName';
import { convertDateTimeServerToClient, moneyFormat } from '@base/utils/helpers';
import { Chip, Stack, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';

const dummyData = {
  name: 'SO-000001',
  role: 'New',
  estimatedAmount: '40000',
  orderDate: new Date()
};
interface SalesOrderProps {
  value: any;
}

const SalesOrder = (props: SalesOrderProps) => {
  const { value } = props;
  const theme = useTheme();
  const [item, setItem] = useState<any>(undefined);
  const url = `/quote`;

  useEffect(() => {
    // setItem(value);
    setItem(dummyData);
  }, [item]);

  return (
    <>
      {item && (
        <Stack spacing={1}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <RouteName name={item.name} url={url} />
            <Chip
              label="Budget Holder"
              size="small"
              variant="outlined"
              sx={{ border: 'none', backgroundColor: theme.palette.secondary.lighter }}
            />
          </Stack>
          <Stack direction="row" spacing={6}>
            <Stack direction="row">
              <Typography color="secondary" mr={0.5}>
                Estimated Amount:
              </Typography>
              <Typography>{moneyFormat(item.estimatedAmount, '$')}</Typography>
            </Stack>
            <Stack direction="row">
              <Typography color="secondary" mr={0.5}>
                Created Date:
              </Typography>
              <Typography>{convertDateTimeServerToClient({ date: item.orderDate, humanize: true })}</Typography>
            </Stack>
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default SalesOrder;
