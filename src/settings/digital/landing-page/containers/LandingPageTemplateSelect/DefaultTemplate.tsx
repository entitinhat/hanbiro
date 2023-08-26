import React, { useState, useEffect } from 'react';

import { LabelValue } from '@base/types/app';

import { Grid, ImageList } from '@mui/material';

//components
import ImageItem from './ImageItem';
import { getDummyData } from './dummy-data';
import { Template } from '.';

interface TypeTemplateProps {
  onChange: Function;
  templateSelectType: any;
  activeTemplate: any;
}
const DefaultTemplate: React.FC<TypeTemplateProps> = (props: TypeTemplateProps) => {
  const { templateSelectType, activeTemplate } = props;

  //State
  let [listTemplate, setTemplate] = useState<Template[]>([]);

  //----------------------------------Get list data for Sample-----------------------------------

  let data: any = getDummyData(templateSelectType.value);
  //-----------------------------------------------------------------------------------------------------
  //filter template list
  useEffect(() => {
    if (data?.data) {
      let myTemplateInit: Template[] = [];
      data?.data.map((item: any) => {
        let tmp = { ...item };
        tmp.active = activeTemplate?.id === item.id;
        myTemplateInit.push(tmp);
      });
      setTemplate(myTemplateInit);
    }
  }, [templateSelectType.value, activeTemplate?.id]);

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
            return (
              <ImageItem
                item={item}
                key={item.id}
                onUpdate={(template: Template) => {}}
                onSelect={(template: Template) => handleOnChange(template)}
              />
            );
          })}
        </ImageList>
      </Grid>
    </Grid>
  );
};

export default DefaultTemplate;
