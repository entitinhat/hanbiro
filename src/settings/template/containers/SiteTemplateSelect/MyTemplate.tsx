import React, { useState, memo, useEffect } from 'react';

import { Grid, ImageList } from '@mui/material';

import { optionGeneralTypeSelect, optionSMSypeSelect, optionTaskTypeSelect, Template } from '.';
import * as keyNames from '@settings/template/config/key-names';
import { LabelValue } from '@base/types/app';

//components
import ImageItem from './ImageItem';

interface MyTemplateProps {
  listTemplate: Template[];
  setTemplate: Function;
  onChange: Function;
  selectGroup: { key: string; value: number };
  templateType: LabelValue;
  subType?: LabelValue;
}

const MyTemplate: React.FC<MyTemplateProps> = (props: MyTemplateProps) => {
  const { listTemplate, selectGroup, onChange, templateType, subType } = props;
  let [listTemplateView, setTemplate] = useState<Template[]>(listTemplate);
  let [activeType, setActiveType] = useState<{ value: number; label: string; key: string }>({
    value: 0,
    label: 'All',
    key: 'ALL'
  });
  let [activeSubType, setActiveSubType] = useState<{ value: number; label: string; key: string }>(
    selectGroup?.key === keyNames.KEY_MENU_TEMPLATE_SMS ? optionSMSypeSelect[0] : optionTaskTypeSelect[0]
  );

  //filter template list
  useEffect(() => {
    if (listTemplate) {
      let listTemplateInit: Template[] = [];
      listTemplate.map((item, key) => {
        let tmp = { ...item };
        tmp.active = false;
        if (key == 0) listTemplateInit.push(tmp);
        else {
          if (selectGroup?.key === keyNames.KEY_MENU_TEMPLATE_SMS || selectGroup?.key === keyNames.KEY_MENU_TEMPLATE_TASK) {
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
        }
      });
      setTemplate(listTemplateInit);
    }
  }, [listTemplate, activeType, activeSubType]);

  //set value for template type select and subtype select
  useEffect(() => {
    const activeTemplateType = optionGeneralTypeSelect.find((_ele) => {
      return _ele.key === templateType?.value;
    });

    let activeSubtype;
    if (selectGroup?.key === keyNames.KEY_MENU_TEMPLATE_SMS) {
      activeSubtype = optionSMSypeSelect.find((_ele) => {
        return _ele.key === subType?.value;
      });
    } else {
      activeSubtype = optionTaskTypeSelect.find((_ele) => {
        return _ele.key === subType?.value;
      });
    }

    if (activeTemplateType) setActiveType(activeTemplateType);
    if (activeSubtype) setActiveSubType(activeSubtype);
  }, [templateType, subType]);

  const handleOnChange = (itemActive: Template) => {
    let listTemplateNew: Template[] = [];

    listTemplateView.map((item, key) => {
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

  const getMyTemplate = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ImageList sx={{ overflow: 'visible' }} cols={2} rowHeight={350}>
            {listTemplateView.map((item) => {
              return <ImageItem item={item} key={item.id} onClick={() => handleOnChange(item)} />;
            })}
          </ImageList>
        </Grid>
      </Grid>
    );
  };

  return getMyTemplate();
};

export default memo(MyTemplate);
