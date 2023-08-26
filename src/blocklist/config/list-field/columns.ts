import commonConfigs from '@base/config/list-field/columns';
import { deletedCustomer } from './customerColumns';
import { allBlocks, myBlockList, myGroupBlockList, blockListperCampaign, blockListperCustomer } from './blockListColumns';

export const listLayoutColumns: { [index: string]: any[] } = {
  deletedCustomer: deletedCustomer,
  allBlocks,
  myBlockList,
  myGroupBlockList,
  blockListperCampaign,
  blockListperCustomer
};

export const configFields = {
  ...commonConfigs
};
