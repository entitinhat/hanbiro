import React, { useMemo, useState } from 'react';

//third-party
import { keys } from 'lodash';
import { useNavigate } from 'react-router-dom';

//material
import { DeleteOutlined } from '@mui/icons-material';

//project import
import ListToolbar from '@base/components/@hanbiro/List/ListToolbar';
import { MENU_DESK, MENU_DESK_KNOWLEDGE, MENU_DESK_TICKET } from '@base/config/menus';
import { DESK_MENUS } from '@base/config/routeMenus';
import { LabelValueIcon, ListType } from '@base/types/app';
import { WriteOption } from '@base/types/common';
//by module
import WritePage from '@desk/knowledge-base/pages/WritePage';
import WriteTicketPage from '@desk/ticket/pages/WritePage';

import { DropdownProps } from '@base/components/@hanbiro/Dropdown';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import Icon from '@base/assets/icons/svg-icons';
import WriteCategoryForm from '@desk/knowledge-base/containers/WriteCategoryForm';
import WriteFolderForm from '@desk/knowledge-base/containers/WriteFolderForm';
import { useTranslation } from 'react-i18next';
import ExportDataModal from '@base/containers/ExportData';
import ImportDataModal from '@base/containers/ImportData';
import { KnowledgeBaseToolbarMoreOptions } from '@desk/knowledge-base/config/constants';
import { KEY_KNOWLEDGE_BASE_EXPORT, KEY_KNOWLEDGE_BASE_IMPORT, KEY_KNOWLEDGE_BASE_EMPTY_ALL } from '@desk/knowledge-base/config/keyNames';
import { isDeleteList } from './Helper';
import useKBMutation from '@desk/knowledge-base/hooks/useKBMutation';
import { useListQueryKeys } from '@base/hooks/user-setting/useListQueryKeys';

export const KB_ADD_OPTIONS: Record<string, any> = {
  ticket: {
    name: 'ncrm_desk_knowledge_base_new_ticket'
  },
  article: {
    name: 'ncrm_desk_knowledge_base_new_article'
  },
  folder: {
    name: 'ncrm_desk_knowledge_base_new_folder'
  },
  category: {
    name: 'ncrm_desk_knowledge_base_new_category'
  }
};

interface ToolbarProps {
  isSplitMode: boolean;
  category: string;
  onRefresh: () => void;
}

const Toolbar = (props: ToolbarProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isSplitMode, category, onRefresh } = props;
  //state
  const pagelayoutMenu = MENU_DESK_KNOWLEDGE;
  const [writeOption, setWriteOption] = useState<WriteOption>({ writeType: pagelayoutMenu, isOpenWrite: false });
  const [showExport, setShowExport] = useState<boolean>(false);
  const [showImport, setShowImport] = useState<boolean>(false);
  const addOptions = keys(KB_ADD_OPTIONS).map((k: string) => {
    return {
      label: KB_ADD_OPTIONS[k].name,
      value: k,
      icon: KB_ADD_OPTIONS[k].icon
    };
  });
  const { listType, setListType, filterValues } = useListPageSettings(category);

  const { listQueryKey } = useListQueryKeys(MENU_DESK_KNOWLEDGE);
  const { mEmptyAll } = useKBMutation(listQueryKey);

  const groupByDeleted = isDeleteList(filterValues?.groupBy);

  const deletedKBToolbar: LabelValueIcon = {
    label: 'ncrm_common_btn_empty_all',
    value: KEY_KNOWLEDGE_BASE_EMPTY_ALL,
    icon: <DeleteOutlined fontSize="small" />
  };

  //more event change
  const handleMoreChange = (keyEvent: string) => {
    keyEvent = keyEvent.toLowerCase();
    switch (keyEvent) {
      case KEY_KNOWLEDGE_BASE_EXPORT:
        setShowExport(true);
        break;
      case KEY_KNOWLEDGE_BASE_IMPORT:
        setShowImport(true);
        break;
      case KEY_KNOWLEDGE_BASE_EMPTY_ALL:
        mEmptyAll.mutate({
          onSuccess() {
            onRefresh && onRefresh();
          }
        });
        break;
    }
  };

  return (
    <>
      <ListToolbar
        menu={MENU_DESK}
        isSmall={isSplitMode}
        onRefresh={onRefresh}
        categoryMenuProps={{
          items: DESK_MENUS,
          selected: 'knowledge',
          onClick: (category: string) => {
            navigate(`/m${MENU_DESK}/${category}`);
          }
        }}
        addingMenuProps={{
          items: addOptions,
          onClick: (writeType: string) => {
            setWriteOption({
              //...writeOption,
              //writePage: 'list',
              writeType: writeType,
              isOpenWrite: true
            });
          },
          defaultOpenItem: 1
        }}
        // listTypeMenuProps={{
        //   allowTypes: [ListType.GRID, ListType.LIST, ListType.SPLIT],
        //   selectedType: listType ?? ListType.LIST,
        //   onChange: (nType: ListType) => {
        //     setListType(nType);
        //   }
        // }}
        // moreMenuProps={{
        //   items: groupByDeleted ? [...KnowledgeBaseToolbarMoreOptions, deletedKBToolbar] : KnowledgeBaseToolbarMoreOptions,
        //   onChange: (key: LabelValueIcon) => {
        //     console.log('...moreMenuProps.onChange...', key);
        //     switch (key?.value) {
        //       case KEY_KNOWLEDGE_BASE_EMPTY_ALL:
        //         mEmptyAll.mutate({
        //           onSuccess() {
        //             onRefresh && onRefresh();
        //           }
        //         });
        //         return;
        //       default:
        //         handleMoreChange(key.value);
        //         return;
        //     }
        //   }
        // }}
      />
      {writeOption.isOpenWrite && writeOption.writeType === 'ticket' && (
        <WriteTicketPage
          isOpen={writeOption.isOpenWrite}
          onClose={() => setWriteOption({ ...writeOption, isOpenWrite: false })}
          category={MENU_DESK_TICKET}
          type={writeOption.writeType}
          listType={listType}
          menuApi={MENU_DESK_TICKET}
          onReload={onRefresh}
        />
      )}
      {writeOption.isOpenWrite && writeOption.writeType === 'article' && (
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
      {writeOption.isOpenWrite && writeOption.writeType === 'folder' && (
        <WriteFolderForm isOpen={writeOption.isOpenWrite} onClose={() => setWriteOption({ ...writeOption, isOpenWrite: false })} />
      )}
      {writeOption.isOpenWrite && writeOption.writeType === 'category' && (
        <WriteCategoryForm
          isOpen={writeOption.isOpenWrite}
          onClose={() => setWriteOption({ ...writeOption, isOpenWrite: false })}
          data={null}
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
