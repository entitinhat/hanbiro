import { Box, Button, Grid, IconButton, InputLabel, TextField, Typography, useTheme } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Phone } from '../../types';
import { USER_ADD_PHONE, USER_OTHERS_PHONE, USER_PRIMARY_PHONE } from '../../config/constants';
import { useTranslation } from 'react-i18next';

interface UserPhonesProps {
  value: Phone[];
  menuSource: string;
  menuSourceId: string;
  mode?: 'view' | 'write';
  onChange?: (val: Phone[]) => void;
}
const UserPhones = (props: UserPhonesProps) => {
  const { value, menuSource, menuSourceId, mode, onChange } = props;
  const theme = useTheme();
  const { t } = useTranslation();
  const [phones, setPhones] = useState<Phone[]>([]);
  const [primaryPhone, setPrimaryPhone] = useState<Phone>();
  useEffect(() => {
    if (value) {
      setPhones(value);
      setPrimaryPhone(value.find((o: Phone) => o.primary == true));
    }
  }, [value]);

  const onChangeOtherPhone = (newPhone: string, index: number) => {
    // console.log('index', index);
    const nPhones: Phone[] = phones;
    nPhones.splice(index, 1, { number: newPhone });
    // console.log('nPhones:', nPhones);
    setPhones(nPhones);
    onChange && onChange(nPhones);
  };
  const onChangePrimaryPhone = (newPhone: string) => {
    const nPhones: Phone[] = phones;
    const index = nPhones.findIndex((o: Phone) => o.primary == true);
    nPhones.splice(index, 1, { number: newPhone, primary: true });
    setPrimaryPhone({ number: newPhone, primary: true });
    setPhones(nPhones);
    onChange && onChange(nPhones);
  };
  const handleAddPhone = () => {
    const nPhones = [...phones];
    nPhones.push({ number: '' });
    setPhones(nPhones);
    onChange && onChange(nPhones);
  };
  const handleDeleteSub = (index: number) => {
    const nPhones = [...phones];
    nPhones.splice(index, 1);
    setPhones(nPhones);
    onChange && onChange(nPhones);
  };
  // console.log('phones.splice(index, 1, { address: newPhone })', phones.splice(1, 1, { address: 'newPhone' }));
  const UserPhoneMemo = useMemo(() => {
    // console.log('primaryPhone', primaryPhone);
    return (
      <Grid>
        <Grid>
          <InputLabel sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ fontWeight: theme.typography.fontWeightMedium }}>Phone</Typography>
          </InputLabel>
        </Grid>
        <Grid sx={{ display: 'flex', mt: '10px' }}>
          <Typography sx={{ width: '100px', mr: '10px' }} fontSize="small">
            {t(USER_PRIMARY_PHONE)}
          </Typography>
          <Box sx={{ width: '400px' }}>
            {mode == 'write' ? (
              <TextField variant="standard" value={primaryPhone?.number ?? ''} onChange={(e) => onChangePrimaryPhone(e.target.value)} />
            ) : (
              <Typography>{primaryPhone?.number}</Typography>
            )}
          </Box>
        </Grid>
        <Grid sx={{ display: 'flex' }}>
          <Typography sx={{ mr: '10px', mt: '25px', width: '100px' }} fontSize="small">
            {t(USER_OTHERS_PHONE)}
          </Typography>
          <Grid container sx={{ width: '400px' }}>
            {mode == 'write' ? (
              <>
                {phones.map((phone: Phone, indx: number) => {
                  if (phone.primary !== true)
                    return (
                      <Grid key={indx} item xs={12} sx={{ mt: '20px' }}>
                        <TextField
                          variant="standard"
                          defaultValue={phone.number ?? ''}
                          onChange={(e) => onChangeOtherPhone(e.target.value, indx)}
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
                {phones.map((phone: Phone, indx: number) => {
                  if (phone.primary !== true)
                    return (
                      <Grid key={indx} item xs={12} sx={{ mt: '25px' }}>
                        <Typography>{phone.number}</Typography>
                      </Grid>
                    );
                })}
              </>
            )}
            {mode == 'write' && (
              <Button sx={{ mt: '18px', fontSize: 'small' }} onClick={handleAddPhone}>
                {t(USER_ADD_PHONE)}
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    );
  }, [phones, primaryPhone]);
  return <Grid>{UserPhoneMemo}</Grid>;
};
export default UserPhones;
