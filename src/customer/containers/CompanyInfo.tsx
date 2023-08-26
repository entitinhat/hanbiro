import React from 'react';
import { Link } from 'react-router-dom';

//material
import { InputLabel, Stack } from '@mui/material';

//project
import EmailInputView from '@base/containers/ViewField/EmailInput/View';
import WebsiteInputView from '@base/containers/ViewField/WebsiteInput/View';
import PhoneInputView from '@base/containers/ViewField/PhoneInput/View';
import { MENU_CUSTOMER } from '@base/config/menus';

//menu
import * as keyNames from '@customer/config/keyNames';

interface CompanyProps {
  //category?: string;
  //id?: string;
  data?: any;
}

const CompanyInfo = (props: CompanyProps) => {
  const { data } = props;
  //console.log('company data', data);
  const routeLink = `/${MENU_CUSTOMER}/account/${data?.id}`;

  //render
  return (
    <>
      <Stack>
        <InputLabel>Name</InputLabel>
        <Link to={routeLink}>{data?.[keyNames.KEY_NAME_CUSTOMER_NAME]}</Link>
      </Stack>
      <Stack>
        <InputLabel>Email</InputLabel>
        {data?.[keyNames.KEY_NAME_CUSTOMER_EMAIL]?.length > 0 ? (
          <EmailInputView value={data?.[keyNames.KEY_NAME_CUSTOMER_EMAIL]} />
        ) : (
          <em>(none)</em>
        )}
      </Stack>
      <Stack>
        <InputLabel>Website</InputLabel>
        <WebsiteInputView value={data?.[keyNames.KEY_NAME_CUSTOMER_WEBSITES]} />
        {/* {data?.[keyNames.KEY_NAME_CUSTOMER_WEBSITES]?.length > 0 ?
          <WebsiteInputView value={data?.[keyNames.KEY_NAME_CUSTOMER_WEBSITES]} />
          :
          <em>(none)</em>
        } */}
      </Stack>
      <Stack>
        <InputLabel>Phone</InputLabel>
        {data?.[keyNames.KEY_NAME_CUSTOMER_PHONES]?.length > 0 ? (
          <PhoneInputView value={data?.[keyNames.KEY_NAME_CUSTOMER_PHONES]} />
        ) : (
          <em>(none)</em>
        )}
      </Stack>
    </>
  );
};

export default CompanyInfo;
