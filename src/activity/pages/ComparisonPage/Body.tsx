import React, { useMemo } from 'react';
import { ColumnDef, Table } from '@tanstack/react-table';
import { TableCell, TableFooter, TableRow, Typography } from '@mui/material';

import { ListBody } from '@base/components/@hanbiro/List';
import { makeTable8Columns } from '@base/components/@hanbiro/ReactTable8/Helper';
import { ASC, DESC } from '@base/config/constant';
import { columnRenderRemap, footCellData } from './Helper';
import ListTable, { ListTableProps } from '@base/components/@hanbiro/List/ListTable';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { MENU_CATEGORY_COMPARISON } from '@activity/config/comparison';
import * as keyNames from '@activity/config/keyNames';
import { convertSecondsToString } from '@base/utils/helpers/dateUtils';
import { FormIcon } from '@base/components/@hanbiro/FormIcon';
import { KeyedObject } from '@base/types/root';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import { useTranslation } from 'react-i18next';
import TableBodyCell from './TableBodyCell';

interface BodyProps extends KeyedObject {}

const Body = (props: BodyProps) => {
  console.log('ComparisonPage > Body', props);
  const { t } = useTranslation();

  const {
    category,
    fields,
    data: { results: itemsList = [], total = {}, lastTotal = {} }
  } = props;

  const { settingColumns, setSort, getViewingFields } = useListPageSettings(MENU_CATEGORY_COMPARISON);

  let viewingFields: any = [];
  if (fields?.length > 0) {
    viewingFields = fields;
  }

  console.log('viewingFields', viewingFields);

  const disableSortByColumns: string | any[] = [];
  const tableFields = viewingFields.map((_ele: any) => {
    return {
      ..._ele,
      ...(_ele.keyName === keyNames.KEY_NAME_COMPARISON_USERNAME ? { width: '300px!important' } : {}),
      enableSorting: !disableSortByColumns.includes(_ele.keyName)
    };
  });

  const getMapColumns = () => {
    return columnRenderRemap();
  };

  const tableColumns = useMemo<ColumnDef<any>[]>(() => makeTable8Columns(tableFields, getMapColumns(), { category }, []), [tableFields]);

  const footerRender = (table: Table<any>) => (
    <TableFooter
      sx={{
        border: 'none',
        '& > tr': {
          position: 'sticky',
          backgroundColor: (theme) => theme.palette.background.paper,
          '& > td': {
            height: '55px',
            color: (theme) => theme.palette.text.primary,
            fontSize: '0.875rem',
            '&:after': { display: 'none' },
            '&:before': {
              content: '""',
              position: 'absolute',
              left: 0,
              bottom: '54px',
              width: '100%',
              borderBottom: (theme) => `1px solid ${theme.palette.divider}`
            }
          }
        }
      }}
    >
      <TableRow sx={{ bottom: '55px' }}>
        {tableFields.map((v: any, i: number) => {
          if ([keyNames.KEY_NAME_COMPARISON_USERNAME, keyNames.KEY_NAME_COMPARISON_GROUPNAME].includes(v.keyName)) {
            return (
              <TableCell sx={{ textTransform: 'none' }} key={i}>
                {t('ncrm_activity_total')}
              </TableCell>
            );
          } else if (v.keyName === keyNames.KEY_NAME_COMPARISON_ALL_CALL_DURATION) {
            return <TableCell key={i}>{total?.[v.keyName] ? convertSecondsToString(total[v.keyName]) : 0}</TableCell>;
          }
          return <TableCell key={i}>{total?.[v.keyName] ?? 0}</TableCell>;
        })}
      </TableRow>
      <TableRow sx={{ bottom: 0 }}>
        {tableFields.map((v: any, i: number) => {
          if ([keyNames.KEY_NAME_COMPARISON_USERNAME, keyNames.KEY_NAME_COMPARISON_GROUPNAME].includes(v.keyName)) {
            return (
              <TableCell sx={{ textTransform: 'none' }} key={i}>
                {t('ncrm_activity_percentage_change')}
              </TableCell>
            );
          }

          return (
            <TableCell key={i}>
              <TableBodyCell
                showCurrentValue={false}
                data={{ total: total, lastTotal: lastTotal }}
                keyName={v.keyName}
                isFindPercent={true}
              />
            </TableCell>
          );
        })}
      </TableRow>
    </TableFooter>
  );

  const listTableProps: ListTableProps = {
    rows: !!itemsList ? itemsList : [],
    columns: tableColumns,
    checkedIds: [],
    onRowChecked: () => {},
    onPageChange: () => {},
    onSortBy: (clName: any, isSorted: any) => {
      if (isSorted !== false) {
        let orderBy = isSorted === 'desc' ? DESC : ASC;
        setSort({ field: clName, orderBy: orderBy });
      }
    },
    footerRender
  };

  const ListBodyMemo = useMemo(() => {
    return (
      <ListTable
        {...listTableProps}
        sx={{
          maxHeight: 'calc(100vh - 190px)',
          mb: 0,
          '& thead': {
            '& > tr': {
              position: 'sticky',
              backgroundColor: (theme) => theme.palette.grey[50],
              top: 0,
              '& > th:after': {
                content: '""',
                position: 'absolute',
                left: 0,
                bottom: '-1px',
                width: '100%',
                borderBottom: (theme) => `1px solid ${theme.palette.divider}`
              }
            }
          }
        }}
      />
    );
  }, [itemsList, fields, viewingFields]);

  return <ListBody>{ListBodyMemo}</ListBody>;
};

export default Body;
