import { ChangeEvent } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, FormControlLabel, Grid, Radio, RadioGroup, Stack, Typography } from '@mui/material';

// project import
import MainCard from '@base/components/App/MainCard';
import useConfig from '@base/hooks/useConfig';

// assets

import { ThemeMode } from '@base/types/config';
import SpanLang from '@base/components/@hanbiro/SpanLang';

// ==============================|| CUSTOMIZATION - MODE ||============================== //

const ThemeModeLayout = () => {
  const theme = useTheme();

  const { mode, onChangeMode } = useConfig();

  const handleModeChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChangeMode(event.target.value as ThemeMode);
  };

  const commonStyles = {
    // bgcolor: 'background.paper',
    m: 0,
    border: 0,
    width: '2rem',
    height: '1rem'
  };

  return (
    <>
      <RadioGroup row aria-label="payment-card" name="payment-card" value={mode} onChange={handleModeChange}>
        <Grid container spacing={1.75} sx={{ ml: 0 }}>
          <Grid item>
            <FormControlLabel
              control={<Radio value="light" sx={{ display: 'none' }} />}
              sx={{ display: 'flex', '& .MuiFormControlLabel-label': { flex: 1 } }}
              label={
                <MainCard
                  content={false}
                  border={false}
                  // sx={{ bgcolor: mode === 'light' ? 'primary.lighter' : 'secondary.lighter', p: 1 }}
                  // {...(mode === 'light' && { boxShadow: true, shadow: theme.customShadows.primary })}
                  boxShadow={false}
                  sx={{ p: 1, boxShadow: 0 }}
                >
                  <Stack spacing={1.25} alignItems="center">
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        border: 2,
                        p: '1px',
                        borderColor: mode === 'light' ? 'primary.main' : '#f5f5f5',
                        ':hover': {
                          borderColor: mode === 'light' ? 'primary.main' : '#596882'
                        },
                        '&:before': {
                          // content: "'\f3ff'",
                          content: "'√'",
                          // fontFamily: 'Ionicons',
                          fontSize: '26px',
                          position: 'absolute',
                          top: '30%',
                          left: '45%',
                          lineHeight: 0,
                          marginLeft: '-5px',
                          marginTop: '-1px',
                          color: 'primary.main',
                          display: mode === 'light' ? 'block' : 'none'
                        }
                      }}
                    >
                      <Box sx={{ ...commonStyles, bgcolor: '#f5f5f5' }}></Box>
                      <Box sx={{ ...commonStyles, bgcolor: '#e0e0e0' }}></Box>
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{ textTransform: 'uppercase' }}
                      color={mode === 'light' ? 'primary.main' : 'text.primary'}
                    >
                      
                      <SpanLang keyLang="ncrm_common_skin_light" />
                    </Typography>
                  </Stack>
                </MainCard>
              }
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={<Radio value="dark" sx={{ display: 'none' }} />}
              sx={{ display: 'flex', '& .MuiFormControlLabel-label': { flex: 1 } }}
              label={
                <MainCard
                  content={false}
                  border={false}
                  // sx={{ bgcolor: mode === 'dark' ? 'primary.lighter' : 'secondary.lighter', p: 1 }}
                  // {...(mode === 'dark' && { boxShadow: true, shadow: theme.customShadows.primary })}
                  boxShadow={false}
                  sx={{ p: 1, boxShadow: 0 }}
                >
                  <Stack spacing={1.25} alignItems="center">
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        border: 2,
                        p: '1px',
                        borderColor: mode === 'dark' ? 'primary.main' : '#f5f5f5',
                        ':hover': {
                          borderColor: mode === 'dark' ? 'primary.main' : '#596882'
                        },
                        '&:before': {
                          content: "'√'",
                          // fontFamily: 'Ionicons',
                          fontSize: '26px',
                          position: 'absolute',
                          top: '30%',
                          left: '45%',
                          lineHeight: 0,
                          marginLeft: '-5px',
                          marginTop: '-1px',
                          color: 'primary.main',
                          display: mode === 'dark' ? 'block' : 'none'
                        }
                      }}
                    >
                      <Box sx={{ ...commonStyles, bgcolor: '#596882' }}></Box>
                      <Box sx={{ ...commonStyles, bgcolor: '#1c273c' }}></Box>
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{ textTransform: 'uppercase' }}
                      color={mode === 'dark' ? 'primary.main' : 'text.primary'}
                    >
                      <SpanLang keyLang="ncrm_common_skin_dark" />
                    </Typography>
                  </Stack>
                </MainCard>
              }
            />
          </Grid>
        </Grid>
      </RadioGroup>
    </>
  );
};

export default ThemeModeLayout;
