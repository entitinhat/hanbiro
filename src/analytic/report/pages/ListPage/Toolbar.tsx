import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListToolbar from '@base/components/@hanbiro/List/ListToolbar';
import { MENU_ANALYTIC_REPORT, MENU_ANALYTIC } from '@base/config/menus';
import { ANALYTIC_MENU } from '@base/config/routeMenus';
import { ListType } from '@base/types/app';
import { WriteOption } from '@base/types/common';
import { DropdownProps } from '@base/components/@hanbiro/Dropdown';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import WritePage from '../WritePage';

interface ToolbarProps {
  isSplitMode: boolean;
  category: string;
  onRefresh: () => void;
  moreMenuProps?: DropdownProps;
}

const Toolbar = (props: ToolbarProps) => {
  const navigate = useNavigate();
  const { isSplitMode, category, onRefresh, moreMenuProps } = props;
  //state
  const pagelayoutMenu = MENU_ANALYTIC_REPORT;
  const [writeOption, setWriteOption] = useState<WriteOption>({ writeType: pagelayoutMenu, isOpenWrite: false });

  const { listType, setListType } = useListPageSettings(category);
  return (
    <>
      <ListToolbar
        menu={MENU_ANALYTIC_REPORT}
        isSmall={isSplitMode}
        onRefresh={onRefresh}
        categoryMenuProps={{
          items: ANALYTIC_MENU,
          selected: 'report',
          onClick: (category: string) => {
            navigate(`/${MENU_ANALYTIC}/${category}`);
          },
          mainIconProps: {
            icon: "report"
          }
        }}
        addingMenuProps={{
          items: [],
          onClick: (item: string) => {
            setWriteOption({
              //...writeOption,
              //writePage: 'list',
              writeType: MENU_ANALYTIC_REPORT,
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
          menuApi={writeOption.writeType !== '' ? pagelayoutMenu : ''}
          onReload={onRefresh}
        />
      )}
    </>
  );
};

export default Toolbar;
