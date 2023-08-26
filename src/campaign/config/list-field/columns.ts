import commonConfigs from '@base/config/list-field/columns';
import { deletedCampaign } from './campaignColumns';

export const listLayoutColumns: { [index: string]: any[] } = {
  deletedCampaign
};

export const configFields = {
  ...commonConfigs
};
