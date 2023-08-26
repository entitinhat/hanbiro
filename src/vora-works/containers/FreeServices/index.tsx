import { Button, ListItemIcon, ListItemText, ListSubheader, useTheme, List, Typography, ListItem } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import { FreePlans } from '@vora-works/config/constants';
import { useNavigate } from 'react-router-dom';

interface FreeServicesProps {
  isCenter?: boolean;
  showTitle?: boolean;
}
function FreeServices(props: FreeServicesProps) {
  const { isCenter = true, showTitle = true } = props;
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <>
      <List
        sx={{ ...(isCenter && { top: '50%', transform: 'translateY(-50%)' }) }}
        className="scroll-box"
        component="nav"
        subheader={
          <ListSubheader component="div">
            {showTitle && (
              <Typography marginBottom={5} variant="h3" component="div">
                Vora Works Make Your Service Better
              </Typography>
            )}

            <Typography variant="h4" fontWeight="bold">
              Free Plan
            </Typography>
          </ListSubheader>
        }
      >
        {FreePlans.map((item) => {
          return (
            <ListItem key={item.value}>
              <ListItemIcon>
                <DoneIcon color="primary" fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          );
        })}

        <ListItem>
          {showTitle && (
            <Button
              size="small"
              onClick={() => {
                navigate(`/vora-works/compare-plans`);
              }}
              variant="contained"
              color="primary"
            >
              Compare plans
            </Button>
          )}
        </ListItem>
      </List>
    </>
  );
}
export default FreeServices;
