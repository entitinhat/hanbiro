import { Chip, FormControl, Grid, IconButton, MenuItem, Select, SelectChangeEvent, Tooltip } from '@mui/material';
import {
  ACTIVITY_MENU_CALL,
  ACTIVITY_MENU_EMAIL,
  ACTIVITY_MENU_SMS,
  ACTIVITY_MENU_TASK,
  ACTIVITY_MENU_TICKET
} from '@activity/config/constants';
import { LabelValue } from '@base/types/app';
import React, { useState } from 'react';
import Icon from '@base/assets/icons/svg-icons';
import { Clear } from '@mui/icons-material';
import TicketAutoComplete from '@desk/ticket/containers/TicketAutoComplete';
import { Ticket } from '@desk/ticket/types/ticket';
import ActivityAutoComplete from '../ActivityAutoComplete';
import { Activity } from '@activity/types/activity';
import { useTranslation } from 'react-i18next';

const RelatedToOptions: LabelValue[] = [
  {
    label: 'ncrm_activity_ticket',
    value: ACTIVITY_MENU_TICKET,
    extra: 'TYPE_TICKET'
  },
  {
    label: 'ncrm_activity_call',
    value: ACTIVITY_MENU_CALL,
    extra: 'TYPE_CALL'
  },
  {
    label: 'ncrm_activity_email',
    value: ACTIVITY_MENU_EMAIL,
    extra: 'TYPE_EMAIL'
  },
  {
    label: 'ncrm_activity_sms',
    value: ACTIVITY_MENU_SMS,
    extra: 'TYPE_SMS'
  },
  {
    label: 'ncrm_activity_task',
    value: ACTIVITY_MENU_TASK,
    extra: 'TYPE_TASK'
  }
];

export interface RelatedValue {
  type: string;
  id: string;
  name: string;
}

interface RelatedToProps {
  value: RelatedValue[];
  onChange?: (val: RelatedValue[]) => void;
  onAdd?: (val: RelatedValue) => void;
  onDelete?: (val: string) => void;
  mode?: 'write' | 'view';
  minWidth?: number | string;
}

const RelatedItem = (props: RelatedToProps) => {
  const { value: items, onChange, onAdd, onDelete, mode = 'write', minWidth = 300 } = props;
  const [option, setOption] = useState<LabelValue>(RelatedToOptions[0]);
  const { t } = useTranslation();

  //change value
  const onChangeRelated = (val: Ticket | Activity | null) => {
    // console.log(val);
    if (val) {
      // find if there is same ticket in items.
      const found = items.findIndex((_v) => _v.type == option.extra || _v.id == val.id) != -1;
      if (found) return;
      const item = {
        type: option.extra,
        id: val.id,
        name: val.subject
      };
      onChange && onChange([...items, item]);
      onAdd && onAdd(item);
    }
  };

  //remove
  const deleteItem = (val: string) => {
    onChange && onChange(items.filter((item) => item.id !== val));
    onDelete && onDelete(val);
  };

  return (
    <Grid container>
      <Grid item xs={12} lg={12} sx={{ mb: 1 }}>
        {items?.map((item) => {
          const type = RelatedToOptions.find((_v) => _v.extra == item.type)!!;
          return (
            <Chip
              key={item.id}
              sx={{ mr: 1, '& .MuiChip-avatar': { width: '18px', height: '18px' } }}
              label={item.name}
              avatar={Icon(type.value as string)}
              onDelete={() => deleteItem(item.id)}
            />
          );
        })}
      </Grid>
      <Grid item xs={12} lg={12}>
        <Grid container spacing={1}>
          <Grid item xs={12} lg={3}>
            <FormControl fullWidth>
              <Select
                displayEmpty
                inputProps={{ 'aria-label': 'related type select' }}
                value={option.value.toString()}
                onChange={(event: SelectChangeEvent) => {
                  const selectedValue = event.target.value as string;
                  const newOption = RelatedToOptions.find((_ele: any) => _ele.value === selectedValue);
                  if (newOption !== undefined) {
                    setOption(newOption);
                  }
                }}
              >
                {RelatedToOptions.map((_option: any) => {
                  return (
                    <MenuItem
                      key={_option.value}
                      value={_option.value}
                      //style={{ fontWeight: theme.typography.fontWeightRegular }}
                    >
                      {t(_option.label)}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} lg={9}>
            {option.value == ACTIVITY_MENU_TICKET ? (
              <TicketAutoComplete
                single={true}
                visible={false}
                value={null}
                onChange={(val: Ticket | Ticket[] | null) => onChangeRelated(val as Ticket)}
                minWidth={minWidth}
              />
            ) : (
              <ActivityAutoComplete
                single={true}
                visible={false}
                value={null}
                type={option.extra}
                // iconIndicator={option.value as string}
                onChange={(val: Activity | Activity[] | null) => onChangeRelated(val as Activity)}
                minWidth={minWidth}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RelatedItem;
