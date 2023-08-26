import { CommonEditProps } from '@base/containers/ViewField/Common/interface';
import ProductCategory, { ValueProps } from '@desk/ticket/containers/ProductCategory';

interface EditProps extends CommonEditProps {
  value: ValueProps | null;
  onChange: (nValue: ValueProps) => void;
  componentProps?: {
    [x: string]: any;
  };
}

const Edit = (props: EditProps) => {
  const { value, onChange, componentProps } = props;
  return <ProductCategory row hideCategoryLabel hideProductLabel isPublic={false} value={value} onChange={onChange} />;
};

export default Edit;
