import Section from '@analytic/main/components/Section';
import { chartBoxes } from '@analytic/main/config/charts';
import { sectionTitles } from '@analytic/main/config/sections';
import { EUserType } from '@analytic/main/types/enum';
import { DisplayModeProps } from '@analytic/report/types/reports';
import { getConfig } from '@analytic/report/utils';
import MainCard from '@base/components/App/MainCard';
import { BarChart } from '@mui/icons-material';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import SectionEmpty from '../SectionEmpty';
import { Theme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const DisplayPortrait = (props: DisplayModeProps) => {
  const { sections = [], isDisplayGrid = false, isVirtualChart = false } = props;
  const { t } = useTranslation();
  const howManySections: number = sections?.length ?? 0;
  const theme = useTheme();
  return (
    <Box>
      {!howManySections && <SectionEmpty isWriteMode />}
      {!!howManySections &&
        sections?.map((s: any, i: number) => {
          const section = getConfig({ userType: EUserType.USER_TYPE_USER, sectionType: s.section, charts: s.charts, order: i });
          const howManyCharts = s.charts?.length ?? 0;
          if (isVirtualChart) {
            return (
              <Box
                key={i}
                margin={1}
                sx={{ display: 'flex', flexDirection: 'column', border: '1px solid ' + theme.palette.grey[300], borderRadius: '.25rem' }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid ' + theme.palette.grey[300], px: 3, py: 2 }}>
                  <Typography sx={{ fontWeight: 600 }}>{t(sectionTitles[s.section])}</Typography>
                </Box>
                <Grid container py={1}>
                  {!howManyCharts && <SectionEmpty isWriteMode />}
                  {!!howManyCharts &&
                    s.charts.map((k: any, ii: number) => (
                      <Grid key={ii} item xs={isDisplayGrid ? 4 : 12}>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            border: '1px solid ' + theme.palette.grey[300],
                            borderRadius: '.25rem',
                            mx: 1,
                            mb: 1
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              borderBottom: '1px solid ' + theme.palette.grey[300],
                              px: 2,
                              py: 1
                            }}
                          >
                            <Typography sx={{ fontWeight: 600 }}>{t(chartBoxes[k].title)}</Typography>
                          </Box>
                          <Box padding={3}>
                            <BarChart fontSize="medium" />
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                </Grid>
              </Box>
            );
          } else {
            if (howManyCharts == 0) {
              return (
                <MainCard
                  key={i}
                  sx={{
                    backgroundColor: (theme: Theme) => theme.palette.background.paper
                  }}
                  title={t(section.title)}
                  divider={false}
                >
                  <SectionEmpty isWriteMode />
                </MainCard>
              );
            }
            return <Section key={i} {...section} />;
          }
        })}
    </Box>
  );
};

export default DisplayPortrait;
