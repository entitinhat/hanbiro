import React, { useState, memo, useEffect } from 'react';
import { Box, Button, Grid, ImageList } from '@mui/material';
import * as keyNames from '@settings/digital/landing-page/config/keyNames';

//components
import ImageItem from './ImageItem';
import { MENU_SETTING_LANDINGPAGE } from '@base/config/menus';
import { useLandingPagesInfinite } from '../../hooks/useLandingPages';
import { LIST_GRID_PAGE_SIZE } from '@base/config/constant';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';
import { authAtom } from '@base/store/atoms/auth';
import { Template } from '.';
import LoadingCircular from '@base/components/@hanbiro/LoadingCircular';

interface MyTemplateProps {
  templateSelectType: any;
  onChange: any;
  initFirst: any;
  activeTemplate: any;
}
const TEMPLATE_SIZE = LIST_GRID_PAGE_SIZE;
const MyTemplate = (props: MyTemplateProps) => {
  const { onChange, templateSelectType, initFirst, activeTemplate } = props;

  const [pageSize, setPageSize] = useState<number>(TEMPLATE_SIZE);
  const [myTemplate, setMyTemplate] = useState<Template[]>([initFirst]);
  const [auth] = useRecoilState(authAtom);
  const { t } = useTranslation();
  //  //======================================== get list data ======================================================================
  const pageDataKey = MENU_SETTING_LANDINGPAGE;
  const fields = [
    { keyName: keyNames.KEY_NAME_LANDING_PAGE_ID },
    { keyName: keyNames.KEY_NAME_LANDING_PAGE_NAME },
    { keyName: keyNames.KEY_NAME_LANDING_PAGE_HTML }
  ];
  const LadingPageFilter = {
    paging: {
      page: 1,
      size: pageSize
    },
    query: `type=\"${templateSelectType?.value}\" createdBy=\"${auth?.user?.id}\"` //createdBy=\"${auth.user?.id}\"
  };
  const enabled = fields.length > 0 && templateSelectType?.value;
  const { data, hasNextPage, isLoading } = useLandingPagesInfinite(
    pageDataKey,
    fields,
    {
      //only fetch data when tab is "my template"
      enabled: enabled ? true : false
    },
    LadingPageFilter
  );
  const sections = data?.pages?.[0]?.data ?? [];

  useEffect(() => {
    if (sections.length > 0 && JSON.stringify(sections) !== JSON.stringify(myTemplate)) {
      let intialTemplate: Template[] = [initFirst, ...sections];
      let lastTemplates: Template[] = [];
      intialTemplate.forEach((template: any) => {
        let tmp = { ...template };
        tmp.active = activeTemplate?.id === template.id;
        lastTemplates.push(tmp);
      });

      setMyTemplate(lastTemplates);
    }
  }, [JSON.stringify(sections)]);
  //=============================================================================================

  const handleOnChange = (itemActive: any) => {
    let listTemplateNew: any[] = [];

    myTemplate.map((item, key) => {
      let tmp = { ...item };
      tmp.active = false;
      if (itemActive.id == item.id) {
        tmp.active = true;
      }
      listTemplateNew.push(tmp);
    });

    setMyTemplate(listTemplateNew);
    onChange && onChange(itemActive);
  };

  return (
    <Grid container spacing={2}>
      <LoadingCircular loading={isLoading} />
      <Grid item xs={12}>
        <ImageList sx={{ overflow: 'visible' }} cols={2} rowHeight={350}>
          {myTemplate.map((item) => {
            return (
              <ImageItem
                item={item}
                key={item.id}
                onUpdate={(templateData: Template) => {}}
                onSelect={(templateData: Template) => handleOnChange(templateData)}
              />
            );
          })}
        </ImageList>
      </Grid>
      <Grid item xs={12}>
        <Grid container sx={{ padding: '0 5px', marginTop: '20px' }}>
          {hasNextPage && (
            <Box sx={{ pl: 2 }}>
              <Button
                size="small"
                onClick={() => {
                  setPageSize(pageSize + TEMPLATE_SIZE);
                }}
              >
                {t('ncrm_common_btn_view_more')}
              </Button>
            </Box>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default memo(MyTemplate);
