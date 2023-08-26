import { Suspense } from 'react';
import _, { isFunction } from 'lodash';
import { LabelValueData } from '@base/types/app';
import { FilterByOption } from '@base/types/common';

import { ListItemButton, ListItemText, ListItem, Collapse, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export interface DropdownProps {
  item: FilterByOption;
  onChange?: (nValue: LabelValueData) => void;
  defaultVal: any;
}

const BulkUpdateItem = (props: DropdownProps) => {
  const { item, onChange, defaultVal } = props;

  const { t } =  useTranslation();

  //value change
  //component: custom or TextField
  const handleValueChange = (item: any, eventValue: any) => {
    let newData = '';
    if (eventValue?.target) {
      newData = eventValue.target.value;
    } else {
      newData = isFunction(item?.getValue) ? item.getValue(eventValue) : eventValue;
    }
    let itemData: LabelValueData = {
      label: item.label,
      value: item.value,
      data: newData,
      extra: eventValue?.target ? { id: newData, name: newData } : eventValue
    };
    onChange && onChange(itemData);
  };

  //render component
  const renderComponent = (item: any) => {
    const RenderComponent = item.component ?? null;

    return (RenderComponent ? (
          <Suspense fallback={<></>}>
            <RenderComponent
              {...(item?.componentProps ?? {})}
              onChange={(value: any) => handleValueChange(item, value)}
              value={isFunction(item?.setValue) ? item?.setValue(defaultVal) : defaultVal || ''}
            />
          </Suspense>
        ) : (
          <TextField fullWidth={true} autoComplete="off" />
        ));
  };

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton sx={{ height: 36 }} >
          <ListItemText primary={<Typography color="textPrimary">{t(item.label)}</Typography>} />
        </ListItemButton>
      </ListItem>
      <Collapse in={true} timeout={50} unmountOnExit sx={{ padding: '5px' }}>
        {renderComponent(item)}
      </Collapse>
    </>
  );
};

export default BulkUpdateItem;
