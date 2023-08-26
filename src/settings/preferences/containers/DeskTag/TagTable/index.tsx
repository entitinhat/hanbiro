import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import NoData from '@base/components/@hanbiro/NoData';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Button from '@mui/material/Button';
import { useGetAllTag } from '@settings/preferences/hooks/desk/useGetAllTag';
import { useTheme } from '@mui/material';
import TagModal from '../TagModal';
import TagItem from './TagItem';

interface TagTable {
  onChangeViewTag: (id: string, name: string) => void;
  onChangeViewType: (type: string) => void;
}

const TagTable: React.FC<TagTable> = (props: TagTable) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [tag, setTag] = useState({
    id: '',
    name: ''
  });
  const [listIds, setListIds] = useState<string[]>([]);

  const { data, isLoading, refetch } = useGetAllTag('');
  const { onChangeViewType, onChangeViewTag } = props;

  // Table Handle
  const handleOpen = () => {
    setTag({ id: '', name: '' });
    setOpen(true);
  };
  const handleClose = (type: string): void => {
    setOpen(false);

    if (type === 'Add' || type === 'Edit') {
      setTimeout(() => {
        refetch();
      }, 500);
    }
  };

  useEffect(() => {
    if (!isLoading && data?.results) {
      const nIds = data.results.map((_tag) => _tag.id);
      setListIds(nIds);
    }
  }, [data]);

  return (
    <Box sx={{ padding: '20px', width: '100%', height: '100%' }}>
      <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="tags table">
          <TableHead sx={{ border: 0, borderBottom: `1px solid ${theme.palette.divider}` }}>
            <TableRow>
              <TableCell sx={{ width: '30%', textTransform: 'capitalize', fontWeight: 'normal', fontSize: '0.95rem' }} align="left">
                {t('ncrm_generalsetting_preferrences_desk_tags')}
              </TableCell>
              <TableCell sx={{ width: '30%', textTransform: 'capitalize', fontWeight: 'normal', fontSize: '0.95rem' }} align="left">
                {t('ncrm_generalsetting_preferences_desk_linked_tickets')}
              </TableCell>
              <TableCell sx={{ width: '30%', textTransform: 'capitalize', fontWeight: 'normal', fontSize: '0.95rem' }} align="left">
                {t('ncrm_generalsetting_preferences_desk_linked_articles')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading && data?.results ? (
              data.results.map((row) => (
                <TagItem
                  key={row.id}
                  tagItem={row}
                  onChangeViewTag={onChangeViewTag}
                  onChangeViewType={onChangeViewType}
                  refetch={refetch}
                />
              ))
            ) : (
              <TableRow>
                <TableCell align="center" colSpan={6}>
                  <NoData />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ pt: '20px', position: 'relative', zIndex: '1', borderTop: `1px solid ${theme.palette.divider}` }}>
        <Button variant="contained" size="medium" onClick={handleOpen}>
          {`+ ${t('ncrm_generalsetting_personalize_add_another_line')}`}
        </Button>
      </Box>
      {open && <TagModal action={open} onChangeState={handleClose} tag={tag}></TagModal>}
    </Box>
  );
};

export default TagTable;
