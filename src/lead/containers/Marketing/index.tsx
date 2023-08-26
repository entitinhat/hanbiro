import { useTheme, Grid, styled, Box } from '@mui/material';
import { PageLayoutData } from '@base/types/pagelayout';
import { useTranslation } from 'react-i18next';
import Competitor from './Competitor';
import ContactProperties from './ContactProperties';
import LastTouch from './LastTouch';
import ContactMethod from './ContactMethod';
import IdentifyPainPoint from './IdentifyPainPoint';

interface Marketingprops {
  menuSource: string;
  menuSourceId: string;
  column?: number;
  layoutData: PageLayoutData;
  ignoreFields?: string[];
}
const Marketing = (props: Marketingprops) => {
  const { menuSourceId, layoutData } = props;
  const { t } = useTranslation();
  const theme = useTheme();
  const border = '1px solid ' + theme.palette.divider;

  const StyledGrid = styled(Grid)({
    borderBottom: border,
    width: '100%',
    '&:last-of-type' :{
      borderBottom: 'none'
    }
  });
  return (
    <Box sx={{ p: '0px !important', mx: -2, my: -2 }}>
      <StyledGrid container>
        <StyledGrid item xs={12} sx={{ borderBottom: 'none' }}>
          <LastTouch />
        </StyledGrid>
        <StyledGrid item xs={12} sx={{ borderBottom: 'none' }}>
          <ContactProperties value={layoutData?.data?.contacts} menuSourceId={menuSourceId} />
        </StyledGrid>
        <StyledGrid item xs={12} sx={{ borderBottom: 'none' }}>
          <Competitor value={layoutData?.data?.competitors} menuSourceId={menuSourceId} />
        </StyledGrid>
        <StyledGrid item xs={12}>
          <ContactMethod value={layoutData?.data?.contactMethod} menuSourceId={menuSourceId}  />
        </StyledGrid>
        <StyledGrid item xs={12} sx={{ border: 'none' }}>
          <IdentifyPainPoint value={layoutData?.data?.painPoints} menuSourceId={menuSourceId}  />
        </StyledGrid>
      </StyledGrid>
    </Box>
  );
};
export default Marketing;