import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListToolbar from '@base/components/@hanbiro/List/ListToolbar';
import {MENU_ANALYTIC, MENU_ANALYTIC_SUS_LOG} from '@base/config/menus';
import { ANALYTIC_MENU } from '@base/config/routeMenus';
import { ListType } from '@base/types/app';
import { DropdownProps } from '@base/components/@hanbiro/Dropdown';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';

interface ToolbarProps {
  isSplitMode: boolean;
  category: string;
  onRefresh: () => void;
  moreMenuProps?: DropdownProps;
}

const Toolbar = (props: ToolbarProps) => {
  const navigate = useNavigate();
  const { isSplitMode, category, onRefresh, moreMenuProps } = props;
  const { listType, setListType } = useListPageSettings(category);
  return (
    <>
      <ListToolbar
        menu={MENU_ANALYTIC_SUS_LOG}
        isSmall={isSplitMode}
        onRefresh={onRefresh}
        categoryMenuProps={{
          items: ANALYTIC_MENU,
          selected: 'sus-log',
          onClick: (category: string) => {
            navigate(`/${MENU_ANALYTIC}/${category}`);
          },
          mainIconProps: {
            icon: 'Link',
            iconType: 'material',
            fontSize: 'small'
          }
        }}
        listTypeMenuProps={{
          allowTypes: [ListType.GRID, ListType.LIST, ListType.SPLIT],
          selectedType: listType ?? ListType.LIST,
          onChange: (type: ListType) => {
            setListType(type);
          }
        }}
        moreMenuProps={moreMenuProps}
      />
    </>
  );
};

export default Toolbar;
