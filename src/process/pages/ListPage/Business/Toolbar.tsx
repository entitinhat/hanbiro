import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { DropdownProps } from '@base/components/@hanbiro/Dropdown';
import ListToolbar from '@base/components/@hanbiro/List/ListToolbar';
import { MENU_PROCESS } from '@base/config/menus';
import { PROCESS_MENU } from '@base/config/routeMenus';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { ListType } from '@base/types/app';
import { Add } from '@mui/icons-material';
import { processOpenAtom } from '@process/store/atoms/process';
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
  const navigate = useNavigate();
  const { isSplitMode, category, onRefresh, onDelete, moreMenuProps } = props;
  const setProcessOpen = useSetRecoilState(processOpenAtom);
  const pageDataKey = `${MENU_PROCESS}_${category}`;
  const { listType, setListType } = useListPageSettings(pageDataKey);
  const handelChangeListType = (nType: ListType) => {
    setListType(nType);
  };
  const { t } = useTranslation()

  return (
    <>
      <ListToolbar
        menu={MENU_PROCESS}
        isSmall={isSplitMode}
        onRefresh={onRefresh}
        onDelete={onDelete}
        categoryMenuProps={{
          items: PROCESS_MENU,
          selected: category ?? '',
          onClick: (category: string) => {
            navigate(`/${MENU_PROCESS}/${category}`);
          }
        }}
        addingMenuProps={{
          icon: <Add />,
          label: t('ncrm_common_btn_new') as string,
          onClick: () => {
            setProcessOpen({ open: true });
          }
        }}
        listTypeMenuProps={{
          allowTypes: [ListType.GRID, ListType.LIST, ListType.SPLIT],
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
