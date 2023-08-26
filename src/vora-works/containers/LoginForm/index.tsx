import React, { useRef, useState } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';
// material-ui
import {
  Button,
  // Checkbox,
  Divider,
  // FormControlLabel,
  // FormHelperText,
  Grid,
  InputLabel,
  Link,
  // InputAdornment,
  // InputLabel,
  // OutlinedInput,
  Stack,
  TextField,
  Typography,
  useTheme
} from '@mui/material';

// third party
// import * as Yup from 'yup';
import { Formik } from 'formik';

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
import SpanLang from '@base/components/@hanbiro/SpanLang';
import validators from '@base/utils/validation/fieldValidator';
import _ from 'lodash';
import useSnackBar from '@base/hooks/useSnackBar';
import { FormHelperText } from '@mui/material';
import { AUTHORIZE_ENDPOINT } from '@base/config/vora';
// assets
// import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

// ============================|| FIREBASE - LOGIN ||============================ //
interface LoginFormProps {
  onLogin: (value: string) => void;
}
const LoginForm = (props: LoginFormProps) => {
  const { onLogin } = props;
  const theme = useTheme();

  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  const [registedEmail, setRegistedEmail] = useState<string>('');
  const [helperText, setHelperText] = useState('');
  const setSearchTextDebounced = useRef(
    _.debounce((searchText) => {
      setHelperText('');
      setRegistedEmail(searchText);
    }, 500)
  ).current;

  const handleChange = (event: any) => {
    const value = event.target.value;
    setSearchTextDebounced(value);
  };

  const handleSubmit = () => {
    if (validators.email(registedEmail) !== true) {
      setHelperText('Email format is not correct!');
    } else {
      onLogin(registedEmail);
      setHelperText('');
    }
  };

  const signinWitGithub = () => {
    //when [Sign in with ...] is clicked, user should be redirected to/v1/iam/{orgId}/oauth/authorize/{providerId} with the optional?continue(edited)
    const gihubUrl = 'https://github.com/';
    const outhChosenUrl = 'oauthchooseaccount';
    //  const oauthServer = location.host === 'localhost:8080' ? OAUTH_LOCAL_SERVER : OAUTH_SERVER;
    const oauthUrl = 'login';
    // const homePage = location.protocol + '//' + location.host;

    window.open(`${gihubUrl}${oauthUrl}`, '_self');
  };
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography textAlign="center" variant="h3">
            Get Started
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            size="large"
            variant="outlined"
            color="primary"
            onClick={signinWitGithub}
            startIcon={<GitHubIcon fontSize="medium" color="action" />}
          >
            Sign up with Github
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Divider>
            <Typography variant="caption"> OR </Typography>
          </Divider>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={0.5}>
            <Stack spacing={1} direction="column">
              <InputLabel sx={{ display: 'flex', alignItems: 'center' }}>Work Email</InputLabel>
              <TextField onChange={handleChange} fullWidth placeholder="Enter your Email" inputProps={{ type: 'email' }} />
              <FormHelperText sx={{ color: theme.palette.error.main, fontSize: 'small' }}>{helperText}</FormHelperText>
              <Typography variant="body2" color="secondary">
                By clicking below, you agree to the Vora Cloud Terms of
                <Link href="#"> Service and Privacy Policy.</Link>
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Button fullWidth size="large" variant="contained" onClick={handleSubmit} color="primary">
              Agree
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Typography color="InfoText" fontWeight="bold" textAlign="center" variant="body2">
            No Credit card required
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default LoginForm;
