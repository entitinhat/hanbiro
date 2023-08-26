import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';

//third-party
import _, { cloneDeep } from 'lodash';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

//material
import { Box, Stack, useTheme } from '@mui/material';

//project
import ImagePreview from '@base/components/@hanbiro/ImagePreview';
import { generateUUID } from '@base/utils/helpers/generalUtils';

//menu
import { Q_IMAGE, Q_MULTI_CHOICES, Q_TITLE, Q_VIDEO, SURVEY_TYPE_GENERAL } from '../config/constants';
import { storeSurveyToStorage } from '../store/storage';
import Question from './Question';
import QuestionMedia from './QuestionMedia';
import SurveyTitle from './SurveyTitle';
import SurveyToolbar from './SurveyToolbar';

interface QuestionWriteProps {
  storageOn?: boolean;
  scrollTop?: number;
  questionRef?: any;
  surveyId?: string;
  surveyType: string;
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
    surveyType,
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

    //TODO: save to DB - call mutation
    //const params = {};
    //mutationSave.mutate({ survey: params });

    // if (newSurveyS && newSurveyS.length > 0) {
    //   //onSetSaving(true);
    //   //get survey when init write
    //   const surveyName = newSurveyS.length > 0 ? newSurveyS[0].title : '';
    //   const surveyDesc = newSurveyS.length > 0 ? newSurveyS[0].description : '';
    //   const params = {
    //     survey_id: surveyId,
    //     name: surveyName,
    //     description: surveyDesc,
    //     sections: JSON.stringify(newSurveyS)
    //   };
    //   // myAxios.put(apis.updateSurvey, params).then((res) => {
    //   //     onSetSaving(false);
    //   // })
    //   //     .catch(function (error) {
    //   //         //// console.log(error);
    //   //     });
    // }
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
  function handleAddNewQuestion(e: any) {
    e.preventDefault();
    if (focusS !== undefined) {
      let newQuestion = {
        id: generateUUID(),
        type: Q_MULTI_CHOICES,
        title: '',
        image: {
          name: '',
          //url: 'http://global3.hanbiro.com/hungtv/laravelnew/public/web/download?path=/home/HanbiroMailcore/GWDATA/global3.hanbiro.com/laravel/app/upload/image-png/2020-07-27/stat1_5ddd6a332016f2220b8666541e61bbcb.png',
          url: '',
          size: ''
        },
        required: false,
        options: [
          {
            id: generateUUID(),
            value: '',
            image: {
              name: '',
              //url: 'http://global3.hanbiro.com/hungtv/laravelnew/public/web/download?path=/home/HanbiroMailcore/GWDATA/global3.hanbiro.com/laravel/app/upload/image-png/2020-07-27/stat1_5ddd6a332016f2220b8666541e61bbcb.png',
              url: '',
              size: ''
            },
            isOther: false
          }
        ]
      };

      let newSurveyS: any = [...surveyS];
      //newSurveyS[focusS].questions.push(newQuestion);
      newSurveyS[focusS].questions.splice(focusQ, 0, newQuestion);

      //set state
      setSurveyS(newSurveyS);

      //handle save survey thumb
      if (surveyS && surveyS.length > 0) {
        //capture thumb image for survey
        //WHEN: surveyS[0].questions.length=1,2,3 or 4
        if (surveyS[0].questions.length < 5) {
          //save image
          handleSaveSurveyImage();
        }
      }

      //callback
      onChange && onChange(newSurveyS);
    }
  }

