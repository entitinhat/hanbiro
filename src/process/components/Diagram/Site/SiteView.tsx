import _ from 'lodash';
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useTranslation } from 'react-i18next';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import { Grid, InputLabel, Stack, Typography, useTheme } from '@mui/material';
import { siteCtaAtom, stepSiteAtom } from '@process/store/atoms/process';
import { Site, StepSiteForm } from '@process/types/process';
import { getCtaFromHTML } from '@process/utils/site';
import { SITE_GROUP_KEY } from '@settings/sites/config/constants';
import { SUB_MENUS } from '@settings/sites/config/subMenus';

import { categoryOptions, initContentOption, initTypeOption, samplePage } from '.';

interface SiteViewProps {
  value: Site;
}

// If site has multiple forward, It must be parallel.
// parallel : join, and join
// If parallel is join, It must be Wait step as next step.
// If parallel is and join, It can be anything.
function SiteView({ value }: SiteViewProps) {
  const { t } = useTranslation()
  const theme = useTheme();
  const [stepSite, setStepSite] = useRecoilState(stepSiteAtom);
  const setSiteCta = useSetRecoilState(siteCtaAtom);

  useEffect(() => {
    let stepSiteForm: StepSiteForm = {
      template: initContentOption,
      category: categoryOptions[0],
      type: initTypeOption,
      html: ''
    };

    if (value.type) {
      const groupKey = SITE_GROUP_KEY[value.type];
      const groupIndex = SUB_MENUS.findIndex((menu) => menu.keyName == groupKey);
      stepSiteForm.type = {
        keyName: groupKey,
        languageKey: SUB_MENUS[groupIndex]?.languageKey
      };
    }

    if (value.category) {
      const optIndex = categoryOptions.findIndex((opt) => opt.value == value.category);
      stepSiteForm.category = {
        value: value.category,
        label: categoryOptions[optIndex].label
      };
    }

    if (value.template) {
      stepSiteForm.template = {
        keyName: value.template.id,
        languageKey: value.template.name
      };
    }

    setStepSite(stepSiteForm);
    setSiteCta(getCtaFromHTML(samplePage));
  }, [value]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6}>
        <Stack spacing={0.5}>
          <InputLabel sx={{ display: 'flex' }}>
            <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={'ncrm_process_site_landingpage_site'} />
          </InputLabel>
          <Typography>{t(stepSite.category.label)}</Typography>
        </Stack>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Stack spacing={0.5}>
          <InputLabel sx={{ display: 'flex' }}>
            <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={'ncrm_process_site_type'} />
          </InputLabel>
          <Typography>{t(stepSite.type.languageKey)}</Typography>
        </Stack>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Stack spacing={0.5}>
          <InputLabel sx={{ display: 'flex' }}>
            <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={'ncrm_process_site_content'} />
          </InputLabel>
          <Typography>{stepSite.template.languageKey}</Typography>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default SiteView;
