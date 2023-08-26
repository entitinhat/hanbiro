import React, {ReactNode} from 'react';
import {MENU_ANALYTIC} from "@base/config/menus";
import {ANALYTIC_MENU} from "@base/config/routeMenus";
import {ListToolbar} from "@base/components/@hanbiro/List";
import {useNavigate} from "react-router-dom";
import {CATEGORY_DASHBOARD} from "@analytic/main/config";

interface ToolbarProps {
  selected?: string;
  moreAction?: () => ReactNode;
}

const Toolbar = ({selected, moreAction}: ToolbarProps) => {
  const navigate = useNavigate();

  return (
    <ListToolbar
      menu={CATEGORY_DASHBOARD}
      categoryMenuProps={{
        items: ANALYTIC_MENU,
        selected: selected,
        onClick: (category: string) => {
          navigate(`/${MENU_ANALYTIC}/${category}`);
        }
      }}
      moreAction={moreAction}
    />
  );
};

export default Toolbar;