  //add new question title to section
  function handleAddNewQuestionMedia(typeQ: number) {
    if (focusS !== undefined) {
      let newQuestion = null;
      switch (typeQ) {
        case Q_TITLE:
          newQuestion = {
            id: generateUUID(),
            type: typeQ,
            title: '',
            description: ''
          };
          break;
        case Q_IMAGE:
          newQuestion = {
            id: generateUUID(),
            type: typeQ,
            title: '',
            image: {
              name: '',
              url: ''
            }
          };
          break;
        case Q_VIDEO:
          newQuestion = {
            id: generateUUID(),
            type: typeQ,
            title: '',
            video: ''
          };
          break;
      }

      let newSurveyS = [...surveyS];
      newSurveyS[focusS].questions.splice(focusQ, 0, newQuestion);

      //set state
      setSurveyS(newSurveyS);

      //callback
      onChange && onChange(newSurveyS);
    }
  }

  //new section
  function handleAddNewSection(e: any) {
    e.preventDefault();
    const newSection = {
      id: generateUUID(),
      title: '',
      description: '',
      questions: [
        {
          id: generateUUID(),
          type: Q_MULTI_CHOICES,
          title: '',
          image: {
            name: '',
            //url: 'http://global3.hanbiro.com/hungtv/laravelnew/public/web/download?path=/home/HanbiroMailcore/GWDATA/global3.hanbiro.com/laravel/app/upload/image-png/2020-07-27/stat1_5ddd6a332016f2220b8666541e61bbcb.png',
            url: '',
            size: ''
          },
          required: false,
          options: [
            {
              id: generateUUID(),
              value: '',
              image: {
                name: '',
                //url: 'http://global3.hanbiro.com/hungtv/laravelnew/public/web/download?path=/home/HanbiroMailcore/GWDATA/global3.hanbiro.com/laravel/app/upload/image-png/2020-07-27/stat1_5ddd6a332016f2220b8666541e61bbcb.png',
                url: '',
                size: ''
              },
              isOther: false
            }
          ]
        }
      ]
    };

    let newSurveyS = cloneDeep(surveyS); //[...surveyS];
    newSurveyS.push(newSection);

    //set state
    setSurveyS(newSurveyS);

    //callback
    onChange && onChange(newSurveyS);
  }

  //remove section to section
  function handleRemoveSection(keyS: number) {
    let newSurveyS = [...surveyS];
    newSurveyS.splice(keyS, 1);

    //set state
    setSurveyS(newSurveyS);

    //callback
    onChange && onChange(newSurveyS);
  }

  //remove question to section
  function handleRemoveQ(keyS: number, keyQ: number) {
    let newSurveyS = [...surveyS];
    newSurveyS[keyS].questions.splice(keyQ, 1);
    setSurveyS(newSurveyS);

    //callback
    onChange && onChange(newSurveyS);
  }

