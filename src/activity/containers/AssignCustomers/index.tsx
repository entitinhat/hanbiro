import _ from 'lodash';

import useAssignCustomerMutate from '@activity/hooks/useAssginCustomerMutation';
import { useAssignedCustomers } from '@activity/hooks/useAssignedCustomers';
import { UserOrCustomer } from '@activity/types/activity';
import AssignCustomersContainer from '@customer/containers/AssignCustomersContainer';
import { Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PageLayoutData } from '@base/types/pagelayout';
import { useEffect, useState } from 'react';

interface AssignCustomersProps {
  placement?: string;
  layoutData: PageLayoutData;

  menuSource: string;
  menuSourceId: string;
  menuSourceName?: string;
  menuTab?: string;
  menuType?: string;
}

function AssignCustomers(props: AssignCustomersProps) {
  const { placement, menuSource, menuSourceId, menuSourceName, menuTab, menuType, layoutData } = props;
  // const { data, isLoading } = useAssignedCustomers(menuSourceId);
  const [data, setData] = useState(layoutData.data);
  const [accountType, setAccountType] = useState<string>('TYPE_ACCOUNT');
  console.log(`~~~~customer data/accountType`, data, accountType, layoutData);
  const { t } = useTranslation();

  useEffect(() => {
    if (layoutData.data) {
      setData(layoutData.data?.to[0]);
      console.log(`~~~~layoutData.data?.to`, layoutData.data?.to[0]);

      setAccountType(layoutData.data?.to[0]?.type);
    }
  }, [layoutData]);

  const getCustomerInfo = (key: string, currKey: string) => {
    let valueString: string = '';
    if (data[key]) {
      valueString = data[key];
    } else if (data?.current && data?.current[currKey] && data?.current[currKey].length > 0) {
      valueString = data?.current[currKey].map((item: { [x: string]: string }) => item[key]).join(' ,');
    } else valueString = 'ncrm_common_none';

    return valueString;
  };

  const renderAccount = () => {
    return (
      <>
        <Grid item xs={6}>
          <Typography>{`Email: ${data?.email ?? t('ncrm_common_none')}`}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{`Phone: ${data?.phone ?? t('ncrm_common_none')}`}</Typography>
        </Grid>
      </>
    );
  };
  const renderContact = () => {
    //getEmail
    const emailString: string = getCustomerInfo('email', 'emails');
    const phoneString: string = getCustomerInfo('phone', 'phones');
    const mobileString: string = getCustomerInfo('mobile', 'mobiles');
    return (
      <>
        <Grid item xs={12}>
          <Typography>{`Email: ${t(emailString)}`}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{`Mobile: ${t(mobileString)}`}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{`Phone: ${t(phoneString)}`}</Typography>
        </Grid>
      </>
    );
  };
  const renderContactEmployee = () => {
    return (
      <>
        <Grid item xs={12}>
          <Typography>{`Related Account: ${data?.email ?? t('ncrm_common_none')}`}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>{`Email: ${data?.email ?? t('ncrm_common_none')}`}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{`Mobile: ${data?.mobile ?? t('ncrm_common_none')}`}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{`Phone: ${data?.phone ?? t('ncrm_common_none')}`}</Typography>
        </Grid>
      </>
    );
  };
  console.log(`~~~~Customer data`, data);
  return (
    <Grid container sx={{ p: 3 }} spacing={2}>
      <Grid item xs={12}>
        <Typography>{data?.name ?? '(none)'}</Typography>
      </Grid>
      {accountType == 'TYPE_ACCOUNT' && renderAccount()}
      {accountType == 'TYPE_CONTACT' && renderContact()}
      {accountType == 'TYPE_CONTACT_EMPLOYEE' && renderContactEmployee()}
    </Grid>
  );
}

AssignCustomers.defaultProps = {
  placement: 'right',
  menuSource: '',
  menuSourceId: '',
  menuSourceName: '',
  menuTab: 'activity', //on url
  menuType: ''
};

export default AssignCustomers;
