
import { ColorNameIconConfig } from '@activity/types/interface';
import { TEMPLATE_STAGE_ACTIVE, TEMPLATE_STAGE_INACTIVE, TEMPLATE_STAGE_NONE, TEMPLATE_STAGE_PREPARE } from '../constants';

export const statusConfigs: ColorNameIconConfig = {
  [TEMPLATE_STAGE_NONE]: {
    color: 'error',
    name: 'None'
  },
  [TEMPLATE_STAGE_ACTIVE]: {
    color: 'success',
    name: 'Active'
  },
  [TEMPLATE_STAGE_PREPARE]: {
    color: 'info',
    name: 'Prepare'
  },
  [TEMPLATE_STAGE_INACTIVE]: {
    color: 'secondary',
    name: 'Inactive'
  }
};

export const typeConfigs: ColorNameIconConfig = {
  'template': {
    icon: 'preview_template',
    color: 'secondary',
    name: 'Template'
  },
  'task':{
    icon: 'task',
    color: 'primary',
    name: 'Task Type'
  },
  'sms':{
    icon: 'sms',
    color: 'primary',
    name: 'Message Type'
  }
};
