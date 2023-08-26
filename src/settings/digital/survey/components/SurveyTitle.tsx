import IconButton from '@base/components/@extended/IconButton';
import MainCard from '@base/components/App/MainCard';
import { MoreHorizOutlined } from '@mui/icons-material';
import { Fade, Menu, MenuItem, Stack, styled, TextField, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/material';
import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PinkLine1, PinkLine2, VerticalLine } from './Lines';

interface SurveyTitleProps {
  headLineColor: string;
  keyS: number;
  totalS: number;
  focusQ: number;
  focusS: number;
  focusEle: string;
  surveyQ: any;
  onFocusQuestionChange: (keyS: number, keyQ: number) => void;
  onRemoveSection: (idx: number) => void;
  onSurveyChange: (key: string, val: string) => void;
}

const SurveyTitle = (props: SurveyTitleProps) => {
  const { headLineColor, keyS, totalS, focusQ, focusS, focusEle, surveyQ, onFocusQuestionChange, onRemoveSection, onSurveyChange } = props;
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
  const sectionTitle = t('ncrm_generalsetting_survey_form_section') + ' ' + (keyS + 1) + ' ' + t('ncrm_generalsetting_survey_form_of') + ' ' + totalS;
  const titlePlaceholder = keyS === 0 ? t('ncrm_generalsetting_survey_form_survey_title') : t('ncrm_generalsetting_survey_form_section_title');
  const descPlaceholder = keyS === 0 ? t('ncrm_generalsetting_survey_form_survey_description') : t('ncrm_generalsetting_survey_form_section_description');
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
            {totalS > 1 && (
              <IconButton edge="end" aria-label="comments" shape="rounded" color="secondary" onClick={handleMenuClick}>
                <MoreHorizOutlined style={{ fontSize: '1.15rem' }} />
              </IconButton>
            )}
          </Stack>
          {totalS > 1 && (
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
              <MenuItem onClick={() => onRemoveSection(keyS)}>Remove</MenuItem>
            </Menu>
          )}
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

export default SurveyTitle;
