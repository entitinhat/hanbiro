import React, { useMemo } from 'react';
import _ from 'lodash';

import { ListBody } from '@base/components/@hanbiro/List';
import ListGrid, { ListGridProps } from '@base/components/@hanbiro/List/ListGrid';
import { ListPaginationProps } from '@base/components/@hanbiro/List/ListPagination';
import ListTable, { ListTableProps } from '@base/components/@hanbiro/List/ListTable';
import { makeTable8Columns } from '@base/components/@hanbiro/ReactTable8/Helper';
import ListTableGrouping from '@base/components/@hanbiro/List/ListTableGroup';
import { configMovingColumnsByKey, getConfigRowSpannedByField } from '@base/components/@hanbiro/List/helper';
import { ASC, DESC, LIST_TABLE_PAGE_SIZE } from '@base/config/constant';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { GroupType, ListType } from '@base/types/app';
import { PageLayoutSectionField } from '@base/types/pagelayout';
import { Paging } from '@base/types/response';
import ListGridCard from '@desk/ticket/containers/ListGridCard';
import { Ticket } from '@desk/ticket/types/ticket';
import { Checkbox } from '@mui/material';
import { ColumnDef } from '@tanstack/react-table';
import { columnRenderRemap, isDeleteList } from './Helper';
import useDevice from '@base/hooks/useDevice';
import { DeleteOutline, ReplayOutlined } from '@mui/icons-material';
import { useListQueryKeys } from '@base/hooks/user-setting/useListQueryKeys';
import useTicketMutation from '@desk/ticket/hooks/useTicketMutations';
import { useGetModuleProcesses } from '@process/hooks/useModule';
import { MENU_DESK_TICKET } from '@base/config/menus';
import { useTranslation } from 'react-i18next';

import * as keyNames from '@desk/ticket/config/keyNames';
import * as ticketGroupBy from '@desk/ticket/config/list-field/ticketGroupBy';
import UserAutoComplete from '@sign-in/containers/UserAutoComplete';
import PriorityAutoComplete from '@desk/ticket/containers/PriorityAutocomplete';
import CustomerAutoComplete from '@customer/containers/CustomerAutoComplete';
import ChannelAutoComplete from '@desk/ticket/containers/ChannelAutoComplete';
import LookUp from '@base/containers/LookUp';

interface BodyProps<T> {
  isSplitMode: boolean;
  category: string;
  fields: PageLayoutSectionField[];
  itemsList: T[];
  paging?: Paging | undefined;
  checkedIds: string[];
  onChecked: (checkedIds: string[]) => void;
  onReload?: () => void;
  onCancel?: () => void;
  // refetch: () => void;
}

