import withLoading from '@base/hooks/hocs/withLoading';
import { formatSettingsAtom } from '@base/store/atoms';
import { currencySettingSelector } from '@base/store/selectors/app';
import { CurrencySetting, FormatSetting } from '@settings/general/types/interface';
import Section from '@settings/preferences/components/Section';
import React, { useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import CurrencyAutoComplete from '../CurrencyAutoComplete';
import useSnackBar from '@base/hooks/useSnackBar';
import { useUpdateFormatSetting } from '@settings/general/hooks/useUpdateFormatSetting';
import { CURRENCY_FORMAT, NEGATIVE_CURRENCY_FORMAT } from '@settings/general/config/constants';
import { DeleteOutlineTwoTone } from '@mui/icons-material';
//=====material-ui
import {
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Radio,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  useTheme,
  Box,
  Button
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { Currency } from '@base/types/common';
import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';
interface CurrencySettingProps {
  setLoading: (params: boolean) => void;
  data: CurrencySetting | undefined;
}
const CurrencySetting: React.FC<CurrencySettingProps> = (props: CurrencySettingProps) => {
  const { setLoading } = props;
  const { enqueueSuccessBar, enqueueErrorBar, enqueueWarningBar } = useSnackBar();
  const { t } = useTranslation();

  const data: CurrencySetting = useRecoilValue(currencySettingSelector);
  const [formatSettings, setFormatSettings] = useRecoilState(formatSettingsAtom);
  const [currencyValue, setCurrencyValue] = useState<CurrencySetting>(data);
  const { currencyFormat, negativeCurrencyFormat, usedCurrencies } = currencyValue;
  const [numLines, setNumLines] = useState(0);

  const settingKey = 'currency';
  const mUpdateFormat = useUpdateFormatSetting();
  const updateFormatSetting = (value: CurrencySetting) => {
    // save to server
    setCurrencyValue(value);
    mUpdateFormat.mutate(
      { key: settingKey, value: JSON.stringify(value) },
      {
        onSuccess: () => {
          enqueueSuccessBar('Setting saved!');
          setLoading(false);
          // update format settings
          const newSettings = formatSettings.map((item: FormatSetting) => {
            if (item.key == settingKey) {
              return {
                ...item,
                value: value
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
      }
    );
  };

  //========+++TODO
  const currencyFormatsData = CURRENCY_FORMAT;
  const negativeCurrencyFormatsData = NEGATIVE_CURRENCY_FORMAT;

  const [currencyFormatData, setCurrencyFormatData] = useState({ value: currencyFormat, label: currencyFormat });
  const [negativeCurrencyFormatData, setNegativeCurrencyFormatData] = useState({
    value: negativeCurrencyFormat,
    label: negativeCurrencyFormat
  });

  const onChange = (currencySelect: Currency) => {
    const isExist = usedCurrencies.find((currency: Currency) => currency.code == currencySelect.code);
    if (isExist) {
      enqueueWarningBar('Country code is existed');
    } else {
      setLoading(true);
      const currencies = usedCurrencies.concat([currencySelect]);
      const value = {
        ...currencyValue,
        usedCurrencies: currencies
      };
      updateFormatSetting(value);
      setNumLines(numLines - 1);
    }
  };

  const onDelete = (currencySelect: Currency) => {
    setLoading(true);
    const currencies = usedCurrencies.filter((currency: Currency) => currency.code != currencySelect.code);
    const value = {
      ...currencyValue,
      usedCurrencies: currencies
    };
    updateFormatSetting(value);
  };

  const onSetDefault = (currencySelect: Currency) => {
    setLoading(true);
    const currencies = usedCurrencies.map((currency: Currency) => ({
      ...currency,
      isDefault: currency.code == currencySelect.code
    }));
    const value = {
      ...currencyValue,
      usedCurrencies: currencies
    };
    updateFormatSetting(value);
  };

  const handleCurrencyFormatChange = (index: number) => {
    setNegativeCurrencyFormatData(negativeCurrencyFormatsData[index]);
  };

  const handleNegativeCurrencyFormatChange = (index: number) => {
    setCurrencyFormatData(currencyFormatsData[index]);
  };

  const onChangeData = (event: SelectChangeEvent, key: string) => {
    const value = { value: event.target.value, label: event.target.value };
    let selectedIndex = -1;

    if (key === 'currencyFormat') {
      selectedIndex = currencyFormatsData.findIndex((item: any) => item.value === value.value);
      setCurrencyFormatData(value);
      handleCurrencyFormatChange(selectedIndex);
    } else if (key === 'negativeCurrencyFormat') {
      selectedIndex = negativeCurrencyFormatsData.findIndex((item: any) => item.value === value.value);
      setNegativeCurrencyFormatData(value);
      handleNegativeCurrencyFormatChange(selectedIndex);
    }
    const newValue = {
      ...currencyValue,
      ['currencyFormat']: currencyFormatsData[selectedIndex].value,
      ['negativeCurrencyFormat']: negativeCurrencyFormatsData[selectedIndex].value
    };
    updateFormatSetting(newValue);
  };
  useEffect(() => {
    if (data) {
      setCurrencyValue(data);
    }
  }, [data]);

  //======
  const theme = useTheme();
  const Header: string[] = [t('ncrm_generalsetting_currency'), t('ncrm_generalsetting_default')];
  const border = '1px solid ' + theme.palette.divider;

  const renderNewLine = useMemo(() => {
    const lines: any = [];
    for (let i = 0; i < numLines; i++) {
      lines.push(
        <TableRow sx={{ borderRight: border, borderLeft: border }}>
          <TableCell colSpan={3}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ width: '100%' }}>
                <CurrencyAutoComplete
                  onChange={onChange}
                  value={''}
                  placeholder={t('ncrm_generalsetting_general_currency_auto_placeholder') as string}
                />
              </Box>
              <IconButton sx={{ marginTop: '5px' }} edge="end" size="medium" color="error" onClick={() => setNumLines(numLines - 1)}>
                <ClearIcon fontSize="small" color="error" />
              </IconButton>
            </Box>
          </TableCell>
        </TableRow>
      );
    }
    return lines;
  }, [numLines]);

  return (
    <Section header={t('ncrm_generalsetting_currency')}>
      <Grid sx={{ padding: '20px' }}>
        <Grid sx={{ columnCount: 2 }}>
          <Grid sx={{ px: '5px', mb: '1rem' }}>
            <Typography color="secondary" mb={1}>
              {t('ncrm_generalsetting_currency_format')}
            </Typography>

            <Select
              sx={{ minWidth: 200 }}
              className="wd-150-f"
              // options={decimalSymbols}
              value={currencyFormatData?.value}
              onChange={(e) => onChangeData(e, 'currencyFormat')}
            >
              {currencyFormatsData.map((opt: { value: string; label: string }, idx: number) => (
                <MenuItem value={opt.value} key={idx}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid sx={{ px: '5px', mb: '1rem' }}>
            <Typography color="secondary" mb={1}>
              {t('ncrm_generalsetting_negative_currency_format')}
            </Typography>
            <Select
              sx={{ minWidth: 200 }}
              className="wd-150-f"
              // options={decimalSymbols}
              value={negativeCurrencyFormatData?.value}
              onChange={(e) => onChangeData(e, 'negativeCurrencyFormat')}
            >
              {negativeCurrencyFormatsData.map((opt: { value: string; label: string }, idx: number) => (
                <MenuItem value={opt.value} key={idx}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
        <TableContainer
          component={Paper}
          sx={{
            boxShadow: 'none',
            borderBottom: `1px solid ${theme.palette.divider}`,
            borderBottomLeftRadius: '.25rem',
            borderBottomRightRadius: '.25rem'
          }}
        >
          <Table>
            <TableHead sx={{ border: `1px solid ${theme.palette.divider}` }}>
              <TableRow>
                {Header.map((headers, key) => (
                  <TableCell key={key} sx={{ textAlign: key != 0 ? 'center' : 'left' }}>
                    {headers}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {currencyValue?.usedCurrencies.map((currency, key) => (
                <TableRow
                  sx={{
                    pading: 1,
                    ':hover': {
                      svg: {
                        visibility: 'visible'
                      }
                    }
                  }}
                  key={key}
                >
                  <TableCell
                    sx={{ borderRight: border, borderLeft: border, padding: 1 }}
                  >{`${currency.currencySymbol}(${currency.code}) : ${currency.currencyName}`}</TableCell>
                  <TableCell align="center" sx={{ borderRight: border, padding: 1 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row'
                      }}
                    >
                      <Radio
                        checked={currency.isDefault}
                        onChange={() => onSetDefault(currency)}
                        sx={{ ml: '42%', mr: '22%', display: 'flex', justifyContent: 'center' }}
                      />
                      <IconButton edge="end" size="medium" color="error" onClick={() => onDelete(currency)}>
                        <DeleteOutlineTwoTone
                          fontSize="small"
                          color="error"
                          sx={{
                            my: 'auto',
                            visibility: 'hidden'
                          }}
                        />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
              {numLines > 0 && renderNewLine}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          variant="contained"
          size="small"
          onClick={() => setNumLines(numLines + 1)}
          sx={{ px: 1.5, width: 'fit-content', borderRadius: 2, marginTop: 1 }}
        >
          <AddIcon fontSize="small" />
          {t('ncrm_generalsetting_preferences_add_another_line')}
        </Button>
      </Grid>
    </Section>
  );
};

export default withLoading(CurrencySetting);
