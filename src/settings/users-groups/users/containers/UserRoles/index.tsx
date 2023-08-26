import { useEffect, useState } from 'react';
//project

import { convertDateTimeServerToClient } from '@base/utils/helpers/generalUtils';
import NoData from '@base/components/@hanbiro/NoData';

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
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import RouteName from '@base/components/@hanbiro/RouteName';
import { RoleAssignment } from '@base/types/iam';
import { useOrg } from '@base/hooks/iam/useOrg';
import { ROLE_ADD_BUTTON_LABEL, ROLE_DESCRIPTION, ROLE_NODATA } from '../../config/constants';
import { useTranslation } from 'react-i18next';

//table config
const TableHeader = ['Role Name', 'Access Type', 'Scope', 'Description', 'Created At', ''];

interface UserRolesProps {
  menuSource?: string;
  menuSourceId?: string;
  canEdit?: boolean;
}
const UserRoles = (props: UserRolesProps) => {
  const { menuSource, menuSourceId, canEdit = true } = props;
  const theme = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();

  //state
  const [UserRoles, setUserRoles] = useState<RoleAssignment[]>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  //get data
  const { id: orgId } = useOrg();
  // const { isLoading, data, error, refetch } = useRoleAssignments(orgId);
  // const { mDelete } = useRoleAssignmentMutation();

  // useEffect(() => {
  //   if (data) {
  //     const nData = data.assignments.filter((o: RoleAssignment) => o.principalId === menuSourceId);
  //     console.log('nData', nData);

  //     setUserRoles(nData ?? []);
  //   }
  // }, [data]);
  //handle delete

  // useEffect(() => {
  //   refetch && refetch();
  // }, [mDelete.isSuccess]);

  //=================DEBUG===========
  // console.log('menuSourceId', menuSourceId);
  // console.log('userRoles', UserRoles);
  //================END DEBUG========

  const border = '1px solid ' + theme.palette.divider;

  return (
    <Grid sx={{ maxHeight: 'calc(500px)', padding: '20px' }} className="scroll-box">
      {UserRoles && UserRoles?.length > 0 ? (
        <>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography>{ROLE_DESCRIPTION}</Typography>
            {canEdit && (
              <Button
                sx={{ fontWeight: 'bold' }}
                variant="contained"
                size="small"
                color="primary"
                startIcon={<Add />}
                onClick={() => setIsOpen(true)}
              >
                {ROLE_ADD_BUTTON_LABEL}
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
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody
                sx={{
                  borderLeft: `1px solid ${theme.palette.divider}`
                }}
              >
                {UserRoles?.map((role, key) => (
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
                      {role.roleId}
                      {/* <RouteName url={`/${MENU_ACCESS_CONTROL}/${MENU_ROLES}/${role.roleId}`} name={role.roleId} component="h6" /> */}
                    </TableCell>
                    <TableCell>{role.accessType}</TableCell>
                    <TableCell>{role.scope}</TableCell>
                    <TableCell>{role.description}</TableCell>

                    <TableCell>
                      {convertDateTimeServerToClient({
                        date: role.createdAt,
                        isTime: true,
                        humanize: true
                      })}
                    </TableCell>
                    <TableCell sx={{ width: '10%', borderRight: border }}>
                      <IconButton
                        sx={{ ml: '20px', '& svg': { visibility: 'hidden' } }}
                        onClick={() => {
                          // navigate(`/${MENU_ACCESS_CONTROL}/${MENU_ROLES}/${role.roleId}`);
                        }}
                      >
                        <VisibilityIcon fontSize="small" color="primary" />
                      </IconButton>
                      {canEdit && (
                        <IconButton
                          sx={{ ml: '20px', '& svg': { visibility: 'hidden' } }}
                          onClick={() => {
                            // mDelete.mutate({ orgId: orgId, id: role.id });
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
          label={ROLE_NODATA as string}
          ComponentButton={
            <>
              {canEdit && (
                <Button variant="text" size="small" color="primary" startIcon={<Add />} onClick={() => setIsOpen(true)}>
                  {ROLE_ADD_BUTTON_LABEL}
                </Button>
              )}
            </>
          }
        />
      )}
      {/* {isOpen && (
        <WritePage
          isOpen={isOpen}
          type={'USER'}
          onClose={() => {
            setIsOpen(false);
            refetch && refetch();
          }}
          value={{ principalId: menuSourceId }}
        />
      )} */}
    </Grid>
  );
};
export default UserRoles;
