import React from 'react';

import { List } from '@mui/material';

import { User } from '@base/types/user';
import UserAutoComplete from '@sign-in/containers/UserAutoComplete';
import NoData from '@base/components/@hanbiro/NoData';
import Item from './Item';

interface AssignRepContainerProps {
  items: User[];
  onAssign?: any;
  onDelete?: any;
  onRefetch?: any;
}

const AssignRepContainer = (props: AssignRepContainerProps) => {
  const { items = [], onDelete, onAssign, onRefetch } = props;

  const handleAssign = (user: User) => {
    onAssign && onAssign(user);
  };

  const handleDelete = (user: User) => {
    onDelete && onDelete(user);
  };

  return (
    <>
      {items?.length ? (
        <List sx={{ p: 0 }}>
          {items?.map(
            (item: User, index: number) =>
              item && <Item key={index} divider={index < items?.length - 1} item={item} onDelete={handleDelete} />
          )}
        </List>
      ) : (
        <NoData icon={'users'} iconType={'custom'} />
      )}
      <UserAutoComplete
        single={true}
        onChange={(user) => {
          handleAssign(user as User);
        }}
      />
    </>
  );
};

export default AssignRepContainer;
