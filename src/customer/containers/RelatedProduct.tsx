import React, { useState, useEffect } from 'react';

//related-menu
import AssignProductsContainer from '@product/product/containers/AssignProductsContainer';

//menu
import {
  useCustomerAddRelatedProduct,
  useCustomerDeleteRelatedProduct,
  useCustomerRelatedProducts
} from '@customer/hooks/useCustomerRelatedProducts';

const LIMIT = 100;

interface RelatedProductProps {
  menuSource?: string;
  menuSourceId: string;
}

/**
 *
 * @param {*} props
 * @returns
 */
const RelatedProduct = (props: RelatedProductProps) => {
  const { menuSource, menuSourceId } = props;
  //state
  const [products, setProducts] = useState<any>([]);

  //get customer related products
  const { data: customerPost, isLoading } = useCustomerRelatedProducts(menuSourceId);
  const mAdd = useCustomerAddRelatedProduct(menuSourceId);
  const mDelete = useCustomerDeleteRelatedProduct(menuSourceId);
  //console.log('customerPost', customerPost);

  useEffect(() => {
    if (customerPost?.relatedProducts) {
      const newItems = customerPost.relatedProducts.filter((_ele: any) => _ele !== null);
      setProducts(newItems);
    } else {
      //setProducts([]);
    }
  }, [customerPost]);

  //add new assign
  const handleCreateAssign = (item: any) => {
    if (item) {
      //check exist before add
      const foundIdx = products.findIndex((_ele: any) => _ele.id === item.id);
      if (foundIdx > -1) return;

      const params: any = {
        customer: {
          id: menuSourceId,
          relatedProducts: [
            ...products.map((_ele: any) => ({ id: _ele.id, name: _ele.name })),
            {
              id: item.id,
              name: item.name
            }
          ]
        }
      };
      mAdd.mutate(params);
    }
  };

  //delete customer contact
  const handleDeleteAssign = (item: any, cb: any) => {
    const newItems = products.filter((_ele: any) => _ele.id !== item.id);
    const params: any = {
      customer: {
        id: menuSourceId,
        relatedProducts: [...newItems.map((_ele: any) => ({ id: _ele.id, name: _ele.name }))]
      }
    };
    mDelete.mutate(params);
  };

  return (
    <AssignProductsContainer
      items={products || []}
      //isLoading={isLoading || mUpdate.isLoading}
      onAssign={handleCreateAssign}
      onDelete={handleDeleteAssign}
    />
  );
};

export default RelatedProduct;
