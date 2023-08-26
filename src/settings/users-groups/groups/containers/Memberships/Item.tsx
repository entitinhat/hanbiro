import _ from 'lodash';
import React from 'react';

import { DeleteOutline } from '@mui/icons-material';
import { IconButton, Stack, TableCell, Tooltip, Typography } from '@mui/material';

import { convertDateTimeServerToClient } from '@base/utils/helpers/generalUtils';

import RouteName from '@base/components/@hanbiro/RouteName';
import { Membership } from '../../types/group';

interface SequenceItemProps {
  item: Membership;
  seq: number;
  mode?: 'write' | 'view';
  sourceId?: string;
  handleRemoveRow?: (index: number) => void;
}

function SequenceItem(props: SequenceItemProps) {
  const { item, mode = 'write', handleRemoveRow, seq = 0 } = props;

  const getUrl = () => {
    const type = item.memberType == 'GROUP' ? 'groups' : 'users';
    return `/settings/manage-users-groups/${type}/${item.memberId}`;
  };
  const renderItemWrite = () => {
    return (
      <>
        <TableCell sx={{ width: '10%' }} align="center">
          <Typography color="secondary">#{seq + 1}</Typography>
        </TableCell>
        <TableCell sx={{ width: '40%' }}>
          <Typography> {item.memberId}</Typography>
        </TableCell>
        <TableCell align="center" sx={{ width: '10%' }}>
          <Typography> {item.memberType}</Typography>
        </TableCell>
        <TableCell align="center" sx={{ width: '10%' }}>
          <Typography variant="body1">{item.type}</Typography>
        </TableCell>
        <TableCell align="center" sx={{ width: '20%' }}>
          <Typography>{convertDateTimeServerToClient({ date: item.createdAt, humanize: true, isTime: true })}</Typography>
        </TableCell>
        <TableCell align="center" sx={{ width: '10%' }}>
          <Stack justifyContent="center" alignItems="center" spacing={0.3} direction="row">
            {/* <Button onClick={handleShowDetail}>Show details</Button> */}
            <Tooltip title={'Remove the member from group'}>
              <IconButton
                size="small"
                color="error"
                onClick={() => {
                  handleRemoveRow && handleRemoveRow(seq);
                }}
              >
                <DeleteOutline fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        </TableCell>
      </>
    );
  };

  const renderItemView = () => {
    return (
      <>
        <TableCell align="center">
          <Typography color="secondary">#{seq + 1}</Typography>
        </TableCell>
        <TableCell>
          <Typography> {item.memberId}</Typography>
        </TableCell>
        <TableCell align="center">
          <Typography variant="body1">{item.memberType}</Typography>
        </TableCell>
        <TableCell align="center">
          <Typography variant="body1">{item.type}</Typography>
        </TableCell>
        <TableCell align="center">
          <Typography>{convertDateTimeServerToClient({ date: item.createdAt, humanize: true, isTime: true })}</Typography>
        </TableCell>
        <TableCell align="center">
          <Stack alignItems="center">
            <RouteName url={getUrl()} name={'Show details'} component="h6" />
          </Stack>
        </TableCell>
      </>
    );
  };

  return <React.Suspense>{mode == 'write' ? renderItemWrite() : renderItemView()}</React.Suspense>;
}

export default SequenceItem;
