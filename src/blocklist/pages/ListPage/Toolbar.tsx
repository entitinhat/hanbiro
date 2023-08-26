import React, { useState } from 'react';

//third-party
import { keys } from 'lodash';
import { useNavigate } from 'react-router-dom';

//mui
import { DeleteOutlined } from '@mui/icons-material';

//project
import { DropdownProps } from '@base/components/@hanbiro/Dropdown';
import ListToolbar from '@base/components/@hanbiro/List/ListToolbar';
import { MENU_CUSTOMER, MENU_CUSTOMER_ALL } from '@base/config/menus';
import { CUSTOMER_MENUS } from '@base/config/routeMenus';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { LabelValueIcon, ListType } from '@base/types/app';
import { WriteOption } from '@base/types/common';
import Icon from '@base/assets/icons/svg-icons';
import { useListQueryKeys } from '@base/hooks/user-setting/useListQueryKeys';

//menu
// import WritePage from '@blocklist/pages/WritePage';
import {
  CUSTOMER_ADD_OPTIONS,
  CUSTOMER_CATEGORY_ACCOUNT,
  CUSTOMER_CATEGORY_ALL,
  CUSTOMER_CATEGORY_MASTER,
  KEY_CUSTOMER_EXPORT,
  KEY_CUSTOMER_IMPORT,
  KEY_CUSTOMER_MERGE,
  KEY_CUSTOMER_EMPTY
} from '@blocklist/config/constants';
import { useTranslation } from 'react-i18next';
import ExportDataModal from '@base/containers/ExportData';
import ImportDataModal from '@base/containers/ImportData';
import { isDeleteList } from '@blocklist/pages/ListPage/Helper';
import { CUSTOMER_TOOLBAR_MORE_OPTIONS } from '@blocklist/containers/ListBottomToolbar';

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
  const [showMerge, setShowMerge] = useState(false);
  const [showImport, setShowImport] = useState<boolean>(false);
  const [showExport, setShowExport] = useState(false);
  const pagelayoutMenu = `${MENU_CUSTOMER}_${writeOption.writeType}`;
  const navigate = useNavigate();

  const addOptions = keys(CUSTOMER_ADD_OPTIONS).map((k: string) => {
    return {
      label: t(CUSTOMER_ADD_OPTIONS[k].name),
      value: k,
      icon: CUSTOMER_ADD_OPTIONS[k].icon
    };
  });

  const pageDataKey = `${MENU_CUSTOMER}_${category}`;
  const { listType, setListType, filterValues } = useListPageSettings(pageDataKey);
  const isDeleteGroup = isDeleteList(filterValues?.groupBy);

  //hook
  const { listQueryKey } = useListQueryKeys(MENU_CUSTOMER_ALL);

  const handelChangeListType = (nType: ListType) => {
    setListType(nType);
  };

  const moreOptions = CUSTOMER_TOOLBAR_MORE_OPTIONS.general.map((_option: LabelValueIcon) => ({ ..._option, label: t(_option.label) }));

  const deleteOptions = [
    {
      label: 'Import',
      value: KEY_CUSTOMER_IMPORT,
      icon: Icon('upload_cloud')
    },
    {
      label: 'Export',
      value: KEY_CUSTOMER_EXPORT,
      icon: Icon('download')
    },
    {
      label: 'ncrm_common_btn_empty_all',
      value: KEY_CUSTOMER_EMPTY,
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
      case KEY_CUSTOMER_MERGE:
        setShowMerge(true);
        break;
      case KEY_CUSTOMER_EXPORT:
        setShowExport(true);
        break;
      case KEY_CUSTOMER_IMPORT:
        setShowImport(true);
        break;
      case KEY_CUSTOMER_EMPTY:
        //empty all hook

        break;
    }
  };

  return (
    <>
      <ListToolbar
        menu={MENU_CUSTOMER}
        isSmall={isSplitMode}
        onRefresh={onRefresh}
        onDelete={onDelete}
        categoryMenuProps={{
          items: CUSTOMER_MENUS,
          selected: 'block',
          onClick: (category: string) => navigate(`/${MENU_CUSTOMER}/${category}`)
        }}
        // addingMenuProps={{
        //   onClick: (addKey: string) => {
        //     setWriteOption({
        //       //...writeOption,
        //       //writePage: 'list',
        //       writeType: 'block_list',
        //       isOpenWrite: true
        //     });
        //   }
        // }}
        // listTypeMenuProps={{
        //   allowTypes: [ListType.GRID, ListType.LIST, ListType.SPLIT],
        //   selectedType: listType ?? ListType.LIST,
        //   onChange: (type: ListType) => {
        //     handelChangeListType(type);
        //   }
        // }}
        moreMenuProps={moreMenuProps}
      />
      {/* <WritePage
        isOpen={writeOption.isOpenWrite}
        onClose={() => setWriteOption({ ...writeOption, isOpenWrite: false })}
        category={writeOption.writeType}
        //type={''}
        menuApi={writeOption.writeType !== '' ? pagelayoutMenu : ''}
        onReload={onRefresh}
      /> */}

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
