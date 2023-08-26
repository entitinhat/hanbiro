import { useMemo } from 'react';
import _ from 'lodash';
import { ColumnDef } from '@tanstack/react-table';

import { Checkbox, Grid, useTheme } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import ListTableGrouping from '@base/components/@hanbiro/List/ListTableGroup';
import { ListBody } from '@base/components/@hanbiro/List';
import { ListPaginationProps } from '@base/components/@hanbiro/List/ListPagination';
import ListTable, { ListTableProps } from '@base/components/@hanbiro/List/ListTable';
import { makeTable8Columns } from '@base/components/@hanbiro/ReactTable8/Helper';
import { ASC, DESC, LIST_TABLE_PAGE_SIZE } from '@base/config/constant';
import { MENU_SALES, MENU_LEAD } from '@base/config/menus';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import GridList from '@base/components/@hanbiro/List/GridList';
import { ListType } from '@base/types/app';
import { configMovingColumnsByKey, getConfigRowSpannedByField } from '@base/components/@hanbiro/List/helper';
import useDevice from '@base/hooks/useDevice';

import { sortsBy } from '@lead/config/list-field';
import ListGridCard from '@lead/containers/ListGridCard';
import { KEY_LEAD_ASSIGN_TO, KEY_LEAD_PRIORITIZE, KEY_LEAD_TYPE } from '@lead/config/keyNames';
import { LEAD_TYPE_OPTIONS } from '@lead/config/constants';
import UserAutoComplete from '@sign-in/containers/UserAutoComplete';
import TypeAutoComplete from '@lead/containers/TypeAutoComplete';
import { useLeadsMutation } from '@lead/hooks/useLeadsMutation';

import { columnRenderRemap } from './Helper';

interface BodyProps {
  [x: string]: any;
  checkedIds: string[];
  isRowSpanned?: boolean;
  onCancel?: () => void;
  isPrioritize?: boolean;
}

