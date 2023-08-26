import styled from '@emotion/styled';
// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import useAuth from '@base/hooks/useAuth';
import AuthWrapper from '@base/containers/Auth/AuthWrapper';
import AuthLogin from '@base/containers/Auth/VoraAuthLogin';
import Logo from '@base/components/Logo';

// ================================|| LOGIN ||================================ //

const Login = () => {
  console.log('Login');
  const { isLoggedIn } = useAuth();

  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        {/* <Grid item xs={12}>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="baseline"
            sx={{ mb: { xs: -0.5, sm: 0.5 }, backgroundColor: '#1e1e1e' }}
          >
            <Logo />
          </Stack>
        </Grid> */}
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Sign In</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthLogin />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default Login;
