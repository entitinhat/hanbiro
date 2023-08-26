import { Box, Grid } from '@mui/material';
import ItemMeasurement from './ItemMeasurement';
import CanBeSold from './CanBeSold';
import CostOfGoods from './CostOfGoods';
import ProductNotification from './ProductNotification';
import SupplyMethod from './SupplyMethod';
import ItemType from './ItemType';
import InventoryType from './InventoryType';

interface ProductGeneralProps {}

const ProductGeneral = (props: ProductGeneralProps) => {
  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <ItemMeasurement />
        </Grid>
        <Grid item xs={12} md={6}>
          <CostOfGoods />
        </Grid>
        <Grid item xs={12} md={6}>
          <CanBeSold />
        </Grid>
        <Grid item xs={12} md={6}>
          <SupplyMethod />
        </Grid>
        <Grid item xs={12} md={6}>
          <ItemType />
        </Grid>
        <Grid item xs={12} md={6}>
          <InventoryType />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductGeneral;
