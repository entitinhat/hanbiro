import { Box, Modal, useTheme } from '@mui/material';
import { Ticket } from '@desk/ticket/types/ticket';
import PriorityView from '@base/containers/ViewField/Priority/View';
import { Selection } from '@settings/general/types/interface';
import { t } from 'i18next';
import { useState } from 'react';
import { TicketQuickView } from '@base/containers/QuickView';

export const dataRegex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d+)?Z$/;

export const columnRenderRemap = (menu: string) => ({
  subject(col: string, data: any) {
    const name = data.subject ?? '';
    return (
      <>
        {/* <Box sx={{ color: theme.palette.primary.main, fontSize: '0.9rem', cursor: 'pointer' }} onClick={handleOpen}>
          {name}
        </Box> */}
        <TicketQuickView value={{ id: data?.id, name: name }} />
        {/* <Modal open={idOpenPopup} onClose={handleClose}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 2
            }}
          >
            <TicketQuickView value={id:data.id, name} id={data.id}  />
          </Box>
        </Modal> */}
      </>
    );
  },
  priority(col: string, data: any) {
    const reps = data[col] || [];
    const sValue: Selection = {
      keyName: data.priority?.keyName ?? '',
      languageKey: data.priority?.languageKey ?? ''
    };
    const priorityResult = (
      <Box sx={{ display: 'flex' }}>
        <PriorityView value={sValue} /> &nbsp;
        {` ${`( ${reps?.rowSpan} )`}`}
      </Box>
    );
    // return <PriorityView value={sValue} />;
    return reps?.rowSpan ? priorityResult : reps?.languageKey ? <PriorityView value={sValue} /> : '';
  },
  customer(col: string, data: any) {
    const reps = data[col] || [];
    const resultName = `${t(reps.name)} ${`( ${reps?.rowSpan} )`}`;
    const resultUndefined = ` ${`( ${reps?.rowSpan} )`}`;
    return reps?.rowSpan ? (reps?.name ? resultName : resultUndefined) : reps?.name ? t(reps.name) : '';
  },
  assignedGroup(col: string, row: Ticket) {
    return row.assignedGroup ? row.assignedGroup.name : '';
  },
  assignedUser(col: string, row: Ticket) {
    // Show avatar
    // let fUser = row.assignedUser ? row.assignedUser : null;
    // return fUser ? <HanAvatar size={'sm'} name={fUser.user?.name} /> : '-';

    // Show name
    let fUser = row.assignedUser ? row.assignedUser : null;
    return fUser ? fUser.user?.name : '';
  }
});

export const isDeleteList = (groupBy: string): boolean => {
  return ['deletedTicket'].indexOf(groupBy) >= 0;
};
