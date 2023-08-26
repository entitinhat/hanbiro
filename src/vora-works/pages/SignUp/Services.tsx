import MainCard from '@base/components/App/MainCard';
import useDevice from '@base/hooks/useDevice';
import { Grid, useTheme } from '@mui/material';
import FreeServices from '@vora-works/containers/FreeServices';
import ProductServices from '@vora-works/containers/ProductServices';

interface ServicesProps {}
function Services(props: ServicesProps) {
  const theme = useTheme();
  const { isMobile } = useDevice();
  return (
    <MainCard
      border={!isMobile}
      sx={{
        background: theme.palette.background.paper,
        p: isMobile ? 0 : 2,
        '& .MuiCardContent-root': {
          p: '4px 8px',
          ...(isMobile && {
            p: '4px 0px'
          })
        }
      }}
    >
      <Grid container>
        {/* {!isMobile && (
          <Grid sx={{ position: 'relative' }} item xs={6}>
            <FreeServices />
          </Grid>
        )} */}
        <Grid item xs={12} md={6} lg={6}>
          <FreeServices />
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <ProductServices />
        </Grid>
      </Grid>
    </MainCard>
  );
}
export default Services;
