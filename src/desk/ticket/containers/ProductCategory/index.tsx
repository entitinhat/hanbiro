import { Box, Stack, Typography } from '@mui/material';
import ProductAutoComplete from '@product/product/containers/ProductAutoComplete';
import { Product } from '@product/product/types/product';
import { TicketCategory } from '@settings/preferences/types/desk/ticketCategory';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CategorySelect from '../CategorySelect';

export interface ValueProps {
  category: TicketCategory | null;
  product: Product | null;
}

interface ProductCategoryProps {
  hideProductLabel?: boolean;
  hideCategoryLabel?: boolean;
  isPublic?: boolean;
  token?: string;
  value?: ValueProps | null;
  onChange?: (value: ValueProps) => void;
  row?: boolean;
  filterToolbarAction?: boolean; // Check is filter toolbar checked action
}

const ProductCategory: React.FC<ProductCategoryProps> = (props) => {
  const {
    isPublic = false,
    token,
    hideProductLabel = false,
    hideCategoryLabel = false,
    value,
    onChange,
    row,
    filterToolbarAction = false
  } = props;

  //state
  const [curProduct, setCurProduct] = useState<Product | null>(null);
  const [curCategory, setCurCategory] = useState<TicketCategory | null>(null);
  const { t } = useTranslation();
  //initial value
  useEffect(() => {
    if (value) {
      if (value?.product) {
        if (value.product?.id !== curProduct?.id) {
          let product = { ...value.product, label: value.product.name };
          setCurProduct(product);
        }
      }
      if (value?.category) {
        if (value.category?.id !== curCategory?.id) {
          setCurCategory(value.category);
        }
      }
    } else {
      setCurProduct(null);
      setCurCategory(null);
    }
  }, [value]);

  //value change
  const handleProductChange = (newProduct: Product | null) => {
    setCurProduct(newProduct);
    //callback
    onChange && onChange({ product: newProduct, category: null });
  };

  //value change
  const handleCategoryChange = (newCategory: TicketCategory | null) => {
    setCurCategory(newCategory);
    //callback
    onChange && onChange({ product: curProduct, category: newCategory });
  };

  console.log('curproduct', curProduct);
  return (
    <>
      <Stack
        direction={row ? 'row' : 'column'}
        sx={{ pl: +`${filterToolbarAction ? 1 : 0}`, pr: +`${filterToolbarAction ? 1 : 0}` }} // Check if is checked action => set paddingLeft & paddingRight = 1
      >
        {/* Category */}
        <Box sx={{ width: '100%' }} mb={1}>
          {!hideCategoryLabel && (
            <Typography mb={1} color="secondary">
              {t('ncrm_desk_ticket_issue')}
            </Typography>
          )}
          <CategorySelect
            isPublic={isPublic}
            token={token}
            productIds={curProduct?.id ? [curProduct.id] : []}
            value={curCategory}
            onChange={handleCategoryChange}
          />
        </Box>
        {/* Product */}
        <Box sx={{ width: '100%' }}>
          {!hideProductLabel && (
            <Typography mb={1} color="secondary">
              {t('ncrm_desk_ticket_products')}
            </Typography>
          )}
          <ProductAutoComplete
            value={curProduct}
            onChange={(val) => {
              !Array.isArray(val) && handleProductChange(val);
            }}
            single={true}
            isPublic={isPublic}
            token={token}
          />
        </Box>
      </Stack>
    </>
  );
};

export default ProductCategory;
