import { ReactNode, useEffect, useState } from 'react';

//project
import MainCard from '@base/components/App/MainCard';
import { LabelValue } from '@base/types/app';
import { useMenuSettings, useMenuSettingUpdate } from '@settings/general/hooks/useMenuSetting';
import { useSelectionFields } from '@settings/general/hooks/useSelectionFields';
import { useSelectionUpdate } from '@settings/general/hooks/useSelectionMutations';

//material
import { Box, Tab, Tabs, useTheme, Tooltip, Stack, Typography, IconButton } from '@mui/material';

//local
import EmailTerm from './EmailTerm';
import SmsTerm from './SmsTerm';
import PriorityTerm from './PriorityTerm';
import PurposeTerm from './PurposeTerm';
import CallResultTerm from './CallResultTerm';
import { useTranslation } from 'react-i18next';
import { HelpOutline, Info } from '@mui/icons-material';

const TABS: LabelValue[] = [
  {
    label: 'ncrm_generalsetting_preferences_email',
    value: 'email'
  },
  {
    label: 'ncrm_generalsetting_preferences_product_sms',
    value: 'sms'
  },
  {
    label: 'ncrm_generalsetting_preferences_desk_priority',
    value: 'priority'
  },
  {
    label: 'ncrm_generalsetting_preferences_activity_purpose',
    value: 'purpose'
  },
  {
    label: 'ncrm_generalsetting_preferences_activity_call_result',
    value: 'callresult'
  }
];

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`preference-activity-tabpanel-${index}`}
      aria-labelledby={`preference-activity-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

const IntroductionEmailAddress = () => {
  const { t } = useTranslation();
  return (
    <>
      <Stack direction="row" alignItems="center" fontSize="small">
        <IconButton sx={{ color: 'primary.main' }} size="small">
          <Info fontSize="small" />
        </IconButton>
        <Typography variant="subtitle1" color="primary.main">
          {t('ncrm_generalsetting_preferences_activity_send_email_from_vora_desk_app')}
        </Typography>
      </Stack>
      <Stack
        spacing={3}
        sx={{
          px: 1,
          pb: 2
        }}
      >
        <Stack spacing={1}>
          <Typography variant="h6">{t('ncrm_generalsetting_preferences_activity_business_process_auto_send')}</Typography>
          <Typography variant="h6">{`${t('ncrm_generalsetting_preferences_activity_from')} : desk@*.vora.net`}</Typography>
          <Typography variant="h6">{`${t('ncrm_generalsetting_preferences_activity_reply_to')} : ${t(
            'ncrm_generalsetting_preferences_activity_rep_email'
          )}`}</Typography>
        </Stack>
        <Stack spacing={1}>
          <Typography variant="h6">{t('ncrm_generalsetting_preferences_activity_send_directly')}</Typography>
          <Typography variant="h6">{`${t('ncrm_generalsetting_preferences_activity_from')} : desk@*.vora.net`}</Typography>
          <Typography variant="h6">{`${t('ncrm_generalsetting_preferences_activity_reply_to')} : ${t(
            'ncrm_generalsetting_preferences_activity_your_default_email'
          )}`}</Typography>
          <Typography variant="h6">{t('ncrm_generalsetting_preferences_activity_rep_email')}</Typography>
        </Stack>
        <Stack spacing={1}>
          <Typography variant="h6">{t('ncrm_generalsetting_preferences_activity_send_recevie_from_vora_email_app')}</Typography>
          <Typography variant="h6">{t('ncrm_generalsetting_preferences_activity_auto_classify')}</Typography>
        </Stack>
        <Stack spacing={1}>
          <Typography variant="h6">{t('ncrm_generalsetting_preferences_activity_send_recevie_from_other_email_app')}</Typography>
          <Typography variant="h6">{`${t('ncrm_generalsetting_preferences_activity_send')}: BCC-desk@*.vora.net 넣기`}</Typography>
          <Typography variant="h6">{`${t(
            'ncrm_generalsetting_preferences_activity_recevie'
          )}: Forward- 저장 후 desk@*.vora.net으로 보내기`}</Typography>
        </Stack>
      </Stack>
    </>
  );
};

const PreferenceActivity = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const theme = useTheme();
  const { t } = useTranslation();

  //state
  const [emailData, setEmailData] = useState<any[]>([]);
  const [domainData, setDomainData] = useState<any[]>([]);
  const [phoneData, setPhoneData] = useState<any[]>([]);
  const [mobileData, setMobileData] = useState<any[]>([]);
  const [priorityData, setPriorityData] = useState<any[]>([]);
  const [purposeData, setPurposeData] = useState<any[]>([]);
  const [callData, setCallData] = useState<any[]>([]);
  //hook
  const mSettingUpdate = useMenuSettingUpdate();
  const mSelectionUpdate = useSelectionUpdate();

  //get data
  const params = {
    keys: ['emails', 'domains', 'company_phones', 'personal_phones'],
    menus: ['activity', 'desk']
  };
  const { data: settingPost, isLoading } = useMenuSettings(params);
  const { data: priorityPost, isLoading: isPriorityLoading } = useSelectionFields({ filter: { query: 'keyRoot=priority' } });
  const { data: purposePost, isLoading: isPurposeLoading } = useSelectionFields({ filter: { query: 'keyRoot=activity_purpose' } });
  const { data: callResultPost, isLoading: isCallResultLoading } = useSelectionFields({
    filter: { query: 'keyRoot=activity_call_result' }
  });

  //set setting data
  useEffect(() => {
    if (settingPost?.data) {
      const newEmailValue = settingPost.data.find((_ele: any) => _ele.key === 'emails');
      if (newEmailValue) {
        try {
          setEmailData(JSON.parse(newEmailValue.value));
        } catch {
          // console.log('Parse error.');
        }
      }
      const newDomainValue = settingPost.data.find((_ele: any) => _ele.key === 'domains');
      if (newDomainValue) {
        try {
          setDomainData(JSON.parse(newDomainValue.value));
        } catch {
          // console.log('Parse error.');
        }
      }
      const newPhoneValue = settingPost.data.find((_ele: any) => _ele.key === 'company_phones');
      if (newPhoneValue) {
        try {
          setPhoneData(JSON.parse(newPhoneValue.value));
        } catch {
          // console.log('Parse error.');
        }
      }
      const newMobileValue = settingPost.data.find((_ele: any) => _ele.key === 'personal_phones');
      if (newMobileValue) {
        try {
          setMobileData(JSON.parse(newMobileValue.value));
        } catch {
          // console.log('Parse error.');
        }
      }
    }
  }, [settingPost]);
  //set setting data
  useEffect(() => {
    if (priorityPost?.data) {
      setPriorityData(priorityPost.data);
    }
  }, [priorityPost]);
  //set setting data
  useEffect(() => {
    if (purposePost?.data) {
      setPurposeData(purposePost.data);
    }
  }, [purposePost]);
  //set setting data
  useEffect(() => {
    if (callResultPost?.data) {
      setCallData(callResultPost.data);
    }
  }, [callResultPost]);

  //save item
  const handleSettingSave = (key: string, newData: any) => {
    const params: any = {
      menu: 'activity',
      key: key,
      value: JSON.stringify(newData)
    };
    mSettingUpdate.mutate({ menuSetting: params });
  };

  //save item
  const handleSelectionSave = (newData: any[]) => {
    const newDefaultItem = newData.find((_ele: any) => _ele.isDefault === true);
    const params: any = {
      id: newDefaultItem.id,
      isDefault: true,
      keyGroup: newDefaultItem.keyGroup
    };
    mSelectionUpdate.mutate({ selection: params });
  };

  //tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  //add new email or domain row
  const handleAddEDRow = (type: string) => {
    switch (type) {
      case 'email':
        const emailRow: any = {
          email: '',
          description: ''
        };
        setEmailData((old) => [...old, ...[emailRow]]);
        //save
        handleSettingSave('emails', [...emailData, ...[emailRow]]);
        break;
      case 'domain':
        const domainRow: any = {
          domain: '',
          description: ''
        };
        setDomainData((old) => [...old, ...[domainRow]]);
        //save
        handleSettingSave('domains', [...domainData, ...[domainRow]]);
        break;
    }
  };

  //email value change
  const handleEDDataChange = (type: string, newData: any) => {
    switch (type) {
      case 'email':
        setEmailData(newData);
        //save --> TODO: check old and new are different before save
        handleSettingSave('emails', newData);
        break;
      case 'domain':
        setDomainData(newData);
        //save
        handleSettingSave('domains', newData);
        break;
    }
  };

  //add new phone row
  const handleAddPMRow = (type: string) => {
    switch (type) {
      case 'company':
        const phoneRow: any = {
          number: '',
          description: '',
          isDefault: false
        };
        setPhoneData((old) => [...old, ...[phoneRow]]);
        //save
        handleSettingSave('company_phones', [...phoneData, ...[phoneRow]]);
        break;
      case 'individual':
        const mobileRow: any = {
          user: null,
          number: ''
        };
        setMobileData((old) => [...old, ...[mobileRow]]);
        //save
        handleSettingSave('personal_phones', [...mobileData, ...[mobileRow]]);
        break;
    }
  };

  //phone value change
  const handlePMDataChange = (type: string, newData: any) => {
    switch (type) {
      case 'company':
        setPhoneData(newData);
        //save
        handleSettingSave('company_phones', newData);
        break;
      case 'individual':
        setMobileData(newData);
        //save
        handleSettingSave('personal_phones', newData);
        break;
    }
  };

  //add new priority
  const handleAddPRRow = () => {
    const newRow: any = {
      languageKey: '',
      isDefault: false
    };
    setPriorityData((old) => [...old, ...[newRow]]);
    //save - TODO: not support by api
    handleSelectionSave([...priorityData, ...[newRow]]);
  };

  //priority value change
  const handlePRDataChange = (newData: any) => {
    setPriorityData(newData);
    //save
    handleSelectionSave(newData);
  };

  //add new purpose
  const handleAddPPRow = () => {
    const newRow: any = {
      languageKey: '',
      isDefault: false
    };
    setPurposeData((old) => [...old, ...[newRow]]);
    //save - TODO: not support by api
    handleSelectionSave([...purposeData, ...[newRow]]);
  };

  //purpose value change
  const handlePPDataChange = (newData: any) => {
    setPurposeData(newData);
    //save
    handleSelectionSave(newData);
  };

  //add new call
  const handleAddCallRow = () => {
    const newRow: any = {
      languageKey: '',
      isDefault: false
    };
    setCallData((old) => [...old, ...[newRow]]);
    //save - TODO: not support by api
    handleSelectionSave([...purposeData, ...[newRow]]);
  };

  //purpose value change
  const handleCallDataChange = (newData: any) => {
    setCallData(newData);
    //save
    handleSelectionSave(newData);
  };

  //console.log('phoneData', phoneData);
  return (
    <MainCard
      sx={{
        m: 2,
        //height: '100vh',
        // '& .MuiCardContent-root': {
        //   bgcolor: theme.palette.common.white
        // },
        border: 0 // Set border = 0 to remove border
      }}
    >
      <Box sx={{ pb: 2, maxHeight: 'calc(100vh - 160px)' }} className="scroll-box">
        <Box>
          <Tabs value={activeTab} onChange={handleTabChange} aria-label="preference activity tabs">
            {TABS.map((_tab: LabelValue, index: number) =>
              _tab.value === 'email' ? (
                <Tab
                  key={_tab.value}
                  label={t(_tab.label)}
                  id={`preference-activity-tab-${index}`}
                  aria-controls={`preference-activity-tabpanel-${index}`}
                  // Icon to show introduction of email address
                  icon={
                    <Tooltip
                      title={<IntroductionEmailAddress />}
                      placement="bottom"
                      PopperProps={{
                        sx: {
                          '& .MuiTooltip-tooltip': {
                            border: '2px solid',
                            borderColor: 'primary.light',
                            backgroundColor: 'primary.lighter', // Set background color of popper
                            color: 'grey.700', // Set color of text
                            minWidth: 400, // Set min width of popper: 400px
                            ml: 15, // Default value of margin-left: 0 => Set ml: 15 ~ margin-left: 120px
                            mt: '8px !important' // Default value of margin-top: 14px => Set mt: 1 ~ margin-top: 8px
                          }
                        }
                      }}
                    >
                      <HelpOutline
                        fontSize="small"
                        sx={{
                          color: 'grey.700' // Set color of icon
                        }}
                      />
                    </Tooltip>
                  }
                  iconPosition="end"
                />
              ) : (
                <Tab
                  key={_tab.value}
                  label={t(_tab.label)}
                  id={`preference-activity-tab-${index}`}
                  aria-controls={`preference-activity-tabpanel-${index}`}
                />
              )
            )}
          </Tabs>
        </Box>
        <TabPanel value={activeTab} index={0}>
          <EmailTerm emails={emailData} domains={domainData} onChange={handleEDDataChange} onAdd={handleAddEDRow} />
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          <SmsTerm phones={phoneData} mobiles={mobileData} onChange={handlePMDataChange} onAdd={handleAddPMRow} />
        </TabPanel>
        <TabPanel value={activeTab} index={2}>
          <PriorityTerm items={priorityData} onChange={handlePRDataChange} onAdd={handleAddPRRow} />
        </TabPanel>
        <TabPanel value={activeTab} index={3}>
          <PurposeTerm items={purposeData} onChange={handlePPDataChange} onAdd={handleAddPPRow} />
        </TabPanel>
        <TabPanel value={activeTab} index={4}>
          <CallResultTerm items={callData} onChange={handleCallDataChange} onAdd={handleAddCallRow} />
        </TabPanel>
      </Box>
    </MainCard>
  );
};

export default PreferenceActivity;
