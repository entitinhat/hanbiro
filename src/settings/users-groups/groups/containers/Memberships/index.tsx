import _ from 'lodash';
import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, DraggingStyle, Droppable, NotDraggingStyle } from 'react-beautiful-dnd';

import * as keyNames from '@settings/users-groups/groups/config/keyNames';

import NoData from '@base/components/@hanbiro/NoData';
import { Add } from '@mui/icons-material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Box, Button, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Theme, useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import SequenceItem from './Item';

import useSnackBar from '@base/hooks/useSnackBar';

import { SET_TIMEOUT } from '@base/config/constant';
import { Membership, MembershipType, MemberType } from '../../types/group';
import { useOrg } from '@base/hooks/iam/useOrg';
import { useGroupMembershipMutation } from '../../hooks/useGroupMembershipMutation';
import WriteMembershipModal from '../WriteMembershipsForm';
import { MEMBERSHIP_ADD_BUTTON_LABEL, MEMBERSHIP_DESCRIPTION, MEMBERSHIP_ERROR, MEMBERSHIP_NO_DATA } from '../../config/constants';
import { useTranslation } from 'react-i18next';

const getItemStyle = (theme: Theme, isDragging: boolean, draggableStyle: DraggingStyle | NotDraggingStyle | undefined) => ({
  ...draggableStyle,
  top: 'auto!important',
  left: 'auto!important'
});

interface MembershipsContainerProps {
  sourceId?: string;
  mode?: 'write' | 'view';
  value?: Membership[];
  onSave?: (keyName: string, isSuccess: boolean, value: any) => void;
  menuSourceId?: string;
}
const defaultItem: Membership = {
  memberId: '01',
  memberType: MemberType.UNSPECIFIED,
  groupId: '01',
  displayOrder: 1,
  type: MembershipType.DIRECT,
  createdAt: '2022-12-20T09:34:44.933Z'
};

