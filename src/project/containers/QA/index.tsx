import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

import IconButton from '@base/components/@extended/IconButton';
import Dropdown from '@base/components/@hanbiro/Dropdown';
import { Add, CheckCircleOutlineRounded, CheckCircleRounded, MoreHorizRounded, RemoveRounded } from '@mui/icons-material';
import { Box, Button, Divider, Stack, TextField, Typography, useTheme } from '@mui/material';
import { FinishingQA } from '@project/types/task';

const dropdownItems = [
  { label: 'Edit', value: 'edit' },
  { label: 'Delete', value: 'delete' }
];

interface FinishingQAProps {
  value: FinishingQA[];
}

function FinishingQA(props: FinishingQAProps) {
  const { t } = useTranslation();
  const { value: item } = props;
  const theme = useTheme();
  const [newFinishingQa, setNewFinishingQa] = useState<FinishingQA | null>(null);

  const handleAdd = () => {
    setNewFinishingQa({
      id: uuidv4(),
      subject: '',
      checklist: [
        {
          id: uuidv4(),
          title: '',
          description: ''
        }
      ],
      new: true
    });
  };

  const handleChecklistAdd = (id: string) => {};

  const handleSubjectChange = (val: string) => {};

  const handleTitleChange = (id: string, val: string) => {};

  const handleRemoveChecklist = (id: string) => {};

  const handleOnCancel = () => {};

  const handleOnSave = () => {};

  const handleDone = () => {};

  const renderWrite = (item: FinishingQA) => {
    return (
      <Stack spacing={1} sx={{ p: 1 }}>
        <Stack spacing={1}>
          <Typography>{t('project_finishing_qa_subject')}</Typography>
          <TextField
            fullWidth
            autoComplete="off"
            value={item.subject}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSubjectChange(e.target.value)}
          />
        </Stack>
        <Stack spacing={1}>
          <Typography>{t('project_finishing_qa_checklist')}</Typography>
          {item.checklist.map((v) => {
            return (
              <Stack direction="row" alignItems="center" spacing={0.5} sx={{ width: '100%' }}>
                <TextField
                  fullWidth
                  autoComplete="off"
                  value={v.title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTitleChange(v.id, e.target.value)}
                />
                <IconButton size="small" color="error" onClick={() => handleRemoveChecklist(v.id)}>
                  <RemoveRounded />
                </IconButton>
              </Stack>
            );
          })}
        </Stack>
        <Box sx={{ display: 'flex', flexDirction: 'flex-start' }}>
          <Button variant="text" size="small" color="primary" startIcon={<Add />} onClick={() => handleChecklistAdd(item.id)}>
            {t('project_finishing_qa_checklist_add')}
          </Button>
        </Box>
        <Stack spacing={2} sx={{ py: 2 }} direction="row" alignItems="center" justifyContent="flex-end">
          <Button variant="outlined" color="secondary" size="small" onClick={handleOnCancel}>
            Cancel
          </Button>
          <Button variant="contained" size="small" onClick={handleOnSave}>
            Save
          </Button>
        </Stack>
      </Stack>
    );
  };

  return (
    <Box sx={{ px: 1, py: 0.5, mb: 1, borderRadius: 1, border: '1px solid', borderColor: theme.palette.divider }}>
      <Stack spacing={1} direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 1 }}>
        <Typography variant="subtitle1" color="text.primary" sx={{ textTransform: 'capitalize' }}>
          Finishing QA
        </Typography>
        <IconButton size="small" color="primary" onClick={handleAdd}>
          <Add />
        </IconButton>
      </Stack>
      <Divider />
      {newFinishingQa && (
        <>
          {renderWrite(newFinishingQa)}
          <Divider />
        </>
      )}
      <Stack spacing={1} sx={{ width: '100%', m: 0, p: 1 }}>
        {item?.map((v, index) => {
          return (
            <React.Fragment key={v.id}>
              <Stack spacing={1.5} sx={{ p: 1 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography variant="subtitle1">{v.subject}</Typography>
                  <Dropdown size="small" icon={<MoreHorizRounded sx={{ fontSize: 18 }} />} items={dropdownItems} minWidth={120} />
                </Stack>
                <Stack spacing={1}>
                  {v.checklist?.map((_v) => {
                    return (
                      <Stack key={_v.id} spacing={0.5} direction="row" alignItems="center">
                        <IconButton size="small" onClick={handleDone}>
                          {_v.done ? <CheckCircleRounded sx={{ fontSize: 18 }} /> : <CheckCircleOutlineRounded sx={{ fontSize: 18 }} />}
                        </IconButton>
                        <Typography>{_v.title}</Typography>
                      </Stack>
                    );
                  })}
                </Stack>
              </Stack>
              <Box sx={{ display: 'flex', flexDirction: 'flex-start' }}>
                <Button variant="text" size="small" color="primary" startIcon={<Add />} onClick={() => handleChecklistAdd(v.id)}>
                  {t('project_finishing_qa_checklist_add')}
                </Button>
              </Box>
              {index % 2 == 0 && <Divider />}
            </React.Fragment>
          );
        })}
      </Stack>
    </Box>
  );
}

export default FinishingQA;
