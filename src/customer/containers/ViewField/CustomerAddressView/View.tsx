import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import { CommonViewProps } from '@base/containers/ViewField/Common/interface';
import { default as TextView } from '@base/containers/ViewField/Text/View';
import { Customer } from '@customer/types/interface';
import * as keyNames from '@customer/config/keyNames';
import { formatAddress } from '@base/utils/helpers/generalUtils';

interface ViewProps extends CommonViewProps {
  value?: any;
  componentProps?: {
    [x: string]: any;
  };
}

const View = (props: ViewProps) => {
  const { t } = useTranslation();

  const { value, componentProps } = props;

  return (
    <Box>
      <Typography color="secondary">Billing Address</Typography>
      <Typography variant="inherit">
        {value?.[keyNames?.KEY_NAME_CUSTOMER_BILL_ADDRESSES] ? (
          formatAddress(value?.[keyNames?.KEY_NAME_CUSTOMER_BILL_ADDRESSES])
        ) : (
          <em>(none)</em>
        )}
      </Typography>

      <Typography color="secondary">Shipping Address</Typography>
      <Typography variant="inherit">
        {value?.[keyNames?.KEY_NAME_CUSTOMER_SHIP_ADDRESSES] ? (
          formatAddress(value?.[keyNames?.KEY_NAME_CUSTOMER_SHIP_ADDRESSES])
        ) : (
          <em>(none)</em>
        )}
      </Typography>
    </Box>
  );
};

export default View;
