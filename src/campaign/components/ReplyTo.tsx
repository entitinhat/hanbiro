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

interface ReplyToProps {
  value: any;
  onChange: (newVal: any) => void;
}

const ReplyTo = (props: ReplyToProps) => {
  const { value, onChange } = props;
  const { t } = useTranslation();

  const defaultValue = {
    type: CAMPAIGN_SENDER_SINGLE, //or 'schedule
    emails: ['']
  };
  const [replyValue, setReplyValue] = useState(defaultValue);

  //init data
  useEffect(() => {
    if (value) {
      if (JSON.stringify(value) !== JSON.stringify(replyValue)) {
        setReplyValue(value);
      }
    } else {
      setReplyValue(defaultValue);
    }
  }, []);

  //new sender
  const handleNewSender = () => {
    const newReply: any = { ...replyValue };
    newReply.emails.push('');
    setReplyValue(newReply);
    //callback
    onChange && onChange(newReply);
  };

  //remove sender
  const handleRemoveSender = (index: number) => {
    const newReply: any = { ...replyValue };
    newReply.emails.splice(index, 1);
    setReplyValue(newReply);
    //callback
    onChange && onChange(newReply);
  };

  //value change
  const handleValueChange = (keyName: any, keyValue: any) => {
    const newReply: any = { ...replyValue };
    newReply[keyName] = keyValue;
    setReplyValue(newReply);
    //callback
    onChange && onChange(newReply);
  };

  //value change
  const handleEmailValueChange = (index: number, keyValue: string) => {
    const newReply: any = { ...replyValue };
    newReply.emails[index] = keyValue;
    setReplyValue(newReply);
    //callback
    onChange && onChange(newReply);
  };

  return (
    <Box sx={{ p: 0 }}>
      <FormControl sx={{ mr: 'auto' }}>
        <RadioGroup
          value={replyValue.type}
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
        <Grid item xs={12} lg={12}>
          <Typography>Email Address</Typography>
        </Grid>
        {replyValue.emails.length === 0 && (
          <Grid item xs={12} lg={12}>
            <NoData />
          </Grid>
        )}
        {replyValue.emails.map((_item: string, index: number) => (
          <Fragment key={index}>
            <Grid item xs={12} lg={12}>
              <Stack direction={'row'} alignItems="center">
                <TextField fullWidth value={_item} onChange={(e) => handleEmailValueChange(index, e.target.value)} />
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

export default ReplyTo;
