import { useMemo, lazy } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { useTheme } from '@mui/material';

import ViewRight, { CardProps } from '@base/components/@hanbiro/ViewRight';
import ViewAsideContainer from '@base/components/@hanbiro/ViewPage/ViewAsideContainer';
import AttachmentsRecent from '@base/containers/AttachmentsRecent';
import Timeline from '@base/containers/TimeLine';
import Note from '@base/containers/Notes';

// import { KEY_PRODUCT_TYPE, KEY_PRODUCT_TYPE_BE_SOLD } from '@product/product/config/keyNames';
// import { KEY_ITEM_PRODUCT } from '@product/item/config/keyNames';
// import { PRODUCT_TYPE_PURCHASE } from '@product/main/config/constants';
// import RelatedCustomer from '@product/item/containers/RelatedCustomer';
// import RelatedVendor from '@product/item/containers/RelatedVendor';
import { queryKeys } from '@product/item/config/queryKeys';
import { Item } from '@product/item/types/item';

interface RightProps {
  menuSource: string;
  menuSourceId: string;
}

const Right = (props: RightProps) => {
  const { menuSource, menuSourceId } = props;

  const queryClient = useQueryClient();

  const data = queryClient.getQueryData<Item>([queryKeys.viewItem, menuSourceId]);
  console.log('...RIGHT.data...', data);

  const theme = useTheme();

  const cards: CardProps[] = useMemo(() => {
    const rightCards: CardProps[] = [
      {
        title: 'ncrm_common_recent_timeline',
        component: <Timeline menuSource={menuSource} menuSourceId={menuSourceId} isRecent />,
        isExpandable: true
      },
      {
        title: 'ncrm_common_recent_notes',
        component: <Note menuSource={menuSource} menuSourceId={menuSourceId as string} isRecent />,
        isExpandable: true
      },
      { 
        title: 'ncrm_common_recent_attachments', 
        component: <AttachmentsRecent menuSource={menuSource} menuSourceId={menuSourceId} />,
        isExpandable: true
      }  
    ];

    // if (data?.[KEY_ITEM_PRODUCT]?.[KEY_PRODUCT_TYPE_BE_SOLD]) {
    //   rightCards.unshift({
    //     title: 'Related Customer',
    //     icon: <PeopleOutlineOutlined fontSize="small" />,
    //     component: <RelatedCustomer menuSource={menuSource} menuSourceId={menuSourceId} />
    //   } as CardProps);
    // }

    // if (data?.[KEY_ITEM_PRODUCT]?.[KEY_PRODUCT_TYPE] === PRODUCT_TYPE_PURCHASE) {
    //   rightCards.unshift({
    //     title: 'Related Vendor',
    //     icon: <PeopleOutlineOutlined fontSize="small" />,
    //     component: <RelatedVendor menuSource={menuSource} menuSourceId={menuSourceId} />
    //   } as CardProps);
    // }

    return rightCards;
  }, [menuSource, menuSourceId, data]);

  return (
    <ViewAsideContainer theme={theme}>
      <ViewRight cards={cards} />
    </ViewAsideContainer>
  );
};

export default Right;
