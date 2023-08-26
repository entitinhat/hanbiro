import { DragIndicator } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Stack,
  SxProps,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import React, { ReactElement, Suspense } from 'react';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import RetryErrorBoundary from '../Errors/RetryErrorBoundary';
import SpanLang from '../SpanLang';

export interface CardProps {
  title: string;
  component: ReactNode;
  icon?: ReactElement;
  cardContentSx?: SxProps;
  addBtn?: ReactNode;
  isExpandable?: boolean;
}
export interface ViewRightProps {
  cards: CardProps[];
}
const ViewRight = (props: ViewRightProps) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const { cards } = props;
  return (
    <Box>
      {cards.length > 0 &&
        cards.map((card: CardProps, idx: number) => {
          const CardIcon = card?.icon ?? null;
          return (
            <Box sx={{ mb: 2 }} key={idx}>
              <Accordion defaultExpanded expanded={card?.isExpandable ? undefined : true} key={idx}>
                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header" sx={{ padding: '10px 16px' }}>
                  <Stack spacing={1} direction="row" alignItems="center" justifyContent={'space-between'} sx={{ width: '100%' }}>
                    {/* {CardIcon ? <>{CardIcon}</> : <DragIndicator fontSize="small" />} */}
                    <Typography variant="subtitle1" color="textPrimary" sx={{ textTransform: 'capitalize' }}>
                      <SpanLang keyLang={card?.title} textOnly />
                    </Typography>
                    {card?.addBtn ?? card.addBtn}
                  </Stack>
                </AccordionSummary>
                <AccordionDetails sx={{ ...card?.cardContentSx, padding: '0px !important' }}>
                  <Stack spacing={0} sx={{ width: '100%', margin: 0, padding: 0 }}>
                    <RetryErrorBoundary>
                      <Suspense fallback={<></>}>{card.component}</Suspense>
                    </RetryErrorBoundary>
                  </Stack>
                </AccordionDetails>
              </Accordion>
            </Box>
          );
        })}
    </Box>
  );
};

export default ViewRight;
