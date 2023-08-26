import { Fragment, useEffect, useState } from 'react';

//third-party
import { useTranslation } from 'react-i18next';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { Checkbox, FormControl, FormControlLabel, Radio, RadioGroup, Stack } from '@mui/material';

//menu
import { CAMPAIGN_SENDER_OWNER, CAMPAIGN_SENDER_SINGLE } from '@campaign/config/constants';
import { AddOutlined, DeleteOutline } from '@mui/icons-material';
import NoData from '@base/components/@hanbiro/NoData';
import IconButton from '@base/components/@extended/IconButton';

interface SenderProps {
  value: any;
  onChange: (newVal: any) => void;
}

const Sender = (props: SenderProps) => {
  const { value, onChange } = props;
  const { t } = useTranslation();

  const defaultValue = {
    type: CAMPAIGN_SENDER_SINGLE, //or 'schedule
    emails: [{ name: '', email: '' }]
  };
  const [senderValue, setSenderValue] = useState(defaultValue);

  //init data
  useEffect(() => {
    if (value) {
      if (JSON.stringify(value) !== JSON.stringify(senderValue)) {
        setSenderValue(value);
      }
    } else {
      setSenderValue(defaultValue);
    }
  }, []);

  //new sender
  const handleNewSender = () => {
    const newSender: any = { ...senderValue };
    newSender.emails.push({ name: '', email: '' });
    setSenderValue(newSender);
    //callback
    onChange && onChange(newSender);
  };

  //remove sender
  const handleRemoveSender = (index: number) => {
    const newSender: any = { ...senderValue };
    newSender.emails.splice(index, 1);
    setSenderValue(newSender);
    //callback
    onChange && onChange(newSender);
  };

  //value change
  const handleValueChange = (keyName: string, keyValue: string) => {
    const newSender: any = { ...senderValue };
    newSender[keyName] = keyValue;
    setSenderValue(newSender);
    //callback
    onChange && onChange(newSender);
  };

  //email change
  const handleEmailValueChange = (index: number, keyName: string, keyValue: string) => {
    const newSender: any = { ...senderValue };
    newSender.emails[index][keyName] = keyValue;
    setSenderValue(newSender);
    //callback
    onChange && onChange(newSender);
  };

  return (
    <Box sx={{ p: 0 }}>
      <FormControl sx={{ mr: 'auto' }}>
        <RadioGroup
          value={senderValue.type}
          onChange={(e: any, v: any) => {
            handleValueChange('type', v);
          }}
          sx={{ display: 'flex', flexDirection: 'row' }}
        >
          <FormControlLabel control={<Radio />} value={CAMPAIGN_SENDER_SINGLE} label={t('Single address')} />
          <FormControlLabel control={<Radio />} value={CAMPAIGN_SENDER_OWNER} label={t('Owner')} />
        </RadioGroup>
      </FormControl>
      <Grid container alignItems={'center'} sx={{ mb: 1 }} spacing={1}>
        <Grid item xs={6} lg={6}>
          <Typography>Sender Name</Typography>
        </Grid>
        <Grid item xs={6} lg={6}>
          <Typography>Email Address</Typography>
        </Grid>
        {senderValue.emails.length === 0 && (
          <Grid item xs={12} lg={12}>
            <NoData />
          </Grid>
        )}
        {senderValue.emails.map((_item: any, index: number) => (
          <Fragment key={index}>
            <Grid item xs={6} lg={6}>
              <TextField fullWidth value={_item.name} onChange={(e) => handleEmailValueChange(index, 'name', e.target.value)} />
            </Grid>
            <Grid item xs={6} lg={6}>
              <Stack direction={'row'} alignItems="center">
                <TextField fullWidth value={_item.email} onChange={(e) => handleEmailValueChange(index, 'email', e.target.value)} />
                {/* <IconButton color="error" onClick={() => handleRemoveSender(index)}>
                  <DeleteOutline />
                </IconButton> */}
              </Stack>
            </Grid>
          </Fragment>
        ))}
        {/* <Grid item xs={12} lg={12}>
          <Button variant="text" startIcon={<AddOutlined />} onClick={handleNewSender}>
            Add
          </Button>
        </Grid> */}
      </Grid>
    </Box>
  );
};

export default Sender;
