import { memo, useEffect, useState } from 'react';

import { FilterInput } from '@base/types/common';
import { TemplateGroup } from '@settings/template/types/template';
import { LabelValue } from '@base/types/app';
import * as keyNames from '@settings/template/config/key-names';

import { useMenuTemplates } from '@settings/template/hooks/useMenuTemplates';

import { Box, Grid, Tab, Typography, useMediaQuery, useTheme } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

//constants
import {
  TEMPLATE_MESSAGE_TYPE_OPTIONS,
  TEMPLATE_TASK_TYPE_OPTIONS,
  TEMPLATE_TYPE_OPTIONS,
  USER_ID
} from '@settings/template/config/constants';

import { useRecoilState } from 'recoil';
import { authAtom } from '@base/store/atoms/auth';

import { Control, FieldErrorsImpl } from 'react-hook-form';
//component
import {
  DomEditor,
  SelectBoxCustom,
  SequenceTaskContainer,
  OnetimeTable as QuoteOneTimeTable
} from '@settings/template/config/write-fields/components';
import { GrapesTSViewField } from '@settings/template/config/view-fields/components';
import MyTemplate from './MyTemplate';
import TypeTemplate from './TypeTemplate';
import WriteField from '@base/containers/WriteField';
import { useTranslation } from 'react-i18next';

const optionGroup = [
  { key: 'email', value: 2 },
  { key: 'sms', value: 3 },
  { key: 'task', value: 4 },
  { key: 'call', value: 5 },
  { key: 'knowledgebase', value: 1 },
  { key: 'quote', value: 6 }
];
export const optionGeneralTypeSelect = [
  { value: 0, label: 'All', key: 'ALL' },
  { value: 1, label: 'General', key: 'TYPE_GENERAL' },
  { value: 2, label: 'Survey', key: 'TYPE_SURVEY' },
  { value: 3, label: 'Thank You', key: 'TYPE_THANK_YOU' },
  { value: 4, label: 'Follow Up', key: 'TYPE_FOLLOW_UP' }
];
export const optionTaskTypeSelect = [
  { value: 3, label: 'Manual', key: 'SUB_TYPE_TASK_MANUAL' },
  { value: 4, label: 'Check list', key: 'SUB_TYPE_TASK_CHECK_LIST' },
  { value: 5, label: 'Sequence', key: 'SUB_TYPE_TASK_SEQUENCE' }
];
export const optionSMSypeSelect = [
  { value: 1, label: 'SUB_TYPE_MESSAGE_SMS', key: 'SUB_TYPE_MESSAGE_SMS' },
  { value: 2, label: 'SUB_TYPE_MESSAGE_MMS', key: 'SUB_TYPE_MESSAGE_MMS' }
];

export interface Template {
  id: string;
  name: string;
  thumbnail: string;
  active: boolean;
  html: string;
  [x: string]: any;
}

interface SiteTemplateSelectProps {
  onChange: Function;
  templateGroup: TemplateGroup;
  templateType: LabelValue;
  subType: LabelValue;
  control: Control<any, any>; //hook-form
  errors: Partial<FieldErrorsImpl<any>>; //hook-from
}

