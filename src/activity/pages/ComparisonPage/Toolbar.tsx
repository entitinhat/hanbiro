import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { DropdownProps } from '@base/components/@hanbiro/Dropdown';
import ListToolbar from '@base/components/@hanbiro/List/ListToolbar';
import { MENU_ACTIVITY } from '@base/config/menus';
import { ACTIVITY_MENU } from '@base/config/routeMenus';
import ExportDataModal from '@base/containers/ExportData';
import ImportDataModal from '@base/containers/ImportData';
import { KEY_COMPARISON_EXPORT, KEY_COMPARISON_IMPORT } from '@activity/config/keyNames';
import { ActivityToolbarMoreOptions } from '@activity/pages/ListPage/';
import { LabelValueIcon } from '@base/types/app';

interface ToolbarProps {
  category: string;
  onRefresh: () => void;
}

const Toolbar = (props: ToolbarProps) => {
  const navigate = useNavigate();
  const [showExport, setShowExport] = useState<boolean>(false);
  const [showImport, setShowImport] = useState<boolean>(false);
  const { category, onRefresh } = props;
  const pageDataKey = `${MENU_ACTIVITY}_${category}`;

  //more event change
  const handleMoreChange = (keyEvent: string) => {
    keyEvent = keyEvent.toLowerCase();
    switch (keyEvent) {
      case KEY_COMPARISON_EXPORT:
        setShowExport(true);
        break;
      case KEY_COMPARISON_IMPORT:
        setShowImport(true);
        break;
    }
  };

  return (
    <>
      <ListToolbar
        menu={MENU_ACTIVITY}
        onRefresh={onRefresh}
        categoryMenuProps={{
          items: ACTIVITY_MENU,
          selected: category ?? '',
          onClick: (category: string) => {
            navigate(`/${MENU_ACTIVITY}/${category}`);
          }
        }}
        moreMenuProps={{
          items: ActivityToolbarMoreOptions.filter((v) => v.value === 'export'),
          onChange: (key: LabelValueIcon) => {
            console.log('...moreMenuProps.onChange...', key);
            switch (key?.value) {
              case 'EMPTY':
              // mEmptyAll.mutate({
              //   onSuccess() {
              //     onRefresh && onRefresh();
              //   }
              // });
              // return;
              default:
                handleMoreChange(key.value);
                return;
            }
          }
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
