import { UserOrCustomer } from '@activity/types/activity';
import { RelatedValue } from '@base/components/@hanbiro/RelatedTo/interface';
import { Stack, Chip, Typography, Tooltip, SvgIcon } from '@mui/material';
import { isArray } from 'lodash';
import Icon from '@base/assets/icons/svg-icons';
import { LabelValue } from '@base/types/app';
import {
  ACTIVITY_MENU_CALL,
  ACTIVITY_MENU_EMAIL,
  ACTIVITY_MENU_SMS,
  ACTIVITY_MENU_TASK,
  ACTIVITY_MENU_TICKET
} from '@activity/config/constants';

interface ViewProps {
  value: RelatedValue[];
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
function RelatedWorkView(props: ViewProps) {
  const { value } = props;

  return (
    <Stack direction={'row'} spacing={0.5}>
      {value?.length > 0 &&
        isArray(value) &&
        value.map((item: UserOrCustomer, index: number) => {
          const type = RelatedToOptions.find((_v) => _v.extra == item.type)!!;

          return (
            <Stack key={index} direction="row" spacing={0.5} alignItems="center">
              <Tooltip title={type.label}>
                <SvgIcon fontSize="small" sx={{ mt: 0.8 }}>
                  {Icon(type.value as string)}
                </SvgIcon>
              </Tooltip>
              <Typography color="primary">{item.name}</Typography>
            </Stack>
          );
        })}
    </Stack>
  );
}

export default RelatedWorkView;
