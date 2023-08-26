import React, { useMemo } from 'react';

//third-party
import { ColumnDef } from '@tanstack/react-table';
import _ from 'lodash';

//project
import { ListBody } from '@base/components/@hanbiro/List';
import { makeTable8Columns } from '@base/components/@hanbiro/ReactTable8/Helper';
import ListTable, { ListTableProps } from '@base/components/@hanbiro/List/ListTable';
import ListTableGrouping from '@base/components/@hanbiro/List/ListTableGroup';
import GridList from '@base/components/@hanbiro/List/GridList';
import { ListPaginationProps } from '@base/components/@hanbiro/List/ListPagination';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { GroupType, ListType } from '@base/types/app';
import { DESC, ASC, LIST_TABLE_PAGE_SIZE } from '@base/config/constant';
import { MENU_QUOTE, MENU_SALES } from '@base/config/menus';
import useDevice from '@base/hooks/useDevice';
import { configMovingColumnsByKey, getConfigRowSpannedByField } from '@base/components/@hanbiro/List/helper';
import LookUp from '@base/containers/LookUp';

//related menu
import UserAutoComplete from '@sign-in/containers/UserAutoComplete';
import CustomerAutoComplete from '@customer/containers/CustomerAutoComplete';
import ItemAutoComplete from '@product/item/containers/ItemAutoComplete';
import { useGetModuleProcesses } from '@process/hooks/useModule';

//material
import { Checkbox, Grid, useTheme } from '@mui/material';
import { DeleteOutline, ReplayOutlined } from '@mui/icons-material';

//menu
import * as keyNames from '@quote/config/keyNames';
import ListGridCard from '@quote/containers/ListGridCard';
import { getMapColumns, isDeleteList } from '@quote/pages/ListPage/Helper';
import { DISABLED_SORT_FIELDS } from '@quote/config/list-field/options';

interface BodyProps {
  isSplitMode: boolean;
  category: string;
  isFetching?: boolean;
  fields: any; //all fields
  viewingFields: any; //showing fields
  itemsList: any; //data
  paging: any;
  checkedIds: string[];
  onChecked: (val: string[]) => void;
  onCancel?: () => void;
}

