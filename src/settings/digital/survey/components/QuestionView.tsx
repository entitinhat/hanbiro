import { useEffect, useState } from 'react';

//third-party
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

//material
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Stack,
  useTheme
} from '@mui/material';
import { CloseOutlined, ErrorOutline } from '@mui/icons-material';

//project
import MainCard from '@base/components/App/MainCard';
import DatePicker from '@base/components/@hanbiro/Date/DatePicker';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import ImagePreview from '@base/components/@hanbiro/ImagePreview';
import Dropdown, { LabelValueIcon } from '@base/components/@hanbiro/Dropdown';
import { MultiFileUpload } from '@base/components/@hanbiro/FileUpload';
import IconButton from '@base/components/@extended/IconButton';

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
  Q_TICK_BOX_GRID
} from '@settings/digital/survey/config/constants';

interface QuestionViewProps {
  keyQ: number;
  selectedQType: number;
  title: string;
  image?: any;
  required?: boolean;
  requiredInValid?: boolean;
  options: any[];
  hasAnswer?: boolean;
  hasGridAnswer?: boolean;
  onSetRequiredInValidKey: (key: number) => void;
  onSetOptionsQ: (newKeyQ: number, newOptions: any[]) => void;
}

const QuestionView = (props: QuestionViewProps) => {
  const {
    keyQ,
    selectedQType,
    title,
    image,
    required,
    requiredInValid,
    options,
    hasAnswer = false,
    hasGridAnswer = false,
    onSetRequiredInValidKey,
    onSetOptionsQ
  } = props;
  const { t } = useTranslation();
  const theme = useTheme();
  //state
  const [titleQ, setTitleQ] = useState<string>(title);
  if (selectedQType === Q_DATE) {
    //init answer for date
    if (!options[0].answer) {
      options[0].answer = new Date().toISOString().slice(0, 10); //only ONE option
    }
  }
  const [optionsQ, setOptionsQ] = useState<any>(null);
  const [hasAnswerQ, setHasAnswerQ] = useState<boolean>(hasAnswer);
  const [hasGridAnswerQ, setHasGridAnswerQ] = useState<boolean>(hasGridAnswer);
  const initFiles: any = []; //for Q_FILE_UPLOAD
  const [files, setFiles] = useState<any>(initFiles);
  //console.log('optionsQ', optionsQ);

  //change title
  useEffect(() => {
    if (titleQ !== title) {
      setTitleQ(title);
    }
  }, [title]);

  useEffect(() => {
    if (hasAnswerQ !== hasAnswer) {
      setHasAnswerQ(hasAnswer);
    }
  }, [hasAnswer]);

  useEffect(() => {
    if (hasGridAnswerQ !== hasGridAnswer) {
      setHasGridAnswerQ(hasGridAnswer);
    }
  }, [hasGridAnswer]);

  //change options
  useEffect(() => {
    if (!_.isEqual(optionsQ, options)) {
      setOptionsQ(options);
    }
  }, [options]);

  //clear answer
  function clearAnswer() {
    //new one
    let newOptions = [...optionsQ];

    //reset answer
    newOptions.map((item) => {
      item.checked = false;
      if (item.isOther) {
        item.answer = '';
      }
    });

    //set local state
    setHasAnswerQ(false);
    setOptionsQ(newOptions);

    //callback
    onSetOptionsQ(keyQ, newOptions);
  }

  //clear grid answer
  function clearGridAnswer() {
    //new one
    let newOptions = { ...optionsQ };

    //reset answer
    newOptions.answer = {};

    //set local state
    setHasGridAnswerQ(false);
    setOptionsQ(newOptions);

    //callback
    onSetOptionsQ(keyQ, newOptions);
  }

  //change option radio checked
  function onOptionRadioChange(e: any, idx: number) {
    //new one
    let newOptions = [...optionsQ];

    //reset answer
    newOptions.map((item) => {
      item.checked = false;
      if (item.isOther) {
        item.answer = '';
      }
    });
    //set new answer
    newOptions[idx].checked = e.target.checked;

    //set local state
    setHasAnswerQ(true);
    setOptionsQ(newOptions);

    //reset required flag
    onSetRequiredInValidKey(-1);
    //callback
    onSetOptionsQ(keyQ, newOptions);
  }

  //change option checkbox checked
  function onOptionCheckboxChange(e: any, idx: number) {
    //new one
    let newOptions = [...optionsQ];

    //set new answer
    newOptions[idx].checked = e.target.checked;

    //reset other answer if un-checked
    if (!newOptions[idx].checked && newOptions[idx].isOther) {
      newOptions[idx].answer = '';
    }

    //set local state
    setOptionsQ(newOptions);
    //check if all checkboxes are unchecked
    setHasAnswerQ(false); //reset
    newOptions.map((item) => {
      if (item.checked) {
        setHasAnswerQ(true);
        return;
      }
    });

    //reset required flag
    onSetRequiredInValidKey(-1);
    //callback
    onSetOptionsQ(keyQ, newOptions);
  }

  //change option text
  function onOptionTextChange(e: React.ChangeEvent<HTMLInputElement>, idx: number) {
    //new one
    let newOptions = [...optionsQ];
    //text
    newOptions[idx].answer = e.target.value as string;
    //set local state
    setOptionsQ(newOptions);
    //callback
    onSetOptionsQ(keyQ, newOptions);
  }

  //dropdown select
  function onOptionSelectChange(idx: number) {
    //new one
    let newOptions = [...optionsQ];

    //reset all selections
    newOptions.map((item) => (item.checked = false));
    //set new selected option
    newOptions[idx].checked = true;

    //set local state
    setOptionsQ(newOptions);
    setHasAnswerQ(true);

    //reset required flag
    onSetRequiredInValidKey(-1);
    //callback
    onSetOptionsQ(keyQ, newOptions);
  }

  //drop files for upload
  function onDrop(files: any) {
    setFiles(files);
  }

  //upload new file
  function handleFileUploadChange(e: any) {
    //upload file
    const files = e.target.files;
    if (files.length > 0) {
      //call upload
      let formData = new FormData();
      formData.append('file', files[0]);
      // myAxios.post(apis.uploadImage, formData).then((res) => {
      //     if (res.data.success) {
      //         //update image state
      //         const newFile = {};
      //         newFile.name = res.data.data.name;
      //         newFile.path = apis.getImage + '?path=' + res.data.data.path + res.data.data.name;
      //         //newFile.size = res.data.data.size;

      //         let newOptions = [...optionsQ];
      //         newOptions[0].answer = [newFile];
      //         //set state for survey
      //         onSetOptionsQ(keyQ, newOptions);

      //         // const newFiles=[];
      //         // newFiles.push(newFile);
      //         // setFiles(newFiles);
      //     }
      // })
      // .catch(function (error) {
      //     //// console.log(error);
      // });
    }
  }

  //remove upload file
  function handleRemoveOptionFile() {
    //setFiles([]);

    let newOptions = [...optionsQ];
    newOptions[0].answer = [];
    //set state for survey
    onSetOptionsQ(keyQ, newOptions);
  }

  //set date for Q_DATE
  function onOptionDateChange(date: any, idx: number) {
    //new one
    let newOptions = [...optionsQ];
    //text
    newOptions[idx].answer = new Date(date).toISOString().slice(0, 10);
    //set local state
    setOptionsQ(newOptions);

    //reset required flag
    onSetRequiredInValidKey(-1);
    //callback
    onSetOptionsQ(keyQ, newOptions);
  }

  //change option time hour
  function onOptionTimeChange(e: any, idx: number, type: any) {
    //new one
    let newOptions = [...optionsQ];
    let newAnswer = newOptions[idx].answer ? newOptions[idx].answer.split(':') : ['', ''];
    if (type === 'H') {
      newAnswer[0] = e.target.value; //HH
    } else {
      //M
      newAnswer[1] = e.target.value; //MM
    }
    //text
    newOptions[idx].answer = newAnswer.join(':');
    //set local state
    setOptionsQ(newOptions);

    //reset required flag
    onSetRequiredInValidKey(-1);
    //callback
    onSetOptionsQ(keyQ, newOptions);
  }

  //change option in multichoices grid
  function onOptionGridRadioChange(e: any, rIdx: number, cIdx: number) {
    //new one
    let newOptions = { ...optionsQ };

    //reset answer
    if (!newOptions.answer) {
      newOptions.answer = {}; //reset all
      newOptions.answer[rIdx] = {};
    } else {
      //reset if exists
      newOptions.answer[rIdx] = {};
    }

    //set new answer
    newOptions.answer[rIdx][cIdx] = e.target.checked;

    //set local state
    setHasAnswerQ(true);
    setOptionsQ(newOptions);

    //callback
    onSetOptionsQ(keyQ, newOptions);
  }

  //change option in multichoices grid
  function onOptionGridCheckboxChange(e: any, rIdx: number, cIdx: number) {
    //new one
    let newOptions = { ...optionsQ };

    //reset answer
    if (!newOptions.answer) {
      newOptions.answer = {};
      newOptions.answer[rIdx] = {};
    } else if (!newOptions.answer[rIdx]) {
      //reset if not exist
      newOptions.answer[rIdx] = {};
    }

    //set new answer
    newOptions.answer[rIdx][cIdx] = e.target.checked;

    //set local state
    setHasAnswerQ(true);
    setOptionsQ(newOptions);

    //callback
    onSetOptionsQ(keyQ, newOptions);
  }

  /** ==================================== RENDER ================================================ */
  //get selected option - dropdown Q
  const renderSelectedOption = () => {
    const selections = optionsQ?.filter((opt: any) => opt.checked); //catch error when 'optionsQ' return null
    if (selections !== undefined && selections.length > 0) return selections[0].value; //catch error when 'selections' return undefined by 'optionsQ' return null
    return <SpanLang keyLang="Choose" />;
  };

  const renderSelectedOptImage = () => {
    const selections = optionsQ?.filter((opt: any) => opt.checked); //catch error when 'optionsQ' return null
    if (selections !== undefined && selections.length > 0) {
      //catch error when 'selections' return undefined by 'optionsQ' return null
      return selections[0].image && selections[0].image.url && <ImagePreview image={selections[0].image.url} />;
    }

    return '';
  };

  const renderTitle = () => {
    return (
      <Stack direction={'row'}>
        <Typography>{titleQ ? titleQ : (t('ncrm_generalsetting_survey_question_untitled') as string)}</Typography>
        {required && <Typography color={'error'}>*</Typography>}
      </Stack>
    );
  };

  const renderQImage = () => {
    return image && image.url && <ImagePreview image={image.url} />;
  };

  const renderOption = () => {
    switch (selectedQType) {
      case Q_MULTI_CHOICES:
        return Array.isArray(optionsQ) ? (
          optionsQ.map((opt: any, idx: number) => {
            //dynamic option key
            const optionKey = 'option' + (keyQ + 1).toString() + (idx + 1).toString();
            return (
              <Stack key={idx} spacing={1.5}>
                <Stack direction="row" spacing={1}>
                  <FormControl component="fieldset">
                    <FormControlLabel
                      value={opt?.value}
                      control={
                        <Radio
                          id={optionKey}
                          name={'q-radio' + (keyQ + 1)}
                          checked={opt?.checked || false}
                          onChange={(e) => onOptionRadioChange(e, idx)}
                        />
                      }
                      label={opt?.value ? opt.value : t('ncrm_generalsetting_survey_options_untitled') + ' ' + (idx + 1).toString()}
                    />
                  </FormControl>
                  {opt.isOther && (
                    <TextField
                      autoComplete="off"
                      value={opt?.answer}
                      disabled={!opt?.checked}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onOptionTextChange(e, idx)}
                    />
                  )}
                </Stack>
                <Stack>{opt?.image?.url && <ImagePreview image={opt.image.url} />}</Stack>
              </Stack>
            );
          })
        ) : (
          <></>
        );
      case Q_CHECKBOXES:
        return Array.isArray(optionsQ) ? (
          optionsQ.map((opt: any, idx: number) => {
            //dynamic option key
            const optionKey = 'option' + (keyQ + 1).toString() + (idx + 1).toString();
            return (
              <Stack key={idx} spacing={1.5}>
                <Stack direction="row" spacing={1}>
                  <FormControl component="fieldset">
                    <FormControlLabel
                      value={opt?.value}
                      control={
                        <Checkbox
                          id={optionKey}
                          name={'q-checkbox' + (keyQ + 1)}
                          checked={opt?.checked || false}
                          onChange={(e) => onOptionCheckboxChange(e, idx)}
                        />
                      }
                      label={opt?.value ? opt.value : t('ncrm_generalsetting_survey_options_untitled') + ' ' + (idx + 1).toString()}
                      labelPlacement="end"
                      sx={{ ml: 1 }}
                    />
                  </FormControl>
                  {opt.isOther && (
                    <TextField
                      autoComplete="off"
                      value={opt?.answer}
                      disabled={!opt?.checked}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onOptionTextChange(e, idx)}
                    />
                  )}
                </Stack>
                <Stack>{opt?.image?.url && <ImagePreview image={opt.image.url} />}</Stack>
              </Stack>
            );
          })
        ) : (
          <></>
        );
      case Q_DROPDOWN:
        const ddOptionsQ = Array.isArray(optionsQ)
          ? optionsQ.map((_opt: any, idx: number) => ({
              ..._opt,
              label: _opt.value ? _opt.value : `${t('ncrm_generalsetting_survey_options_untitled')} ${idx + 1}`
            }))
          : [];
        return (
          <Stack spacing={1.25}>
            <Dropdown
              title={renderSelectedOption()}
              onChange={(selected: LabelValueIcon) => {
                const fIdx = ddOptionsQ.findIndex((_ele: any) => _ele.value === selected.value);
                if (fIdx > -1) {
                  onOptionSelectChange(fIdx);
                }
              }}
              items={ddOptionsQ}
            />
            {renderSelectedOptImage()}
          </Stack>
        );
      case Q_SHORT_ANSWER:
        return Array.isArray(optionsQ) ? (
          optionsQ.map((opt: any, idx: number) => (
            <Stack key={idx} spacing={1.25}>
              <TextField
                autoComplete="off"
                placeholder={t('ncrm_generalsetting_survey_question_view_your_answer') as string}
                value={opt.answer}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onOptionTextChange(e, idx)}
                onBlur={(e) => onSetRequiredInValidKey(-1)}
              />
            </Stack>
          ))
        ) : (
          <></>
        );
      case Q_PARAGRAPH:
        return Array.isArray(optionsQ) ? (
          optionsQ.map((opt: any, idx: number) => (
            <Stack key={idx} spacing={1.25}>
              <TextField
                autoComplete="off"
                placeholder={t('ncrm_generalsetting_survey_question_view_your_answer') as string}
                multiline
                rows={2}
                value={opt.answer}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onOptionTextChange(e, idx)}
                //onBlur={(e) => onSetRequiredInValidKey(-1)}
              />
            </Stack>
          ))
        ) : (
          <></>
        );
      case Q_FILE_UPLOAD:
        return (
          <Stack spacing={1.25}>
            {Array.isArray(optionsQ) && optionsQ[0].answer && optionsQ[0].answer.length > 0 ? (
              optionsQ[0].answer.map((file: any, idx: number) => (
                <Stack key={idx} direction="row" spacing={1}>
                  <Typography variant="h6">{file.name}</Typography>
                  <IconButton color="error" onClick={handleRemoveOptionFile}>
                    <CloseOutlined />
                  </IconButton>
                </Stack>
              ))
            ) : (
              <MultiFileUpload
                value={files}
                onChange={(selected: any[]) => handleFileUploadChange(selected)} //TODO
              />
            )}
          </Stack>
        );
      case Q_DATE:
        return Array.isArray(optionsQ) ? (
          optionsQ.map((opt: any, idx: number) => {
            const selectedDate = opt.answer ? new Date(opt.answer) : new Date();
            return (
              <Stack key={idx} spacing={1.25}>
                <DatePicker
                  value={selectedDate}
                  onChange={(date: any) => {
                    onOptionDateChange(date, idx);
                  }}
                />
              </Stack>
            );
          })
        ) : (
          <></>
        );
      case Q_TIME:
        return Array.isArray(optionsQ) ? (
          optionsQ.map((opt: any, idx: number) => {
            const selectedTime = opt.answer ? opt.answer.split(':') : ['', ''];
            return (
              <Stack key={idx} direction="row" spacing={1.25}>
                <Typography variant="h6">Time (HH:MM)</Typography>
                <TextField
                  type="number"
                  value={selectedTime[0]}
                  onChange={(e: any) => onOptionTimeChange(e, idx, 'H')}
                  onInput={(e: any) => (e.target.value = e.target.value.slice(0, 2))}
                />
                <Typography>:</Typography>
                <TextField
                  type="number"
                  value={selectedTime[1]}
                  onChange={(e: any) => onOptionTimeChange(e, idx, 'M')}
                  onInput={(e: any) => (e.target.value = e.target.value.slice(0, 2))}
                />
              </Stack>
            );
          })
        ) : (
          <></>
        );
      case Q_MULTI_CHOICES_GRID:
        return (
          <Stack spacing={1.5}>
            <TableContainer component={Paper} sx={{ boxShadow: 'none', border: `1px solid ${theme.palette.divider}` }}>
              <Table size="small">
                <TableHead sx={{ border: 'none', borderBottom: `1px solid ${theme.palette.divider}` }}>
                  <TableRow>
                    <TableCell></TableCell>
                    {optionsQ?.cols?.map((col: any, idx: number) => (
                      <TableCell key={idx}>
                        {col.value ? col.value : `${t('ncrm_generalsetting_survey_options_single_column')} ${idx + 1}`}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {optionsQ?.rows?.map((row: any, rIdx: number) => (
                    <TableRow key={rIdx}>
                      <TableCell>{row.value ? row.value : `${t('ncrm_generalsetting_survey_options_single_row')} ${rIdx + 1}`}</TableCell>
                      {optionsQ.cols.map((col: any, cIdx: number) => {
                        //dynamic option key
                        const optName = 'q' + (keyQ + 1).toString() + (rIdx + 1).toString();
                        const optKey = 'option' + (keyQ + 1).toString() + (rIdx + 1).toString() + (cIdx + 1).toString();
                        //answer checked, eg. [0][1] true
                        const optChecked = optionsQ.answer && optionsQ.answer[rIdx] ? optionsQ.answer[rIdx][cIdx] : false;

                        return (
                          <TableCell key={cIdx}>
                            <Radio
                              id={optKey}
                              name={optName}
                              checked={optChecked || false}
                              onChange={(e: any) => onOptionGridRadioChange(e, rIdx, cIdx)}
                            />
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        );
      case Q_TICK_BOX_GRID:
        return (
          <Stack spacing={1.5}>
            <TableContainer component={Paper} sx={{ boxShadow: 'none', border: `1px solid ${theme.palette.divider}` }}>
              <Table size="small">
                <TableHead sx={{ border: 'none', borderBottom: `1px solid ${theme.palette.divider}` }}>
                  <TableRow>
                    <TableCell></TableCell>
                    {optionsQ?.cols?.map((col: any, idx: number) => (
                      <TableCell key={idx}>
                        {col.value ? col.value : `${t('ncrm_generalsetting_survey_options_single_column')} ${idx + 1}`}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {optionsQ?.rows?.map((row: any, rIdx: number) => (
                    <TableRow key={rIdx}>
                      <TableCell>{row.value ? row.value : `${t('ncrm_generalsetting_survey_options_single_row')} ${rIdx + 1}`}</TableCell>
                      {optionsQ.cols.map((col: any, cIdx: number) => {
                        //dynamic option key
                        const optKey = 'option' + (keyQ + 1).toString() + (rIdx + 1).toString() + (cIdx + 1).toString();
                        //answer checked, eg. [0][1] true
                        const optChecked = optionsQ.answer && optionsQ.answer[rIdx] ? optionsQ.answer[rIdx][cIdx] : false;
                        //render option checkbox
                        return (
                          <TableCell key={cIdx}>
                            <Checkbox
                              id={optKey}
                              checked={optChecked || false}
                              onChange={(e: any) => onOptionGridCheckboxChange(e, rIdx, cIdx)}
                            />
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        );
    }
  };

  //options group
  const renderOptionsGroup = () => {
    //other types
    const countGridAns = Object.keys(hasGridAnswerQ).length;
    return (
      <Stack spacing={1.5}>
        {renderOption()}
        {selectedQType === Q_MULTI_CHOICES_GRID && 1 === countGridAns && required && (
          <Stack direction={'row'} alignItems="center" spacing={1}>
            <ErrorOutline color="error" />
            <Typography variant="h6" color="error">
              {t('ncrm_generalsetting_survey_question_require_one_per_row')}
            </Typography>
          </Stack>
        )}
        {selectedQType === Q_TICK_BOX_GRID && 0 < countGridAns && countGridAns < optionsQ.rows.length && required && (
          <Stack direction={'row'} alignItems="center" spacing={1}>
            <ErrorOutline color="error" />
            <Typography variant="h6" color="error">
              {t('ncrm_generalsetting_survey_question_require_at_least_one')}
            </Typography>
          </Stack>
        )}
        <Stack direction={'row'} justifyContent="end">
          {(selectedQType === Q_MULTI_CHOICES || selectedQType === Q_CHECKBOXES || selectedQType === Q_DROPDOWN) && hasAnswerQ && (
            <Button size="small" color="warning" onClick={clearAnswer}>
              {t('ncrm_generalsetting_survey_question_clear_selection')}
            </Button>
          )}
          {(selectedQType === Q_MULTI_CHOICES_GRID || selectedQType === Q_TICK_BOX_GRID) && countGridAns > 0 && (
            <Button size="small" color="warning" onClick={clearGridAnswer}>
              {t('ncrm_generalsetting_survey_question_clear_selection')}
            </Button>
          )}
        </Stack>
      </Stack>
    );
  };

  return (
    <MainCard sx={{ backgroundColor: theme.palette.background.paper }}>
      <Stack spacing={1.5}>
        {renderTitle()}
        {renderQImage()}
        {renderOptionsGroup()}
        {required && requiredInValid && (
          <Stack direction={'row'} alignItems="center" spacing={1}>
            <ErrorOutline color="error" />
            <Typography variant="h6">Required</Typography>
          </Stack>
        )}
      </Stack>
    </MainCard>
  );
};

export default QuestionView;
