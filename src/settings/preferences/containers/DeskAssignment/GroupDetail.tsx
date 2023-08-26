import React, { useEffect, useMemo, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Divider, IconButton, InputAdornment, OutlinedInput, Stack, Switch, Typography, useTheme } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { useTranslation } from 'react-i18next';
import { Add, DeleteOutline, Search } from '@mui/icons-material';

// project
import { ColumnDef } from '@tanstack/react-table';
import { makeTable8Columns } from '@base/components/@hanbiro/ReactTable8/Helper';
import ListTable, { ListTableProps } from '@base/components/@hanbiro/List/ListTable';
import { ListPaginationProps } from '@base/components/@hanbiro/List/ListPagination';
import UserAutoComplete from '@sign-in/containers/UserAutoComplete';

// menu
import GroupDesc from './GroupDesc';
import GroupName from './GroupName';
import useAssignmentRepsMutation from '@settings/preferences/hooks/desk/useAssignmentRepsMutation';
import { useAssignmentReps } from '@settings/preferences/hooks/desk/useAssignmentReps';
import { AssignmentGroup } from '@settings/preferences/types/desk/assignment';
import useAssignmentGroupsMutation from '@settings/preferences/hooks/desk/useAssignmentGroupsMutation';
import * as keyNames from '@settings/preferences/config/desk/keyNames';
import useSnackBar from '@base/hooks/useSnackBar';

interface Props {
  viewItem: AssignmentGroup | null;
  onBack: () => void;
  groupId: string;
  onAfterSaved: (nVal: any) => void;
}

