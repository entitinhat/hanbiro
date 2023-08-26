import React, { useState, useEffect } from 'react';

//third-party
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

//material
import { Box, OutlinedInput, useMediaQuery, Typography, Divider, Stack, Tooltip, InputAdornment } from '@mui/material';
import { Search, Sync, MoreHoriz, CloseOutlined } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

//project
import Dropdown, { DropdownProps } from '@base/components/@hanbiro/Dropdown';
import DropdownDateBy from '@base/components/@hanbiro/DropdownDateBy';
import DropdownFilterBy from '@base/components/@hanbiro/DropdownFilterBy';
import AllChecking, { AllCheckingProps } from '@base/components/@hanbiro/List/ListHeader/AllChecking';
import { LabelValue, ListType } from '@base/types/app';
import { SortInput } from '@base/types/common';
import useDevice from '@base/hooks/useDevice';

//local
import ColumnsSetting, { ColumnsSettingProps } from './ColumnsSetting';
import DropdownSortBy from '../../DropdownSortBy';
import BottomHeader from '../ListTable/ListTableHeader';

export interface SortByProps {
  items?: LabelValue[];
  selected: SortInput;
  onChange?: (val: any) => void;
}

interface ListHeaderProps {
  isSmall?: boolean;
  listType?: ListType;
  onRefresh?: () => void;
  moreMenuProps?: DropdownProps;
  columnsSettingProps?: ColumnsSettingProps;
  groupByProps?: any;
  dateByProps?: any;
  filterByProps?: any;
  searchByProps?: any;
  sortByProps?: SortByProps;
  allCheckingProps?: AllCheckingProps;
  onChange?: (val: string) => void;
  listTableHeaderProps?: any;
  totalItem?: number;
}

