import IconButton from '@base/components/@extended/IconButton';
import ImagePreview from '@base/components/@hanbiro/ImagePreview';
import MainCard from '@base/components/App/MainCard';
import { ContentCopyOutlined, DeleteOutline, ImageOutlined, MoreVertOutlined } from '@mui/icons-material';
import { Box, Fade, Input, Menu, MenuItem, Stack, TextField, useTheme } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { Q_IMAGE, Q_TITLE, Q_VIDEO } from '../config/constants';
import { VerticalLine } from './Lines';

const QuestionMedia = (props: any) => {
  const {
    keyS,
    keyQ,
    focusS,
    focusQ,
    focusEle,
    value, //=question content: {type, title, image, required, options}
    onChange, //handle question change
    setFocusEle,
    onFocusQuestionChange,
    //focused - buttons event
    onRemoveQuestion,
    onCopyQuestion
    // onQMoveNext,
    // onQMovePrev,
    // onQMoveNextSection,
    // onQMovePrevSection,
    //mouse down event
    //onCopyQ,
    //onRemoveQ
  } = props;
  //lang
  const { t } = useTranslation();
  const theme = useTheme();

  //local state
  const [isLoading, setIsLoading] = useState(false);
  const [questionValue, setQuestionValue] = useState<any>(value);
  const uploadImgRef = useRef<any>(null);
  const descRef = useRef<any>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  useEffect(() => {
    //set pointer to end
    if (descRef && descRef.current) {
      descRef.current.selectionStart = descRef.current.value.length;
      descRef.current.selectionEnd = descRef.current.value.length;
    }
  }, []);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  //open dialog file and upload
  function openUpload() {
    // `current` points to the mounted file input element
    if (uploadImgRef.current) {
      uploadImgRef.current.click();
    }
  }

  //TODO: get file and upload
  function handleImageQChange(e: any) {
    const files: any = e.target.files;
    // console.log('files e', e);

    //TODO: upload file
    if (files.length > 0) {
      //save to state
      handleQValueChange('image', { name: files[0].name, url: files[0] });
      //change focus on title
      const qTitleEleId = 'q-mediatitle-' + keyS + '-' + (keyQ + 1);
      setFocusEle(qTitleEleId);

      //call upload
      //let formData = new FormData();
      //formData.append('file', files[0]);
      // myAxios.post(apis.uploadImage, formData).then((res) => {
      //     setFocusEle('');
      //     setIsLoading(false);
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

  //question value change
  const handleQValueChange = (keyName: string, keyValue: any) => {
    const newQValue = { ...questionValue };
    newQValue[keyName] = keyValue;
    setQuestionValue(newQValue);
    //callback
    onChange && onChange(keyS, keyQ, newQValue);
  };

  //render placehoder for question
  const renderPlaceholder = () => {
    switch (questionValue?.type) {
      case Q_TITLE:
        return t('ncrm_generalsetting_survey_question_media_untitled_title');
      case Q_IMAGE:
        return t('ncrm_generalsetting_survey_question_media_untitled_image');
      case Q_VIDEO:
        return t('ncrm_generalsetting_survey_question_media_untitled_video');
    }
  };

  const qTitleEleId = 'q-mediatitle-' + keyS + '-' + (keyQ + 1);
  const qDescEleId = 'q-mediadesc-' + keyS + '-' + (keyQ + 1);
  const qVideoEleId = 'q-mediavideo-' + keyS + '-' + (keyQ + 1);

  const qImageEleId = 'q-mediaimage-' + keyS + '-' + (keyQ + 1);
  const qCopyEleId = 'q-mediacopy-' + keyS + '-' + (keyQ + 1);
  const qRemoveEleId = 'q-mediaremove-' + keyS + '-' + (keyQ + 1);

  const dragQuestionId = `question-${keyS}-${keyQ}`;

  return (
    <Draggable key={dragQuestionId} draggableId={dragQuestionId} index={keyQ}>
      {(provided, snapshot) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={provided.draggableProps.style}
          //className="pos-relative pd-t-5"
          onClick={() => {
            onFocusQuestionChange(keyS, keyQ + 1);
          }}
        >
          <MainCard sx={{ backgroundColor: theme.palette.background.paper }}>
            <Stack spacing={1.5}>
              {/* blue vertical line */}
              {focusS === keyS && focusQ === keyQ + 1 && <VerticalLine />}
              <Stack direction={'row'} alignItems="center" spacing={1}>
                <TextField
                  fullWidth
                  autoComplete="off"
                  id={qTitleEleId}
                  placeholder={renderPlaceholder()}
                  value={questionValue?.title}
                  onChange={(e: any) => handleQValueChange('title', e.target.value)}
                  autoFocus={qTitleEleId === focusEle}
                />
                {questionValue?.type === Q_IMAGE && (
                  <>
                    <IconButton shape="rounded" id={qImageEleId} onClick={openUpload}>
                      <ImageOutlined />
                    </IconButton>
                    <Input
                      type="file"
                      //name="file"
                      ref={uploadImgRef}
                      inputProps={{ accept: 'image/*' }}
                      sx={{ display: 'none' }}
                      onChange={handleImageQChange} //TODO
                    />
                  </>
                )}
                <IconButton shape="rounded" color="secondary" id={qCopyEleId} onClick={() => onCopyQuestion(keyS, keyQ)}>
                  <ContentCopyOutlined fontSize="small" />
                </IconButton>
                <IconButton shape="rounded" color="secondary" id={qRemoveEleId} onClick={() => onRemoveQuestion(keyS, keyQ)}>
                  <DeleteOutline fontSize="small" />
                </IconButton>
              </Stack>
              <Stack direction={'row'} alignItems="center" spacing={1}>
                <TextField
                  fullWidth
                  autoComplete="off"
                  id={qDescEleId}
                  inputRef={descRef}
                  multiline
                  rows={3}
                  placeholder={t('ncrm_generalsetting_survey_question_media_untitled_description') as string}
                  value={questionValue?.description || ''}
                  onChange={(e: any) => handleQValueChange('description', e.target.value)}
                  autoFocus={qDescEleId === focusEle}
                />
              </Stack>
              {questionValue?.type === Q_IMAGE && questionValue?.image?.url instanceof File && (
                <Box sx={{ position: 'relative', p: 1.5 }}>
                  <ImagePreview image={questionValue.image.url} />
                  {focusS === keyS && focusQ === keyQ + 1 && (
                    <Box sx={{ position: 'absolute', top: '14px', left: '32px' }}>
                      <IconButton shape="rounded" color={'secondary'} onClick={handleMenuClick}>
                        <MoreVertOutlined style={{ fontSize: '1.15rem' }} />
                      </IconButton>
                    </Box>
                  )}
                  <Menu
                    id="fade-menu"
                    MenuListProps={{
                      'aria-labelledby': 'fade-button'
                    }}
                    anchorEl={anchorEl}
                    open={openMenu}
                    onClose={() => setAnchorEl(null)}
                    TransitionComponent={Fade}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right'
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                  >
                    <MenuItem onClick={() => handleQValueChange('image', { name: '', url: '' })}>Remove</MenuItem>
                  </Menu>
                </Box>
              )}
              {questionValue?.type === Q_VIDEO && (
                <TextField
                  fullWidth
                  autoComplete="off"
                  id={qVideoEleId}
                  placeholder={t('ncrm_generalsetting_survey_question_media_youtube_link') as string}
                  value={questionValue?.video || ''}
                  onChange={(e: any) => handleQValueChange('video', e.target.value)}
                  autoFocus={qVideoEleId === focusEle}
                />
              )}
            </Stack>
          </MainCard>
        </Box>
      )}
    </Draggable>
  );
};

export default QuestionMedia;
