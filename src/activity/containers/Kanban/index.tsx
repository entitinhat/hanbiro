import { useRecoilValue } from 'recoil';

import { kanbanColumnsAtom, kanbanColumnsOrderAtom } from '@activity/store/atoms/activity';
import { Box, useTheme } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

import KanbanColumn from './Column';
import { pink } from '@mui/material/colors';

export const BoardContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  gap: '1rem',
  overflow: 'hidden',
  width: '100%',
  '@media(max-width: 1200px)': {
    padding: '2rem 0 2rem 0'
  },
}));

interface KanbanBoardProps {
  category: string;
}

const KanbanBoard = ({ category }: KanbanBoardProps) => {
  console.log('activity kanban board');
  const columns = useRecoilValue(kanbanColumnsAtom);
  const columnsOrder = useRecoilValue(kanbanColumnsOrderAtom);
  const theme = useTheme();
  const columnColor = [
    { id: 'overdue', titleColor: alpha(theme.palette.error.light, 0.3) },
    { id: 'today', titleColor: alpha(theme.palette.purple.light || '', 0.2) },
    { id: 'thisweek', titleColor: alpha(theme.palette.secondary.light || '', 0.6) },
    { id: 'others', titleColor: alpha(theme.palette.success.dark || '', 0.2) }
  ];

  const newColumns = columns.map((col: any) => {
    const colColor = columnColor.find((v) => v?.id === col?.id);
    return { ...col, titleColor: colColor?.titleColor || '' };
  });

  return (
    <Box sx={{ px: 2, display: 'flex' }}>
      <BoardContainer>
        {columnsOrder.map((columnId) => {
          const column = newColumns.filter((item) => item.id === columnId)[0];
          return <KanbanColumn key={columnId} column={column} category={category} />;
        })}
      </BoardContainer>
    </Box>
  );
};

export default KanbanBoard;
