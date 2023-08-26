import React, { useState } from 'react';

//third-party
import { keys } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
import { useCusomerRestoreMutation } from '@customer/hooks/useCusomerRestoreMutation';
import ExportDataModal from '@base/containers/ExportData';
import ImportDataModal from '@base/containers/ImportData';

//menu
import WritePage from '@customer/pages/WritePage';
import {
  CUSTOMER_ADD_OPTIONS,
  CUSTOMER_CATEGORY_ACCOUNT,
  CUSTOMER_CATEGORY_ALL,
  CUSTOMER_CATEGORY_MASTER,
  CUSTOMER_TOOLBAR_MORE_OPTIONS,
  KEY_CUSTOMER_EXPORT,
  KEY_CUSTOMER_IMPORT,
  KEY_CUSTOMER_MERGE,
  KEY_CUSTOMER_EMPTY
} from '@customer/config/constants';
import CustomerMergeModal from '@customer/containers/Merge';
import { isDeleteList } from '@customer/pages/ListPage/Helper';

interface ToolbarProps {
  isSplitMode: boolean;
  category: string;
  onRefresh: () => void;
  onDelete?: () => void;
}

const Toolbar = (props: ToolbarProps) => {
  const { isSplitMode, category, onRefresh, onDelete } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  //state
  const [writeOption, setWriteOption] = useState<WriteOption>({ writeType: '', isOpenWrite: false });
  const [showMerge, setShowMerge] = useState(false);
  const [showImport, setShowImport] = useState<boolean>(false);
  const [showExport, setShowExport] = useState(false);
  const pagelayoutWriteKey = `${MENU_CUSTOMER}_${writeOption.writeType}`;
  const pageDataKey = `${MENU_CUSTOMER}_${category}`;
  const { listType, setListType, filterValues } = useListPageSettings(pageDataKey);
  const isDeleteGroup = isDeleteList(filterValues?.groupBy);

  //hook
  const { listQueryKey } = useListQueryKeys(MENU_CUSTOMER_ALL);
  const { mEmptyAll } = useCusomerRestoreMutation(listQueryKey);

  //change add options
  const addOptions = keys(CUSTOMER_ADD_OPTIONS).map((k: string) => {
    return {
      label: t(CUSTOMER_ADD_OPTIONS[k].name),
      value: k,
      icon: CUSTOMER_ADD_OPTIONS[k].icon
    };
  });

  //change list type
  const handelChangeListType = (nType: ListType) => {
    setListType(nType);
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
      case 'customer_setting':
        navigate('/settings/preferences/customer');
        break;
      case KEY_CUSTOMER_EMPTY:
        //empty all hook
        break;
    }
  };

  //more options
  const moreOptions = CUSTOMER_TOOLBAR_MORE_OPTIONS.map((_option: LabelValueIcon) => ({ ..._option, label: t(_option.label) }));

  //deleted menu
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

  //more menu
  const moreMenuProps: DropdownProps = {
    items: isDeleteGroup ? deleteOptions : moreOptions,
    onChange: (key: LabelValueIcon) => {
      switch (key?.value) {
        case 'empty':
          mEmptyAll.mutate({
            onSuccess() {
              onRefresh && onRefresh();
            }
          });
          return;
        default:
          handleMoreChange(key.value);
          return;
      }
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
          selected: category ?? CUSTOMER_CATEGORY_ALL,
          onClick: (category: string) => {
            navigate(`/${MENU_CUSTOMER}/${category}`);
          }
        }}
        addingMenuProps={{
          items: addOptions,
          onClick: (addKey: string) => {
            setWriteOption({
              //...writeOption,
              //writePage: 'list',
              writeType:
                addKey === CUSTOMER_CATEGORY_MASTER ? (category === CUSTOMER_CATEGORY_ALL ? CUSTOMER_CATEGORY_ACCOUNT : category) : addKey,
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
        menuApi={writeOption.writeType !== '' ? pagelayoutWriteKey : ''}
        onReload={onRefresh}
      />
      <CustomerMergeModal
        isOpen={showMerge}
        category={category}
        onClose={() => setShowMerge(false)}
        //defaultItems={[]}
        onReload={() => {
          onRefresh && onRefresh();
        }}
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
