import _ from 'lodash';
import React, { useCallback, useMemo } from 'react';
import { useRecoilState } from 'recoil';

import { ListBody } from '@base/components/@hanbiro/List';
import ListGrid, { ListGridProps } from '@base/components/@hanbiro/List/ListGrid';
import ListTable, { ListTableProps } from '@base/components/@hanbiro/List/ListTable';
import { makeTable8Columns } from '@base/components/@hanbiro/ReactTable8/Helper';
import { ASC, DESC } from '@base/config/constant';
import { MENU_PROCESS } from '@base/config/menus';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { ListType } from '@base/types/app';
import { useMediaQuery, useTheme } from '@mui/material';
import {
    KEY_NAME_SETTING_ACTION_CREATED_AT, KEY_NAME_SETTING_ACTION_MODE,
    KEY_NAME_SETTING_ATTRIBUTE_CREATED_AT, KEY_NAME_SETTING_ATTRIBUTE_MODE,
    KEY_NAME_SETTING_CRITERIA_CREATED_AT, KEY_NAME_SETTING_CRITERIA_MODE,
    KEY_NAME_SETTING_TRIGGER_CREATED_AT, KEY_NAME_SETTING_TRIGGER_MODE
} from '@process/config/keyNames';
import { settingOpenAtom } from '@process/store/atoms/setting';
import { DefinedItem, SettingType } from '@process/types/settings';
import { ColumnDef } from '@tanstack/react-table';

import { columnRenderRemap, getSidebarSize } from './Helper';

interface BodyProps {
  category: string;
  fields: any[];
  isSplitMode: boolean;
  itemsList: DefinedItem[];
  selectedTab: SettingType;
}

const Body = (props: BodyProps) => {
  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));

  const { isSplitMode, category, fields, itemsList, selectedTab } = props;
  const [settingOpen, setSettingOpen] = useRecoilState(settingOpenAtom);

  const pageDataKey = `${MENU_PROCESS}_${category}_${selectedTab}`;
  const { listType: cListType, setSort } = useListPageSettings(pageDataKey);
  const listType = matchesSm ? ListType.GRID : cListType;

  const EditFn = useCallback(
    (data: DefinedItem) => {
      console.log('editfn', data);
      setSettingOpen({ open: true, type: selectedTab, size: getSidebarSize(selectedTab), data: data });
    },
    [selectedTab]
  );

  const DeleteFn = useCallback(
    (id: string) => {
      console.log(id);
    },
    [selectedTab]
  );

  const getMapColumns = () => {
    return columnRenderRemap(selectedTab, EditFn, DeleteFn);
  };

  const tableFields = useMemo(() => {
    let newFields: any[] = [];
    fields.forEach((_ele: any) => {
      if (
        settingOpen.open &&
        _.includes(
          [
            KEY_NAME_SETTING_ACTION_CREATED_AT,
            KEY_NAME_SETTING_ACTION_MODE,
            KEY_NAME_SETTING_CRITERIA_CREATED_AT,
            KEY_NAME_SETTING_CRITERIA_MODE,
            KEY_NAME_SETTING_TRIGGER_CREATED_AT,
            KEY_NAME_SETTING_TRIGGER_MODE,
            KEY_NAME_SETTING_ATTRIBUTE_CREATED_AT,
            KEY_NAME_SETTING_ATTRIBUTE_MODE
          ],
          _ele.keyName
        )
      )
        return;

      newFields.push({
        ..._ele,
        enableSorting: true,
        width: _ele.keyName === 'name' ? '30% !important' : 'auto'
      });
    });
    return newFields;
  }, [fields, settingOpen.open]);

  const tableColumns = useMemo<ColumnDef<any>[]>(() => makeTable8Columns(tableFields, getMapColumns(), {}, []), [tableFields]);

  const getTypeBody = (listType: ListType) => {
    switch (listType) {
      case ListType.GRID:
      case ListType.SPLIT:
        const listGridProps: ListGridProps = {
          rows: itemsList || [],
          columns: fields,
          columnRenderRemap: getMapColumns(),
          isSmall: isSplitMode,
          children: () => <></>
        };
        return (
          <ListGrid {...listGridProps}>
            {(props) => {
              // return <ListGridCard {...props} category={category} />;
              return <></>;
            }}
          </ListGrid>
        );
      default:
        const listTableProps: ListTableProps = {
          rows: itemsList || [],
          columns: tableColumns,
          onSortBy: (clName: any, isSorted: any) => {
            if (isSorted !== false) {
              let orderBy = isSorted === 'desc' ? DESC : ASC;
              setSort({ field: clName, orderBy: orderBy });
            }
          }
        };
        return <ListTable {...listTableProps} />;
    }
  };

  const ListBodyMemo = useMemo(() => {
    return getTypeBody(listType);
  }, [itemsList, isSplitMode, fields, listType, tableColumns]);

  return <ListBody>{ListBodyMemo}</ListBody>;
};

export default Body;
