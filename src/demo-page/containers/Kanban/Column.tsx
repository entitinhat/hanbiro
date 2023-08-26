import React, { useCallback, useRef } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { useRecoilValue } from 'recoil';

import { Box, Button, CardContent, IconButton, Stack, Typography } from '@mui/material';
import styled from '@mui/system/styled';

import { cardsWithFilter } from './Atom';
import { ICard, IStatus } from './Interface';
import KanbanCard, {CardProps} from './Card';
import DropDown from '@base/components/@hanbiro/Dropdown';
import { Add, MoreHoriz } from '@mui/icons-material';

/*interface ColumnProps {
  status: IStatus;
  cards: ICard[];
  index: number;
  onScroll?: ((e: any) => void) | undefined
}*/

export interface ColumnProps {
  index: number;
  id?: string;
  title?: string;
  status?: IStatus;
  cards?: ICard[];
  isDropDisabled?: boolean;
  customCard?: React.FunctionComponent<CardProps>;
  onScroll?: ((e: any) => void) | undefined;
  onAddingClick?: () => void;
  onMoreMenuClick?: () => void;
}

interface ContainerProps {
  isfirstcolumn: number;
}

export const ColumnContainer = styled(Box)<ContainerProps>(({ isfirstcolumn }) => ({
  width: '304px',
  // maxWidth: '304px',
  flex: '0 0 304px',
  padding: '0 12px',
  position: 'relative',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1
  // ...(isfirstcolumn && {
  //   marginLeft: '10rem'
  // }),
  // '@media(max-width:1200px)': {
  //   ...(isfirstcolumn && {
  //     marginLeft: '2rem'
  //   })
  // }
}));

const KanbanColumn = (props: ColumnProps) => {
  const {
    id,
    title,
    status,
    cards,
    index,
    isDropDisabled,
    customCard,
    onScroll,
    onAddingClick,
    onMoreMenuClick
  } = props;

  const filterCards = useRecoilValue(cardsWithFilter);

  const scrollbarRef = useRef<any>(null);
  const handleOnScroll = useCallback(
    (values: any) => {
      if (values.top === 1 && onScroll) {
        onScroll(values);
        scrollbarRef.current?.scrollToBottom();
      }
    },
    [scrollbarRef, onScroll]
  );

  const CardComponent = customCard ? customCard : KanbanCard;

  return (
    // <ColumnContainer  isfirstcolumn={index === 0 ? 1 : 0}>
    <ColumnContainer isfirstcolumn={index === 0 ? 1 : 0}>
      <Stack direction="row">
        <Typography variant="h5" sx={{ mr: 'auto' }}>
          {status ?? title}
        </Typography>
        {
          onAddingClick && <IconButton color="secondary" onClick={onAddingClick}>
            <Add/>
          </IconButton>
        }
        {
          onMoreMenuClick && <DropDown
            sx={{ mr: 0 }}
            icon={<MoreHoriz />}
            items={[
              { label: 'Add Section', value: 'add_section' },
              { label: 'Rename Section', value: 'rename_section' }
            ]}
            onChange={onMoreMenuClick}
          />
        }
      </Stack>
      <Droppable droppableId={(status ?? id) ?? ''} isDropDisabled={!!isDropDisabled}>
        {(provided) => (
          <CardContent
            sx={{
              mt: '0.5rem',
              // height: '100vh',
              maxHeight: 'calc(100vh - 270px)',
              minHeight: 0,
              // width: '280px',
              width: '100%',
              overflowY: 'auto',
              overflowX: 'hidden',
              padding: 0,
              display: 'flex',
              flexDirection: 'column'
            }}
            ref={(element: any) => {
              provided.innerRef(element);
              scrollbarRef.current = element;
            }}
            onScroll={handleOnScroll}
            {...provided.droppableProps}
          >
            {
              !!status && !!cards && cards
              .filter((card) => card.status === status)
              .map((card, index) => (
                <CardComponent key={card.id} card={card} index={index} />
              ))
            }
            {
              !status && !!cards && cards.map((card: any, index: number) => (
                <CardComponent key={card.id} card={card} index={index} />
              ))
            }
            {provided.placeholder}
          </CardContent>
        )}
      </Droppable>
      {
        onAddingClick && <Box sx={{ display: 'flex', justifyContent: 'center', mb: '10px' }}>
          <Button fullWidth color="secondary" startIcon={<Add />}>
              <Typography variant="subtitle1">Add Task</Typography>
          </Button>
        </Box>
      }
    </ColumnContainer>
  );
};

export default KanbanColumn;
