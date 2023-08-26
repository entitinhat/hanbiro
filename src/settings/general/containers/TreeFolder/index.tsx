import { Selection } from '@settings/general/types/selection';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Group from '@settings/general/containers/TreeFolder/Group';

interface TreeFolderProps {
  groups: Selection[] | undefined;
  onStartEditItem: (params: any) => void;
  onDeleteItem: (params: any) => void;
  onStartAddItem: (params: any) => void;
  onExpand: (params: any) => void;
}
const TreeFolder = (props: TreeFolderProps) => {
  const {
    groups = [],
    onStartEditItem = (params: any) => {},
    onDeleteItem = (params: any) => {},
    onStartAddItem = (params: any) => {},
    onExpand = (params: any) => {}
  } = props;
  const { t } = useTranslation();

  return (
    <div>
      <nav className="nav nav-sidebar tx-13">
        {groups.map((group) => (
          <Group
            // ref={React.createRef()}
            isLoading={group.isLoading ?? false}
            isLoaded={group.isLoaded ?? false}
            onStartEditItem={onStartEditItem}
            onDeleteItem={onDeleteItem}
            onStartAddItem={onStartAddItem}
            onExpand={onExpand}
            expand={group.expand}
            id={group.id}
            key={group.id}
            label={t(group.languageKey)}
            icon={'Folder'}
            iconType={'feather'}
            onClick={() => {}}
            subGroups={group.children}
            level={0}
            isEdit={group.isBase ? false : true}
            onEdit={() => onStartEditItem({ item: group })}
            isDelete={group.isBase ? false : true}
            onDelete={() => onDeleteItem({ item: group })}
            isAdd={group.isBase ? false : true}
            onAdd={({ loadData, setLoading, setIsExpand }: any) =>
              onStartAddItem({
                item: group,
                loadData: loadData,
                setLoading: setLoading,
                setIsExpand: setIsExpand
              })
            }
            onExpandGroup={({ loadData, setLoading, setIsExpand, isExpand }: any) =>
              onExpand({
                item: group,
                loadData: loadData,
                setLoading: setLoading,
                setIsExpand: setIsExpand,
                isExpand: isExpand
              })
            }
          />
        ))}
      </nav>
    </div>
  );
};

export default TreeFolder;
