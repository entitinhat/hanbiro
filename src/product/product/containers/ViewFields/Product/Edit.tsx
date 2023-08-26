import { CommonEditProps } from '@base/containers/ViewField/Common/interface';
import { IdName } from '@base/types/common';
import ProductAutoComplete from '@product/product/containers/ProductAutoComplete';
import { Product } from '@product/product/types/product';

interface EditProps extends CommonEditProps {
  value: IdName;
  onChange: (val: Product | Product[] | null) => void;
}

const Edit = (props: EditProps) => {
  console.log(props)
  const { value, onChange, componentProps } = props;

  return <ProductAutoComplete value={value} onChange={onChange} {...componentProps} />;
};

export default Edit;
