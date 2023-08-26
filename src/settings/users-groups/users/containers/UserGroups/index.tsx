import { useEffect, useState } from 'react';
//project
import { convertDateTimeServerToClient } from '@base/utils/helpers/generalUtils';

//material-ui
import {
  Button,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import NoData from '@base/components/@hanbiro/NoData';
import { Add } from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';

import RouteName from '@base/components/@hanbiro/RouteName';
import { useOrg } from '@base/hooks/iam/useOrg';
import { useGroupMembership } from '@settings/users-groups/groups/hooks/useGroupMembership';
import { Group, ListMembershipsRequest, Membership, MemberType } from '@settings/users-groups/groups/types/group';
import { useGroups } from '@settings/users-groups/groups/hooks/useGroups';
import WriteAddGroupForm from '../WriteAddGroupForm';
import { useGroupMembershipMutation } from '@settings/users-groups/groups/hooks/useGroupMembershipMutation';
import { GROUP_ADD_BUTTON_LABEL, GROUP_DESCRIPTION, GROUP_NODATA } from '../../config/constants';
import { useTranslation } from 'react-i18next';

const TableHeader = ['Group Name', 'Description', 'Created At', ''];

interface UserGroupsProps {
  menuSource?: string;
  menuSourceId?: string;
  refetch?: () => void;
  canEdit?: boolean;
}
const UserGroups = (props: UserGroupsProps) => {
  const { menuSource, menuSourceId, canEdit = true } = props;
  const theme = useTheme();
  const border = '1px solid ' + theme.palette.divider;
  const navigate = useNavigate();
  const { t } = useTranslation();
  //state
  const [UserGroups, setUserGroups] = useState<any[]>();
  const [listGroups, setListGroups] = useState<any[]>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  //get data
  const { id: orgId } = useOrg();

  const { mDelete } = useGroupMembershipMutation();
  const req: ListMembershipsRequest = {
    orgId: orgId,
    memberId: menuSourceId,
    memberType: MemberType.USER,
    maxResults: 100
  };
  const { data, refetch } = useGroupMembership(req);
  // console.log('userGroups data', data);
  //get group
  const { results } = useGroups({ orgId: orgId, maxResults: 100 });

  useEffect(() => {
    if (results) setListGroups(results.items);
  }, [results, data]);

  useEffect(() => {
    if (data?.items.length !== 0 && listGroups?.length !== 0) {
      const userGroupIds = data?.items?.map((o: Membership) => o.groupId);
      const nData = listGroups?.filter((o: Group) => userGroupIds?.includes(o.id));
      setUserGroups(nData ?? []);
    } else setUserGroups([]);
  }, [data, listGroups]);

  //delete Group
  const handleDeleteGroup = (groupId: string) => {
    // handleClose();
    mDelete.mutate({
      input: {
        memberId: menuSourceId,
        memberType: 'USER',
        orgId: orgId,
        groupId: groupId
      }
    });
  };
  useEffect(() => {
    if (mDelete.isSuccess) {
      refetch && refetch();
    }
  }, [mDelete.isSuccess]);

  //==============================================================++++Debug=====================================
  console.log('%c UserGroups Membership', 'color: blue', data?.items);
  console.log('%c UserGroups Result Group', 'color: red', results?.items);
  // console.log('menuSourceId', menuSourceId);
  // console.log('userGroups', UserGroups);
  // console.log('resukts', results);
  //===============================================================================================================

  return (
    <Grid sx={{ maxHeight: 'calc(500px)', padding: '20px' }} className="scroll-box">
      {UserGroups && UserGroups?.length > 0 ? (
        <>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography>{t(GROUP_DESCRIPTION)}</Typography>
            {canEdit && (
              <Button
                sx={{ fontWeight: 'bold', fontSize: 'small' }}
                variant="contained"
                size="small"
                color="primary"
                startIcon={<Add />}
                onClick={() => setIsOpen(true)}
              >
                {t(GROUP_ADD_BUTTON_LABEL)}
              </Button>
            )}
          </Stack>
          <TableContainer
            component={Paper}
            sx={{
              paddingTop: '20px',
              boxShadow: 'none',
              borderBottom: border,
              borderBottomLeftRadius: '.25rem',
              borderBottomRightRadius: '.25rem',
              marginBottom: '4px'
            }}
          >
            <Table>
              <TableHead sx={{ border: `1px solid ${theme.palette.divider}` }}>
                <TableRow>
                  {TableHeader.map((header, key) => (
                    <TableCell key={key} sx={{ ...(header == t(`ncrm_common_label_primary`) && { width: '15%' }) }}>
                      {t(header)}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody
                sx={{
                  borderLeft: `1px solid ${theme.palette.divider}`
                }}
              >
                {UserGroups?.map((group, key) => (
                  <TableRow
                    key={key}
                    sx={{
                      ':hover': {
                        svg: {
                          visibility: 'visible'
                        }
                      }
                    }}
                  >
                    <TableCell>
                      {group.displayName}
                      {/* <RouteName url={`/${MENU_DIRECTORY}/${MENU_GROUPS}/${group.id}`} name={group.displayName} component="h6" /> */}
                    </TableCell>
                    <TableCell>{group.description}</TableCell>
                    <TableCell>
                      {convertDateTimeServerToClient({
                        date: group.createdAt,
                        isTime: true,
                        humanize: true
                      })}
                    </TableCell>
                    <TableCell sx={{ width: '10%', borderRight: border }}>
                      <IconButton
                        sx={{ ml: '20px', '& svg': { visibility: 'hidden' } }}
                        onClick={() => {
                          navigate(`/settings/manage-users-groups/groups/${group.id}`);
                        }}
                      >
                        <VisibilityIcon fontSize="small" color="primary" />
                      </IconButton>
                      {canEdit && (
                        <IconButton
                          sx={{ ml: '20px', '& svg': { visibility: 'hidden' } }}
                          onClick={() => {
                            handleDeleteGroup(group.id);
                          }}
                        >
                          <DeleteOutlineIcon fontSize="small" color="error" />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <NoData
          label={t(GROUP_NODATA) as string}
          ComponentButton={
            <>
              {canEdit && (
                <Button variant="text" size="small" color="primary" startIcon={<Add />} onClick={() => setIsOpen(true)}>
                  {t(GROUP_ADD_BUTTON_LABEL)}
                </Button>
              )}
            </>
          }
        />
      )}

      {isOpen && (
        <WriteAddGroupForm
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onReload={refetch}
          menuSource={menuSource}
          menuSourceId={menuSourceId}
        />
      )}
    </Grid>
  );
};
export default UserGroups;
