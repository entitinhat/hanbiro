import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import KanbanColumn from './Column';

export const BoardContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  gap: '1rem',
  overflow: 'hidden',
  width: '100%',
  '@media(max-width: 1200px)': {
    padding: '2rem 0 2rem 0'
  }
}));

interface KanbanBoardProps {
  category: string;
}

const columns = [
  {
    id: 'todo',
    title: 'Todo',
    itemIds: []
  },
  {
    id: 'progress',
    title: 'Progress',
    itemIds: []
  },
  {
    id: 'done',
    title: 'Done',
    itemIds: []
  },
  {
    id: 'qa',
    title: 'QA',
    itemIds: []
  }
];

const KanbanBoard = ({ category }: KanbanBoardProps) => {
  return (
    <Box sx={{ px: 2, display: 'flex' }}>
      <BoardContainer>
        {columns.map((column) => {
          return <KanbanColumn key={column.id} column={column} category={category} />;
        })}
      </BoardContainer>
    </Box>
  );
};

export default KanbanBoard;
