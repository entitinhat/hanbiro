import { useState, memo, useEffect } from 'react';
import { Box, Button, Grid, ImageList } from '@mui/material';

//components
import ImageItem from './ImageItem';
import { Template } from '.';
import { LIST_GRID_PAGE_SIZE } from '@base/config/constant';
import { MENU_SETTING_TICKET_FORM } from '@base/config/menus';
import * as keyNames from '@settings/digital/ticket-form/config/keyNames';
import { useTicketFormsInfinite } from '../../hooks/useTicketForms';
import { getGeneratedPageURL } from '@settings/digital/utils';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';

import LoadingCircular from '@base/components/@hanbiro/LoadingCircular';
import { authAtom } from '@base/store/atoms/auth';
interface MyTemplateProps {
  onChange: any;
  initFirst: any;
  activeTemplate: any;
}
const LIST_TEMPLATE_SIZE = LIST_GRID_PAGE_SIZE;
const MyTemplate = (props: MyTemplateProps) => {
  const { initFirst, onChange, activeTemplate } = props;

  const [myTemplate, setMyTemplate] = useState<Template[]>([initFirst]);
  const [pageSize, setPageSize] = useState<number>(LIST_TEMPLATE_SIZE);
  const [auth] = useRecoilState(authAtom);
  const { t } = useTranslation();
  //---------------------------------- get list data form  server------------------------------------------
  const pageDataKey = MENU_SETTING_TICKET_FORM;
  const fields = [
    {
      keyName: keyNames.KEY_TICKET_FORM_NAME
    },
    {
      keyName: keyNames.KEY_TICKET_FORM_ID
    },
    {
      keyName: keyNames.KEY_TICKET_FORM_HTML
    }
  ];
  const ticketFormFilter = {
    paging: {
      page: 1,
      size: pageSize
    },
    query: `createdBy=\"${auth?.user?.id ?? ''}\"`
  };
  const { data, isLoading, hasNextPage } = useTicketFormsInfinite(pageDataKey, fields, ticketFormFilter);
  const sections = data?.pages?.[0]?.data ?? [];

  useEffect(() => {
    if (sections.length > 0 && JSON.stringify(sections) !== JSON.stringify(myTemplate)) {
      let myTemplateInit: Template[] = [initFirst, ...sections];

      myTemplateInit = myTemplateInit.map((template: Template) => {
        const html = (JSON.parse(template.html).Html ?? JSON.parse(template.html).html) as string;
        const css = (JSON.parse(template.html).Css ?? JSON.parse(template.html).css) as string;
        const thumbnail = getGeneratedPageURL({ html, css, scale: 0.3 });
        return { ...template, active: template.id === activeTemplate?.id, thumbnail };
      });
      setMyTemplate(myTemplateInit);
    }
  }, [JSON.stringify(sections)]);

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
    props.onChange(itemActive);
  };

  return (
    <Grid container spacing={2}>
      <LoadingCircular loading={isLoading} />
      <Grid item xs={12}>
        <ImageList sx={{ overflow: 'visible' }} cols={2} rowHeight={350}>
          {myTemplate.map((item) => {
            return <ImageItem item={item} key={item.id} onSelect={(template: Template) => handleOnChange(template)} />;
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
                  setPageSize(pageSize + LIST_TEMPLATE_SIZE);
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
