import { useTranslation } from 'react-i18next';
import { useTheme, Grid } from '@mui/material';
import useDevice from '@base/hooks/useDevice';
import LeadSection from '../../../containers/LeadSections';
import {
  WRITE_TYPE_BUYING,
  WRITE_TYPE_COLLECTION,
  WRITE_TYPE_LOST_REASON,
  WRITE_TYPE_PAIN_POINT,
  WRITE_TYPE_REFERRER
} from '@settings/preferences/config/lead/constants';
import { MENU_SALES } from '@base/config/menus';

interface Props {}

const General = (props: Props) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { isMobile } = useDevice();

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            <LeadSection settingKey={WRITE_TYPE_BUYING} title={'Buying Role'} menu={MENU_SALES} />
            <LeadSection settingKey={WRITE_TYPE_COLLECTION} title={'Collection Method'} menu={MENU_SALES} />
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            <LeadSection settingKey={WRITE_TYPE_PAIN_POINT} title={'Identify Pain Point'} menu={MENU_SALES} />
            <LeadSection settingKey={WRITE_TYPE_LOST_REASON} title={'Lost Reason'} menu={MENU_SALES} />
            <LeadSection settingKey={WRITE_TYPE_REFERRER} title={'Referrer'} menu={MENU_SALES} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default General;
