import { useMemo, lazy } from 'react';
import _ from 'lodash';
import { ColumnDef } from '@tanstack/react-table';

import { Checkbox, Grid, useMediaQuery, useTheme } from '@mui/material';

import { ListBody } from '@base/components/@hanbiro/List';
import { ListPaginationProps } from '@base/components/@hanbiro/List/ListPagination';
import ListTable, { ListTableProps } from '@base/components/@hanbiro/List/ListTable';
import { makeTable8Columns } from '@base/components/@hanbiro/ReactTable8/Helper';
import { ASC, DESC, LIST_TABLE_PAGE_SIZE } from '@base/config/constant';
import { MENU_PRODUCT_ITEM } from '@base/config/menus';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { ListType } from '@base/types/app';

import { KEY_ITEM_IMAGES, KEY_ITEM_PRODUCT } from '@product/item/config/keyNames';
import { sortsBy } from '@product/item/config/list-field';
import ListGridCard from '@product/item/containers/ListGridCard';

import { columnRenderRemap } from './Helper';
import GridList from '@base/components/@hanbiro/List/GridList';
import { configMovingColumnsByKey, getConfigRowSpannedByField } from '@base/components/@hanbiro/List/helper';
import * as keyNames from '@product/item/config/keyNames';
import { useItemMutation } from '@product/item/hooks/useItemMutation';
import { useListQueryKeys } from '@base/hooks/user-setting/useListQueryKeys';
import { DeleteOutline, Replay } from '@mui/icons-material';
import ListTableGrouping from '@base/components/@hanbiro/List/ListTableGroup';
import UserAutoComplete from '@sign-in/containers/UserAutoComplete';
import { Product } from '@product/product/types/product';

const ProductAutoComplete = lazy(() => import('@product/product/containers/ProductAutoComplete'));

interface BodyProps {
  [x: string]: any;
  checkedIds: string[];
  isRowSpanned: boolean;
}

