import React, { useEffect, useState } from 'react';
import { MENU_DESK } from '@base/config/menus';
import withTextAndPreviewModal, { QuickViewComponentProps } from '@base/hooks/hocs/withTextAndPreviewModal';
import { usePublishKnowledgeBase } from '@desk/knowledge-base/hooks/usePublishKnowledgeBase';
import { Box, Link, Stack } from '@mui/material';
import RawHTML from '@base/components/@hanbiro/RawHTML';
import GrapesTSViewFieldView from '@base/containers/ViewField/GrapeTS/view';

export const KnowledgeQuickView = (props: QuickViewComponentProps) => {
  const { id, setLoading } = props;
  const { data, isLoading } = usePublishKnowledgeBase(id);

  useEffect(() => {
    setLoading && setLoading(isLoading);
  }, [isLoading]);

  const url = `/m${MENU_DESK}/knowledge/${id}`;
  //render
  return (
    <Box
      sx={{
        position: 'relative',
        padding: '20px'
      }}
    >
      <Box
        className="scroll-box"
        sx={{
          maxHeight: 'calc(100vh - 210px)'
        }}
      >
        <Stack>
          <Stack direction="row">
            <Link href={url} underline="none">
              {data?.subject || ''}
            </Link>
          </Stack>
          <Stack direction="row">
            <GrapesTSViewFieldView
              showTools={false}
              value={data?.content ? JSON.parse(data?.content) : null}
              iframHeight={'calc(100vh - 300px)'}
            />
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default withTextAndPreviewModal(KnowledgeQuickView, { title: 'Knowledgebase Detail' });