const ListHeader = (props: ListHeaderProps) => {
  const {
    listType,
    onRefresh,
    moreMenuProps,
    columnsSettingProps = null,
    groupByProps,
    dateByProps,
    filterByProps,
    searchByProps,
    sortByProps,
    allCheckingProps,
    listTableHeaderProps,
    totalItem
  } = props;

  //hooks
  const theme = useTheme();
  const { t } = useTranslation();
  const { isMobile } = useDevice();

  //state
  const isSmall = props?.isSmall || isMobile;
  const [searchText, setSearchText] = useState('');

  let groupByTitle = 'ncrm_common_group_by';
  if (groupByProps?.selected) {
    groupByTitle = groupByProps.selected.label;
  }

  //init search text
  useEffect(() => {
    if (searchByProps?.value) {
      setSearchText(searchByProps.value);
    }
  }, [searchByProps]);

  //dateby selected values
  const getDateByTitle = () => {
    let dateByTitle = t('ncrm_common_dateby');
    if (dateByProps?.selected?.label) {
      return (
        <Stack direction="row" spacing={1}>
          <Typography variant="h6">{` ${t(dateByProps.selected.label)} :`}</Typography>
          {dateByProps.selected?.extra && (
            <Typography sx={{ fontWeight: 'bold' }} variant="h6">
              {t(
                dateByProps.selected?.extra?.value === 'custom'
                  ? dateByProps?.selected?.data?.start?.slice(0, 10) + ' ~ ' + dateByProps?.selected?.data?.end?.slice(0, 10)
                  : dateByProps?.selected?.extra?.label
              )}
            </Typography>
          )}
        </Stack>
      );
    } else {
      return (
        <Stack direction="row" spacing={1}>
          {/* <Typography variant="h6">{dateByTitle}</Typography> */}
          <Typography
            // sx={{ fontWeight: 'bold' }}
            variant="h6"
          >
            {t('ncrm_common_dateby_all')}
          </Typography>
        </Stack>
      );
    }
  };

  //filter selected values
  const getFilterByTitle = () => {
    let title = t('ncrm_common_filterby');
    if (filterByProps?.selected?.length) {
      return [title, '(', filterByProps.selected.length, ')'].join(' ');
    } else {
      return title;
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let value = e.target.value;
    setSearchText(value);
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLDivElement> | undefined) => {
    if (event?.key !== 'Enter') {
      return;
    }
    const { onChange } = searchByProps;
    onChange && onChange(searchText.trim());
  };

  //console.log('%c...moreMenuProps...', 'color: green', moreMenuProps);
  //full screen
  const renderLargeHeader = () => {
    return (
      <>
        <Box
          sx={{
            position: 'relative',
            px: 2,
            paddingBottom: 1.5,
            display: 'flex',
            alignItems: 'center',
            minHeight: 55
          }}
        >
          {allCheckingProps && (
            <>
              <AllChecking sx={{ p: 0, mr: 1.2 }} {...allCheckingProps} />
              <Divider orientation="vertical" sx={{ height: 15 }} />
            </>
          )}
          {sortByProps && totalItem && (
            <Stack direction="row" spacing={0.5} sx={{ ml: 1 }}>
              <Typography color="inherit">{`${t(`ncrm_common_toltal`)} :${totalItem}`}</Typography>
            </Stack>
          )}
          {groupByProps && (listType === ListType.LIST || listType === ListType.KANBAN) && (
            <Dropdown
              title={groupByTitle}
              placement={'bottom-start'}
              disabledValues={groupByProps?.selected ? [groupByProps?.selected?.value] : []}
              {...groupByProps}
            />
          )}
          {dateByProps && <DropdownDateBy title={getDateByTitle()} placement={'bottom-start'} {...dateByProps} />}
          {filterByProps && filterByProps?.items?.length ? (
            <DropdownFilterBy isSmall={isSmall} title={getFilterByTitle()} placement={'bottom-start'} {...filterByProps} />
          ) : null}
          {sortByProps && <DropdownSortBy placement={'bottom-start'} {...sortByProps} />}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              ml: 'auto'
            }}
          >
            {searchByProps && (
              <OutlinedInput
                fullWidth
                size={'small'}
                onChange={handleTextChange}
                value={searchText}
                onKeyPress={handleEnter}
                placeholder={t('ncrm_common_search_placeholder') as string}
                endAdornment={
                  searchText != '' ? (
                    <CloseOutlined fontSize="small" onClick={() => setSearchText('')} sx={{ cursor: 'pointer' }} />
                  ) : (
                    <Search fontSize="small" />
                  )
                }
                sx={{
                  pr: 1,
                  '&.MuiInputBase-inputAdornedEnd': {}
                }}
              />
            )}
            {columnsSettingProps && <ColumnsSetting {...columnsSettingProps} />}
          </Box>
        </Box>
        {listTableHeaderProps && <BottomHeader {...listTableHeaderProps} />}
      </>
    );
  };

  //small screen
  const renderSmallHeader = () => {
    return (
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          minHeight: 55,
          justifyContent: allCheckingProps ? 'space-between' : 'flex-end',
          px: 2,
          paddingBottom: 1.5,
          bgcolor: theme.palette.background.default
        }}
      >
        {searchText === '' && (
          <>
            {allCheckingProps && <AllChecking type="button" label={`ncrm_common_check_all`} sx={{ ml: 1 }} {...allCheckingProps} />}
            <Stack direction="row" spacing={1}>
              {groupByProps && (
                <Dropdown
                  title={groupByTitle}
                  placement={'bottom-end'}
                  disabledValues={groupByProps?.selected ? [groupByProps?.selected?.value] : []}
                  {...groupByProps}
                />
              )}
              {filterByProps && <DropdownFilterBy title={getFilterByTitle()} placement={'bottom-end'} {...filterByProps} />}
              {!isMobile && moreMenuProps && <Dropdown icon={<MoreHoriz />} {...moreMenuProps} />}
            </Stack>
          </>
        )}
      </Box>
    );
  };

  return <>{isSmall || isMobile ? renderSmallHeader() : renderLargeHeader()}</>;
};

export default ListHeader;
