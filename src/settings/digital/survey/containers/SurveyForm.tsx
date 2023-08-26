import React, { useEffect, useMemo, useRef, useState } from 'react';

//material
import { Box, Stack, Tab, Tabs, useMediaQuery, useTheme } from '@mui/material';

//project
import MainCard from '@base/components/App/MainCard';
import { LabelValue } from '@base/types/app';
import { generateUUID } from '@base/utils/helpers/generalUtils';

//menu
import QuestionWrite from '@settings/digital/survey/components/QuestionWrite';
import SurveyHeader from '@settings/digital/survey/components/SurveyHeader';
import SurveyTheme from '@settings/digital/survey/components/SurveyTheme';
import { Q_MULTI_CHOICES, Q_MULTI_CHOICES_GRID, SURVEY_TYPE_GENERAL } from '@settings/digital/survey/config/constants';
import { useSurveyCreate, useSurveyUpdate } from '@settings/digital/survey/hooks/useSurveyMutations';
import { getSurveyFromStorage } from '@settings/digital/survey/store/storage';
import SurveyView from '@settings/digital/survey/containers/SurveyView';
import { t } from 'i18next';

interface SurveyFormProps {
  id: string;
  type: string;
  survey?: any;
  storageOn?: boolean;
  storageId?: string;
  scrollTop?: number;
  value?: any;
  onChange?: (value: any) => void;
}

const TABS = [
  {
    value: 'editor',
    label: t('ncrm_generalsetting_survey_editor')
  },
  {
    value: 'preview',
    label: t('ncrm_generalsetting_survey_preview')
  }
];

const DEFAULT_BG_COLOR = '#e4f3e5';
const DEFAULT_LINE_COLOR = '#4caf50';
const INITIAL_GENERAL_SECTIONS = [
  {
    id: generateUUID(),
    title: '',
    description: '',
    questions: [
      {
        id: generateUUID(),
        title: '',
        type: Q_MULTI_CHOICES,
        required: false,
        image: { name: '', url: '', size: '' },
        options: [
          {
            id: generateUUID(),
            image: { name: '', url: '', size: '' },
            isOther: false,
            value: ''
          }
        ]
      }
    ]
  }
];

const INITIAL_SATISFACTION_SECTIONS = [
  {
    id: generateUUID(),
    title: '',
    description: '',
    questions: [
      {
        id: generateUUID(),
        title: '',
        type: Q_MULTI_CHOICES_GRID,
        required: false,
        //image: { name: '', url: '', size: '' },
        options: {
          rows: [
            {
              id: generateUUID(), 
              value: t('ncrm_generalsetting_survey_satisfaction_row_product_service_quality'),
              isOther: false
            },
            {
              id: generateUUID(),
              value: t('ncrm_generalsetting_survey_satisfaction_row_easy_of_use'),
              isOther: false
            },
            {
              id: generateUUID(),
              value: t('ncrm_generalsetting_survey_satisfaction_row_price'),
              isOther: false
            },
            {
              id: generateUUID(),
              value: t('ncrm_generalsetting_survey_satisfaction_row_delivery_time'),
              isOther: false
            },
            {
              id: generateUUID(),
              value: t('ncrm_generalsetting_survey_satisfaction_row_customer_service'),
              isOther: false
            }
          ],
          cols: [
            {
              id: generateUUID(),
              value: t('ncrm_generalsetting_survey_satisfaction_column_highly_satisfied'),
              isOther: false
            },
            {
              id: generateUUID(),
              value: t('ncrm_generalsetting_survey_satisfaction_column_satisfied'),
              isOther: false
            },
            {
              id: generateUUID(),
              value: t('ncrm_generalsetting_survey_satisfaction_column_neutral'),
              isOther: false
            },
            {
              id: generateUUID(),
              value: t('ncrm_generalsetting_survey_satisfaction_column_dissatisfied'),
              isOther: false
            },
            {
              id: generateUUID(),
              value: t('ncrm_generalsetting_survey_satisfaction_column_highly_dissatisfied'),
              isOther: false
            }
          ]
          // answer: {
          //   0: { 0: false, 1: false, 2: false, 3: false, 4: false },
          //   1: { 0: false, 1: false, 2: false, 3: false, 4: false },
          //   2: { 0: false, 1: false, 2: false, 3: false, 4: false },
          //   3: { 0: false, 1: false, 2: false, 3: false, 4: false },
          //   4: { 0: false, 1: false, 2: false, 3: false, 4: false }
          // }
        }
      }
    ]
  }
];

