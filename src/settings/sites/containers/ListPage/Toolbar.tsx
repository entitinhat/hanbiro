import React, { useMemo, useState } from 'react';

//third-party

import { useNavigate } from 'react-router-dom';

//project import

import ListToolbar from '@base/components/@hanbiro/List/ListToolbar';
import { MENU_SETTING_ASSIGNMENT_RULE } from '@base/config/menus';

import { ListType } from '@base/types/app';
import { WriteOption } from '@base/types/common';
//by module
import { DropdownProps } from '@base/components/@hanbiro/Dropdown';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import WritePage from '../WritePage';

interface ToolbarProps {
  isSplitMode: boolean;
  category: string;
  onRefresh: () => void;
  moreMenuProps?: DropdownProps;
  menu?: string;
  categoryMenuProps?: any;

  //This for Write Page
  title?: string;
  group: string;
}

const Toolbar = (props: ToolbarProps) => {
  const { isSplitMode, category, onRefresh, moreMenuProps, menu, categoryMenuProps, title, group } = props;
  //state
  const [writeOption, setWriteOption] = useState<WriteOption>({ writeType: '', isOpenWrite: false });
  const { listType, setListType } = useListPageSettings(category);

  return (
    <>
      <ListToolbar
        menu={menu}
        categoryMenuProps={categoryMenuProps}
        isSmall={isSplitMode}
        onRefresh={onRefresh}
        onDelete={() => {}}
        /*addingMenuProps={{
          items: [],
          onClick: (item: string) => {
            setWriteOption({
              //...writeOption,
              //writePage: 'list',
              writeType: MENU_SETTING_ASSIGNMENT_RULE,
              isOpenWrite: true
            });
          }
        }}*/
        listTypeMenuProps={{
          allowTypes: [ListType.GRID, ListType.LIST], //ListType.SPLIT
          selectedType: listType ?? ListType.LIST,
          onChange: (type: ListType) => {
            setListType(type);
          }
        }}
        moreMenuProps={moreMenuProps}
      />
      <WritePage
        isOpen={writeOption.isOpenWrite}
        onClose={() => setWriteOption({ ...writeOption, isOpenWrite: false })}
        title={title}
        group={group}
        //category={category}
        //type={writeOption.writeType}
        //listType={listType}
        //menuApi={writeOption.writeType !== '' ? MENU_DESK_TICKET : ''}
        onReload={onRefresh}
      />
    </>
  );
};

export default Toolbar;
