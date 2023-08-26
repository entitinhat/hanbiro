import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { IdName } from '@base/types/common';
import ProductAutoComplete from '@product/product/containers/ProductAutoComplete';

import Products from './Products';

interface AssignProductsContainerProps {
  placement?: string;
  items: IdName[];
  onDelete?: any;
  onAssign?: any;
}

/**
 *
 * @param {*} props
 * @returns
 */
const AssignProductsContainer = (props: AssignProductsContainerProps) => {
  const { placement = 'right', items, onDelete, onAssign } = props;
  // console.log('AssignProductsContainer', items);

  //lang
  const { t } = useTranslation();

  //state
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [deletedItem, setDeletedItem] = useState<any>(null);

  //delete confirm
  const handleDelete = (item: any) => {
    setIsDeleting(true);
    setDeletedItem(item);
    onDelete(item, () => {
      setDeletedItem(null);
      setIsDeleting(false);
    });
  };

  return (
    <>
      <Products items={items} onDelete={handleDelete} />
      <ProductAutoComplete single={true} onChange={onAssign} />
    </>
  );
};

export default AssignProductsContainer;
