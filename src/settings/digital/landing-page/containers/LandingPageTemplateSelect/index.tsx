import { memo, useEffect, useMemo, useState } from 'react';

import { Box, Grid, Tab, Typography, useTheme } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import { Control, FieldErrorsImpl } from 'react-hook-form';
//component
import { DomEditor } from '@settings/template/config/write-fields/components';
import { GrapesTSViewField } from '@settings/template/config/view-fields/components';
import MyTemplate from './MyTemplate';
import { useTranslation } from 'react-i18next';
import useDevice from '@base/hooks/useDevice';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import WriteField from '@base/containers/WriteField';
import * as keyNames from '@settings/digital/landing-page/config/keyNames';

import DefaultTemplate from './DefaultTemplate';

import SelectBoxCustom from '@base/components/@hanbiro/SelectBoxCustom';
import { LANDING_PAGE_TYPE_OPTIONS } from '@settings/digital/landing-page/config/constants';
import validators from '@base/utils/validation/fieldValidator';
import { useStorageDownloadMutation } from '@base/hooks/forms/useFileUploadMutation';
import { BaseMutationResponse } from '@base/types/response';
import _ from 'lodash';

export interface Template {
  id: string;
  name: string;
  thumbnail: string;
  active: boolean;
  html: string;
  [x: string]: any;
}

interface TempData {
  templateList: Template[];
  dowloadedIds: string[];
  curDowloadedId: string;
}

interface LandingPageTemplateSelectProps {
  onChange: Function;

  control: Control<any, any>; //hook-form
  errors: Partial<FieldErrorsImpl<any>>; //hook-from
  value: string;
  //initial Value for html
  initialHtml?: { html: string; css: string };
  templateSelectType?: any;
}

const LandingPageTemplateSelect = (props: LandingPageTemplateSelectProps) => {
  const { control, errors, initialHtml, value: formValue, onChange, templateSelectType } = props;

  const initFirst: Template = {
    id: '',
    name: 'Blank',
    thumbnail: '',
    active: true,
    html: '',
    htmlData: initialHtml ? JSON.stringify(initialHtml) : JSON.stringify({ html: '<body></body>', css: '' })
  };

  //state
  const [activeTemplate, setActiveTemplate] = useState(initFirst);
  const [currentTab, setCurrentTab] = useState('1');

  const theme = useTheme();
  const { t } = useTranslation();

  const { isMobile } = useDevice();

  //========================================INITIAL TEMPLATE======================================================
  useEffect(() => {
    if (!formValue) {
      onChange && onChange(initialHtml);
    }
  }, [initialHtml?.html]);
  //========================================HANDLE======================================================

  const handleChange = (newValue: Template, type: 'my' | 'default') => {
    if (isMobile) setCurrentTab('3');

    //This is initial Template
    if (newValue.id == '') {
      setActiveTemplate(newValue);
      props.onChange && props.onChange(JSON.parse(newValue.htmlData));
    }

    //Another template with type "my" we will use html key to get html data
    if (newValue.html && type === 'my' && newValue.id !== '') {
      //If data was downloaded from imageItem, we would use this data
      if (_.has(newValue, 'htmlData')) {
        let result = {
          html: JSON.parse(newValue.htmlData).Html ?? JSON.parse(newValue.htmlData).html,
          css: JSON.parse(newValue.htmlData).Css ?? JSON.parse(newValue.htmlData).css
        };
        setActiveTemplate(newValue);
        props.onChange && props.onChange(result);
      } else {
        //if not, we need download from html key
        const params = {
          filename: newValue.html,
          module: 'landingpage'
        };
        setActiveTemplate(newValue);
        mStorageDownload.mutate(params);
      }
    }
    //Another template with type "default" we will have html data
    if (newValue.htmlData && type === 'default' && newValue.id !== '') {
      let result = {
        html: JSON.parse(newValue.htmlData).Html ?? JSON.parse(newValue.htmlData).html,
        css: JSON.parse(newValue.htmlData).Css ?? JSON.parse(newValue.htmlData).css
      };
      setActiveTemplate(newValue);
      props.onChange && props.onChange(result);
    }
  };

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };

  const mStorageDownload: any = useStorageDownloadMutation<BaseMutationResponse>({
    onSuccess: (data: any, variables: any, context: any) => {
      setActiveTemplate({ ...activeTemplate, html: data });
      props.onChange && props.onChange(JSON.parse(data));
    },
    onError: (error: any, variables: any, context: any) => {
      console.log('There is an error during uploading: ' + JSON.parse(error).message);
    }
  });
  //======================================================================================================

  const TemplatePreview = useMemo(() => {
    let result = initialHtml;

    if (activeTemplate?.htmlData) {
      result = {
        html: JSON.parse(activeTemplate.htmlData).Html ?? JSON.parse(activeTemplate.htmlData).html,
        css: JSON.parse(activeTemplate.htmlData).Css ?? JSON.parse(activeTemplate.htmlData).css
      };
    }

    return (
      <DomEditor>
        <Box sx={{ width: '100%' }}>
          <GrapesTSViewField keyName={'html'} value={result} userPermission={{ isEdit: false }} menuSourceId={''} menuSource={''} />
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
          {currentTab !== '3' && (
            <Grid container spacing={2} sx={{ padding: '0 5px' }}>
              <WriteField
                item={{
                  keyName: keyNames.KEY_NAME_LANDING_PAGE_TYPE,
                  Component: SelectBoxCustom,
                  columns: 1,
                  componentProps: {
                    disableClearable: true,
                    options: LANDING_PAGE_TYPE_OPTIONS.map((item) => {
                      return {
                        ...item,
                        label: t(item.languageKey)
                      };
                    })
                  },
                  languageKey: t('ncrm_generalsetting_landing_page_field_basic_type'),
                  section: 0,
                  tooltipShow: false,
                  hideTitle: true,
                  validate: {
                    required: validators.required
                  }
                }}
                control={control}
                errors={errors}
              />
            </Grid>
          )}

          <TabPanel className="scroll-box" sx={{ maxHeight: '58vh', paddingTop: 0 }} value="1">
            {/* My form */}
            <MyTemplate
              activeTemplate={activeTemplate}
              initFirst={initFirst}
              templateSelectType={templateSelectType}
              onChange={(newValue: Template) => {
                handleChange(newValue, 'my');
              }}
            />
          </TabPanel>
          <TabPanel className="scroll-box" sx={{ maxHeight: '58vh', paddingTop: 0 }} value="2">
            {/* Default form */}
            <DefaultTemplate
              activeTemplate={activeTemplate}
              templateSelectType={templateSelectType}
              onChange={(newValue: Template) => {
                handleChange(newValue, 'default');
              }}
            />
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

export default memo(LandingPageTemplateSelect);
