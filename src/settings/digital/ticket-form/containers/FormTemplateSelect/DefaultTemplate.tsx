import React, { useState, useEffect } from 'react';

import { LabelValue } from '@base/types/app';

import { Grid, ImageList } from '@mui/material';

//components
import ImageItem from './ImageItem';
import { Template } from '.';
import { DATA_FORM } from './dummy-data';

interface TypeTemplateProps {
  onChange: Function;
  activeTemplate: any;
}
const DefaultTemplate: React.FC<TypeTemplateProps> = (props: TypeTemplateProps) => {
  const { activeTemplate } = props;
  //State
  let [listTemplate, setTemplate] = useState<Template[]>([]);

  //----------------------------------Get list data for Sample-----------------------------------

  let data: any = DATA_FORM;
  //-----------------------------------------------------------------------------------------------------

  //filter template list
  useEffect(() => {
    if (data?.data) {
      let myTemplateInit: Template[] = [];
      data?.data.map((item: any) => {
        let tmp = { ...item };
        tmp.active = activeTemplate?.id === tmp.id;
        myTemplateInit.push(tmp);
      });
      setTemplate(myTemplateInit);
    }
  }, [data?.data, activeTemplate?.id]);

  const handleOnChange = (itemActive: Template) => {
    let listTemplateNew: Template[] = [];

    listTemplate.map((item, key) => {
      let tmp = { ...item };
      tmp.active = false;
      if (itemActive.id == item.id) {
        tmp.active = true;
      }
      listTemplateNew.push(tmp);
    });
    setTemplate(listTemplateNew);
    props.onChange(itemActive);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <ImageList sx={{ overflow: 'visible' }} cols={2} rowHeight={350}>
          {listTemplate.map((item) => {
            return <ImageItem item={item} key={item.id} onSelect={(template: Template) => handleOnChange(template)} />;
          })}
        </ImageList>
      </Grid>
    </Grid>
  );
};

export default DefaultTemplate;
