import CommonViewField from '@base/containers/ViewField/Common';
import { CommonViewFieldProps } from '@base/containers/ViewField/Common/interface';

import Edit from './Edit';
import View from './View';
import QuickView from './QuickView';

interface ProductProps extends CommonViewFieldProps {}

const ProductViewField = (props: ProductProps) => {
  const { config } = props;
  const viewProps = config?.viewProps;
  return <CommonViewField {...props} componentView={viewProps?.quickView ? QuickView : View} componentEdit={Edit} />;
};

export default ProductViewField;
