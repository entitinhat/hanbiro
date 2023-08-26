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
import { useTranslation } from 'react-i18next';
import { Theme } from '@mui/material/styles';

interface DisplayLandscapeProps extends DisplayModeProps {
  parentProps?: {
    width?: number;
  };
}

const DisplayLandscape = (props: DisplayLandscapeProps) => {
  const { sections, isDisplayGrid = false, isVirtualChart = false, parentProps = {} } = props;
  const { t } = useTranslation();
  const howManySections: number = sections?.length ?? 0;
  const width = parentProps?.width ?? 415;
  const scrollWidths = !!howManySections ? width * howManySections + (howManySections - 1) * 20 : 'auto';
  const theme = useTheme();
  return (
    <Box sx={{ overflowX: 'scroll', overflowY: 'hidden', width: '100%', height: 'auto' }}>
      <Box sx={{ width: scrollWidths, display: 'flex', mb: 2 }}>
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
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid ' + theme.palette.grey[300],
                    borderRadius: '.25rem',
                    width: width - 10,
                    height: 'auto'
                  }}
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
                              <Typography sx={{ fontWeight: 600 }}>{chartBoxes[k].title}</Typography>
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
                    title={section.title}
                    divider={false}
                  >
                    <SectionEmpty isWriteMode />
                  </MainCard>
                );
              }
              return (
                <Box
                  key={i}
                  sx={{
                    width: width - 10,
                    height: 600,
                    overflow: 'scroll',
                    margin: 2
                  }}
                >
                  <Section {...section} />
                </Box>
              );
            }
          })}
      </Box>
    </Box>
  );
};

export default DisplayLandscape;
