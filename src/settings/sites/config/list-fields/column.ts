import { ColorNameIconConfig } from '../../desk/types/interface';
import { SITE_STAGE_ACTIVE, SITE_STAGE_INACTIVE, SITE_STAGE_NONE, SITE_STAGE_PREPARE } from '../constants';

export const statusConfigs: ColorNameIconConfig = {
  [SITE_STAGE_NONE]: {
    color: 'error',
    name: 'None'
  },
  [SITE_STAGE_ACTIVE]: {
    color: 'success',
    name: 'Active'
  },
  [SITE_STAGE_PREPARE]: {
    color: 'info',
    name: 'Prepare'
  },
  [SITE_STAGE_INACTIVE]: {
    color: 'secondary',
    name: 'Inactive'
  }
};

export const typeConfigs: ColorNameIconConfig = {
  desk: {
    icon: 'desk',
    color: 'primary',
    name: 'Desk'
  }
};
