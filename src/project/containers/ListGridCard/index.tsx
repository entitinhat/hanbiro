import { ListGridCardProps as BaseListGridCardProps } from '@base/components/@hanbiro/List/ListGrid';
import { AvatarGroup, Box, Card, Checkbox, Chip, Divider, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { Task } from '../../types/task';
import { KanbanColumn } from '../../../base/types/kanban';

interface ListGridCardProps extends BaseListGridCardProps {
  data: Task;
  category: string;
  column?: KanbanColumn;
  kanban?: boolean;
}

const ListGridCard = (props: ListGridCardProps) => {
  const { category, data, sx, isChecked, onChecked, column, kanban = false } = props;

  const theme = useTheme();
  const bgcolor = theme.palette.background.paper;

  return (
    <Card elevation={0} sx={{ ...sx, backgroundColor: bgcolor }}>
      <Stack spacing={1}></Stack>
    </Card>
  );
};

export default ListGridCard;
