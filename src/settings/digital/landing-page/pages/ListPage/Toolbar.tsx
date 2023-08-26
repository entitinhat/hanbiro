import React, { useState } from 'react';

//third-party
import { useNavigate } from 'react-router-dom';

//project
import { MENU_SETTING_LANDINGPAGE } from '@base/config/menus';
import { DropdownProps } from '@base/components/@hanbiro/Dropdown';
import ListToolbar from '@base/components/@hanbiro/List/ListToolbar';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { LabelValueIcon, ListType } from '@base/types/app';
import { WriteOption } from '@base/types/common';
import { t } from 'i18next';

//menu
import WritePage from '@settings/digital/landing-page/pages/WritePage';
import { LANDING_PAGE_TOOLBAR_MORE_OPTIONS } from '@settings/digital/landing-page/config/constants';
interface ToolbarProps {
  isSplitMode: boolean;
  category: string;
  onRefresh: () => void;
  onDelete?: () => void;
  moreMenuProps?: DropdownProps;
  templateGroup?: any;
  viewConfig?: any;
  groupTemplate?: any;
}

const Toolbar = (props: ToolbarProps) => {
  const { isSplitMode, category, onRefresh, onDelete, moreMenuProps, templateGroup, viewConfig, groupTemplate } = props;
  //state
  const [writeOption, setWriteOption] = useState<WriteOption>({ writeType: '', isOpenWrite: false });
  const navigate = useNavigate();

  const pageDataKey = MENU_SETTING_LANDINGPAGE;
  const { listType, setListType } = useListPageSettings(pageDataKey);

  const handelChangeListType = (nType: ListType) => {
    setListType(nType);
  };

  //more event change
  const handleMoreChange = (keyEvent: string) => {
    console.log(keyEvent);
  };

  return (
    <>
      <ListToolbar
        menu={category}
        isSmall={isSplitMode}
        onRefresh={onRefresh}
        onDelete={onDelete}
        categoryMenuProps={{
          items: [
            {
              value: 'landing-page',
              label: 'Landing page',
              path: '/settings/landing-page'
            }
          ],
          selected: category,
          onClick: (category: string) => {
            console.log(`settings/digital/${category}`);
          }
        }}
        // addingMenuProps={{
        //   onClick: (addKey: string) => {
        //     console.log(addKey)
        //   }
        // }}
        addingMenuProps={{
          label: t('ncrm_common_btn_new') as string,
          onClick: () => setWriteOption({ ...writeOption, isOpenWrite: true })
        }}
        listTypeMenuProps={{
          allowTypes: [ListType.GRID, ListType.LIST, ListType.SPLIT],
          selectedType: listType ?? ListType.LIST,
          onChange: (type: ListType) => {
            handelChangeListType(type);
          }
        }}
        moreMenuProps={{
          items: LANDING_PAGE_TOOLBAR_MORE_OPTIONS,
          onChange: (key: LabelValueIcon) => handleMoreChange(key.value)
        }}
      />
      {writeOption.isOpenWrite && (
        <WritePage
          isOpen={writeOption.isOpenWrite}
          onClose={() => setWriteOption({ ...writeOption, isOpenWrite: false })}
          onReload={onRefresh}
          // templateGroup='email'
        />
      )}
    </>
  );
};

export default Toolbar;