const Body = (props: BodyProps) => {
  const { isSplitMode, category, fields, itemsList, paging = {}, checkedIds, onChecked, isRowSpanned, onCancel, isPrioritize = false } = props;
  const theme = useTheme();
  const { isMobile } = useDevice();
  const { mRestore, mEmpty, mEmptyAll } = useLeadsMutation();

  const configItemsList = itemsList.map((item: any, index: number) => {
    return {
      ...item,
      assignTo: item?.assignTo?.user ? item.assignTo?.user : { id: '0', name: 'ncrm_common_unassigned' } // replace value to display when data return assignTo : null or undefined
    };
  });

  const itemListSortByType = _.cloneDeep(itemsList).sort((a: any, b: any) => {
    return a?.type >= b?.type ? 1 : -1;
  });

  const layoutKey: string = `${MENU_SALES}_${MENU_LEAD}`;
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

  const groupBy = filterValues?.groupBy;
  const groupByGroupLead1 = groupBy == 'myGroupLead1';
  const groupByGroupLead2 = groupBy == 'myGroupLead2';
  const groupByDeleted1 = groupBy == 'allDeleted1';
  const groupByDeleted2 = groupBy == 'allDeleted2';

  let listType = isMobile ? ListType.GRID : cListType;

  const getMapColumns = () => {
    return columnRenderRemap(category, isPrioritize);
  };

  const getMapGridColumns = () => {
    return {
      ...columnRenderRemap(category, false),
    };
  };

  const pagingProps: ListPaginationProps = {
    pageTotal: paging?.totalPage || 1,
    pageCount: paging?.totalItems || 0,
    pageSize: !!cPaging?.size ? cPaging?.size : paging?.size ?? LIST_TABLE_PAGE_SIZE,
    pageIndex: paging?.currentPage || 1
  };

  const handlePagingChange = (page: number, size: number) => {
    setPaging({ page, size });
  };

  const tableFields = useMemo(() => {
    let viewingFields: any = [];
    if (fields?.length > 0) {
      viewingFields = getViewingFields(fields, settingColumns);
      // viewingFields = fields;
    }

    let newFields: any[] = [];
    viewingFields.forEach((_ele: any) => {
      newFields.push({
        ..._ele,
        enableSorting: sortsBy?.findIndex((v: any) => v.value === _ele.keyName) >= 0,
        // enableSorting: true,
        width: _ele.keyName === KEY_LEAD_PRIORITIZE ? '50px' : 'auto'
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
              // color: 'secondary',
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler()
            }}
            sx={{ p: 0, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
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
              sx={{ p: 0, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            />
          </div>
        )
      },
      ...makeTable8Columns(tableFields, getMapColumns(), { category }, [])
    ],
    [tableFields, category]
  );

  const listTableHeaderProps = {
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

  const listTableHeaderDeletedProps = {
    checkedIds: checkedIds,
    leftFilter: [
      {
        value: 'type',
        component: TypeAutoComplete,
        componentProps: {
          single: true
        },
        getValue: (componentValue: any) => {
          return componentValue?.value;
        },
        setValue: (value: any) => {
          return value ? LEAD_TYPE_OPTIONS.find((item) => item.value == value) : null;
        }
      }
    ],
    onChange: (nValue: any) => {
      setFilter({ ...filterValues, filterBy: nValue });
    },
    selected: filterValues?.filterBy,
    actionOnSelected: [
      // action will display when some rows was selected
      {
        value: 'restore',
        label: 'ncrm_common_btn_restore',
        color: 'primary',
        icon: <ReplayIcon fontSize="small" />,
        onClick: () => {
          mRestore.mutate(
          { ids: checkedIds },
          {
            onSuccess() {
              onCancel && onCancel();
            }
          }
        );
        }
      },
      {
        value: 'delete',
        label: 'ncrm_common_btn_delete',
        color: 'error',
        icon: <DeleteOutlineIcon fontSize="small" />,
        onClick: () => {
          mEmpty.mutate(
          { ids: checkedIds },
          {
            onSuccess() {
              onCancel && onCancel();
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
        icon: <DeleteOutlineIcon fontSize="small" />,
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
        listTableHeaderProps={groupByGroupLead2 ? listTableHeaderProps : groupByDeleted2 ? listTableHeaderDeletedProps : undefined}
        configAccordionSummary={groupByDeleted2 ? LEAD_TYPE_OPTIONS : undefined}
      />
    );
  };

  const TableMemo = useMemo(() => {
    const listTableProps: ListTableProps = {
      rows: groupByGroupLead1
        ? getConfigRowSpannedByField(configItemsList, KEY_LEAD_ASSIGN_TO, 'id')
        : groupByDeleted1
        ? getConfigRowSpannedByField(itemListSortByType, KEY_LEAD_TYPE) // sort listItem to spanned
        : itemsList || [],
      checkedIds,
      onRowChecked: onChecked,
      pagingProps,
      onPageChange: handlePagingChange,
      columns: groupByGroupLead1
        ? configMovingColumnsByKey(tableColumns, KEY_LEAD_ASSIGN_TO)
        : groupByDeleted1
        ? configMovingColumnsByKey(tableColumns, KEY_LEAD_TYPE)
        : tableColumns,
      onSortBy: (clName: any, isSorted: any) => {
        if (isSorted !== false) {
          let orderBy = isSorted === 'desc' ? DESC : ASC;
          setSort({ field: clName, orderBy: orderBy });
        }
      },
      isRowSpanned: groupByGroupLead1 || groupByDeleted1,
      listTableHeaderProps: groupByGroupLead1 ? listTableHeaderProps : groupByDeleted1 ? listTableHeaderDeletedProps : undefined
    };
    return <ListTable {...listTableProps} />;
  }, [itemsList, tableColumns, checkedIds, groupByGroupLead1, groupByDeleted1]);

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

    return (
      <GridList pagingProps={pagingProps} onPageChange={handlePagingChange} isSmall={isSplitMode || isMobile}>
        {itemsList?.map((item: any, index: number) => {
          return (
            <Grid key={item.id} item xs={12} {...(isSplitMode || isMobile ? { pt: '0px !important' } : { sm: 6, lg: 4 })}>
              <ListGridCard
                {...{
                  data: item,
                  isChecked: checkedIds?.indexOf(item?.id) >= 0
                }}
                onChecked={handleOnRowChecked}
                isSplitMode={isSplitMode || isMobile} //new listGridCard props
                fields={fields}
                mapFields={getMapGridColumns()}
              />
            </Grid>
          );
        })}
      </GridList>
    );
  }, [itemsList, fields, isSplitMode, checkedIds, isMobile]);

  const getTypeBody = (listType: ListType) => {
    switch (listType) {
      case ListType.GRID:
      case ListType.SPLIT:
        return GridMemo;
      default:
        return groupByGroupLead2
          ? renderTableGroupByKeyName(KEY_LEAD_ASSIGN_TO, 'id', 'name')
          : groupByDeleted2
          ? renderTableGroupByKeyName(KEY_LEAD_TYPE)
          : TableMemo;
    }
  };

  return <ListBody>{getTypeBody(listType)}</ListBody>;
};

export default Body;
