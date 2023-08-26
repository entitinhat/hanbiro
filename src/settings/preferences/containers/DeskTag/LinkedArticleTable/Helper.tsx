import { Box, Modal, useTheme } from '@mui/material';
import { useState } from 'react';
import { KnowledgeQuickView } from '@base/containers/QuickView';

export const dataRegex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d+)?Z$/;

export const columnRenderRemap = (menu: string) => ({
  category(col: string, data: any) {
    return (data.product ? data.product.name + '/' : '') + (data.category ? data.category.name : '');
  },
  subject(col: string, data: any) {
    const name = data.subject ?? '';

    return (
      <>
        {/* <Box sx={{ color: theme.palette.primary.main, fontSize: '0.9rem', cursor: 'pointer' }} onClick={handleOpen}>
          {name}
        </Box> */}
        <KnowledgeQuickView value={{ id: data?.id, name: name }} />
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
            <KnowledgeQuickView id={data.id} setLoading={setLoading} />
          </Box>
        </Modal> */}
      </>
    );
  },
  viewed(col: string, data: any) {
    return data?.viewed ? data?.viewed : '0';
  },
  inserted(col: string, data: any) {
    return data.inserted ? data.inserted : '0';
  },
  helpful(col: string, data: any) {
    return data.helpful ? data.helpful : '0';
  },
  notHelpful(col: string, data: any) {
    return data.notHelpful ? data.notHelpful : '0';
  }
});

export const isDeleteList = (groupBy: string): boolean => {
  return ['deletedTicket'].indexOf(groupBy) >= 0;
};
