import React from 'react';
import { useCustomerAssignContacts } from '@customer/hooks/useCustomerAssignContact';
import { CUSTOMER_CATEGORY_CONTACT, CUSTOMER_CATEGORY_ENUM } from '@customer/config/constants';
import { Box, Chip, Divider, Grid, Stack, Typography } from '@mui/material';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import { getMapColumns } from '@customer/pages/ListPage/Helper';
import * as keyNames from '@customer/config/keyNames';
import NoData from '@base/components/@hanbiro/NoData';

interface ContactsProps {
  menuSourceId: string;
}

function ContactsCard(props: any) {
  const { data } = props;
  return (
    <Box>
      <Stack direction={'row'} p={1}>
        {/* <Typography mr={1}>{data?.name}</Typography> */}
        {getMapColumns('CATEGORY_CONTACT')[keyNames?.KEY_NAME_CUSTOMER_NAME](keyNames?.KEY_NAME_CUSTOMER_NAME, data)}
        {/* <Chip label={<SpanLang sx={{ fontSize: 12 }} keyLang={'Decision Maker'} />} size="small" /> */}
      </Stack>
      <Grid
        container
        spacing={1}
        sx={{
          // px: 1 ,
          ml: 0,
          width: '100%'
        }}
      >
        <Grid
          //   key={field.keyName + index.toString()}
          item
          xs={6}
          sm={6}
          sx={{ pb: 1, px: 1 }}
        >
          <Typography color="secondary">Email</Typography>
          {/* <Typography>waren@example.com</Typography> */}
          {getMapColumns('CATEGORY_CONTACT')[keyNames?.KEY_NAME_CUSTOMER_EMAIL](keyNames?.KEY_NAME_CUSTOMER_EMAIL, data)}
        </Grid>
        <Grid
          //   key={field.keyName + index.toString()}
          item
          xs={6}
          sm={6}
          sx={{ pb: 1, px: 1 }}
        >
          <Typography color="secondary">Mobile</Typography>
          {/* <Typography>010223333</Typography> */}
          {getMapColumns('CATEGORY_CONTACT')[keyNames?.KEY_NAME_CUSTOMER_MOBILE](keyNames?.KEY_NAME_CUSTOMER_MOBILE, data)}
        </Grid>
        <Grid
          //   key={field.keyName + index.toString()}
          item
          xs={6}
          sm={6}
          sx={{ pb: 1, px: 1 }}
        >
          <Typography color="secondary">Phone</Typography>
          {/* <Typography>0223333</Typography> */}
          {getMapColumns('CATEGORY_CONTACT')[keyNames?.KEY_NAME_CUSTOMER_PHONES](keyNames?.KEY_NAME_CUSTOMER_PHONES, data)}
        </Grid>
      </Grid>
    </Box>
  );
}

const Contacts = (props: ContactsProps) => {
  const { menuSourceId } = props;
  const {
    data: contactsData,
    isLoading,
    refetch
  } = useCustomerAssignContacts(menuSourceId, {
    filter: {
      query: `category=${CUSTOMER_CATEGORY_ENUM[CUSTOMER_CATEGORY_CONTACT]} account=\"${menuSourceId}\" `
      //   paging: {
      //     page: paging.page,
      //     size: paging.size
      //   }
    }
  });

  return (
    <>
      <Box className="scroll-box" maxHeight={484}>
        {contactsData?.data &&
          contactsData?.data?.map((v: any, i: number) => (
            <Box key={v?.id}>
              <ContactsCard key={v?.id} data={v} />
              {i !== contactsData?.data?.length - 1 && <Divider />}
            </Box>
          ))}
      </Box>

      {!(contactsData?.data?.length == 0) && (
        <Box sx={{ padding: '16px' }}>
          <NoData />
        </Box>
      )}
    </>
  );
};

export default Contacts;
