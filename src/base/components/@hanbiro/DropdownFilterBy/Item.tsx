import { useState, Suspense, useMemo } from 'react';
import _, { isFunction } from 'lodash';
import { LabelValueData } from '@base/types/app';
import { FilterByOption } from '@base/types/common';

import { ListItemButton, ListItemText, ListItem, Collapse, TextField, IconButton, Typography, FormControl } from '@mui/material';
import { ExpandLess, ExpandMore, ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
// import { RightOutlined, UpOutlined } from '@ant-design/icons';

// export interface LabelValueIcon {
//   label: string;
//   value: string;
//   icon?: ReactElement;
// }

export interface DropdownProps {
  item: FilterByOption;
  onChange?: (nValue: LabelValueData) => void;
  defaultVal: any;
}

const FilterItem = (props: DropdownProps) => {
  const { item, onChange, defaultVal } = props;
  const [open, setOpen] = useState(typeof defaultVal != 'undefined' ? true : false);

  const { t } = useTranslation();

  //value change
  //component: custom or TextField
  const handleValueChange = (item: any, eventValue: any) => {
    //console.log('eventValue', eventValue);
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
    console.log('filter item data~~~~', itemData);
    onChange && onChange(itemData);
  };

  //render component
  const renderComponent = (item: any) => {
    const RenderComponent = item.component ?? null;
    //console.log('>>>>>>>>>. defaultVal', defaultVal);

    return (
      <>
        {RenderComponent ? (
          <Suspense fallback={<></>}>
            <RenderComponent
              {...(item?.componentProps ?? {})}
              onChange={(value: any) => handleValueChange(item, value)}
              value={isFunction(item?.setValue) ? item?.setValue(defaultVal) : defaultVal || ''}
            />
          </Suspense>
        ) : (
          <TextField
            //placeholder="..."
            //sx={{}}
            fullWidth={true}
            autoComplete="off"
          />
        )}
      </>
    );
  };

  // const ItemRender = useMemo(() => {
  //   return (
  //     <>
  //       <ListItem disablePadding>
  //         <ListItemButton>
  //           <ListItemText primary={<Typography color="textPrimary">{item.label}</Typography>} />
  //           <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)} color="secondary">
  //             {open ? <UpOutlined /> : <RightOutlined />}
  //           </IconButton>
  //         </ListItemButton>
  //       </ListItem>
  //       <Collapse in={open} timeout={50} unmountOnExit sx={{ padding: '5px' }}>
  //         {renderComponent(item)}
  //       </Collapse>
  //     </>
  //   );
  // }, [open]);

  // return ItemRender;

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton sx={{ height: 36 }} onClick={() => setOpen(!open)}>
          <ListItemText primary={<Typography color="textPrimary">{t(item.label)}</Typography>} />
          {/* {open ? <ExpandLess color="secondary" fontSize="small" /> : <ExpandMore color="secondary" fontSize="small" />} */}
          {/* <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)} color="secondary">
            {open ? <ExpandLess /> : <ExpandMore />}
          </IconButton> */}
          {open ? <ArrowDropUp color="secondary" fontSize="small" /> : <ArrowDropDown color="secondary" fontSize="small" />}
        </ListItemButton>
      </ListItem>
      <Collapse in={open} timeout={50} unmountOnExit sx={{ padding: '5px 10px' }}>
        {renderComponent(item)}
      </Collapse>
    </>
  );
};

export default FilterItem;
