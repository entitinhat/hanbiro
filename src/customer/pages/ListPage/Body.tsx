import React, { useMemo } from 'react';

//third-party
import { ColumnDef } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import { useRecoilValue } from 'recoil';
import { Checkbox, Grid, useTheme } from '@mui/material';
import { DeleteOutline, ReplayOutlined } from '@mui/icons-material';

//project
import { ListBody } from '@base/components/@hanbiro/List';
import { makeTable8Columns } from '@base/components/@hanbiro/ReactTable8/Helper';
import ListTable, { ListTableProps } from '@base/components/@hanbiro/List/ListTable';
import GridList from '@base/components/@hanbiro/List/GridList';
import { ListPaginationProps } from '@base/components/@hanbiro/List/ListPagination';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { GroupType, ListType } from '@base/types/app';
import { DESC, ASC, LIST_TABLE_PAGE_SIZE } from '@base/config/constant';
import { MENU_CUSTOMER } from '@base/config/menus';
import { selectionFieldsAtom } from '@base/store/atoms/app';
import UserAutoComplete from '@sign-in/containers/UserAutoComplete';
import { Currency } from '@base/types/common';
import { defaultCurrencySelector } from '@base/store/selectors/app';
import useDevice from '@base/hooks/useDevice';
import ListTableGrouping from '@base/components/@hanbiro/List/ListTableGroup';
import { configMovingColumnsByKey, getConfigRowSpannedByField } from '@base/components/@hanbiro/List/helper';

//menu
import * as keyNames from '@customer/config/keyNames';
import ListGridCard from '@customer/containers/ListGridCard'; //custom
import {
  CUSTOMER_GROUP_BY_ALL_EMPLOYEE,
  CUSTOMER_GROUP_BY_MY_GROUP,
  CUSTOMER_GROUP_BY_UNASSIGN,
  CUSTOMER_GROUP_BY_DUPLICATED,
  DISABLED_SORT_FIELDS
} from '@customer/config/list-field';
import CustomerAutoComplete from '@customer/containers/CustomerAutoComplete';
import { CUSTOMER_CATEGORY_ACCOUNT } from '@customer/config/constants';
import { useCustomerDeleteRecovery, useCustomerEmptyRecovery, useCustomerRestore } from '@customer/hooks/useCusomerRestoreMutation';
import { getMapColumns, isDeleteList } from './Helper';

interface BodyProps {
  isSplitMode: boolean;
  category: string;
  isFetching?: boolean;
  fields: any;
  viewingFields: any;
  itemsList: any;
  paging: any;
  selectedIds: string[];
  onChecked: (val: string[]) => void;
  onReload?: () => void;
  onCancel?: () => void;
}

