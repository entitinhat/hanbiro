import React from 'react';

import { ListItem, ListItemAvatar, ListItemText, IconButton } from '@mui/material';

import { DeleteOutlined } from '@ant-design/icons';

import { User } from '@base/types/user';
import HanAvatar from '@base/components/@hanbiro/HanAvatar';

interface Props {
  item: User;
  divider: boolean;
  onDelete?: (params: User) => void;
}

const Item = (props: Props) => {
  const { item, divider, onDelete } = props;

  return (
    <ListItem
      // sx={{ p: 0 }}
      // divider={divider}
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          color="error"
          onClick={() => {
            onDelete && onDelete(item);
          }}
        >
          <DeleteOutlined />
        </IconButton>
      }
    >
      <ListItemAvatar sx={{ minWidth: '40px' }}>
        <HanAvatar name={item?.name as string} />
      </ListItemAvatar>
      <ListItemText primary={item?.name} secondary="" />
    </ListItem>
  );
};

export default Item;
