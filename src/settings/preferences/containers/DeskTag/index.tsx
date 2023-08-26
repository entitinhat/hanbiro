import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import TagTable from './TagTable';
import LinkedTicketTable from './LinkedTicketTable';
import LinkedArticleTable from './LinkedArticleTable';
import TagModal from './TagModal';
import { Typography, useTheme } from '@mui/material';

interface DeskTagProps {}

const DeskTag = (props: DeskTagProps) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [tableCurrent, setTableCurrent] = useState('Tag');
  const [currentTag, setCurrentTag] = useState({
    id: '',
    name: ''
  });

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleSetTableGeneral = (): void => {
    setTableCurrent('Tag');
  };

  const setTypeOfViewByTag = (name: string) => {
    name === 'Ticket' ? setTableCurrent('Ticket') : setTableCurrent('Article');
  };

  return (
    <>
      {tableCurrent === 'Tag' ? (
        <Box sx={{ border: `1px solid ${theme.palette.divider}` }}>
          <Box sx={{ padding: '20px', width: '100%', borderBottom: `1px solid ${theme.palette.divider}` }}>
            <Typography variant="h5">{t('ncrm_generalsetting_preferrences_desk_tags')}</Typography>
          </Box>
          <TagTable
            onChangeViewTag={(id, name) =>
              setCurrentTag({
                id: id,
                name: name
              })
            }
            onChangeViewType={(type) => setTypeOfViewByTag(type)}
          />
        </Box>
      ) : tableCurrent === 'Ticket' ? (
        <LinkedTicketTable action={open} tag={currentTag} onChangeState={handleSetTableGeneral} />
      ) : (
        <LinkedArticleTable action={open} tag={currentTag} onChangeState={handleSetTableGeneral} />
      )}
      {open && <TagModal action={open} onChangeState={handleClose} tag={{ id: '', name: '' }}></TagModal>}
    </>
  );
};

export default DeskTag;
