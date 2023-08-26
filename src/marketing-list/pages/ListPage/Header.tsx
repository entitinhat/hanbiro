import React, { useEffect } from 'react';

//material
import { Box } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ReplayIcon from '@mui/icons-material/Replay';

//project
import ListHeader from '@base/components/@hanbiro/List/ListHeader';
import { DropdownProps } from '@base/components/@hanbiro/Dropdown';
import { LabelValue, ListType } from '@base/types/app';
import { ColumnsSettingProps } from '@base/components/@hanbiro/List/ListHeader/ColumnsSetting';
import { AllCheckingProps } from '@base/components/@hanbiro/List/ListHeader/AllChecking';
import useListPageSetting from '@base/hooks/user-setting/useListPageSetting';
import { MENU_CUSTOMER } from '@base/config/menus';
import { FilterByOption, SortInput } from '@base/types/common';

//menu
import { groupByCategoryOptions, dateByOptions, filterByCategoryOptions, sortByOptions } from '@marketing-list/config/list-field';
import { CUSTOMER_CATEGORY_ALL, CUSTOMER_CATEGORY_MARKETING_LIST } from '@marketing-list/config/constants';
import * as keyNames from '@marketing-list/config/keyNames';
import { useTranslation } from 'react-i18next';
import { isDeleteList } from './Helper';
import * as components from '@marketing-list/config/write-field/components';

interface HeaderProps {
  isSplitMode: boolean;
  category: string; //'all' | 'account' | 'contact';
  moreMenuProps?: DropdownProps;
  columnsSettingProps?: ColumnsSettingProps;
  allCheckingProps?: AllCheckingProps;
  onRefresh: () => void;
  onChange?: (v: any) => void;
  groupBy: string;
  checkedIds?: any;
}

const Header = (props: HeaderProps) => {
  const { isSplitMode, category, onChange, columnsSettingProps, groupBy, checkedIds, ...restProps } = props;
  const isBottomHeader = groupBy == 'myGroupMarketingList_1' || groupBy == 'marketingListperType_1' || groupBy == 'marketingListperOwner_1';
  const { t } = useTranslation();
  //hook
  const pageDataKey = `${MENU_CUSTOMER}_${category}`;
  const { filterValues, setFilter, searchValues, setSearch, listType, sort, setSort } = useListPageSetting(pageDataKey);

  //group by options by category
  const groupByOptions = groupByCategoryOptions?.[category];

  //filter by options by category
  const filterByOptions = filterByCategoryOptions[category];

  //init filter
  useEffect(() => {
    const curIdx = groupByOptions.findIndex((_ele: any) => _ele.value === filterValues?.groupBy);
    if (curIdx === -1) {
      setFilter({ ...filterValues, groupBy: groupByOptions[0].value });
    }
  }, [groupByOptions]);

  const handleGroupByChange = (value: LabelValue) => {
    //console.log('group by value', value);
    setFilter({ ...filterValues, groupBy: value.value });
  };

  const handleDateByChange = (value: LabelValue) => {
    //console.log('date by value', value);
    setFilter({ ...filterValues, dateBy: value });
  };

  const handleFilterByChange = (value: LabelValue) => {
    //console.log('filter by value', value);
    setFilter({ ...filterValues, filterBy: value });
  };

  const handleSearchTextChange = (value: string) => {
    setSearch({ [keyNames.KEY_NAME_CUSTOMER_NAME]: value });
  };

  const handleSortByChange = (value: SortInput) => {
    //console.log('...handleSortByChange...', value);
    setSort(value);
  };

  // custom options
  const cusOptions = (options: LabelValue[] | FilterByOption[]) => {
    const nOptions: LabelValue[] | FilterByOption[] = options.map((item: LabelValue | FilterByOption) => {
      return {
        ...item,
        label: t(item.label)
      };
    });
    return nOptions;
  };

  // console.log('groupByOptions: ', groupByOptions);
  // console.log('dateByOptions: ', dateByOptions);
  // console.log('filterByOptions: ', filterByOptions);
  // console.log('sortByOptions: ', sortByOptions);

  const listTableHeaderProps = {
    checkedIds: checkedIds,
    leftFilter: [
      {
        value: 'assignTo',
        component: components.UserAutoComplete,
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
    ]
    // actionOnSelected: [ // action will display when some rows was selected
    //   {
    //     value: '',
    //     label: '',
    //     onClick: (ids: any[]) => {
    //       console.log('Action', ids)
    //     }
    //   }
    // ],
    // rightAction: [ // action display on right bottom header by default
    //   {
    //     value: '',
    //     label: '',
    //     onClick: () => {
    //       console.log('onClick')
    //     }
    //   }
    // ]
  };

  const bottomHeaderDeletedProps = {
    checkedIds: checkedIds,
    leftFilter: [
      // {
      //   value: 'type',
      //   component: components.CollectionMethodSelect,
      //   componentProps: {},
      //   getValue: (componentValue: any) => {
      //     return LEAD_COLLECTION_METHOD_TYPE_OPTIONS.findIndex((v: LabelValue) => v.value == componentValue?.id) + 1;
      //   },
      //   setValue: (value: number) => {
      //     return LEAD_COLLECTION_METHOD_TYPE_OPTIONS?.[value - 1]?.value;
      //   }
      // },
    ],
    actionOnSelected: [
      // action will display when some rows was selected
      {
        value: 'restore',
        label: 'Restore',
        color: 'primary',
        icon: <ReplayIcon fontSize="small" />,
        onClick: (ids: any[]) => {
          console.log('Action', ids);
        }
      },
      {
        value: 'delete',
        label: 'Delete',
        color: 'error',
        icon: <DeleteOutlineIcon fontSize="small" />,
        onClick: (ids: any[]) => {
          console.log('Action', ids);
        }
      }
    ],
    rightAction: [
      // action display on right bottom header by default
      {
        value: 'emptyAll',
        label: 'Empty Recycle Bin',
        color: 'error',
        icon: <DeleteOutlineIcon fontSize="small" />,
        onClick: () => {
          console.log('onClick');
        }
      }
    ]
  };

  return (
    <Box>
      <ListHeader
        isSmall={isSplitMode}
        groupByProps={{
          items: cusOptions(groupByOptions),
          selected: cusOptions(groupByOptions).find((_ele: any) => _ele.value === filterValues?.groupBy) || groupByOptions[0],
          onChange: handleGroupByChange
        }}
        dateByProps={{
          items: cusOptions(dateByOptions),
          selected: filterValues?.dateBy,
          onChange: handleDateByChange
        }}
        filterByProps={{
          items: cusOptions(filterByOptions),
          selected: filterValues?.filterBy,
          onChange: handleFilterByChange
        }}
        sortByProps={
          listType === ListType.GRID
            ? {
                items: cusOptions(sortByOptions),
                selected: sort || ({ field: 'createdAt', orderBy: 2 } as SortInput),
                onChange: handleSortByChange
              }
            : undefined
        }
        searchByProps={{
          value: searchValues?.[keyNames.KEY_NAME_CUSTOMER_NAME] || '',
          onChange: handleSearchTextChange
        }}
        listTableHeaderProps={isBottomHeader ? (isDeleteList(groupBy) ? bottomHeaderDeletedProps : listTableHeaderProps) : undefined}
        {...restProps}
      />
    </Box>
  );
};

export default Header;
