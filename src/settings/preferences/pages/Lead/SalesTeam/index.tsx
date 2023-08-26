import React, { useEffect, useMemo, useState } from 'react';

//third-party
import { useTranslation } from 'react-i18next';
import { ColumnDef } from '@tanstack/react-table';
import { useTheme, Button, Stack, Link, IconButton } from '@mui/material';
import { Add, DeleteOutline } from '@mui/icons-material';
import _ from 'lodash';

//project base
import SpanLang from '@base/components/@hanbiro/SpanLang';
import ListTable, { ListTableProps } from '@base/components/@hanbiro/List/ListTable';

//menu
import * as keyNames from '@settings/preferences/config/lead/keyNames';
import { useMenuSettingUpdate, useMenuSettings } from '@settings/general/hooks/useMenuSetting';

//local
import WritePage from './Write';
import View from './View';

interface SalesTeamProps {}

const SalesTeam = (props: SalesTeamProps) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [teamItems, setTeamItems] = useState<any>([]);
  const [deletedIndex, setDeletedIndex] = useState(-1);
  const [updatedItem, setUpdatedItem] = useState<any>(null);
  const [isNewTeam, setIsNewTeam] = useState<boolean>(false);
  const [viewId, setViewId] = useState<string>('');
  const [viewData, setViewData] = useState<any>(null);

  //get data
  const params = {
    keys: ['sales_teams'],
    menus: ['sales']
  };
  const { data: settingData } = useMenuSettings(params);
  //console.log('sales team settingData > ', settingData);

  //save settings
  const mSettingUpdate = useMenuSettingUpdate();

  //init list data
  useEffect(() => {
    if (settingData?.data) {
      const newSalesTeamValue = settingData.data.find((_ele: any) => _ele.key === 'sales_teams');
      if (newSalesTeamValue) {
        try {
          setTeamItems(JSON.parse(newSalesTeamValue.value));
        } catch {
          // console.log('Parse error.');
        }
      }
    }
  }, [settingData]);

  //update success
  useEffect(() => {
    if (mSettingUpdate.isSuccess) {
      if (deletedIndex > -1) {
        const curItems = [...teamItems];
        curItems.splice(deletedIndex, 1);
        setTeamItems(curItems);
        //reset
        setDeletedIndex(-1);
      }
      if (updatedItem !== null) {
        const curItems = [...teamItems];
        const updateIdx = curItems.findIndex((_ele: any) => _ele.id === updatedItem.id);
        curItems[updateIdx] = updatedItem;
        setTeamItems(curItems);
        //reset
        setViewData(updatedItem);
        setUpdatedItem(null);
      }
    }
  }, [mSettingUpdate.isSuccess]);

  //save function
  const handleSave = (newItems: any) => {
    const params: any = {
      menu: 'sales',
      key: 'sales_teams',
      value: JSON.stringify(newItems)
    };
    mSettingUpdate.mutate({ menuSetting: params });
  };

  //delete a row
  const handleDeleteRow = (rowIndex: number) => {
    //store index
    setDeletedIndex(rowIndex);
    //save setting
    const curItems = [...teamItems];
    curItems.splice(rowIndex, 1);
    handleSave(curItems);
  };

  //an item change
  const handleViewUpdate = (newItem: any) => {
    //console.log('item change', newItem);
    const curItems = [...teamItems];
    const updateIdx = curItems.findIndex((_ele: any) => _ele.id === newItem.id);
    if (updateIdx > -1) {
      setUpdatedItem(newItem);
      curItems[updateIdx] = newItem;
      handleSave(curItems);
    }
  };

  //column render
  const tableColumns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: keyNames.KEY_SALES_TEAM_NAME,
        header: () => <SpanLang keyLang={'Sales Team Name'} textOnly />,
        accessorKey: keyNames.KEY_SALES_TEAM_NAME,
        enableColumnFilter: false,
        enableSorting: false,
        cell: ({ row }) => {
          return (
            <Link
              underline="none"
              color={'link'}
              onClick={() => {
                setViewId(row?.original?.id);
                setViewData(row.original);
              }}
            >
              {row?.original?.name || ''}
            </Link>
          );
        }
      },
      {
        id: keyNames.KEY_SALES_TEAM_LEADER,
        header: () => <SpanLang keyLang={'Team Leader'} textOnly />,
        accessorKey: keyNames.KEY_SALES_TEAM_LEADER,
        enableColumnFilter: false,
        enableSorting: false,
        cell: ({ row }) => {
          return row?.original?.leader?.name || '';
        }
      },
      {
        id: keyNames.KEY_SALES_TEAM_MEMBERS,
        header: () => <SpanLang keyLang={'Team Member'} textOnly />,
        accessorKey: keyNames.KEY_SALES_TEAM_MEMBERS,
        enableColumnFilter: false,
        enableSorting: false,
        cell: ({ row }) => {
          return row?.original?.members?.length || 0;
        }
      },
      {
        id: 'action',
        header: '',
        accessorKey: 'action',
        enableColumnFilter: false,
        enableSorting: false,
        width: '30px',
        cell: ({ row }) => {
          return (
            <IconButton color="error" size="small" onClick={() => handleDeleteRow(row.index)}>
              <DeleteOutline fontSize="small" />
            </IconButton>
          );
        }
      }
    ],
    [teamItems]
  );

  //table config
  const listTableProps: ListTableProps = {
    rows: [...teamItems],
    //checkedIds,
    //onRowChecked: onChecked,
    //pagingProps,
    //onPageChange: handlePagingChange,
    columns: tableColumns
    //onSortBy: (clName: any, isSorted: any) => {}
  };

  return (
    <>
      {viewId == '' ? (
        <Stack spacing={1}>
          <Stack direction="row" alignItems="center" justifyContent="flex-end">
            <Button
              size={'small'}
              onClick={() => {
                setIsNewTeam(true);
              }}
              variant="contained"
              startIcon={<Add />}
            >
              {t('ncrm_common_btn_add')}
            </Button>
          </Stack>
          <ListTable {...listTableProps} sx={{ px: 0 }} />
        </Stack>
      ) : (
        <View id={viewId} data={viewData} onAdd={() => setIsNewTeam(true)} onBack={() => setViewId('')} onSave={handleViewUpdate} />
      )}

      {isNewTeam && (
        <WritePage
          isOpen={isNewTeam}
          onClose={() => setIsNewTeam(false)}
          currentItems={teamItems}
          onRefresh={(newItems: any) => setTeamItems(newItems)}
        />
      )}
    </>
  );
};

export default SalesTeam;
