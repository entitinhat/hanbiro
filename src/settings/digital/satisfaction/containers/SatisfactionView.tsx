import { Fragment, useEffect, useMemo, useState } from 'react';

//project
import LoadingButton from '@base/components/@extended/LoadingButton';
import ImagePreview from '@base/components/@hanbiro/ImagePreview';
import NoData from '@base/components/@hanbiro/NoData';
import SpanLang from '@base/components/@hanbiro/SpanLang';

//material
import { ChevronLeftOutlined, ChevronRightOutlined } from '@mui/icons-material';
import { Box, Button, Stack } from '@mui/material';

//third-party
import { cloneDeep } from 'lodash';

//menu
import Question from '@settings/digital/satisfaction/components/Question';
import TitleView from '@settings/digital/satisfaction/components/TitleView';
import {
  useSatisfactionAnswerCreate,
  useSiteSatisfactionAnswerCreate
} from '@settings/digital/satisfaction/hooks/useSatisfactionMutations';

const DEFAULT_BG_COLOR = '#e4f3e5';

interface SatisfactionViewProps {
  id: string;
  name: string;
  previewData: any;
  isPublic?: boolean;
  token?: string;
}

const SatisfactionView = (props: SatisfactionViewProps) => {
  const {
    id = '', //survey id
    name = '', // survey name
    previewData = null,
    isPublic = false,
    token = ''
  } = props;
  //state
  const [surveyS, setSurveyS] = useState<any>([]);
  const [curSection, setCurSection] = useState<number>(0); //init current survey is 0
  const [surveyHeaderImg, setSurveyHeaderImg] = useState<any>(null); //image on survey header
  const [surveyBgColor, setSurveyBgColor] = useState<string>(DEFAULT_BG_COLOR); //light-gray
  //hooks
  const mutationAdd = useSatisfactionAnswerCreate();
  const mPublicAdd = useSiteSatisfactionAnswerCreate();

  //track to get survey info
  useEffect(() => {
    if (previewData) {
      if (previewData?.sections) {
        setSurveyS(cloneDeep(previewData.sections));
      }
      if (previewData?.headerImg) {
        setSurveyHeaderImg(previewData.headerImg);
      }
      if (previewData?.bgColor) {
        setSurveyBgColor(previewData.bgColor);
      }
    }
  }, [JSON.stringify(previewData)]);

  //submit success
  useEffect(() => {
    if (mutationAdd.isSuccess) {
      //reset survey
      setSurveyS(cloneDeep(previewData.sections)); //orginal data
    }
  }, [mutationAdd.isSuccess]);

  //submit success
  useEffect(() => {
    if (mPublicAdd.isSuccess) {
      //reset survey
      setSurveyS(cloneDeep(previewData.sections)); //orginal data
    }
  }, [mPublicAdd.isSuccess]);

  //validate required for question before go next or submit
  function validateRequired() {
    //const curSurveyS = surveyS[curSection];
    return true;
  }

  //go next section
  function onNext() {
    const isValid = validateRequired();
    if (isValid) {
      setCurSection((cur) => cur + 1);
    }
  }

  //go prev section
  function onPrevious() {
    setCurSection((cur) => cur - 1);
  }

  //submit response
  function onSubmit() {
    //validate required questions before submit
    const isValid = validateRequired();
    if (isValid) {
      if (surveyS && surveyS.length > 0) {
        const params = {
          satisfactionSurvey: {
            id,
            name
          },
          answer: JSON.stringify(surveyS)
        };
        if (isPublic) {
          mPublicAdd.mutate({ satisfactionSurveyAnswer: params, token });
        } else {
          mutationAdd.mutate({ satisfactionSurveyAnswer: params });
        }
      }
    }
  }

  //question content change
  const handleQuestionChange = (indexS: number, indexQ: number, newQuestion: any) => {
    const newSurveyS = [...surveyS];
    newSurveyS[indexS].questions[indexQ] = newQuestion;
    setSurveyS(newSurveyS);
  };

  //render questions
  const SurveyQuestions = useMemo(() => {
    if (surveyS.length === 0) {
      return <NoData label="No satisfaction survey(s) available." />;
    }
    const surveyQ = surveyS[curSection];
    //console.log('surveyQ', surveyQ);

    return (
      <Stack spacing={1.5}>
        {surveyHeaderImg && <ImagePreview image={surveyHeaderImg} />}
        <TitleView title={surveyQ.title} description={surveyQ.description} />
        {surveyQ.questions.map((_question: any, index: number) => {
          return <Question editMode="view" key={index} keyS={curSection} keyQ={index} value={_question} onChange={handleQuestionChange} />;
        })}
        {/* submit button */}
        <Stack direction="row" justifyContent={'start'}>
          {curSection < surveyS.length - 1 && (
            <Button size="small" color="primary" variant="contained" endIcon={<ChevronRightOutlined />} onClick={onNext}>
              <SpanLang keyLang="Next" />
            </Button>
          )}
          {curSection > 0 && (
            <Button size="small" color="primary" variant="contained" startIcon={<ChevronLeftOutlined />} onClick={onPrevious}>
              <SpanLang keyLang="Previous" />
            </Button>
          )}
          {curSection === surveyS.length - 1 && id != '' && (
            <LoadingButton
              color="primary"
              variant="contained"
              loading={mutationAdd.isLoading || mPublicAdd.isLoading}
              disabled={mutationAdd.isLoading || mPublicAdd.isLoading}
              onClick={onSubmit}
            >
              <SpanLang keyLang="Submit" />
            </LoadingButton>
          )}
        </Stack>
      </Stack>
    );
  }, [surveyS, curSection, mutationAdd.isLoading, mPublicAdd.isLoading]);

  return <Box sx={{ position: 'relative', width: '100%' }}>{SurveyQuestions}</Box>;
};

export default SatisfactionView;
