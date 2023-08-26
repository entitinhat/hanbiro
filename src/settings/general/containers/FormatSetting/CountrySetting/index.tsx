import withLoading from '@base/hooks/hocs/withLoading';
import { formatSettingsAtom } from '@base/store/atoms';
import { countrySettingSelector } from '@base/store/selectors/app';
import { Country } from '@base/types/setting';
import { useRecoilState, useRecoilValue } from 'recoil';
import Section from '@settings/preferences/components/Section';
import useSnackBar from '@base/hooks/useSnackBar';
import { useUpdateFormatSetting } from '@settings/general/hooks/useUpdateFormatSetting';
import CountryAutoComplete from '../CountryAutoComplete';
import { FormatSetting } from '@settings/general/types/interface';
import { DeleteOutlineTwoTone } from '@mui/icons-material';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
// material-ui
import {
  Box,
  Grid,
  IconButton,
  Paper,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  useTheme,
  Button,
  Select
} from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { useMemo, useState } from 'react';

interface CountrySettingProps {
  setLoading: (params: boolean) => void;
  data: Country[] | undefined;
}

const CountrySetting = (props: CountrySettingProps) => {
  const { setLoading } = props;
  const { t } = useTranslation();
  const data: Country[] = useRecoilValue(countrySettingSelector);
  const [formatSettings, setFormatSettings] = useRecoilState(formatSettingsAtom);
  const { enqueueSuccessBar, enqueueErrorBar, enqueueWarningBar } = useSnackBar();
  const [numLines, setNumLines] = useState(0);
  let countryValue: Country[] = _.cloneDeep(data);
  const settingKey = 'country';

  const mUpdateFormat = useUpdateFormatSetting();
  const updateFormatSetting = (value: Country[]) => {
    // save to server
    countryValue = value;
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

  const onChange = (countrySelect: Country) => {
    if (countrySelect) {
      const isExist = countryValue?.find((country: Country) => country.isoCode3 == countrySelect.isoCode3);
      if (isExist) {
        enqueueWarningBar('Country code is existed');
      } else {
        setLoading(true);
        const countries = countryValue.concat([countrySelect]);
        updateFormatSetting(countries);
        setNumLines(numLines - 1);
        // update usedCountries
      }
    }
  };

  const onDelete = (countrySelect: Country) => {
    setLoading(true);
    const countries = countryValue.filter((country: Country) => country.isoCode3 != countrySelect.isoCode3);
    updateFormatSetting(countries);
  };

  const onSetDefault = (countrySelect: Country) => {
    setLoading(true);
    const countries = countryValue.map((country: Country) => ({
      ...country,
      isDefault: country.isoCode3 == countrySelect.isoCode3
    }));
    updateFormatSetting(countries);
  };
  // render newLine
  const renderNewLine = useMemo(() => {
    const lines: any = [];
    for (let i = 0; i < numLines; i++) {
      lines.push(
        <TableRow key={i} sx={{ border: 0 }}>
          <TableCell sx={{ border: 0 }} colSpan={3}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ width: '100%' }}>
                <CountryAutoComplete
                  value={''}
                  onChange={onChange}
                  placeholder={t('ncrm_generalsetting_general_country_auto_placeholder') as string}
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

  //=====Table Properties
  const theme = useTheme();
  const Header: string[] = [t('Country'), t('Code'), t('ncrm_generalsetting_default')];
  const border = '1px solid ' + theme.palette.divider;
  //=====DEBUG
  // console.log('Country data after parse:', data);
  //=====render
  return (
    <Grid sx={{ my: '10px', paddingBottom: 1 }}>
      <Section header={t('Country/Codes')}>
        <TableContainer
          component={Paper}
          sx={{
            boxShadow: 'none',
            borderBottom: border,
            borderTop: 0
          }}
        >
          <Table>
            <TableHead sx={{ borderTop: 0, borderBottom: border }}>
              <TableRow>
                {Header.map((headers, key) => (
                  <TableCell key={key} sx={{ textAlign: key != 0 ? 'center' : 'left' }}>
                    {headers}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {countryValue?.map((country, key) => (
                <TableRow
                  sx={{
                    padding: 1,
                    ':hover': {
                      svg: {
                        visibility: 'visible'
                      }
                    }
                  }}
                  key={key}
                >
                  <TableCell sx={{ borderRight: border, padding: 1 }}>{`${country.country}`}</TableCell>
                  <TableCell align="center" sx={{ borderRight: border, padding: 1 }}>
                    {country.phoneCode === undefined ? '' : '+' + country.phoneCode}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: border,
                      padding: 1
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row'
                      }}
                    >
                      <Radio
                        checked={country.isDefault}
                        onChange={() => onSetDefault(country)}
                        sx={{ ml: '42%', mr: '34%', display: 'flex', justifyContent: 'center' }}
                      />
                      <IconButton edge="end" size="medium" color="error" onClick={() => onDelete(country)}>
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
          onClick={() => {
            setNumLines(numLines + 1);
            // setIsOpenCountry(true);
          }}
          sx={{ px: 1.5, width: 'fit-content', borderRadius: 2, margin: 1 }}
        >
          <AddIcon fontSize="small" />
          {t('ncrm_generalsetting_preferences_add_another_line')}
        </Button>
      </Section>
    </Grid>
  );
};

export default withLoading(CountrySetting);
