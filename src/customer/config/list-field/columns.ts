import commonConfigs from '@base/config/list-field/columns';
import { deletedCustomer } from './customerColumns';

export const listLayoutColumns: { [index: string]: any[] } = {
  deletedCustomer: deletedCustomer
};

export const configFields = {
  ...commonConfigs
};
