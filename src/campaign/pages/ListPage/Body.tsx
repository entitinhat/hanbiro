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
import { MENU_CAMPAIGN } from '@base/config/menus';
import { selectionFieldsAtom } from '@base/store/atoms/app';
import { Currency } from '@base/types/common';
import { defaultCurrencySelector } from '@base/store/selectors/app';
import useDevice from '@base/hooks/useDevice';
import { configMovingColumnsByKey, getConfigRowSpannedByField } from '@base/components/@hanbiro/List/helper';

//related menu
import UserAutoComplete from '@sign-in/containers/UserAutoComplete';

//material
import { Checkbox, Grid, useTheme } from '@mui/material';
import { DeleteOutline, ReplayOutlined } from '@mui/icons-material';

//menu
import * as keyNames from '@campaign/config/keyNames';
import ListGridCard from '@campaign/containers/ListGridCard';
import { getMapColumns, isDeleteList } from '@campaign/pages/ListPage/Helper';

interface BodyProps {
  isSplitMode: boolean;
  category: string;
  isFetching?: boolean;
  fields: any[];
  itemsList: any[];
  paging: any;
  selectedIds: string[];
  onChecked: (val: string[]) => void;
  onCancel?: () => void;
}

const PageBody = (props: BodyProps) => {
  const {
    isSplitMode,
    category, //router category
    fields, //--> viewing fields
    itemsList,
    paging,
    selectedIds,
    onChecked,
    onCancel
  } = props;
  //const { t } = useTranslation();
  const theme = useTheme();
  //state
  const pageDataKey = `${MENU_CAMPAIGN}_${category}`;
  const {
    listType,
    settingColumns,
    getViewingFields,
    setSort,
    setPaging,
    paging: cPaging,
    filterValues
  } = useListPageSettings(pageDataKey);
  const selectionFields = useRecoilValue(selectionFieldsAtom);
  const defaultCurrency: Currency = useRecoilValue(defaultCurrencySelector);
  //groupBy UI
  const groupBy = filterValues?.groupBy;
  const isDeletedGroup = isDeleteList(groupBy);
  //what group type
  let selectedGroupType = '';
  if (groupBy == 'myGroupCampaign1' || groupBy == 'deletedCampaign1') {
    selectedGroupType = GroupType.ROWSPAN;
  }
  if (groupBy == 'myGroupCampaign2' || groupBy == 'deletedCampaign2') {
    selectedGroupType = GroupType.ROWGROUP;
  }

  const isDeletedGroupBy = isDeleteList(groupBy);
  const isFieldGrouping =
    groupBy == 'myGroupCampaign1' || groupBy == 'myGroupCampaign2' || groupBy == 'deletedCampaign1' || groupBy == 'deletedCampaign2';

  const bottomHeaderDeletedProps = {
    checkedIds: selectedIds,
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

  const bottomHeaderProps = {
    checkedIds: selectedIds,
    leftFilter: [
      {
        value: keyNames.KEY_CAMPAIGN_ONWER, //'assignTo'
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
    onCancel: onCancel
  };

  //get device
  const { isMobile, isDesktop } = useDevice();
  //disabled sortBy columns
  const disableSortByColumns: string[] = [];

  //paging change
  const handlePagingChange = (page: number, size: number) => {
    setPaging({ page, size });
  };

  //table columns
  const tableFields = useMemo(() => {
    let viewingFields: any = [];
    if (fields?.length > 0) {
      viewingFields = getViewingFields(fields, settingColumns);
    }

    let newFields: any[] = [];
    viewingFields.forEach((_ele: any) => {
      newFields.push({
        ..._ele,
        enableSorting: !disableSortByColumns.includes(_ele.keyName),
        width: 'auto'
      });
    });
    return newFields;
  }, [fields, settingColumns, category]);

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
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            {...{
              color: 'secondary',
              checked: row.getIsSelected(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler()
            }}
          />
        )
      },
      ...makeTable8Columns(tableFields, getMapColumns(category, selectionFields, defaultCurrency), { category }, [])
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
        sx={{ mt: '55px' }}
        tableProps={defaultTableProps}
        data={itemsList}
        groupKey={keyName} //if data id object, need {value, label}
        groupKeyValue={keyOptionValue}
        groupKeyLabel={keyOptionLabel}
        listTableHeaderProps={
          listType === ListType.GRID
            ? undefined
            : isFieldGrouping
            ? isDeletedGroupBy
              ? bottomHeaderDeletedProps
              : bottomHeaderProps
            : undefined
        }
      />
    );
  };

  //render table list
  const TableMemo = useMemo(() => {
    const listTableProps: ListTableProps = {
      rows:
        selectedGroupType === GroupType.ROWSPAN && !isDeletedGroup
          ? getConfigRowSpannedByField(itemsList, keyNames.KEY_CAMPAIGN_ONWER, 'id')
          : selectedGroupType === GroupType.ROWSPAN && isDeletedGroup
          ? getConfigRowSpannedByField(itemsList, keyNames.KEY_CAMPAIGN_OBJECTIVE, 'id')
          : itemsList || [],
      checkedIds: selectedIds,
      onRowChecked: onChecked,
      pagingProps,
      onPageChange: handlePagingChange,
      columns:
        selectedGroupType === GroupType.ROWSPAN && !isDeletedGroup
          ? configMovingColumnsByKey(tableColumns, keyNames.KEY_CAMPAIGN_ONWER)
          : selectedGroupType === GroupType.ROWSPAN && isDeletedGroup
          ? configMovingColumnsByKey(tableColumns, keyNames.KEY_CAMPAIGN_OBJECTIVE)
          : tableColumns,
      onSortBy: (clName: any, isSorted: any) => {
        if (isSorted !== false) {
          let orderBy = isSorted === 'desc' ? DESC : ASC;
          setSort({ field: clName, orderBy: orderBy });
        }
      },
      isRowSpanned:
        (selectedGroupType === GroupType.ROWSPAN && !isDeletedGroup) || (selectedGroupType === GroupType.ROWSPAN && isDeletedGroup)
    };
    return <ListTable {...listTableProps} sx={{ mt: selectedGroupType !== '' ? '55px' : '0px' }} />;
  }, [itemsList, tableColumns, selectedIds]);

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
        return selectedGroupType === GroupType.ROWGROUP && !isDeletedGroup
          ? renderTableGroupByKeyName(keyNames.KEY_CAMPAIGN_ONWER, 'id', 'name')
          : selectedGroupType === GroupType.ROWGROUP && isDeletedGroup
          ? renderTableGroupByKeyName(keyNames.KEY_CAMPAIGN_OBJECTIVE, 'id', 'name')
          : TableMemo;
    }
  };

  //main
  return <ListBody>{isMobile ? GridMemo : getTypeBody(listType)}</ListBody>;
};

export default PageBody;
