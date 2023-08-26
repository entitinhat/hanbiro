import React, { useMemo, useState } from 'react';

// 3rd import
import { useNavigate } from 'react-router-dom';
import { keys } from 'lodash';

// mui import
import { DeleteOutlined } from '@mui/icons-material';

// project import
import { DropdownProps } from '@base/components/@hanbiro/Dropdown';
import ListToolbar from '@base/components/@hanbiro/List/ListToolbar';
import { MENU_ITEM, MENU_PRODUCT, MENU_PRODUCT_PRODUCT, MENU_PRODUCT_UNIT, MENU_UNIT } from '@base/config/menus';
import { PRODUCT_MENUS } from '@base/config/routeMenus';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { LabelValueIcon, ListType } from '@base/types/app';
import { WriteOption } from '@base/types/common';
import Icon from '@base/assets/icons/svg-icons';
import { useListQueryKeys } from '@base/hooks/user-setting/useListQueryKeys';
import ExportDataModal from '@base/containers/ExportData';
import ImportDataModal from '@base/containers/ImportData';

// menu import
import { PRODUCT_ADD_OPTIONS } from '@product/main/config';
import ItemWritePage from '@product/item/pages/WritePage';
import UnitWritePage from '@product/unit/pages/WritePage';
import { useProductMutation } from '@product/product/hooks/useProductMutation';
import { KEY_PRODUCT_EXPORT, KEY_PRODUCT_IMPORT } from '@product/product/config/keyNames';
import WritePage from '../WritePage';
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
    value: 'IMPORT',
    icon: Icon('upload_cloud')
  },
  {
    label: 'ncrm_common_export',
    value: 'EXPORT',
    icon: Icon('download')
  }
];

const deleteOptions: LabelValueIcon[] = [
  ...moreOptions,
  {
    label: 'ncrm_common_btn_empty_all',
    value: 'EMPTY',
    icon: <DeleteOutlined fontSize="small" />
  }
];

const Toolbar = (props: ToolbarProps) => {
  const navigate = useNavigate();

  const { isSplitMode, category, onRefresh, onDelete } = props;

  // state
  const [writeOption, setWriteOption] = useState<WriteOption>({ writeType: category, isOpenWrite: false });
  const [showExport, setShowExport] = useState<boolean>(false);
  const [showImport, setShowImport] = useState<boolean>(false);

  //hook
  const { listQueryKey } = useListQueryKeys(MENU_PRODUCT_PRODUCT);
  const { mEmptyAll } = useProductMutation(listQueryKey);

  const addOptions = keys(PRODUCT_ADD_OPTIONS).map((k: string) => {
    return {
      label: PRODUCT_ADD_OPTIONS[k].name,
      value: k,
      icon: PRODUCT_ADD_OPTIONS[k].icon
    };
  });

  const layoutKey = MENU_PRODUCT_PRODUCT;
  const { listType, setListType, filterValues } = useListPageSettings(layoutKey);
  const isDeleteGroup = isDeleteList(filterValues?.groupBy);

  const handelChangeListType = (nType: ListType) => {
    setListType(nType);
  };

  const moreMenuProps: DropdownProps = {
    items: isDeleteGroup ? deleteOptions : moreOptions,
    onChange: (key: LabelValueIcon) => {
      console.log('...moreMenuProps.onChange...', key);
      switch (key?.value) {
        case 'EMPTY':
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

  //more event change
  const handleMoreChange = (keyEvent: string) => {
    keyEvent = keyEvent.toLowerCase();
    switch (keyEvent) {
      case KEY_PRODUCT_EXPORT:
        setShowExport(true);
        break;
      case KEY_PRODUCT_IMPORT:
        setShowImport(true);
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
          items: PRODUCT_MENUS,
          selected: category ?? '',
          onClick: (category: string) => {
            navigate(`/${MENU_PRODUCT}/${category}`);
          }
        }}
        addingMenuProps={{
          items: addOptions,
          onClick: (item: string) => {
            setWriteOption({
              writeType: item,
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
      {writeOption.isOpenWrite && writeOption.writeType === MENU_PRODUCT && (
        <WritePage
          isOpen={writeOption.isOpenWrite}
          onClose={() => setWriteOption({ ...writeOption, isOpenWrite: false })}
          onReload={onRefresh}
        />
      )}
      {writeOption.isOpenWrite && writeOption.writeType === MENU_ITEM && (
        <ItemWritePage
          isOpen={writeOption.isOpenWrite}
          onClose={() => setWriteOption({ ...writeOption, isOpenWrite: false })}
          // onReload={onRefresh}
        />
      )}
      {writeOption.isOpenWrite && writeOption.writeType === MENU_UNIT && (
        <UnitWritePage isOpen={writeOption.isOpenWrite} onClose={() => setWriteOption({ ...writeOption, isOpenWrite: false })} />
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
