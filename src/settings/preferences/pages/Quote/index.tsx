import { useEffect, useState } from 'react';

//material
import { Box, Grid, Stack } from '@mui/material';

//project
import { MENU_QUOTE } from '@base/config/menus';

//menu
import { useMenuSettings } from '@settings/general/hooks/useMenuSetting';
import Attachment, { QuoteAttachment } from './Attachment';
import CustomerNote, { QuoteCustomerNote } from './CustomerNote';
import OtherSetting from './Other';
import TermCondition, { QuoteTermCondition } from './TermCondition';

export const KEY_QUOTE_TERM_CONDITION = 'terms_conditions';
export const KEY_QUOTE_ATTACHMENT = 'attachments';
export const KEY_QUOTE_CUSTOMER_NOTE = 'customer_notes';
export const KEY_QUOTE_OTHER_SETTING = 'other';

const PreferenceQuote = () => {
  //state
  const [termItems, setTermItems] = useState<QuoteTermCondition[]>([]);
  const [attachItems, setAttachItems] = useState<QuoteAttachment[]>([]);
  const [noteItems, setNoteItems] = useState<QuoteCustomerNote[]>([]);
  const [otherSetting, setOtherSetting] = useState<any>(null);

  //get setting data
  const params = {
    keys: [KEY_QUOTE_TERM_CONDITION, KEY_QUOTE_ATTACHMENT, KEY_QUOTE_CUSTOMER_NOTE, KEY_QUOTE_OTHER_SETTING],
    menus: [MENU_QUOTE]
  };
  const { data: settingPost, isLoading } = useMenuSettings(params);
  //console.log('quote setting', settingPost);

  //set setting data
  useEffect(() => {
    if (settingPost?.data) {
      //term and condition
      const termValue = settingPost.data.find((_ele: any) => _ele.key === KEY_QUOTE_TERM_CONDITION);
      if (termValue) {
        try {
          setTermItems(JSON.parse(termValue.value));
        } catch {
          // console.log('Parse error.');
        }
      }

      //attachment
      const attachmentValue = settingPost.data.find((_ele: any) => _ele.key === KEY_QUOTE_ATTACHMENT);
      if (attachmentValue) {
        try {
          setAttachItems(JSON.parse(attachmentValue.value));
        } catch {
          // console.log('Parse error.');
        }
      }

      //customer notes
      const noteValue = settingPost.data.find((_ele: any) => _ele.key === KEY_QUOTE_CUSTOMER_NOTE);
      if (noteValue) {
        try {
          setNoteItems(JSON.parse(noteValue.value));
        } catch {
          // console.log('Parse error.');
        }
      }

      //other settings
      const otherValue = settingPost.data.find((_ele: any) => _ele.key === KEY_QUOTE_OTHER_SETTING);
      if (otherValue) {
        try {
          setOtherSetting(JSON.parse(otherValue.value));
        } catch {
          // console.log('Parse error.');
        }
      }
    }
  }, [settingPost]);

  return (
    <Box sx={{ p: 2, maxHeight: 'calc(100vh - 90px)' }} className="scroll-box">
      <Grid container spacing={1.5}>
        <Grid item xs={12} lg={12}>
          <Stack spacing={1.5}>
            <TermCondition defaultValue={termItems} />
            <Attachment defaultValue={attachItems} />
            <CustomerNote defaultValue={noteItems} />
          </Stack>
        </Grid>
        {/* <Grid item xs={12} lg={4}>
          <OtherSetting defaultOption={otherSetting} />
        </Grid> */}
      </Grid>
    </Box>
  );
};

export default PreferenceQuote;
