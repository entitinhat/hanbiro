import _ from 'lodash';
import React, { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';

// mui import
import { Box } from '@mui/material';

// project import
import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';
import { PageLayoutData } from '@base/types/pagelayout';

// menu import
import { queryKeys } from '@product/item/config/queryKeys';
import { Item } from '@product/item/types/item';

interface ViewDetailProps {
  menuSource: string;
  menuSourceId: string;
  column?: number;
  layoutData: PageLayoutData;
  ignoreFields?: string[];
}

const ViewDetail = (props: ViewDetailProps) => {
  const { menuSource, ignoreFields = [], column = 2, menuSourceId, layoutData } = props;

  const queryClient = useQueryClient();
  const itemData = queryClient.getQueryData([queryKeys.viewItem, menuSourceId]) as Item;

  const basicFields: any[] = layoutData?.layout?.data?.[0]?.children || [];
  const moreFields: any[] = layoutData?.layout?.data?.[1]?.children || [];

  return (
    <React.Suspense fallback={<></>}>
      <Box className="detail-view scroll-box">
        <ViewFields
          fields={moreFields || []}
          column={column}
          ignoreFields={ignoreFields}
          menuSource={layoutData?.menuSource ?? ''}
          menuSourceId={layoutData?.menuSourceId ?? ''}
          readOnly={itemData?.restore?.id ? true : false}
        />
      </Box>
    </React.Suspense>
  );
};

export default ViewDetail;
