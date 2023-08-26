import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ListToolbar from '@base/components/@hanbiro/List/ListToolbar';
import { MENU_PRODUCT } from '@base/config/menus';
import { PRODUCT_MENUS } from '@base/config/routeMenus';
import { WriteOption } from '@base/types/common';

interface ToolbarProps {
  isSplitMode: boolean;
  category: string;
  // onRefresh: () => void;
  // onDelete?: () => void;
}

const Toolbar = (props: ToolbarProps) => {
  const navigate = useNavigate();

  const { isSplitMode, category } = props;

  // state
  const [writeOption, setWriteOption] = useState<WriteOption>({ writeType: category, isOpenWrite: false });

  return (
    <>
      <ListToolbar
        menu={category}
        isSmall={isSplitMode}
        // onRefresh={onRefresh}
        // onDelete={onDelete}
        categoryMenuProps={{
          items: PRODUCT_MENUS,
          selected: category ?? '',
          onClick: (category: string) => {
            navigate(`/${MENU_PRODUCT}/${category}`);
          }
        }}
      />
    </>
  );
};

export default Toolbar;
