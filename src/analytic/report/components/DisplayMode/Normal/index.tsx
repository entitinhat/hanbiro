import { keys } from 'lodash';
import React from 'react';
import {chartBoxes} from '@analytic/main/config/charts';
import SectionEmpty from '../SectionEmpty';
import { Box, Typography } from '@mui/material';
import { BarChart } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const DisplayNormal = (props: any) => {
  const { data = {}, sectionConfigs = {} } = props;
  const { t }= useTranslation()
  const { selectedSections: iSelectedSections = [], selectedCharts: iSelectedCharts = [] } = data ?? {};

  const iSelectedSectionsLength: number = iSelectedSections?.length ?? 0;

  return (
    <Box>
      {!iSelectedSectionsLength && <SectionEmpty />}
      {!!iSelectedSectionsLength &&
        iSelectedSections.map((s: any, i: number) => {
          const chartKeys: string[] = iSelectedCharts.map((v: any) => v.value);
          const chartOptionsBySection: any = sectionConfigs?.[s.value]?.chartConfigs ?? {};
          const chartOptions: any = keys(chartOptionsBySection).reduce((f: any[], k) => {
            if (chartKeys.includes(k) && chartOptionsBySection[k]) {
              f = [
                ...f,
                {
                  ...(chartBoxes?.[k] ?? {}),
                  value: k,
                  label: t(chartOptionsBySection?.[k]?.componentProps?.title)
                }
              ];
            }
            return f;
          }, []);

          return (
            <Box key={i}>
              <Typography>{t(s.label)}</Typography>
              <Box>
                <Box>
                  {!chartOptions?.length && <SectionEmpty />}
                  {!!chartOptions?.length &&
                    chartOptions.map((c: any, ii: number) => {
                      const { wrapperProps } = c ?? {};

                      return (
                        <Box key={ii}>
                          <Box>
                            <Box>
                              <Typography variant="h6">{t(c.label)}</Typography>
                            </Box>
                            <Box>
                              <BarChart/>
                            </Box>
                          </Box>
                        </Box>
                      );
                    })}
                </Box>
              </Box>
            </Box>
            // <div className={classNames('card', {'mg-t-10': i > 0})} key={i}>
            //   <div className="card-header tx-semibold">{s.label}</div>
            //   <div className="pd-10 bg-light">
            //     <div className="row row-xs">
            //       {
            //         !chartOptions?.length && <SectionEmpty/>
            //       }
            //       {
            //         !!chartOptions?.length && chartOptions.map((c: any, ii: number) => {
            //           const {wrapperProps} = c ?? {};

            //           return (
            //             <ChartWrapper {...wrapperProps} key={ii}>
            //               <VirtualChart title={c.label}/>
            //             </ChartWrapper>
            //           );
            //         })
            //       }
            //     </div>
            //   </div>
            // </div>
          );
        })}
    </Box>
  );
};

export default DisplayNormal;
