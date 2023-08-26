import { useEffect } from 'react';

//third-party
import { Box, Grid, InputLabel } from '@mui/material';
import { useTranslation } from 'react-i18next';

//project base
import withTextAndPreviewModal, { QuickViewComponentProps } from '@base/hooks/hocs/withTextAndPreviewModal';
import { MENU_OPPORTUNITY_COMPETITOR } from '@base/config/menus';
import { usePageLayoutByMenu } from '@base/hooks/usePageLayout';

//competitor menu
import { useCompetitorQuickView } from '@competitor/hooks/useCompetitor';
import { getMapColumns } from '@competitor/pages/ListPage/Helper';
import * as keyNames from '@competitor/config/keyNames';

const QUICK_FIELDS = [
  keyNames.KEY_NAME_COMPETITOR_NAME,
  keyNames.KEY_NAME_COMPETITOR_CODE,
  keyNames.KEY_NAME_COMPETITOR_WEBSITE,
  keyNames.KEY_NAME_COMPETITOR_PRODUCT,
  keyNames.KEY_NAME_COMPETITOR_STRENGTH,
  keyNames.KEY_NAME_COMPETITOR_WEAKNESS,
  keyNames.KEY_NAME_COMPETITOR_DESCRIPTION
];

const CompetitorQuickView = (props: QuickViewComponentProps) => {
  const { id, setLoading } = props;
  const { t } = useTranslation();

  // layout
  const pageDataKey = MENU_OPPORTUNITY_COMPETITOR;
  const { data: layoutView, isLoading: isLayoutLoading } = usePageLayoutByMenu(pageDataKey, 'view');
  const layoutFields = layoutView?.data ? layoutView.data[0].children : [];

  const { data, isLoading } = useCompetitorQuickView(id);

  useEffect(() => {
    setLoading && setLoading(isLoading || isLayoutLoading);
  }, [isLoading, isLayoutLoading]);

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

  const mapColumnRender: any = getMapColumns();

  return (
    <>
      {!isLoading && data && (
        <Box sx={{ p: 2.5 }}>
          {QUICK_FIELDS.map((_keyName: string) => {
            const thisField = layoutFields.find((_field: any) => _field.keyName === _keyName);
            return (
              <Grid container sx={containerProps} key={_keyName}>
                <Grid item xs={4} sx={colProps}>
                  <InputLabel>{t(thisField?.languageKey || '')}</InputLabel>
                </Grid>
                <Grid item xs={8} sx={colProps}>
                  {mapColumnRender && mapColumnRender[_keyName] ? mapColumnRender[_keyName](_keyName, data) : ''}
                </Grid>
              </Grid>
            );
          })}
        </Box>
      )}
    </>
  );
};

export default withTextAndPreviewModal(CompetitorQuickView, { title: 'Competitor Detail' });
