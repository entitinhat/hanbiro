import _ from 'lodash';
import CommonViewField from '@base/containers/ViewField/Common';
import { CommonViewFieldProps } from '../Common/interface';

import View from './view';
import Edit from './edit';

interface ViewFieldProps extends CommonViewFieldProps {
  value: any;
  showTools?: boolean | false;
  iframHeight?: string | number;
  [x: string]: any;
}

const GrapesTSViewField = (props: ViewFieldProps) => {
  const { config } = props;
  console.log(`!!!~ config`, config);

  let viewProps = _.cloneDeep(config?.componentProps);
  let newConfig = _.cloneDeep(config);
  if (newConfig) {
    newConfig.viewProps = viewProps;
  }
  console.log(`!!!~ newConfig`, newConfig);
  return <CommonViewField {...props} config={newConfig} componentView={View} componentEdit={Edit} />;
};

export default GrapesTSViewField;
