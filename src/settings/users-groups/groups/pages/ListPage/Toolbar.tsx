import { DropdownProps } from '@base/components/@hanbiro/Dropdown';
import { ListToolbar } from '@base/components/@hanbiro/List';

import { useState } from 'react';
import WriteModal from '../WritePage';


interface ToolbarProps {
  onRefresh: () => void;
  moreMenuProps?: DropdownProps;
}
const Toolbar = (props: ToolbarProps) => {
  const { onRefresh, moreMenuProps } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <ListToolbar
        menu="groups"
        onRefresh={onRefresh}
        moreMenuProps={moreMenuProps}
        categoryMenuProps={{
          items: [
            {
              value: 'groups',
              label: 'GROUPS',
              path: 'settings/manage-users-groups/groups'
            }
          ],
          selected: 'groups',
          onClick: () => {}
        }}
        addingMenuProps={{
          items: [],
          onClick: (item: string) => {
            setIsOpen(true);
          }
        }}
      />
      {isOpen && (
        <WriteModal
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
          onReload={onRefresh}
        />
      )}
    </>
  );
};

export default Toolbar;
