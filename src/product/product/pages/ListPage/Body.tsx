import { useEffect, useMemo } from 'react';
import _ from 'lodash';
import { ColumnDef } from '@tanstack/react-table';

//mui
import { Checkbox, Grid, Typography, useTheme } from '@mui/material';
import { DeleteOutline, Replay } from '@mui/icons-material';

//base
import { ListType } from '@base/types/app';
import { ASC, DESC, LIST_TABLE_PAGE_SIZE } from '@base/config/constant';
import { MENU_PRODUCT_PRODUCT } from '@base/config/menus';
import { ListBody } from '@base/components/@hanbiro/List';
import { ListPaginationProps } from '@base/components/@hanbiro/List/ListPagination';
import ListTable, { ListTableProps } from '@base/components/@hanbiro/List/ListTable';
import ListTableGrouping from '@base/components/@hanbiro/List/ListTableGroup';
import { makeTable8Columns } from '@base/components/@hanbiro/ReactTable8/Helper';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import useDevice from '@base/hooks/useDevice';
import { configMovingColumnsByKey, getConfigRowSpannedByField } from '@base/components/@hanbiro/List/helper';
import { useListQueryKeys } from '@base/hooks/user-setting/useListQueryKeys';
import UserAutoComplete from '@sign-in/containers/UserAutoComplete';
import GridList from '@base/components/@hanbiro/List/GridList';

//product
import ProductGroupAutoComplete from '@product/group/containers/ProductGroupAutoComplete';
import { sortsBy } from '@product/product/config/list-field/options';
import ListGridCard from '@product/product/containers/ListGridCard';
import { useProductMutation } from '@product/product/hooks/useProductMutation';
import * as keyNames from '@product/product/config/keyNames';

//local
import { columnRenderRemap, isDeleteList } from './Helper';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import { useTranslation } from 'react-i18next';

interface BodyProps {
  [x: string]: any;
}

