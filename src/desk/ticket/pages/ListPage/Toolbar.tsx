import React, { useMemo, useState } from 'react';
import { keys } from 'lodash';

//third-party
import { useNavigate } from 'react-router-dom';

//material
import { DeleteOutlined } from '@mui/icons-material';

//project import
import { pageDataByMenuAtom } from '@base/store/atoms';
import ListToolbar from '@base/components/@hanbiro/List/ListToolbar';
import { MENU_DESK, MENU_DESK_TICKET } from '@base/config/menus';
import { DESK_MENUS } from '@base/config/routeMenus';
import { LabelValueIcon, ListType } from '@base/types/app';
import { WriteOption } from '@base/types/common';
//by module
import WritePage from '@desk/ticket/pages/WritePage';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
// import { TicketToolbarMoreOptions } from '@desk/ticket/config/constants';
import ExportDataModal from '@base/containers/ExportData';
import ImportDataModal from '@base/containers/ImportData';
import { KEY_TICKET_EXPORT, KEY_TICKET_IMPORT, KEY_TICKET_EMPTY_ALL } from '@desk/ticket/config/keyNames';
import { isDeleteList } from './Helper';
import useTicketMutation from '@desk/ticket/hooks/useTicketMutations';
import { useListQueryKeys } from '@base/hooks/user-setting/useListQueryKeys';

import Icon from '@base/assets/icons/svg-icons';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { TICKET_ADD_OPTIONS } from '@desk/ticket/config/constants';

export const TicketToolbarMoreOptions: LabelValueIcon[] = [
  /*{
    label: 'ncrm_desk_ticket_import',
    value: 'import',
    icon: Icon('upload_cloud')
  },*/
  {
    label: 'ncrm_desk_ticket_export', // Export
    value: 'export',
    icon: Icon('download')
  },
  {
    label: 'ncrm_desk_ticket_marketing_preferences', // Marketing Preferences
    value: 'marketingPrefernces',
    icon: <SettingsOutlinedIcon fontSize="small" />
  }
];

interface ToolbarProps {
  isSplitMode: boolean;
  category: string;
  onRefresh: () => void;
}

const Toolbar = (props: ToolbarProps) => {
  const navigate = useNavigate();
  const { isSplitMode, category, onRefresh } = props;
  //state
  const pagelayoutMenu = MENU_DESK_TICKET;
  const [writeOption, setWriteOption] = useState<WriteOption>({ writeType: pagelayoutMenu, isOpenWrite: false });
  const [showExport, setShowExport] = useState<boolean>(false);
  const [showImport, setShowImport] = useState<boolean>(false);
  const { listType, setListType, filterValues } = useListPageSettings(category);

  //hook
  const { listQueryKey } = useListQueryKeys(MENU_DESK_TICKET);
  const { mEmptyAllTicket } = useTicketMutation(listQueryKey);

  const groupByDeleted = isDeleteList(filterValues?.groupBy);

  //change add options
  const addOptions = keys(TICKET_ADD_OPTIONS).map((k: string) => {
    return {
      // label: t(TICKET_ADD_OPTIONS[k].name),
      label: TICKET_ADD_OPTIONS[k].name,
      value: k
    };
  });

  //more event change
  const handleMoreChange = (keyEvent: string) => {
    keyEvent = keyEvent.toLowerCase();
    switch (keyEvent) {
      case KEY_TICKET_EXPORT:
        setShowExport(true);
        break;
      case KEY_TICKET_IMPORT:
        setShowImport(true);
        break;
      case KEY_TICKET_EMPTY_ALL:
        mEmptyAllTicket.mutate({
          onSuccess() {
            onRefresh && onRefresh();
          }
        });
        break;
      default:
        console.log(keyEvent);
    }
  };

  const deletedTicketToolbar: LabelValueIcon = {
    label: 'ncrm_common_btn_empty_all', // Empty All
    value: KEY_TICKET_EMPTY_ALL,
    icon: <DeleteOutlined fontSize="small" />
  };

  return (
    <>
      <ListToolbar
        menu={MENU_DESK_TICKET}
        isSmall={isSplitMode}
        onRefresh={onRefresh}
        categoryMenuProps={{
          items: DESK_MENUS,
          selected: 'ticket',
          onClick: (category: string) => {
            navigate(`/m${MENU_DESK}/${category}`);
          }
        }}
        addingMenuProps={{
          // items: [],
          items: addOptions,
          onClick: (item: string) => {
            setWriteOption({
              //...writeOption,
              //writePage: 'list',
              writeType: MENU_DESK_TICKET,
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
          items: groupByDeleted ? [...TicketToolbarMoreOptions, deletedTicketToolbar] : TicketToolbarMoreOptions,
          onChange: (key: LabelValueIcon) => {
            switch (key?.value) {
              case KEY_TICKET_EMPTY_ALL:
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
      {writeOption.isOpenWrite && (
        <WritePage
          isOpen={writeOption.isOpenWrite}
          onClose={() => setWriteOption({ ...writeOption, isOpenWrite: false })}
          category={category}
          type={writeOption.writeType}
          listType={listType}
          menuApi={pagelayoutMenu}
          onReload={onRefresh}
        />
      )}

      {showExport && (
        <ExportDataModal
          menu={pagelayoutMenu}
          isOpen={showExport}
          onClose={() => setShowExport(false)}
          onReload={() => {
            onRefresh && onRefresh();
          }}
        />
      )}
      {showImport && (
        <ImportDataModal
          menu={pagelayoutMenu}
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
