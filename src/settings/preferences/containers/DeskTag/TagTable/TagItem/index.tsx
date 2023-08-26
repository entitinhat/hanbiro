import { Box, TableCell, TableRow, TextField, Tooltip, useTheme } from '@mui/material';
import { DeleteOutlineOutlined } from '@mui/icons-material';
import IconButton from '@base/components/@extended/IconButton';
import { Tag } from '@settings/preferences/types/desk/tag';
import { useState } from 'react';
import { useDeskTagMutation } from '@settings/preferences/hooks/desk/useDeskTagMutation';
import { useTranslation } from 'react-i18next';
import TagModal from '../../TagModal';

interface RenderTagProps {
  tagItem: Tag;
  onChangeViewTag: (id: string, name: string) => void;
  onChangeViewType: (type: string) => void;
  refetch: () => void;
}

const TagItem = (props: RenderTagProps) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { mUpdate, mDelete } = useDeskTagMutation();
  const { tagItem, onChangeViewTag, onChangeViewType, refetch } = props;
  const [tagName, setTagName] = useState(tagItem.name);

  const handleViewTicket = (id: string, name: string, type: string) => {
    onChangeViewTag(id, name);
    onChangeViewType(type);
  };

  const handleSave = (id: string) => {
    if (tagName !== tagItem.name) {
      let tag = {
        id: id,
        name: tagName
      };

      mUpdate.mutate({ tag });
      setTimeout(() => {
        refetch();
      }, 500);
    }
  };

  const handleDelete = (id: string) => {
    mDelete.mutate({ ids: [id] });
    setTimeout(() => {
      refetch();
    }, 500);
  };

  const handleClose = (type: string): void => {
    setOpen(false);
  };

  return (
    <>
      {tagItem && (
        <TableRow
          sx={{
            '&:last-child td, &:last-child th': {
              border: 0
            },
            '&:hover': {
              backgroundColor: 'transparent !important',
              '& .item-option': {
                visibility: 'visible'
              }
            }
          }}
        >
          <TableCell align="left">
            <TextField
              value={tagName}
              variant="outlined"
              placeholder="Type text"
              sx={{
                '& .MuiInputBase-root': { minHeight: '44px' },
                // mt: '5px',
                width: '100%'
              }}
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setTagName(e.target.value)}
              onBlur={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleSave(tagItem.id)}
            />
          </TableCell>
          <TableCell align="left">
            <span
              style={{
                cursor: 'pointer',
                color: theme.palette.primary.main
              }}
              onClick={() => handleViewTicket(tagItem.id, tagItem.name, 'Ticket')}
            >
              {tagItem.linkedTickets}
            </span>
          </TableCell>
          <TableCell align="left" sx={{}}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
              <Box
                sx={{
                  cursor: 'pointer',
                  color: theme.palette.primary.main,
                  display: 'flex',
                  alignItems: 'center'
                }}
                onClick={() => handleViewTicket(tagItem.id, tagItem.name, 'Article')}
              >
                {tagItem.linkedArticles}
              </Box>

              <Box sx={{ flex: '1', display: 'flex', justifyContent: 'flex-end' }}>
                <Tooltip title={t('ncrm_generalsetting_preferences_tooltip_title_delete')} placement="left" disableInteractive>
                  <IconButton onClick={() => handleDelete(tagItem.id)}>
                    <DeleteOutlineOutlined
                      sx={{ cursor: 'pointer', visibility: 'hidden' }}
                      className="item-option"
                      fontSize="small"
                      color="error"
                    />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </TableCell>
        </TableRow>
      )}
      {open && <TagModal action={open} onChangeState={handleClose} tag={tagItem}></TagModal>}
    </>
  );
};

export default TagItem;
