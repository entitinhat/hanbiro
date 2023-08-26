import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

import { removeItemAtIndex, replaceItemAtIndex } from '@base/utils/helpers/arrayUtils';
import { Add } from '@mui/icons-material';
import { Box, Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme } from '@mui/material';
import useQaMutation from '@project/hooks/useQaMutation';
import { FinishingQA, QAType } from '@project/types/task';

import FinishingQAItem from './Item';

interface FinishingQAWriteProps {
  mode: 'edit' | 'view';
  type: QAType;
  menuSourceId?: string;
  value: FinishingQA[];
  onChange?: (val: FinishingQA[]) => void;
}

function FinishingQAWrite(props: FinishingQAWriteProps) {
  const { value, onChange, mode = 'edit', menuSourceId, type } = props;
  const [finishingQa, setFinishingQa] = useState(value);
  const theme = useTheme();
  const { t } = useTranslation();

  const {
    mDeleteQa: { mutate: deleteQa }
  } = useQaMutation({ id: menuSourceId!!, type });

  const handleAdd = () => {
    const newItem = [
      ...finishingQa,
      {
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
      }
    ];
    setFinishingQa(newItem);
    onChange && onChange(newItem);
  };

  useEffect(() => {
    if (value) {
      if (JSON.stringify(value) !== JSON.stringify(finishingQa)) {
        setFinishingQa(value);
      }
    }
  }, [value]);

  const handleChange = (val: FinishingQA) => {
    const findIndex = finishingQa.findIndex((_v) => _v.id == val.id);
    const newItem = replaceItemAtIndex(finishingQa, findIndex, val);
    setFinishingQa(newItem);
    onChange && onChange(newItem);
  };

  const onRemove = (id: string) => {
    const findIndex = finishingQa.findIndex((v) => v.id == id);
    const newItem = removeItemAtIndex(finishingQa, findIndex);
    setFinishingQa(newItem);
    onChange && onChange(newItem);
  };

  const handleRemove = (id: string, newFlag: boolean) => {
    onRemove(id);
    if (!newFlag && mode == 'view') {
      // interact with remove api
      deleteQa({ id: menuSourceId, refId: id });
    }
  };

  return (
    <Stack spacing={2} sx={{ mt: 1, mx: 1, width: '100%' }}>
      <TableContainer component={Paper} sx={{ boxShadow: 'none', border: `1px solid ${theme.palette.divider}` }}>
        <Table size="small">
          <TableHead sx={{ border: 'none', borderBottom: `1px solid ${theme.palette.divider}` }}>
            <TableRow>
              <TableCell align="center" component="th" sx={{ width: '35%', p: 0.5, textTransform: 'capitalize' }}>
                {'project_finishing_qa_title'}
              </TableCell>
              <TableCell align="center" component="th" sx={{ width: '60%', p: 0.5, textTransform: 'capitalize' }}>
                {t('project_finishing_qa_checklist')}
              </TableCell>
              <TableCell sx={{ width: '5%', p: 0.5 }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {finishingQa?.map((item) => {
              return (
                <FinishingQAItem
                  key={item.id}
                  item={item}
                  type={type}
                  menuSourceId={menuSourceId}
                  mode={mode}
                  handleChange={handleChange}
                  handleRemove={handleRemove}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', flexDirction: 'flex-start' }}>
        <Button variant="text" size="small" color="primary" startIcon={<Add />} onClick={handleAdd}>
          {t('project_finishing_qa_add')}
        </Button>
      </Box>
    </Stack>
  );
}

export default FinishingQAWrite;
