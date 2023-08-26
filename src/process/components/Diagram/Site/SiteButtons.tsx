import _ from 'lodash';
import { useCallback, useMemo } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

import Icon from '@base/assets/icons/svg-icons';
import { Box, Button, Card, CardContent, CardHeader, Checkbox, Divider, Grid, Stack, Typography } from '@mui/material';
import { STATUS_BASIC_DATA } from '@process/config/constants';
import { siteCtaAtom, stepSiteAtom } from '@process/store/atoms/process';
import statusAtom, { selectedStatusAtom } from '@process/store/atoms/status';
import { CtaProperty } from '@process/types/diagram';
import { getCtaFromHTML } from '@process/utils/site';

import { samplePage } from '.';
import { Crop169Rounded, Download, Web } from '@mui/icons-material';
``;
interface SiteButtonsProps {
  mode: 'view' | 'write';
}

function SiteButtons({ mode }: SiteButtonsProps) {
  const setSelectedStatus = useSetRecoilState(selectedStatusAtom);
  const [statusesValue, setStatusesValue] = useRecoilState(statusAtom);
  const stepSite = useRecoilValue(stepSiteAtom);
  const [siteCta, setSiteCta] = useRecoilState(siteCtaAtom);

  const handleAdd = useCallback((btn: CtaProperty) => {
    // If there is anything, remove it. otherwise add it.
    setStatusesValue((old) => {
      const targetIndex = old.findIndex((status) => status.ctaId === btn.id);
      if (targetIndex != -1) {
        return [...old.slice(0, targetIndex), ...old.slice(targetIndex + 1)];
      } else {
        let event = 'EVENT_NONE';
        let direction = 'DIRECTION_NONE';
        let definedId = uuidv4();
        if (btn.type == 'submit') {
          event = 'EVENT_SUBMIT';
          direction = 'DIRECTION_STAYING';
        } else if (btn.type == 'download') {
          event = 'EVENT_DOWNLOAD';
          direction = 'DIRECTION_STAYING';
        } else {
          event = 'EVENT_CLICK';
          direction = 'DIRECTION_FORWARD_OUTGOING_RIGHT';
        }
        return [
          ...old,
          {
            ...STATUS_BASIC_DATA({
              id: btn.id,
              button: btn.button,
              name: btn.title,
              newFlag: true,
              resetFlag: true,
              event: event,
              direction: direction,
              definedId: definedId,
              sequence: ['1'],
              ctaId: btn.id,
              pageName: btn.title
            })
          }
        ];
      }
    });
    setSelectedStatus(btn.id);
  }, []);

  const openPage = useCallback(
    (id: string) => {
      setSiteCta((old) => {
        const targetIndex = old.findIndex((cta) => cta.id === id);
        if (targetIndex != -1) {
          const targetValue = {
            ...old[targetIndex],
            page: getCtaFromHTML(samplePage) // it has to change with page api later.
          };

          return [...old.slice(0, targetIndex), targetValue, ...old.slice(targetIndex + 1)];
        }
        return old;
      });
    },
    [siteCta]
  );

  const renderButtons = useCallback(
    (buttons: CtaProperty[]) => {
      return (
        <>
          {buttons.length > 0 && (
            <Box component="ul" sx={{ ml: 2 }} className="site-links-list btns-list">
              {buttons.map((cta, index) => {
                const found = statusesValue.find((status) => status.ctaId && status.ctaId === cta.id);
                const checked = found ? true : false;
                return (
                  <li key={index}>
                    <Stack direction="row" alignItems="center">
                      {cta.type == 'click' && (
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <Typography>{cta.button}</Typography>
                            {(mode == 'write' || (mode == 'view' && found?.new)) && (
                              <Checkbox sx={{ '&:hover': { bgcolor: 'transparent' } }} onChange={() => handleAdd(cta)} checked={checked} />
                            )}
                            <div className="site-direction"></div>
                            <Stack direction="row" spacing={1} alignItems="center">
                              <Web sx={{ fontSize: 18 }} />
                              <Typography>{cta.title}</Typography>
                            </Stack>
                          </Stack>
                          {cta.page && cta.page.length > 0 && renderButtons(cta.page)}
                        </Stack>
                      )}
                      {cta.type == 'submit' && (
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Stack
                            sx={{
                              borderRadius: 1,
                              boxShadow: (t) => t.customShadows.z1
                            }}
                          >
                            <Stack sx={{ py: 1, px: 2 }} spacing={1} direction="row" alignItems="center">
                              <Crop169Rounded sx={{ fontSize: 18 }} />
                              <Typography>{cta.title}</Typography>
                            </Stack>
                            <Divider />
                            <Box sx={{ py: 1, px: 2 }}>
                              <Typography>{cta.button}</Typography>
                            </Box>
                          </Stack>
                          {(mode == 'write' || (mode == 'view' && found?.new)) && (
                            <Checkbox onChange={() => handleAdd(cta)} checked={checked} />
                          )}
                        </Stack>
                      )}
                      {cta.type == 'download' && (
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Button size="small" sx={{ borderRadius: 30 }} variant="outlined" startIcon={<Download />}>
                            Download
                          </Button>
                          {(mode == 'write' || (mode == 'view' && found?.new)) && (
                            <Checkbox sx={{ '&:hover': { bgcolor: 'transparent' } }} onChange={() => handleAdd(cta)} checked={checked} />
                          )}
                        </Stack>
                      )}
                    </Stack>
                  </li>
                );
              })}
            </Box>
          )}
        </>
      );
    },
    [siteCta, statusesValue]
  );

  return (
    <Grid item xs={12}>
      <Typography variant="h2">{stepSite.template.languageKey}</Typography>
      {renderButtons(siteCta)}
    </Grid>
  );
}

export default SiteButtons;
