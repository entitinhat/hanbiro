import SpanLang from '@base/components/@hanbiro/SpanLang';
import { ProductQuickView } from '@base/containers/QuickView';
import { CommonViewProps } from '@base/containers/ViewField/Common/interface';
import { IdName } from '@base/types/common';

interface Props extends CommonViewProps {
  value: IdName[] | IdName;
}

const View = (props: Props) => {
  const { value } = props;
  return <>{value ? <ProductQuickView value={value} /> : ''}</>;
};

export default View;
