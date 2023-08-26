import * as keyNames from '@settings/users-groups/users/config/keyNames';
import { Autocomplete, Box, Button, Grid, IconButton, TextField, Tooltip, Typography, useTheme } from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';

import { useEffect, useMemo, useState } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import useSnackBar from '@base/hooks/useSnackBar';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import validators from '@base/utils/validation/fieldValidator';
import { Add } from '@mui/icons-material';
import { CommonViewFieldProps } from '@base/containers/ViewField/Common/interface';

import ViewField from '@base/components/@hanbiro/ViewPage/ViewField';
import { Phone } from '../../types';
import { useOrg } from '@base/hooks/iam/useOrg';
import { useUserMutation } from '../../hooks/useUserMutation';
import SelectBoxCustomViewField from '@settings/template/containers/ViewFields/SelectBoxCustomView';
import { LabelValue } from '@base/types/app';
import {
  USER_ADD_PHONE,
  USER_ADD_PRIMARY_PHONE,
  USER_OTHERS_PHONE,
  USER_PHONE,
  USER_PHONE_ERROR_EXISTED,
  USER_PHONE_SUCCESS,
  USER_PRIMARY_PHONE
} from '../../config/constants';
import { useTranslation } from 'react-i18next';

interface UserPhonesProps {
  value: Phone[];
  menuSource: string;
  menuSourceId: string;

