import commonConfigs from '@base/config/list-field/columns';
import { deletedMarketingList } from './customerColumns';

export const listLayoutColumns: { [index: string]: any[] } = {
  deletedMarketingList: deletedMarketingList
};

export const configFields = {
  ...commonConfigs
};
