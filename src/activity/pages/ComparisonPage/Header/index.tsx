import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { EDateRangeType, LabelValue } from '@base/types/app';
import ColumnsSetting, { ColumnsSettingProps } from '@base/components/@hanbiro/List/ListHeader/ColumnsSetting';
import DropdownFilterBy from '@base/components/@hanbiro/DropdownFilterBy';
import { filterOptions, MENU_CATEGORY_COMPARISON, periodOptions } from '@activity/config/comparison';
import PeriodFilter from '@activity/pages/ComparisonPage/Header/PeriodFilter';
import { GroupTreeAutocomplete } from '@base/components/@hanbiro/DirectoryGroup';
import { useTranslation } from 'react-i18next';
import Dropdown from '@base/components/@hanbiro/Dropdown';
import useListPageSetting from '@base/hooks/user-setting/useListPageSetting';
import { groupByComparisionOptions } from '@activity/config/list-field/options';
interface FilterData {
  [key: string]: any;
}

interface HeaderProps {
  onChange?: (v: any) => void;
  columnsSettingProps: ColumnsSettingProps;
}

const Header = (props: HeaderProps) => {
  const [filterData, setFilterData] = useState<FilterData>({});
  const { onChange, columnsSettingProps } = props;

  const { filterValues, setFilter, searchValues, setSearch, listType, sort, setSort } = useListPageSetting(MENU_CATEGORY_COMPARISON);
  const { t } = useTranslation();

  const onFilterDataChanged = (v: any, k: string) => {
    let newFilterData: FilterData = { ...filterData };

    if (k === 'period') {
      delete newFilterData?.period;
      newFilterData.period = {
        condition: 'AND',
        criteria: [
          { value: v?.startDate, operator: '>=' },
          { value: v?.endDate, operator: '<=' }
        ]
      };
    }

    if (k === 'lastPeriod') {
      delete newFilterData?.lastPeriod;
      newFilterData.lastPeriod = {
        condition: 'AND',
        criteria: [
          { value: v?.startDate, operator: '>=' },
          { value: v?.endDate, operator: '<=' }
        ]
      };
    }

    if (k === 'groupIds') {
      delete newFilterData?.groupIds;
      newFilterData.groupIds = {
        value: v?.length > 0 ? v.join(',') : '',
        operator: '='
      };
    }

    onChange && onChange(newFilterData);
    setFilterData((prev) => {
      return { ...prev, ...newFilterData };
    });
  };

  const handleGroupByChange = (item: LabelValue) => {
    setFilter({ ...filterValues, groupBy: item.value });
  };

  // useEffect(() => {
  //   onChange && onChange(filterData);
  // }, [filterData]);

  const filterByProps = {
    items: filterOptions,
    onChange: (item: any) => {
      /*console.log(item);
      if(item?.value === 'groupIds' && item?.data){
        onFilterDataChanged(item?.data, item?.value)
      }*/
    },
    selected: []
  };

  let groupByTitle = 'ncrm_common_group_by';
  const groupByProps: any = {
    items: groupByComparisionOptions,
    onChange: handleGroupByChange,
    selected: groupByComparisionOptions.find((_ele: any) => _ele.value === filterValues?.groupBy) || groupByComparisionOptions[0]
  };
  if (groupByProps?.selected) {
    groupByTitle = groupByProps.selected.label;
  }

  return (
    <Box
      sx={{
        position: 'relative',
        px: 2,
        display: 'flex',
        alignItems: 'center',
        height: 55
      }}
    >
      <Dropdown {...groupByProps} title={groupByTitle} placement={'bottom-start'} disabledValues={[]} />
      <PeriodFilter
        showLabel={false}
        defaultSelected={EDateRangeType.DATE_RANGE_TODAY}
        options={periodOptions}
        label={t('ncrm_activity_period_of') as string}
        onChange={(data: any) => onFilterDataChanged(data, 'period')}
      />
      <PeriodFilter
        defaultSelected={EDateRangeType.DATE_RANGE_YESTERDAY}
        options={periodOptions}
        label={t('ncrm_activity_compare_with') as string}
        onChange={(data: any) => onFilterDataChanged(data, 'lastPeriod')}
      />
      {/* <DropdownFilterBy title={'ncrm_activity_filter_by'} placement={'bottom-start'} {...filterByProps} /> */}

      {/* <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          ml: 'auto'
        }}
      >
        {!!columnsSettingProps?.columns?.length && <ColumnsSetting {...columnsSettingProps} />}
      </Box> */}
    </Box>
  );
};

export default Header;
