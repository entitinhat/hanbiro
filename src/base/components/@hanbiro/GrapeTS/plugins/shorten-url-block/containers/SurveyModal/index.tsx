//project
import MiModal from '@base/components/@hanbiro/MiModal';
import { useEffect, useState } from 'react';
import { groupByOptions } from '@settings/digital/cta/config/list-field';
import { IconType } from '@base/types/app';
import { FormIcon } from '@base/components/@hanbiro/FormIcon';
import { useConvertToHTML } from './Helper';
import { usGetSurveyList } from '@settings/digital/survey/hooks/useGetSurveyList';

//Material-ui
import { Box, CircularProgress, List, ListItemButton, Tab, Tabs, Typography } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import SmartButtonIcon from '@mui/icons-material/SmartButton';
import NoData from '@base/components/@hanbiro/NoData';

interface SurveyModalProps {
  editor: any;
  component?: string;
  isOpen?: boolean;
  onClose: () => void;
}

interface Tab {
  value: string;
  title: string;
  icon: string;
  iconType: IconType;
}
const TABS: Tab[] = [
  { value: 'url', title: 'Url', icon: 'Link', iconType: 'material' },
  { value: 'text', title: 'Text', icon: 'TextFormat', iconType: 'material' }
];

const SurveyModal = (props: SurveyModalProps) => {
  const { editor, isOpen = false, onClose, component } = props;
  const [activeTab, setActiveTab] = useState<Tab>(TABS[0]);
  const [groupBy, setGroupBy] = useState<string>('url');
  const [curSurvey, setcurSurvey] = useState<any>();
  //params: sample
  const { data: postData, isLoading } = usGetSurveyList();
  useEffect(() => {
    if (curSurvey) {
      const selector = `#${component}`;
      const SelectedComponent = editor?.DomComponents?.getWrapper().find(selector)[0];
      console.log('SelectedComponent:', SelectedComponent);
      console.log('groupBy', groupBy);
      useConvertToHTML[groupBy](SelectedComponent, curSurvey);
      setcurSurvey(null);
      onClose && onClose();
    }
  }, [curSurvey]);

  const onClick = (survey: any) => {
    setcurSurvey(survey);
  };

  //===================Handler

  const handleChange = (event: React.SyntheticEvent, newValue: Tab) => {
    console.log('newvalue', newValue);
    setActiveTab(newValue);
    setGroupBy(newValue.value);
  };
  console.log('postData', postData);
  console.log('activeTab', activeTab);
  return (
    <MiModal
      title={'Select survey'}
      isOpen={isOpen} //writeOption.isOpenWrite
      size="sm"
      fullScreen={false}
      onClose={onClose}
    >
      <Box id="grapeModalID">
        <List id="modal-body" sx={{ width: '100%' }}>
          <Tabs value={activeTab} onChange={handleChange} variant="fullWidth">
            {TABS.map((tab, index) => (
              <Tab key={index} icon={<FormIcon icon={tab.icon} iconType={tab.iconType} />} label={tab.title} value={tab} />
            ))}
          </Tabs>
          {postData ? (
            <Box sx={{ height: '60vh' }} className="scroll-box">
              {postData?.data?.map((survey: any, index: number) => {
                return (
                  <ListItemButton key={index} sx={{ display: 'flex' }} onClick={() => onClick(survey)}>
                    <Box
                      sx={{
                        maxHeight: '100px',
                        maxWidth: '100px',
                        mr: '10px'
                      }}
                    >
                      {groupBy == groupByOptions[4].value && <LinkIcon fontSize="large" />}
                      {groupBy == groupByOptions[2].value && <SmartButtonIcon fontSize="large" />}
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: '16px' }}>{survey.name}</Typography>
                    </Box>
                  </ListItemButton>
                );
              })}
            </Box>
          ) : (
            <Box sx={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {isLoading ? <CircularProgress /> : <NoData />}
            </Box>
          )}
        </List>
      </Box>
    </MiModal>
  );
};

export default SurveyModal;
