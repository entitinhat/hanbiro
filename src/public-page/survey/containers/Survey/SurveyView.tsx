import { useEffect, useMemo, useState } from 'react';

//third-party
import _ from 'lodash';

//material
import { Box, Button, Stack } from '@mui/material';
import { ChevronLeftOutlined, ChevronRightOutlined } from '@mui/icons-material';

//project
import { useSurveyAnswerCreate } from '@settings/digital/survey/hooks/useSurveyMutations';
import ImagePreview from '@base/components/@hanbiro/ImagePreview';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import LoadingButton from '@base/components/@extended/LoadingButton';
import NoData from '@base/components/@hanbiro/NoData';
import {
  Q_MULTI_CHOICES,
  Q_CHECKBOXES,
  Q_DROPDOWN,
  Q_SHORT_ANSWER,
  Q_PARAGRAPH,
  Q_FILE_UPLOAD,
  Q_DATE,
  Q_TIME,
  Q_MULTI_CHOICES_GRID,
  Q_TICK_BOX_GRID,
  Q_TITLE,
  Q_IMAGE,
  Q_VIDEO
} from '@settings/digital/survey/config/constants';
import SurveyTitleView from '@settings/digital/survey/components/SurveyTitleView';
import QuestionMediaView from '@settings/digital/survey/components/QuestionMediaView';
import QuestionView from '@settings/digital/survey/components/QuestionView';
import { useSiteSurveyAnswerCreate } from '@public-page/survey/hooks/useSiteSurveyAnswerCreate';

//local

const DEFAULT_BG_COLOR = '#e4f3e5';

interface SurveyViewProps {
  id: string;
  name: string;
  previewData: any;
  isPublic?: boolean; //public site
  token?: string; //public site
  readOnly?: boolean;
}

