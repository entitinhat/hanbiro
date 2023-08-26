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
import { useSalesTeams } from '@settings/preferences/hooks/sales/useSalesTeams';
import useSalesTeamDelete from '@settings/preferences/hooks/sales/useSalesTeamDelete';

//local
import WritePage from './Write';
import View from './View';

interface SalesTeamProps {}

const SalesTeam = (props: SalesTeamProps) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [teamItems, setTeamItems] = useState<any>([]);
  const [isNewTeam, setIsNewTeam] = useState<boolean>(false);
  const [viewId, setViewId] = useState<string>('');

  //save settings
  const mDeleteTeam = useSalesTeamDelete();

  //get sales team list
  const { data } = useSalesTeams();
  //console.log('sales team gData > ', data);

  //init state
  useEffect(() => {
    if (data?.data) {
      setTeamItems(data.data);
    }
  }, [data]);

  //delete a row
  const handleDeleteRow = (rowId: string) => {
    if (rowId) {
      const params = {
        ids: [rowId]
      };
      mDeleteTeam.mutate(params);
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
          return row?.original?.leader?.user?.name || '';
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
            <IconButton color="error" size="small" onClick={() => handleDeleteRow(row?.original?.id)}>
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
        <View id={viewId} onAdd={() => setIsNewTeam(true)} onBack={() => setViewId('')} />
      )}

      {isNewTeam && (
        <WritePage
          isOpen={isNewTeam}
          onClose={() => setIsNewTeam(false)}
          currentItems={teamItems}
          onRefresh={(newItems: any) => setTeamItems(newItems)}
          onBack={() => setViewId('')}
        />
      )}
    </>
  );
};

export default SalesTeam;
