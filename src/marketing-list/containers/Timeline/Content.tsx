import RouteName from '@base/components/@hanbiro/RouteName';
import { User } from '@base/types/user';
import { Box, Stack, Typography } from '@mui/material';

interface ContentProps {
  title: string;
  user: User;
  route?: { link: string; label: string };
}
const Content = (props: ContentProps) => {
  const { title, user, route } = props;
  return (
    <Box>
      <Stack direction="column" spacing={1}>
        <Typography fontWeight={500}>{title}</Typography>
        <Typography color="secondary">{`by ` + user.fullName}</Typography>
        {route && <RouteName name={route.label} url={route.link} />}
      </Stack>
    </Box>
  );
};
export default Content;
