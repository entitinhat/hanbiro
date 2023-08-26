import { useMemo, useRef, useState } from 'react';

//third-party
import { Draggable } from 'react-beautiful-dnd';
import { cloneDeep } from 'lodash';
import { useTranslation } from 'react-i18next';

//material
import { Box, Stack, useTheme } from '@mui/material';

//project
import MainCard from '@base/components/App/MainCard';
import { generateUUID } from '@base/utils/helpers';

//menu
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
  SURVEY_TYPE_GENERAL
} from '@settings/digital/survey/config/constants';
import { VerticalLine } from '../Lines';
import Footer from './Footer';
import ImageView from './ImageView';
import QuestionOption from './Option';
import QuestionTitleType from './TitleType';

interface QuestionProps {
  surveyType?: string;
  keyS: number;
  keyQ: number;
  focusS: number;
  focusQ: number;
  focusEle: string;
  value: any;
  onChange: (indexS: number, indexQ: number, newQuestion: any) => void;
  setFocusEle: (ele: string) => void;
  onFocusQuestionChange: (keyS: any, keyQ: any) => void;
  onRemoveQuestion: (keyS: number, keyQ: number) => void;
  onCopyQuestion: (keyS: number, keyQ: number) => void;
}

const Question = (props: QuestionProps) => {
  const {
    surveyType,
    keyS,
    keyQ,
    focusS,
    focusQ,
    focusEle,
    //value callback
    value, //=question content: {type, title, image, required, options}
    onChange, //handle question change
    //focus element
    setFocusEle,
    onFocusQuestionChange,
    //focused - buttons event
    onRemoveQuestion,
    onCopyQuestion
  } = props;
  const theme = useTheme();
  const { t } = useTranslation();
  
  //state
  //const [isLoading, setIsLoading] = useState(false);
  const [questionValue, setQuestionValue] = useState<any>(value);
  const [isValid, setIsValid] = useState<any>(null); //default validation is OK
  const imageOptRefs =
    value?.type !== Q_MULTI_CHOICES_GRID && value?.type !== Q_TICK_BOX_GRID ? value?.options?.map((x: any) => useRef(null)) : null; //for options array - create ref array

  //check duplicate, not for empty
  function checkOptionDuplicate(curOptions: any, newValue: any) {
    let isDuplicated = false;
    curOptions.map((_option: any) => {
      if (_option.value !== '' && _option.value === newValue) {
        isDuplicated = true;
      }
    });
    return isDuplicated;
  }

  //open dialog file and upload
  const handleOpenUpload = (idx: number) => {
    // `current` points to the mounted file input element
    if (imageOptRefs && imageOptRefs[idx] && imageOptRefs[idx].current) {
      imageOptRefs[idx].current.click();
    }
  };

  //TODO: get file and upload
  function handleImageOptChange(e: any, optIdx: number) {
    const files: any = e.target.files;
    //// console.log('option images e', e);

    if (files.length > 0) {
      //save to state
      handleQOptionChange('image', { name: files[0].name, url: files[0] }, optIdx);

      //call upload
      //let formData = new FormData();
      //formData.append('file', files[0]);
      // myAxios.post(apis.uploadImage, formData).then((res) => {
      //     setIsLoading(false);
      //     setFocusEle('');
      //     if (res.data.success) {
      //         //update image state
      //         let newOptions = [...optionsQ];

      //         const newImage = { ...newOptions.image };
      //         newImage.name = res.data.data.name;
      //         newImage.url = apis.getImage + '?path=' + res.data.data.path + res.data.data.name;
      //         newOptions[idx].image = newImage;

      //         //set local state
      //         //setOptionsQ(newOptions);

      //         //update surveyQ
      //         onSetOptionsQ(keyQ, newOptions);
      //     }
      // })
      // .catch(function (error) {
      //     //// console.log(error);
      // });
    }
  }

  //new option
  const getDefaultOptions = (type: any) => {
    //reset options
    let newOptions: any = [];
    switch (type) {
      case Q_MULTI_CHOICES:
      case Q_CHECKBOXES:
      case Q_DROPDOWN:
        newOptions = [
          {
            id: generateUUID(),
            value: '',
            image: {
              name: '',
              url: '',
              size: ''
            },
            isOther: false
          }
        ];
        break;
      case Q_SHORT_ANSWER:
      case Q_PARAGRAPH:
      case Q_DATE:
      case Q_TIME:
        newOptions = [
          {
            id: generateUUID(),
            value: '',
            isOther: false
          }
        ];
        break;
      case Q_FILE_UPLOAD:
        newOptions = [
          {
            id: generateUUID(),
            value: false, //allow file types
            isOther: false
          },
          {
            id: generateUUID(),
            value: 1, //max number of files
            isOther: false
          },
          {
            id: generateUUID(),
            value: 1, //max file size
            isOther: false
          }
        ];
        break;
      case Q_MULTI_CHOICES_GRID:
      case Q_TICK_BOX_GRID:
        newOptions = {
          rows: [
            {
              id: generateUUID(),
              value: '',
              isOther: false
            }
          ],
          cols: [
            {
              id: generateUUID(),
              value: '',
              isOther: false
            },
            {
              id: generateUUID(),
              value: '',
              isOther: false
            }
          ]
        };
        break;
    }
    return newOptions;
  };

  //question value change
  const handleQValueChange = (keyName: string, keyValue: any) => {
    const newQValue = { ...questionValue };
    newQValue[keyName] = keyValue;
    //if different type, change options
    if (keyName === 'type') {
      newQValue.options = getDefaultOptions(keyValue);
      setFocusEle('');
    }
    setQuestionValue(newQValue);
    //callback
    onChange && onChange(keyS, keyQ, newQValue);
  };

  //change option content
  const handleQOptionChange = (keyName: string, keyValue: any, optIdx: number) => {
    const newQValue = { ...questionValue };
    if (newQValue.type === Q_FILE_UPLOAD || keyName === 'image') {
      newQValue.options[optIdx][keyName] = keyValue;
      setQuestionValue(newQValue);
      //callback
      onChange && onChange(keyS, keyQ, newQValue);
    } else {
      const preOptionsQ = cloneDeep(newQValue.options); //for check duplicated
      newQValue.options[optIdx][keyName] = keyValue;
      //check duplicate
      const duplicated = checkOptionDuplicate(preOptionsQ, keyValue);
      setIsValid({ id: optIdx, value: !duplicated });
      if (!duplicated) {
        setQuestionValue(newQValue);
        //callback
        onChange && onChange(keyS, keyQ, newQValue);
      }
    }
  };

  //add normal option
  const handleAddOption = (isOther: boolean) => {
    const newQValue = { ...questionValue };
    let newOpt = {
      id: generateUUID(),
      value: isOther ? t('ncrm_generalsetting_survey_question_other') : '',
      image: {
        name: '',
        url: ''
      },
      isOther: isOther
    };
    newQValue.options.push(newOpt);

    //move isOther item to last
    if (!isOther) {
      newQValue.options = newQValue.options
        .filter((item: any) => !item.isOther)
        .concat(newQValue.options.filter((item: any) => item.isOther));
    }

    setQuestionValue(newQValue);
    //callback
    onChange && onChange(keyS, keyQ, newQValue);
  };

  //remove an option
  const handleRemoveOption = (idx: number) => {
    const newQValue = { ...questionValue };
    newQValue.options.splice(idx, 1);
    setQuestionValue(newQValue);
    //callback
    onChange && onChange(keyS, keyQ, newQValue);
  };

  //for grid
  const handleGridOptionValueChange = (gridType: 'rows' | 'cols', e: any, idx: number) => {
    const newQValue = { ...questionValue };
    const preOptionsQ = cloneDeep(newQValue.options); //for check duplicated
    newQValue.options[gridType][idx].value = e.target.value;

    //check duplicate
    const duplicated = checkOptionDuplicate(preOptionsQ[gridType], e.target.value);
    setIsValid({ id: idx, type: gridType, value: !duplicated });
    if (!duplicated) {
      setQuestionValue(newQValue);
      //callback
      onChange && onChange(keyS, keyQ, newQValue);
    }
  };

  //add row option for grid
  const handleAddGridOption = (gridType: 'rows' | 'cols') => {
    const newQValue = { ...questionValue };
    let newOpt = {
      id: generateUUID(),
      value: '',
      isOther: false
    };
    newQValue.options[gridType].push(newOpt);
    setQuestionValue(newQValue);
    //callback
    onChange && onChange(keyS, keyQ, newQValue);
  };

  //for grid
  const handleRemoveGridOption = (gridType: 'rows' | 'cols', idx: number) => {
    const newQValue = { ...questionValue };
    newQValue.options[gridType].splice(idx, 1);
    setQuestionValue(newQValue);
    //callback
    onChange && onChange(keyS, keyQ, newQValue);
  };

  /** ====================================== RENDER ======================================= */

  //render blue vertical line
  const BlueVerticalLine = useMemo(() => {
    return focusS === keyS && focusQ === keyQ + 1 && <VerticalLine />;
  }, [focusS, keyS, focusQ, keyQ]);

  const dragQuestionId = `question-${keyS}-${keyQ}`;
  return (
    <Draggable key={dragQuestionId} draggableId={dragQuestionId} index={keyQ}>
      {(provided, snapshot) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{ ...provided.draggableProps.style, left: 'auto !important' }}
          onClick={() => {
            onFocusQuestionChange(keyS, keyQ + 1);
          }}
        >
          <MainCard sx={{ backgroundColor: theme.palette.background.paper }}>
            <Stack spacing={1.5}>
              {BlueVerticalLine}
              <QuestionTitleType
                surveyType={surveyType}
                focusS={focusS}
                focusQ={focusQ}
                keyS={keyS}
                keyQ={keyQ}
                focusEle={focusEle}
                selectedQType={questionValue?.type}
                title={questionValue?.title}
                onTitleChange={(text: string) => handleQValueChange('title', text)}
                onQuestionTypeChange={(newType: any) => handleQValueChange('type', newType)}
                onQuestionImageChange={(newImage: any) => handleQValueChange('image', newImage)}
              />
              {questionValue?.image && questionValue?.image?.url && (
                <ImageView
                  focusS={focusS}
                  focusQ={focusQ}
                  keyS={keyS}
                  keyQ={keyQ}
                  imageQ={questionValue?.image} //imageQ
                  onRemoveQImage={() => handleQValueChange('image', { name: '', url: '' })}
                />
              )}
              {/* question options group */}
              {
                <QuestionOption
                  focusS={focusS}
                  focusQ={focusQ}
                  keyS={keyS}
                  keyQ={keyQ}
                  focusEle={focusEle}
                  type={questionValue?.type}
                  optionsQ={questionValue?.options}
                  isValid={isValid}
                  imageOptRefs={imageOptRefs}
                  //normal event
                  onOptionValueChange={(newValue: any, optIndex: number) => handleQOptionChange('value', newValue, optIndex)}
                  onOptionSelectChange={(newValue: any, optIndex: number) => handleQOptionChange('value', newValue, optIndex)}
                  onOpenUpload={handleOpenUpload}
                  onImageOptChange={handleImageOptChange} //TODO
                  onRemoveOptImage={(optIndex: number) => handleQOptionChange('image', { name: '', url: '' }, optIndex)}
                  onRemoveOption={handleRemoveOption}
                  onAddOption={() => handleAddOption(false)}
                  onAddOtherOption={() => handleAddOption(true)}
                  //grid event
                  onRowOptionValueChange={(e: any, idx: number) => handleGridOptionValueChange('rows', e, idx)}
                  onColOptionValueChange={(e: any, idx: number) => handleGridOptionValueChange('cols', e, idx)}
                  onAddRowOption={() => handleAddGridOption('rows')}
                  onAddColOption={() => handleAddGridOption('cols')}
                  onRemoveRowOption={(optIdx: number) => handleRemoveGridOption('rows', optIdx)}
                  onRemoveColOption={(optIdx: number) => handleRemoveGridOption('cols', optIdx)}
                />
              }
              {/* footer */}
              {surveyType === SURVEY_TYPE_GENERAL && focusS === keyS && focusQ === keyQ + 1 && (
                <Footer
                  keyS={keyS}
                  keyQ={keyQ}
                  required={questionValue?.required}
                  onCopyQuestion={onCopyQuestion}
                  onRemoveQuestion={onRemoveQuestion}
                  onRequiredQChange={(newValue: boolean) => handleQValueChange('required', newValue)}
                />
              )}
            </Stack>
          </MainCard>
        </Box>
      )}
    </Draggable>
  );
};

export default Question;
