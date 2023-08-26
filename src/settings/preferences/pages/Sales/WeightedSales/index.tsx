import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ColumnDef } from '@tanstack/react-table';

import { Chip, useTheme, Button } from '@mui/material';
import { Add } from '@mui/icons-material';

import SpanLang from '@base/components/@hanbiro/SpanLang';
import ListTable, { ListTableProps } from '@base/components/@hanbiro/List/ListTable';
import { ListPaginationProps } from '@base/components/@hanbiro/List/ListPagination';

import { WeightedSalesList } from '../json';
import WritePage from './WritePage';


interface WeightedSalesProps {}

const WeightedSales = (props: WeightedSalesProps) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const [writeId, setWriteId] = useState<string>("");

  const checkedIds: string[] = [];
  const onChecked = () => {};

  const pagingProps: ListPaginationProps = {
    pageTotal: 1,
    pageCount: 0,
    pageSize: 10,
    pageIndex: 1
  };

  const handlePagingChange = (page: number, size: number) => {};

  const tableColumns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: 'opportunityProcess',
        header: () => <SpanLang keyLang={'Opportunity Process'} textOnly />,
        accessorKey: 'opportunityProcess',
        enableColumnFilter: false,
        enableSorting: false,
        cell: ({ row }) => {
          return row?.original?.opportunityProcess?.name;
        }
      },
      {
        id: 'status',
        header: () => <SpanLang keyLang={'Completion'} textOnly />,
        accessorKey: 'status',
        enableColumnFilter: false,
        enableSorting: false,
        cell: ({ row }) => {
          return row?.original?.status === 'COMPLETED' ? (
            <Chip label={t('Completed')} color="success" variant="outlined" />
          ) : (
            <Button size="small" startIcon={<Add />} variant="contained" onClick={() => { setWriteId("dataId") }}>
              {t('ncrm_common_btn_add')}
            </Button>
          );
        }
      }
    ],
    []
  );

  const listTableProps: ListTableProps = {
    rows: WeightedSalesList ?? [],
    checkedIds,
    onRowChecked: onChecked,
    // pagingProps,
    onPageChange: handlePagingChange,
    columns: tableColumns,
    onSortBy: (clName: any, isSorted: any) => {}
  };

  return (
    <>
      <ListTable {...listTableProps} sx={{ px: 0 }} />

      {writeId != "" && <WritePage isOpen={writeId != ""} onClose={() => {setWriteId("")}} />}
    </>
  );
};

export default WeightedSales;
