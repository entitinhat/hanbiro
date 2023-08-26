import React, { useState, useEffect } from 'react';

import { LabelValue } from '@base/types/app';
import { FilterInput } from '@base/types/common';
import * as keyNames from '@settings/template/config/key-names';

import { Grid, ImageList } from '@mui/material';

import { useMenuTemplates } from '@settings/template/hooks/useMenuTemplates';

import { optionGeneralTypeSelect, optionSMSypeSelect, optionTaskTypeSelect, Template } from '.';

//components
import ImageItem from './ImageItem';


interface TypeTemplateProps {
  type: string;
  onChange: Function;
  selectGroup: { key: string; value: number };
  templateType: LabelValue;
  subType?: LabelValue;
}
const TypeTemplate: React.FC<TypeTemplateProps> = (props: TypeTemplateProps) => {
  const { templateType, selectGroup, subType } = props;
  //State
  let [listTemplate, setTemplate] = useState<Template[]>([]);
  let [activeType, setActiveType] = useState<{ value: number; label: string; key: string }>({
    value: 0,
    label: 'All',
    key: 'ALL'
  });
  let [activeSubType, setActiveSubType] = useState<{ value: number; label: string; key: string }>(
    selectGroup.key === keyNames.KEY_MENU_TEMPLATE_SMS ? optionSMSypeSelect[0] : optionTaskTypeSelect[0]
  );

  //----------------------------------Get list data for Sample-----------------------------------

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
    query: `group=${selectGroup?.value}  sample=true`
  };
  let { data } = useMenuTemplates(filtersQuery, listQuerySchema);
  //-----------------------------------------------------------------------------------------------------


  //set value for template type select and subtype select
  useEffect(() => {
    const activeTemplateType = optionGeneralTypeSelect.find((_ele) => {
      return _ele.key === templateType?.value;
    });
    let activeSubtype;
    if (selectGroup.key === keyNames.KEY_MENU_TEMPLATE_SMS) {
      activeSubtype = optionSMSypeSelect.find((_ele) => {
        return _ele.value === subType?.value;
      });
    } else {
      activeSubtype = optionTaskTypeSelect.find((_ele) => {
        return _ele.value === subType?.value;
      });
    }
    if (activeTemplateType) setActiveType(activeTemplateType);
    if (activeSubtype) setActiveSubType(activeSubtype);
  }, [templateType, subType]);


  //filter template list
  useEffect(() => {
    if (data?.data) {
      let listTemplateInit: Template[] = [];
      data?.data.map((item: any, key) => {
        let tmp = { ...item };
        tmp.active = false;
        if (selectGroup.key === keyNames.KEY_MENU_TEMPLATE_SMS || selectGroup.key === keyNames.KEY_MENU_TEMPLATE_TASK) {
          if (activeType.value == 0 && item.subType === activeSubType.key) {
            listTemplateInit.push(tmp);
          } else if (item.type === activeType.key && item.subType === activeSubType.key) {
            listTemplateInit.push(tmp);
          }
        } else {
          if (activeType.value == 0) {
            listTemplateInit.push(tmp);
          } else if (item.type === activeType.key) {
            listTemplateInit.push(tmp);
          }
        }
      });
      setTemplate(listTemplateInit);
    }
  }, [data?.data, activeType, activeSubType]);

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
        <ImageList sx={{ overflow: 'visible' }}  cols={2} rowHeight={350}>
          {listTemplate.map((item) => {
            return <ImageItem item={item} key={item.id} onClick={() => handleOnChange(item)} />;
          })}
        </ImageList>
      </Grid>
    </Grid>
  );
};

export default TypeTemplate;
