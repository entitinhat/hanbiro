import _ from 'lodash';
import { useState } from 'react';

import { CloseRounded, DoneRounded, ModeEditRounded, RemoveRounded } from '@mui/icons-material';
import { IconButton, Stack, TableCell, TableRow, TextField, Typography } from '@mui/material';
import useTaskTemplateLinkMutation from '@project/hooks/useTemplateLinkMutation';
import { Link } from '@project/types/task';

interface LinkItemProps {
  mode: 'edit' | 'view';
  menuSourceId?: string;
  item: Link;
  handleChange: (val: Link) => void;
  handleRemove: (id: string, newFlag: boolean) => void;
}

function LinkItem(props: LinkItemProps) {
  const { item, mode, handleChange, handleRemove, menuSourceId } = props;
  const [selectedItem, setSelectedItem] = useState<Link | null>(mode == 'view' && item.new ? item : null);

  const onChange = (success: boolean) => {
    let newItem = _.clone(item);
    setSelectedItem(null);
    handleChange && handleChange({ ...newItem, new: false });
  };

  const {
    mAddTaskLinkTemplate: { mutate: addTaskLink },
    mUpdateTaskLinkTemplate: { mutate: updateTaskLink }
  } = useTaskTemplateLinkMutation({ id: menuSourceId!!, onChange });

  const handleValueChange = (type: 'title' | 'url', val: string) => {
    let newItem = _.clone(item);

    if (type == 'title') {
      newItem = { ...newItem, title: val };
    } else {
      newItem = { ...newItem, url: val };
    }
    handleChange && handleChange(newItem);
  };

  const onEdit = () => {
    setSelectedItem(item);
  };

  const onSave = () => {
    if (item.new) {
      addTaskLink({
        id: menuSourceId,
        link: {
          id: item.id,
          title: item.title,
          url: item.url
        }
      });
    } else {
      updateTaskLink({
        id: menuSourceId,
        link: {
          id: item.id,
          title: item.title,
          url: item.url
        }
      });
    }
  };

  const onClose = () => {
    if (item.new) {
      handleRemove && handleRemove(item.id, true);
    } else {
      handleChange && handleChange(selectedItem as Link);
      setSelectedItem(null);
    }
  };

  return (
    <>
      <TableRow
        sx={{
          '&:hover': { bgcolor: 'transparent !important' },
          '> .MuiTableCell-root:first-of-type': { p: 1 },
          '> .MuiTableCell-root:last-of-type': { p: 1 }
        }}
      >
        <TableCell align="center">
          {mode == 'edit' || selectedItem ? (
            <TextField
              size="small"
              fullWidth
              autoComplete="off"
              value={item.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleValueChange('title', e.target.value)}
            />
          ) : (
            <Typography>{item.title}</Typography>
          )}
        </TableCell>
        <TableCell align="center">
          <Stack spacing={1} direction="row" alignItems="center" justifyContent="center">
            {mode == 'edit' || selectedItem ? (
              <TextField
                size="small"
                fullWidth
                autoComplete="off"
                value={item.url}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleValueChange('url', e.target.value)}
              />
            ) : (
              <Typography>{item.url}</Typography>
            )}
          </Stack>
        </TableCell>
        <TableCell align="center">
          <Stack direction="row" spacing={0.5} alignItems="center">
            {mode == 'view' && !selectedItem && (
              <IconButton size="small" color="primary" onClick={onEdit}>
                <ModeEditRounded sx={{ fontSize: 18 }} />
              </IconButton>
            )}
            {selectedItem ? (
              <>
                <IconButton size="small" color="success" onClick={onSave}>
                  <DoneRounded sx={{ fontSize: 18 }} />
                </IconButton>
                <IconButton size="small" color="secondary" onClick={onClose}>
                  <CloseRounded sx={{ fontSize: 18 }} />
                </IconButton>
              </>
            ) : (
              <IconButton size="small" color="error" onClick={() => handleRemove(item.id, false)}>
                <RemoveRounded sx={{ fontSize: 18 }} />
              </IconButton>
            )}
          </Stack>
        </TableCell>
      </TableRow>
    </>
  );
}

export default LinkItem;
