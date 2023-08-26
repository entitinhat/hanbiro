import { Box, Button, Grid, IconButton, Stack, Typography, useTheme } from '@mui/material';
import ProductAutoComplete from '@product/product/containers/ProductAutoComplete';
import { Product } from '@product/product/types/product';
import { TicketCategory } from '@settings/preferences/types/desk/ticketCategory';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CategorySelect from '../../CategorySelect';
import AddIcon from '@mui/icons-material/Add';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import { DeleteOutlineOutlined } from '@mui/icons-material';

export interface ValueProps {
  category: TicketCategory | null;
  product: Product[] | null;
}

interface ProductCategoryProps {
  hideProductLabel?: boolean;
  hideCategoryLabel?: boolean;
  isPublic?: boolean;
  token?: string;
  value?: ValueProps[];
  onChange?: (value: ValueProps[]) => void;
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

  const defaultRow: any = {
    category: {
      id: '',
      name: ''
    },
    product: []
  };
  //state
  const [rows, setRows] = useState<ValueProps[]>(value ? value : [defaultRow]);
  const [ignoredProduct, setIgnoredProduct] = useState<string[]>([]);
  const [isShowAddButton, setIsShowAddButton] = useState<boolean>(true);
  const [isLastRow, setIsLastRow] = useState<boolean>(false);

  const { t } = useTranslation();
  const theme = useTheme();
  // //initial value
  // useEffect(() => {
  //   if (value) {
  //     if (value?.product) {
  //       if (value.product?.id !== curProduct?.id) {
  //         let product = { ...value.product, label: value.product.name };
  //         setCurProduct(product);
  //       }
  //     }
  //     if (value?.category) {
  //       if (value.category?.id !== curCategory?.id) {
  //         setCurCategory(value.category);
  //       }
  //     }
  //   } else {
  //     setCurProduct(null);
  //     setCurCategory(null);
  //   }
  // }, [value]);

  //value change
  const handleProductChange = (newProduct: Product[] | null, index: number) => {
    if (newProduct) {
      let nRows = [...rows];
      nRows[index].product = newProduct.map((product) => ({ id: product.id, name: product.name }));

      setRows(nRows);
      // callback
      onChange && onChange(nRows);
    }
  };

  //value change
  const handleCategoryChange = (newCategory: TicketCategory | null, index: number) => {
    if (newCategory) {
      let nRows: any = [...rows];
      nRows[index].category = newCategory;

      setRows(nRows);

      nRows[index].category = { id: newCategory.id, name: newCategory.name };

      // callback
      onChange && onChange(nRows);
    }
  };

  const handleAddCategory = () => {
    const newRows = [...rows];

    newRows.push(defaultRow);

    setRows(newRows);
    if (isLastRow) setIsShowAddButton(false);
    onChange && onChange(newRows);
  };
  const handleRemoveCategory = (rIndex: number) => {
    const nRows = [...rows];
    nRows.splice(rIndex, 1);
    setRows(nRows);
    // setIgnoredProduct(nRows.map((item) => item?.product?.id));
    onChange && onChange(nRows);
  };

  return (
    <>
      <Box>
        {rows.map((item, index) => {
          return (
            <Stack spacing={2} direction="row" sx={{ py: 2 }}>
              <Box sx={{ width: '100%' }}>
                <CategorySelect
                  isPublic={isPublic}
                  token={token}
                  value={item?.category}
                  onChange={(value) => handleCategoryChange(value, index)}
                />
              </Box>
              <Box sx={{ width: '100%' }}>
                <ProductAutoComplete
                  value={item?.product}
                  onChange={(val) => {
                    handleProductChange(val as Product[], index);
                  }}
                  single={false}
                  isPublic={isPublic}
                  token={token}
                  // excludes={ignoredProduct}
                />
              </Box>
              {index !== 0 && (
                <IconButton size="small" color="error" onClick={() => handleRemoveCategory(index)}>
                  <DeleteOutlineOutlined fontSize="small" />
                </IconButton>
              )}
            </Stack>
          );
        })}
      </Box>

      {isShowAddButton && (
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Button
            size="small"
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              handleAddCategory();
            }}
          >
            <SpanLang sx={{ fontSize: '0.75rem', fontWeight: theme.typography.fontWeightMedium }} keyLang="ncrm_common_add_new_line" />
          </Button>
        </Grid>
      )}
    </>
  );
};

export default ProductCategory;
