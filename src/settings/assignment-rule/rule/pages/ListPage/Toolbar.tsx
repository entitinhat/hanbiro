import React, { useMemo, useState } from 'react';

//third-party

import { useNavigate } from 'react-router-dom';

//project import
import { pageDataByMenuAtom } from '@base/store/atoms';
import ListToolbar from '@base/components/@hanbiro/List/ListToolbar';
import { MENU_DESK, MENU_DESK_TICKET, MENU_SETTING_ASSIGNMENT_RULE, MENU_SETTING_CTA } from '@base/config/menus';
import { SETTING_ASSIGNMENT_RULE } from '@base/config/routeMenus';
import { ListType } from '@base/types/app';
import { WriteOption } from '@base/types/common';
//by module
import WritePage from '@settings/assignment-rule/rule/pages/WritePage';
import { DropdownProps } from '@base/components/@hanbiro/Dropdown';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { useTranslation } from 'react-i18next';

interface ToolbarProps {
  isSplitMode: boolean;
  category: string;
  onRefresh: () => void;
  moreMenuProps?: DropdownProps;
}

const Toolbar = (props: ToolbarProps) => {
  const navigate = useNavigate();
  const { isSplitMode, category, onRefresh, moreMenuProps } = props;
  const { t } = useTranslation();
  //state
  const [writeOption, setWriteOption] = useState<WriteOption>({ writeType: '', isOpenWrite: false });
  const pagelayoutMenu = MENU_SETTING_ASSIGNMENT_RULE;

  // const [pageData, setPageData] = useRecoilState(pageDataByMenuAtom(MENU_SETTING_ASSIGNMENT_RULE));
  const { listType, setListType } = useListPageSettings(category);
  // console.log('>>>>>>>>>> Toolbar category', category);
  return (
    <>
      <ListToolbar
        menu={MENU_SETTING_ASSIGNMENT_RULE}
        isSmall={isSplitMode}
        onRefresh={onRefresh}
        onDelete={() => { }}
        categoryMenuProps={{
          items: SETTING_ASSIGNMENT_RULE,
          selected: category ?? '',
          onClick: (category: string) => {
            navigate(`/settings/${category.replace('_', '/')}`);
          }
        }}
        addingMenuProps={{
          items: [],
          label: t('ncrm_common_btn_new') as string,
          onClick: (item: string) => {
            setWriteOption({
              //...writeOption,
              //writePage: 'list',
              writeType: pagelayoutMenu,
              isOpenWrite: true
            });
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
      {writeOption.isOpenWrite && (
        <WritePage
          isOpen={writeOption.isOpenWrite}
          onClose={() => setWriteOption({ ...writeOption, isOpenWrite: false })}
          category={category}
          type={writeOption.writeType}
          listType={listType}
          menuApi={writeOption.writeType !== '' ? writeOption.writeType : ''}
          onReload={onRefresh}
        />
      )}
    </>
  );
};

export default Toolbar;