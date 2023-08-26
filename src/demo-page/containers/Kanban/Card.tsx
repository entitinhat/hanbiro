import React, { useEffect, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { Box, Card, Typography } from '@mui/material';
import { styled, Theme, useTheme } from '@mui/material/styles';

import Badge from './Badge';
import { getCategoryBorderColor } from './Helper';
import { ICard } from './Interface';

export interface CardContentProps {
  card: ICard;
  onViewMore?: () => void;
}

export interface CardProps {
  card: ICard;
  index: number;
  isDragDisabled?: boolean;
  onClick?: (v: React.MouseEvent, id: string) => void;
  customCardContent?: React.FunctionComponent<CardContentProps>;
}

interface ColorProps {
  color: string;
}

interface CardContainerProps {
  hidecard: number;
  theme: Theme;
}

const CardContainer = styled(Card)(({ theme, hidecard }: CardContainerProps) => ({
  bgColor: theme.palette.background,
  opacity: hidecard ? 0.2 : 1,
  // width: '280px',
  minHeight: '110px',
  flex: '0 0 auto',
  marginBottom: '0.5rem',
  padding: '1.2rem 1rem 0.7rem 1rem',
  borderRadius: '5px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  position: 'relative'
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
  backgroundColor: color,
  '&:before': {
    content: '""',
    height: '0.5px',
    width: '80px',
    backgroundColor: '#ffffff',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, 0)'
  }
}));

export const CardBottom = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%'
}));

interface DefaultCardContentProps extends CardContentProps, ColorProps {}

const DefaultCardContent = ({ card, onViewMore, color }: DefaultCardContentProps) => {
  return (
    <>
      <DragIndicator color={color} />
      <Typography
        variant="h6"
        sx={{ textOverflow: 'ellipsis', width: '100%', overflow: 'hidden', display: '-webkit-box', webkitLineClamp: 2 }}
      >
        {card.title}
      </Typography>
      <CardBottom>
        <Badge label={card.category} color={'error'} category={card.category} />
        {onViewMore && (
          <Typography variant="subtitle2" sx={{ cursor: 'pointer !important' }} onClick={onViewMore}>
            + View More
          </Typography>
        )}
      </CardBottom>
    </>
  );
};

const KanbanCard = ({ card, index, isDragDisabled, onClick, customCardContent }: CardProps) => {
  const theme = useTheme();
  const [backgroundColor, setBackgroundColor] = useState<string>(theme.palette.primary.main);

  useEffect(() => {
    if (card) {
      const categoryColor = getCategoryBorderColor(theme, card.category);
      setBackgroundColor(categoryColor);
    }
  }, [card]);

  const CardContentComponent = customCardContent
    ? customCardContent
    : (props: CardContentProps) => {
        return <DefaultCardContent {...props} color={backgroundColor} />;
      };

  return (
    <Draggable draggableId={card.id} index={index} isDragDisabled={!!isDragDisabled}>
      {(provided) => (
        <CardContainer
          variant={'outlined'}
          theme={theme}
          hidecard={card.hidden ? 1 : 0}
          onClick={(e) => onClick && onClick(e, card.id)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <CardContentComponent card={card} />
        </CardContainer>
      )}
    </Draggable>
  );
};

export default KanbanCard;
