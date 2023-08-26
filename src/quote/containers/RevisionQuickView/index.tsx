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

//menu
import * as keyNames from '@quote/config/keyNames';
import { convertDateTimeServerToClient } from '@base/utils/helpers';
import { useQuoteRevisionQuickView } from '@quote/hooks/useQuote';

interface QuoteQuickViewProps extends QuickViewComponentProps {}

const QuoteRevisionQuickView = (props: QuoteQuickViewProps) => {
  const { id, setLoading } = props;
  const { t } = useTranslation();

  const { data, isLoading } = useQuoteRevisionQuickView(id);

  useEffect(() => {
    setLoading && setLoading(isLoading);
  }, [isLoading]);

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

  return (
    <>
      {data && (
        <Box sx={{ p: 1.5 }}>
          <Grid container sx={containerProps}>
            <Grid item xs={4} sx={colProps}>
              <InputLabel>Quote Revision Name</InputLabel>
            </Grid>
            <Grid item xs={8} sx={colProps}>
              {data[keyNames.KEY_NAME_QUOTE_NAME]}
            </Grid>
          </Grid>
          <Grid container sx={containerProps}>
            <Grid item xs={4} sx={colProps}>
              <InputLabel>Quote Revision ID</InputLabel>
            </Grid>
            <Grid item xs={8} sx={colProps}>
              {data[keyNames.KEY_NAME_QUOTE_CODE]}
            </Grid>
          </Grid>
          <Grid container sx={containerProps}>
            <Grid item xs={4} sx={colProps}>
              <InputLabel>Quote ID</InputLabel>
            </Grid>
            <Grid item xs={8} sx={colProps}>
              {data?.quote?.code || ''}
            </Grid>
          </Grid>
          <Grid container sx={containerProps}>
            <Grid item xs={4} sx={colProps}>
              <InputLabel>Customer</InputLabel>
            </Grid>
            <Grid item xs={8} sx={colProps}>
              {data[keyNames.KEY_NAME_QUOTE_CUSTOMER]?.name || <em></em>}
            </Grid>
          </Grid>
          <Grid container sx={containerProps}>
            <Grid item xs={4} sx={colProps}>
              <InputLabel>Quote Revision Date</InputLabel>
            </Grid>
            <Grid item xs={8} sx={colProps}>
              {data?.[keyNames.KEY_NAME_QUOTE_DATE]
                ? convertDateTimeServerToClient({ date: data[keyNames.KEY_NAME_QUOTE_DATE], humanize: false })
                : ''}
            </Grid>
          </Grid>
          <Grid container sx={containerProps}>
            <Grid item xs={4} sx={colProps}>
              <InputLabel>Items</InputLabel>
            </Grid>
            <Grid item xs={8} sx={colProps}>
              {/* <ListTableCellDroplist showAvatar={false} values={phones} /> */}
              {/* {emails.length === 0 && <em>{t('ncrm_common_none')}</em>} */}
            </Grid>
          </Grid>
          <Grid container sx={containerProps}>
            <Grid item xs={4} sx={colProps}>
              <InputLabel>Total Amount</InputLabel>
            </Grid>
            <Grid item xs={8} sx={colProps}>
              KWR 0
            </Grid>
          </Grid>
          <Grid container sx={containerProps}>
            <Grid item xs={4} sx={colProps}>
              <InputLabel>Expiration Date</InputLabel>
            </Grid>
            <Grid item xs={8} sx={colProps}>
              {data?.[keyNames.KEY_NAME_QUOTE_EXPIRY_DATE]
                ? convertDateTimeServerToClient({ date: data[keyNames.KEY_NAME_QUOTE_EXPIRY_DATE], humanize: false })
                : ''}
            </Grid>
          </Grid>
          <Grid container sx={containerProps}>
            <Grid item xs={4} sx={colProps}>
              <InputLabel>Sales Rep</InputLabel>
            </Grid>
            <Grid item xs={8} sx={colProps}>
              {data[keyNames.KEY_NAME_QUOTE_CUSTOMER]?.name || <em></em>}
            </Grid>
          </Grid>
          {/* <Grid container sx={containerProps}>
            <Grid item xs={4} sx={colProps}>
              <InputLabel>Stage</InputLabel>
            </Grid>
            <Grid item xs={8} sx={colProps}>
              {data[keyNames.KEY_NAME_QUOTE_STAGE]?.name || <em></em>}
            </Grid>
          </Grid>
          <Grid container sx={containerProps}>
            <Grid item xs={4} sx={colProps}>
              <InputLabel>Status</InputLabel>
            </Grid>
            <Grid item xs={8} sx={colProps}>
              {data[keyNames.KEY_NAME_QUOTE_STATUS]?.name || <em></em>}
            </Grid>
          </Grid> */}
        </Box>
      )}
    </>
  );
};

export default withTextAndPreviewModal(QuoteRevisionQuickView, { title: 'Quote Revision View' });
