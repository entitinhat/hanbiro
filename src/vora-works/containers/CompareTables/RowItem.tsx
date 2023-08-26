import { QuestionCircleFilled } from '@ant-design/icons';
import { Stack, TableCell, TableRow, Tooltip, Typography, useTheme } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import { PlanFeature, PricingPlan } from '@vora-works/types';
interface RowItemProps {
  pricingPlans: PricingPlan[];
  item: PlanFeature;
}
function RowItem(props: RowItemProps) {
  const { pricingPlans, item } = props;

  const isOpen = (name: string, plan: PricingPlan) => {
    const features = plan.features;
    return features.find((feature) => feature.name === name)?.isOpen;
  };
  return (
    <TableRow>
      <TableCell>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography> {item.name}</Typography>
          <Tooltip title={item.name}>
            <QuestionCircleFilled size={12} />
          </Tooltip>
        </Stack>
      </TableCell>
      {pricingPlans?.map((plan) => {
        return (
          <TableCell align="center" key={plan.id}>
            {isOpen(item.name, plan) ? (
              <CheckCircleIcon fontSize="small" color="primary" />
            ) : (
              <HorizontalRuleIcon fontSize="small" color="primary" />
            )}
          </TableCell>
        );
      })}
    </TableRow>
  );
}
export default RowItem;