const MembershipsContainer = (props: MembershipsContainerProps) => {
  const theme = useTheme();
  const { sourceId, mode = 'write', value, onSave, menuSourceId } = props;

  const { enqueueErrorBar } = useSnackBar();

  //State
  const [sequence, setSequence] = useState<Membership[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const { id: orgId } = useOrg();
  const { mUpdate, mDelete, mCreate } = useGroupMembershipMutation();

  const { t } = useTranslation();

  //================================================Initial Value==========================================================
  useEffect(() => {
    if (value) {
      if (_.isArray(value) && JSON.stringify(value) !== JSON.stringify(sequence)) {
        setSequence(value);
      }
    } else {
      setSequence([]);
    }
  }, [value]);
  //=========================================================================================================================

  /**request refetch data when creating successfully */
  useEffect(() => {
    if (mCreate.isSuccess || mDelete.isSuccess || mUpdate.isSuccess) {
      setTimeout(() => {
        // back to list router
        onSave && onSave(keyNames.KEY_GROUPS_MEMBERSHIPS, true, []);
      }, SET_TIMEOUT);
    }
  }, [mCreate.isSuccess, mDelete.isSuccess, mUpdate.isSuccess]);

  //end dragging
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const newItems = [...sequence];
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    setSequence(newItems);

    //Update displayOrder but server does not support this. (Wating for server)
    mUpdate.mutate({
      input: {
        orgId: orgId,
        groupId: menuSourceId,
        memberId: reorderedItem.memberId,
        memberType: reorderedItem.memberType,
        displayOrder: result.destination.index
      }
    });
  };

  //new row
  const handleAddRow = (formData: any) => {
    const newItems = [...sequence];
    const isExist = newItems.findIndex((item: Membership) => item.memberId == formData.memberId);
    if (isExist == -1) {
      mCreate.mutate({
        input: {
          orgId: orgId,
          groupId: menuSourceId,
          ...formData
        }
      });
      newItems.push({
        ...defaultItem,
        ...formData,
        displayOrder: newItems.length + 1
      });
      setSequence(newItems);
    } else {
      enqueueErrorBar(t(MEMBERSHIP_ERROR));
    }
  };

  //remove row
  const handleRemoveRow = (index: number) => {
    const newItems = [...sequence];
    const deletedItem = newItems[index];

    mDelete.mutate({
      input: {
        orgId: orgId,
        groupId: menuSourceId,
        memberId: deletedItem.memberId,
        memberType: deletedItem.memberType
      }
    });
    newItems.splice(index, 1);
    setSequence(newItems);
  };

  //handle change velue in member item, but this concept is not used in this component
  const handleValueChange = (index: number, keyName: keyof Membership, keyValue: any) => {
    const newItems = [...sequence];
    const newDate = new Date().toISOString();
    newItems[index] = {
      ...newItems[index],
      [keyName]: keyValue,
      createdAt: newDate,
      displayOrder: index
    };

    setSequence(newItems);
    // //callback
    onSave && onSave(keyNames.KEY_GROUPS_MEMBERSHIPS, true, newItems);
  };

  const draggableItem = (members: Membership[]) => {
    return (
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <TableBody {...provided.droppableProps} ref={provided.innerRef}>
              {members.map((member, index) => (
                <Draggable key={member.memberId} draggableId={'q-' + member.memberId} index={index}>
                  {(provided, snapshot) => (
                    <TableRow
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      sx={getItemStyle(theme, snapshot.isDragging, provided.draggableProps.style)}
                    >
                      <TableCell align="center" sx={{ padding: '4px !important' }}>
                        <Tooltip title="Click to Edit. Drag To Move.">
                          <IconButton
                            sx={{
                              display: 'flex'
                            }}
                            {...provided.dragHandleProps}
                          >
                            <DragIndicatorIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                      <SequenceItem sourceId={sourceId} item={member} handleRemoveRow={handleRemoveRow} mode={mode} seq={index} />
                    </TableRow>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </TableBody>
          )}
        </Droppable>
      </DragDropContext>
    );
  };

  const unDraggableItem = (members: Membership[]) => {
    return (
      <TableBody>
        {members.map((member, index) => (
          <TableRow key={member.memberId + index}>
            <SequenceItem handleRemoveRow={handleRemoveRow} sourceId={sourceId} item={member} mode={mode} seq={index} />
          </TableRow>
        ))}
      </TableBody>
    );
  };

  return (
    <Stack sx={{ maxHeight: 'calc(500px)', padding: '20px' }} className="scroll-box" spacing={2}>
      {mode == 'write' && (
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography>{t(MEMBERSHIP_DESCRIPTION)}</Typography>
          <Button
            sx={{ fontWeight: 'bold' }}
            variant="contained"
            size="small"
            color="primary"
            startIcon={<Add />}
            onClick={() => setIsOpen(true)}
          >
            {t(MEMBERSHIP_ADD_BUTTON_LABEL)}
          </Button>
        </Stack>
      )}

      <TableContainer component={Paper} sx={{ boxShadow: 'none', border: `1px solid ${theme.palette.divider}` }}>
        <Table sx={{ overflowX: 'auto', width: '100%' }} size="small">
          <TableHead sx={{ border: 'none', borderBottom: `1px solid ${theme.palette.divider}` }}>
            <TableRow>
              {mode == 'write' && <TableCell align="center" component="th" sx={{ width: '50px' }}></TableCell>}
              <TableCell sx={{ width: '10%' }} align="center" component="th">
                order
              </TableCell>
              <TableCell sx={{ width: '40%' }} component="th">
                Member Id
              </TableCell>
              <TableCell sx={{ width: '10%' }} align="center" component="th">
                Member Type
              </TableCell>
              <TableCell sx={{ width: '10%' }} align="center" component="th">
                Type
              </TableCell>
              <TableCell sx={{ width: '20%' }} align="center" component="th">
                Created On
              </TableCell>
              <TableCell sx={{ width: '10%' }} align="center" component="th">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          {sequence.length > 0 ? (
            <>{mode == 'write' ? draggableItem(sequence) : unDraggableItem(sequence)}</>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell align="center" colSpan={7}>
                  <NoData label={t(MEMBERSHIP_NO_DATA) as string} />
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
      {isOpen && (
        <WriteMembershipModal
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
          handleAddRow={handleAddRow}
        />
      )}
    </Stack>
  );
};

export default MembershipsContainer;
