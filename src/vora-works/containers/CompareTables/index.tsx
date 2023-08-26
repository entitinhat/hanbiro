import NoData from '@base/components/@hanbiro/NoData';
import MainCard from '@base/components/App/MainCard';
import useDevice from '@base/hooks/useDevice';
import {
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme
} from '@mui/material';
import { PRICING_PLANS } from '@vora-works/config/constants';
import { useEffect, useState } from 'react';
import HeadItem from './HeadItem';
import RowItem from './RowItem';
import DoneIcon from '@mui/icons-material/Done';
import { PlanFeature, PricingPlan } from '@vora-works/types';

interface CompareTableProps {
  priceType?: 'annually' | 'monthly';
}
function CompareTable(props: CompareTableProps) {
  const { priceType = 'monthly' } = props;
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>(PRICING_PLANS);
  const [planFeatures, setPlanFeatures] = useState<PlanFeature[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(3);
  useEffect(() => {
    if (pricingPlans) {
      const features = pricingPlans[0].features;
      setPlanFeatures([...features]);
    }
  }, [pricingPlans]);
  const handleSelect = (id: string) => {
    const selectedIndex = pricingPlans.findIndex((plan) => plan.id === id);
    if (selectedIndex !== -1) {
      setSelectedIndex(selectedIndex + 2);
    } else {
      setSelectedIndex(2);
    }
  };
  const theme = useTheme();
  const { isMobile } = useDevice();
  return (
    <>
      {isMobile ? (
        <>
          {pricingPlans.map((plan, index: number) => {
            return (
              <MainCard
                sx={{
                  marginBottom: 5,
                  ...(index == selectedIndex - 2 && {
                    backgroundColor: theme.palette.primary.lighter
                  })
                }}
                key={plan.id}
              >
                <List disablePadding component="nav">
                  <ListItem sx={{ justifyContent: 'center' }} component="div">
                    <Typography variant="h4" fontWeight="bold">
                      {plan.name}
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ justifyContent: 'center' }}>
                    <Typography variant="h3" textAlign="center">
                      {priceType == 'monthly' ? `$ ${plan.priceMonthly} / mth` : `$ ${plan.priceYearly} /year`}
                    </Typography>
                  </ListItem>
                  <ListItemButton>
                    <Button
                      onClick={() => {
                        const newIndex = index + 2;
                        setSelectedIndex(newIndex);
                      }}
                      fullWidth
                      size="small"
                      color="primary"
                      variant={index == selectedIndex - 2 ? 'contained' : 'outlined'}
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
                  </ListItemButton>
                  {plan.features.map((feature) => {
                    return (
                      <>
                        <ListItem sx={{ opacity: feature.isOpen ? '100%' : '50%' }} key={feature.name}>
                          <ListItemIcon>
                            <DoneIcon color="primary" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary={feature.name} />
                        </ListItem>
                      </>
                    );
                  })}
                </List>
              </MainCard>
            );
          })}
        </>
      ) : (
        <TableContainer component={Paper} sx={{ boxShadow: 'none', border: `1px solid ${theme.palette.divider}` }}>
          <Table sx={{ overflowX: 'auto', width: '100%' }} size="small">
            <TableHead sx={{ backgroundColor: theme.palette.background.paper, border: 0 }}>
              <TableRow
                sx={{
                  [`& .MuiTableCell-root:nth-of-type(${selectedIndex})`]: {
                    borderTop: `1px solid  ${theme.palette.primary.main}`,
                    borderRight: `1px solid  ${theme.palette.primary.main}`,
                    borderLeft: `1px solid  ${theme.palette.primary.main}`
                  }
                }}
              >
                <TableCell width="25%" component="th">
                  Features
                </TableCell>
                {pricingPlans.map((plan, index: number) => {
                  return (
                    <HeadItem
                      key={plan.id}
                      isSelected={selectedIndex == index + 2}
                      onSelected={handleSelect}
                      item={plan}
                      priceType={priceType}
                    />
                  );
                })}
              </TableRow>
            </TableHead>
            {planFeatures.length > 0 ? (
              <TableBody
                sx={{
                  [`& .MuiTableRow-root .MuiTableCell-root:nth-of-type(${selectedIndex})`]: {
                    borderRight: `1px solid  ${theme.palette.primary.main}`,
                    borderLeft: `1px solid  ${theme.palette.primary.main}`
                  },

                  [`& .MuiTableRow-root:last-child .MuiTableCell-root:nth-of-type(${selectedIndex})`]: {
                    borderBottom: `1px solid  ${theme.palette.primary.main}`
                  }
                }}
              >
                {planFeatures.map((item) => {
                  return <RowItem key={item.name} item={item} pricingPlans={pricingPlans} />;
                })}
              </TableBody>
            ) : (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={6}>
                    <NoData />
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      )}
    </>
  );
}
export default CompareTable;
