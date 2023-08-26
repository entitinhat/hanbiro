import { useMemo } from 'react';

//project
import ViewRight, { CardProps } from '@base/components/@hanbiro/ViewRight';
import Attachments from '@base/containers/Attachments';
import ViewAsideContainer from '@base/components/@hanbiro/ViewPage/ViewAsideContainer';
import { PageLayoutData } from '@base/types/pagelayout';

//menu
import * as keyNames from '@quote/config/keyNames';
import AssignRep from '@quote/containers/AssignRep';
import RelatedProduct from '@quote/containers/RelatedProduct';
import Timeline from '@base/containers/TimeLine';
import CustomerInfo from '@quote/containers/CustomerInfo';
import ContactPerson from '@quote/containers/ContactPerson';
import Opportunity from '@quote/containers/Opportunity';
import SalesOrder from '@quote/containers/SalesOrder';
import { buildViewSchema } from '@base/utils/helpers/schema';
import { useCustomer } from '@customer/hooks/useCustomer';
import { usePageLayoutByMenu } from '@base/hooks/usePageLayout';
import { default as viewConfig } from '@customer/config/view-field';
import { MENU_CUSTOMER } from '@base/config/menus';
import { CUSTOMER_CATEGORY_ACCOUNT, CUSTOMER_CATEGORY_CONTACT, CUSTOMER_CATEGORY_ENUM } from '@customer/config/constants';
import AttachmentsRecent from '@base/containers/AttachmentsRecent';

interface RightProps {
  menuSource: string;
  menuCategory: string;
  menuSourceId: string;
  layoutData: PageLayoutData;
}

const Right = (props: RightProps) => {
  const { menuSource, menuCategory, menuSourceId, layoutData } = props;
  const customerMenuCategory =
    layoutData?.data?.customerCategory === CUSTOMER_CATEGORY_ENUM?.[CUSTOMER_CATEGORY_CONTACT]
      ? CUSTOMER_CATEGORY_CONTACT
      : layoutData?.data?.customerCategory === CUSTOMER_CATEGORY_ENUM?.[CUSTOMER_CATEGORY_ACCOUNT]
      ? CUSTOMER_CATEGORY_ACCOUNT
      : '';
  const customerId = layoutData?.data?.customer?.id;
  const layoutMenu: string = [MENU_CUSTOMER, customerMenuCategory.toLowerCase()].join('_');
  const { data: layoutView, isLoading: layoutLoading } = usePageLayoutByMenu(layoutMenu, 'view');

  const viewSchema = buildViewSchema({
    sections: layoutView?.data,
    configFields: viewConfig,
    ignore: []
  });

  const { data, isLoading, refetch } = useCustomer(viewSchema, customerId, {
    enabled: viewSchema.length > 0 && !!layoutData?.data?.customerCategory && !!customerId
  });

  // cards
  const cards: CardProps[] = [];
  cards.push({
    title: 'Customer Info',
    component: <CustomerInfo value={data} category={customerMenuCategory} />
  });
  if (customerMenuCategory === CUSTOMER_CATEGORY_ACCOUNT) {
    const menuSourceName = data?.name || '';
    cards.push({
      title: 'Contact Person',
      component: <ContactPerson menuSource={MENU_CUSTOMER} customerId={customerId} menuSourceName={menuSourceName} />
    });
  }
  cards.push({
    title: 'Opportunity',
    component: <Opportunity layoutData={layoutData} />
  });
  // cards.push({
  //   title: 'SalesOrder',
  //   component: <SalesOrder value={undefined} />
  // });
  cards.push({
    title: 'Timeline',
    component: <Timeline menuSource={menuSource} menuSourceId={menuSourceId} isRecent />
  });
  cards.push({
    title: 'Attachment',
    component: <AttachmentsRecent menuSource={menuSource} menuSourceId={menuSourceId} />
  });

  return (
    <ViewAsideContainer>
      <ViewRight cards={cards} />
    </ViewAsideContainer>
  );
};

export default Right;
