import { useEffect, useMemo, useState } from 'react';
//project
import useSnackBar from '@base/hooks/useSnackBar';

import validators from '@base/utils/validation/fieldValidator';
import * as keyNames from '@settings/users-groups/users/config/keyNames';

//material-UI
import { Autocomplete, Box, Button, Grid, IconButton, Stack, TextField, Tooltip, Typography, useTheme } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { Add } from '@mui/icons-material';
import ViewField from '@base/components/@hanbiro/ViewPage/ViewField';
import { CommonViewFieldProps } from '@base/containers/ViewField/Common/interface';
import TextEditField from '@base/containers/ViewField/Text';
import { useOrg } from '@base/hooks/iam/useOrg';
import { Email } from '../../types';
import { useUserMutation } from '../../hooks/useUserMutation';
import SelectBoxCustomViewField from '@settings/template/containers/ViewFields/SelectBoxCustomView';
import { LabelValue } from '@base/types/app';
import {
  USER_ADD_EMAIL,
  USER_ADD_PRIMARY_EMAIL,
  USER_EMAIL,
  USER_EMAIL_ERROR_EXISTED,
  USER_EMAIL_ERROR_FORMAT,
  USER_EMAIL_SUCCESS,
  USER_OTHERS_EMAIL,
  USER_PRIMARY_EMAIL
} from '../../config/constants';
import { useTranslation } from 'react-i18next';

