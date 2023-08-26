
import { Box, Button, Grid, IconButton, InputLabel, TextField, Typography, useTheme } from '@mui/material';

import { useEffect, useMemo, useState } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Email } from '../../types';
import { USER_OTHERS_EMAIL, USER_PRIMARY_EMAIL, USER_ADD_EMAIL } from '../../config/constants';
import { useTranslation } from 'react-i18next';

interface UserEmailsProps {
  value: Email[];
  menuSource: string;
  menuSourceId: string;
  mode?: 'view' | 'write';
  onChange?: (val: Email[]) => void;
}
const UserEmails = (props: UserEmailsProps) => {
  const theme = useTheme();
  const { value, menuSource, menuSourceId, mode, onChange } = props;

  const [emails, setEmails] = useState<Email[]>([]);
  const [primaryEmail, setPrimaryEmail] = useState<Email>();
  const {t} = useTranslation()

  useEffect(() => {
    if (value) {
      setEmails(value);
      setPrimaryEmail(value.find((o: Email) => o.primary == true));
    }
  }, [value]);

  const onChangeOtherEmail = (newEmail: string, index: number) => {
    // console.log('index', index);
    const nEmails: Email[] = [...emails];
    nEmails.splice(index, 1, { address: newEmail });
    // console.log('nEmails:', nEmails);
    setEmails(nEmails);
    onChange && onChange(nEmails);
  };
  const onChangePrimaryEmail = (newEmail: string) => {
    const nEmails: Email[] = [...emails];
    const index = nEmails.findIndex((o: Email) => o.primary == true);
    nEmails.splice(index, 1, { address: newEmail, primary: true });
    // console.log('nEmails:', nEmails);
    setPrimaryEmail({ address: newEmail, primary: true });
    setEmails(nEmails);
    onChange && onChange(nEmails);
  };
  const handleAddEmail = () => {
    const nEmails = [...emails];
    nEmails.push({ address: '' });
    setEmails(nEmails);
    onChange && onChange(nEmails);
  };
  const handleDeleteSub = (index: number) => {
    const nEmails = [...emails];
    nEmails.splice(index, 1);
    setEmails(nEmails);
    onChange && onChange(nEmails);
  };

  // console.log('emails.splice(index, 1, { address: newEmail })', emails.splice(1, 1, { address: 'newEmail' }));
  const UserEmailMemo = useMemo(() => {
    // console.log('primaryEmail', primaryEmail);
    return (
      <Grid>
        <Grid>
          <InputLabel sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ fontWeight: theme.typography.fontWeightMedium }}>Email</Typography>
          </InputLabel>
        </Grid>
        <Grid sx={{ display: 'flex', mt: '10px' }}>
          <Typography sx={{ width: '100px', mr: '10px' }} fontSize="small">
           {t(USER_PRIMARY_EMAIL)}
          </Typography>
          <Box sx={{ width: '400px' }}>
            {mode == 'write' ? (
              <TextField variant="standard" value={primaryEmail?.address ?? ''} onChange={(e) => onChangePrimaryEmail(e.target.value)} />
            ) : (
              <Typography>{primaryEmail?.address}</Typography>
            )}
          </Box>
        </Grid>
        <Grid sx={{ display: 'flex' }}>
          <Typography sx={{ mr: '10px', mt: '25px', width: '100px' }} fontSize="small">
            {t(USER_OTHERS_EMAIL)}
          </Typography>
          <Grid container sx={{ width: '400px' }}>
            {mode == 'write' ? (
              <>
                {emails.map((email: Email, indx: number) => {
                  if (email.primary !== true)
                    return (
                      <Grid key={indx} item xs={12} sx={{ mt: '20px' }}>
                        <TextField
                          variant="standard"
                          value={email.address ?? ''}
                          onChange={(e) => onChangeOtherEmail(e.target.value, indx)}
                        />
                        <IconButton sx={{ ml: '10px' }} onClick={() => handleDeleteSub(indx)}>
                          <DeleteOutlineIcon color="error" fontSize="small" />
                        </IconButton>
                      </Grid>
                    );
                })}
              </>
            ) : (
              <>
                {emails.map((email: Email, indx: number) => {
                  if (email.primary !== true)
                    return (
                      <Grid key={indx} item xs={12} sx={{ mt: '25px' }}>
                        <Typography>{email.address}</Typography>
                      </Grid>
                    );
                })}
              </>
            )}
            {mode == 'write' && (
              <Button sx={{ mt: '18px', fontSize: 'small' }} onClick={handleAddEmail}>
                {t(USER_ADD_EMAIL)}
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    );
  }, [emails, primaryEmail]);
  return <Grid>{UserEmailMemo}</Grid>;
};
export default UserEmails;
