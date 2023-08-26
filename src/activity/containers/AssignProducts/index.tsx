import _ from 'lodash';
import AssignProductsContainer from '@product/product/containers/AssignProductsContainer';
import { useAssignedProducts } from '@activity/hooks/useAssignedProducts';
import useAssignProductMutate from '@activity/hooks/useAssignProductMutation';

// import AssignProductMutate from './mutate';

interface AssignProductsProps {
  menuSource?: string;
  menuSourceId: string;
  placement?: string;
}

function AssignProducts(props: AssignProductsProps) {
  const { placement, menuSourceId } = props;
  const { data } = useAssignedProducts(menuSourceId);

  const { mAddProduct, mDeleteProduct } = useAssignProductMutate();

  const onAssignProduct = (item: any) => {
    if (_.isEmpty(item)) return;

    const is = data?.results && data?.results?.findIndex((v) => v?.id == item.id) != -1;
    if (is) return;

    const params = {
      product: {
        id: item.id,
        name: item.name
      },
      id: menuSourceId
    };
    mAddProduct.mutate(params);
  };

  const onDeleteProduct = (item: any) => {
    const params = {
      id: menuSourceId,
      refId: item.id
    };
    mDeleteProduct.mutate(params);
  };

  return (
    <AssignProductsContainer
      items={data?.results ?? []}
      placement={placement}
      // isLoading={isLoading}
      onAssign={onAssignProduct}
      onDelete={onDeleteProduct}
    />
  );
}

AssignProducts.defaultProps = {
  placement: 'right',
  menuSourceId: ''
};

export default AssignProducts;
