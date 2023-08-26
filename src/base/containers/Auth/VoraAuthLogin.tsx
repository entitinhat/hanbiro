import React, { useEffect, useState } from 'react';
// import { Link as RouterLink } from 'react-router-dom';

// material-ui
import {
  Button,
  // Checkbox,
  Divider,
  // FormControlLabel,
  // FormHelperText,
  Grid,
  Link,
  // InputAdornment,
  // InputLabel,
  // OutlinedInput,
  Stack,
  Typography
} from '@mui/material';

// third party
// import * as Yup from 'yup';
import { Formik } from 'formik';
import GitHubIcon from '@mui/icons-material/GitHub';
// project import
// import useAuth from 'base/hooks/useAuth';
// import IconButton from 'base/components/@extended/IconButton';
// assets
import Google from '@base/assets/images/icons/google.svg';
import Apple from '@base/assets/images/icons/facebook.svg';
// import useAuth from '@base/hooks/useAuth';
import { useRecoilState, useRecoilValue } from 'recoil';
import useAuth from '@base/hooks/useAuth';
import { getDevToken } from '@base/services/voraService';
import { AuthProps } from '@base/types/auth';
import Storages from '@base/utils/storages/ls';
import { authAtom } from '@base/store/atoms/auth';
import { LIST_TABLE_PAGE_SIZE } from '@base/config/constant';
import { useOrg } from '@base/hooks/iam/useOrg';
import { ListProvidersRequest, Provider } from '@base/types/iam';
import { useProviders } from '@base/hooks/iam/useProviders';
import { AUTHORIZE_ENDPOINT, OAUTH_LOCAL_SERVER_IAM, OAUTH_SERVER, OAUTH_SERVER_IAM } from '@base/config/vora';
import { OAUTH_LOCAL_SERVER } from '@sign-in/config/constant';
import { baseUrl } from '@base/utils/vora';

// assets
// import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

// ============================|| FIREBASE - LOGIN ||============================ //

const VoraAuthLogin = () => {
  const Ls = new Storages();
  const { isLoggedIn } = useAuth();
  const [auth, setAuth] = useRecoilState(authAtom);
  const [providers, setProviders] = useState<Provider[]>([]);

  console.log('isLoggedIn', isLoggedIn);
  console.log('auth', auth);
  const orgId = useOrg().id;
  const req: ListProvidersRequest = {
    orgId: orgId,
    maxResults: LIST_TABLE_PAGE_SIZE
  };
  const { results, isLoading } = useProviders(req);
  const loginWithDevMode = () => {
    const token = getDevToken();
    const newAuth: AuthProps = {
      ...auth,
      isLoggedIn: true,
      user: {
        id: 'testUser',
        orgId: 'org',
        displayName: 'Test User',
        fullName: 'Test User',
        urlName: 'testuser',
        primaryEmail: 'testuser@gmail.com',
        primaryPhone: '09867528',
        emails: [],
        phones: []
      }
    };
    setAuth(newAuth);
  };

  useEffect(() => {
    if (!isLoading && results) {
      setProviders(results.items);
    }
  }, [results]);

  const signinWithProvider = (provider: Provider) => {
    //when [Sign in with ...] is clicked, user should be redirected to/v1/iam/{orgId}/oauth/authorize/{providerId} with the optional?continue(edited)
    const oauthServer = location.host === 'localhost:8080' ? OAUTH_LOCAL_SERVER_IAM : OAUTH_SERVER_IAM;
    const oauthUrl = AUTHORIZE_ENDPOINT;
    const homePage = location.protocol + '//' + location.host + baseUrl();
    const continueUrl = '?continue=' + homePage;
    // console.log('check URL login', `${oauthServer}${oauthUrl}/${provider.id}${continueUrl}`);
    window.open(`${oauthServer}${oauthUrl}/${provider.id}${continueUrl}`, '_self');
  };
  return (
    <>
      <Formik initialValues={{}} onSubmit={() => {}}>
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            {/* <Grid container spacing={3}>
              <Grid item xs={12}>
                <Button fullWidth size="large" variant="outlined" color="primary" onClick={loginWithDevMode}>
                  Login with Dev Mode
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  size="large"
                  variant="outlined"
                  color="primary"
                  onClick={loginWithDevMode}
                  startIcon={<img src={Google} alt="Google" />}
                >
                  Sign up with Google
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  size="large"
                  variant="outlined"
                  color="primary"
                  onClick={loginWithDevMode}
                  startIcon={<img src={Apple} alt="Apple" />}
                >
                  Sign up with Apple
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Divider>
                  <Typography variant="caption"> OR </Typography>
                </Divider>
              </Grid>
              <Grid item xs={12}>
                <Button fullWidth size="large" type="submit" variant="contained" onClick={loginWithDevMode} color="primary">
                  Sign up with Phone Or Email
                </Button>
                <Stack spacing={1} direction="row">
                  <Typography>
                    By sign up, you agree the &nbsp;
                    <a href="#" color="inherit">
                      Terms of Service
                    </a>
                    &nbsp; and &nbsp;
                    <a href="#" color="inherit">
                      Privacy Policy
                    </a>
                    , including &nbsp;
                    <a href="#" color="inherit">
                      Cookie Use
                    </a>
                    .
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <Typography variant="h5">Already have a Vora ID?</Typography>
                  <Button fullWidth size="large" variant="outlined" onClick={loginWithDevMode} color="primary">
                    Sign in
                  </Button>
                </Stack>
              </Grid>
            </Grid> */}
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Button fullWidth size="large" variant="outlined" color="secondary" onClick={loginWithDevMode}>
                  Sign In with Dev Mode
                </Button>
              </Grid>

              {providers.length > 0 &&
                providers.map((provider) => {
                  return (
                    <Grid item xs={12} key={provider.id}>
                      <Button
                        fullWidth
                        size="large"
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                          signinWithProvider(provider);
                        }}
                        startIcon={<GitHubIcon color="action" />}
                      >
                        {provider.displayName}
                      </Button>
                    </Grid>
                  );
                })}
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default VoraAuthLogin;
