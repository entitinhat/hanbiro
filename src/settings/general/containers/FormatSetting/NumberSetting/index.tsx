import withLoading from '@base/hooks/hocs/withLoading';
import { formatSettingsAtom } from '@base/store/atoms';
import { numberSettingSelector } from '@base/store/selectors/app';
import { numberFormat } from '@base/utils/helpers';
import { FormatSetting, NumberSetting } from '@settings/general/types/interface';
import Section from '@settings/preferences/components/Section';
import React, { useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import useSnackBar from '@base/hooks/useSnackBar';
import { useUpdateFormatSetting } from '@settings/general/hooks/useUpdateFormatSetting';
import { DECIMAL_SYMBOL, DIGIT_GROUPING_SYMBOLS, DIGIT_GROUPS, NEGATIVE_NUMBER_FORMATS } from '@settings/general/config/constants';

// material-ui
import { Box, Grid, MenuItem, Select, SelectChangeEvent, TextField, Typography, useTheme } from '@mui/material';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

interface Props {
  setLoading: (params: boolean) => void;
  data: NumberSetting | undefined;
}

const NumberSetting = (props: Props) => {
  const { setLoading } = props;
  const { t } = useTranslation();

  const data: NumberSetting = useRecoilValue(numberSettingSelector);
  const [formatSettings, setFormatSettings] = useRecoilState(formatSettingsAtom);
  const [refNoOfDecimal, setRefNoOfDecimal] = useState<number>(2);
  let numberValue = _.cloneDeep(data);

  const [numberValueData, setNumberValueData] = useState<NumberSetting>(numberValue);

  // const [numberValue, setNumberValue] = useState(initData);
  const { decimalSymbol, noOfDecimal, digitGroupingSymbol, digitGroup, negativeNumberFormat } = numberValueData;
  const decimalSymbolValue = useMemo(() => DECIMAL_SYMBOL.find((item) => item.value == decimalSymbol), [decimalSymbol]);
  const digitGroupingSymbolValue = useMemo(
    () => DIGIT_GROUPING_SYMBOLS.find((item) => item.value == digitGroupingSymbol),
    [digitGroupingSymbol]
  );
  const digitGroupValue = useMemo(() => DIGIT_GROUPS.find((item) => item.value == digitGroup), [digitGroup]);
  const negativeNumberFormatValue = useMemo(
    () => NEGATIVE_NUMBER_FORMATS.find((item) => item.value == negativeNumberFormat),
    [negativeNumberFormat]
  );
  const { enqueueErrorBar, enqueueSuccessBar } = useSnackBar();

  const mUpdateFormat = useUpdateFormatSetting({
    onSuccess: () => {
      enqueueSuccessBar('Setting saved!');
      setLoading(false);
      // update format settings
      const newSettings = formatSettings.map((item: FormatSetting) => {
        if (item.key == 'number') {
          return {
            ...item,
            value: numberValueData
          };
        }
        return item;
      });
      setFormatSettings(newSettings);
    },
    onError: () => {
      enqueueErrorBar('Saving has failed!');
      setLoading(false);
    }
  });

  useEffect(() => {
    if (noOfDecimal) {
      setRefNoOfDecimal(noOfDecimal);
    }
  }, [noOfDecimal]);

  useEffect(() => {
    if (data) {
      setNumberValueData(numberValue);
    }
  }, [data]);

  const previewPositive = useMemo(() => {
    return numberFormat('123456789', numberValueData, false);
  }, [numberValueData]);

  const previewNegative = useMemo(() => {
    return numberFormat('123456789', numberValueData, true);
  }, [numberValueData]);

  const updateFormatSetting = (value: NumberSetting) => {
    // save to server
    setNumberValueData(value);
    mUpdateFormat.mutate({ key: 'number', value: JSON.stringify(value) });
  };
  const onChangeData = (event: SelectChangeEvent, key: string) => {
    setLoading(true);
    const value = {
      ...numberValueData,
      [key]: event.target.value
    };
    updateFormatSetting(value);
  };
  const onBlur = (nValue: NumberSetting) => {
    setLoading(true);

    updateFormatSetting(nValue);
  };

  //====DeBUG
  // console.log('refNoOfDecimal:', refNoOfDecimal);
  // console.log('refNoOfDecimal.current.value:', refNoOfDecimal);
  // console.log('Number data after parse:', data);

  const theme = useTheme();
  return (
    <Section header={t('ncrm_generalsetting_general_number')}>
      <Grid sx={{}}>
        <Grid sx={{ padding: '20px', columnCount: 2 }}>
          <Grid sx={{ px: '5px', mb: '1rem' }}>
            <Typography color="secondary" mb={1}>
              {t('ncrm_generalsetting_decimal_symbol')}
            </Typography>
            <Select
              sx={{ minWidth: 200 }}
              className="wd-150-f"
              inputProps={{ fontSize: '40px' }}
              value={decimalSymbolValue?.value}
              onChange={(e) => onChangeData(e, 'decimalSymbol')}
            >
              {DECIMAL_SYMBOL.map((opt: { value: string; label: string }, idx: number) => (
                <MenuItem value={opt.value} key={idx}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid sx={{ px: '5px', mb: '1rem' }}>
            <Typography color="secondary" mb={1}>
              {t('ncrm_generalsetting_digit_grouping_symbol')}
            </Typography>
            <Select
              sx={{ minWidth: 200 }}
              className="wd-150-f"
              // options={decimalSymbols}
              inputProps={{ fontSize: '40px' }}
              value={digitGroupingSymbolValue?.value}
              onChange={(e) => onChangeData(e, 'digitGroupingSymbol')}
            >
              {DIGIT_GROUPING_SYMBOLS.map((opt: { value: string; label: string }, idx: number) => (
                <MenuItem value={opt.value} key={idx}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid sx={{ px: '5px', mb: '1rem' }}>
            <Typography color="secondary" mb={1}>
              {t('ncrm_generalsetting_decimal_places')}
            </Typography>
            <TextField
              size="medium"
              type={'number'}
              value={numberValueData.noOfDecimal}
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                const nValue = {
                  ...numberValueData,
                  noOfDecimal: +event.target.value
                };
                onBlur(nValue);
              }}
              sx={{ input: { padding: 1 } }}
            />
          </Grid>

          <Grid sx={{ px: '5px', mb: '1rem' }}>
            <Typography color="secondary" mb={1}>
              {t('ncrm_generalsetting_digit_group')}
            </Typography>
            <Select
              sx={{ minWidth: 200 }}
              inputProps={{ fontSize: '40px' }}
              value={digitGroupValue?.value}
              onChange={(e) => onChangeData(e, 'digitGroup')}
            >
              {DIGIT_GROUPS.map((opt: { value: string; label: string }, idx: number) => (
                <MenuItem value={opt.value} key={idx}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
        <Grid sx={{ padding: '20px' }}>
          <Grid sx={{ px: '5px', mb: '1rem' }}>
            <Typography color="secondary" mb={1}>
              {t('ncrm_generalsetting_negative_number_format')}
            </Typography>
            <Select
              sx={{ minWidth: 200 }}
              className="wd-150-f"
              // options={decimalSymbols}
              inputProps={{ fontSize: '40px' }}
              value={negativeNumberFormatValue?.value}
              onChange={(e) => onChangeData(e, 'negativeNumberFormat')}
            >
              {NEGATIVE_NUMBER_FORMATS.map((opt: { value: string; label: string }, idx: number) => (
                <MenuItem value={opt.value} key={idx}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid sx={{ px: '5px', mb: '1rem' }}>
            <Typography color="secondary" mb={1}>
              {t('ncrm_generalsetting_preview')}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                borderRadius: '0.25rem',
                p: '15px',
                border: `1px dashed ${theme.palette.secondary.light}`,
                backgroundColor: theme.palette.secondary.lighter
              }}
            >
              <Typography sx={{ flex: '0 0 50%' }}>{`${t('ncrm_generalsetting_number_positive')}: ${previewPositive}`}</Typography>
              <Typography sx={{ flex: '0 0 50%' }}>{`${t('ncrm_generalsetting_number_negative')}: ${previewNegative}`}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Section>
  );
};

export default withLoading(NumberSetting);
