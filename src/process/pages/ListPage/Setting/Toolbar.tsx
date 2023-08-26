import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { DropdownProps } from '@base/components/@hanbiro/Dropdown';
import { FormIcon } from '@base/components/@hanbiro/FormIcon';
import ListToolbar from '@base/components/@hanbiro/List/ListToolbar';
import { MENU_PROCESS } from '@base/config/menus';
import { PROCESS_MENU } from '@base/config/routeMenus';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { ListType } from '@base/types/app';
import { settingOpenAtom } from '@process/store/atoms/setting';
import { ActionProperty, SettingType } from '@process/types/settings';

import { getSidebarSize, SettingTabs } from './Helper';

interface ToolbarProps {
  isSplitMode: boolean;
  category: string;
  onRefresh?: () => void;
  onDelete?: () => void;
  moreMenuProps?: DropdownProps;
}

const Toolbar = (props: ToolbarProps) => {
  console.log('list toolbar');
  const navigate = useNavigate();
  const { isSplitMode, category, onRefresh, moreMenuProps } = props;
  const setSettingOpen = useSetRecoilState(settingOpenAtom);
  const pageDataKey = `${MENU_PROCESS}_${category}`;
  const { listType, setListType } = useListPageSettings(pageDataKey);
  const handelChangeListType = (nType: ListType) => {
    setListType(nType);
  };

  const addOptions = SettingTabs.map((v: ActionProperty) => {
    return {
      label: v.label,
      value: v.value,
      icon: <FormIcon icon={v.icon} iconType={v.iconType} />
    };
  });

  return (
    <>
      <ListToolbar
        menu={MENU_PROCESS}
        onRefresh={onRefresh}
        isSmall={isSplitMode}
        categoryMenuProps={{
          items: PROCESS_MENU,
          selected: category ?? '',
          onClick: (category: string) => {
            navigate(`/${MENU_PROCESS}/${category}`);
          }
        }}
        addingMenuProps={{
          items: addOptions,
          onClick: (item: string) => {
            const type = item as SettingType;
            setSettingOpen({ open: true, type: type, size: getSidebarSize(type) });
          }
        }}
        listTypeMenuProps={{
          allowTypes: [ListType.GRID, ListType.LIST],
          selectedType: listType ?? ListType.LIST,
          onChange: (type: ListType) => {
            handelChangeListType(type);
          }
        }}
        moreMenuProps={moreMenuProps}
      />
    </>
  );
};

export default Toolbar;
