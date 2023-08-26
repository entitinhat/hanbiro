import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';

//third-party
import _, { cloneDeep } from 'lodash';

//project
import ImagePreview from '@base/components/@hanbiro/ImagePreview';
import { generateUUID } from '@base/utils/helpers/generalUtils';

//material
import { Box, Stack, useTheme } from '@mui/material';

//related-menu
import { storeSurveyToStorage } from '@settings/digital/survey/store/storage';

//local
import Question from './Question';
import TitleWrite from './TitleWrite';
import Toolbar from './Toolbar';

interface QuestionWriteProps {
  storageOn?: boolean;
  scrollTop?: number;
  questionRef?: any;
  surveyId?: string;
  surveyHeaderImg?: string;
  surveyHeadLineColor?: string;
  surveyBgColor?: string;
  surveyImage: string; //TODO
  value: any; //surveySections
  onChange: (val: any) => void; //onSetSurveySections
}

const QuestionWrite = (props: QuestionWriteProps) => {
  const {
    storageOn = false,
    scrollTop = 0,
    questionRef,
    surveyId,
    surveyHeaderImg,
    surveyHeadLineColor,
    surveyBgColor,
    surveyImage, //TODO
    value, //surveySections
    onChange //onSetSurveySections
  } = props;
  const theme = useTheme();
  //state
  const [focusS, setFocusS] = useState<number>(0); //focus section
  const [focusQ, setFocusQ] = useState<number>(0); //focus question
  const [surveyS, setSurveyS] = useState<any>([]); //all sections
  const [focusEle, setFocusEle] = useState<any>(null);

  //add question when focusing on child (question) component
  function handleEleClick(e: any) {
    const el = e.path;
    //// console.log('el', el);

    //handle focusing
    let surveyEleId = el[0].id ? el[0].id : el[1].id;
    surveyEleId = surveyEleId ? surveyEleId : el[2].id;
    //surveyEleId = surveyEleId ? surveyEleId : el[3].id;
    //// console.log('surveyEleId', surveyEleId);

    //format: q-optinput-0-5-1 --> 0: section index, 5: question index, 1: option index
    if (surveyEleId) {
      const items = surveyEleId.split('-');
      const nameEle = items[0] + '-' + items[1];
      const elKeyS = parseInt(items[2]);
      const elKeyQ = parseInt(items[3]); //idx

      //for input element
      if (
        nameEle === 'survey-title' ||
        nameEle === 'survey-desc' ||
        nameEle === 'survey-dropdown' ||
        nameEle === 'q-title' ||
        nameEle === 'q-optinput' ||
        //|| nameEle === 'q-move'
        nameEle === 'q-mediatitle' ||
        nameEle === 'q-mediadesc' ||
        nameEle === 'q-mediavideo' ||
        nameEle === 'q-rowopt' ||
        nameEle === 'q-colopt'
      ) {
        setFocusEle(surveyEleId); //focus on element (eg: input)
        setFocusS(elKeyS); //focus on section
        setFocusQ(elKeyQ); //focus on question
      }
    } else {
      //setFocusEle('');
    }
  }

  //set init data for survey
  useEffect(() => {
    //// console.log('init sections', value);
    //window.scrollTo({ behavior: 'smooth', top: 980 });
    if (value) {
      if (JSON.stringify(value) !== JSON.stringify(surveyS)) {
        setSurveyS(value);
      }
    } else {
      setSurveyS([]); //TODO: init default value
    }
  }, [value]);

  //handle mouseup to check element event click and focus
  useEffect(() => {
    document.addEventListener('mouseup', handleEleClick);
    return () => {
      document.removeEventListener('mouseup', handleEleClick);
    };
  }, []);

  //handle saving when survey content changes
  useEffect(() => {
    if (storageOn) {
      //auto save for text content
      const surveyData = {
        id: surveyId,
        headerImg: surveyHeaderImg || '',
        headerLineColor: surveyHeadLineColor,
        bgColor: surveyBgColor,
        //image: surveyImage,
        sections: surveyS
      };
      handleSaveSurveyDebounce(_.cloneDeep(surveyData));
    }
  }, [surveyS, surveyHeadLineColor]);

  //indexeddb store
  async function storeSurvey(data: any) {
    return await storeSurveyToStorage(data);
  }

  //debounce save survey
  const handleSaveSurvey = (surveyData: any) => {
    // console.log('handle indexeddb saving..... ', surveyData);
    //save to indexeddb
    storeSurvey(surveyData);
  };
  //debounce function
  const handleSaveSurveyDebounce = useCallback(_.debounce(handleSaveSurvey, 1000), []);

  //handle save survey thumb image
  function handleSaveSurveyImage() {}

  //change focus to section
  function handleFocusQChange(keyS: any, keyQ: any) {
    setFocusS(keyS);
    setFocusQ(keyQ);
  }

  //add new question to section
  function handleAddOptionRow(e: any) {
    e.preventDefault();
    if (focusS !== undefined) {
      const newSurveyS: any = [...surveyS];
      const newOptionRow = {
        id: generateUUID(),
        value: '',
        isOther: false
      };
      newSurveyS[focusS].questions[0].options.rows.push(newOptionRow);
      setSurveyS(newSurveyS);
      //callback
      onChange && onChange(newSurveyS);
    }
  }

  //survey value change: title, description
  const handleSurveyChange = (indexS: number, keyName: string, keyValue: any) => {
    const newSurveyS = [...surveyS];
    newSurveyS[indexS][keyName] = keyValue;
    setSurveyS(newSurveyS);
    //callback
    onChange && onChange(newSurveyS);
  };

  //question content change
  const handleQuestionChange = (indexS: number, indexQ: number, newQuestion: any) => {
    const newSurveyS = [...surveyS];
    newSurveyS[indexS].questions[indexQ] = newQuestion;
    setSurveyS(newSurveyS);
    //callback
    onChange && onChange(newSurveyS);
  };

  /**====================== RENDER ==================================*/
  //render questions
  const SurveyQuestions = (props: any) => {
    const { surveyQ, keyS, totalS } = props;

    return (
      <Stack spacing={1.5} sx={{ p: 1 }}>
        <TitleWrite
          headLineColor={surveyHeadLineColor || ''}
          keyS={keyS}
          totalS={totalS}
          focusQ={focusQ}
          focusS={focusS}
          focusEle={focusEle}
          onFocusQuestionChange={handleFocusQChange}
          surveyQ={surveyQ}
          onSurveyChange={(keyName: string, keyValue: any) => handleSurveyChange(keyS, keyName, keyValue)}
        />
        {/* render questions */}
        {surveyQ.questions.map((_item: any, index: number) => (
          <Fragment key={index}>
            <Question
              editMode="write"
              keyS={keyS}
              keyQ={index}
              focusQ={focusQ}
              focusS={focusS}
              focusEle={focusEle}
              value={_item}
              onChange={handleQuestionChange}
              setFocusEle={setFocusEle}
              onFocusQuestionChange={handleFocusQChange}
            />
          </Fragment>
        ))}
      </Stack>
    );
  };
  //Survey sections
  const SurveySections = useMemo(() => {
    return (
      <>
        {surveyS.map((_section: any, idx: number) => (
          <Box key={idx} sx={{ pb: 2 }} ref={idx === 0 ? questionRef : null}>
            <SurveyQuestions surveyQ={_section} keyS={idx} totalS={surveyS.length} />
          </Box>
        ))}
      </>
    );
  }, [surveyS, focusS, focusQ, focusEle, surveyHeadLineColor]);

  return (
    <Box sx={{ position: 'relative', width: '100%', minHeight: '400px' }}>
      <Toolbar focusS={focusS} focusQ={focusQ} scrollTop={scrollTop} onAddNewOptionRow={handleAddOptionRow} />
      {surveyHeaderImg && <ImagePreview image={surveyHeaderImg} />}
      {SurveySections}
    </Box>
  );
};

export default QuestionWrite;
