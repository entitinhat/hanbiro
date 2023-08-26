import React, { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import { Stack, TextField } from '@mui/material';
import QuestionTypes from '@settings/digital/survey/components/QuestionTypes';
import IconButton from '@base/components/@extended/IconButton';
import { ImageOutlined } from '@mui/icons-material';
import { SURVEY_TYPE_GENERAL } from '../../config/constants';
import { useTranslation } from 'react-i18next';

//render question types
const QuestionTitleType: React.FC<any> = (props) => {
  //props
  const {
    surveyType,
    focusS,
    focusQ,
    keyS,
    keyQ,
    focusEle,
    selectedQType,
    title,
    onTitleChange,
    onQuestionTypeChange,
    onQuestionImageChange
  } = props;
  const { t } = useTranslation();
  //element id
  const qTitleEleId = 'q-title-' + keyS + '-' + (keyQ + 1);
  const qImageEleId = 'q-image-' + keyS + '-' + (keyQ + 1);

  //state
  const uploadImageQRef = useRef<any>(null); //for question image input
  //let initialRef = useRef<any>(null); //for only first Run
  const [text, setText] = useState<string>(title || '');
  const setTextDebounced = useRef(_.debounce((text) => onTitleChange(text), 100)).current;

  //monitor for open file dialog
  // useEffect(() => {
  //   if (focusEle) {
  //     const qImageEleId = 'q-image-' + keyS + '-' + (keyQ + 1); //for question image
  //     //open file dialog
  //     if (focusEle === qImageEleId) {
  //       if (!initialRef.current) {
  //         handleOpenUpload();
  //         initialRef = uploadImageQRef;
  //       }
  //     }
  //   }
  // }, []); //focusEle

  //open dialog file and upload
  function handleOpenUpload() {
    // `current` points to the mounted file input element
    if (uploadImageQRef.current) {
      uploadImageQRef.current.click();
    }
  }

  //get file and upload
  function handleImageQChange(e: any) {
    //get file
    const files = e.target.files;
    //// console.log('question images e', e);

    if (files.length > 0) {
      onQuestionImageChange({ name: files[0].name, url: files[0] });

      //call upload
      //let formData = new FormData();
      //formData.append('file', files[0]);
      // myAxios.post(apis.uploadImage, formData).then((res) => {
      //     setIsLoading(false);
      //     setFocusEle('');
      //     if (res.data.success) {
      //         //update image state
      //         const newImage = { ...imageQ };
      //         newImage.name = res.data.data.name;
      //         newImage.url = apis.getImage + '?path=' + res.data.data.path + res.data.data.name;
      //         //set local state
      //         setImageQ(newImage);

      //         //set in write component
      //         onImageQChange(keyQ, newImage);
      //     }
      // })
      // .catch(function (error) {
      //     //// console.log(error);
      // });
    }
  }

  //render
  return (
    <Stack direction={'row'} alignItems={'center'} spacing={1}>
      <TextField
        fullWidth
        autoComplete="off"
        id={qTitleEleId}
        placeholder={t('ncrm_generalsetting_survey_question_untitled') as string}
        value={text}
        onChange={(e: any) => {
          setText(e.target.value);
          setTextDebounced(e.target.value);
        }}
        autoFocus={qTitleEleId === focusEle}
      />
      {/* types */}
      {focusS === keyS && focusQ === keyQ + 1 && (
        <>
          <input type="file" accept="image/*" ref={uploadImageQRef} style={{ display: 'none' }} onChange={handleImageQChange} />
          <IconButton shape="rounded" color="secondary" onClick={handleOpenUpload}>
            <ImageOutlined />
          </IconButton>

          {surveyType === SURVEY_TYPE_GENERAL && (
            <QuestionTypes
              keyS={keyS}
              keyQ={keyQ}
              selectedQType={selectedQType}
              onQuestionTypeChange={onQuestionTypeChange}
              focusEle={focusEle}
            />
          )}
        </>
      )}
    </Stack>
  );
};

export default QuestionTitleType;
