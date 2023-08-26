import { Products } from '@settings/billing-license/types/products';
import { Box } from '@mui/material';

import { useTranslation } from 'react-i18next';
import ProductsContent from '@settings/billing-license/containers/ProductsContent';

const containStyle = {
  height: 'calc(100vh - 174px)'
};

const Products = () => {
  return (
    <Box sx={containStyle} className="scroll-box">
      <Box sx={{ padding: '20px' }}>
        <Box sx={{ flexGrow: 1, paddingTop: 2 }}>
          <ProductsContent menuSource={'123'} menuSourceId={'1234'} />
        </Box>
      </Box>
    </Box>
  );
};
export default Products;
