import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { DropdownProps } from '@base/components/@hanbiro/Dropdown';
import ListToolbar from '@base/components/@hanbiro/List/ListToolbar';
import { MENU_PROJECT } from '@base/config/menus';
import { PROJECT_MENU } from '@base/config/routeMenus';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { ListType } from '@base/types/app';
import { WriteOption } from '@base/types/common';
import WritePage from '@project/pages/WritePage/Task';
import { Add } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

interface ToolbarProps {
  isSplitMode: boolean;
  category: string;
  onRefresh: () => void;
  onDelete?: () => void;
  moreMenuProps?: DropdownProps;
}

const Toolbar = (props: ToolbarProps) => {
  console.log('list toolbar');
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isSplitMode, category, onRefresh, onDelete, moreMenuProps } = props;
  const [writeOption, setWriteOption] = useState<WriteOption>({ writeType: '', isOpenWrite: false });
  const pagelayoutMenu = `${MENU_PROJECT}_${writeOption.writeType}`;
  const pageDataKey = `${MENU_PROJECT}_${category}`;
  const { listType, setListType } = useListPageSettings(pageDataKey);
  const handelChangeListType = (nType: ListType) => {
    setListType(nType);
  };

  return (
    <>
      <ListToolbar
        menu={MENU_PROJECT}
        isSmall={isSplitMode}
        onRefresh={onRefresh}
        onDelete={onDelete}
        categoryMenuProps={{
          items: PROJECT_MENU.map((_item) => ({ ..._item, label: t(_item.label) })),
          selected: category ?? '',
          onClick: (category: string) => {
            navigate(`/${MENU_PROJECT}/${category}`);
          }
        }}
        addingMenuProps={{
          icon: <Add />,
          label: 'ncrm_common_btn_new',
          onClick: (item: string) => {
            setWriteOption({
              writeType: item,
              isOpenWrite: true
            });
          }
        }}
        listTypeMenuProps={{
          allowTypes: [ListType.GRID, ListType.LIST, ListType.SPLIT, ListType.CALENDAR, ListType.KANBAN],
          selectedType: listType ?? ListType.LIST,
          onChange: (type: ListType) => {
            handelChangeListType(type);
          }
        }}
        moreMenuProps={moreMenuProps}
      />
      <WritePage
        isOpen={writeOption.isOpenWrite}
        onClose={() => setWriteOption({ ...writeOption, isOpenWrite: false })}
        onReload={onRefresh}
      />
    </>
  );
};

export default Toolbar;