const Body = (props: BodyProps) => {
  const { isSplitMode, category, fields, itemsList, paging = {}, checkedIds, onChecked, onCancel, refetch } = props;
  const { isMobile } = useDevice();
  const { t } = useTranslation();

  const theme = useTheme();

  const layoutKey: string = MENU_PRODUCT_PRODUCT;
  const {
    listType: cListType,
    settingColumns,
    filterValues,
    setSort,
    setPaging,
    paging: cPaging,
    getViewingFields,
    setFilter
  } = useListPageSettings(layoutKey);

  const groupBy = filterValues?.groupBy;
  const groupByGroupProduct1 = groupBy == 'myGroupProduct';
  const groupByGroupProduct2 = groupBy == 'myGroupProduct2';
  const groupProdPerGroup1 = groupBy == 'productsPerGroup';
  const groupProdPerGroup2 = groupBy == 'productsPerGroup2';
  const isDeleteGroup = isDeleteList(groupBy);
  const primaryKey = 'id';

  let listType = isMobile ? ListType.GRID : cListType;

  const configItemsList = itemsList.map((item: any, index: number) => {
    return {
      ...item,
      assignTo: item?.assignTo?.user ? item.assignTo?.user : { id: '0', name: t('ncrm_common_unassigned') } // replace value to display when data return assignTo : null or undefined
    };
  });

  const itemListSortByProductGroup = _.cloneDeep(itemsList).sort((a: any, b: any) => {
    // grouping item by sort to spanned all item have same product group
    return a?.group?.name >= b?.group?.name ? 1 : -1;
  });

  //hook
  const { listQueryKey } = useListQueryKeys(MENU_PRODUCT_PRODUCT);
  const { mEmptyAll, mRestore, mEmpty } = useProductMutation(listQueryKey);

  useEffect(() => {
    if(mEmptyAll.isSuccess){
      refetch && refetch();
    }
  }, [mEmptyAll.isSuccess])

  let viewingFields: any = [];
  if (fields?.length > 0) {
    viewingFields = getViewingFields(fields, settingColumns);
  }

  const handlePagingChange = (page: number, size: number) => {
    setPaging({ page, size });
  };

  const getMapColumns = () => {
    return columnRenderRemap(category, isDeleteGroup);
  };

  const tableFields = useMemo(() => {
    let newFields: any[] = [];
    viewingFields.forEach((_ele: any) => {
      newFields.push({
        ..._ele,
        enableSorting: sortsBy?.findIndex((v: any) => v.value === _ele.keyName) >= 0,
        width: _ele.keyName === 'photo' ? '100px' : 'auto'
      });
    });
    return newFields;
  }, [viewingFields, category]);

  const tableColumns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: 'select',
        width: '45px',
        header: ({ table }) => (
          <Checkbox
            {...{
              // color: 'secondary',
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
                // color: 'secondary',
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
    [tableFields, checkedIds]
  );

  const listTableHeaderMyGroupProps = {
    checkedIds: checkedIds,
    leftFilter: [
      {
        value: 'assignedTo',
        component: UserAutoComplete,
        componentProps: {
          showAvatar: true
        },
        getValue: (value: any) => {
          return value?.length > 0 ? value?.map((v: any) => v?.id).join(',') : '';
        },
        setValue: (value: string) => {
          return value ? value.split(',') : [];
        }
      }
    ],
    onChange: (nValue: any) => {
      setFilter({ ...filterValues, filterBy: nValue });
    },
    selected: filterValues?.filterBy
  };

  const listTableHeaderProdPerProps = {
    checkedIds: checkedIds,
    leftFilter: [
      {
        value: 'groupId',
        component: ProductGroupAutoComplete,
        componentProps: {
          showAvatar: true
        },
        getValue: (componentValue: any): string => {
          return componentValue?.id;
        },
        setValue: (value: string) => {
          return value ? { id: value } : null;
        }
      }
    ],
    onChange: (nValue: any) => {
      setFilter({ ...filterValues, filterBy: nValue });
    },
    selected: filterValues?.filterBy
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
          mEmptyAll.mutate();
        }
      }
    ],
    onCancel: onCancel
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
        data={configItemsList}
        groupKey={keyName} //if data id object, need {value, label}
        groupKeyValue={keyOptionValue ? keyOptionValue : undefined}
        groupKeyLabel={keyOptionLabel ? keyOptionLabel : undefined}
        listTableHeaderProps={
          groupByGroupProduct2
            ? listTableHeaderMyGroupProps
            : groupProdPerGroup2
            ? listTableHeaderProdPerProps
            : isDeleteGroup
            ? listTableHeaderDeletedProps
            : undefined
        }
        // configAccordionSummary={groupByDeleted2 ? LEAD_TYPE_OPTIONS : undefined}
      />
    );
  };

  const pagingProps: ListPaginationProps = {
    pageTotal: paging?.totalPage || 1,
    pageCount: paging?.totalItems || 0,
    pageSize: !!cPaging?.size ? cPaging?.size : paging?.size ?? LIST_TABLE_PAGE_SIZE,
    pageIndex: paging?.currentPage || 1
  };

  const TableMemo = useMemo(() => {
    const listTableProps: ListTableProps = {
      rows: groupByGroupProduct1
        ? getConfigRowSpannedByField(configItemsList, keyNames.KEY_PRODUCT_ASSIGN_TO, 'id')
        : groupProdPerGroup1
        ? getConfigRowSpannedByField(itemListSortByProductGroup, keyNames.KEY_PRODUCT_GROUP, 'id')
        : itemsList || [],
      checkedIds,
      onRowChecked: onChecked,
      pagingProps,
      onPageChange: handlePagingChange,
      columns: groupByGroupProduct1
        ? configMovingColumnsByKey(tableColumns, keyNames.KEY_PRODUCT_ASSIGN_TO)
        : groupProdPerGroup1
        ? configMovingColumnsByKey(tableColumns, keyNames.KEY_PRODUCT_GROUP)
        : tableColumns,
      onSortBy: (clName: any, isSorted: any) => {
        if (isSorted !== false) {
          let orderBy = isSorted === 'desc' ? DESC : ASC;
          setSort({ field: clName, orderBy: orderBy });
        }
      },
      isRowSpanned: groupByGroupProduct1 || groupProdPerGroup1,
      listTableHeaderProps: groupByGroupProduct1
        ? listTableHeaderMyGroupProps
        : groupProdPerGroup1
        ? listTableHeaderProdPerProps
        : isDeleteGroup
        ? listTableHeaderDeletedProps
        : undefined
    };
    return <ListTable {...listTableProps} />;
  }, [itemsList, tableColumns, checkedIds, groupByGroupProduct1, groupProdPerGroup1, isDeleteGroup]);

  const getMapGridColumns = () => {
    return {
      ...columnRenderRemap(category, isDeleteGroup),
      [keyNames.KEY_PRODUCT_ATTRIBUTE](col: string, data: any) {
        return <Typography>{data?.[col]?.map((item: any) => item?.name).join(',') ?? ''}</Typography>;
      },
      [keyNames.KEY_PRODUCT_ASSIGN_TO](col: string, data: any) {
        return <Typography>{data?.[col]?.user?.name ?? <SpanLang keyLang="ncrm_common_unassigned" textOnly />}</Typography>;
      }
    };
  };

  const GridMemo = useMemo(() => {
    //handle click inside
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
  }, [itemsList, isSplitMode, fields, checkedIds]);

  const getTypeBody = (listType: ListType) => {
    switch (listType) {
      case ListType.GRID:
      case ListType.SPLIT:
        return GridMemo;
      default:
        return groupByGroupProduct2
          ? renderTableGroupByKeyName(keyNames.KEY_PRODUCT_ASSIGN_TO, 'id', 'name')
          : groupProdPerGroup2
          ? renderTableGroupByKeyName(keyNames.KEY_PRODUCT_GROUP, 'id', 'name')
          : TableMemo;
    }
  };

  const ListBodyMemo = useMemo(() => {
    return getTypeBody(listType);
  }, [itemsList, isSplitMode, fields, viewingFields, listType, checkedIds, primaryKey]);

  return <ListBody>{ListBodyMemo}</ListBody>;
};

export default Body;