const PageBody = (props: BodyProps) => {
  const {
    isSplitMode,
    category, //router category
    fields, //--> viewing fields
    itemsList,
    viewingFields,
    paging,
    selectedIds,
    onChecked,
    onReload,
    onCancel
  } = props;
  const { t } = useTranslation();
  const theme = useTheme();
  //state
  const pageDataKey = `${MENU_CUSTOMER}_${category}`;
  const {
    listType,
    settingColumns,
    getViewingFields,
    setSort,
    setPaging,
    paging: cPaging,
    filterValues,
    setFilter
  } = useListPageSettings(pageDataKey);
  const groupBy = filterValues?.groupBy;
  //settings data
  const { isMobile } = useDevice();
  const selectionFields = useRecoilValue(selectionFieldsAtom);
  const defaultCurrency: Currency = useRecoilValue(defaultCurrencySelector);
  const mRestore = useCustomerRestore({ onCancel, onReload });
  const mEmpty = useCustomerEmptyRecovery({ onCancel, onReload });
  const mDeleteRecovery = useCustomerDeleteRecovery({ onCancel, onReload });

  //what group type
  let selectedGroupType = '';
  let groupKeyName = '';
  if (groupBy === CUSTOMER_GROUP_BY_MY_GROUP || groupBy === CUSTOMER_GROUP_BY_ALL_EMPLOYEE) {
    selectedGroupType = GroupType.ROWSPAN;
    switch (groupBy) {
      case CUSTOMER_GROUP_BY_MY_GROUP:
        groupKeyName = keyNames.KEY_NAME_CUSTOMER_ASSIGN_TO;
        break;
      case CUSTOMER_GROUP_BY_ALL_EMPLOYEE:
        groupKeyName = keyNames.KEY_NAME_CUSTOMER_ACCOUNT;
        break;
      default:
        groupKeyName = keyNames.KEY_NAME_CUSTOMER_CREATED_BY;
        break;
    }
  }
  // if (groupBy == CUSTOMER_GROUP_BY_UNASSIGN) {
  //   selectedGroupType = GroupType.ROWGROUP;
  //   groupKeyName = keyNames.KEY_NAME_CUSTOMER_CREATED_BY;
  // }
  const isDeletedGrouping = isDeleteList(groupBy);
  const isFieldGrouping =
    groupBy === CUSTOMER_GROUP_BY_MY_GROUP ||
    groupBy === CUSTOMER_GROUP_BY_UNASSIGN ||
    groupBy === CUSTOMER_GROUP_BY_DUPLICATED ||
    groupBy === CUSTOMER_GROUP_BY_ALL_EMPLOYEE;

  //actions for groupby
  const bottomHeaderDeletedProps = {
    checkedIds: selectedIds,
    leftFilter: [],
    actionOnSelected: [
      // action will display when some rows was selected
      {
        value: 'restore',
        label: 'ncrm_common_btn_restore',
        color: 'primary',
        icon: <ReplayOutlined fontSize="small" />,
        onClick: (ids: string[]) => {
          mRestore.mutate({ ids: selectedIds });
        }
      },
      {
        value: 'delete',
        label: 'ncrm_common_btn_delete',
        color: 'error',
        icon: <DeleteOutline fontSize="small" />,
        onClick: (ids: string[]) => {
          mDeleteRecovery.mutate({ ids: selectedIds });
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
          mEmpty.mutate({ ids: selectedIds });
        }
      }
    ],
    onCancel: onCancel
  };

  //get leftFilter component
  const getLeftFilterComponent = () => {
    switch (groupBy) {
      case CUSTOMER_GROUP_BY_MY_GROUP:
        return UserAutoComplete;
      case CUSTOMER_GROUP_BY_UNASSIGN:
      case CUSTOMER_GROUP_BY_DUPLICATED:
      case CUSTOMER_GROUP_BY_ALL_EMPLOYEE:
        return CustomerAutoComplete;
    }
  };

  //get leftFilter component props
  const getLeftFilterComponentProps = () => {
    switch (groupBy) {
      case CUSTOMER_GROUP_BY_MY_GROUP:
        return {
          single: false,
          showAvatar: true
        };
      case CUSTOMER_GROUP_BY_UNASSIGN:
      case CUSTOMER_GROUP_BY_DUPLICATED:
        return {
          single: false,
          showAvatar: true
        };
      case CUSTOMER_GROUP_BY_ALL_EMPLOYEE:
        return {
          single: false,
          showAvatar: true,
          category: CUSTOMER_CATEGORY_ACCOUNT,
          placeholder: 'Type or click to select an account...'
        };
      default:
        return {};
    }
  };

  //actions for groupby
  const bottomHeaderProps = {
    checkedIds: selectedIds,
    leftFilter: [
      {
        value: groupKeyName,
        component: getLeftFilterComponent(),
        componentProps: getLeftFilterComponentProps(),
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
    selected: filterValues?.filterBy,
    onCancel: onCancel
  };

  //paging change
  const handlePagingChange = (page: number, size: number) => {
    setPaging({ page, size });
  };

  //table columns
  const tableFields = useMemo(() => {
    // let viewingFields: any = [];
    // if (fields?.length > 0) {
    //   viewingFields = getViewingFields(fields, settingColumns);
    // }

    let newFields: any[] = [];
    viewingFields.forEach((_ele: any) => {
      newFields.push({
        ..._ele,
        enableSorting: !DISABLED_SORT_FIELDS.includes(_ele.keyName),
        width: _ele.keyName === keyNames.KEY_NAME_CUSTOMER_PHOTO ? '80px' : 'auto'
      });
    });
    return newFields;
  }, [viewingFields, settingColumns, category]);

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

    return columns;
  }, [tableFields, category]);

  //list paging
  const pagingProps: ListPaginationProps = {
    pageTotal: paging?.totalPage || 1,
    pageCount: paging?.totalItems || 0,
    pageSize: !!cPaging?.size ? cPaging?.size : paging?.size ?? LIST_TABLE_PAGE_SIZE,
    pageIndex: paging?.currentPage || 1
  };

  //Table Group by keyName
  const renderTableGroupByKeyName = (keyName: string, keyOptionValue: string, keyOptionLabel: string) => {
    const defaultTableProps: ListTableProps = {
      rows: [],
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
      }
      // isRowSpanned: false
    };
    return (
      <ListTableGrouping
        tableProps={defaultTableProps}
        data={itemsList}
        groupKey={keyName} //if data id object, need {value, label}
        groupKeyValue={keyOptionValue}
        groupKeyLabel={keyOptionLabel}
        listTableHeaderProps={isFieldGrouping ? bottomHeaderProps : isDeletedGrouping ? bottomHeaderDeletedProps : undefined}
      />
    );
  };

  //render table list
  const TableMemo = useMemo(() => {
    const listTableProps: ListTableProps = {
      rows:
        selectedGroupType === GroupType.ROWSPAN && !isDeletedGrouping
          ? getConfigRowSpannedByField(itemsList, groupKeyName, 'id')
          : selectedGroupType === GroupType.ROWSPAN && isDeletedGrouping
          ? getConfigRowSpannedByField(itemsList, groupKeyName, 'id')
          : itemsList || [],
      checkedIds: selectedIds,
      onRowChecked: onChecked,
      pagingProps,
      onPageChange: handlePagingChange,
      columns:
        selectedGroupType === GroupType.ROWSPAN && !isDeletedGrouping
          ? configMovingColumnsByKey(tableColumns, groupKeyName)
          : selectedGroupType === GroupType.ROWSPAN && isDeletedGrouping
          ? configMovingColumnsByKey(tableColumns, groupKeyName)
          : tableColumns,
      onSortBy: (clName: any, isSorted: any) => {
        if (isSorted !== false) {
          let orderBy = isSorted === 'desc' ? DESC : ASC;
          setSort({ field: clName, orderBy: orderBy });
        }
      },
      isRowSpanned:
        (selectedGroupType === GroupType.ROWSPAN && !isDeletedGrouping) || (selectedGroupType === GroupType.ROWSPAN && isDeletedGrouping),
      listTableHeaderProps: isFieldGrouping ? bottomHeaderProps : isDeletedGrouping ? bottomHeaderDeletedProps : undefined
    };
    return <ListTable {...listTableProps} />;
  }, [itemsList, tableColumns, selectedIds, groupBy]);

  //render grid list
  const GridMemo = useMemo(() => {
    //handle click inside
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
                  p: 2,
                  minHeight: 130,
                  borderColor: theme.palette.divider
                }}
                category={category}
                {...{
                  data: item,
                  isChecked: selectedIds?.indexOf(item?.id) >= 0
                }}
                onChecked={handleOnRowChecked}
              />
            </Grid>
          );
        })}
      </GridList>
    );
  }, [itemsList, isSplitMode, viewingFields, selectedIds]);

  //display mode
  const getTypeBody = (listType: ListType) => {
    switch (listType) {
      case ListType.GRID:
      case ListType.SPLIT:
        return GridMemo;
      default:
        return selectedGroupType === GroupType.ROWGROUP && !isDeletedGrouping
          ? renderTableGroupByKeyName(groupKeyName, 'id', 'name')
          : selectedGroupType === GroupType.ROWGROUP && isDeletedGrouping
          ? renderTableGroupByKeyName(groupKeyName, 'id', 'name')
          : TableMemo;
    }
  };

  //main
  return <ListBody>{isMobile ? GridMemo : getTypeBody(listType)}</ListBody>;
};

export default PageBody;
