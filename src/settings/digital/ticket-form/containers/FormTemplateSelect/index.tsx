import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { Box, Button, Grid, Tab, Typography, useTheme } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useRecoilState } from 'recoil';
import { authAtom } from '@base/store/atoms/auth';
import { Control, FieldErrorsImpl } from 'react-hook-form';
//component
import { DomEditor } from '@settings/template/config/write-fields/components';
import { GrapesTSViewField } from '@settings/template/config/view-fields/components';
import MyTemplate from './MyTemplate';
import { useTranslation } from 'react-i18next';
import useDevice from '@base/hooks/useDevice';
import SpanLang from '@base/components/@hanbiro/SpanLang';

import { useTicketFormsInfinite } from '../../hooks/useTicketForms';
import { MENU_SETTING_TICKET_FORM } from '@base/config/menus';
import DefaultTemplate from './DefaultTemplate';
import LoadingCircular from '@base/components/@hanbiro/LoadingCircular';
import { LIST_GRID_PAGE_SIZE } from '@base/config/constant';
import { captureTheImage, getGeneratedPageURL } from '@settings/digital/utils';
export interface Template {
  id: string;
  name: string;
  thumbnail: string;
  active: boolean;
  html: string;
  [x: string]: any;
}

interface FormTemplateSelectProps {
  onChange: Function;
  templateGroup?: 'my' | 'default';
  control: Control<any, any>; //hook-form
  errors: Partial<FieldErrorsImpl<any>>; //hook-from
  value: string;
  //initial Value for html
  initialHtml?: { html: string; css: string };
}

const FormTemplateSelect = (props: FormTemplateSelectProps) => {
  const { initialHtml, value: formValue, onChange } = props;

  const initFirst: Template = {
    id: '',
    name: 'Blank',
    thumbnail: '',
    active: true,
    html: initialHtml ? JSON.stringify(initialHtml) : JSON.stringify({ html: '<body></body>', css: '' })
  };

  //state
  const [activeTemplate, setActiveTemplate] = useState(initFirst);
  const [currentTab, setCurrentTab] = useState('1');

  const theme = useTheme();
  const { t } = useTranslation();
  const { isMobile } = useDevice();

  const handleChange = (newValue: Template) => {
    if (isMobile) setCurrentTab('3');
    setActiveTemplate(newValue);
    //callback
    let htmlData = initialHtml;
    if (newValue.html) {
      htmlData = {
        html: JSON.parse(newValue.html).Html ?? JSON.parse(newValue.html).html,
        css: JSON.parse(newValue.html).Css ?? JSON.parse(newValue.html).css
      };
    }
    props.onChange && props.onChange(htmlData);
  };

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };

  //=================================Init First template============================================
  useEffect(() => {
    if (!formValue) {
      onChange && onChange(initialHtml);
    }
  }, []);

  //===========================================Debug===============================================
  // console.log('initial formValue', formValue);

  //render
  const TemplatePreview = useMemo(() => {
    let htmlData = initialHtml;

    if (activeTemplate.html) {
      htmlData = {
        html: JSON.parse(activeTemplate.html).Html ?? JSON.parse(activeTemplate.html).html,
        css: JSON.parse(activeTemplate.html).Css ?? JSON.parse(activeTemplate.html).css
      };
    }

    return (
      <DomEditor>
        <Box sx={{ width: '100%' }}>
          <GrapesTSViewField keyName={'html'} value={htmlData} userPermission={{ isEdit: false }} menuSourceId={''} menuSource={''} />
        </Box>
      </DomEditor>
    );
  }, [activeTemplate.id]);

  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <TabContext value={currentTab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChangeTab} aria-label="basic tabs example" centered={isMobile ? true : false}>
              <Tab label={<SpanLang keyLang="ncrm_setting_template_my" />} value="1" />
              <Tab label={<SpanLang keyLang="ncrm_setting_template_sample" />} value="2" />
              {isMobile && <Tab label={<SpanLang keyLang="ncrm_setting_template_preview" />} value="3" />}
            </TabList>
          </Box>
          {currentTab !== '3' && <Grid container spacing={2} sx={{ padding: '0 5px' }}></Grid>}
          <TabPanel className="scroll-box" sx={{ maxHeight: '65vh', marginTop: '20px' }} value="1">
            {/* My form */}
            <MyTemplate activeTemplate={activeTemplate} initFirst={initFirst} onChange={handleChange} />
          </TabPanel>
          <TabPanel className="scroll-box" sx={{ maxHeight: '65vh', marginTop: '20px' }} value="2">
            {/* Default form */}

            <DefaultTemplate activeTemplate={activeTemplate} onChange={handleChange} />
          </TabPanel>
          {isMobile && (
            <TabPanel value="3">
              <Grid item xs={12}>
                <Box
                  sx={{
                    border: `1px solid ${theme.palette.divider}`,
                    padding: '10px',
                    marginBottom: '10px'
                  }}
                >
                  {TemplatePreview}
                </Box>
              </Grid>
            </TabPanel>
          )}
        </TabContext>
      </Grid>
      {!isMobile && (
        <Grid item xs={6}>
          <Typography sx={{ padding: '12px 16px', marginBottom: '2px' }}>{t('ncrm_setting_template_preview')}</Typography>
          <Box
            sx={{
              border: `1px solid ${theme.palette.divider}`,
              padding: '10px',
              marginBottom: '10px'
            }}
          >
            {TemplatePreview}
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

export default memo(FormTemplateSelect);
