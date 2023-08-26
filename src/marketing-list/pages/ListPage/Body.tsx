import React, { useMemo } from 'react';

//third-party
import { ColumnDef } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import { useRecoilValue } from 'recoil';

//project
import { ListBody } from '@base/components/@hanbiro/List';
import { makeTable8Columns } from '@base/components/@hanbiro/ReactTable8/Helper';
import ListTable, { ListTableProps } from '@base/components/@hanbiro/List/ListTable';
import ListGrid, { ListGridProps } from '@base/components/@hanbiro/List/ListGrid';
import GridList from '@base/components/@hanbiro/List/GridList';
import ListPagination, { ListPaginationProps } from '@base/components/@hanbiro/List/ListPagination';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { ListType } from '@base/types/app';
import { DESC, ASC, LIST_TABLE_PAGE_SIZE } from '@base/config/constant';
import { MENU_CUSTOMER } from '@base/config/menus';
import { selectionFieldsAtom } from '@base/store/atoms/app';

//material
import { AccordionDetails, AccordionSummary, Box, Checkbox, Grid, Stack, styled, Theme, Typography, useTheme } from '@mui/material';

import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';

//menu
import * as keyNames from '@marketing-list/config/keyNames';
import ListGridCard from '@marketing-list/containers/ListGridCard'; //custom
import { getAccordionsummary, getMapColumns, getTableType } from './Helper';
import { Currency } from '@base/types/common';
import { defaultCurrencySelector } from '@base/store/selectors/app';
import useDevice from '@base/hooks/useDevice';
import { defaultColumnOrder } from '@marketing-list/config/list-field';

interface BodyProps {
  isSplitMode: boolean;
  category: string;
  isFetching?: boolean;
  fields: any[];
  itemsList: any[];
  paging: any;
  selectedIds: string[];
  onChecked: (val: string[]) => void;
  groupBy: string;
}

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0
  },
  '&:before': {
    display: 'none'
  },
  '& .MuiAccordionDetails-root': {
    border: 'none !important',
    padding: 0
  }
}));