  onChange?: (val: Phone[]) => void;
  refetch?: () => void;
}
const UserPhones = (props: UserPhonesProps) => {
  const { value, menuSource, menuSourceId, onChange, refetch } = props;
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  const { t } = useTranslation();

  const [phones, setPhones] = useState<Phone[]>([]);
  const [addPhone, setAddPhone] = useState<string>('');
  const [primaryPhone, setPrimaryPhone] = useState<Phone>();
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const [isAddPrimary, setIsAddPrimary] = useState<boolean>(false);
  //const params
  const { id: orgId } = useOrg();
  // const { locale } = useOrgLocale();
  useEffect(() => {
    if (value) {
      setPhones(value);
      setPrimaryPhone(value.find((o: Phone) => o.primary == true));
    }
  }, [value]);
  //Mutation
  const { mUpdate, mAddUserPhone, mRemoveUserPhone } = useUserMutation();
  useEffect(() => {
    if (mUpdate.isSuccess) {
      refetch && refetch();
      setAddPhone('');
      console.log('update success');
      enqueueSuccessBar(t(USER_PHONE_SUCCESS));
    }
  }, [mUpdate.isSuccess]);

  const handleAddPhone = (value: string) => {
    // console.log('Valueeeeeeeeeeeeeeeeeeeee', value);
    const dupPhone = phones.find((o) => o.number === value);
    if (dupPhone) {
      enqueueErrorBar(t(USER_PHONE_ERROR_EXISTED));
    } else {
      mAddUserPhone.mutate({
        input: {
          phone: value,
          orgId: orgId,
          userId: menuSourceId
        }
      });
      setIsAdd(false);
      setIsAddPrimary(false);
    }
  };
  const handleEditPrimaryPhone = (value: LabelValue) => {
    // console.log('Valueeeeeeeeeeeeeeeeeeeee', value);
    if (value) {
      mUpdate.mutate({
        input: {
          primaryPhone: value.value,
          orgId: orgId,
          id: menuSourceId
        }
      });
    }
  };
  const handleDeletePhone = (index: number) => {
    // console.log('Valueeeeeeeeeeeeeeeeeeeee', value);
    mRemoveUserPhone.mutate({
      input: {
        phone: phones[index].number,
        orgId: orgId,
        userId: menuSourceId
      }
    });
    setIsAdd(false);
  };

  //View Field config
  const getViewFieldProps = useMemo(
    () => (isPrimary: boolean) => {
      const viewFieldProps: CommonViewFieldProps = {
        keyName: isPrimary ? keyNames.KEY_USER_PHONE_PRIMARY : keyNames.KEY_USER_PHONE,
        value: isPrimary
          ? {
              label: primaryPhone?.number ?? '',
              value: primaryPhone?.number ?? ''
            }
          : '',
        // onChange: onChange, // for hook form
        userPermission: { isEdit: true, isShow: true },
        config: isPrimary
          ? {
              showFullRow: true,
              component: SelectBoxCustomViewField,
              componentProps: {
                options: phones.map((e) => {
                  return {
                    label: e.number,
                    value: e.number
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
              validate: {
                required: validators.required
                // phone: validators.phone
              }
            },
        onSave: (keyName, isSuccess, value) => (isPrimary ? handleEditPrimaryPhone(value.primaryPhone) : handleAddPhone(value.phones)),
        onClose: isPrimary
          ? () => {}
          : () => {
              setIsAdd(false), setIsAddPrimary(false);
            },
        menuSource: menuSource,
        menuSourceId: menuSourceId,
        isIAMComponent: true
      };

      return viewFieldProps;
    },
    [phones, primaryPhone]
  );
  // console.log('is Add phone primary', isAddPrimary);
  // console.log('phones.splice(index, 1, { address: newPhone })', phones.splice(1, 1, { address: 'newPhone' }));
  const UserPhoneMemo = useMemo(() => {
    // console.log('primaryPhone', primaryPhone);
    return (
      <Grid container sx={{ px: 2 }}>
        {/* <Grid item xs={12}>
          <Typography color="textSecondary">{t(USER_PHONE)}</Typography>
        </Grid> */}
        <Grid item xs={12}>
          <Grid padding={'8px'} container>
            {/*--------------------- Primary Phone -------------------------------------------*/}
            <Grid item xs={12}>
              <Typography color="textSecondary">{t(USER_PRIMARY_PHONE)}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {primaryPhone ? (
                  <Box
                    sx={{
                      display: 'flex',
                      width: '300px'
                    }}
                  >
                    <ViewField {...getViewFieldProps(true)} />
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
                        {USER_ADD_PRIMARY_PHONE}
                      </Button>
                    ) : (
                      // <ViewField {...getViewFieldProps(false)} mode={true} />
                      <ViewField isDefaultEdit={true} {...getViewFieldProps(false)} />
                    )}
                  </>
                )}
              </Box>
            </Grid>
            {/*--------------------- Others Phone -------------------------------------------*/}
            <Grid item xs={12}>
              <Typography color="textSecondary">{t(USER_OTHERS_PHONE)}</Typography>
              <Grid container>
                <Grid item xs={12}>
                  <>
                    {phones.map((phone: Phone, indx: number) => {
                      if (phone.primary !== true)
                        return (
                          <Box
                            key={indx}
                            sx={{
                              display: 'flex',
                              // mt: '10px',
                              '&:hover': {
                                '& svg': { visibility: 'visible' }
                              }
                            }}
                          >
                            <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                              <Typography sx={{ pl: '8px' }}>{phone?.number}</Typography>
                            </Grid>
                            <Tooltip disableInteractive title={'Delete email'}>
                              <IconButton sx={{ ml: '20px', '& svg': { visibility: 'hidden' } }} onClick={() => handleDeletePhone(indx)}>
                                <DeleteOutlineIcon color="error" fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        );
                    })}
                  </>
                </Grid>
                {primaryPhone && (
                  <>
                    {!isAdd ? (
                      <Button
                        // sx={{ mt: '10px' }}
                        variant="text"
                        size="small"
                        color="primary"
                        startIcon={<Add />}
                        onClick={() => setIsAdd(true)}
                      >
                        {t(USER_ADD_PHONE)}
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
  }, [phones, primaryPhone, isAdd, isAddPrimary, addPhone]);
  return <Grid>{UserPhoneMemo}</Grid>;
};
export default UserPhones;
