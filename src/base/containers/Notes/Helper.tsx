import { Stack, Typography, Box, Button } from '@mui/material';
import { convertDateTimeServerToClient } from '@base/utils/helpers';
import MoreAction from './MoreAction';
import RawHTML from '@base/components/@hanbiro/RawHTML';
import React, { useEffect, useRef, useState } from 'react';
import { t } from 'i18next';

export const useIsOverflow = (ref: any, callback: any) => {
  const [isOverflow, setIsOverflow] = React.useState<boolean>(false);

  React.useLayoutEffect(() => {
    const { current } = ref;
    const trigger = () => {
      const hasOverflow = current.scrollHeight > current.clientHeight;
      setIsOverflow(hasOverflow);
      if (callback) callback(hasOverflow);
    };

    if (current) {
      if ('ResizeObserver' in window) {
        new ResizeObserver(trigger).observe(current);
      }
      trigger();
    }
  }, [callback, ref]);

  return isOverflow;
};

export const columnRenderRemap = (menu: string, menuSourceId?: string, valueType?: any) => ({
  content(col: string, data: any) {
    let content: string = data?.[col];

    const ref = useRef<any>(null);
    const isOverflow = useIsOverflow(ref, (v: any) => {});

    return (
      <>
        <Box>
          <Box
            sx={{
              fontSize: 14,
              cursor: 'pointer',
              height: 'auto',
              display: '-webkit-box',
              webkit: '',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              // textOverflow: 'View All', // The text-overflow: "string" only works in Firefox.
              // msTextOverflow: 'View All',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical'
            }}
            ref={ref}
          >
            <RawHTML>{content}</RawHTML>
          </Box>
          {isOverflow && (
            <Button size="extraSmall" variant="text">
              {t(`ncrm_common_btn_view_all`)}
            </Button>
          )}
        </Box>
      </>
    );
  },
  createdAt(col: string, data: any) {
    let updatedAt = data[col] ? data[col] : '';
    return convertDateTimeServerToClient({ date: updatedAt, humanize: true, isTime: true });
  },
  updatedAt(col: string, data: any) {
    let updatedAt = data[col] ? data[col] : '';
    return convertDateTimeServerToClient({ date: updatedAt, humanize: true, isTime: true });
  },
  id(col: string, data: any) {
    const reps = data[col] || [];
    console.log('reps: ', reps);
    // console.log('valueType: ', (valueType.filter((item: any) => item.id === reps)))
    const content = valueType.filter((item: any) => item.id === reps)[0];
    return <MoreAction id={reps} sx={{ width: 1 }} menuSourceId={menuSourceId} value={content?.content || ''} />;
  },
  createdBy(col: string, data: any) {
    const createdBy = data[col] ?? null;
    return (
      <Stack spacing={0}>
        <Typography
          variant="body1"
          sx={{ width: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'inline-block' }}
        >
          {createdBy?.name || ''}
        </Typography>
      </Stack>
    );
  }
});

export const noteFields = [
  //-----------------------------------------------------Content-----------------------------------
  {
    name: 'content',
    isDefault: true,
    sortable: false,
    dataType: 'text',
    order: 11,
    title: 'Notes',
    hidden: false,
    id: 'content',
    keyName: 'content', //Table get keyName to map data
    languageKey: 'ncrm_common_note_content',
    showInList: true,
    orderInList: 11,
    showInView: true,
    defaultViewInList: true,
    children: null,
    isViewing: true
  },

  //----------------------------------------------Owner--------------------------------------
  {
    name: 'createdBy',
    isDefault: true,
    sortable: true,
    dataType: 'text',
    order: 11,
    title: 'Owner',
    hidden: false,
    id: 'createdBy',
    keyName: 'createdBy',
    languageKey: 'ncrm_common_note_owner',
    showInList: true,
    orderInList: 11,
    showInView: true,
    defaultViewInList: true,
    children: null,
    isViewing: true
  },

  //----------------------------------------------Create Date--------------------------------------
  {
    name: 'createdAt',
    isDefault: true,
    sortable: true,
    dataType: 'text',
    order: 11,
    title: 'Created Date',
    hidden: false,
    id: 'createdAt',
    keyName: 'createdAt',
    languageKey: 'ncrm_common_note_createdat',
    showInList: true,
    orderInList: 11,
    showInView: true,
    defaultViewInList: true,
    children: null,
    isViewing: true
  },

  //----------------------------------------------Updated Date--------------------------------------
  {
    name: 'updatedAt',
    isDefault: true,
    sortable: true,
    dataType: 'text',
    order: 11,
    title: 'Updated Date',
    hidden: false,
    id: 'updatedAt',
    keyName: 'updatedAt',
    languageKey: 'ncrm_common_note_updatedat',
    showInList: true,
    orderInList: 11,
    showInView: true,
    defaultViewInList: true,
    children: null,
    isViewing: true
  },

  //----------------------------------------------ID--------------------------------------
  {
    name: 'id',
    isDefault: true,
    sortable: false,
    dataType: 'text',
    order: 11,
    title: '',
    hidden: false,
    id: 'id',
    keyName: 'id',
    languageKey: '',
    showInList: true,
    orderInList: 11,
    showInView: true,
    defaultViewInList: true,
    children: null,
    isViewing: true
  }
];
