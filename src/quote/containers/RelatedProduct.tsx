import React, { useState, useEffect } from 'react';

//project
import useMutationPost from '@base/hooks/useMutationPost';
import { BaseMutationResponse } from '@base/types/response';

//menu
import { UPDATE_CUSTOMER } from '@customer/services/graphql';
import { useCustomerRelatedProducts } from '@customer/hooks/useCustomerRelatedProducts';

//related menu
import AssignProductsContainer from '@product/product/containers/AssignProductsContainer';

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
  //const { data: customerPost, isLoading } = useCustomerRelatedProducts(menuSourceId);
  //console.log('customerPost', customerPost);

  useEffect(() => {
    // if (customerPost?.relatedProducts) {
    //   //setProducts(customerPost.relatedProducts);
    // } else {
    //   //setProducts([]);
    // }
  }, []); //customerPost

  //mutation
  const mUpdate: any = useMutationPost<BaseMutationResponse>(UPDATE_CUSTOMER, 'customer_updateCustomer', {
    onSuccess: (data: any, variables: any, context: any) => {
      //// console.log('after save', context);
      //toast.success('Create sales order successfully!');
    },
    onError: (error: any, variables: any, context: any) => {
      // An error happened!
      //toast.error('There is an error during processing: ' + JSON.parse(error).message);
    }
  });

  //check success
  useEffect(() => {
    if (mUpdate.isSuccess) {
      //console.log('mUpdate.variables', mUpdate.variables);
      //const newItems = mUpdate.variables.customer.relatedProducts;
      //setProducts(newItems);
    }
  }, [mUpdate.isSuccess]);

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
      mUpdate.mutate(params);
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
    mUpdate.mutate(params);
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
