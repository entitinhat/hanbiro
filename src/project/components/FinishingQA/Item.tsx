import _ from 'lodash';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

import { removeItemAtIndex, replaceItemAtIndex } from '@base/utils/helpers/arrayUtils';
import { Add, CloseRounded, DoneRounded, ModeEditRounded, RemoveRounded } from '@mui/icons-material';
import { Box, Button, IconButton, Stack, TableCell, TableRow, TextField, Typography } from '@mui/material';
import useQaMutation from '@project/hooks/useQaMutation';
import { FinishingQA, QAType } from '@project/types/task';
import React from 'react';

interface FinishingQAItemProps {
  mode: 'edit' | 'view';
  type: QAType;
  menuSourceId?: string;
  item: FinishingQA;
  handleChange: (val: FinishingQA) => void;
  handleRemove: (id: string, newFlag: boolean) => void;
}

function FinishingQAItem(props: FinishingQAItemProps) {
  const { t } = useTranslation();
  const { item, mode, handleChange, handleRemove, menuSourceId, type } = props;
  const [selectedItem, setSelectedItem] = useState<FinishingQA | null>(mode == 'view' && item.new ? item : null);

  const onChange = (success: boolean) => {
    let newItem = _.clone(item);
    setSelectedItem(null);
    handleChange && handleChange({ ...newItem, new: false });
  };

  const {
    mAddQa: { mutate: addQa },
    mUpdateQa: { mutate: updateQa }
  } = useQaMutation({ id: menuSourceId!!, type, onChange });

  const handleSubjectChange = (val: string) => {
    let newItem = _.clone(item);
    newItem = { ...newItem, subject: val };
    handleChange && handleChange(newItem);
  };

  const handleTitleChange = (id: string, val: string) => {
    const findIndex = item.checklist.findIndex((v) => v.id == id);
    const findData = { ...item.checklist[findIndex], title: val };
    const newChecklist = replaceItemAtIndex(item.checklist, findIndex, findData);
    handleChange && handleChange({ ...item, checklist: newChecklist });
  };

  const handleRemoveChecklist = (id: string) => {
    const findIndex = item.checklist.findIndex((v) => v.id == id);
    const newChecklist = removeItemAtIndex(item.checklist, findIndex);
    handleChange && handleChange({ ...item, checklist: newChecklist });
  };

  const handleAddChecklist = () => {
    handleChange &&
      handleChange({
        ...item,
        checklist: [
          ...item.checklist,
          {
            id: uuidv4(),
            title: '',
            description: ''
          }
        ]
      });
  };

  const onEdit = () => {
    setSelectedItem(item);
  };

  const onSave = () => {
    if (item.new) {
      addQa({
        id: menuSourceId,
        qa: {
          id: item.id,
          subject: item.subject,
          checklist: item.checklist
        }
      });
    } else {
      updateQa({
        id: menuSourceId,
        qa: {
          id: item.id,
          subject: item.subject,
          checklist: item.checklist
        }
      });
    }
  };

  const onClose = () => {
    if (item.new) {
      handleRemove && handleRemove(item.id, true);
    } else {
      handleChange && handleChange(selectedItem as FinishingQA);
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
        <TableCell align="center" sx={{ verticalAlign: 'top' }}>
          {mode == 'edit' || selectedItem ? (
            <TextField
              size="small"
              fullWidth
              autoComplete="off"
              value={item.subject}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSubjectChange(e.target.value)}
            />
          ) : (
            <Typography>{item.subject}</Typography>
          )}
        </TableCell>
        <TableCell align="center">
          <Stack spacing={1} alignItems="center">
            {item.checklist?.map((v) => {
              return (
                <React.Fragment key={v.id}>
                  {mode == 'edit' || selectedItem ? (
                    <Stack direction="row" spacing={0.5} sx={{ width: '100%' }}>
                      <TextField
                        size="small"
                        fullWidth
                        autoComplete="off"
                        value={v.title}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTitleChange(v.id, e.target.value)}
                      />
                      <IconButton size="small" color="error" onClick={() => handleRemoveChecklist(v.id)}>
                        <RemoveRounded sx={{ fontSize: 18 }} />
                      </IconButton>
                    </Stack>
                  ) : (
                    <Typography>{v.title}</Typography>
                  )}
                </React.Fragment>
              );
            })}
          </Stack>
          <Box sx={{ display: 'flex', flexDirction: 'flex-start', mt: 1 }}>
            <Button variant="text" size="small" color="primary" startIcon={<Add />} onClick={handleAddChecklist}>
              {t('project_finishing_qa_checklist_add')}
            </Button>
          </Box>
        </TableCell>
        <TableCell align="center" sx={{ verticalAlign: 'top' }}>
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

export default FinishingQAItem;