const SiteTemplateSelect: React.FC<SiteTemplateSelectProps> = (props: SiteTemplateSelectProps) => {
  const { templateGroup, templateType, subType, control, errors } = props;
  const initFirst: Template = {
    id: '',
    name: 'Blank',
    thumbnail: '',
    active: true,
    html: JSON.stringify({ html: '<body><p style="padding:12px">Insert your text here ...</p></body>', css: '' })
  };
  //----------------------------Get group for query----------------------------------------
  const group = templateGroup ? templateGroup : keyNames.KEY_MENU_TEMPLATE_EMAIL;
  let selectGroup = optionGroup?.find((v: any) => v.key === group) ?? { key: keyNames.KEY_MENU_TEMPLATE_EMAIL, value: 2 };
  //-----------------------------------------End ----------------------------------------------
  const isSequenceTask = subType?.value == 'SUB_TYPE_TASK_CHECK_LIST' || subType?.value == 'SUB_TYPE_TASK_SEQUENCE';
  //state
  const [active, setActive] = useState(initFirst);
  const [value, setValue] = useState('1');
  const [myTemplate, setMyTemplate] = useState<Template[]>([initFirst]);

  const theme = useTheme();
  const { t } = useTranslation();
  const matchesMd = useMediaQuery(theme.breakpoints.down('md'));
  const [auth] = useRecoilState(authAtom);

  const handleChange = (newValue: Template) => {
    if (matchesMd) setValue('3');
    setActive(newValue);
    //callback
    props.onChange && props.onChange(JSON.parse(newValue.html));
  };
  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  //---------------------------------- get list data------------------------------------------
  const listQuerySchema = `results {
    id
    name
    title
    html
    thumbnail
    type
    subType
    language
    createdAt
    stage
  }
  paging {
    totalPage
    totalItems
    currentPage
  }`;
  let filtersQuery: FilterInput = {
    //query: 'group=2',
    query: `group=${selectGroup?.value} createdBy=${auth.user?.id ?? USER_ID}`
  };
  let { data } = useMenuTemplates(filtersQuery, listQuerySchema);
  //-----------------------------------------------------------------------------------------------

  useEffect(() => {
    if (data?.data) {
      let myTemplateInit: Template[] = [];
      myTemplateInit.push(initFirst);
      data?.data.map((item: any, key) => {
        let tmp = { ...item };
        tmp.active = false;
        myTemplateInit.push(tmp);
      });
      setMyTemplate(myTemplateInit);
    }
  }, [data?.data]);

  const getPreView = (item: Template) => {
    let htmlData = JSON.stringify({ html: '', css: '' });
    if (item.html) {
      htmlData = item.html;
    }

    if ([keyNames.KEY_MENU_TEMPLATE_QUOTE].includes(templateGroup)) {
      return (
        <DomEditor>
          <Box sx={{ width: '100%', padding: '10px' }}>
            <QuoteOneTimeTable mode="v" value={item.id == '' ? [] : JSON.parse(htmlData)} />
          </Box>
        </DomEditor>
      );
    } else if (isSequenceTask) {
      return (
        <DomEditor>
          <Box sx={{ width: '100%', padding: '10px' }}>
            <SequenceTaskContainer mode="view" value={item.id == '' ? [] : JSON.parse(htmlData)} />
          </Box>
        </DomEditor>
      );
    } else
      return (
        <DomEditor>
          <Box sx={{ width: '100%' }}>
            <GrapesTSViewField
              keyName={keyNames.KEY_MENU_TEMPLATE_DESGIN}
              value={JSON.parse(htmlData)}
              userPermission={{ isEdit: false }}
              menuSourceId={''}
              menuSource={''}
            />
          </Box>
        </DomEditor>
      );
  };

  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChangeTab} aria-label="basic tabs example" centered={matchesMd ? true : false}>
              <Tab label={t('ncrm_setting_template_my')} value="1" />
              <Tab label={t('ncrm_setting_template_sample')} value="2" />
              {matchesMd && <Tab label="Preview" value="3" />}
            </TabList>
          </Box>
          {value !== '3' && (
            <Grid container spacing={2} sx={{ padding: '0 5px' }}>
              {/* Template type */}
              <WriteField
                item={{
                  keyName: keyNames.KEY_MENU_TEMPLATE_TYPE,
                  Component: SelectBoxCustom,
                  columns: 2,
                  componentProps: {
                    options: TEMPLATE_TYPE_OPTIONS
                  },
                  languageKey: '',
                  section: 0,
                  tooltipShow: false
                }}
                control={control}
                errors={''}
              />
              {selectGroup?.key == keyNames.KEY_MENU_TEMPLATE_SMS ? (
                <WriteField
                  item={{
                    keyName: keyNames.KEY_MENU_TEMPLATE_SUB_TYPE,
                    Component: SelectBoxCustom,
                    columns: 2,
                    componentProps: {
                      options: TEMPLATE_MESSAGE_TYPE_OPTIONS
                    },
                    languageKey: '',
                    section: 0,
                    tooltipShow: false
                  }}
                  control={control}
                  errors={errors}
                />
              ) : (
                ''
              )}
              {selectGroup?.key == keyNames.KEY_MENU_TEMPLATE_TASK ? (
                <WriteField
                  item={{
                    keyName: keyNames.KEY_MENU_TEMPLATE_SUB_TYPE,
                    Component: SelectBoxCustom,
                    columns: 2,
                    componentProps: {
                      options: TEMPLATE_TASK_TYPE_OPTIONS
                    },
                    languageKey: '',
                    section: 0,
                    tooltipShow: false
                  }}
                  control={control}
                  errors={errors}
                />
              ) : (
                ''
              )}
            </Grid>
          )}
          <TabPanel value="1">
            <MyTemplate
              selectGroup={selectGroup}
              listTemplate={myTemplate}
              setTemplate={setMyTemplate}
              onChange={handleChange}
              templateType={templateType}
              subType={subType}
            />
          </TabPanel>
          <TabPanel value="2">
            <TypeTemplate type="sample" onChange={handleChange} selectGroup={selectGroup} templateType={templateType} subType={subType} />
          </TabPanel>
          {matchesMd && (
            <TabPanel value="3">
              <Grid item xs={12}>
                <Box
                  sx={{
                    border: `1px solid ${theme.palette.divider}`,
                    padding: '10px',
                    marginBottom: '10px'
                  }}
                >
                  {getPreView(active)}
                </Box>
              </Grid>
            </TabPanel>
          )}
        </TabContext>
      </Grid>
      {!matchesMd && (
        <Grid item xs={6}>
          <Typography sx={{ padding: '12px 16px', marginBottom: '2px' }}>{t('ncrm_setting_template_preview')}</Typography>
          <Box
            sx={{
              border: `1px solid ${theme.palette.divider}`,
              padding: '10px',
              marginBottom: '10px'
            }}
          >
            {getPreView(active)}
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

export default memo(SiteTemplateSelect);
