import React, {useEffect, useState} from 'react';
import {Box} from "@mui/material";
import UserAutoComplete from "@sign-in/containers/UserAutoComplete";
import {isArray} from "lodash";
import {User} from "@base/types/user";

export interface AssignUserProps {
  onChange?: (q: string) => void;
}

const AssignUser = ({onChange}: AssignUserProps) => {
  const fixedUsers: User[] = [{id: 'all', name: 'All Users'}];

  const [users, setUsers] = useState<User[]>([]);
  const [usersView, setUsersView] = useState<User[]>([]);

  useEffect(() => {
    setUsersView(users.length === 0 ? fixedUsers : users);
    onChange && onChange(isArray(users) ? users.map((u) => u.id).join(',') : '');
  }, [users]);

  const handleOnChange = (users: User|User[]|null) => {
    setUsers(isArray(users) ? users.filter((u) => u.id !== 'all') : []);
  }

  return (
    <Box sx={{
      '& .MuiAutocomplete-inputRoot': {
        py: '3px!important',
        maxWidth: '300px'
      },
      '& .MuiAutocomplete-tag': {
        bgcolor: 'primary.lighter',
        border: '1px solid',
        borderColor: 'primary.light',
        '& .MuiSvgIcon-root': {
          color: 'primary.main',
          '&:hover': {
            color: 'primary.dark'
          }
        }
      }
    }}>
      <UserAutoComplete
        fixedValue={fixedUsers}
        size="small"
        value={usersView}
        onChange={handleOnChange}
      />
    </Box>
  );
};

export default AssignUser;