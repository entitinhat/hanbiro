import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { keys } from 'lodash';
import { useTranslation } from 'react-i18next';

import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import { DropdownProps } from '@base/components/@hanbiro/Dropdown';
import ListToolbar from '@base/components/@hanbiro/List/ListToolbar';
import { MENU_SALES, MENU_LEAD } from '@base/config/menus';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { LabelValueIcon, ListType } from '@base/types/app';
import { WriteOption } from '@base/types/common';
import Icon from '@base/assets/icons/svg-icons';
import { useListQueryKeys } from '@base/hooks/user-setting/useListQueryKeys';
import ExportDataModal from '@base/containers/ExportData';
import ImportDataModal from '@base/containers/ImportData';
import { LEAD_MENUS } from '@base/config/routeMenus';

import { KEY_LEAD_IMPORT, KEY_LEAD_EXPORT, KEY_LEAD_MERGE } from '@lead/config/keyNames';
import { LEAD_ADD_OPTIONS } from '@lead/config/constants';
import WritePage from '@lead/pages/WritePage';
import { isDeleteList } from './Helper';

interface ToolbarProps {
  isSplitMode: boolean;
  category: string;
  onRefresh: () => void;
  onDelete?: () => void;
}

const moreOptions: LabelValueIcon[] = [
  {
    label: 'ncrm_common_import',
    value: 'import',
    icon: Icon('upload_cloud')
  },
  {
    label: 'ncrm_common_export',
    value: 'export',
    icon: Icon('download')
  },
  {
    label: 'Setting Preferences',
    value: 'settingprefernces',
    icon: <SettingsOutlinedIcon fontSize="small" />
  }
];

// const deleteOptions: LabelValueIcon[] = [
//   {
//     label: 'ncrm_common_import',
//     value: 'import',
//     icon: Icon('upload_cloud')
//   },
//   {
//     label: 'ncrm_common_export',
//     value: 'export',
//     icon: Icon('download')
//   },
//   {
//     label: 'ncrm_common_btn_empty_all',
//     value: 'EMPTY',
//     icon: <DeleteOutlined fontSize="small" />
//   }
// ];

const Toolbar = (props: ToolbarProps) => {
  const navigate = useNavigate();

  const { isSplitMode, category, onRefresh, onDelete } = props;
  const { t } = useTranslation();
  // state
  const [writeOption, setWriteOption] = useState<WriteOption>({ writeType: '', isOpenWrite: false });
  const [showExport, setShowExport] = useState<boolean>(false);
  const [showImport, setShowImport] = useState<boolean>(false);

  //hook
  const { listQueryKey } = useListQueryKeys(MENU_LEAD);

  const layoutKey = `${MENU_SALES}_${MENU_LEAD}`;
  const { listType, setListType, filterValues } = useListPageSettings(layoutKey);
  const isDeleteGroup = isDeleteList(filterValues?.groupBy);
  const handelChangeListType = (nType: ListType) => {
    setListType(nType);
  };

  const moreMenuProps: DropdownProps = {
    items: isDeleteGroup ? moreOptions : moreOptions,
    onChange: (key: LabelValueIcon) => {
      switch (key?.value) {
        // case 'EMPTY':
        //   mEmptyAll.mutate({
        //     onSuccess() {
        //       onRefresh && onRefresh();
        //     }
        //   });
        //   return;
        case 'settingprefernces':
          navigate(`/settings/preferences/sales`);
          return;
        default:
          handleMoreChange(key.value);
          return;
      }
    }
  };

  //more event change
  const handleMoreChange = (keyEvent: string) => {
    keyEvent = keyEvent.toLowerCase();
    switch (keyEvent) {
      case KEY_LEAD_EXPORT:
        setShowExport(true);
        break;
      case KEY_LEAD_IMPORT:
        setShowImport(true);
        break;
    }
  };

  const addOptions = keys(LEAD_ADD_OPTIONS).map((k: string) => {
    return {
      label: LEAD_ADD_OPTIONS[k].name,
      value: k,
      icon: LEAD_ADD_OPTIONS[k].icon
    };
  });

  return (
    <>
      <ListToolbar
        menu={category}
        isSmall={isSplitMode}
        onRefresh={onRefresh}
        onDelete={onDelete}
        categoryMenuProps={{
          items: LEAD_MENUS,
          selected: category ?? '',
          onClick: (category: string) => {
            navigate(`/${category}`);
          }
        }}
        addingMenuProps={{
          items: addOptions,
          onClick: (item?: string) => {
            setWriteOption({
              writeType: item ?? MENU_LEAD,
              isOpenWrite: true
            });
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
      {writeOption.writeType == MENU_LEAD && (
        <WritePage
          isOpen={writeOption.isOpenWrite}
          onClose={() =>
            setWriteOption({
              writeType: MENU_LEAD,
              isOpenWrite: false
            })
          }
          onReload={onRefresh}
          menuApi={layoutKey}
        />
      )}
      {showExport && (
        <ExportDataModal
          menu={layoutKey}
          isOpen={showExport}
          onClose={() => setShowExport(false)}
          onReload={() => {
            onRefresh && onRefresh();
          }}
        />
      )}
      {showImport && (
        <ImportDataModal
          menu={layoutKey}
          isOpen={showImport}
          onClose={() => setShowImport(false)}
          onReload={() => {
            onRefresh && onRefresh();
          }}
        />
      )}
    </>
  );
};

export default Toolbar;
