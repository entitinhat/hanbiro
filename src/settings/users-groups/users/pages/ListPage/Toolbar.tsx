import { DropdownProps } from '@base/components/@hanbiro/Dropdown';
import { ListToolbar } from '@base/components/@hanbiro/List';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WritePage from '../WritePage';
import { LabelValueIcon } from '@base/types/app';

import Icon from '@base/assets/icons/svg-icons';
import { Link, Stack, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/material';
import InvitePeoplePage from '../InvitePeoplePage';
import AddIcon from '@mui/icons-material/Add';

export const TicketToolbarMoreOptions: LabelValueIcon[] = [
  {
    label: 'ncrm_desk_ticket_import',
    value: 'import',
    icon: Icon('upload_cloud')
  },
  {
    label: 'ncrm_desk_ticket_export',
    value: 'export',
    icon: Icon('download')
  },
  {
    label: 'New User',
    value: 'newUser',
    icon: <AddIcon fontSize="small" />
  }
];

interface ToolbarProps {
  onRefresh: () => void;
  moreMenuProps?: DropdownProps;
}
const Toolbar = (props: ToolbarProps) => {
  const { onRefresh, moreMenuProps } = props;
  const [isOpenWrite, setIsOpenWrite] = useState<boolean>(false);
  const navigate = useNavigate();
  const [showWritePage, setShowWritePage] = useState<boolean>(false);
  const theme = useTheme();

  const handleMoreChange = (keyEvent: string) => {
    keyEvent = keyEvent.toLowerCase();
    switch (keyEvent) {
      case 'newuser':
        setShowWritePage(true);
        break;
      default:
        console.log(keyEvent);
    }
  };

  return (
    <>
      <ListToolbar
        // onRefresh={onRefresh}
        moreMenuProps={{
          items: TicketToolbarMoreOptions,
          onChange: (key: LabelValueIcon) => {
            handleMoreChange(key.value);
          }
        }}
        categoryMenuProps={{
          items: [
            {
              value: 'users',
              label: 'Users',
              path: 'settings/manage-users-groups/users'
            }
          ],
          selected: 'users',
          onClick: (category: string) => {
            navigate(`/settings/manage-users-groups/${category}`);
          }
        }}
        addingMenuProps={{
          items: [],
          label: 'Invite users',
          icon: <></>,
          onClick: (item: string) => {
            setIsOpenWrite(true);
          }
        }}
      />
      <Box sx={{ paddingLeft: '16px', display: 'flex' }}>
        <Typography sx={{ padding: '10px' }}>Manage product access for all the users in your organnization.</Typography>
        <Link sx={{ padding: '10px 0', cursor: 'pointer' }}>Learn more about access settings</Link>
      </Box>
      <Stack direction="row" spacing={2} sx={{ paddingLeft: '16px' }}>
        <Box sx={{ padding: '10px' }}>
          <Typography color={theme.palette.secondary.main}>Total users</Typography>
          <Typography>4</Typography>
        </Box>
        <Box sx={{ padding: '10px' }}>
          <Typography color={theme.palette.secondary.main}>Active users</Typography>
          <Typography>_</Typography>
        </Box>
        <Box sx={{ padding: '10px' }}>
          <Typography color={theme.palette.secondary.main}>Administrators</Typography>
          <Typography>_</Typography>
        </Box>
      </Stack>
      {showWritePage && (
        <WritePage
          isOpen={showWritePage}
          onClose={() => {
            setShowWritePage(false);
            onRefresh && onRefresh();
          }}
        />
      )}
      {isOpenWrite && (
        <InvitePeoplePage
          isOpen={isOpenWrite}
          onClose={() => {
            setIsOpenWrite(false);
            onRefresh && onRefresh();
          }}
        />
      )}
    </>
  );
};

export default Toolbar;
