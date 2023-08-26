import LoadingCircular from '@base/components/@hanbiro/LoadingCircular';
import MiModal from '@base/components/@hanbiro/MiModal';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import { LabelValue } from '@base/types/app';
import { Box, Button, Stack, Tab, Tabs } from '@mui/material';
import { useSiteDeskSurvey, useSiteDeskSurveys } from '@public-page/site/hooks/useSiteDeskSurvey';
import SatisfactionView from '@settings/digital/satisfaction/containers/SatisfactionView';
//import SurveyView from '@settings/digital/survey/containers/SurveyView';
import React, { useEffect, useMemo, useState } from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`site-desk-survey-tabpanel-${index}`}
      aria-labelledby={`site-desk-survey-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

interface SurveyFormProps {
  token: string;
  isOpen: boolean;
  onClose: () => void;
}

const SurveyForm = (props: SurveyFormProps) => {
  const { token, isOpen, onClose } = props;
  //state
  const [surveysList, setSurveysList] = useState<any[]>([]);
  const [selectedSurvey, setSelectedSurvey] = useState<any>(null);
  const [surveyData, setSurveyData] = useState<any>(null);
  const [tab, setTab] = useState(0);

  //get available surveys
  const { data: surveysPost, isFetching: isSurveysFetching } = useSiteDeskSurveys(token);
  const { data: surveyPost, isFetching: isSurveyFetching } = useSiteDeskSurvey(token, selectedSurvey?.id || '');
  console.log('surveyPost', surveyPost);

  //init surveys (tabs) list
  useEffect(() => {
    if (surveysPost?.data) {
      const newItems = surveysPost.data.filter((_ele: any) => _ele !== null);
      setSurveysList(newItems);
      if (newItems.length > 0) {
        setSelectedSurvey(newItems[0]);
      }
    }
  }, [surveysPost]);

  //set survey data when change
  useEffect(() => {
    if (surveyPost) {
      setSurveyData(surveyPost);
    }
  }, [surveyPost]);

  //tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
    //set selected survey
    setSelectedSurvey(surveysList[newValue]);
  };

  //tabs for surveys list
  const TabsRender = useMemo(() => {
    return (
      <Tabs value={tab} onChange={handleTabChange} aria-label="site desk survey tabs">
        {surveysList.map((_item: any, index: number) => (
          <Tab
            key={_item.id}
            label={_item.name}
            id={`site-desk-survey-tab-${index}`}
            aria-controls={`site-desk-survey-tabpanel-${index}`}
          />
        ))}
      </Tabs>
    );
  }, [surveysList, selectedSurvey]);

  //survey view render
  const SurveyViewRender = useMemo(() => {
    let curSections: any[] = [];
    try {
      if (surveyData?.question) {
        curSections = JSON.parse(surveyData.question);
      }
    } catch {
      // console.log('parse json error');
    }

    return (
      <Box sx={{ pt: 1 }}>
        {isSurveyFetching && <LoadingCircular loading={isSurveyFetching} />}
        {surveyData && (
          <SatisfactionView
            id={surveyData.id}
            name={surveyData.name}
            previewData={{
              headerImg: surveyData.surveyHeaderImg,
              headerLineColor: surveyData.surveyHeadLineColor,
              bgColor: surveyData.surveyBgColor,
              //image: surveyData.surveyImage,
              sections: curSections
            }}
            isPublic={true}
            token={token}
          />
        )}
      </Box>
    );
  }, [surveyData]);

  //buttons
  const Footer = useMemo(() => {
    return (
      <Stack direction="row" justifyContent="end" spacing={2} alignItems="center">
        <Button size="small" color="secondary" variant="outlined" onClick={onClose}>
          Close
        </Button>
      </Stack>
    );
  }, []);

  console.log('selectedSurvey', selectedSurvey);
  return (
    <MiModal
      title={<SpanLang keyLang={'Satisfaction Survey'} />}
      isOpen={isOpen}
      size="lg"
      fullScreen={false}
      onClose={onClose}
      footer={Footer}
    >
      {isOpen && (
        <React.Suspense fallback={<></>}>
          <Box sx={{ p: 2 }}>
            {TabsRender}
            {SurveyViewRender}
          </Box>
        </React.Suspense>
      )}
    </MiModal>
  );
};

export default SurveyForm;