const SurveyForm = (props: SurveyFormProps) => {
  const {
    scrollTop = 0,
    id = '', //survey id
    type = SURVEY_TYPE_GENERAL, //survey type
    survey = null, //survey data
    storageOn = false,
    storageId,
    value,
    onChange
  } = props;
  const tmpStorageId = id ? id : storageId || 'survey_t2m';
  const theme = useTheme();
  const matchMd = useMediaQuery(theme.breakpoints.up('md'));
  //state
  const [tab, setTab] = useState(0);
  const [viewScrollTop, setViewScrollTop] = useState(0);
  const [surveyHeaderImg, setSurveyHeaderImg] = useState<any>(null); //image on survey header
  const [surveyHeadLineColor, setSurveyHeadLineColor] = useState(DEFAULT_LINE_COLOR); //image on survey header
  const [surveyBgColor, setSurveyBgColor] = useState(DEFAULT_BG_COLOR); //light-gray
  const [surveyImage, setSurveyImage] = useState<any>(null); //thumb image for survey - for display on list
  const INITIAL_SECTIONS = type === SURVEY_TYPE_GENERAL ? INITIAL_GENERAL_SECTIONS : INITIAL_SATISFACTION_SECTIONS;
  const [surveySections, setSurveySections] = useState<any>(INITIAL_SECTIONS); //all sections of a survey
  const [showThemeOption, setShowThemeOption] = useState(false);
  const questionRef = useRef<any>(null);

  //hooks
  const mutationAdd = useSurveyCreate();
  const mutationUpdate = useSurveyUpdate();

  //get temporary data from indexeddb
  async function getStoreSurvey(id: string) {
    return await getSurveyFromStorage(id);
  }

  //reset survey sections
  const resetSurvey = () => {
    setSurveyHeaderImg(null);
    setSurveyHeadLineColor(DEFAULT_LINE_COLOR);
    setSurveyBgColor(DEFAULT_BG_COLOR);
    setSurveySections(INITIAL_SECTIONS);
  };

  //init state
  useEffect(() => {
    if (value) {
      if (value?.sections) {
        if (JSON.stringify(value.sections) !== JSON.stringify(surveySections)) {
          setSurveySections(value.sections);
        }
      } else {
        setSurveySections(INITIAL_SECTIONS);
      }
      if (value?.headerImg) {
        setSurveyHeaderImg(value?.headerImg);
      } else {
        setSurveyHeaderImg(null);
      }
      if (value?.headerLineColor) {
        setSurveyHeadLineColor(value?.headerLineColor);
      } else {
        setSurveyHeadLineColor(DEFAULT_LINE_COLOR);
      }
      if (value?.bgColor) {
        setSurveyBgColor(value?.bgColor);
      } else {
        setSurveyBgColor(DEFAULT_BG_COLOR);
      }
    } else {
      resetSurvey();

      // if (storageOn) {
      //   getStoreSurvey(tmpStorageId).then((storeSurvey: any) => {
      //     if (storeSurvey) {
      //       setSurveyHeaderImg(storeSurvey?.headerImg);
      //       setSurveyHeadLineColor(storeSurvey?.headerLineColor);
      //       setSurveyBgColor(storeSurvey?.bgColor);
      //       if (JSON.stringify(storeSurvey?.sections) !== JSON.stringify(surveySections)) {
      //         setSurveySections(storeSurvey?.sections || []);
      //       }
      //     } else {
      //       setSurveySections(INITIAL_SECTIONS);
      //     }
      //   });
      // } else {
      //   resetSurvey();
      // }
    }
  }, [value]);

  //set preview when view
  useEffect(() => {
    if (id) {
      setTab(1);
    } else {
      setTab(0);
    }
  }, [id]);

  //update
  const handleUpdate = () => {
    if (id) {
      const params = {
        id,
        sections: JSON.stringify(surveySections),
        headerImage: surveyHeaderImg,
        headerLineColor: surveyHeadLineColor,
        bgColor: surveyBgColor
      };
      mutationUpdate.mutate({ survey: params });
    }
  };

  //save as template
  const handleSaveTemplate = () => {
    const params = {
      name: survey?.name || '',
      title: survey?.title || ': ',
      description: survey?.description || '',
      sections: JSON.stringify(surveySections),
      headerImage: surveyHeaderImg,
      headerLineColor: surveyHeadLineColor,
      bgColor: surveyBgColor,
      isTemplate: true
    };
    mutationAdd.mutate({ survey: params });
  };

  //tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  //scroll height
  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    //console.log('scrollTop', e.currentTarget.scrollTop);
    setViewScrollTop(e?.currentTarget?.scrollTop || 0);
  };

  //write question
  const SurveyQuestionWrite = useMemo(() => {
    return (
      <Box sx={{ display: tab === 0 ? 'block' : 'none' }}>
        <QuestionWrite
          storageOn={storageOn}
          scrollTop={id ? viewScrollTop : scrollTop}
          questionRef={questionRef}
          surveyId={id || tmpStorageId}
          surveyType={type}
          surveyHeaderImg={surveyHeaderImg}
          surveyHeadLineColor={surveyHeadLineColor}
          surveyBgColor={surveyBgColor}
          surveyImage={surveyImage}
          value={surveySections}
          onChange={(newValue: any) => {
            setSurveySections(newValue);
            //callback
            const newSurveyData = {
              //id,
              headerImg: surveyHeaderImg || '',
              headerLineColor: surveyHeadLineColor,
              bgColor: surveyBgColor,
              //image: surveyImage,
              sections: newValue
            };
            onChange && onChange(newSurveyData);
          }}
        />
      </Box>
    );
  }, [surveySections, tab, scrollTop, viewScrollTop]);

  //view question
  const SurveyQuestionView = useMemo(() => {
    return (
      <Box sx={{ display: tab === 1 ? 'block' : 'none' }}>
        <SurveyView
          id={id}
          name={survey?.name || ''}
          previewData={{
            headerImg: surveyHeaderImg,
            headerLineColor: surveyHeadLineColor,
            bgColor: surveyBgColor,
            //image: surveyImage,
            sections: surveySections
          }}
        />
      </Box>
    );
  }, [surveySections, tab]);

  //questions or preview
  const renderSurveyContent = () => {
    let matchWidth: string = matchMd ? '750px' : '520px';
    if (id) {
      //view page
      matchWidth = '580px';
    }

    return (
      <Stack justifyContent={'center'} alignItems="center" sx={{ p: 3 }}>
        <Stack sx={{ width: matchWidth }}>
          {SurveyQuestionWrite}
          {SurveyQuestionView}
        </Stack>
      </Stack>
    );
  };

  //tab list
  const TabRender = useMemo(() => {
    return (
      <Stack direction={'row'} justifyContent="center">
        <Tabs value={tab} onChange={handleTabChange} aria-label="setting survey tabs">
          {TABS.map((_tab: LabelValue, index: number) => (
            <Tab
              key={_tab.value}
              label={t(_tab.label)}
              id={`setting-survey-tab-${index}`}
              aria-controls={`setting-survey-tabpanel-${index}`}
            />
          ))}
        </Tabs>
      </Stack>
    );
  }, [tab]);

  //console.log('surveySections', surveySections);
  const newTitle = surveySections.length > 0 ? surveySections[0].title : '';
  //main render
  return (
    <MainCard
      sx={{ backgroundColor: surveyBgColor, zIndex: 10, maxHeight: id ? 'calc(100vh - 190px)' : '100%' }}
      className="scroll-box"
      onScroll={handleScroll}
    >
      <SurveyHeader
        isPreview={tab === 1}
        storageId={tmpStorageId}
        surveyId={id} //for view
        surveyTitle={newTitle}
        //questionRef={questionRef} //for generate image preview: d2i
        isLoading={mutationUpdate.isLoading || mutationAdd.isLoading} //loading...
        setShowSideBar={setShowThemeOption} //open theme canvas
        onReset={resetSurvey}
        onSave={handleUpdate}
        //onSaveAsTemplate={handleSaveTemplate}
      />
      {TabRender}
      {renderSurveyContent()}
      <SurveyTheme
        isOpen={showThemeOption}
        onClose={() => setShowThemeOption(false)}
        //headerImg={surveyHeaderImg}
        themeColor={surveyHeadLineColor}
        bgColor={surveyBgColor}
        onSetSurveyHeaderImg={(newImage: any) => {
          setSurveyHeaderImg(newImage);
          //callback
          const newSurveyData = {
            //id: id,
            headerImg: newImage,
            headerLineColor: surveyHeadLineColor,
            bgColor: surveyBgColor,
            //image: surveyImage,
            sections: surveySections
          };
          onChange && onChange(newSurveyData);
        }}
        onSetSurveyThemeColor={(lineColor: string, bgColor: string) => {
          setSurveyHeadLineColor(lineColor);
          setSurveyBgColor(bgColor);
          //callback
          const newSurveyData = {
            //id,
            headerImg: surveyHeaderImg,
            headerLineColor: lineColor,
            bgColor: bgColor,
            //image: surveyImage,
            sections: surveySections
          };
          onChange && onChange(newSurveyData);
        }}
        onSetSurveyBgColor={(newColor: string) => {
          setSurveyBgColor(newColor);
          //callback
          const newSurveyData = {
            //id,
            headerImg: surveyHeaderImg,
            headerLineColor: surveyHeadLineColor,
            bgColor: newColor,
            //image: surveyImage,
            sections: surveySections
          };
          onChange && onChange(newSurveyData);
        }}
      />
    </MainCard>
  );
};

export default SurveyForm;
