import { keys } from 'lodash';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  ACTIVITY_MENU_CALL,
  ACTIVITY_MENU_DEFAULT,
  ACTIVITY_MENU_EMAIL,
  ACTIVITY_MENU_SMS,
  ACTIVITY_MENU_TASK
} from '@activity/config/constants';
import WritePage from '@activity/pages/WritePage';
import Icon from '@base/assets/icons/svg-icons';
import ListToolbar from '@base/components/@hanbiro/List/ListToolbar';
import { MENU_ACTIVITY, MENU_MYWORK } from '@base/config/menus';
import { ACTIVITY_MENU } from '@base/config/routeMenus';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { LabelValueIcon, ListType } from '@base/types/app';
import { WriteOption } from '@base/types/common';
import { Delete, RestoreFromTrashRounded } from '@mui/icons-material';
import { KEY_ACTIVITY_EXPORT, KEY_ACTIVITY_IMPORT } from '@activity/config/keyNames';
import ExportDataModal from '@base/containers/ExportData';
import ImportDataModal from '@base/containers/ImportData';
import { ActivityToolbarMoreOptions, DeleteOptions } from './index';
import { isDeleteList } from './Helper';
import { useActivityMutation } from '@activity/hooks/useActivityMutation';
import { useListQueryKeys } from '@base/hooks/user-setting/useListQueryKeys';

export const ACTIVITY_ADD_OPTIONS: Record<string, any> = {
  task: {
    name: 'ncrm_activity_task',
    icon: Icon(ACTIVITY_MENU_TASK)
  },
  call: {
    name: 'ncrm_activity_call',
    icon: Icon(ACTIVITY_MENU_CALL)
  },
  email: {
    name: 'ncrm_activity_email',
    icon: Icon(ACTIVITY_MENU_EMAIL)
  },
  sms: {
    name: 'ncrm_activity_sms',
    icon: Icon(ACTIVITY_MENU_SMS)
  }
};

interface ToolbarProps {
  isSplitMode: boolean;
  category: string;
  onRefresh: () => void;
  onDelete?: () => void;
}

const Toolbar = (props: ToolbarProps) => {
  console.log('list toolbar');
  const navigate = useNavigate();
  const [showExport, setShowExport] = useState<boolean>(false);
  const [showImport, setShowImport] = useState<boolean>(false);
  const { isSplitMode, category, onRefresh, onDelete } = props;
  //state
  const [writeOption, setWriteOption] = useState<WriteOption>({ writeType: '', isOpenWrite: false });
  const pagelayoutMenu = `${MENU_ACTIVITY}_${writeOption.writeType}`;

  const addOptions = keys(ACTIVITY_ADD_OPTIONS).map((k: string) => {
    return {
      label: ACTIVITY_ADD_OPTIONS[k].name,
      value: k,
      icon: ACTIVITY_ADD_OPTIONS[k].icon
    };
  });

  const pageDataKey = `${MENU_ACTIVITY}_${category}`;
  const { listType, setListType, filterValues } = useListPageSettings(pageDataKey);

  const groupBy = filterValues?.groupBy;
  const isDeleteGroup = isDeleteList(groupBy);

  const { listQueryKey } = useListQueryKeys(pageDataKey);
  const { mEmptyAll } = useActivityMutation(listQueryKey);

  const handelChangeListType = (nType: ListType) => {
    setListType(nType);
  };

  //more event change
  const handleMoreChange = (keyEvent: string) => {
    keyEvent = keyEvent.toLowerCase();
    switch (keyEvent) {
      case KEY_ACTIVITY_EXPORT:
        setShowExport(true);
        break;
      case KEY_ACTIVITY_IMPORT:
        setShowImport(true);
        break;
    }
  };

  return (
    <>
      <ListToolbar
        menu={MENU_ACTIVITY}
        isSmall={isSplitMode}
        onRefresh={onRefresh}
        onDelete={onDelete}
        categoryMenuProps={{
          items: ACTIVITY_MENU,
          selected: category ?? '',
          onClick: (category: string) => {
            navigate(`/${MENU_ACTIVITY}/${category}`);
          }
        }}
        addingMenuProps={{
          items: addOptions,
          onClick: (item: string) => {
            setWriteOption({
              //...writeOption,
              //writePage: 'list',
              writeType: item === ACTIVITY_MENU_DEFAULT ? ACTIVITY_MENU_TASK : item,
              isOpenWrite: true
            });
          }
        }}
        listTypeMenuProps={{
          allowTypes: category == MENU_MYWORK ? [ListType.CALENDAR, ListType.KANBAN] : [ListType.GRID, ListType.LIST, ListType.SPLIT],
          selectedType: listType ?? ListType.LIST,
          onChange: (type: ListType) => {
            handelChangeListType(type);
          }
        }}
        moreMenuProps={{
          items: isDeleteGroup ? DeleteOptions : ActivityToolbarMoreOptions,
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
        }}
      />
      <WritePage
        isOpen={writeOption.isOpenWrite}
        onClose={() => setWriteOption({ ...writeOption, isOpenWrite: false })}
        category={category}
        type={writeOption.writeType}
        listType={listType}
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
