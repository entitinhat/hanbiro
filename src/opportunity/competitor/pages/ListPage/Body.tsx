import React, { useMemo } from 'react';

//third-party
import { ColumnDef } from '@tanstack/react-table';
//import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import { useRecoilValue } from 'recoil';

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
import { MENU_OPPORTUNITY_COMPETITOR } from '@base/config/menus';
import useDevice from '@base/hooks/useDevice';
import { configMovingColumnsByKey, getConfigRowSpannedByField } from '@base/components/@hanbiro/List/helper';

//related menu
import ProductAutoComplete from '@product/product/containers/ProductAutoComplete';

//material
import { Checkbox, Grid, TextField, useTheme } from '@mui/material';
import { DeleteOutline, ReplayOutlined } from '@mui/icons-material';

//menu
import * as keyNames from '@competitor/config/keyNames';
import ListGridCard from '@competitor/containers/ListGridCard';
import { getMapColumns, isDeleteList } from '@competitor/pages/ListPage/Helper';
import { COMPETIOR_GROUP_BY_DELETED, COMPETIOR_GROUP_BY_PRODUCT, DISABLED_SORT_FIELDS } from '@competitor/config/list-field';
import { useCompetitorDeleteRecovery, useCompetitorEmpty, useCompetitorRestore } from '@competitor/hooks/useCompetitorDelete';

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
  onReload?: () => void;
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
    onCancel,
    onReload
  } = props;
  const theme = useTheme();
  const pageDataKey = MENU_OPPORTUNITY_COMPETITOR;
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
  //delete action
  const mRestore = useCompetitorRestore({ onCancel, onReload });
  const mEmpty = useCompetitorEmpty({ onCancel, onReload });
  const mDeleteRecovery = useCompetitorDeleteRecovery({ onCancel, onReload });
  //groupBy UI
  const groupBy = filterValues?.groupBy;
  //console.log('group by ', groupBy);
  //get device
  const { isMobile } = useDevice();
  //what group type
  let selectedGroupType = '';
  let groupKeyName = '';
  // group by type 1
  if (groupBy == COMPETIOR_GROUP_BY_PRODUCT || groupBy == COMPETIOR_GROUP_BY_DELETED) {
    selectedGroupType = GroupType.ROWSPAN;
    groupKeyName = keyNames.KEY_NAME_COMPETITOR_PRODUCT;
  }
  // group by type 2
  // if (groupBy == 'groupKey') {
  //   selectedGroupType = GroupType.ROWGROUP;
  //   groupKeyName = keyNames.KEY_NAME_QUOTE_CREATED_BY;
  // }
  const isDeletedGrouping = isDeleteList(groupBy);
  const isFieldGrouping = groupBy === COMPETIOR_GROUP_BY_PRODUCT;

  //actions for groupby
  const bottomHeaderDeletedProps = {
    checkedIds: checkedIds,
    leftFilter: [
      {
        value: keyNames.KEY_NAME_COMPETITOR_PRODUCT,
        component: ProductAutoComplete,
        componentProps: {},
        getValue: (value: any) => {
          return value?.length > 0 ? value?.map((v: any) => v?.id).join(',') : '';
        },
        setValue: (value: string) => {
          return value ? value.split(',') : [];
        }
      }
    ],
    actionOnSelected: [
      // action will display when some rows was selected
      {
        value: 'restore',
        label: 'ncrm_common_btn_restore',
        color: 'primary',
        icon: <ReplayOutlined fontSize="small" />,
        onClick: (e: any) => {
          //console.log('Action', ids);
          mRestore.mutate({ ids: checkedIds });
        }
      },
      {
        value: 'delete',
        label: 'ncrm_common_btn_delete',
        color: 'error',
        icon: <DeleteOutline fontSize="small" />,
        onClick: (e: any) => {
          //console.log('Action', ids);
          mDeleteRecovery.mutate({ ids: checkedIds });
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
        onClick: (e: any) => {
          mEmpty.mutate({});
        }
      }
    ],
    onCancel: onCancel
  };

  //get leftFilter component
  const getLeftFilterComponent = () => {
    switch (groupBy) {
      case COMPETIOR_GROUP_BY_PRODUCT:
        return ProductAutoComplete;
      default:
        return TextField;
    }
  };
  //get leftFilter component props
  const getLeftFilterComponentProps = () => {
    switch (groupBy) {
      case COMPETIOR_GROUP_BY_PRODUCT:
        return {
          single: false
        };
      default:
        return {
          fullWidth: true
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
          : itemsList,
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
                isSplitMode={isSplitMode}
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
