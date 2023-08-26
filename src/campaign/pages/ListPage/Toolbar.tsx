import React, { useState } from 'react';

//third-party
import { keys } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

//mui
import { DeleteOutlined } from '@mui/icons-material';

//project
import { DropdownProps } from '@base/components/@hanbiro/Dropdown';
import ListToolbar from '@base/components/@hanbiro/List/ListToolbar';
import { MENU_CAMPAIGN, MENU_CAMPAIGN_ALL } from '@base/config/menus';
import { CAMPAIGN_ROUTE_MENUS } from '@base/config/routeMenus';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { LabelValueIcon, ListType } from '@base/types/app';
import { WriteOption } from '@base/types/common';
import Icon from '@base/assets/icons/svg-icons';
import { useListQueryKeys } from '@base/hooks/user-setting/useListQueryKeys';
import ExportDataModal from '@base/containers/ExportData';
import ImportDataModal from '@base/containers/ImportData';

//menu
import WritePage from '@campaign/pages/WritePage';
import {
  CAMPAIGN_ADD_OPTIONS,
  CAMPAIGN_CATEGORY_EMAIL,
  CAMPAIGN_CATEGORY_ALL,
  CAMPAIGN_TOOLBAR_MORE_OPTIONS,
  CAMPAIGN_EXPORT,
  CAMPAIGN_IMPORT,
  CAMPAIGN_EMPTY,
  CAMPAIGN_SETTING
} from '@campaign/config/constants';
//import { useCusomerRestoreMutation } from '@campaign/hooks/useCusomerRestoreMutation';
import { isDeleteList } from '@campaign/pages/ListPage/Helper';

interface ToolbarProps {
  isSplitMode: boolean;
  category: string;
  onRefresh: () => void;
  onDelete?: () => void;
  // moreMenuProps?: DropdownProps;
}

const Toolbar = (props: ToolbarProps) => {
  const {
    isSplitMode,
    category,
    onRefresh,
    onDelete
    // moreMenuProps
  } = props;
  const { t } = useTranslation();
  //state
  const [writeOption, setWriteOption] = useState<WriteOption>({ writeType: '', isOpenWrite: false });
  const [showImport, setShowImport] = useState<boolean>(false);
  const [showExport, setShowExport] = useState(false);
  const pagelayoutMenu = `${MENU_CAMPAIGN}_${writeOption.writeType}`;
  const navigate = useNavigate();

  const addOptions = keys(CAMPAIGN_ADD_OPTIONS).map((k: string) => {
    return {
      label: t(CAMPAIGN_ADD_OPTIONS[k].name),
      value: k,
      icon: CAMPAIGN_ADD_OPTIONS[k].icon
    };
  });

  const pageDataKey = `${MENU_CAMPAIGN}_${category}`;
  const { listType, setListType, filterValues } = useListPageSettings(pageDataKey);
  const isDeleteGroup = isDeleteList(filterValues?.groupBy);

  //hook
  const { listQueryKey } = useListQueryKeys(MENU_CAMPAIGN_ALL); //???
  //const { mEmptyAll } = useCusomerRestoreMutation(listQueryKey);

  const handelChangeListType = (nType: ListType) => {
    setListType(nType);
  };

  const moreOptions = CAMPAIGN_TOOLBAR_MORE_OPTIONS.map((_option: LabelValueIcon) => ({ ..._option, label: t(_option.label) }));

  const deleteOptions = [
    {
      label: 'Import',
      value: CAMPAIGN_IMPORT,
      icon: Icon('upload_cloud')
    },
    {
      label: 'Export',
      value: CAMPAIGN_EXPORT,
      icon: Icon('download')
    },
    {
      label: 'ncrm_common_btn_empty_all',
      value: CAMPAIGN_EMPTY,
      icon: <DeleteOutlined fontSize="small" />
    }
  ];

  const moreMenuProps: DropdownProps = {
    items: isDeleteGroup ? deleteOptions : moreOptions,
    onChange: (key: LabelValueIcon) => {
      console.log('...moreMenuProps.onChange...', key);
      switch (key?.value) {
        case 'empty':
          // mEmptyAll.mutate({
          //   onSuccess() {
          //     onRefresh && onRefresh();
          //   }
          // });
          return;
        default:
          handleMoreChange(key.value);
          return;
      }
    }
  };

  //more event change
  const handleMoreChange = (keyEvent: string) => {
    switch (keyEvent) {
      case CAMPAIGN_EXPORT:
        setShowExport(true);
        break;
      case CAMPAIGN_IMPORT:
        setShowImport(true);
        break;
      case CAMPAIGN_SETTING:
        navigate('/settings/preferences/marketing');
        break;
      case CAMPAIGN_EMPTY:
        //empty all hook
        break;
    }
  };

  return (
    <>
      <ListToolbar
        menu={MENU_CAMPAIGN}
        isSmall={isSplitMode}
        onRefresh={onRefresh}
        onDelete={onDelete}
        categoryMenuProps={{
          items: CAMPAIGN_ROUTE_MENUS,
          selected: category ?? CAMPAIGN_CATEGORY_ALL,
          onClick: (category: string) => {
            navigate(`/${MENU_CAMPAIGN}/${category}`);
          }
        }}
        addingMenuProps={{
          items: addOptions,
          onClick: (addKey: string) => {
            //console.log('addKey', addKey);
            setWriteOption({
              writeType: addKey, //category === CAMPAIGN_CATEGORY_ALL ? CAMPAIGN_CATEGORY_EMAIL : category,
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
      <WritePage
        isOpen={writeOption.isOpenWrite}
        onClose={() => setWriteOption({ ...writeOption, isOpenWrite: false })}
        category={writeOption.writeType}
        menuApi={writeOption.writeType !== '' ? pagelayoutMenu : ''}
        onReload={onRefresh}
      />
      {showExport && (
        <ExportDataModal
          menu={pageDataKey}
          isOpen={showExport}
          onClose={() => setShowExport(false)}
          onReload={() => {
            onRefresh && onRefresh();
          }}
        />
      )}
      {showImport && (
        <ImportDataModal
          menu={pageDataKey}
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