const SurveyView = (props: SurveyViewProps) => {
  const {
    id = '', //survey id
    name = '', // survey name
    previewData = null,
    isPublic = false,
    readOnly = false,
    token = ''
  } = props;
  //const { t } = useTranslation();
  //state
  const [surveyS, setSurveyS] = useState<any>([]);
  const [curSection, setCurSection] = useState<number>(0); //init current survey is 0
  const [surveyHeaderImg, setSurveyHeaderImg] = useState<any>(null); //image on survey header
  const [surveyBgColor, setSurveyBgColor] = useState<string>(DEFAULT_BG_COLOR); //light-gray
  const [requiredInValidKey, setRequiredInValidKey] = useState(-1); // default validate TRUE

  //hooks
  const mutationAdd = useSurveyAnswerCreate();
  const mPublicAdd = useSiteSurveyAnswerCreate();

  //track to get survey info
  useEffect(() => {
    if (previewData) {
      if (previewData?.sections) {
        setSurveyS(_.cloneDeep(previewData.sections));
      }
      if (previewData?.headerImg) {
        setSurveyHeaderImg(previewData.headerImg);
      }
      if (previewData?.bgColor) {
        setSurveyBgColor(previewData.bgColor);
      }
    }
  }, [previewData]);

  //submit success
  useEffect(() => {
    if (mutationAdd.isSuccess) {
      //reset survey
      setSurveyS(_.cloneDeep(previewData.sections)); //orginal data
    }
  }, [mutationAdd.isSuccess]);

  //submit success
  useEffect(() => {
    if (mPublicAdd.isSuccess) {
      //reset survey
      setSurveyS(_.cloneDeep(previewData.sections)); //orginal data
    }
  }, [mPublicAdd.isSuccess]);

  //validate required for question before go next or submit
  function validateRequired() {
    const curSurveyS = surveyS[curSection];
    for (let i = 0; i < curSurveyS.questions.length; i++) {
      //only validate required questions
      const item = curSurveyS.questions[i];
      if (item.required) {
        switch (item.type) {
          case Q_MULTI_CHOICES:
          case Q_CHECKBOXES:
          case Q_DROPDOWN:
            if (item?.options?.filter((ele: any) => ele.checked).length === 0) {
              setRequiredInValidKey(i);
              return false;
            }
            break;
          case Q_SHORT_ANSWER:
          case Q_PARAGRAPH:
          case Q_DATE:
          case Q_TIME:
          case Q_FILE_UPLOAD:
            if (!item?.options[0].answer) {
              setRequiredInValidKey(i);
              return false;
            }
            break;
          case Q_MULTI_CHOICES_GRID:
          case Q_TICK_BOX_GRID:
            let hasGridAnswer: any = {};
            //have answers, but check enough or not
            if (item?.options?.answer) {
              Object.values(item.options.answer).map((ansCols: any, rIdx: number) => {
                Object.values(ansCols).map((value: any) => {
                  if (value) {
                    hasGridAnswer[rIdx] = true;
                  }
                });
              });
              //check if number of answer is not enough (must select answers for all rows)
              if (Object.keys(hasGridAnswer).length < item.options.rows.length) {
                setRequiredInValidKey(i);
                return false;
              }
            } else {
              //no any answers yet
              setRequiredInValidKey(i);
              return false;
            }

            break;
        }
      }
    }

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
  function handleSubmit() {
    //validate required questions before submit
    const isValid = validateRequired();
    if (isValid && !readOnly) {
      if (surveyS && surveyS.length > 0) {
        const params = {
          survey: {
            id,
            name
          },
          answers: JSON.stringify(surveyS)
        };
        if (isPublic) {
          mPublicAdd.mutate({ answer: params, token });
        } else {
          mutationAdd.mutate({ answer: params });
        }
      }
    }
  }

  //set option response
  function handleSetOptionsQ(keyQ: number, newOptions: any) {
    let newSurveyS = [...surveyS];
    //set new
    newSurveyS[curSection].questions[keyQ].options = newOptions;
    //reset required invalid key
    if (keyQ === requiredInValidKey) {
      setRequiredInValidKey(-1);
    }
    //set state
    setSurveyS(newSurveyS);
  }

  //render questions
  const SurveyQuestions = useMemo(() => {
    //console.log('surveyS', surveyS);
    if (surveyS.length === 0) {
      return <NoData label="No survey(s) available." />;
    }
    const surveyQ = surveyS[curSection];
    //console.log('surveyQ', surveyQ);
    return (
      <Stack spacing={1.5}>
        {surveyHeaderImg && <ImagePreview image={surveyHeaderImg} />}
        <SurveyTitleView title={surveyQ.title} description={surveyQ.description} />
        {surveyS[curSection].questions.map((item: any, index: number) => {
          //check answer yet
          let hasAnswer = false;
          if (item.type === Q_MULTI_CHOICES || item.type === Q_CHECKBOXES || item.type === Q_DROPDOWN) {
            if (item.options.filter((ele: any) => ele.checked).length > 0) {
              hasAnswer = true;
            }
          }
          //for grid
          let hasGridAnswer: any = {};
          if (item.type === Q_MULTI_CHOICES_GRID || item.type === Q_TICK_BOX_GRID) {
            if (item.options.answer) {
              //// console.log('item.options.answer', Object.values(item.options.answer));
              Object.values(item.options.answer).map((ansCols: any, rIdx: number) => {
                Object.values(ansCols).map((value: any) => {
                  if (value) {
                    hasGridAnswer[rIdx] = true;
                  }
                });
              });
            }
          }
          return item.type === Q_TITLE || item.type === Q_IMAGE || item.type === Q_VIDEO ? (
            <QuestionMediaView
              key={index}
              //keyQ={index}
              title={item.title}
              image={item.image}
              selectedQType={item.type}
              description={item.description}
              video={item.video}
            />
          ) : (
            <QuestionView
              key={index}
              keyQ={index}
              title={item.title}
              image={item.image}
              required={item.required}
              requiredInValid={requiredInValidKey === index} //valid for required is FALSE
              onSetRequiredInValidKey={setRequiredInValidKey}
              selectedQType={item.type}
              options={item.options}
              hasAnswer={hasAnswer}
              hasGridAnswer={hasGridAnswer}
              onSetOptionsQ={handleSetOptionsQ}
            />
          );
        })}
        {/* submit button */}
        <Stack direction={'row'} spacing={2}>
          {curSection > 0 && (
            <Button size="small" color="primary" variant="contained" startIcon={<ChevronLeftOutlined />} onClick={onPrevious}>
              <SpanLang keyLang="ncrm_generalsetting_survey_btn_previous" />
            </Button>
          )}
          {curSection < surveyS.length - 1 && (
            <Button size="small" color="primary" variant="contained" endIcon={<ChevronRightOutlined />} onClick={onNext}>
              <SpanLang keyLang="ncrm_generalsetting_survey_btn_next_section" />
            </Button>
          )}
          {curSection === surveyS.length - 1 && id != '' && (
            <LoadingButton
              color="primary"
              variant="contained"
              loading={mutationAdd.isLoading || mPublicAdd.isLoading}
              disabled={mutationAdd.isLoading || mPublicAdd.isLoading}
              onClick={handleSubmit}
            >
              <SpanLang keyLang="ncrm_generalsetting_survey_btn_submit_answer" />
            </LoadingButton>
          )}
        </Stack>
      </Stack>
    );
  }, [surveyS, curSection, mutationAdd.isLoading, mPublicAdd.isLoading]);

  //main render
  return <Box sx={{ position: 'relative', width: '100%' }}>{SurveyQuestions}</Box>;
};

export default SurveyView;
