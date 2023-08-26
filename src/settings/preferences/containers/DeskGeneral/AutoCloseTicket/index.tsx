import { Stack, TextField, Typography } from '@mui/material';
import Section from '@settings/preferences/components/Section';
import useAutoCloseTicketMutation from '@settings/preferences/hooks/desk/useAutoCloseTicketMutation';
import { useAutoCloseTicketSetting } from '@settings/preferences/hooks/desk/useAutoCloseTicketSetting';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { debounce } from 'lodash';
interface AutoCloseTicketProps { }
const AutoCloseTicket: React.FC<AutoCloseTicketProps> = (props: AutoCloseTicketProps) => {
  const { t } = useTranslation();

  const [value, setValue] = useState(18);
  const { data, isLoading } = useAutoCloseTicketSetting();
  const { mUpdate } = useAutoCloseTicketMutation();
  const onSave = (nVal: number) => {
    const nSetting = {
      menu: 'desk',
      key: 'auto_close_ticket',
      value: nVal
    };
    mUpdate.mutate({ menuSetting: nSetting });
  };
  const onChange = (nVal: number) => {
    debouncedOnSave(nVal);
  };
  useEffect(() => {
    if (!isLoading && data?.value) {
      setValue(parseInt(data.value, 10));
    }
  }, [data]);
  const debouncedOnSave = debounce((newItems) => {
    onSave(newItems);
  }, 800);

  return (
    <Section header={t('ncrm_generalsetting_preferences_desk_auto_close_ticket')}>
      <Stack direction="row" m={2} alignItems="center">
        <Typography>{t('ncrm_generalsetting_preferences_desk_close_the_resolved_ticket_after')}</Typography>
        <TextField
          size="medium"
          type={'number'}
          value={value}
          onChange={(e: any) => {
            setValue(e.target.value);
            onChange(e.target.value.trim());
          }}
          sx={{ width: 100, input: { padding: 1 }, mx: 1 }}
        />
        <Typography>{t('ncrm_generalsetting_preferences_desk_hours')}</Typography>
      </Stack>
    </Section>
  );
};

export default AutoCloseTicket;
