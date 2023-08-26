//third-party
import _ from 'lodash';

//menu
//import * as keyNames from '@competitor/config/keyNames';

export const finalizeParams = (configParams: any) => {
  const newParams = { ...configParams };

  //remove fields
  //delete newParams[keyNames.KEY_NAME_QUOTE_];

  return newParams;
};
