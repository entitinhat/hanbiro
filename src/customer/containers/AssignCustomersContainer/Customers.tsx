import { UserOrCustomer } from '@activity/types/activity';
import { DeleteTwoTone, MailOutlined, MessageOutlined } from '@ant-design/icons';
import HanAvatar from '@base/components/@hanbiro/HanAvatar';
import { CustomerQuickView } from '@base/containers/QuickView';
import { IconButton, List, ListItem, ListItemText, Stack, styled, useTheme } from '@mui/material';

const ListWrapper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper
}));
ListWrapper.displayName = 'ListWrapper';

interface CustomersProps {
  items: UserOrCustomer[];
  sendMail: boolean;
  sendSms: boolean;
  onDelete: (item: UserOrCustomer) => void;
}

const Customers = (props: CustomersProps) => {
  const theme = useTheme();
  const { items = [], sendMail = false, sendSms = false, onDelete } = props;
  return (
    <>
      <ListWrapper>
        <List>
          {items.length > 0 &&
            items.map((item, index) => {
              return (
                <ListItem
                  key={index}
                  alignItems="center"
                  sx={{
                    p: 0.5
                  }}
                  secondaryAction={
                    <Stack direction="row" spacing={1} alignItems="center">
                      {sendMail && (
                        <IconButton edge="end" color="primary">
                          {sendMail && <MailOutlined />}
                        </IconButton>
                      )}
                      {sendSms && (
                        <IconButton edge="end" color="primary">
                          {sendMail && <MessageOutlined />}
                        </IconButton>
                      )}
                      <IconButton
                        edge="end"
                        color="error"
                        onClick={(e: any) => {
                          onDelete(item);
                        }}
                      >
                        <DeleteTwoTone twoToneColor={theme.palette.error.main} />
                      </IconButton>
                    </Stack>
                  }
                >
                  <ListItemText
                    primary={
                      <Stack direction="row" spacing={1} alignItems="center">
                        <HanAvatar size="sm" name={item.name} photo={item?.photo} />
                        <CustomerQuickView value={{ id: item.id, name: item.name }} />
                      </Stack>
                    }
                  />
                </ListItem>
              );
            })}
        </List>
      </ListWrapper>
    </>
  );
};

export default Customers;