interface UserEmailsProps {
  value: Email[];
  menuSource: string;
  menuSourceId: string;
  // mode?: 'view' | 'write';
  onChange?: (val: Email[]) => void;
  refetch?: () => void;
}
const UserEmails = (props: UserEmailsProps) => {
  const { value, menuSource, menuSourceId, onChange, refetch } = props;

  const theme = useTheme();
  const { t } = useTranslation();
  const { id: orgId } = useOrg();
  // const { locale } = useOrgLocale();

  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  const [emails, setEmails] = useState<Email[]>([]);
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const [addEmail, setAddEmail] = useState<string>('');
  const [editPrimaryEmail, setEditPrimaryEmail] = useState<Email>();
  const [primaryEmail, setPrimaryEmail] = useState<Email>();
  const [isAddPrimary, setIsAddPrimary] = useState<boolean>(false);
  useEffect(() => {
    if (value) {
      setEmails(value);
      setPrimaryEmail(value.find((o: Email) => o.primary == true));
    }
  }, [value]);

  useEffect(() => {
    if (primaryEmail) {
      setEditPrimaryEmail(primaryEmail);
    }
  }, [primaryEmail]);
  const { mRemoveUserEmail, mUpdate, mAddUserEmail } = useUserMutation();

  const handleAddEmail = (value: string) => {
    // console.log('Valueeeeeeeeeeeeeeeeeeeee', value);
    const dupEmail = emails.find((o) => o.address === value);
    if (dupEmail) {
      enqueueErrorBar(t(USER_EMAIL_ERROR_EXISTED));
    } else if (validators.email(value) !== true) {
      enqueueErrorBar(t(USER_EMAIL_ERROR_FORMAT));
    } else {
      mAddUserEmail.mutate({
        input: {
          email: value,
          orgId: orgId,
          userId: menuSourceId
        }
      });
      setIsAdd(false);
      setIsAddPrimary(false);
    }
  };
  const handleDeleteEmail = (index: number) => {
    mRemoveUserEmail.mutate({
      input: {
        email: emails[index].address,
        orgId: orgId,
        userId: menuSourceId
      }
    });
    setIsAdd(false);
  };
  const handleChangePrimaryEmail = (value: LabelValue) => {
    // console.log('value===> Primary Email', value);
    if (value) {
      mUpdate.mutate({
        input: {
          primaryEmail: value.value,
          orgId: orgId,
          id: menuSourceId
          // locale: locale
        }
      });
    }
  };

  useEffect(() => {
    if (mUpdate.isSuccess) {
      refetch && refetch();
      setAddEmail('');
      // console.log('update success');
      enqueueSuccessBar(t(USER_EMAIL_SUCCESS));
    }
  }, [mUpdate.isSuccess]);

  //View Field config
  const getViewFieldProps = useMemo(
    () => (isPrimary: boolean) => {
      // console.log('viewfield propsoptions', emails);
      const viewFieldProps: CommonViewFieldProps = {
        keyName: isPrimary ? keyNames.KEY_USER_EMAIL_PRIMARY : keyNames.KEY_USER_EMAIL,
        value: isPrimary ? { label: primaryEmail?.address, value: primaryEmail?.address } : '',
        // onChange: onChange, // for hook form
        userPermission: { isEdit: true, isShow: true },
        config: isPrimary
          ? {
              showFullRow: true,
              component: SelectBoxCustomViewField,
              componentProps: {
                options: emails.map((e) => {
                  return {
                    label: e.address,
                    value: e.address
                  };
                })
              },
              getValueView: (value: LabelValue) => {
                return value?.value ?? '';
              },
              getMutationValue: (value: LabelValue) => {
                return value?.value ?? '';
              }
            }
          : {
              showFullRow: true,
              component: TextEditField,
              validate: {
                required: validators.required,
                email: validators.email
              }
            },
        onSave: (keyName, isSuccess, value) => (isPrimary ? handleChangePrimaryEmail(value.primaryEmail) : handleAddEmail(value.emails)),
        onClose: isPrimary
          ? () => {}
          : () => {
              setIsAddPrimary(false), setIsAdd(false);
            },
        menuSource: menuSource,
        menuSourceId: menuSourceId,
        isIAMComponent: true
      };

      return viewFieldProps;
    },
    [emails, primaryEmail]
  );

  const UserEmailMemo = useMemo(() => {
    // console.log('primaryEmail', primaryEmail);
    return (
      <Grid container sx={{ px: 2 }}>
        {/* <Grid item xs={12}>
          <Typography color="textSecondary">{t(USER_EMAIL)}</Typography>
        </Grid> */}
        <Grid item xs={12}>
          <Grid padding={'8px'} container>
            {/*--------------------- Primary Email -------------------------------------------*/}
            <Grid item xs={12}>
              <Typography color="textSecondary">{t(USER_PRIMARY_EMAIL)}</Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  // mr: '10px',
                  '&:hover': {
                    '& svg': { visibility: 'visible' }
                  }
                }}
              >
                {primaryEmail ? (
                  <Box
                    sx={{
                      display: 'flex',
                      width: '300px'
                    }}
                  >
                    <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                      {/* <Typography>{primaryEmail?.address}</Typography> */}
                      <>
                        <ViewField {...getViewFieldProps(true)} />
                      </>
                    </Grid>
                  </Box>
                ) : (
                  <>
                    {!isAddPrimary ? (
                      <Button
                        // sx={{ mt: '5px' }}
                        variant="text"
                        size="small"
                        color="primary"
                        startIcon={<Add />}
                        onClick={() => setIsAddPrimary(true)}
                      >
                        {t(USER_ADD_PRIMARY_EMAIL)}
                      </Button>
                    ) : (
                      // <ViewField {...getViewFieldProps(false)} mode={true} />
                      <ViewField isDefaultEdit={true} {...getViewFieldProps(false)} />
                    )}
                  </>
                )}
              </Box>
            </Grid>
            {/*--------------------- Others Email -------------------------------------------*/}
            <Grid item xs={12}>
              <Typography sx={{ width: '100px' }} color="textSecondary">
                {t(USER_OTHERS_EMAIL)}
              </Typography>
              <Grid container>
                <Grid item xs={12}>
                  <>
                    {emails.map((email: Email, indx: number) => {
                      if (email.primary !== true)
                        return (
                          <Box
                            key={indx}
                            sx={{
                              display: 'flex',
                              mt: '10px',
                              '&:hover': {
                                '& svg': { visibility: 'visible' }
                              }
                            }}
                          >
                            <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                              <Typography sx={{ pl: '8px' }}>{email.address ?? ''}</Typography>
                            </Grid>
                            <Tooltip disableInteractive title={'Delete email'}>
                              <IconButton sx={{ ml: '20px', '& svg': { visibility: 'hidden' } }} onClick={() => handleDeleteEmail(indx)}>
                                <DeleteOutlineIcon color="error" fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        );
                    })}
                  </>
                </Grid>
                {primaryEmail && (
                  <>
                    {!isAdd ? (
                      <Button
                        sx={{ mt: '10px' }}
                        variant="text"
                        size="small"
                        color="primary"
                        startIcon={<Add />}
                        onClick={() => setIsAdd(true)}
                      >
                        {t(USER_ADD_EMAIL)}
                      </Button>
                    ) : (
                      <>
                        <ViewField isDefaultEdit={true} {...getViewFieldProps(false)} />
                      </>
                    )}
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }, [emails, primaryEmail, isAdd, addEmail, isAddPrimary, editPrimaryEmail]);
  return <Grid>{UserEmailMemo}</Grid>;
};
export default UserEmails;
