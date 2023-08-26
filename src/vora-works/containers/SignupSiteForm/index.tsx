import React, { useCallback, useEffect, useRef, useState } from 'react';
// import { Link as RouterLink } from 'react-router-dom';

// material-ui
import {
  Box,
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
  Tooltip,
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
// import useAuth from '@base/hooks/useAuth';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import validators from '@base/utils/validation/fieldValidator';
import _ from 'lodash';
import useSnackBar from '@base/hooks/useSnackBar';
import { FormHelperText } from '@mui/material';
import { DOMAIN, TOOLTIP_FOR_URL_NAME, TOOLTIP_FOR_YOUR_SITE } from '@vora-works/config/constants';
import { InputAdornment } from '@mui/material';
import { QuestionCircleFilled } from '@ant-design/icons';
import { useOrg } from '@base/hooks/iam/useOrg';
import { ListUsersRequest } from '@settings/users-groups/types/user';
import { useUsersEmail } from '@settings/users-groups/users/hooks/useUsersEmail';
import { CheckCircleOutline } from '@mui/icons-material';
import { useTenantByDomain } from '@base/hooks/iam/useTenant';
import useRegisterFreeLicense from '@vora-works/hooks/useRegisterFreeLicense';
import { useUserEmail } from '@settings/users-groups/users/hooks/useUserEmail';
import { User } from '@base/types/iam';
import { useForm } from 'react-hook-form';
import WriteField from '@base/containers/WriteField';
import { getParams } from './payload';
import { useNavigate } from 'react-router-dom';
import { ProductLicense } from '@vora-works/types';
import * as keyNames from '@vora-works/config/keyNames';
// assets
// import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

// ============================|| FIREBASE - LOGIN ||============================ //
interface SignupSiteFormProps {
  registedEmail: string;
  user?: User;
  isVoraUser: boolean;
  onResetEmail: () => void;
  voraProducts: string[];
  onSubmitSite: (productLicence: ProductLicense) => void;
}
const SignupSiteForm = (props: SignupSiteFormProps) => {
  const { registedEmail, onResetEmail, user, isVoraUser, voraProducts, onSubmitSite } = props;

  const {
    handleSubmit,
    register,
    trigger,
    watch,
    resetField,
    control,
    setValue,
    getFieldState,
    formState: { errors, isValid, touchedFields }
  } = useForm({
    defaultValues: {
      [keyNames.VORA_SIGNUP_DISPLAYNAME]: '',
      [keyNames.VORA_SIGNUP_COMPANYNAME]: '',
      [keyNames.VORA_SIGNUP_FULLNAME]: '',
      [keyNames.VORA_SIGNUP_URLNAME]: '',
      [keyNames.VORA_SIGNUP_EMAIL]: registedEmail,
      [keyNames.VORA_SIGNUP_PHONE]: '',
      [keyNames.VORA_SIGNUP_DOMAIN]: '',
      [keyNames.VORA_SIGNUP_PROTYPES]: [voraProducts, 'IAM']
    },
    criteriaMode: 'firstError',
    mode: 'onChange'
  });
  const theme = useTheme();

  const { enqueueErrorBar } = useSnackBar();

  const [registedYourSite, setRegistedYourSite] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');

  const [helperText, setHelperText] = useState('');
  const [isSuggest, setIsSuggest] = useState(true);
  const [validDomain, setValidDomain] = useState<boolean>(false);
  // const [isVoraUser, setIsVoraUser] = useState<boolean>(false);

  const { data: tenantData, isLoading: isLoadingTenant } = useTenantByDomain(DOMAIN === registedYourSite ? '' : registedYourSite);
  // console.log('registedYourSite', registedYourSite);
  // console.log('validDomain', validDomain);
  const setSearchTextDebounced = useRef(
    _.debounce((searchText) => {
      const result = searchText + DOMAIN;
      setHelperText('');
      setRegistedYourSite(result);
    }, 500)
  ).current;

  // Suggest Domain in the FirstTime
  const companyName = watch(keyNames.VORA_SIGNUP_COMPANYNAME);
  const domainName = watch(keyNames.VORA_SIGNUP_DOMAIN);
  const { isTouched: isTouchedCompany } = getFieldState(keyNames.VORA_SIGNUP_COMPANYNAME);
  const { isTouched: isTouchedDomain } = getFieldState(keyNames.VORA_SIGNUP_DOMAIN);

  // console.log('Domain name is ' + domainName);
  // console.log('isSuggest is ' + isSuggest);
  // console.log('isTouched Company is ' + isTouchedCompany);
  // console.log('isTouched Domain is ' + isTouchedDomain);
  useEffect(() => {
    if (isSuggest) {
      // remove white space
      const nCompanyName = companyName.toLocaleLowerCase().replace(/[^A-Z0-9]/gi, '');
      setValue(keyNames.VORA_SIGNUP_DOMAIN, nCompanyName);
      // setIsSuggest(true)
    }
  }, [companyName, isSuggest]);

  useEffect(() => {
    /**
     * Case 1: companyName changes -> Domain change (in the first time && Domain is empty)
     * Case 2: companyName is emplty, change Domain name then change Company -> Domain not change
     * Note: using isTouchedCompany to ensure that Suggesting method only finish when  user clicks another field
     */
    if ((isTouchedCompany && domainName !== '') || isTouchedDomain) {
      setIsSuggest(false);
    }
    if (domainName === '' && isTouchedCompany && isTouchedDomain) {
      setIsSuggest(true);
    }
    // if companyName && domainName is empty, isTouched will not work
    if (companyName == '' && domainName == '') {
      resetField(keyNames.VORA_SIGNUP_COMPANYNAME, {
        keepTouched: false
      });

      resetField(keyNames.VORA_SIGNUP_DOMAIN, {
        keepTouched: false
      });
    }

    setSearchTextDebounced(domainName);
  }, [domainName, isTouchedDomain, isTouchedCompany, companyName]);
  // console.log("vora Product",voraProducts)

  const mMutation = useRegisterFreeLicense();

  //when submit error, call this
  const onError = (errors: any, e: any) => {
    console.log('error', errors, e);
  };
  useEffect(() => {
    if (!isLoadingTenant && !tenantData) {
      console.log('tenantData', tenantData);
      setValidDomain(true);
    }
    if (!isLoadingTenant && tenantData && tenantData.id !== '') {
      setValidDomain(false);
    }
  }, [tenantData]);

  useEffect(() => {
    if (isVoraUser && user) {
      setDisplayName(user.fullName);
    }
  }, [isVoraUser]);

  useEffect(() => {}, [mMutation.isSuccess]);

  const onSubmit = useCallback(
    ({ formData }: any) => {
      // console.log('FormData', formData);
      const configParams = getParams(formData, user);
      // console.log('FormData', configParams);
      // navigate(`&confirmation=1&continue=hmviet.jiki.me`);

      mMutation.mutate(configParams);
    },
    [user]
  );
  useEffect(() => {
    trigger();
  }, [validDomain]);

  useEffect(() => {
    if (mMutation.isSuccess && mMutation?.data?.results) {
      const result = mMutation.data.results;
      // console.log('mMutation', result[0]);
      onSubmitSite(result[0]);
      // navigate(`&confirmation=1&continue=hmviet.jiki.me`);
    }
  }, [mMutation.isSuccess]);
  // console.log('Valid domain', validDomain);
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography textAlign="center" variant="h4">
            {isVoraUser ? `Wellcome back, ${displayName}` : `Sign up to continue`}
          </Typography>
        </Grid>

        <Grid component="form" onSubmit={handleSubmit(onSubmit, onError)} item xs={12}>
          <Grid container spacing={2} alignItems="center">
            <WriteField
              item={{
                keyName: keyNames.VORA_SIGNUP_EMAIL,
                Component: TextField,
                columns: 1,
                componentProps: {
                  placeholder: 'Type your Work Email',
                  disabled: true
                },
                languageKey: 'Work Email',
                section: 0,
                tooltipShow: false,
                validate: {
                  required: validators.required
                }
              }}
              control={control}
              errors={errors}
            />
            {isVoraUser && (
              <Grid item xs={12}>
                <Typography
                  component="span"
                  color="primary"
                  sx={{
                    '&:hover': {
                      cursor: 'pointer'
                    }
                  }}
                  onClick={() => {
                    onResetEmail();
                  }}
                >
                  Sign in with a different vora account
                </Typography>
              </Grid>
            )}
            <WriteField
              item={{
                keyName: keyNames.VORA_SIGNUP_COMPANYNAME,
                Component: TextField,
                columns: 1,
                componentProps: {
                  placeholder: 'Type your Your Company'
                },
                languageKey: 'Company Name',
                section: 0,
                tooltipShow: false,
                validate: {
                  required: validators.required
                }
              }}
              control={control}
              errors={errors}
            />
            <WriteField
              item={{
                keyName: keyNames.VORA_SIGNUP_DOMAIN,
                Component: TextField,
                columns: 1,
                componentProps: {
                  placeholder: 'Type your Your Site',
                  InputProps: {
                    endAdornment: (
                      <InputAdornment position="start">
                        {DOMAIN} <CheckCircleOutline color={validDomain ? 'success' : 'error'} fontSize="small" />
                      </InputAdornment>
                    )
                  }
                },
                tooltipShow: true,
                tooltipText: TOOLTIP_FOR_YOUR_SITE,
                languageKey: 'Your Site',
                section: 0,
                validate: {
                  required: validators.required,
                  isValidDomain: (values: string) => validators.isValidDomain(validDomain, values)
                }
              }}
              control={control}
              errors={errors}
            />

            {!isVoraUser && (
              <>
                <WriteField
                  item={{
                    keyName: keyNames.VORA_SIGNUP_DISPLAYNAME,
                    Component: TextField,
                    columns: 1,
                    componentProps: {
                      placeholder: 'Type your Your Display name'
                    },
                    languageKey: 'Display Name',
                    section: 0,
                    tooltipShow: false,
                    validate: {
                      required: validators.required
                    }
                  }}
                  control={control}
                  errors={errors}
                />

                <WriteField
                  item={{
                    keyName: keyNames.VORA_SIGNUP_FULLNAME,
                    Component: TextField,
                    columns: 1,
                    componentProps: {
                      placeholder: 'Type your Your Full name'
                    },
                    languageKey: 'Full Name',
                    section: 0,
                    tooltipShow: false,
                    validate: {
                      required: validators.required
                    }
                  }}
                  control={control}
                  errors={errors}
                />

                <WriteField
                  item={{
                    keyName: keyNames.VORA_SIGNUP_URLNAME,
                    Component: TextField,
                    columns: 1,
                    componentProps: {
                      placeholder: 'Type your Your Url Name'
                    },
                    tooltipShow: true,
                    tooltipText: TOOLTIP_FOR_URL_NAME,
                    languageKey: 'Url Name',
                    section: 0,
                    validate: {
                      required: validators.required,
                      isValidUrl: (values: string) => validators.isValidUrl(values)
                    }
                  }}
                  control={control}
                  errors={errors}
                />

                <WriteField
                  item={{
                    keyName: keyNames.VORA_SIGNUP_PHONE,
                    Component: TextField,
                    columns: 1,
                    componentProps: {
                      placeholder: 'Type Your Phone'
                    },
                    languageKey: 'Phone',
                    section: 0,
                    tooltipShow: false,
                    validate: {
                      phone: validators.phone
                    }
                  }}
                  control={control}
                  errors={errors}
                />
              </>
            )}
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Stack spacing={1}>
            <Button
              disabled={!isValid}
              fullWidth
              size="large"
              variant="contained"
              sx={{
                '&.Mui-disabled': {
                  backgroundColor: theme.palette.primary.main
                }
              }}
              onClick={() => {
                handleSubmit((data) => onSubmit({ formData: data }), onError)();
              }}
              color="primary"
            >
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

export default SignupSiteForm;
