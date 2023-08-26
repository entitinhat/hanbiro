import dayjs from 'dayjs';
// import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import React, { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';

// import { RightOutlined, UpOutlined } from '@ant-design/icons';
import DatePicker from '@base/components/@hanbiro/Date/DatePicker';
import { LabelValueData } from '@base/types/app';
import { Collapse, IconButton, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { Check, ExpandLess, ExpandMore, ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

export interface LabelValueIcon {
  label: string;
  value: string;
  icon?: ReactElement;
}

const fields: LabelValueData[] = [
  {
    label: 'ncrm_common_dateby_thisyear',
    value: 'year',
    data: { start: dayjs().startOf('year').format(), end: dayjs().endOf('year').format() }
  },
  {
    label: 'ncrm_common_dateby_thisquarter',
    value: 'quarter',
    data: { start: dayjs().startOf('quarter').format(), end: dayjs().endOf('quarter').format() }
  },
  {
    label: 'ncrm_common_dateby_thismonth',
    value: 'month',
    data: { start: dayjs().startOf('month').format(), end: dayjs().endOf('month').format() }
  },
  {
    label: 'ncrm_common_dateby_thisweek',
    value: 'week',
    data: { start: dayjs().startOf('week').format(), end: dayjs().endOf('week').format() }
  },
  {
    label: 'ncrm_common_dateby_today',
    value: 'today',
    data: { start: dayjs().startOf('day').format(), end: dayjs().endOf('day').format() }
  },
  {
    label: 'ncrm_common_dateby_custom',
    value: 'custom'
    //data: { start: new Date().setDate(new Date().getDate() - 3), end: new Date().setDate(new Date().getDate() + 3) }
  }
];

export interface DropdownProps {
  item: LabelValueData;
  defaultVal?: any; // = item.data
  onChange?: (nValue: LabelValueData) => void;
}

const DateItem = (props: DropdownProps) => {
  const { item, defaultVal, onChange } = props;
  console.log('>>>>>>>>> defaultVal', defaultVal);

  //state
  const [startDate, setStartDate] = useState<any>(new Date());
  const [endDate, setEndDate] = useState<any>(new Date());
  const [open, setOpen] = useState(defaultVal !== undefined ? true : false);

  const { t } = useTranslation();
  //init date when there is custom in defaultVal
  useEffect(() => {
    if (defaultVal) {
      if (defaultVal.extra.value === 'custom') {
        if (!_.isEqual(defaultVal.data.start, startDate)) {
          setStartDate(defaultVal.data.start);
        }
        if (!_.isEqual(defaultVal.data.end, endDate)) {
          setEndDate(defaultVal.data.end);
        }
      }
    }
  }, [defaultVal]);

  /** ======================== HANDLE EVENT ========================================== */

  //date option selected
  const handleListItemClick = (dateOption: LabelValueData) => {
    let newSelected: LabelValueData = {
      ...item,
      data: { start: dateOption.data.start, end: dateOption.data.end },
      extra: dateOption
    };
    onChange && onChange(newSelected);
  };

  //custom option date change
  const handleStartChange = (dateOption: LabelValueData | undefined, date: Date) => {
    setStartDate(date);
    //callback
    if (onChange) {
      let newSelected: LabelValueData = {
        ...item,
        data: { start: dayjs(date).format(), end: dayjs(endDate).format() },
        extra: dateOption
      };
      setTimeout(() => {
        onChange(newSelected);
      }, 500);
    }
  };

  //custom option date change
  const handleEndChange = (dateOption: LabelValueData | undefined, date: Date) => {
    setEndDate(date);
    //callback
    if (onChange) {
      let newSelected: LabelValueData = {
        ...item,
        data: { start: dayjs(startDate).format(), end: dayjs(date).format() },
        extra: dateOption
      };
      setTimeout(() => {
        onChange(newSelected);
      }, 500);
    }
  };

  //render a date by
  const ItemRender = useMemo(() => {
    const customField = fields.find((_ele: LabelValueData) => _ele.value === 'custom');
    return (
      <>
        <ListItem disablePadding>
          <ListItemButton sx={{ height: 36 }} onClick={() => setOpen(!open)}>
            <ListItemText primary={<Typography color="textPrimary">{t(item.label)}</Typography>} />
            {/* {open ? <ExpandLess color="secondary" fontSize="small" /> : <ExpandMore color="secondary" fontSize="small" />} */}
            {/* <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)} color="secondary">
              {open ? <UpOutlined /> : <RightOutlined />}
            </IconButton> */}
            {open ? <ArrowDropUp color="secondary" fontSize="small" /> : <ArrowDropDown color="secondary" fontSize="small" />}
          </ListItemButton>
        </ListItem>
        <Collapse in={open === true} timeout={50} unmountOnExit>
          <List component="div" disablePadding>
            {fields?.map((row: LabelValueData) => {
              return (
                <ListItem
                  disablePadding
                  key={row.value}
                  sx={{
                    '& .MuiListItemButton-root': {
                      backgroundColor: `${row.value === defaultVal?.extra?.value && 'primary.lighter'}`
                    }
                  }}
                >
                  <ListItemButton
                    sx={{
                      pl: 3,
                      height: 36
                    }}
                    onClick={() => row.value !== 'custom' && handleListItemClick(row)}
                  >
                    <ListItemText
                      primary={
                        <Typography color={row.value === defaultVal?.extra?.value ? 'primary' : 'textPrimary'}>{t(row.label)}</Typography>
                      }
                    />
                    {/* <ListItemText primary={t(row.label)} /> */}
                    {/* {row.value === defaultVal?.extra?.value && <Check color="success" fontSize="small" />} */}
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
          {/* custom option */}
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 2 }}>
              <DatePicker
                size="small"
                value={startDate}
                onChange={(date) => {
                  handleStartChange(customField, date ? date : new Date());
                }}
              />
            </ListItemButton>
            <ListItemButton sx={{ pl: 2 }}>
              <DatePicker
                size="small"
                value={endDate}
                onChange={(date) => {
                  handleEndChange(customField, date ? date : new Date());
                }}
              />
            </ListItemButton>
          </List>
        </Collapse>
      </>
    );
  }, [open, item, defaultVal, startDate, endDate]);

  return ItemRender;
};

export default DateItem;
