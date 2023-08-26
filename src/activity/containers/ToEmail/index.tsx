import { useState, useEffect } from 'react';

//third-party
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
// material-ui
import { Checkbox, IconButton, InputLabel, Stack, Tooltip, Typography, useTheme } from '@mui/material';

import EmailPhoneAutoComplete from '@base/containers/EmailPhoneAutoComplete';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import { HelpOutlineRounded } from '@mui/icons-material';
import RawHTML from '@base/components/@hanbiro/RawHTML';

interface ToEmailProps {
  onChange?: any;
  value?: any;
  mode: 'email' | 'sms';
}

/**
 *
 * @param {*} props
 * @returns
 */

interface Email {
  id: string;
  name: string;
  typeEmail: 'TYPE_EMAIL_TO' | 'TYPE_EMAIL_CC' | 'TYPE_EMAIL_BCC';
  typeSms: 'TYPE_SMS_TO';
  email: string;
  phone: string;
  type: string;
  sendIndividual: boolean;
}

//TYPE_EMAIL_TO,  TYPE_EMAIL_CC, ' TYPE_EMAIL_BCC'
const ToEmail = (props: ToEmailProps) => {
  const { onChange, value, mode = 'email' } = props;
  const theme = useTheme();
  const { t } = useTranslation();

  const [showEmailCc, setShowEmailCc] = useState(false);
  const [showEmailBcc, setShowEmailBcc] = useState(false);
  const [individualEmail, setInvidualEmail] = useState<boolean>(false);
  const [curEmails, setCurEmails] = useState<Email[]>([]);
  //=============================================Init Value ==============================================================
  const [defaultValue, setDefaultValue] = useState(() => {
    if (mode === 'sms') return { ['TYPE_SMS_TO']: '' };
    return { ['TYPE_EMAIL_TO']: '', ['TYPE_EMAIL_CC']: [], ['TYPE_EMAIL_BCC']: [] };
  });

  useEffect(() => {
    if (value) {
      if (mode == 'email') {
        const emailTypeTo = value.find((email: Email) => email.typeEmail == 'TYPE_EMAIL_TO')?.id ?? '';
        const emailTypeCc = value.filter((email: Email) => email.typeEmail == 'TYPE_EMAIL_CC').map((email: Email) => email.id);
        const emailTypeBcc = value.filter((email: Email) => email.typeEmail == 'TYPE_EMAIL_BCC').map((email: Email) => email.id);
        setDefaultValue({
          ['TYPE_EMAIL_TO']: emailTypeTo,
          ['TYPE_EMAIL_CC']: emailTypeCc,
          ['TYPE_EMAIL_BCC']: emailTypeBcc
        });
      } else {
        const phoneTypeTo = value.find((phone: Email) => phone.typeSms == 'TYPE_SMS_TO')?.id ?? '';

        setDefaultValue({
          ['TYPE_SMS_TO']: phoneTypeTo
        });
      }
    }
  }, [value]);
  //==================================================Handle=================================================================

  const handleChangeIndividualEmail = (value: boolean) => {
    let nEmails = curEmails.map((email: Email) => {
      return {
        ...email,
        sendIndividual: value
      };
    });
    setInvidualEmail(value);
    onChange && onChange(nEmails);
    setCurEmails(nEmails);
  };

  const handleChangeCurEmail = (type: string, value: any) => {
    let curEmailsWithType = [];
    let notCurEmailsWithType = curEmails.filter((email) => email.typeEmail !== type);
    if (value) {
      curEmailsWithType = value?.map((customer: any) => {
        const primaryEmail: any = customer?.emails?.find((_ele: any) => _ele.label === 'LABEL_PRIMARY') ?? '';
        return {
          id: customer.id,
          name: customer.name,
          type: customer?.type,
          typeEmail: type,
          sendIndividual: individualEmail,
          email: primaryEmail.email
        };
      });
    }

    let nCurEmails = [...notCurEmailsWithType, ...curEmailsWithType];
    onChange && onChange(nCurEmails);
    setCurEmails(nCurEmails);
  };

  const handleChangeCurPhone = (type: string, value: any) => {
    let curPhonesWithType = [];
    let notCurPhonesWithType = curEmails.filter((phone) => phone.typeSms !== type);
    if (value) {
      curPhonesWithType = value?.map((customer: any) => {
        const primaryPhone: any = customer?.phones?.find((_ele: any) => _ele.label === 'LABEL_PRIMARY') ?? '';
        return {
          id: customer.id,
          name: customer.name,
          type: customer?.type,
          typeSms: type,
          phone: primaryPhone?.phone ?? ''
        };
      });
    }
    // console.log('curPhonesWithType', curPhonesWithType);
    let nCurPhones = [...notCurPhonesWithType, ...curPhonesWithType];
    onChange && onChange(nCurPhones);
    setCurEmails(nCurPhones);
  };

  //===================================================Render===============================================
  // console.log('curEmails', curEmails);
  return (
    <>
      <Stack justifyContent="space-between" spacing={1} direction="row" alignItems="center">
        <InputLabel sx={{ display: 'flex', alignItems: 'center' }}>
          <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={'To'} />
        </InputLabel>
        {mode == 'email' && (
          <Stack spacing={1} direction="row" alignItems="center">
            <InputLabel
              onClick={() => {
                setShowEmailCc(!showEmailCc);
              }}
              sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            >
              <Typography sx={{ color: showEmailCc ? theme.palette.primary.main : theme.palette.text.primary }}>CC</Typography>
            </InputLabel>
            <InputLabel
              onClick={() => {
                setShowEmailBcc(!showEmailBcc);
              }}
              sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            >
              <Typography sx={{ color: showEmailBcc ? theme.palette.primary.main : theme.palette.text.primary }}>BCC</Typography>
            </InputLabel>
          </Stack>
        )}
      </Stack>
      {showEmailCc && (
        <EmailPhoneAutoComplete
          mode={'Cc'}
          value={defaultValue['TYPE_EMAIL_CC']}
          onChange={(value) => {
            if (mode == 'email') {
              handleChangeCurEmail('TYPE_EMAIL_CC', value);
            }
          }}
          showEmail={true}
          showAvatar={false}
          showPopupIcon={false}
        />
      )}
      {showEmailBcc && (
        <EmailPhoneAutoComplete
          mode={'Bcc'}
          value={defaultValue['TYPE_EMAIL_BCC']}
          onChange={(value) => {
            if (mode == 'email') {
              handleChangeCurEmail('TYPE_EMAIL_BCC', value);
            }
          }}
          showEmail={true}
          showAvatar={false}
          showPopupIcon={false}
        />
      )}
      <EmailPhoneAutoComplete
        mode={'To'}
        value={mode == 'email' ? defaultValue['TYPE_EMAIL_TO'] : defaultValue['TYPE_SMS_TO']}
        onChange={(value) => {
          console.log('email Value', value);
          if (mode == 'email') {
            handleChangeCurEmail('TYPE_EMAIL_TO', [value]);
          } else {
            handleChangeCurPhone('TYPE_SMS_TO', [value]);
          }
        }}
        single={true}
        showEmail={mode == 'email'}
        showPhone={mode == 'sms'}
        showAvatar={false}
        showPopupIcon={false}
      />
      {mode == 'email' && (
        <Stack direction="row" alignItems="center">
          <Checkbox checked={individualEmail} size="small" onChange={(e) => handleChangeIndividualEmail(e.target.checked)} />
          <Typography fontSize="small">Send Individual</Typography>
          <Tooltip arrow title={<RawHTML>{t('nothing to show') as string}</RawHTML>} placement="top">
            <IconButton size="small">
              <HelpOutlineRounded sx={{ fontSize: 16 }} />
            </IconButton>
          </Tooltip>
        </Stack>
      )}
    </>
  );
};

export default ToEmail;