const PageBody = (props: BodyProps) => {
  const {
    isSplitMode,
    category, //router category
    fields, //--> viewing fields
    itemsList,
    paging,
    selectedIds,
    onChecked,
    groupBy
  } = props;

  const { t } = useTranslation();
  const theme = useTheme();
  const { isRowSpanned, isGroupByAccordion } = getTableType(groupBy);
  const pageDataKey = `${MENU_CUSTOMER}_${category}`;
  const { listType, settingColumns, getViewingFields, setSort, setPaging, paging: cPaging } = useListPageSettings(pageDataKey);

  const selectionFields = useRecoilValue(selectionFieldsAtom);
  const defaultCurrency: Currency = useRecoilValue(defaultCurrencySelector);

  //get device
  const { isMobile, isDesktop } = useDevice();

  //paging change
  const handlePagingChange = (page: number, size: number) => {
    setPaging({ page, size });
  };

  const tableFields = useMemo(() => {
    let viewingFields: any = [];

    viewingFields = fields;

    let newFields: any[] = [];
    viewingFields.forEach((_ele: any) => {
      newFields.push({
        ..._ele,
        enableSorting: true,
        width: 'auto'
      });
    });

    return newFields;
  }, [fields, settingColumns, category]);

  //build columns for table v8
  const tableColumns = useMemo<ColumnDef<any>[]>(() => {
    const columns = [
      {
        id: 'select',
        width: '45px',
        header: ({ table }: any) => (
          <Checkbox
            {...{
              sx: { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
              color: 'secondary',
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler()
            }}
          />
        ),
        cell: ({ row }: any) => (
          <div className="pd-x-1">
            <Checkbox
              {...{
                sx: { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
                color: 'secondary',
                checked: row.getIsSelected(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler()
              }}
            />
          </div>
        )
      },
      ...makeTable8Columns(tableFields, getMapColumns(category, selectionFields, defaultCurrency), { category }, [])
    ];

    if (columns.length === 1) {
      return columns;
    }

    if (defaultColumnOrder[groupBy]) {
      const ans = defaultColumnOrder[groupBy].map((keyName: string) => {
        if (keyName === keyNames.KEY_NAME_CUSTOMER_SELECT) {
          return columns.find((v: any) => v?.id === keyNames.KEY_NAME_CUSTOMER_SELECT);
        }

        return columns.find((v: any) => v?.accessorKey === keyName);
      });
      return ans.filter((v: any) => v !== undefined);
    } else {
      return columns;
    }
  }, [tableFields, category, groupBy]);

  //list paging
  const pagingProps: ListPaginationProps = {
    pageTotal: paging?.totalPage || 1,
    pageCount: paging?.totalItems || 0,
    pageSize: !!cPaging?.size ? cPaging?.size : paging?.size ?? LIST_TABLE_PAGE_SIZE,
    pageIndex: paging?.currentPage || 1
  };

  const getConfigRowSpannedByAttr = (data: any, spannedKeyName: string, attrSpan: string | null = null) => {
    let spannedByAttr = '';
    let newData = data;
    if (attrSpan === null) {
      spannedByAttr = 'id';
      newData = data.map((v: any) => ({ ...v, [spannedKeyName]: { label: v[spannedKeyName], id: v[spannedKeyName] } }));
    }
    let colEnable = [spannedKeyName];
    let baseRows = [...newData];
    const rows = baseRows.map((item) => {
      return {
        ...item,
        [spannedKeyName]: {
          ...item?.[spannedKeyName],
          isRowSpanned: false,
          rowSpan: 1
        }
      };
    });

    let topCellIndex = 0;
    colEnable.forEach((item: string, index: number) => {
      for (let i = 1; i < rows.length; i++) {
        if (index == 0) {
          // span theo id
          if (rows[i][item][spannedByAttr] == undefined && rows[topCellIndex][item][spannedByAttr] == undefined) {
            rows[i][item].isRowSpanned = true;
            rows[topCellIndex][item].rowSpan++;
            rows[i][item][spannedByAttr] = topCellIndex;
            rows[i][item].name = 'null';
          } else if (rows[topCellIndex][item][spannedByAttr] == rows[i][item][spannedByAttr] && rows[i][item][spannedByAttr] != undefined) {
            rows[i][item].isRowSpanned = true;
            rows[topCellIndex][item].rowSpan++;
          } else {
            topCellIndex = i;
          }
        } else {
          const preIndex = index - 1;
          if (
            rows[topCellIndex][item]?.[spannedByAttr] == rows[i][item]?.[spannedByAttr] &&
            rows[topCellIndex][colEnable[preIndex]]?.[spannedByAttr] == rows[i][colEnable[preIndex]]?.[spannedByAttr]
          ) {
            rows[i][item].isRowSpanned = true;
            rows[topCellIndex][item].rowSpan++;
          } else {
            topCellIndex = i;
          }
        }
      }
      topCellIndex = 0;
    });
    return rows;
  };

  const getAccordionData = (keyName: string, keyNameGroupBy: string | null = null) => {
    const itemListGroupByKeyName: any = [];

    let newItemsList = itemsList;
    let groupBy = keyNameGroupBy || '';
    if (keyNameGroupBy === null) {
      newItemsList = newItemsList.map((v: any) => ({ ...v, [keyName]: { label: v[keyName], id: v[keyName] } }));
      groupBy = 'id';
    }
    newItemsList?.forEach((item: any, index: number) => {
      const fIndex = itemListGroupByKeyName.findIndex((v: any) => v[keyName]?.[groupBy] == item[keyName]?.[groupBy]);
      if (fIndex > -1) {
        itemListGroupByKeyName[fIndex].data.push(item);
      } else {
        itemListGroupByKeyName.push({
          [keyName]: item[keyName],
          data: [item]
        });
      }
    });
    return itemListGroupByKeyName;
  };

  let tableItemList: any[] = [];
  if (isRowSpanned) {
    if (groupBy === 'myGroupMarketingList_1') {
      tableItemList = getConfigRowSpannedByAttr(itemsList, keyNames.KEY_NAME_CUSTOMER_OWNER, 'id') || [];
    }
    if (groupBy === 'marketingListperType_1') {
      tableItemList = getConfigRowSpannedByAttr(itemsList, keyNames.KEY_NAME_CUSTOMER_MARKETING_TYPE) || [];
    }
    if (groupBy === 'marketingListperOwner_1') {
      tableItemList = getConfigRowSpannedByAttr(itemsList, keyNames.KEY_NAME_CUSTOMER_OWNER, 'id') || [];
    }
  } else {
    tableItemList = itemsList || [];
  }

  // Accordion
  // console.log('isRowSpanned: ', isRowSpanned);
  // Table
  // console.log('tableColumns: ', tableColumns);
  // console.log('itemsList: ', itemsList);
  // console.log('tableItemList: ', tableItemList);

  //render table list
  const TableMemo = useMemo(() => {
    const listTableProps: ListTableProps = {
      rows: tableItemList,
      checkedIds: selectedIds,
      onRowChecked: onChecked,
      pagingProps,
      onPageChange: handlePagingChange,
      columns: tableColumns,
      onSortBy: (clName: any, isSorted: any) => {
        if (isSorted !== false) {
          let orderBy = isSorted === 'desc' ? DESC : ASC;
          setSort({ field: clName, orderBy: orderBy });
        }
      },
      isRowSpanned
    };
    return <ListTable {...listTableProps} />;
  }, [itemsList, tableColumns, selectedIds]);

  const TableGroupByKeyName = (keyName: string, keyNameGroupBy: string | null = null) => {
    return getAccordionData(keyName, keyNameGroupBy).map((item: any, i: number) => {
      const tableAccordionColumns = tableColumns.filter((columns: any) => columns?.accessorKey !== keyName || columns?.id === 'select');
      const listTableProps: ListTableProps = {
        rows: item.data || [],
        checkedIds: selectedIds,
        onRowChecked: onChecked,
        onPageChange: handlePagingChange,
        columns: tableAccordionColumns,
        onSortBy: (clName: any, isSorted: any) => {
          if (isSorted !== false) {
            let orderBy = isSorted === 'desc' ? DESC : ASC;
            setSort({ field: clName, orderBy: orderBy });
          }
        },
        isRowSpanned
      };

      return (
        <Box
          sx={{
            px: 2,
            '& .Mui-expanded': {
              color: `${theme.palette.primary.main} !important`
            },
            '& .MuiAccordionSummary-root': {
              flexDirection: 'row !important',
              '& .MuiAccordionSummary-content': {
                marginLeft: 0,
                p: 1
              }
            }
          }}
          key={i}
        >
          <Accordion defaultExpanded={i === 0}>
            <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
              <Stack direction="row" spacing={1.25} alignItems="center">
                <Stack>
                  <Typography variant="h6" color="textPrimary">
                    {/* {item[keyName].name} */}
                    {`${getAccordionsummary(item, keyName)} (${item.data.length})`}
                  </Typography>
                </Stack>
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              <ListTable
                {...listTableProps}
                sx={{
                  px: 0,
                  mb: 0,
                  borderRadius: 0,
                  border: 'none !important',
                  '& .MuiPaper-rounded': {
                    border: 'none',
                    borderRadius: 0
                  }
                }}
              />
            </AccordionDetails>
          </Accordion>
        </Box>
      );
    });
  };

  //render grid list
  const GridMemo = useMemo(() => {
    const handleOnRowChecked = (cId: string) => {
      const newCheckedIds = _.cloneDeep(selectedIds);
      const fIndex = newCheckedIds?.findIndex((v: string) => v === cId);
      if (fIndex >= 0) {
        newCheckedIds.splice(fIndex, 1);
      } else {
        newCheckedIds.push(cId);
      }
      onChecked && onChecked(newCheckedIds);
    };

    return (
      <GridList pagingProps={pagingProps} onPageChange={handlePagingChange} isSmall={isSplitMode}>
        {itemsList?.map((item: any, index: number) => {
          return (
            <Grid key={index} item xs={12} {...(isSplitMode ? {} : { sm: 6, lg: 4 })}>
              <ListGridCard
                sx={{
                  position: 'relative',
                  border: '1px solid',
                  borderRadius: 1,
                  px: 2,
                  py: 1,
                  minHeight: 130,
                  borderColor: theme.palette.divider
                }}
                category={category}
                {...{
                  data: item,
                  isChecked: selectedIds?.indexOf(item?.id) >= 0
                }}
                onChecked={handleOnRowChecked}
                isSplitMode={isSplitMode}
              />
            </Grid>
          );
        })}
      </GridList>
    );
  }, [itemsList, isSplitMode, fields, selectedIds]);

  //display mode
  const getTypeBody = (listType: ListType) => {
    switch (listType) {
      case ListType.GRID:
      case ListType.SPLIT:
        return GridMemo;
      default:
        if (isGroupByAccordion) {
          if (groupBy === 'myGroupMarketingList_2') {
            return (
              <>
                {TableGroupByKeyName(keyNames.KEY_NAME_CUSTOMER_OWNER, 'id')}
                {pagingProps && (
                  <Box sx={{ mt: 2, px: 2 }}>
                    <ListPagination
                      gotoPage={(page: number) => handlePagingChange && handlePagingChange(page, pagingProps.pageSize)}
                      setPageSize={(size: number, pageIndex) =>
                        handlePagingChange && handlePagingChange(pageIndex ?? pagingProps.pageIndex, size)
                      }
                      pageSize={pagingProps.pageSize || 10}
                      pageIndex={pagingProps.pageIndex || 1}
                      pageTotal={itemsList.length || 1}
                      pageCount={itemsList.length || 0}
                      isSmall={false}
                    />
                  </Box>
                )}
              </>
            );
          }
          if (groupBy === 'marketingListperType_2') {
            return (
              <>
                {TableGroupByKeyName(keyNames.KEY_NAME_CUSTOMER_MARKETING_TYPE)}
                {pagingProps && (
                  <Box sx={{ mt: 2, px: 2 }}>
                    <ListPagination
                      gotoPage={(page: number) => handlePagingChange && handlePagingChange(page, pagingProps.pageSize)}
                      setPageSize={(size: number, pageIndex) =>
                        handlePagingChange && handlePagingChange(pageIndex ?? pagingProps.pageIndex, size)
                      }
                      pageSize={pagingProps.pageSize || 10}
                      pageIndex={pagingProps.pageIndex || 1}
                      pageTotal={itemsList.length || 1}
                      pageCount={itemsList.length || 0}
                      isSmall={false}
                    />
                  </Box>
                )}
              </>
            );
          }
          if (groupBy === 'marketingListperOwner_2') {
            return (
              <>
                {TableGroupByKeyName(keyNames.KEY_NAME_CUSTOMER_OWNER, 'id')}
                {pagingProps && (
                  <Box sx={{ mt: 2, px: 2 }}>
                    <ListPagination
                      gotoPage={(page: number) => handlePagingChange && handlePagingChange(page, pagingProps.pageSize)}
                      setPageSize={(size: number, pageIndex) =>
                        handlePagingChange && handlePagingChange(pageIndex ?? pagingProps.pageIndex, size)
                      }
                      pageSize={pagingProps.pageSize || 10}
                      pageIndex={pagingProps.pageIndex || 1}
                      pageTotal={itemsList.length || 1}
                      pageCount={itemsList.length || 0}
                      isSmall={false}
                    />
                  </Box>
                )}
              </>
            );
          }
        }
        return TableMemo;
    }
  };

  //main
  return <ListBody>{isMobile ? GridMemo : getTypeBody(listType)}</ListBody>;
};

export default PageBody;
