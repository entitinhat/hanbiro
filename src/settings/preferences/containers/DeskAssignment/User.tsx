import React, { useEffect, useMemo, useState } from 'react';
import { Button, IconButton, Stack, Switch, TextField, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { ColumnDef } from '@tanstack/react-table';
import { useRecoilValue } from 'recoil';

// project
import SelectBox from '@base/components/@hanbiro/SelectBox';
import ListTable, { ListTableProps } from '@base/components/@hanbiro/List/ListTable';
import { makeTable8Columns } from '@base/components/@hanbiro/ReactTable8/Helper';
import { CountryType, OptionValue } from '@base/types/common';
import UserAutoComplete from '@sign-in/containers/UserAutoComplete';
import useSnackBar from '@base/hooks/useSnackBar';
import MobileInput from '@base/components/@hanbiro/MobileInput';
import { Country } from '@base/types/setting';
import { countrySettingSelector } from '@base/store/selectors/app';

// assignment
import { USER_TYPE_EXTERNAL, USER_TYPE_INTERNAL, USER_TYPE_OPTIONS } from '@settings/preferences/config/desk/constants';
import { useAssignmentUsers } from '@settings/preferences/hooks/desk/useAssigmentUsers';
import * as keyNames from '@settings/preferences/config/desk/keyNames';
import useAssignmentUsersMutation from '@settings/preferences/hooks/desk/useAssignmentUsersMutation';

const User = () => {
  const { t } = useTranslation();
  const [items, setItems] = useState<any[]>([]);
  const [countryPhones, setCountryPhones] = useState<OptionValue[]>([]);
  const [rowHover, setRowHover] = useState<any>();
  const { enqueueErrorBar } = useSnackBar();
  const { data: listUsers, isLoading: isLoadingUser, refetch } = useAssignmentUsers('');
  const { mDeleteUsers, mAddUsers, mUpdateUsers } = useAssignmentUsersMutation();

  // set phone data
  const countryData: Country[] = useRecoilValue(countrySettingSelector);
  useEffect(() => {
    let newCountryPhones: CountryType[] = [];
    countryData?.map((country: Country) => {
      newCountryPhones.push({
        ...country,
        phoneCode: country?.phoneCode || ''
      } as CountryType);
    });
    setCountryPhones(
      newCountryPhones.filter((v: any) => v?.phoneCode !== '').map((v: any) => ({ keyName: v?.phoneCode, languageKey: v?.phoneCode }))
    );
  }, [countryData]);

  // init value
  useEffect(() => {
    if (listUsers?.results && listUsers?.results?.length > 0) {
      if (items.length === 0) {
        setItems(listUsers?.results.map((v: any, i: number) => ({ ...v, rowIndex: i })));
      } else {
        setItems((prev: any) => {
          const newData = listUsers?.results;
          const newItems = prev.map((v: any, i: number) => {
            let newItem = v;
            if (newData.find((dataItem: any) => dataItem.id === v?.id)) {
              newItem = newData.find((dataItem: any) => dataItem.id === v?.id);
            }
            if (v.type === USER_TYPE_INTERNAL) {
              newItem = newData.find((dataItem: any) => dataItem?.user?.id === v?.user?.id);
            } else if (v.type === USER_TYPE_EXTERNAL) {
              newItem = newData.find(
                (dataItem: any) =>
                  dataItem?.name === v?.name &&
                  dataItem?.type === v?.type &&
                  dataItem?.mobile?.phoneCode === v?.mobile?.phoneCode &&
                  dataItem?.mobile?.country === v?.mobile?.country &&
                  dataItem?.phone?.country === v?.phone?.country &&
                  dataItem?.phone?.country === v?.phone?.country
              );
            }

            return { ...newItem, rowIndex: i };
          });
          return newItems;
        });
      }
    } else {
      setItems([]);
    }
  }, [listUsers]);

  // ========= handle add, update, delete row===========
  const handleUpdateActive = (newValue: boolean, id: string) => {
    const params = {
      user: {
        id: id,
        active: newValue
      }
    };
    mUpdateUsers.mutate(params);
  };

  const handleAddUser = () => {
    setItems((prev: any) => {
      const newRow = {
        isEmptyRow: true,
        rowIndex: prev.length
      };

      return [...prev, newRow];
    });
  };

  const onTypeChange = (nVal: OptionValue, i: number) => {
    setItems((prev: any) => {
      let newItems = [...prev];

      newItems[i] = {
        ...newItems[i],
        [keyNames.KEY_SETTING_PREFERENCES_ASSIGNMENT_USER_TYPE]: nVal.keyName
      };

      return newItems;
    });
  };

  //handle create internal user
  const onUserChange = (nVal: any) => {
    const existedUser = !!items.find((v: any) => v?.user?.id === nVal?.id);
    if (!existedUser) {
      const params = {
        user: {
          type: USER_TYPE_INTERNAL,
          user: {
            id: nVal.id,
            name: nVal.name
          },
          email: '',
          phone: {},
          mobile: {},
          active: true
        }
      };
      mAddUsers.mutate(params);
    } else {
      enqueueErrorBar('User existed!');
    }
  };

  // ========== handle Delete
  const handleDeleteEmptyRow = (rowIndex: number) => {
    setItems((prev: any) => {
      const newItems = [...prev];
      newItems.splice(rowIndex, 1);
      return newItems.map((v: any, i: number) => ({ ...v, rowIndex: i }));
    });
  };

  const handleDeleteRow = (id: string, rowIndex: number) => {
    setItems((prev: any) => {
      const newItems = [...prev];
      newItems.splice(rowIndex, 1);
      const params = {
        ids: [id]
      };
      mDeleteUsers.mutate(params);
      return newItems.map((v: any, i: number) => ({ ...v, rowIndex: i }));
    });
  };

  // ========== handle external user
  const handleChangeMobile = (nVal: any, i: number, field: string) => {
    setItems((prev) => {
      const newItem = [...prev];
      newItem[i] = {
        ...newItem[i],
        [keyNames.KEY_SETTING_PREFERENCES_ASSIGNMENT_USER_MOBILE]: {
          ...newItem[i]?.[keyNames.KEY_SETTING_PREFERENCES_ASSIGNMENT_USER_MOBILE],
          [field]: nVal
        }
      };

      return newItem.map((v: any, i: number) => ({ ...v, rowIndex: i }));
    });
  };

  const handleChangePhone = (nVal: any, i: number, field: string) => {
    setItems((prev) => {
      const newItem = [...prev];
      newItem[i] = {
        ...newItem[i],
        [keyNames.KEY_SETTING_PREFERENCES_ASSIGNMENT_USER_PHONE]: {
          ...newItem[i]?.[keyNames.KEY_SETTING_PREFERENCES_ASSIGNMENT_USER_PHONE],
          [field]: nVal
        }
      };

      return newItem.map((v: any, i: number) => ({ ...v, rowIndex: i }));
    });
  };

  const handleChangeField = (nVal: any, i: number, field: string) => {
    setItems((prev) => {
      const newItem = [...prev];
      newItem[i] = {
        ...newItem[i],
        [field]: nVal
      };

      return newItem.map((v: any, i: number) => ({ ...v, rowIndex: i }));
    });
  };

  const handleCreateExternalUser = (data: any) => {
    const params = {
      user: {
        type: USER_TYPE_EXTERNAL,
        name: data?.name,
        email: data?.email,
        phone: {
          country: data?.phone?.country,
          phoneNumber: data?.phone?.phoneNumber
        },
        mobile: {
          country: data?.mobile?.country,
          phoneNumber: data?.mobile?.phoneNumber
        },
        active: true,
        user: {}
      }
    };
    mAddUsers.mutate(params);
  };

  // ========== make table=========
  const getMapColumns = () => {
    return {
      [keyNames.KEY_SETTING_PREFERENCES_ASSIGNMENT_USER_TYPE](col: string, data: any, extra: any) {
        if (data?.isEmptyRow) {
          return (
            <SelectBox
              options={USER_TYPE_OPTIONS}
              value={USER_TYPE_OPTIONS.find((v: OptionValue) => v?.keyName === data?.type) || undefined}
              onChange={(nVal: any) => onTypeChange(nVal, data?.rowIndex)}
            />
          );
        } else {
          return USER_TYPE_OPTIONS.find((v: OptionValue) => v.keyName == data?.[col])?.languageKey || '';
        }
      },
      [keyNames.KEY_SETTING_PREFERENCES_ASSIGNMENT_USER_NAME](col: string, data: any, extra: any) {
        if (data?.isEmptyRow) {
          if (data?.type === USER_TYPE_INTERNAL) {
            return <UserAutoComplete onChange={(nVal: any) => onUserChange(nVal)} single />;
          } else if (data?.type === USER_TYPE_EXTERNAL) {
            return (
              <TextField
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChangeField(e?.target?.value, data?.rowIndex, keyNames.KEY_SETTING_PREFERENCES_ASSIGNMENT_USER_NAME)
                }
                value={data?.[col] || ''}
                fullWidth
                variant="outlined"
              />
            );
          } else {
            return '';
          }
        } else {
          return data?.name ? <Typography>{data?.name}</Typography> : '';
        }
      },
      [keyNames.KEY_SETTING_PREFERENCES_ASSIGNMENT_USER_EMAIL](col: string, data: any, extra: any) {
        if (data?.isEmptyRow) {
          if (data?.type === USER_TYPE_INTERNAL) {
            return '';
          } else if (data?.type === USER_TYPE_EXTERNAL) {
            return (
              <TextField
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChangeField(e?.target?.value, data?.rowIndex, keyNames.KEY_SETTING_PREFERENCES_ASSIGNMENT_USER_EMAIL)
                }
                value={data?.[col] || ''}
                fullWidth
                variant="outlined"
              />
            );
          } else {
            return '';
          }
        } else {
          return data?.[col] ? <Typography>{data?.[col]}</Typography> : '';
        }
      },
      [keyNames.KEY_SETTING_PREFERENCES_ASSIGNMENT_USER_MOBILE](col: string, data: any, extra: any) {
        if (data?.isEmptyRow) {
          if (data?.type === USER_TYPE_INTERNAL) {
            return '';
          } else if (data?.type === USER_TYPE_EXTERNAL) {
            return (
              <Stack direction={'row'} width={'100%'} spacing={1}>
                <SelectBox
                  options={countryPhones}
                  value={countryPhones.find((v: any) => v?.keyName === data?.mobile?.country)}
                  onChange={(nVal: OptionValue) => handleChangeMobile(nVal.keyName, data?.rowIndex, 'country')}
                  sx={{ flexBasis: '20%' }}
                  placeholder=""
                />
                <TextField
                  fullWidth
                  type="number"
                  placeholder={t('ncrm_common_mobile_number') as string}
                  value={data?.mobile?.phoneNumber || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeMobile(e.target.value, data?.rowIndex, 'phoneNumber')}
                  sx={{ flexBasis: '80%' }}
                />
              </Stack>
            );
          } else {
            return '';
          }
        } else {
          return data?.[col] ? (
            <Stack direction={'row'} spacing={1}>
              <Typography>{data?.[col]?.country}</Typography>
              <Typography>{data?.[col]?.phoneNumber}</Typography>
            </Stack>
          ) : (
            ''
          );
        }
      },
      [keyNames.KEY_SETTING_PREFERENCES_ASSIGNMENT_USER_PHONE](col: string, data: any, extra: any) {
        if (data?.isEmptyRow) {
          if (data?.type === USER_TYPE_INTERNAL) {
            return '';
          } else if (data?.type === USER_TYPE_EXTERNAL) {
            return (
              <Stack direction={'row'} width={'100%'} spacing={1}>
                <SelectBox
                  options={countryPhones}
                  value={countryPhones.find((v: any) => v?.keyName === data?.phone?.country)}
                  onChange={(nVal: OptionValue) => handleChangePhone(nVal.keyName, data?.rowIndex, 'country')}
                  sx={{ flexBasis: '20%' }}
                  placeholder=""
                />
                <TextField
                  fullWidth
                  type="number"
                  placeholder={t('ncrm_common_phone_number') as string}
                  value={data?.phone?.phoneNumber || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangePhone(e.target.value, data?.rowIndex, 'phoneNumber')}
                  sx={{ flexBasis: '80%' }}
                />
              </Stack>
            );
          } else {
            return '';
          }
        } else {
          return data?.[col] ? (
            <Stack direction={'row'} spacing={1}>
              <Typography>{data?.[col]?.country}</Typography>
              <Typography>{data?.[col]?.phoneNumber}</Typography>
            </Stack>
          ) : (
            ''
          );
        }
      },
      [keyNames.KEY_SETTING_PREFERENCES_ASSIGNMENT_USER_ACTIVE](col: string, data: any, extra: any) {
        const checked = data?.[col] || false;
        if (data?.isEmptyRow) {
          return <Switch defaultChecked={true} disabled />;
        } else {
          return <Switch defaultChecked={checked} onClick={() => handleUpdateActive(!checked, data?.id || '')} />;
        }
      },
      deleteIcon(col: string, data: any, extra: any) {
        if (data?.isEmptyRow) {
          if (data?.type === USER_TYPE_EXTERNAL) {
            return (
              <Stack direction={'row'} spacing={1} width={'100%'} justifyContent={'flex-end'}>
                <IconButton
                  sx={{ display: rowHover && (rowHover?.index === data?.rowIndex || rowHover?.id === data?.id) ? 'flex' : 'none' }}
                  size="small"
                  color="success"
                  onClick={() => handleCreateExternalUser(data)}
                >
                  <CheckOutlinedIcon fontSize="small" />
                </IconButton>
                <IconButton
                  sx={{ display: rowHover && (rowHover?.index === data?.rowIndex || rowHover?.id === data?.id) ? 'flex' : 'none' }}
                  size="small"
                  color="error"
                  onClick={() => handleDeleteEmptyRow(data?.rowIndex)}
                >
                  <DeleteOutlineIcon fontSize="small" />
                </IconButton>
              </Stack>
            );
          } else {
            return (
              <Stack direction={'row'} spacing={1} width={'100%'} justifyContent={'flex-end'}>
                <IconButton
                  sx={{ display: rowHover && (rowHover?.index === data?.rowIndex || rowHover?.id === data?.id) ? 'flex' : 'none' }}
                  size="small"
                  color="error"
                  onClick={() => handleDeleteEmptyRow(data?.rowIndex)}
                >
                  <DeleteOutlineIcon fontSize="small" />
                </IconButton>
              </Stack>
            );
          }
        } else {
          return (
            <Stack direction={'row'} spacing={1} width={'100%'} justifyContent={'flex-end'}>
              <IconButton
                sx={{ display: rowHover && (rowHover?.index === data?.rowIndex || rowHover?.id === data?.id) ? 'flex' : 'none' }}
                size="small"
                color="error"
                onClick={() => handleDeleteRow(data?.id, data?.rowIndex)}
              >
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            </Stack>
          );
        }
      }
    };
  };
  const fields = useMemo(() => {
    return [
      {
        languageKey: t('ncrm_generalsetting_preferences_user_type'),
        keyName: keyNames.KEY_SETTING_PREFERENCES_ASSIGNMENT_USER_TYPE,
        enableSorting: false,
        width: 'auto'
      },
      {
        languageKey: t('ncrm_generalsetting_preferences_user_name'),
        keyName: keyNames.KEY_SETTING_PREFERENCES_ASSIGNMENT_USER_NAME,
        enableSorting: false,
        width: '400px'
      },
      {
        languageKey: t('ncrm_generalsetting_preferences_email'),
        keyName: keyNames.KEY_SETTING_PREFERENCES_ASSIGNMENT_USER_EMAIL,
        enableSorting: false,
        width: 'auto'
      },
      {
        languageKey: t('ncrm_generalsetting_preferences_mobile'),
        keyName: keyNames.KEY_SETTING_PREFERENCES_ASSIGNMENT_USER_MOBILE,
        enableSorting: false,
        width: 'auto'
      },
      {
        languageKey: t('ncrm_generalsetting_preferences_phone'),
        keyName: keyNames.KEY_SETTING_PREFERENCES_ASSIGNMENT_USER_PHONE,
        enableSorting: false,
        width: 'auto'
      },
      {
        languageKey: t('ncrm_generalsetting_preferences_active'),
        keyName: keyNames.KEY_SETTING_PREFERENCES_ASSIGNMENT_USER_ACTIVE,
        enableSorting: false,
        width: 'auto'
      },
      {
        languageKey: t(''),
        keyName: 'deleteIcon',
        enableSorting: false,
        width: '120px'
      }
    ];
  }, []);
  const columns = useMemo<ColumnDef<any>[]>(() => [...makeTable8Columns(fields, getMapColumns(), {}, [])], [fields, rowHover]);

  const TableMemo = useMemo(() => {
    const listTableProps: ListTableProps = {
      rows: items || [],
      columns: columns,
      sx: { p: 0, mb: 0 },
      setRowHover: setRowHover
    };
    return <ListTable {...listTableProps} />;
  }, [items, columns]);
  // ========== End make table=========

  return (
    <div>
      {TableMemo}
      <Button
        size="small"
        sx={{ marginTop: '5px', marginLeft: '10px' }}
        variant="contained"
        startIcon={<Add fontSize="small" />}
        onClick={() => {
          handleAddUser();
        }}
      >
        {t('ncrm_generalsetting_preferences_add_user')}
      </Button>
    </div>
  );
};

export default User;