  //copy Question to section
  function handleCopyQ(keyS: number, keyQ: number) {
    let newSurveyS = [...surveyS];
    //get copied question
    let targetQuestions = newSurveyS[keyS].questions.filter((item: any, key: number) => key === keyQ);
    if (targetQuestions.length > 0) {
      //start copy
      const newQuestion = JSON.parse(JSON.stringify(targetQuestions[0])); //copy in deep
      newQuestion.id = generateUUID(); // new id
      newSurveyS[keyS].questions.push(newQuestion);
      //set state
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

  /**====================== DRAG-DROP event ==================================*/
  //drag end, update new position
  const handleDragEnd = (result: any) => {
    //// console.log('handleDragEnd =>', result);
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    //re-order the items
    const newSurveyS = [...surveyS];
    //get source id
    const sourceDropId = source.droppableId.split('-');
    const sourceSectionId = sourceDropId.length > 1 ? parseInt(sourceDropId[1]) : -1;
    if (sourceSectionId > -1) {
      //remove item from source section, source.index = source question index
      const [removedItem] = newSurveyS[sourceSectionId].questions.splice(source.index, 1);
      //insert into destination section
      const destDropId = destination.droppableId.split('-');
      const destSectionId = destDropId.length > 1 ? parseInt(destDropId[1]) : -1;
      if (destSectionId > -1) {
        //destination.index = destination question index
        newSurveyS[destSectionId].questions.splice(destination.index, 0, removedItem);
        setSurveyS(newSurveyS);
        //set focus
        if (focusS !== destSectionId) {
          setFocusS(destSectionId);
        }
        setFocusQ(destination.index + 1);
        setFocusEle('');
      }
    }
  };

  /**====================== RENDER ==================================*/
  //render questions
  const SurveyQuestions = (props: any) => {
    const { surveyQ, keyS, totalS } = props;
    const dropSectionId = `section-${keyS}`;

    return (
      <Droppable droppableId={dropSectionId}>
        {(provided, snapshot) => (
          <Stack
            ref={provided.innerRef}
            spacing={1.5}
            sx={{ p: 1 }}
            // style={{
            //   backgroundColor: snapshot.isDraggingOver
            //     ? 'var(--background-hover-color)'
            //     : 'white',
            // }}
          >
            <SurveyTitle
              headLineColor={surveyHeadLineColor || ''}
              keyS={keyS}
              totalS={totalS}
              focusQ={focusQ}
              focusS={focusS}
              focusEle={focusEle}
              onRemoveSection={handleRemoveSection}
              onFocusQuestionChange={handleFocusQChange}
              //value
              surveyQ={surveyQ}
              onSurveyChange={(keyName: string, keyValue: any) => handleSurveyChange(keyS, keyName, keyValue)}
            />
            {/* render questions */}
            {surveyQ.questions.map((_item: any, index: number) => (
              <Fragment key={index}>
                {_item.type === Q_TITLE || _item.type === Q_IMAGE || _item.type === Q_VIDEO ? (
                  <QuestionMedia
                    keyS={keyS}
                    keyQ={index}
                    focusQ={focusQ}
                    focusS={focusS}
                    focusEle={focusEle}
                    value={_item}
                    onChange={handleQuestionChange}
                    //focus event
                    setFocusEle={setFocusEle}
                    onFocusQuestionChange={handleFocusQChange}
                    //focused - footer - dropdown buttons
                    onRemoveQuestion={handleRemoveQ}
                    onCopyQuestion={handleCopyQ}
                  />
                ) : (
                  <Question
                    surveyType={surveyType}
                    keyS={keyS}
                    keyQ={index}
                    focusQ={focusQ}
                    focusS={focusS}
                    focusEle={focusEle}
                    value={_item}
                    onChange={handleQuestionChange}
                    //focus event
                    setFocusEle={setFocusEle}
                    onFocusQuestionChange={handleFocusQChange}
                    //focused - footer - dropdown buttons
                    onRemoveQuestion={handleRemoveQ}
                    onCopyQuestion={handleCopyQ}
                  />
                )}
              </Fragment>
            ))}
            {provided.placeholder}
          </Stack>
        )}
      </Droppable>
    );
  };

  //Survey sections
  const SurveySections = useMemo(() => {
    return (
      <DragDropContext onDragEnd={handleDragEnd}>
        {surveyS.map((_section: any, idx: number) => (
          <Box key={idx} sx={{ pb: 2 }} ref={idx === 0 ? questionRef : null}>
            <SurveyQuestions surveyQ={_section} keyS={idx} totalS={surveyS.length} />
          </Box>
        ))}
      </DragDropContext>
    );
  }, [surveyS, focusS, focusQ, focusEle, surveyHeadLineColor]);

  return (
    <Box sx={{ position: 'relative', width: '100%', minHeight: '400px' }}>
      {surveyType === SURVEY_TYPE_GENERAL && (
        <SurveyToolbar
          focusS={focusS}
          focusQ={focusQ}
          scrollTop={scrollTop}
          onAddNewQuestion={handleAddNewQuestion}
          onAddNewQuestionMedia={handleAddNewQuestionMedia}
          onAddNewSection={handleAddNewSection}
        />
      )}
      {surveyHeaderImg && <ImagePreview image={surveyHeaderImg} />}
      {/* sections, capture for section 1 */}
      {SurveySections}
    </Box>
  );
};

export default QuestionWrite;
