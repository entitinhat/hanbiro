import MainCard from '@base/components/App/MainCard';
// import ProductTree from './ProductTree';
import Box from '@mui/material/Box'

import ProductTree from '@product/group/containers/ProductTree';

interface ProductGroupProps {
  // value?: ProductGroup | '';
  // onChange?: any;
}

const ProductGroup = (props: ProductGroupProps) => {
  return (
    <>
      <Box sx={{ pt: 2 }}>
        <ProductTree haveProductCount={false} haveRemoveGroup={true} onlyDisplayGroup={true} />
      </Box>
    </>
  );
};

export default ProductGroup;
