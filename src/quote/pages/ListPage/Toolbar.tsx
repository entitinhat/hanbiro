import React, { useState } from 'react';

//third-party
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

//project base
import { DropdownProps } from '@base/components/@hanbiro/Dropdown';
import ListToolbar from '@base/components/@hanbiro/List/ListToolbar';
import { MENU_QUOTE, MENU_SALES, MENU_SALES_QUOTE } from '@base/config/menus';
import { OPPORTUNITY_MENUS } from '@base/config/routeMenus';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { LabelValueIcon, ListType } from '@base/types/app';
import { WriteOption } from '@base/types/common';
import ExportDataModal from '@base/containers/ExportData';
import ImportDataModal from '@base/containers/ImportData';

//menu
import WritePage from '@quote/pages/WritePage';
import { QUOTE_CATEGORY_ORIGINAL, QUOTE_DELTED_OPTIONS, QUOTE_TOOLBAR_MORE_OPTIONS } from '@quote/config/constants';
import { isDeleteList } from './Helper';

interface ToolbarProps {
  isSplitMode: boolean;
  category: string;
  onRefresh: () => void;
  onDelete?: () => void;
}

const Toolbar = (props: ToolbarProps) => {
  const {
    isSplitMode,
    category,
    onRefresh,
    onDelete
    // moreMenuProps
  } = props;
  //state
  const [writeOption, setWriteOption] = useState<WriteOption>({ writeType: '', isOpenWrite: false });
  const [showImport, setShowImport] = useState<boolean>(false);
  const [showExport, setShowExport] = useState(false);
  const pagelayoutMenu = MENU_SALES_QUOTE;
  const pageDataKey = `${MENU_SALES}_${MENU_QUOTE}`;
  //hook
  const { listType, setListType, filterValues } = useListPageSettings(pageDataKey);
  const isDeleteGroup = isDeleteList(filterValues?.groupBy);
  const navigate = useNavigate();
  const { t } = useTranslation();

  //change list type
  const handelChangeListType = (nType: ListType) => {
    setListType(nType);
  };

  //more event change
  const handleMoreChange = (keyEvent: string) => {
    switch (keyEvent) {
      case 'export':
        setShowExport(true);
        break;
      case 'import':
        setShowImport(true);
        break;
      case 'quote_setting':
        navigate('/settings/preferences/marketing');
        break;
      case 'empty':
        //empty all hook
        break;
    }
  };

  //more
  const moreOptions = QUOTE_TOOLBAR_MORE_OPTIONS.map((_option: LabelValueIcon) => ({ ..._option, label: t(_option.label) }));

  //more menu
  const moreMenuProps: DropdownProps = {
    items: isDeleteGroup ? QUOTE_DELTED_OPTIONS : moreOptions,
    onChange: (key: LabelValueIcon) => {
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

  return (
    <>
      <ListToolbar
        menu={MENU_QUOTE}
        isSmall={isSplitMode}
        onRefresh={onRefresh}
        onDelete={onDelete}
        categoryMenuProps={{
          items: OPPORTUNITY_MENUS,
          selected: MENU_QUOTE,
          onClick: (category: string) => {
            navigate(`/opportunity/${category}`);
          },
          mainIconProps: {
            icon: 'quotes'
          }
        }}
        addingMenuProps={{
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
      <WritePage
        fullScreen={false}
        isOpen={writeOption.isOpenWrite}
        onClose={() => setWriteOption({ ...writeOption, isOpenWrite: false })}
        menuApi={MENU_SALES_QUOTE}
        category={QUOTE_CATEGORY_ORIGINAL}
        //onReload={onRefresh}
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
