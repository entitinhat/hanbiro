import { useEffect } from 'react';

//third-party
import { Box, Grid, InputLabel } from '@mui/material';
import { useTranslation } from 'react-i18next';

//project base
import withTextAndPreviewModal, { QuickViewComponentProps } from '@base/hooks/hocs/withTextAndPreviewModal';
import { MENU_OPPORTUNITY_IDENTIFY_CONTACT } from '@base/config/menus';
import { usePageLayoutByMenu } from '@base/hooks/usePageLayout';
import { LABEL_VALUE_PRIMARY } from '@base/config/constant';
import ListTableCellDroplist from '@base/components/@hanbiro/List/ListTableCellDropList';

//competitor menu
import { useCompetitorQuickView } from '@competitor/hooks/useCompetitor';
import { getMapColumns } from '@competitor/pages/ListPage/Helper';
import { PageLayoutData } from '@base/types/pagelayout';
import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';
import * as keyNames from '../WriteIdentifyContact/keyNames';

interface IdentifyContactViewProps extends QuickViewComponentProps {
  data: any;
}

const IdentifyContactView = (props: IdentifyContactViewProps) => {
  const { data, id, setLoading } = props;
  const { t } = useTranslation();

  // layout
  const pageDataKey = MENU_OPPORTUNITY_IDENTIFY_CONTACT;
  const { data: layoutView, isLoading: isLayoutLoading } = usePageLayoutByMenu(pageDataKey, 'view');
  const layoutFields = layoutView?.data ? layoutView.data[0].children : [];

  //const { data, isLoading } = useCompetitorQuickView(id);

  // useEffect(() => {
  //   setLoading && setLoading(isLoading || isLayoutLoading);
  // }, [isLoading, isLayoutLoading]);

  const colProps = {
    paddingTop: 'calc(.375rem + 1px)',
    paddingBottom: 'calc(.375rem + 1px)',
    paddingLeft: '15px',
    paddingRight: '15px',
    marginBottom: 0,
    lineHeight: 1.5
  };

  const containerProps = {
    marginBottom: '1rem'
  };

  let emails: any = [];
  data[keyNames.KEY_NAME_IDENTIFY_CONTACT_EMAIL]?.map((_ele: any) => {
    if (_ele.label === LABEL_VALUE_PRIMARY) {
      emails.unshift({ ..._ele, name: _ele.email });
    } else {
      emails.push({ ..._ele, name: _ele.email });
    }
  });

  let phones: any = [];
  data[keyNames.KEY_NAME_IDENTIFY_CONTACT_PHONE]?.map((_ele: any) => {
    if (_ele.label === LABEL_VALUE_PRIMARY) {
      phones.unshift({ ..._ele, name: `+${_ele.fCountry?.phoneCode || ''}${_ele.phoneNumber}` });
    } else {
      phones.push({ ..._ele, name: `+${_ele.fCountry?.phoneCode || ''}${_ele.phoneNumber}` });
    }
  });

  let mobiles: any = [];
  data[keyNames.KEY_NAME_IDENTIFY_CONTACT_MOBILE]?.map((_ele: any) => {
    if (_ele.label === LABEL_VALUE_PRIMARY) {
      mobiles.unshift({ ..._ele, name: `+${_ele.fCountry?.phoneCode || ''}${_ele.mobileNumber}` });
    } else {
      mobiles.push({ ..._ele, name: `+${_ele.fCountry?.phoneCode || ''}${_ele.mobileNumber}` });
    }
  });

  return (
    <>
      {data && (
        // <ViewFields
        //   fields={layoutFields}
        //   ignoreFields={[]}
        //   menuSource={MENU_OPPORTUNITY_IDENTIFY_CONTACT}
        //   menuSourceId={id}
        //   data={data}
        //   //onSave={handleOnSave}
        //   //onClose={handleOnClose}
        //   column={1}
        //   readOnly={data?.restore?.id ? true : false}
        //   //divider
        // />
        <Box sx={{ p: 2.5 }}>
          <Grid container sx={containerProps}>
            <Grid item xs={4} sx={colProps}>
              <InputLabel>Contact Name</InputLabel>
            </Grid>
            <Grid item xs={8} sx={colProps}>
              {data[keyNames.KEY_NAME_IDENTIFY_CONTACT_NAME]}
            </Grid>
          </Grid>
          <Grid container sx={containerProps}>
            <Grid item xs={4} sx={colProps}>
              <InputLabel>Buying Role</InputLabel>
            </Grid>
            <Grid item xs={8} sx={colProps}>
              {data[keyNames.KEY_NAME_IDENTIFY_CONTACT_BUYING_ROLE]?.name || <em>(none)</em>}
            </Grid>
          </Grid>
          <Grid container sx={containerProps}>
            <Grid item xs={4} sx={colProps}>
              <InputLabel>Email</InputLabel>
            </Grid>
            <Grid item xs={8} sx={colProps}>
              <ListTableCellDroplist showAvatar={false} values={emails} />
              {emails.length === 0 && <em>{t('ncrm_common_none')}</em>}
            </Grid>
          </Grid>
          <Grid container sx={containerProps}>
            <Grid item xs={4} sx={colProps}>
              <InputLabel>Mobile</InputLabel>
            </Grid>
            <Grid item xs={8} sx={colProps}>
              <ListTableCellDroplist showAvatar={false} values={mobiles} />
              {emails.length === 0 && <em>{t('ncrm_common_none')}</em>}
            </Grid>
          </Grid>
          <Grid container sx={containerProps}>
            <Grid item xs={4} sx={colProps}>
              <InputLabel>Phone</InputLabel>
            </Grid>
            <Grid item xs={8} sx={colProps}>
              <ListTableCellDroplist showAvatar={false} values={phones} />
              {emails.length === 0 && <em>{t('ncrm_common_none')}</em>}
            </Grid>
          </Grid>
          <Grid container sx={containerProps}>
            <Grid item xs={4} sx={colProps}>
              <InputLabel>Department</InputLabel>
            </Grid>
            <Grid item xs={8} sx={colProps}>
              {data[keyNames.KEY_NAME_IDENTIFY_CONTACT_DEPARTMENT] || <em>(none)</em>}
            </Grid>
          </Grid>
          <Grid container sx={containerProps}>
            <Grid item xs={4} sx={colProps}>
              <InputLabel>Job Position</InputLabel>
            </Grid>
            <Grid item xs={8} sx={colProps}>
              {data[keyNames.KEY_NAME_IDENTIFY_CONTACT_JOB]?.name || <em>(none)</em>}
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default withTextAndPreviewModal(IdentifyContactView);
