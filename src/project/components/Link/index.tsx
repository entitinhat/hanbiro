import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

import { removeItemAtIndex, replaceItemAtIndex } from '@base/utils/helpers/arrayUtils';
import { Add } from '@mui/icons-material';
import { Box, Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme } from '@mui/material';
import useTaskTemplateLinkMutation from '@project/hooks/useTemplateLinkMutation';
import { Link } from '@project/types/task';

import LinkItem from './Item';

interface LinkWriteProps {
  mode: 'edit' | 'view';
  menuSourceId?: string;
  value: Link[];
  onChange?: (val: Link[]) => void;
}

function LinkWrite(props: LinkWriteProps) {
  console.log('linkWrite', props);
  const { value, onChange, mode = 'edit', menuSourceId } = props;
  const [links, setLinks] = useState(value);
  const theme = useTheme();
  const { t } = useTranslation();
  const {
    mDeleteTaskLinkTemplate: { mutate: deleteTaskLink }
  } = useTaskTemplateLinkMutation({ id: menuSourceId!! });

  const handleAdd = () => {
    const newItem = [
      ...links,
      {
        id: uuidv4(),
        title: '',
        url: '',
        new: true
      }
    ];
    setLinks(newItem);
    onChange && onChange(newItem);
  };

  useEffect(() => {
    if (value) {
      if (JSON.stringify(value) !== JSON.stringify(links)) {
        setLinks(value);
      }
    }
  }, [value]);

  const handleChange = (val: Link) => {
    const findIndex = links.findIndex((_v) => _v.id == val.id);
    const newItem = replaceItemAtIndex(links, findIndex, val);
    setLinks(newItem);
    onChange && onChange(newItem);
  };

  const onRemove = (id: string) => {
    const findIndex = links.findIndex((v) => v.id == id);
    const newItem = removeItemAtIndex(links, findIndex);
    setLinks(newItem);
    onChange && onChange(newItem);
  };

  const handleRemove = (id: string, newFlag: boolean) => {
    onRemove(id);
    if (!newFlag && mode == 'view') {
      // interact with remove api
      deleteTaskLink({ id: menuSourceId, refId: id });
    }
  };

  return (
    <Stack spacing={2} sx={{ mt: 1, mx: 1, width: '100%' }}>
      <TableContainer component={Paper} sx={{ boxShadow: 'none', border: `1px solid ${theme.palette.divider}` }}>
        <Table size="small">
          <TableHead sx={{ border: 'none', borderBottom: `1px solid ${theme.palette.divider}` }}>
            <TableRow>
              <TableCell align="center" component="th" sx={{ width: '35%', p: 0.5, textTransform: 'capitalize' }}>
                {'project_link_title'}
              </TableCell>
              <TableCell align="center" component="th" sx={{ width: '60%', p: 0.5, textTransform: 'capitalize' }}>
                {t('project_link_url')}
              </TableCell>
              <TableCell sx={{ width: '5%', p: 0.5 }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {links?.map((item) => {
              return (
                <LinkItem
                  key={item.id}
                  item={item}
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
          {t('project_link_add')}
        </Button>
      </Box>
    </Stack>
  );
}

export default LinkWrite;
