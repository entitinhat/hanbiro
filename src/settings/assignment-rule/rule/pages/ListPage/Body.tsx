import React, { useEffect, useMemo, useState } from 'react';

import { ListBody } from '@base/components/@hanbiro/List';
import ListGrid, { ListGridProps } from '@base/components/@hanbiro/List/ListGrid';
import { ListPaginationProps } from '@base/components/@hanbiro/List/ListPagination';
import ListTable, { ListTableProps } from '@base/components/@hanbiro/List/ListTable';
import { makeTable8Columns } from '@base/components/@hanbiro/ReactTable8/Helper';
import { ASC, DESC, LIST_TABLE_PAGE_SIZE } from '@base/config/constant';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { ListType } from '@base/types/app';
import { PageLayoutSectionField } from '@base/types/pagelayout';
import { Paging } from '@base/types/response';
import { Checkbox, Tab, Tabs } from '@mui/material';
import ListGridCard from '@settings/assignment-rule/rule/containers/ListGridCard';
import { AssignRule } from '@settings/assignment-rule/rule/types/rule';
import { ColumnDef } from '@tanstack/react-table';

import { columnRenderRemap } from './Helper';
import { useTranslation } from 'react-i18next';
import { useOrg } from '@base/hooks/iam/useOrg';
import { ProductType } from '@base/types/iam';

interface BodyProps<T> {
  isSplitMode: boolean;
  category: string;
  fields: PageLayoutSectionField[];
  itemsList: T[];
  paging?: Paging | undefined;
  checkedIds: string[];
  onChecked: (checkedIds: string[]) => void;
  tabs: string;
  onChangeTab: (tab: string) => void;
  // refetch: () => void;
}

const Body = (props: BodyProps<AssignRule>) => {
  const { isSplitMode, category, fields, itemsList, paging, checkedIds, onChecked, tabs, onChangeTab } = props;
  // console.log('itemsList >>>>>>>>>', itemsList);
  const { listType, setSort, setPaging, paging: cPaging, getViewingFields, settingColumns } = useListPageSettings(category);
  const [selected, setSelected] = useState<string>();
  const { t } = useTranslation();

  //get productType
  const { productType } = useOrg();
  const handlePagingChange = (page: number, size: number) => {
    setPaging({ page, size });
  };

  const handleChangeTabs = (event: React.SyntheticEvent, newValue: string) => {
    // console.log('newValue: ', newValue)
    onChangeTab(newValue);
  };

  const tableFields = fields.map((_ele: any) => ({
    ..._ele,
    enableSorting: true,
    width: _ele.keyName === 'photo' ? '100px' : 'auto'
  }));
  const getMapColumns = () => {
    return columnRenderRemap(category);
  };
  const tableColumns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: 'select',
        width: '45px',
        header: ({ table }) => (
          <Checkbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler()
            }}
          />
        ),
        cell: ({ row }) => (
          <div className="pd-x-1">
            <Checkbox
              {...{
                checked: row.getIsSelected(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler()
              }}
            />
          </div>
        )
      },
      ...makeTable8Columns(tableFields, getMapColumns(), { category }, [])
    ],
    [tableFields, checkedIds]
  );
  const pagingProps: ListPaginationProps = {
    pageTotal: paging?.totalPage || 1,
    pageCount: paging?.totalItems || 0,
    pageSize: cPaging?.size || LIST_TABLE_PAGE_SIZE,
    pageIndex: paging?.currentPage || 1
  };

  const listTableProps: ListTableProps = {
    rows: itemsList || [],
    checkedIds,
    onRowChecked: onChecked,
    pagingProps,
    onPageChange: handlePagingChange,
    columns: tableColumns,
    onSortBy: (clName: any, isSorted: any) => {
      if (isSorted !== false) {
        let orderBy = isSorted === 'desc' ? DESC : ASC;
        setSort({ field: clName, orderBy: orderBy });
      }
    }
  };
  const listGridProps: ListGridProps = {
    rows: itemsList || [],
    checkedIds,
    onRowChecked: onChecked,
    pagingProps,
    onPageChange: handlePagingChange,
    columns: fields,
    hideColumns: [],
    columnRenderRemap: getMapColumns(),
    isSmall: isSplitMode,
    children: () => <></>
  };
  useEffect(() => {}, [selected]);
  const getTypeBody = (listType: ListType) => {
    switch (listType) {
      case ListType.GRID:
      case ListType.SPLIT:
        return (
          <ListGrid {...listGridProps}>
            {(props) => {
              return (
                <ListGridCard
                  {...props}
                  selected={{
                    selected: selected,
                    setSelected: (id) => {
                      setSelected(id);
                    }
                  }}
                  category={category}
                  isSplitMode={isSplitMode}
                />
              );
            }}
          </ListGrid>
        );
      default:
        return <ListTable {...listTableProps} />;
    }
  };

  const ListBodyMemo = useMemo(() => {
    return getTypeBody(listType);
  }, [itemsList, fields, isSplitMode, listType, selected]);
  return (
    <>
      {!isSplitMode && (
        <Tabs
          value={tabs}
          onChange={handleChangeTabs}
          sx={{ position: 'absolute', marginTop: '50px', marginLeft: '20px' }}
          aria-label="lab API tabs example"
        >
          <Tab label={t('ncrm_generalsetting_assignment_rule_desk')} value={'module=AR_MODULE_DESK'} />
          {productType !== ProductType.DESK && (
            <Tab label={t('ncrm_generalsetting_assignment_rule_opportynity')} value={'module=AR_MODULE_OPPORTUNITY'} />
          )}
        </Tabs>
      )}
      <ListBody sx={isSplitMode ? { paddingTop: '15px', '& .MuiGrid-root>.MuiGrid-item ': { paddingTop: '0px !important' } } : {}}>
        {ListBodyMemo}
      </ListBody>
    </>
  );
};

export default Body;
