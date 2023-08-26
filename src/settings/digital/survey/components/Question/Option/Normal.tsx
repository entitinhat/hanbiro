import React, { useEffect, useRef, useState } from 'react';
//import Icons from '@base/assets/icons/svg-icons';
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
  Q_TICK_BOX_GRID
} from '@settings/digital/survey/config/constants';
import _, { cloneDeep } from 'lodash';
import { Box, Button, Fade, FormControl, FormControlLabel, Menu, MenuItem, Stack, Switch, TextField, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import QuestionIcon from '../Symbol';
import { Typography } from '@mui/material';
import { DeleteOutlined, MoreVertOutlined, WarningOutlined } from '@mui/icons-material';
import ImagePreview from '@base/components/@hanbiro/ImagePreview';
import IconButton from '@base/components/@extended/IconButton';
import Dropdown from '@base/components/@hanbiro/Dropdown';

//render question options
const OptionNormal: React.FC<any> = (props) => {
  const {
    focusS,
    focusQ,
    keyS,
    keyQ,
    focusEle,
    type = '',
    optionsQ = [],
    isValid,
    imageOptRefs,
    onOptionValueChange,
    onOptionSelectChange,
    onOpenUpload,
    onImageOptChange,
    onRemoveOptImage,
    onRemoveOption,
    onAddOption,
    onAddOtherOption
  } = props;
  const { t } = useTranslation();
  //state
  const [locOptions, setLocOptions] = useState<any[]>(cloneDeep(optionsQ));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const setOptionDebounced = useRef(_.debounce((text, idx) => onOptionValueChange(text, idx), 100)).current;
  //let initialRef = useRef<any>(null); //for only first Run
  const isExist =
    type !== Q_MULTI_CHOICES_GRID && type !== Q_TICK_BOX_GRID && optionsQ.filter((_item: any) => _item.isOther).length > 0 ? true : false;

  /** ================================== HANDLER ========================================== */
  //monitor for open file dialog
  // useEffect(() => {
  //   if (focusEle) {
  //     //for option image: q-optimg-0-1-3
  //     const items = focusEle.split('-');
  //     const nameEle = items[0] + '-' + items[1];
  //     if (nameEle === 'q-optimg') {
  //       const idx = parseInt(items[4]) - 1;
  //       if (!initialRef.current) {
  //         onOpenUpload(idx);
  //         initialRef = imageOptRefs[idx];
  //       }
  //     }
  //   }
  // }, []); //focusEle

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  //local option changes
  const handleLocOptionChange = (text: string, index: number) => {
    const newOptions = [...locOptions];
    locOptions[index].value = text;
    setLocOptions(newOptions);
  };

  /** ================================== RENDER ========================================== */
  //render options
  const renderOption = (opt: any, idx: number) => {
    //const optKey = 'optfile' + (keyQ + 1).toString() + (idx+1).toString();
    const qOptionInputEleId = 'q-optinput-' + keyS + '-' + (keyQ + 1) + '-' + (idx + 1);
    const qOptionImgEleId = 'q-optimg-' + keyS + '-' + (keyQ + 1) + '-' + (idx + 1);
    const qOptionRemoveEleId = 'q-optremove-' + keyS + '-' + (keyQ + 1) + '-' + (idx + 1);

    if (type === Q_MULTI_CHOICES || type === Q_CHECKBOXES || type === Q_DROPDOWN) {
      return (
        <Box key={idx}>
          <Stack direction={'row'} alignItems="center" justifyContent={'space-between'} spacing={1}>
            <Stack direction={'row'} flex={1} alignItems="center" spacing={1}>
              <QuestionIcon indexNo={idx + 1} type={type} />
              {opt.isOther ? (
                <Typography>{opt.value}</Typography>
              ) : (
                <TextField
                  fullWidth
                  autoComplete="off"
                  id={qOptionInputEleId}
                  placeholder={t('ncrm_generalsetting_survey_options_single_option') + ' ' + (idx + 1)}
                  value={opt.value}
                  onChange={(e: any) => {
                    handleLocOptionChange(e.target.value, idx);
                    setOptionDebounced(e.target.value, idx);
                  }} //save on state
                  autoFocus={qOptionInputEleId === focusEle}
                />
              )}
            </Stack>
            <Stack spacing={1}>
              {/* duplicated option name */}
              {focusS === keyS && focusQ === keyQ + 1 && isValid && isValid.id === idx && !isValid.value && (
                <Tooltip title="Duplicated option">
                  <WarningOutlined color="error" />
                </Tooltip>
              )}
              {focusS === keyS && focusQ === keyQ + 1 && (
                <IconButton id={qOptionRemoveEleId} shape="rounded" color="error" onClick={() => onRemoveOption(idx)}>
                  <DeleteOutlined fontSize="small" />
                </IconButton>
              )}
            </Stack>
          </Stack>
          {opt?.image && opt?.image?.url instanceof File && (
            <Box sx={{ position: 'relative', p: 1.5 }}>
              <ImagePreview image={opt.image.url} />
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
                <MenuItem onClick={() => onRemoveOptImage(idx)}>Remove</MenuItem>
              </Menu>
            </Box>
          )}
        </Box>
      );
    }

    if (type === Q_SHORT_ANSWER) {
      return (
        <Stack key={idx} direction={'row'} alignItems="center" spacing={1}>
          <TextField
            fullWidth
            autoComplete="off"
            id={qOptionInputEleId}
            placeholder={t('ncrm_generalsetting_survey_question_view_short_answer') as string}
            autoFocus={qOptionInputEleId === focusEle}
            disabled
          />
        </Stack>
      );
    }

    if (type === Q_PARAGRAPH) {
      return (
        <Stack key={idx} direction={'row'} alignItems="center" spacing={1}>
          <TextField
            fullWidth
            autoComplete="off"
            id={qOptionInputEleId}
            multiline
            rows={3}
            placeholder={t('ncrm_generalsetting_survey_question_view_long_answer') as string}
            autoFocus={qOptionInputEleId === focusEle}
            disabled
          />
        </Stack>
      );
    }

    if (type === Q_FILE_UPLOAD) {
      const qOptionTypeEleId = 'q-optfiletype-' + keyS + '-' + (keyQ + 1) + '-' + (idx + 1);
      const qOptionNumberEleId = 'q-optfilenum-' + keyS + '-' + (keyQ + 1) + '-' + (idx + 1);
      const qOptionSizeEleId = 'q-optfilesize-' + keyS + '-' + (keyQ + 1) + '-' + (idx + 1);
      if (idx == 0) {
        return (
          <Stack key={idx} direction={'row'} alignItems="center" spacing={1}>
            <FormControl component="fieldset">
              <FormControlLabel
                control={
                  <Switch
                    id={qOptionTypeEleId}
                    checked={opt.value}
                    onChange={(e: any) => onOptionValueChange(e.target.checked, idx)}
                    color="secondary"
                  />
                }
                label="Allow file type"
              />
            </FormControl>
          </Stack>
        );
      } else if (idx == 1) {
        return (
          <Stack key={idx} direction={'row'} alignItems="center" spacing={1}>
            <Typography>Max files</Typography>
            <Dropdown
              title={opt.value}
              items={[
                { label: '1', value: '1' },
                { label: '5', value: '5' },
                { label: '10', value: '10' }
              ]}
              onChange={(selected: any) => onOptionSelectChange(selected.value, idx)}
            />
          </Stack>
        );
      } else {
        return (
          <Stack key={idx} direction={'row'} alignItems="center" spacing={1}>
            <Typography>Max files</Typography>
            <Dropdown
              title={`${opt.value} MB`}
              items={[
                { label: '1 MB', value: '1' },
                { label: '5 MB', value: '5' },
                { label: '10 MB', value: '10' }
              ]}
              onChange={(selected: any) => onOptionSelectChange(selected.value, idx)}
            />
          </Stack>
        );
      }
    }

    if (type === Q_DATE || type === Q_TIME) {
      const placeHolder = type === Q_DATE ? t('Date month year') : t('Time');
      return (
        <Stack key={idx} direction={'row'} alignItems="center" spacing={1}>
          <TextField
            autoComplete="off"
            id={qOptionInputEleId}
            placeholder={placeHolder}
            autoFocus={qOptionInputEleId === focusEle}
            disabled
          />
          <QuestionIcon type={type} />
        </Stack>
      );
    }
  };

  //render question add buttons
  const renderAddOption = () => {
    const qAddOptEleId = 'q-addopt-' + keyS + '-' + (keyQ + 1);
    const qAddOtherOptEleId = 'q-addotheropt-' + keyS + '-' + (keyQ + 1);

    if (type === Q_MULTI_CHOICES || type === Q_CHECKBOXES || type === Q_DROPDOWN) {
      return (
        <Stack direction={'row'} alignItems="center" spacing={1}>
          <QuestionIcon indexNo={optionsQ.length + 1} type={type} />
          <Button size="small" id={qAddOptEleId} onClick={onAddOption} color="primary">
            {t('ncrm_generalsetting_survey_options_add_options')}
          </Button>
          {(type === Q_MULTI_CHOICES || type === Q_CHECKBOXES) && !isExist && (
            <>
              <Typography> {t('ncrm_generalsetting_survey_options_add_or')} </Typography>
              <Button size="small" id={qAddOtherOptEleId} onClick={onAddOtherOption} color="primary">
                {t('ncrm_generalsetting_survey_options_add_other')}
              </Button>
            </>
          )}
        </Stack>
      );
    } else {
      return '';
    }
  };

  //render
  return (
    <Stack spacing={1}>
      {locOptions.map((opt: any, idx: number) => renderOption(opt, idx))}
      {/* add option button */}
      {focusS === keyS && focusQ === keyQ + 1 && renderAddOption()}
    </Stack>
  );
};

export default OptionNormal;