const GroupDetail = (props: Props) => {
  const { viewItem, onBack, groupId, onAfterSaved } = props;
  const theme = useTheme();
  const border = `1px solid ${theme.palette.divider}`;
  const [rowHover, setRowHover] = useState<any>();
  const { t } = useTranslation();
  const { enqueueErrorBar } = useSnackBar();
  const [items, setItems] = useState<any[]>([]);
  const [searchItems, setSearchItems] = useState<any[]>([]);
  // Call Data
  const { mDeleteReps, mAddReps, mUpdateRep } = useAssignmentRepsMutation();
  const { mDelete: mGroupDelete, mUpdate: mGroupUpdate } = useAssignmentGroupsMutation();
  const { data, isLoading: isLoadingReps, refetch: reloadReps } = useAssignmentReps(groupId);

  useEffect(() => {
    if (data && data?.results) {
      // check if data change
      const newData = data?.results;
      const existedNewData = newData.find((v: any) => !items.find((item: any) => !item?.isEmptyRow && item?.user?.id === v?.user?.id));
      // if data change, update items
      if (existedNewData) {
        if (items.length === 0) {
          setItems(newData);
        } else {
          setItems((prev: any) => {
            const newItems = prev.map((v: any, i: number) => {
              let newItem = v;
              if (newItem?.user?.id) {
                newItem = newData.find((data: any) => data?.user?.id === v?.user?.id);
              }
              return newItem;
            });
            return newItems;
          });
        }
      }
    } else {
      setItems([]);
    }
  }, [data]);

  // table and pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchText, setSearchText] = useState<string>('');

  const handleDeleteGroup = () => {
    const params = {
      ids: [groupId]
    };
    mGroupDelete.mutate(params, {
      onSuccess: () => {
        onBack && onBack();
      }
    });
  };

  // =============== table handler ================
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let value = e.target.value;
    setSearchText(value);
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLDivElement> | undefined) => {
    if (event?.key !== 'Enter') {
      return;
    }

    const searchValue = searchText.trim();
    if (searchValue === '') {
      setSearchItems([]);
    } else {
      setSearchItems([...items.filter((v: any) => v?.user?.name.includes(searchValue))]);
    }
  };

  // const pagingProps: ListPaginationProps = {
  //   pageTotal: data?.paging?.totalPage || 1,
  //   pageCount: data?.paging?.totalItems || 0,
  //   pageSize: pageSize,
  //   pageIndex: data?.paging?.currentPage || 1
  // };

  const handlePagingChange = (page: number, size: number) => {
    if (page != currentPage) {
      setCurrentPage(page);
    }
    if (size != pageSize) {
      setPageSize(size);
    }
  };

  const handleUpdateActive = (newValue: boolean, id: string) => {
    const params = {
      rep: {
        id: id,
        active: newValue
      }
    };
    mUpdateRep.mutate(params);
  };

  //handle create internal user
  const onUserChange = (nVal: any, i: number) => {
    const existedUser = !!items.find((v: any) => v?.user?.id === nVal?.id);
    if (!existedUser) {
      setItems((prev: any) => {
        const newItems = [...prev];
        newItems[i] = {
          ...newItems[i],
          user: {
            id: nVal.id,
            name: nVal.name
          }
        };

        return newItems.map((v: any, i: number) => ({ ...v, rowIndex: i }));
      });

      const params = {
        rep: {
          groupId: groupId,
          user: {
            id: nVal.id,
            name: nVal.name
          },
          active: true
        }
      };

      mAddReps.mutate(params);
    } else {
      enqueueErrorBar('Rep existed!');
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
      mDeleteReps.mutate(params);
      return newItems.map((v: any, i: number) => ({ ...v, rowIndex: i }));
    });
  };

  const handleAddRow = () => {
    setItems((prev: any) => {
      const newRow = {
        isEmptyRow: true,
        rowIndex: prev.length
      };

      return [...prev, newRow];
    });
  };

  // =============== table handler ================
  const getMapColumns = () => {
    return {
      [keyNames.KEY_SETTING_PREFERENCES_ASSIGNMENT_USER_NAME](col: string, data: any, extra: any) {
        if (data?.isEmptyRow) {
          return <UserAutoComplete onChange={(nVal: any) => onUserChange(nVal, data?.rowIndex)} single />;
        } else {
          return data?.name ? <Typography>{data?.name}</Typography> : '';
        }
      },
      [keyNames.KEY_SETTING_PREFERENCES_ASSIGNMENT_USER_EMAIL](col: string, data: any, extra: any) {
        if (data?.isEmptyRow) {
          return '';
        } else {
          return data?.[col] ? <Typography>{data?.[col]}</Typography> : '';
        }
      },
      [keyNames.KEY_SETTING_PREFERENCES_ASSIGNMENT_USER_MOBILE](col: string, data: any, extra: any) {
        if (data?.isEmptyRow) {
          return '';
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
          return '';
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
        languageKey: t('ncrm_generalsetting_preferences_user_name'),
        keyName: keyNames.KEY_SETTING_PREFERENCES_ASSIGNMENT_USER_NAME,
        enableSorting: false,
        width: 'auto'
      },
      {
        languageKey: t('ncrm_generalsetting_preferences_user_email'),
        keyName: keyNames.KEY_SETTING_PREFERENCES_ASSIGNMENT_USER_EMAIL,
        enableSorting: false,
        width: '400px'
      },
      {
        languageKey: t('ncrm_generalsetting_preferences_user_mobile'),
        keyName: keyNames.KEY_SETTING_PREFERENCES_ASSIGNMENT_USER_MOBILE,
        enableSorting: false,
        width: 'auto'
      },
      {
        languageKey: t('ncrm_generalsetting_preferences_user_phone'),
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
      rows: searchItems?.length > 0 ? searchItems || [] : items || [],
      columns: columns,
      sx: { p: 0, mb: 0 },
      setRowHover: setRowHover
    };
    return <ListTable {...listTableProps} />;
  }, [items, columns, searchItems]);

  // =============== End table handler ================

  return (
    <>
      <Stack
        direction={'row'}
        sx={{ border: border, padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Stack direction={'row'} alignItems={'center'}>
          <IconButton
            onClick={() => {
              onBack && onBack();
            }}
          >
            <ArrowBackIcon color="primary" />
          </IconButton>
          {viewItem && (
            <Box sx={{ width: '300px', '&. MuiTypography-root': { fontWeight: '500' } }}>
              <GroupName
                name={viewItem.name}
                id={viewItem?.id}
                onAfterSaved={(nVal: string) => {
                  const nData = {
                    ...viewItem,
                    name: nVal
                  };
                  onAfterSaved && onAfterSaved(nData);
                }}
              ></GroupName>
            </Box>
          )}
        </Stack>
      </Stack>
      <Box sx={{ border: border, padding: '20px' }}>
        <Stack direction={'row'} justifyContent={'flex-end'}>
          <Button size="small" startIcon={<DeleteOutline />} variant="outlined" color="error" onClick={handleDeleteGroup}>
            Delete
          </Button>
        </Stack>
        <Typography color="secondary" mb={1}>
          {t('ncrm_generalsetting_preferences_description')}
        </Typography>
        <Box sx={{ padding: '10px', marginBottom: '16px', border: border }}>
          {viewItem && (
            <GroupDesc
              desc={viewItem.description}
              id={viewItem.id}
              onAfterSaved={(nVal: string) => {
                const nData = {
                  ...viewItem,
                  description: nVal
                };
                onAfterSaved && onAfterSaved(nData);
              }}
            />
          )}
        </Box>
        {/* ======== Table ======== */}
        <Box border={border} pt={1} pb={1}>
          <Box sx={{ px: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <OutlinedInput
              fullWidth={false}
              onChange={handleTextChange}
              value={searchText}
              onKeyPress={handleEnter}
              sx={{
                width: 216
              }}
              placeholder={t('ncrm_common_search_placeholder') as string}
              size="small"
              endAdornment={
                <>
                  <Divider orientation="vertical" sx={{ height: 32 }} />
                  <InputAdornment
                    position="end"
                    sx={{
                      '& .MuiInputAdornment-sizeSmall': {
                        width: 32,
                        ml: '-8px'
                      },
                      ':hover': {
                        '& .MuiIconButton-root': {
                          bgcolor: theme.palette.primary.lighter,
                          color: `${theme.palette.primary.main}`
                        }
                      },
                      '& .MuiIconButton-root': {
                        height: 32
                      },
                      py: 0
                    }}
                  >
                    <IconButton
                      aria-label="search"
                      edge="end"
                      color="inherit"
                      sx={{
                        ml: '-8px',
                        mr: '-14px'
                      }}
                      onClick={() => {}}
                    >
                      <Search
                        sx={
                          {
                            // color: `${theme.palette.grey[300]}`
                          }
                        }
                        fontSize="small"
                      />
                    </IconButton>
                  </InputAdornment>
                </>
              }
            />
          </Box>
          {TableMemo}
          <Button
            size="small"
            sx={{ marginTop: '5px', marginLeft: '10px' }}
            variant="contained"
            startIcon={<Add />}
            onClick={() => {
              // onAddRep();
              handleAddRow();
            }}
          >
            {t('ncrm_generalsetting_preferences_desk_add_line')}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default GroupDetail;
