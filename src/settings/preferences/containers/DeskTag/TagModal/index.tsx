import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import { useTheme } from '@mui/material';
import { useDeskTagMutation } from '@settings/preferences/hooks/desk/useDeskTagMutation';
import { generateUUID } from '@base/utils/helpers';
import { useState } from 'react';
import { IdName } from '@settings/assignment-rule/rule/services/ticket-service';
import { useTranslation } from 'react-i18next';

const style = {
  position: 'absolute' as 'absolute',
  width: '500px',
  top: '0',
  bottom: '0',
  right: '0',
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  display: 'flex',
  flexDirection: 'column'
};

interface TagModal {
  action: boolean;
  tag: IdName;
  onChangeState: (nState: string) => void;
}
const TagModal = (props: TagModal) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const { mUpdate, mAdd } = useDeskTagMutation();
  const { action, onChangeState, tag } = props;
  const [tagName, setTagName] = useState(tag.name);

  const handleClose = () => {
    setTagName('');
    onChangeState('Cancel');
  };

  const handleSave = (id: string) => {
    if (tag.id === '') {
      let tags = tagName.split(',');
      if (tags[0] != '') {
        for (const pTag in tags) {
          let tag = {
            id: generateUUID(),
            name: tags[pTag]
          };
          mAdd.mutate({ tag });
        }
        setTagName('');
        onChangeState('Add');
      }
    } else if (tag.id !== '') {
      let tag = {
        id: id,
        name: tagName
      };
      mUpdate.mutate({ tag });
      setTagName('');
      onChangeState('Edit');
    }
  };

  return (
    <Drawer
      anchor="right"
      open={action}
      // sx={{ zIndex: 2002 }}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: '500px'
        }
      }}
    >
      <Box sx={style}>
        <Typography
          variant="h4"
          sx={{
            height: '61px',
            display: 'flex',
            alignItems: 'center',
            borderBottom: '1px solid',
            borderColor: theme.palette.divider,
            p: '0 20px 0 25px'
          }}
          align="left"
        >
          {tag.id === '' ? t('ncrm_generalsetting_preferrences_desk_add_tags') : t('ncrm_generalsetting_preferrences_desk_edit_tags')}
        </Typography>

        <Box
          sx={{
            height: 'calc(100vh - 130px)',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Typography
            variant="h6"
            sx={{
              display: 'flex',
              alignItems: 'center',
              p: '10px'
            }}
            align="left"
          >
            {t('ncrm_generalsetting_preferrences_desk_tags')}
            <Box component="span" sx={{ ml: '5px', color: 'error.main' }}>
              *
            </Box>
          </Typography>

          <TextField
            label=""
            variant="outlined"
            fullWidth
            size="medium"
            defaultValue={tag.name}
            // disabled={type === 'Delete' ? true : false}
            placeholder={
              tag.id === ''
                ? (t('ncrm_generalsetting_preferrences_desk_seperate') as string)
                : (t('ncrm_generalsetting_preferrences_desk_enter_tag_name') as string)
            }
            sx={{ width: '100%', p: '0 10px' }}
            onChange={(event) => setTagName(event.target.value)}
          />
        </Box>

        <Box
          sx={{
            float: 'right',
            mt: 2,
            alignSelf: 'flex-end',
            height: '60px',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            p: '0px 10px 10px 10px',
            width: '100%',
            borderTop: '1px solid',
            borderColor: theme.palette.divider
          }}
        >
          <Button size="small" variant="outlined" color="secondary" sx={{ mr: 2 }} onClick={handleClose}>
            {t('ncrm_common_btn_cancel')}
          </Button>
          <Button size="small" variant="contained" color="primary" onClick={() => handleSave(tag.id)} disabled={tagName === ''}>
            {t('ncrm_common_btn_save')}
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default TagModal;