const Body = (props: BodyProps) => {
  const { isSplitMode, category, fields, itemsList, paging = {}, checkedIds, onChecked, isRowSpanned, onCancel, refetch } = props;

  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));

  const layoutKey: string = MENU_PRODUCT_ITEM;
  const {
    listType: cListType,
    settingColumns,
    setSort,
    setPaging,
    paging: cPaging,
    getViewingFields,
    filterValues,
    setFilter
  } = useListPageSettings(layoutKey);
  //hook
  const { listQueryKey } = useListQueryKeys(MENU_PRODUCT_ITEM);
  const { mEmptyAll, mRestore, mEmpty } = useItemMutation(listQueryKey);
  let listType = matchesSm ? ListType.GRID : cListType;

  const handlePagingChange = (page: number, size: number) => {
    setPaging({ page, size });
  };

  const groupBy = filterValues?.groupBy;
  const groupByPerProd1 = groupBy == 'itemPerProduct1';
  const groupByPerProd2 = groupBy == 'itemPerProduct2';
  const groupByDelete = groupBy == 'deletedItem';

  const getMapColumns = () => {
    return columnRenderRemap(category, groupByDelete);
  };

  const tableFields = useMemo(() => {
    let viewingFields: any = [];
    if (fields?.length > 0) {
      viewingFields = getViewingFields(fields, settingColumns);
    }

    let newFields: any[] = [];
    viewingFields.forEach((_ele: any) => {
      newFields.push({
        ..._ele,
        enableSorting: sortsBy?.findIndex((v: any) => v.value === _ele.keyName) >= 0,
        width: _ele.keyName === KEY_ITEM_IMAGES ? '50px' : 'auto'
      });
    });
    return newFields;
  }, [fields, settingColumns, category]);

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
            sx={{ p: 0 }}
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
              sx={{ p: 0 }}
            />
          </div>
        )
      },
      ...makeTable8Columns(tableFields, getMapColumns(), { category }, [])
    ],
    [tableFields, category]
  );

  const pagingProps: ListPaginationProps = {
    pageTotal: paging?.totalPage || 1,
    pageCount: paging?.totalItems || 0,
    pageSize: !!cPaging?.size ? cPaging?.size : paging?.size ?? LIST_TABLE_PAGE_SIZE,
    pageIndex: paging?.currentPage || 1
  };

  const listTableHeaderDeletedProps = {
    checkedIds: checkedIds,
    leftFilter: [],
    selected: filterValues?.filterBy,
    actionOnSelected: [
      // action will display when some rows was selected
      {
        value: 'restore',
        label: 'ncrm_common_btn_restore',
        color: 'primary',
        icon: <Replay fontSize="small" />,
        onClick: () => {
          mRestore.mutate(
            { ids: checkedIds },
            {
              onSuccess() {
                onChecked && onChecked([]);
                onCancel && onCancel();
                refetch && refetch();
              }
            }
          );
        }
      },
      {
        value: 'delete',
        label: 'ncrm_common_btn_delete',
        color: 'error',
        icon: <DeleteOutline fontSize="small" />,
        onClick: () => {
          mEmpty.mutate(
            { ids: checkedIds },
            {
              onSuccess() {
                onChecked && onChecked([]);
                onCancel && onCancel();
                refetch && refetch();
              }
            }
          );
        }
      }
    ],
    rightAction: [
      // action display on right bottom header by default
      {
        value: 'emptyAll',
        label: 'ncrm_common_btn_empty_recycle_bin',
        color: 'error',
        icon: <DeleteOutline fontSize="small" />,
        onClick: () => {
          mEmptyAll.mutate({
            onSuccess() {
              // onRefresh && onRefresh();
              refetch && refetch();
            }
          });
        }
      }
    ],
    onCancel: onCancel
  };
  const listTableHeaderProdPerProps1 = {
    checkedIds: checkedIds,
    leftFilter: [
      {
        label: 'product_item_field_basic_prod',
        value: 'prodId',
        component: ProductAutoComplete,
        getValue: (componentValue: Product[]) => {
          return componentValue?.map((v: Product) => v?.id).join(',');
        },
        setValue: (value: string) => {
          // return value ? value.split(',')?.map((vId: string) => ({ id: vId })) : [];
          return value ? value.split(',')?.map((vId: string) => vId) : [];
        }
      }
    ],
    onChange: (nValue: any) => {
      setFilter({ ...filterValues, filterBy: nValue });
    },
    selected: filterValues?.filterBy
  };
  const listTableHeaderProdPerProps2 = {
    checkedIds: checkedIds,
    leftFilter: [
      {
        label: 'product_item_field_basic_assignedrep',
        value: 'assignedTo',
        component: UserAutoComplete,
        componentProps: { single: true, showAvatar: true },
        getValue: (componentValue: any) => {
          return componentValue?.id ?? '';
        }
      }
    ],
    onChange: (nValue: any) => {
      setFilter({ ...filterValues, filterBy: nValue });
    },
    selected: filterValues?.filterBy
  };

  const renderTableGroupByKeyName = (keyName: string, keyOptionValue: string | null = null, keyOptionLabel: string | null = null) => {
    const defaultTableProps: ListTableProps = {
      rows: [],
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
    return (
      <ListTableGrouping
        tableProps={defaultTableProps}
        data={itemsList}
        groupKey={keyName} //if data id object, need {value, label}
        groupKeyValue={keyOptionValue ? keyOptionValue : undefined}
        groupKeyLabel={keyOptionLabel ? keyOptionLabel : undefined}
        listTableHeaderProps={listTableHeaderProdPerProps2}
        // configAccordionSummary={groupByDeleted2 ? LEAD_TYPE_OPTIONS : undefined}
      />
    );
  };

  const TableMemo = useMemo(() => {
    const getListTableProps = (groupBy: string) => {
      switch (groupBy) {
        case 'itemPerProduct1':
          return listTableHeaderProdPerProps1;
        case 'deletedItem':
          return listTableHeaderDeletedProps;
        default:
          return undefined;
      }
    };

    const listTableProps: ListTableProps = {
      rows: groupByPerProd1 ? getConfigRowSpannedByField(itemsList, keyNames.KEY_ITEM_PRODUCT, 'id') : itemsList,
      checkedIds,
      onRowChecked: onChecked,
      pagingProps,
      onPageChange: handlePagingChange,
      columns: groupByPerProd1 ? configMovingColumnsByKey(tableColumns, keyNames.KEY_ITEM_PRODUCT) : tableColumns,
      onSortBy: (clName: any, isSorted: any) => {
        if (isSorted !== false) {
          let orderBy = isSorted === 'desc' ? DESC : ASC;
          setSort({ field: clName, orderBy: orderBy });
        }
      },
      isRowSpanned: isRowSpanned,
      listTableHeaderProps: getListTableProps(groupBy)
    };
    return <ListTable {...listTableProps} />;
  }, [itemsList, tableColumns, checkedIds, groupBy]);

  const GridMemo = useMemo(() => {
    const handleOnRowChecked = (cId: string) => {
      const newCheckedIds = _.cloneDeep(checkedIds);
      const fIndex = newCheckedIds?.findIndex((v: string) => v === cId);
      if (fIndex >= 0) {
        newCheckedIds.splice(fIndex, 1);
      } else {
        newCheckedIds.push(cId);
      }
      onChecked && onChecked(newCheckedIds);
    };

    const getMapGridColumns = () => {
      return {
        ...columnRenderRemap(category, groupByDelete)
      };
    };
    return (
      <GridList pagingProps={pagingProps} onPageChange={handlePagingChange} isSmall={isSplitMode}>
        {itemsList?.map((item: any, index: number) => {
          return (
            <Grid
              key={index}
              item
              xs={12}
              {...(isSplitMode ? {} : { sm: 6, lg: 4 })}
              sx={isSplitMode ? { paddingTop: '0px !important' } : {}}
            >
              <ListGridCard
                isSplitMode={isSplitMode}
                sx={{
                  position: 'relative',
                  //border: '1px solid',
                  borderRadius: 1,
                  // p: 2,
                  minHeight: 130,
                  borderColor: theme.palette.divider
                }}
                {...{
                  data: item,
                  isChecked: checkedIds?.indexOf(item?.id) >= 0
                }}
                onChecked={handleOnRowChecked}
                fields={fields}
                mapFields={getMapGridColumns()}
              />
            </Grid>
          );
        })}
      </GridList>
    );
  }, [itemsList, fields, isSplitMode, checkedIds]);

  const getTypeBody = (listType: ListType) => {
    switch (listType) {
      case ListType.GRID:
      case ListType.SPLIT:
        return GridMemo;
      default:
        return groupByPerProd2 ? renderTableGroupByKeyName(keyNames.KEY_ITEM_PRODUCT, 'id', 'name') : TableMemo;
    }
  };

  return <ListBody>{getTypeBody(listType)}</ListBody>;
};

export default Body;
