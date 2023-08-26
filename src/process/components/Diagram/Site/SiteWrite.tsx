import _ from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

import RadioGroup from '@base/components/@hanbiro/RadioGroup';
import SelectBox from '@base/components/@hanbiro/SelectBox';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import { LabelValue } from '@base/types/app';
import { OptionValue } from '@base/types/common';
import { Grid, InputLabel, Stack, useTheme } from '@mui/material';
import { STATUS_BASIC_DATA } from '@process/config/constants';
import { siteCtaAtom, stepSiteAtom } from '@process/store/atoms/process';
import statusAtom from '@process/store/atoms/status';
import { StepSiteForm } from '@process/types/process';
import { getCtaFromHTML } from '@process/utils/site';
import { SITE_GROUP_OPTION } from '@settings/sites/config/constants';
import { SUB_MENUS } from '@settings/sites/config/subMenus';
import { useSite, useSites } from '@settings/sites/services/service';

import { categoryOptions, initContentOption, initTypeOption, samplePage } from '.';

interface SiteWriteProps {}

function SiteWrite(props: SiteWriteProps) {
  const theme = useTheme();
  const [stepSite, setStepSite] = useRecoilState(stepSiteAtom);
  const setStatusesValue = useSetRecoilState(statusAtom);
  const setSiteCta = useSetRecoilState(siteCtaAtom);

  const typeOptions: OptionValue[] = useMemo(() => {
    return [
      initTypeOption,
      ...SUB_MENUS.map((menu) => {
        return {
          keyName: menu.keyName,
          languageKey: menu.languageKey
        };
      })
    ];
  }, []);

  const [contentOptions, setContentOptions] = useState<OptionValue[]>([]);

  const handleTypeChange = useCallback((newOption: OptionValue) => {
    setStepSite((cur: StepSiteForm) => {
      return { ...cur, type: newOption, template: initContentOption };
    });
    setContentOptions([initContentOption]);
  }, []);

  const handleContentChange = useCallback((newOption: OptionValue) => {
    setStepSite((cur) => {
      return { ...cur, template: newOption };
    });
    // reset status
    setStatusesValue([
      STATUS_BASIC_DATA({
        id: uuidv4(),
        button: '-',
        name: 'Visited',
        event: 'EVENT_DISABLE',
        direction: 'DIRECTION_FORWARD_INCOMING_LEFT',
        definedId: uuidv4(),
        property: 'PROPERTY_TODO',
        sequence: ['0']
      })
    ]);
  }, []);

  const handleCategoryChange = useCallback((newOption: LabelValue) => {
    setStepSite((cur) => {
      return { ...cur, category: newOption };
    });
  }, []);

  // get the content date from site content api for selected site type.
  const { data: siteContents } = useSites(
    {
      paging: {
        page: 1,
        size: 1000
      },
      sort: {
        field: 'createdAt',
        orderBy: 2
      }
    },
    stepSite.type.keyName == '' ? false : true
  );

  const { data: siteContent } = useSite(stepSite.template.keyName, SITE_GROUP_OPTION[stepSite.type.keyName]);

  useEffect(() => {
    if (siteContents) {
      let contents: OptionValue[] = [initContentOption];
      for (const content of siteContents.data) {
        contents.push({
          keyName: content.id,
          languageKey: content.name!!
        });
      }
      setContentOptions(contents);
    }
  }, [siteContents]);

  useEffect(() => {
    if (siteContent && siteContent.properties) {
      const body = JSON.parse(siteContent.properties);
      if (body.Html) {
        // setSiteCta(getCtaFromHTML(body.Html));
        setSiteCta(getCtaFromHTML(samplePage));
        setStepSite((cur: StepSiteForm) => {
          return { ...cur, html: body.Html };
        });
      }
    }
  }, [siteContent]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Stack spacing={0.5}>
          <InputLabel sx={{ display: 'flex' }}>
            <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={'ncrm_process_site_landingpage_site'} />
          </InputLabel>
          <RadioGroup isVertical={false} options={categoryOptions} value={stepSite.category} onChange={handleCategoryChange} />
        </Stack>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Stack spacing={0.5}>
          <InputLabel sx={{ display: 'flex' }}>
            <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={'ncrm_process_site_type'} />
          </InputLabel>
          <SelectBox options={typeOptions} value={stepSite.type} onChange={handleTypeChange} />
        </Stack>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Stack spacing={0.5}>
          <InputLabel sx={{ display: 'flex' }}>
            <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={'ncrm_process_site_content'} />
          </InputLabel>
          <SelectBox options={contentOptions} value={stepSite.template} onChange={handleContentChange} />
        </Stack>
      </Grid>
    </Grid>
  );
}

export default SiteWrite;
