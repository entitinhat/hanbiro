import MainCard from '@base/components/App/MainCard';
import useDevice from '@base/hooks/useDevice';
import { Button, CardActions, CardContent, TableCell, Typography, useTheme } from '@mui/material';
import { PricingPlan } from '@vora-works/types';

interface HeadItemProps {
  item: PricingPlan;
  priceType: 'annually' | 'monthly';
  onSelected: (id: string) => void;
  isSelected: boolean;
}
function HeadItem(props: HeadItemProps) {
  const { item, priceType, onSelected, isSelected } = props;

  const theme = useTheme();
  const { isMobile } = useDevice();
  return (
    <TableCell
      sx={{
        ...(isSelected && {
          backgroundColor: theme.palette.primary.lighter
        })
      }}
      width="25%"
    >
      <MainCard
        border={false}
        sx={{
          p: 0,
          '& .MuiCardContent-root': {
            p: '4px 8px',
            ...(isMobile && {
              p: '4px 0px'
            })
          }
        }}
      >
        <CardContent>
          <Typography fontWeight="bold" color="primary" textAlign="center">
            {item.name}
          </Typography>
          <Typography variant="h3" textAlign="center">
            {priceType == 'monthly' ? `$ ${item.priceMonthly} / mth` : `$ ${item.priceYearly} /year`}
          </Typography>
        </CardContent>

        <CardActions sx={{ justifyContent: 'center' }}>
          <Button
            onClick={() => {
              onSelected(item.id);
            }}
            size="small"
            color="primary"
            variant={isSelected ? 'contained' : 'outlined'}
            aria-label="settings"
            sx={{
              fontWeight: 'medium',
              '&:hover': {
                background: theme.palette.primary.dark,
                color: theme.palette.primary.contrastText
              }
            }}
          >
            Get Started
          </Button>
        </CardActions>
      </MainCard>
    </TableCell>
  );
}
export default HeadItem;
