import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';

import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import { cardsAtom, columnsAtom } from './Atom';
import { ICard, IColumn, IStatus } from './Interface';
import KanbanColumn from './Column';

export interface KanbanBoardProps {}

export const BoardContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  gap: '1.5rem',
  maxWidth: '100vw',
  overflowX: 'auto',
  position: 'relative',
  '@media(max-width: 1200px)': {
    padding: '2rem 0 2rem 0'
  }
}));

const KanbanBoard = (props: KanbanBoardProps) => {
  const [cards, setCards] = useRecoilState(cardsAtom);
  const [columns, setColumns] = useRecoilState(columnsAtom);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const updatedCards: ICard[] = cards.cards.map((card: ICard) => {
      if (card.id === draggableId) {
        const status: IStatus = destination.droppableId as IStatus;
        return {
          ...card,
          status
        };
      } else return card;
    });

    const sourceColumn: IColumn = columns.columns.find((column: IColumn) => column.id === source.droppableId) as IColumn;
    const destinationColumn: IColumn = columns.columns.find((column: IColumn) => column.id === destination.droppableId) as IColumn;

    // Moving cards in the same column
    if (sourceColumn === destinationColumn) {
      const newColumnCardsIds = [...(destinationColumn?.cardsIds ?? [])];

      newColumnCardsIds.splice(source.index, 1);
      newColumnCardsIds.splice(destination.index, 0, draggableId);

      const newDestinationColumn: IColumn = {
        ...destinationColumn,
        cardsIds: newColumnCardsIds
      };

      const updatedColumns: IColumn[] = columns.columns.map((column: IColumn) => {
        if (column.id === newDestinationColumn.id) return newDestinationColumn;
        else return column;
      });

      setColumns({ updatedColumns: columns.updatedColumns, columns: updatedColumns });
      setCards({ searchText: cards.searchText, cards: updatedCards });

      return;
    }

    // Moving cards from one column to another
    const sourceCardsIds = [...(sourceColumn?.cardsIds ?? [])];
    sourceCardsIds.splice(source.index, 1);

    const newSourceColumn: IColumn = {
      ...sourceColumn,
      cardsIds: sourceCardsIds
    };

    const destinationCardsIds = [...(destinationColumn?.cardsIds ?? [])];
    destinationCardsIds.splice(destination.index, 0, draggableId);

    const newDestinationColumn: IColumn = {
      ...destinationColumn,
      cardsIds: destinationCardsIds
    };

    const updatedColumns: IColumn[] = columns.columns.map((column: IColumn) => {
      if (column.id === newDestinationColumn.id) return newDestinationColumn;
      if (column.id === newSourceColumn.id) return newSourceColumn;
      else return column;
    });

    setColumns({ updatedColumns: columns.updatedColumns, columns: updatedColumns });
    setCards({ searchText: cards.searchText, cards: updatedCards });
  };

  return (
    <>
      <BoardContainer>
        <DragDropContext onDragEnd={onDragEnd}>
          {columns.columns.map((column: IColumn, index: number) => {
            const cardsArray: ICard[] = [];
            column?.cardsIds?.forEach((cardId: string) => {
              const foundedCard = cards.cards.find((card: ICard) => card.id === cardId);
              if (foundedCard) cardsArray.push(foundedCard);
            });

            return <KanbanColumn
              key={column.id}
              index={index}
              status={column.id as IStatus}
              cards={cardsArray}
              onAddingClick={() => {}}
              onMoreMenuClick={() => {}}
            />;
          })}
        </DragDropContext>
      </BoardContainer>
    </>
  );
};

export default KanbanBoard;
