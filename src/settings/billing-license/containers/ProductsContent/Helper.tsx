import { Stack, Typography, Box, Button } from '@mui/material';
import { convertDateTimeServerToClient } from '@base/utils/helpers';
import MoreAction from './MoreAction';
import RawHTML from '@base/components/@hanbiro/RawHTML';
import React, { useEffect, useRef, useState } from 'react';
import { t } from 'i18next';
import IconAvatar from '@base/components/@hanbiro/IconAvatar';
import RouteName from '@base/components/@hanbiro/RouteName';

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
              display: 'flex',
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
            <IconAvatar size={'md'} url={''} alt={''} />
            <Stack paddingLeft={1}>
              <RawHTML>{content}</RawHTML>
              {/* <RawHTML>{''}</RawHTML> */}
              <RouteName name={'https://hanbiro.jiki.me/desk'} url={'https://hanbiro.jiki.me/desk'} />
            </Stack>
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

export const productsFields = [
  //-----------------------------------------------------Content-----------------------------------
  {
    name: 'Product',
    isDefault: true,
    sortable: true,
    dataType: 'text',
    order: 11,
    title: 'Product',
    hidden: false,
    id: 'content',
    keyName: 'content', //Table get keyName to map data
    languageKey: 'Product',
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
    sortable: false,
    dataType: 'text',
    order: 11,
    title: 'Plan',
    hidden: false,
    id: 'createdBy',
    keyName: 'plan',
    languageKey: 'Plan',
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
    sortable: false,
    dataType: 'text',
    order: 11,
    title: 'Users',
    hidden: false,
    id: 'createdAt',
    keyName: 'users',
    languageKey: 'Users',
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
    sortable: false,
    dataType: 'text',
    order: 11,
    title: 'Actions',
    hidden: false,
    id: 'updatedAt',
    keyName: 'actions',
    languageKey: 'Actions',
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