const Body = (props: BodyProps) => {
  const {
    isSplitMode,
    category, //router category
    fields, //--> all fields
    viewingFields,
    itemsList,
    paging,
    checkedIds,
    onChecked,
    onCancel
  } = props;
  const theme = useTheme();
  const pageDataKey = `${MENU_SALES}_${MENU_QUOTE}`;
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
  //groupBy UI
  const groupBy = filterValues?.groupBy;
  //console.log('group by ', groupBy);
  //get device
  const { isMobile } = useDevice();
  //what group type
  let selectedGroupType = '';
  let groupKeyName = '';
  if (groupBy == 'all' || groupBy == 'customerQuote' || groupBy == 'itemQuote' || groupBy == 'processQuote' || groupBy == 'deletedQuote') {
    selectedGroupType = GroupType.ROWSPAN;
    switch (groupBy) {
      case 'customerQuote':
        groupKeyName = keyNames.KEY_NAME_QUOTE_CUSTOMER;
        break;
      case 'itemQuote':
        groupKeyName = keyNames.KEY_NAME_QUOTE_ITEMS; //TODO: productItem in item
        break;
      case 'processQuote':
        groupKeyName = keyNames.KEY_NAME_QUOTE_PROCESS;
        break;
      default:
        groupKeyName = keyNames.KEY_NAME_QUOTE_SALES_REP;
        break;
    }
  }
  if (groupBy == 'myGroupQuote') {
    selectedGroupType = GroupType.ROWGROUP;
    groupKeyName = keyNames.KEY_NAME_QUOTE_CREATED_BY;
  }
  const isDeletedGrouping = isDeleteList(groupBy);
  const isFieldGrouping = groupBy !== 'myQuote';

  //actions for groupby
  const bottomHeaderDeletedProps = {
    checkedIds: checkedIds,
    leftFilter: [
      // {
      //   value: 'type',
      //   component: CollectionMethodSelect,
      //   componentProps: {},
      //   getValue: (componentValue: any) => {
      //     return LEAD_COLLECTION_METHOD_TYPE_OPTIONS.findIndex((v: LabelValue) => v.value == componentValue?.id) + 1;
      //   },
      //   setValue: (value: number) => {
      //     return LEAD_COLLECTION_METHOD_TYPE_OPTIONS?.[value - 1]?.value;
      //   }
      // }
    ],
    actionOnSelected: [
      // action will display when some rows was selected
      {
        value: 'restore',
        label: 'ncrm_common_btn_restore',
        color: 'primary',
        icon: <ReplayOutlined fontSize="small" />,
        onClick: (ids: string[]) => {
          console.log('Action', ids);
        }
      },
      {
        value: 'delete',
        label: 'ncrm_common_btn_delete',
        color: 'error',
        icon: <DeleteOutline fontSize="small" />,
        onClick: (ids: string[]) => {
          console.log('Action', ids);
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
          console.log('onClick');
        }
      }
    ],
    onCancel: onCancel
  };

  //get leftFilter component
  const getLeftFilterComponent = () => {
    switch (groupBy) {
      case 'customerQuote':
        return CustomerAutoComplete;
      case 'itemQuote':
        return ItemAutoComplete;
      case 'processQuote':
        return LookUp;
      default:
        return UserAutoComplete;
    }
  };
  //get leftFilter component props
  const getLeftFilterComponentProps = () => {
    switch (groupBy) {
      case 'customerQuote':
        return {
          single: false,
          showAvatar: true
        };
      case 'itemQuote':
        return {
          single: false
        };
      case 'processQuote':
        return {
          fetchList: useGetModuleProcesses,
          fieldValue: 'id',
          fieldLabel: 'name',
          extraParams: { module: 'MODULE_TICKET' }, //MODULE_QUOTE
          isSearch: false
        };
      default:
        return {
          single: false,
          showAvatar: true
        };
    }
  };

  //actions for groupby
  const bottomHeaderProps = {
    checkedIds: checkedIds,
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
      //console.log('nValue', nValue);
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
        width: 'auto'
      });
    });
    return newFields;
  }, [viewingFields, settingColumns]); //category

  //build columns for table v8
  const tableColumns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: 'select',
        width: '45px',
        header: ({ table }) => (
          <Checkbox
            {...{
              color: 'secondary',
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
                color: 'secondary',
                checked: row.getIsSelected(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler()
              }}
              sx={{ p: 0 }}
            />
          </div>
        )
      },
      ...makeTable8Columns(tableFields, getMapColumns(), {}, [])
    ],
    [tableFields, category]
  );

  //list paging
  const pagingProps: ListPaginationProps = {
    pageTotal: paging?.totalPage || 1,
    pageCount: paging?.totalItems || 0,
    pageSize: !!cPaging?.size ? cPaging?.size : paging?.size ?? LIST_TABLE_PAGE_SIZE,
    pageIndex: paging?.currentPage || 1
  };

  // Table Group by keyName
  const renderTableGroupByKeyName = (keyName: string, keyOptionValue: string, keyOptionLabel: string) => {
    const defaultTableProps: ListTableProps = {
      rows: [],
      checkedIds: checkedIds,
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
      checkedIds: checkedIds,
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
  }, [itemsList, tableColumns, checkedIds, groupBy]);

  //render grid list
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
                  p: 2,
                  minHeight: 130,
                  borderColor: theme.palette.divider
                }}
                {...{
                  data: item,
                  isChecked: checkedIds?.indexOf(item?.id) >= 0
                }}
                onChecked={handleOnRowChecked}
              />
            </Grid>
          );
        })}
      </GridList>
    );
  }, [itemsList, isSplitMode, viewingFields, checkedIds]);

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

export default Body;
