// import components MUI
import { Grid, Stack, Divider, Paper, styled, useTheme, Box, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

// import containers
import AccountInformation from '@settings/billing-license/containers/AccountInformation';
import BusinessRegistration from '@settings/billing-license/containers/BusinessRegistration';
import Contact from '@settings/billing-license/containers/Contact';
import PaymentMethod from '@settings/billing-license/containers/PaymentMethod';
import NavbarOption from '@settings/billing-license/containers/NavbarOption';
import IconButton from '@base/components/@extended/IconButton';

// Custom Paper component of MUI
const Item = styled(Paper)(({ theme }) => ({
  backgroundImage: 'none',
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  boxShadow: 'none',
  marginBottom: '12px'
}));

const Information = () => {
  const theme = useTheme();

  const border = `1px solid ${theme.palette.divider}`;
  return (
    <Box className="scroll-box" maxHeight={'calc(100vh - 98px)'}>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
        alignItems="center"
        sx={{ p: '10px 20px', borderBottom: border }}
      >
        <IconButton
          variant="outlined"
          size="small"
          sx={{
            border: 0,
            ml: 0
          }}
        >
          <ArrowBackIosIcon sx={{ fontSize: '14px', cursor: 'pointer' }} />
        </IconButton>
        <Typography fontWeight={500}>BILL & LICENSE &gt; BILLING INFORMATION</Typography>
      </Stack>
      <Grid container sx={{ p: '20px' }} columnSpacing={{ md: 1, lg: 2 }}>
        <Grid item md={12} lg={6}>
          <Stack spacing={2}>
            <AccountInformation />
            <Contact />
            <NavbarOption />
          </Stack>
        </Grid>
        <Grid item md={12} lg={6}>
          <Stack spacing={2}>
            <BusinessRegistration />
            <PaymentMethod />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Information;
