import React, { useState } from 'react';

//third-party
import { useNavigate } from 'react-router-dom';

//project
import { DropdownProps } from '@base/components/@hanbiro/Dropdown';
import ListToolbar from '@base/components/@hanbiro/List/ListToolbar';
import { MENU_SETTING_SATISFACTION_SURVEY } from '@base/config/menus';
import { DIGITAL_SATISFACTION_MENUS } from '@base/config/routeMenus';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { LabelValueIcon } from '@base/types/app';
import { WriteOption } from '@base/types/common';

//menu
import WritePage from '@settings/digital/satisfaction/pages/WritePage';
import { TOOLBAR_MORE_OPTIONS } from '@settings/digital/satisfaction/config/constants';

interface ToolbarProps {
  isSplitMode: boolean;
  category: string;
  onRefresh: () => void;
  onDelete?: () => void;
  moreMenuProps?: DropdownProps;
}

const Toolbar = (props: ToolbarProps) => {
  const { isSplitMode, category, onRefresh, onDelete, moreMenuProps } = props;
  //state
  const [writeOption, setWriteOption] = useState<WriteOption>({ writeType: '', isOpenWrite: false });
  const navigate = useNavigate();
  const pageDataKey = MENU_SETTING_SATISFACTION_SURVEY; //`${}_${category}`;
  const { listType, setListType } = useListPageSettings(pageDataKey);

  //more event change
  const handleMoreChange = (keyEvent: string) => {
    switch (keyEvent) {
      case 'import':
        break;
    }
  };

  return (
    <>
      <ListToolbar
        menu={'satisfaction'}
        isSmall={isSplitMode}
        onRefresh={onRefresh}
        onDelete={onDelete}
        categoryMenuProps={{
          items: DIGITAL_SATISFACTION_MENUS,
          selected: category,
          onClick: (category: string) => {
            navigate(`/settings/digital/satisfaction`);
          }
        }}
        addingMenuProps={{
          //items: addOptions,
          onClick: (addKey: string) => {
            setWriteOption({
              writeType: 'satisfaction',
              isOpenWrite: true
            });
          }
        }}
        // listTypeMenuProps={{
        //   allowTypes: [ListType.GRID, ListType.LIST, ListType.SPLIT],
        //   selectedType: listType ?? ListType.LIST,
        //   onChange: (type: ListType) => {
        //     setListType(type);
        //   }
        // }}
        moreMenuProps={{
          items: TOOLBAR_MORE_OPTIONS,
          onChange: (key: LabelValueIcon) => handleMoreChange(key.value)
        }}
      />
      <WritePage
        isOpen={writeOption.isOpenWrite}
        onClose={() => setWriteOption({ ...writeOption, isOpenWrite: false })}
        menuApi={pageDataKey}
        onReload={onRefresh}
      />
    </>
  );
};

export default Toolbar;
