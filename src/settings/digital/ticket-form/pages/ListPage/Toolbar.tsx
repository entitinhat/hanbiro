import React, { useEffect, useState } from 'react';

//third-party
import { useNavigate } from 'react-router-dom';

//project
import { DropdownProps } from '@base/components/@hanbiro/Dropdown';
import ListToolbar from '@base/components/@hanbiro/List/ListToolbar';
import { MENU_SETTING_TICKET_FORM } from '@base/config/menus';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { LabelValueIcon, ListType } from '@base/types/app';
import { WriteOption } from '@base/types/common';
import { TemplateGroup } from '@settings/template/types/template';

//menu
import WritePage from '@settings/digital/ticket-form/pages/WritePage';
import { TICKET_FORM_TOOLBAR_MORE_OPTIONS } from '../../config/constants';
// import { useTranslation } from 'react-i18next';
import { useTranslation } from 'react-i18next';

interface ToolbarProps {
  isSplitMode: boolean;
  category: string;
  onRefresh: () => void;
  onDelete?: () => void;
  moreMenuProps?: DropdownProps;

  //This for Write Page
  title?: string;
  // viewConfig?: any;
  // groupTemplate: string;
}

const Toolbar = (props: ToolbarProps) => {
  const { isSplitMode, category, onRefresh, onDelete, moreMenuProps, title } = props;
  const { t } = useTranslation();
  //state
  const [writeOption, setWriteOption] = useState<WriteOption>({ writeType: 'ticket_form', isOpenWrite: false });
  const navigate = useNavigate();
  const pageDataKey = MENU_SETTING_TICKET_FORM;
  const { listType, setListType } = useListPageSettings(pageDataKey);

  // more event change
  const handleMoreChange = (keyEvent: string) => {
    switch (keyEvent) {
      case 'import':
        break;
    }
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
              value: 'form',
              label: t('ncrm_generalsetting_form'),
              path: '/settings/digital/form'
            }
          ],
          selected: category,
          onClick: (category: string) => {
            navigate(`/settings/digital/form`);
          }
        }}
        addingMenuProps={{
          //items: addOptions,
          label: t('ncrm_common_btn_new') as string,
          onClick: (addKey: string) => {
            setWriteOption({
              writeType: 'ticket_form',
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
        moreMenuProps={{
          items: TICKET_FORM_TOOLBAR_MORE_OPTIONS,
          onChange: (key: LabelValueIcon) => handleMoreChange(key.value)
        }}
      />
      <WritePage
        isOpen={writeOption.isOpenWrite}
        onClose={() => setWriteOption({ ...writeOption, isOpenWrite: false })}
        menuApi={MENU_SETTING_TICKET_FORM}
        onReload={onRefresh}
        title={title}
        // viewConfig={viewConfig}
        // groupTemplate={groupTemplate}
      />
    </>
  );
};

export default Toolbar;
