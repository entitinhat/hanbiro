import { useEffect, useRef, useState } from 'react';

//third-party
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

//material
import { MoreHorizOutlined } from '@mui/icons-material';
import { Box, Fade, Menu, MenuItem, Stack, styled, TextField, Typography, useTheme } from '@mui/material';

//project
import IconButton from '@base/components/@extended/IconButton';
import MainCard from '@base/components/App/MainCard';

//related-menu
import { PinkLine1, VerticalLine } from '@settings/digital/survey/components/Lines';

interface TitleWriteProps {
  headLineColor: string;
  keyS: number;
  totalS: number;
  focusQ: number;
  focusS: number;
  focusEle: string;
  surveyQ: any;
  onFocusQuestionChange: (keyS: number, keyQ: number) => void;
  onSurveyChange: (key: string, val: string) => void;
}

const TitleWrite = (props: TitleWriteProps) => {
  const { headLineColor, keyS, totalS, focusQ, focusS, focusEle, surveyQ, onFocusQuestionChange, onSurveyChange } = props;
  const { t } = useTranslation();
  const theme = useTheme();
  //state
  const descRef = useRef<any>(null);
  const [title, setTitle] = useState<string>(surveyQ.title || '');
  //const setTitleDebounced = useRef(_.debounce((text) => onSurveyChange('title', text), 100)).current;
  const [description, setDescription] = useState<string>(surveyQ.description || '');
  //const setDescriptionDebounced = useRef(_.debounce((text) => onSurveyChange('description', text), 100)).current;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  //textarea: set pointer end
  useEffect(() => {
    if (descRef && descRef.current) {
      descRef.current.selectionStart = descRef.current.value.length;
      descRef.current.selectionEnd = descRef.current.value.length;
    }
  }, []);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  //placeholder
  const sectionTitle = t('Section') + ' ' + (keyS + 1) + ' ' + t('of') + ' ' + totalS;
  const titlePlaceholder = keyS === 0 ? t('Survey title') : t('Section title');
  const descPlaceholder = keyS === 0 ? t('Survey description') : t('Section description');
  const surveyTitleEleId = 'survey-title-' + keyS + '-0';
  const surveyDescEleId = 'survey-desc-' + keyS + '-0';
  const surveyDropdownEleId = 'survey-dropdown-' + keyS + '-0';

  return (
    <Box>
      {totalS > 1 && (
        <Box sx={{ borderTopLeftRadius: 2, borderTopRightRadius: 2 }}>
          <Typography variant="h6">{sectionTitle}</Typography>
        </Box>
      )}
      <MainCard sx={{ backgroundColor: theme.palette.background.paper }} onClick={() => onFocusQuestionChange(keyS, 0)}>
        {/* {totalS === 1 && <PinkLine1 bgcolor={headLineColor} />}
        {totalS > 1 && <PinkLine2 bgcolor={headLineColor} />} */}
        <PinkLine1 bgcolor={headLineColor} />
        {focusS === keyS && focusQ === 0 && <VerticalLine />}

        <Stack spacing={1}>
          <Stack direction={'row'} alignItems="center" justifyContent="space-between" spacing={2}>
            <TextField
              fullWidth
              autoComplete="off"
              id={surveyTitleEleId}
              placeholder={titlePlaceholder}
              value={title} //surveyQ?.title
              onChange={(e: any) => {
                setTitle(e.target.value);
                //setTitleDebounced(e.target.value);
                onSurveyChange('title', e.target.value as string);
              }}
              autoFocus={surveyTitleEleId === focusEle}
            />
          </Stack>
          <TextField
            fullWidth
            id={surveyDescEleId}
            inputRef={descRef}
            multiline
            rows={3}
            placeholder={descPlaceholder}
            value={description}
            onChange={(e: any) => {
              setDescription(e.target.value);
              //setDescriptionDebounced(e.target.value);
              onSurveyChange('description', e.target.value as string);
            }}
            autoFocus={surveyDescEleId === focusEle}
          />
        </Stack>
      </MainCard>
    </Box>
  );
};

export default TitleWrite;
