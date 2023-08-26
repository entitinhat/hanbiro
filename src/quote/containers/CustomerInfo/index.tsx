import { Theme } from '@fullcalendar/react';
import { Box, Chip, Stack, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { Customer } from '@customer/types/interface';
import { getMapColumns } from '@customer/pages/ListPage/Helper';
import * as keyNames from '@customer/config/keyNames';
import NoData from '@base/components/@hanbiro/NoData';

// project
import RouteName from '@base/components/@hanbiro/RouteName';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import { MENU_CUSTOMER } from '@base/config/menus';
import { FieldOption } from '@settings/general/types/interface';
import { useSelectionFieldItems } from '@settings/general/hooks/useSelectionFieldItems';
import _ from 'lodash';

//menu

interface CustomerInfoProps {
  value: Customer | undefined;
  category: 'account' | 'contact' | '';
}

const CustomerInfo = (props: CustomerInfoProps) => {
  const { value, category } = props;
  const theme = useTheme();

  const [item, setItem] = useState<Customer | undefined>(undefined);
  const [typeData, setTypeData] = useState<FieldOption[]>([]);

  // const sourceKey = category === CUSTOMER_CATEGORY_ACCOUNT ? 'customer_category' : 'contact_type';
  const sourceKey = 'customer_category';

  const { data: fieldsData, isFetching: isFieldLoading } = useSelectionFieldItems(
    { keyName: sourceKey },
    { enabled: sourceKey.length > 0 }
  );

  useEffect(() => {
    if (fieldsData?.data && fieldsData?.data?.length > 0) {
      setTypeData(fieldsData?.data);
    } else {
      setTypeData([]);
    }
  }, [fieldsData]);

  useEffect(() => {
    if (value) {
      if (!_.isEqual(value, item)) {
        setItem(value);
      }
    } else {
      setItem(undefined);
    }
  }, [value]);

  let custName = item?.['name'] ? item?.['name'] : '';
  let sourceId = item?.[keyNames.KEY_NAME_CUSTOMER_ID] ? item?.[keyNames.KEY_NAME_CUSTOMER_ID] : '';
  let url = `/${MENU_CUSTOMER}/${category}/${sourceId}`;

  const type = typeData.find((v: any) => v.keyName === item?.type)?.languageKey || '';

  return (
    <>
      {!!item || <NoData icon={'users'} iconType={'custom'} />}
      {item && (
        <Stack spacing={1} p={2}>
          <Stack direction="row" alignItems="center" spacing={1}>
            {/* {getMapColumns('', {})?.[keyNames.KEY_NAME_CUSTOMER_NAME](keyNames.KEY_NAME_CUSTOMER_NAME, item)} */}
            <RouteName name={custName} url={url} variant="h6" />
            {type && (
              <Chip
                label={<SpanLang keyLang={type} />}
                size="small"
                color="warning"
                variant="outlined"
                sx={{ border: 'none', backgroundColor: theme.palette.warning.lighter }}
              />
            )}
          </Stack>
          <Stack direction="row" justifyContent={'space-between'}>
            <Stack direction="row" spacing={0.5}>
              <Typography color="secondary">Email:</Typography>
              <Box>{getMapColumns('', {})?.[keyNames.KEY_NAME_CUSTOMER_EMAIL](keyNames.KEY_NAME_CUSTOMER_EMAIL, item)}</Box>
            </Stack>
            <Stack direction="row" spacing={0.5}>
              <Typography color="secondary">Phone:</Typography>
              <Box>{getMapColumns('', {})?.[keyNames.KEY_NAME_CUSTOMER_PHONES](keyNames.KEY_NAME_CUSTOMER_PHONES, item)}</Box>
            </Stack>
          </Stack>
          <Stack direction="row" spacing={0.5}>
            <Typography color="secondary">Billing Address:</Typography>
            <Box>{getMapColumns('', {})?.[keyNames.KEY_NAME_CUSTOMER_BILL_ADDRESSES](keyNames.KEY_NAME_CUSTOMER_BILL_ADDRESSES, item)}</Box>
          </Stack>
          <Stack direction="row" spacing={0.5}>
            <Typography color="secondary">Shipping Address:</Typography>
            <Box>{getMapColumns('', {})?.[keyNames.KEY_NAME_CUSTOMER_SHIP_ADDRESSES](keyNames.KEY_NAME_CUSTOMER_SHIP_ADDRESSES, item)}</Box>
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default CustomerInfo;
