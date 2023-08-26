import React, { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import validators from '@base/utils/validation/fieldValidator';

//config

import {
  Box,
  Button,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import MiModal from '@base/components/@hanbiro/MiModal';
import WriteField from '@base/containers/WriteField';
import { getParams } from './payload';
import { useUserMutation } from '../../hooks/useUserMutation';
import { useOrg } from '@base/hooks/iam/useOrg';
import * as keyNames from '@settings/users-groups/users/config/keyNames';
import { WRITE_FIELDS_MAX_LENGTH } from '@base/config/constant';
import UserPhones from '../../containers/UserPhones/Write';
import UserEmails from '../../containers/UserEmails/Write';
import { useTranslation } from 'react-i18next';
import {
  USER_WRITE_LANGUAGE_KEY_DISPLAY_NAME,
  USER_WRITE_LANGUAGE_KEY_FULL_NAME,
  USER_WRITE_LANGUAGE_KEY_URL,
  USER_WRITE_PLACEHOLDER_DISPLAY_NAME,
  USER_WRITE_PLACEHOLDER_FULL_NAME,
  USER_WRITE_PLACEHOLDER_URL,
  USER_WRITE_TITLE_FORM
} from '../../config/constants';
import { InputLabel } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { TableRow } from '@mui/material';
import SelectBoxCustom from '@base/components/@hanbiro/SelectBoxCustom';
import { MEMBER_TYPES_OPTIONS } from '@settings/users-groups/groups/config/constants';
import HanAvatar from '@base/components/@hanbiro/HanAvatar';

interface WriteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InvitePeoplePage = (props: WriteModalProps) => {
  const { isOpen, onClose } = props;
  const theme = useTheme();
  //state
  const [isReset, setIsReset] = useState(false);
  const { t } = useTranslation();
  //react-hook
  const {
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      displayName: '',
      fullName: '',
      urlName: '',
      emails: [],
      phones: []
    },
    criteriaMode: 'firstError',
    mode: 'onChange'
  });
  //create mutation\
  const { mCreate } = useUserMutation();
  const { id: orgId } = useOrg();

  //when submit error, call this
  const onError = (errors: any, e: any) => {
    console.log('error', errors, e);
  };

  //close
  const handleClose = () => {
    onClose();
  };

  //submit form
  const onSubmit = useCallback((formData: any) => {
    mCreate.mutate(getParams(formData, orgId));
  }, []);

  useEffect(() => {
    if (mCreate.isSuccess) onClose && onClose();
  }, [mCreate.isSuccess]);

  const MainFields = () => {
    return (
      <Box sx={{ p: 2.5 }}>
        <Typography variant="h3" sx={{ fontWeight: 400 }}>
          Invite people to hanbiro
        </Typography>
        <Typography>
          Invite teammates to collaborate and use products in your organization. We'll ask new users to enter their personal details when
          they sign up.
        </Typography>
        <Grid container spacing={2} alignItems="center" sx={{ mt: 3 }}>
          <WriteField
            item={{
              keyName: keyNames.KEY_USER_EMAIL,
              Component: TextField,
              columns: 1,
              componentProps: {
                placeholder: t('Invete by email address...')
              },
              languageKey: 'Email addresses',
              section: 0,
              tooltipShow: false,
              tooltipText: 'true',
              validate: {
                required: validators.required,
                maxLength: (values: string) => validators.maxLength(values, WRITE_FIELDS_MAX_LENGTH[keyNames.KEY_USER_DISPLAY_NAME])
              }
            }}
            control={control}
            helperText="Separate emails using a comma. Note, we can't send invitations to distribution lists"
            errors={errors}
          />
        </Grid>
        <TableContainer sx={{ py: 2.5 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ textTransform: 'capitalize' }}>Product</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ textTransform: 'capitalize' }}>Product roles</Box>
                    <Box color={theme.palette.primary.main} sx={{ textTransform: 'capitalize' }}>
                      Unselect all
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={{ display: 'flex' }}>
                  <HanAvatar name={'DH Kim'} />
                  <Box sx={{ pl: 1 }}>
                    <Typography>Team Channel</Typography>
                    <Typography color={theme.palette.secondary.main}>hanbiro</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <SelectBoxCustom options={MEMBER_TYPES_OPTIONS} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ display: 'flex' }}>
                  <HanAvatar name={'DH Kim'} />
                  <Box sx={{ pl: 1 }}>
                    <Typography>Vora Sales</Typography>
                    <Typography color={theme.palette.secondary.main}>hanbiro</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <SelectBoxCustom options={MEMBER_TYPES_OPTIONS} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ display: 'flex' }}>
                  <HanAvatar name={'DH Kim'} />
                  <Box sx={{ pl: 1 }}>
                    <Typography>Vora Marketing</Typography>
                    <Typography color={theme.palette.secondary.main}>hanbiro</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <SelectBoxCustom options={MEMBER_TYPES_OPTIONS} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ pt: 2.5, pb: 1.5 }}>
          <InputLabel>Group membership</InputLabel>
          <Button
            variant="contained"
            color="secondary"
            sx={{
              color: `${theme.palette.secondary.main}`,
              // marginLeft: '16px',
              width: '100%',
              background: `${theme.palette.grey[100]}`,
              justifyContent: 'flex-start',
              '&:hover': {
                backgroundColor: `${theme.palette.grey[200]}`
              }
            }}
          >
            Add groups
          </Button>
          <Typography color={theme.palette.secondary.main} sx={{ fontSize: '0.8rem' }}>
            Customized groups give users acccess to specific projects or spaces.
          </Typography>
        </Box>
        <Typography sx={{ display: 'flex', alignItems: 'center', pb: 1.5 }}>
          <KeyboardArrowRightIcon />
          Personalize invitation email
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Button
            size="small"
            variant="contained"
            sx={{
              color: `${theme.palette.secondary.main}`,
              background: `${theme.palette.grey[100]}`,
              '&:hover': {
                backgroundColor: `${theme.palette.grey[200]}`
              },
              '&.Mui-disabled': {
                backgroundColor: theme.palette.primary.main
              }
            }}
            onClick={() => {
              handleSubmit((data) => onSubmit(data), onError)();
            }}
          >
            {t('Invite User')}
          </Button>
          <Button size="small" color="secondary" variant="outlined" onClick={handleClose}>
            {t('ncrm_common_btn_cancle')}
          </Button>
        </Stack>
        <Box sx={{ py: 2.5 }}>
          <Typography>
            This site is protected by reCAPTCHA and the Google{' '}
            <span style={{ color: `${theme.palette.primary.main}` }}>Privacy Policy</span> and{' '}
            <span style={{ color: `${theme.palette.primary.main}` }}>Terms of Service</span> apply.
          </Typography>
        </Box>
      </Box>
    );
  };
  //buttons
  const Footer = useMemo(() => {
    return (
      <Grid container alignItems="center">
        {/* <Grid item></Grid> */}
        {/* <Grid item>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button
              size="small"
              variant="contained"
              sx={{
                '&.Mui-disabled': {
                  backgroundColor: theme.palette.primary.main
                }
              }}
              color="primary"
              onClick={() => {
                handleSubmit((data) => onSubmit(data), onError)();
              }}
              disabled={!isValid}
            >
              {t('Invite User')}
            </Button>
            <Button size="small" color="secondary" variant="outlined" onClick={handleClose}>
              {t('ncrm_common_btn_cancle')}
            </Button>
          </Stack>
        </Grid> */}
      </Grid>
    );
  }, [isValid]);

  //======================== Debug ========================//
  // console.log('form values', watch()); //get form values when inputing
  //console.log('form errors', errors); //get form values when inputing
  //console.log('form isValid', isValid); //get form values when inputing
  //console.log('form fields', fields); //All fields from pagelayout
  //======================== End Debug ========================//

  return (
    <Suspense fallback={<></>}>
      <MiModal
        title={t('Invite Users') as string}
        isOpen={isOpen} //writeOption.isOpenWrite
        size="md"
        fullScreen={false}
        onClose={handleClose}
        footer={Footer}
      >
        {isOpen && <form onSubmit={handleSubmit(onSubmit, onError)}>{MainFields()}</form>}
      </MiModal>
    </Suspense>
  );
};

export default InvitePeoplePage;
