import React from 'react';

import { Activity } from '@activity/types/activity';
import { Box, Card, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { priorityConfigs, statusConfigs, typeConfigs } from '@activity/config/list-field/column';
import { getColor } from './Helper';

interface KanbanCardProps {
  card: Activity;
}

interface ColorProps {
  color: string | undefined;
}

const CardContainer = styled(Card)(({ theme }) => ({
  bgColor: theme.palette.background,
  opacity: 1,
  minHeight: '110px',
  flex: '0 0 auto',
  marginBottom: '0.5rem',
  padding: '1.2rem 1rem 0.7rem 1rem',
  borderRadius: '5px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  position: 'relative',
}));

export const DragIndicator = styled(Box)(({ color }: ColorProps) => ({
  cursor: 'grab',
  position: 'absolute',
  width: 'calc(100% + 2px)',
  top: '-1px',
  left: '-1px',
  borderTopLeftRadius: '5px',
  borderTopRightRadius: '5px',
  height: '10px',
  backgroundColor: color
}));

export const CardBottom = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%'
}));

const KanbanCard = ({ card }: KanbanCardProps) => {
  const theme = useTheme();
  const color = getColor(theme, priorityConfigs[card.priority?.keyName]?.color);

  return (
    <CardContainer variant="outlined">
      <DragIndicator color={color} />
      <Typography variant="h6" noWrap>
        {card.subject}
      </Typography>
      <CardBottom></CardBottom>
    </CardContainer>
  );
};

export default React.memo(KanbanCard);
