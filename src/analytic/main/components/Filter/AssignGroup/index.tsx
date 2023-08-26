import React, {useEffect, useState} from 'react';
import {Box} from "@mui/material";
import {GroupTreeAutocomplete} from "@base/components/@hanbiro/DirectoryGroup";
import {Group} from "@base/types/user";
import {isArray} from "lodash";

export interface AssignGroupProps {
  onChange?: (q: string) => void;
}

const AssignGroup = ({onChange}: AssignGroupProps) => {
  const fixedGroups: Group[] = [{id: 'all', name: 'All Groups'}];

  const [groups, setGroups] = useState<Group[]>([]);
  const [viewGroups, setViewGroups] = useState<Group[]>([]);

  useEffect(() => {
    setViewGroups(groups.length === 0 ? fixedGroups : groups);
    onChange && onChange(isArray(groups) ? groups.map((g) => g.id).join(',') : '');
  }, [groups]);

  const handleOnChange = (groups: Group[]) => {
    setGroups(!!groups.length ? groups.filter((g) => g.id !== 'all') : []);
  }

  return (
    <Box sx={{
      '& .MuiAutocomplete-inputRoot': {
        py: '3px!important',
        maxWidth: '300px'
      }
    }}>
      <GroupTreeAutocomplete
        fixedValue={fixedGroups}
        value={viewGroups}
        sx={{minWidth: '300px', maxWidth: '300px'}}
        onChange={handleOnChange}
      />
    </Box>
  );
};

export default AssignGroup;