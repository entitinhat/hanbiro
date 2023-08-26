import { Box, useTheme } from '@mui/material';

import { useProductURLs } from '@settings/billing-license/hooks/product-urls/useProductURLs';
import { ProductURLs } from '@settings/billing-license/types/product-urls';
import { IdName } from '@base/types/common';
import ProductURLsContent from '@settings/billing-license/containers/ProductURLsContent/ProductURLsContent';

interface ProductURLsTable {
  tableHeader: IdName[];
  tableBody: ProductURLs[];
}

const containStyle = {
  height: 'calc(100vh - 174px)'
};

const Products = () => {
  return (
    <Box sx={containStyle} className="scroll-box">
      <Box sx={{ padding: '20px' }}>
        <Box sx={{ flexGrow: 1, paddingTop: 2 }}>
          <ProductURLsContent menuSource={'123'} menuSourceId={'1234'} />
        </Box>
      </Box>
    </Box>
  );
};
export default Products;