const Body = (props: BodyProps<Ticket>) => {
  const { isSplitMode, category, fields, itemsList, paging, checkedIds, onChecked, onReload, onCancel } = props;
  const {
    listType,
    settingColumns,
    filterValues,
    setSort,
    setPaging,
    paging: cPaging,
    getViewingFields,
    setFilter
  } = useListPageSettings(category);

  const { listQueryKey } = useListQueryKeys(MENU_DESK_TICKET);
  //responsive
  const { isMobile } = useDevice();
  const { t } = useTranslation();
  // Delete action
  const { mRestoreTicket, mEmptyTicket, mEmptyAllTicket } = useTicketMutation(listQueryKey);
  const groupBy = filterValues?.groupBy;

  const configItemsList = itemsList.map((item: any, index: number) => {
    return {
      ...item,
      assignedUser: item?.assignedUser ? item.assignedUser.user : { id: '0', name: '' }, // replace value to display when data return assignedUser : null or undefined
      priority: item?.priority ? { id: item?.priority?.keyName, name: item?.priority?.languageKey } : { id: '0', name: '' }
    };
  });

  // sort by Name to row span
  const itemsListSortByName = configItemsList.sort((a, b) => {
    let nameA = '';
    let nameB = '';
    if (groupBy === ticketGroupBy.MY_GROUP_TICKETS) {
      nameA = a.assignedUser?.name?.toUpperCase() || '';
      nameB = b.assignedUser?.name?.toUpperCase() || '';
    } else if (groupBy === ticketGroupBy.TICKETS_PER_CUSTOMER) {
      nameA = a.customer?.name?.toUpperCase() || '';
      nameB = b.customer?.name?.toUpperCase() || '';
    } else if (groupBy === ticketGroupBy.TICKETS_PER_PRIORITY) {
      nameA = a.priority?.name?.toUpperCase() || '';
      nameB = b.priority?.name?.toUpperCase() || '';
    }

    if (nameA < nameB) {
      return -1;
    }

    if (nameA > nameB) {
      return 1;
    }

    return 0;
  });

  // config Items List to ListTableGrouping
  const configItemsListCustomer = itemsList.map((item: any, index: number) => {
    return {
      ...item,
      customer: item?.customer ? item.customer.name : t('ncrm_common_no_customer')
    };
  });

  const configItemsListGroup = itemsList.map((item: any, index: number) => {
    return {
      ...item,
      assignedUser: item?.assignedUser ? item.assignedUser.user?.name ?? item.assignedUser.name ?? '' : 'ncrm_common_unassigned'
    };
  });

  const configItemsListPriority = itemsList.map((item: any, index: number) => {
    return {
      ...item,
      priority: item?.priority ? t(item.priority.languageKey) : t('ncrm_common_no_priority')
    };
  });

  const configItemsListChannel = itemsList.map((item: any, index: number) => {
    return {
      ...item,
      channel: item?.channel ? item?.channel?.name : t('ncrm_common_no_channel')
    };
  });

  const configItemsListProcess = itemsList.map((item: any, index: number) => {
    return {
      ...item,
      process: item?.process ? item?.process?.name : t('ncrm_common_no_process')
    };
  });

  // config options for Group Name
  // Assigned Rep
  const optionsListAssigned = itemsList.map((item: any, index: number) => {
    return item.assignedUser ? { label: item.assignedUser.user.name, value: item.assignedUser.user.name } : { label: '', value: '' };
  });

  const optionsGroupAssigned = optionsListAssigned.filter((item: any, index: number, self) => {
    // Use the JSON.stringify method to compare the objects as strings
    return index === self.findIndex((obj) => JSON.stringify(obj) === JSON.stringify(item));
  });

  // Customer
  const optionsListCustomer = itemsList.map((item: any, index: number) => {
    return item.customer ? { label: item.customer.name, value: item.customer.name } : { label: '', value: '' };
  });

  const optionsGroupCustomer = optionsListCustomer.filter((item: any, index: number, self) => {
    return index === self.findIndex((obj) => JSON.stringify(obj) === JSON.stringify(item));
  });

  // Priority
  const optionsListPriority = itemsList.map((item: any, index: number) => {
    return item.priority ? { label: item.priority.languageKey, value: item.priority.keyName } : { label: '', value: '' };
  });

  const optionsGroupPriority = optionsListPriority.filter((item: any, index: number, self) => {
    return index === self.findIndex((obj) => JSON.stringify(obj) === JSON.stringify(item));
  });
  const isFieldGrouping = _.includes(
    [
      ticketGroupBy.MY_GROUP_TICKETS,
      ticketGroupBy.TICKETS_PER_CUSTOMER,
      ticketGroupBy.TICKETS_PER_PRIORITY,
      ticketGroupBy.TICKETS_PER_CHANNEL,
      ticketGroupBy.TICKETS_PER_PROCESS
    ],
    groupBy
  );

  const isFieldGrouping2 = _.includes(
    [
      ticketGroupBy.MY_GROUP_TICKETS_2,
      ticketGroupBy.TICKETS_PER_CUSTOMER_2,
      ticketGroupBy.TICKETS_PER_PRIORITY_2,
      ticketGroupBy.TICKETS_PER_CHANNEL_2,
      ticketGroupBy.TICKETS_PER_PROCESS_2
    ],
    groupBy
  );

  //what group type
  let selectedGroupType = isFieldGrouping ? GroupType.ROWSPAN : isFieldGrouping2 ? GroupType.ROWGROUP : '';
  let groupKeyName = '';
  switch (groupBy) {
    case ticketGroupBy.MY_GROUP_TICKETS:
    case ticketGroupBy.MY_GROUP_TICKETS_2:
      groupKeyName = keyNames.KEY_TICKET_ASSIGN_USER;
      break;
    case ticketGroupBy.TICKETS_PER_CUSTOMER:
    case ticketGroupBy.TICKETS_PER_CUSTOMER_2:
      groupKeyName = keyNames.KEY_TICKET_CUSTOMER;
      break;
    case ticketGroupBy.TICKETS_PER_PRIORITY:
    case ticketGroupBy.TICKETS_PER_PRIORITY_2:
      groupKeyName = keyNames.KEY_TICKET_PRIORITY;
      break;
    case ticketGroupBy.TICKETS_PER_CHANNEL:
    case ticketGroupBy.TICKETS_PER_CHANNEL_2:
      groupKeyName = keyNames.KEY_TICKET_CHANNEL;
      break;
    case ticketGroupBy.TICKETS_PER_PROCESS:
    case ticketGroupBy.TICKETS_PER_PROCESS_2:
      groupKeyName = keyNames.KEY_TICKET_PROCESS;
      break;
    default:
      // groupKeyName = keyNames.KEY_NAME_CUSTOMER_CREATED_BY;
      break;
  }

  let viewingFields: any = [];
  if (fields?.length > 0) {
    viewingFields = getViewingFields(fields, settingColumns);
  }
  // Check group by of delete
  const isDeletedGrouping = isDeleteList(groupBy);

  //actions for group by delete
  const bottomHeaderDeletedProps = {
    checkedIds: checkedIds,
    actionOnSelected: [
      // action will display when some rows was selected
      {
        value: 'restore',
        label: 'ncrm_common_btn_restore',
        color: 'primary',
        icon: <ReplayOutlined fontSize="small" />,
        onClick: (e: any) => {
          mRestoreTicket.mutate({ ids: checkedIds });
        }
      },
      {
        value: 'delete',
        label: 'ncrm_common_btn_delete',
        color: 'error',
        icon: <DeleteOutline fontSize="small" />,
        onClick: (e: any) => {
          mEmptyTicket.mutate({ ids: checkedIds });
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
          mEmptyAllTicket.mutate({});
        }
      }
    ],
    onCancel: onCancel
  };

  //get leftFilter component
  const getLeftFilterComponent = () => {
    switch (groupBy) {
      case ticketGroupBy.MY_GROUP_TICKETS:
      case ticketGroupBy.MY_GROUP_TICKETS_2:
        return UserAutoComplete;
      case ticketGroupBy.TICKETS_PER_CUSTOMER:
      case ticketGroupBy.TICKETS_PER_CUSTOMER_2:
        return CustomerAutoComplete;
      case ticketGroupBy.TICKETS_PER_PRIORITY:
      case ticketGroupBy.TICKETS_PER_PRIORITY_2:
        return PriorityAutoComplete;
      case ticketGroupBy.TICKETS_PER_CHANNEL:
      case ticketGroupBy.TICKETS_PER_CHANNEL_2:
        return ChannelAutoComplete;
      case ticketGroupBy.TICKETS_PER_PROCESS:
      case ticketGroupBy.TICKETS_PER_PROCESS_2:
        return LookUp;
    }
  };

  //get leftFilter component props
  const getLeftFilterComponentProps = () => {
    switch (groupBy) {
      case ticketGroupBy.MY_GROUP_TICKETS:
      case ticketGroupBy.MY_GROUP_TICKETS_2:
        return {
          single: false,
          showAvatar: true,
          category: keyNames.KEY_TICKET_ASSIGN_USER,
          placeholder: t('ncrm_common_assigned_rep_select_placeholder')
        };
      case ticketGroupBy.TICKETS_PER_CUSTOMER:
      case ticketGroupBy.TICKETS_PER_CUSTOMER_2:
        return {
          single: false,
          showAvatar: true,
          category: keyNames.KEY_TICKET_CUSTOMER,
          placeholder: t('ncrm_common_customer_auto_placeholder')
        };
      case ticketGroupBy.TICKETS_PER_PRIORITY:
      case ticketGroupBy.TICKETS_PER_PRIORITY_2:
        return {
          single: false,
          category: keyNames.KEY_TICKET_PRIORITY,
          placeholder: t('ncrm_common_priority_select_placeholder')
        };
      case ticketGroupBy.TICKETS_PER_CHANNEL:
      case ticketGroupBy.TICKETS_PER_CHANNEL_2:
        return {
          single: false,
          category: keyNames.KEY_TICKET_CHANNEL,
          placeholder: t('ncrm_common_channel_select_placeholder')
        };
      case ticketGroupBy.TICKETS_PER_PROCESS:
      case ticketGroupBy.TICKETS_PER_PROCESS_2:
        return {
          fetchList: useGetModuleProcesses,
          fieldValue: 'id',
          fieldLabel: 'name',
          extraParams: { module: 'MODULE_TICKET' },
          isSearch: false
        };
      default:
        return {};
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
          if (groupKeyName === keyNames.KEY_TICKET_PRIORITY) return value?.length > 0 ? value?.map((v: any) => v?.keyName).join(',') : '';
          else return value?.length > 0 ? value?.map((v: any) => v?.id).join(',') : '';
        },
        setValue: (value: string) => {
          return value ? value.split(',') : [];
          // return value ? ASSIGNED_REP_OPTIONS.find((item) => item.value == value) : null;
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
  const tableFields = viewingFields.map((_ele: any) => ({
    ..._ele,
    // enableSorting: !_ele.disableSortBy,
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
              sx: { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
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
                sx: { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
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

  //render table list
  const TableMemo = useMemo(() => {
    const listTableProps: ListTableProps = {
      rows:
        selectedGroupType === GroupType.ROWSPAN && !isDeletedGrouping
          ? getConfigRowSpannedByField(itemsListSortByName, groupKeyName, 'id') //This is filter column (number)
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
  }, [itemsList, tableColumns, checkedIds, groupBy, isFieldGrouping]);

  // const listTableProps: ListTableProps = {
  //   rows: itemsList || [],
  //   checkedIds,
  //   onRowChecked: onChecked,
  //   pagingProps,
  //   onPageChange: handlePagingChange,
  //   columns: tableColumns,
  //   onSortBy: (clName: any, isSorted: any) => {
  //     if (isSorted !== false) {
  //       let orderBy = isSorted === 'desc' ? DESC : ASC;
  //       setSort({ field: clName, orderBy: orderBy });
  //     }
  //   }
  // };

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

  //Table Group by keyName
  const renderTableGroupByKeyName = (keyName: string, keyOptionValue: string | null = null, keyOptionLabel: string | null = null) => {
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
        // data={configItemsList}
        data={
          groupBy === ticketGroupBy.MY_GROUP_TICKETS_2
            ? configItemsListGroup
            : groupBy === ticketGroupBy.TICKETS_PER_CUSTOMER_2
            ? configItemsListCustomer
            : groupBy === ticketGroupBy.TICKETS_PER_PRIORITY_2
            ? configItemsListPriority
            : groupBy === ticketGroupBy.TICKETS_PER_CHANNEL_2
            ? configItemsListChannel
            : configItemsListProcess
        }
        groupKey={keyName} //if data id object, need {value, label}
        groupKeyValue={keyOptionValue ? keyOptionValue : undefined}
        groupKeyLabel={keyOptionLabel ? keyOptionLabel : undefined}
        listTableHeaderProps={isFieldGrouping2 ? bottomHeaderProps : undefined}
        // configAccordionSummary={
        //   isFieldGrouping2
        //     ? groupBy === ticketGroupBy.MY_GROUP_TICKETS_2
        //       ? optionsGroupAssigned
        //       : groupBy === ticketGroupBy.TICKETS_PER_CUSTOMER_2
        //       ? optionsGroupCustomer
        //       : optionsGroupPriority
        //     : undefined
        // }
      />
    );
  };

  const getTypeBody = (listType: ListType) => {
    switch (listType) {
      case ListType.GRID:
      case ListType.SPLIT:
        return (
          <ListGrid {...listGridProps}>
            {(props) => {
              return <ListGridCard iSplitMode={listType === ListType.SPLIT} {...props} category={category} />;
            }}
          </ListGrid>
        );
      default:
        return selectedGroupType === GroupType.ROWGROUP && !isDeletedGrouping
          ? renderTableGroupByKeyName(groupKeyName)
          : selectedGroupType === GroupType.ROWGROUP && isDeletedGrouping
          ? renderTableGroupByKeyName(groupKeyName, 'id', 'name')
          : TableMemo;
    }
  };

  const ListBodyMemo = useMemo(() => {
    if (isMobile) return getTypeBody(ListType.GRID);
    else return getTypeBody(listType);
  }, [itemsList, isSplitMode, fields, viewingFields, listType, checkedIds, isMobile]);

  return <ListBody>{ListBodyMemo}</ListBody>;
};

export default Body;
