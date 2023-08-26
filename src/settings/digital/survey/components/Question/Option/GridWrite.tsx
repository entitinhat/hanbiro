import IconButton from '@base/components/@extended/IconButton';
import { DeleteOutline, Warning } from '@mui/icons-material';
import { Button, Grid, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import QuestionIcon from '../Symbol';

const OptionGridWrite = (props: any) => {
  //props
  const {
    focusS,
    focusQ,
    keyS,
    keyQ,
    focusEle,
    type = '',
    optionsQ = [],
    isValid,
    onRowOptionValueChange,
    onRemoveRowOption,
    onColOptionValueChange,
    onRemoveColOption,
    onAddRowOption,
    onAddColOption
  } = props;
  const { t } = useTranslation();

  //for grid
  const renderRowOption = (opt: any, idx: number) => {
    let no = idx + 1;
    const qRowOptionInputEleId = 'q-rowopt-' + keyS + '-' + (keyQ + 1) + '-' + (idx + 1);
    const qRowRemoveOptionEleId = 'q-removerowopt-' + keyS + '-' + (keyQ + 1) + '-' + (idx + 1);

    return (
      <Stack key={`row${idx}`} direction={'row'} alignItems="center" spacing={1.5}>
        <Stack direction={'row'} flex={1} alignItems="center" spacing={1}>
          <Typography>{`${no}.`}</Typography>
          <TextField
            fullWidth
            autoComplete="off"
            id={qRowOptionInputEleId}
            placeholder={`${t('ncrm_generalsetting_survey_options_single_row')} ${idx + 1}`}
            value={opt.value}
            onChange={(e) => onRowOptionValueChange(e, idx)}
            //onBlur={(e) => onRowOptionValueBlur(e, idx)}
            autoFocus={qRowOptionInputEleId === focusEle}
          />
        </Stack>
        {/* duplicated option name */}
        {focusS === keyS && focusQ === keyQ + 1 && isValid && isValid.type === 'rows' && isValid.id === idx && !isValid.value && (
          <Tooltip title="Duplicated option">
            <Warning color="error" />
          </Tooltip>
        )}
        {focusS === keyS && focusQ === keyQ + 1 && (
          <IconButton id={qRowRemoveOptionEleId} color="error" shape="rounded" onClick={() => onRemoveRowOption(idx)}>
            <DeleteOutline fontSize="small" />
          </IconButton>
        )}
      </Stack>
    );
  };

  //for grid
  const renderRowAddOption = () => {
    const no = optionsQ.rows.length + 1;
    const qAddRowOptEleId = 'q-addrowopt-' + keyS + '-' + (keyQ + 1);

    return (
      <Stack direction={'row'} alignItems="center" spacing={1}>
        <Typography>{`${no}.`}</Typography>
        <Button size="small" id={qAddRowOptEleId} onClick={onAddRowOption} color="primary">
          {t('ncrm_generalsetting_survey_options_add_row')}
        </Button>
      </Stack>
    );
  };

  const renderColOption = (opt: any, idx: number) => {
    const qColOptionInputEleId = 'q-colopt-' + keyS + '-' + (keyQ + 1) + '-' + (idx + 1);
    const qColRemoveOptionEleId = 'q-removecolopt-' + keyS + '-' + (keyQ + 1) + '-' + (idx + 1);

    return (
      <Stack key={`col${idx}`} direction={'row'} alignItems="center" spacing={1.5}>
        <Stack direction={'row'} flex={1} alignItems="center" spacing={1}>
          <QuestionIcon type={type} />
          <TextField
            fullWidth
            autoComplete="off"
            id={qColOptionInputEleId}
            placeholder={`${t('ncrm_generalsetting_survey_options_single_column')} ${idx + 1}`}
            value={opt.value}
            onChange={(e) => onColOptionValueChange(e, idx)}
            //onBlur={(e) => onColOptionValueBlur(e, idx)}
            autoFocus={qColOptionInputEleId === focusEle}
          />
        </Stack>
        {/* duplicated option name */}
        {focusS === keyS && focusQ === keyQ + 1 && isValid && isValid.type === 'cols' && isValid.id === idx && !isValid.value && (
          <Tooltip title="Duplicated option">
            <Warning color="error" />
          </Tooltip>
        )}
        {focusS === keyS && focusQ === keyQ + 1 && (
          <IconButton id={qColRemoveOptionEleId} color="error" shape="rounded" onClick={() => onRemoveColOption(idx)}>
            <DeleteOutline fontSize="small" />
          </IconButton>
        )}
      </Stack>
    );
  };

  const renderColAddOption = () => {
    const qAddColOptEleId = 'q-addcolopt-' + keyS + '-' + (keyQ + 1);

    return (
      <Stack direction={'row'} alignItems="center" spacing={1}>
        <QuestionIcon type={type} />
        <Button size="small" id={qAddColOptEleId} onClick={onAddColOption} color="primary">
          {t('ncrm_generalsetting_survey_options_add_column')}
        </Button>
      </Stack>
    );
  };

  return (
    <Grid container>
      {/* rows */}
      <Grid item xs={12} lg={6} pr={1}>
        <Stack spacing={1}>
          <Stack alignItems="center">
            <Typography> {t('ncrm_generalsetting_survey_options_rows')} </Typography>
          </Stack>
          {optionsQ?.rows?.map((opt: any, idx: number) => renderRowOption(opt, idx))}
          {/* add option button */}
          {optionsQ?.rows && renderRowAddOption()}
        </Stack>
      </Grid>
      {/* cols */}
      <Grid item xs={12} lg={6} pl={1}>
        <Stack spacing={1}>
          <Stack alignItems="center">
            <Typography> {t('ncrm_generalsetting_survey_options_columns')} </Typography>
          </Stack>
          {optionsQ?.cols?.map((opt: any, idx: number) => renderColOption(opt, idx))}
          {/* add option button */}
          {focusQ === keyQ + 1 && optionsQ?.cols && renderColAddOption()}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default OptionGridWrite;
