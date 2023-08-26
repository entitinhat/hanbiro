import {
  Avatar,
  Box,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
  Typography,
  useTheme
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import { moneyFormat } from '@base/utils/helpers';

const Cost = (props: any) => {
  const { costs } = props;
  const theme = useTheme();

  const { t } = useTranslation();

  return (
    <List
      component="nav"
      sx={{
        py: 0,
        '& .MuiListItemButton-root': {
          // '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
        }
      }}
    >
      {costs?.map((v: any, i: number) => {
        return (
          <ListItemButton key={i} divider={i !== costs.length - 1}>
            <ListItemAvatar>
              {/* <FormIcon icon={v.type === 'MEDIUM_EMAIL' ? 'email' : v.type === 'MEDIUM_SMS' ? 'sms' : ''} iconType="icon" size={36} /> */}
              <Box
                sx={{ backgroundColor: v?.type === 'MEDIUM_EMAIL' ? theme.palette.primary.lighter : theme.palette.success.lighter }}
                borderRadius="50%"
                width="36px"
                height="36px"
                display="flex"
              >
                {v?.type === 'MEDIUM_EMAIL' && <MailOutlineOutlinedIcon fontSize="small" sx={{ margin: 'auto' }} color="primary" />}
                {v?.type === 'MEDIUM_SMS' && <SmsOutlinedIcon fontSize="small" sx={{ margin: 'auto' }} color="success" />}
              </Box>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography fontWeight={500}>
                  {moneyFormat(v.cost.amount, v.cost.fCurrency.currencySymbol)}
                  /1 time
                </Typography>
              }
              // secondary={<Typography color="secondary">Total: {v.total}</Typography>}
            />
            <ListItemSecondaryAction>
              <Typography color="secondary">Total: {v.total}</Typography>
            </ListItemSecondaryAction>
          </ListItemButton>
        );
      })}
    </List>
  );
};

export default Cost;
