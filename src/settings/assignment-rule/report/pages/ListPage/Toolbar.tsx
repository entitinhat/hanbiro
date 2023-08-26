import React, { useMemo, useState } from 'react';

//third-party

import { useNavigate } from 'react-router-dom';

//project import
import { pageDataByMenuAtom } from '@base/store/atoms';
import ListToolbar from '@base/components/@hanbiro/List/ListToolbar';
import {
  MENU_DESK,
  MENU_DESK_TICKET,
  MENU_SETTING_ASSIGNMENT_REPORT,
  MENU_SETTING_ASSIGNMENT_RULE,
  MENU_SETTING_CTA
} from '@base/config/menus';
import { SETTING_ASSIGNMENT_RULE } from '@base/config/routeMenus';
import { ListType } from '@base/types/app';
import { WriteOption } from '@base/types/common';
//by module
import WritePage from '@settings/assignment-rule/rule/pages/WritePage';
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
  return (
    <>
      <ListToolbar
        menu={MENU_SETTING_ASSIGNMENT_REPORT}
        isSmall={isSplitMode}
        onRefresh={onRefresh}
        onDelete={() => {}}
        categoryMenuProps={{
          items: SETTING_ASSIGNMENT_RULE,
          selected: category ?? '',
          onClick: (category: string) => {
            navigate(`/settings/${category.replace('_', '/')}`);
          }
        }}
        moreMenuProps={moreMenuProps}
      />
    </>
  );
};

export default Toolbar;
