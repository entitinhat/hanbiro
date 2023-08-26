import {
  ACTIVITY_MENU_CALL,
  ACTIVITY_MENU_EMAIL,
  ACTIVITY_MENU_SMS,
  ACTIVITY_MENU_TASK,
  ACTIVITY_MENU_TICKET
} from '@activity/config/constants';
import { LabelValue } from '@base/types/app';
import React, { useCallback, useState } from 'react';
import { Autocomplete, Grid } from '@mui/material';
import AutoCompleteCustom from '../Autocomplete';
import TicketAutoComplete from '@desk/ticket/containers/TicketAutoComplete';
import ActivityAutoComplete from '@activity/containers/ActivityAutoComplete';
import { Ticket } from '@desk/ticket/types/ticket';
import Items from './Items';
import _ from 'lodash';

export interface TicketStatus {
  keyName: string;
  languageKey: string;
}
const RelatedToOptions: LabelValue[] = [
  {
    label: 'Ticket',
    value: ACTIVITY_MENU_TICKET,
    extra: 'TYPE_TICKET'
  },
  {
    label: 'Call',
    value: ACTIVITY_MENU_CALL,
    extra: 'TYPE_CALL'
  },
  {
    label: 'Email',
    value: ACTIVITY_MENU_EMAIL,
    extra: 'TYPE_EMAIL'
  },
  {
    label: 'SMS',
    value: ACTIVITY_MENU_SMS,
    extra: 'TYPE_SMS'
  },
  {
    label: 'Task',
    value: ACTIVITY_MENU_TASK,
    extra: 'TYPE_TASK'
  }
];

interface RelatedValue {
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
}

function RelatedTo(props: RelatedToProps) {
  const { value: items, onChange, onAdd, onDelete, mode = 'write' } = props;
  const [option, setOption] = useState(RelatedToOptions[0]);
  const onChangeOption = useCallback((val: LabelValue) => {
    setOption(val);
  }, []);

  const onChangeRelated = useCallback(
    (val: Ticket | any) => {
      // console.log(val);
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
    },
    [items, option]
  );

  const onChangeTicketRelated = useCallback(
    (listVal: any) => {
      // console.log(val);
      // find if there is same ticket in items.
      const val = _.isArray(listVal) ? listVal[listVal.length - 1] : listVal;
      const found = items.findIndex((_v) => _v.type == option.extra || _v.id == val.id) != -1;
      if (found) return;
      const item = {
        type: option.extra,
        id: val.id,
        name: val.subject
      };
      onChange && onChange([...items, item]);
      onAdd && onAdd(item);
    },
    [items, option]
  );

  const handleDelete = useCallback(
    (val: string) => {
      onChange && onChange(items.filter((item) => item.id !== val));
      onDelete && onDelete(val);
    },
    [items]
  );

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Items items={items} onDelete={handleDelete} relatedToOptions={RelatedToOptions} />
        </Grid>
      </Grid>
      <Grid container spacing={1} alignItems="center" justifyItems="center">
        <Grid item xs={4}>
          <AutoCompleteCustom options={RelatedToOptions} disableClearable onChange={(val: LabelValue) => onChangeOption(val)} />
        </Grid>
        <Grid item xs={8}>
          {option.value == ACTIVITY_MENU_TICKET ? (
            <TicketAutoComplete single onChange={(val) => onChangeTicketRelated(val)} minWidth="auto" />
          ) : (
            <ActivityAutoComplete
              single={true}
              type={option.extra}
              minWidth="auto"
              // iconIndicator={option.value as string}
              // popupIcon={{Icon(type.value as string)}}
              onChange={(val) => onChangeRelated(val)}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default RelatedTo;
