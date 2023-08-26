import React, { ReactElement, ReactNode, Suspense } from 'react';

import RetryErrorBoundary from '@base/components/@hanbiro/Errors/RetryErrorBoundary';
import { BorderColorOutlined } from '@mui/icons-material';
import { Box, Divider, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import IconButton from '@base/components/@extended/IconButton';

export interface CardProps {
  title: string;
  component: ReactNode;
  icon?: ReactElement;
}
export interface ViewCardProps {
  cards: CardProps[];
}

const ViewCard = (props: ViewCardProps) => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  const { cards } = props;
  return (
    <>
      {cards.length > 0 &&
        cards.map((card: CardProps, idx: number) => {
          return (
            <Box sx={{ px: 1, py: 0.5, mb: 1, borderRadius: 1, border: '1px solid', borderColor: theme.palette.divider }} key={idx}>
              <Stack spacing={1} direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 1 }}>
                <Typography variant="subtitle1" color="textPrimary" sx={{ textTransform: 'capitalize' }}>
                  {card.title}
                </Typography>
                <IconButton size="small">
                  <BorderColorOutlined sx={{ color: 'primary.main', fontSize: 18 }} />
                </IconButton>
              </Stack>
              <Divider />
              <Stack spacing={1} sx={{ width: '100%', margin: 0 }}>
                <RetryErrorBoundary>
                  <Suspense fallback={<></>}>{card.component}</Suspense>
                </RetryErrorBoundary>
              </Stack>
            </Box>
          );
        })}
    </>
  );
};

export default ViewCard;
